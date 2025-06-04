import React, { useEffect, useState } from 'react'
import { FieldErrorType, MeetingType, userType,  } from '../../utils/Types';
import useAuth from '../../hooks/useAuth'
import { useNavigate } from 'react-router'
import { useAppSelector } from '../../app/hooks'
import useToast from '../../hooks/useToast'
import useFetchUsers from '../../hooks/fetchUsers'
import moment from 'moment'
import { updateDoc } from 'firebase/firestore'
import { doc } from 'firebase/firestore';
import { db } from '../../utils/FirebaseSetup'
import { EuiFlyout, EuiFlyoutBody, EuiFlyoutHeader, EuiForm, EuiFormRow, EuiSpacer, EuiSwitch, EuiTitle } from '@elastic/eui';
import MeetingNameField from './MeetingNameField';
import { MeetingMaximumUsersField } from './MeetingMaximumUsersField';
import MeetingUsersField from './MeetingUsersField';
import MeetingDateField from './MeetingDateField';
import CreateMeetingButtons from './CreateMeetingButtons';

function EditFlyout({closeFlyout,meetings}:{
    closeFlyout:any,
    meetings:MeetingType
}) {

    useAuth()
    const [createToast]=useToast()
    const [users]=useFetchUsers()
    const [meetingName,setMeetingName]=useState<string>(meetings?.meetingName||"")
    const [selectedUsers,setSelectedUsers]=useState<Array<userType>>([])
    const [startDate,setStartDate]=useState(moment(meetings?.meetingDate||""))
    const [size,setSize]=useState(meetings?.maxUsers)
    const [status,setStatus]=useState(false)
    const [meetingType,setMeetingType]=useState(meetings?.meetingType)

    
    const [showErrors,setshowErrors] = useState<{
      meetingName:FieldErrorType,
      meetingUser:FieldErrorType
    }>({
      meetingName:{
        show:false,
        message:[]
      },
     meetingUser: {
       show:false,
       message:[]
      }
    })
  
    const onUserChange=(selectedOptions:any)=>{
       setSelectedUsers(selectedOptions)
    }

    const validateForm=()=>{
        let errors=false
        const cloneShowErrors={...showErrors}
        if(!meetingName.trim().length){
          cloneShowErrors.meetingName.show=true
          cloneShowErrors.meetingName.message=["Please enter meeting name"]
          errors=true
        }
        else{
          cloneShowErrors.meetingName.show=false
          cloneShowErrors.meetingName.message=[]
        }
    
        if(!selectedUsers.length){
          cloneShowErrors.meetingUser.show=true
          cloneShowErrors.meetingUser.message=["Please select a user"]
          errors=true
        }
        else{
          cloneShowErrors.meetingUser.show=false
          cloneShowErrors.meetingUser.message=[]
        }

        setshowErrors(cloneShowErrors)
        return !errors
      }

      useEffect(()=>{
       if(users && meetings?.invitedUsers){
        const foundUsers:Array<userType>=[]
        meetings.invitedUsers.forEach((user:string)=>{
            const findUser=users.find((tempUser:userType)=>tempUser.uid===user)
            if(findUser)
            foundUsers.push(findUser)
        })
        setSelectedUsers(foundUsers)
       }
      },[meetings, users])

      
      const editMeeting = async () => {
        if (!validateForm()) {
          createToast({ title: "Please correct the errors before submitting.", type: "danger" });
          return;
      }
        if (!meetings.docId) {
          createToast({ title: "Meeting ID is missing", type: "danger" });
          return;
        }
        const docRef = doc(db, "meetings", meetings.docId);
       console.log(meetingName)
        try {
          const editedMeeting = {
            ...meetings,
            meetingName,
            meetingType,
            invitedUsers: selectedUsers.map((user) => user.uid),
            maxUsers: size,
            meetingDate: startDate.format("L"),
            status: !status,
          };
          await updateDoc(docRef, editedMeeting);
          createToast({ title: "Meeting updated successfully", type: "success" });
          closeFlyout(true);
        } catch (error) {
          console.error("Failed to update meeting:", error);
          createToast({ title: "Failed to update meeting", type: "danger" });
        }
      };

      if(!meetings){
        return null
      }
      
  return (
    <EuiFlyout ownFocus onClose={()=>closeFlyout()}>
     <EuiFlyoutHeader>
        <EuiTitle size='m'>
            <h2>{meetingName}</h2>
        </EuiTitle>
     </EuiFlyoutHeader>
     <EuiFlyoutBody>
        <EuiForm>
        <MeetingNameField label="Meeting Name" placeholder='Meeting Name' value={meetingName} setMeetingName={setMeetingName} isInvalid={showErrors.meetingName.show} error={showErrors.meetingName.message}/>
        {
            meetingType ==="Anyone can join" ?
                (<MeetingMaximumUsersField value={size} setValue={setSize}/>):(<MeetingUsersField label='Invite User' placeholder='Select a user' options={users} onChange={onUserChange} selectedOptions={selectedUsers} isClearable={false} singleSelection={false} isInvalid={showErrors.meetingUser.show} error={showErrors.meetingUser.message} />)
            
        }
        <MeetingDateField selected={startDate} setStartDate={setStartDate}/>
        <EuiFormRow display='columnCompressedSwitch' label="Cancel meeting">
                <EuiSwitch
                showLabel={false}
                label="Cancel meeting"
                checked={status}
                onChange={(e)=>{setStatus(e.target.checked)}}
               
                />
            </EuiFormRow>
            <EuiSpacer/>
            <CreateMeetingButtons createMeeting={editMeeting} isEdit closeFlyout={closeFlyout}/>
        </EuiForm>
     </EuiFlyoutBody>
    </EuiFlyout>
  )
}


export default EditFlyout
