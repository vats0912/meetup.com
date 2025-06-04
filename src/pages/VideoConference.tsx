import { EuiFlexGroup, EuiFlexItem, EuiForm, EuiFormRow, EuiSpacer, EuiSwitch } from '@elastic/eui'
import React, { useState } from 'react'
import moment from 'moment'
import Header from '../components/header'
import MeetingNameField from '../components/formComponents/MeetingNameField'
import MeetingUsersField from '../components/formComponents/MeetingUsersField'
import useAuth from '../hooks/useAuth'
import useFetchUsers from '../hooks/fetchUsers'
import MeetingDateField from '../components/formComponents/MeetingDateField'
import CreateMeetingButtons from '../components/formComponents/CreateMeetingButtons'
import { FieldErrorType, userType } from '../utils/Types'
import { addDoc } from 'firebase/firestore'
import generateMeeting from '../utils/generateMeeting';
import { useAppSelector } from '../app/hooks'
import {meetingsRef} from '../utils/FirebaseSetup'
import { useNavigate } from 'react-router-dom'
import useToast from '../hooks/useToast'
import {MeetingMaximumUsersField} from '../components/formComponents/MeetingMaximumUsersField'

function VideoConference(){
  useAuth()
  const navigate=useNavigate()
  const uid=useAppSelector((meet)=>meet.auth.userInfo?.uid)
  const [createToast]=useToast()
  const [users]=useFetchUsers()
  const [meetingName,setMeetingName]=useState('')
  const [selectedUsers,setSelectedUsers]=useState<Array<userType>>([])
  const [startDate,setStartDate]=useState(moment())
  const [size,setSize]=useState(1)
  const [anyoneCanJoin,setAnyoneCanJoin]=useState(false)
  const [showErrors, setshowErrors] = useState<{
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

  

const createMeeting = async () => {
  if (validateForm()) {
    
  // if (!startDate || !startDate.isValid() || startDate.isBefore(moment())) {
  //   createToast({
  //     title: "Invalid or past meeting date.",
  //     type: "error",
  //   });
  //   return;
  // }

  // if (selectedUsers.length === 0) {
  //   createToast({
  //     title: "Please select at least one user.",
  //     type: "error",
  //   });
  //   return;
  // }

  try {
    const meetingId = generateMeeting();
    const payload = {
      createdBy: uid,
      meetingId,
      meetingName,
      meetingType: anyoneCanJoin ? "Anyone can join" : "video conference",
      invitedUsers: anyoneCanJoin ? [] : selectedUsers.map((user:userType) => user.uid),
      meetingDate: startDate.format("L"),
      maxUsers: anyoneCanJoin ? 100 : size,
      status: true,
    };

    await addDoc(meetingsRef, payload);

    createToast({
      title: anyoneCanJoin
        ? "Anyone can join meeting created successfully"
        : "Video Conference Meeting created successfully",
      type: "success",
    });
    navigate("/");
  } catch (error) {
    createToast({
      title: "Error creating meeting. Please try again.",
      type: "error",
    });
    console.error("Error creating meeting:", error);
  }
}

};

const validateForm = () => {
  let errors = false;
  const cloneShowErrors = { ...showErrors };

  // Validate meeting name
  if (!meetingName.trim().length) {
    cloneShowErrors.meetingName.show = true;
    cloneShowErrors.meetingName.message = ["Please enter meeting name"];
    errors = true;
  } else {
    cloneShowErrors.meetingName.show = false;
    cloneShowErrors.meetingName.message = [""];
  }

  // Validate selected users
  if(!anyoneCanJoin){
  if (!selectedUsers.length) {
    cloneShowErrors.meetingUser.show = true;
    cloneShowErrors.meetingUser.message = ["Please select a user"];
    errors = true;
  } else {
    cloneShowErrors.meetingUser.show = false;
    cloneShowErrors.meetingUser.message = [""];
  }
}


  setshowErrors(cloneShowErrors);
  console.log(selectedUsers.length)

  // Debug
  console.log("Validation State:", { meetingName, selectedUsers, errors });

  
  return !errors;
};

if (!users || !Array.isArray(users)) {
  console.error("Invalid users data:", users);
  return null; // Or handle the error gracefully
}

function closeFlyout(): {} {
    throw new Error('Function not implemented.')
  }

  return (
    <div style={ {
        height:'100vh',
        display:'flex',
        flexDirection:'column'

      }
    }>
        <Header/>
        <EuiFlexGroup justifyContent='center' alignItems='center'>
           <EuiForm>
            <EuiFormRow display='columnCompressedSwitch' label="Anyone can join">
                <EuiSwitch
                showLabel={false}
                label="Anyone can join"
                checked={anyoneCanJoin}
                onChange={e=>{setAnyoneCanJoin(e.target.checked)}}
                compressed
                />
            </EuiFormRow>
            <MeetingNameField label="Meeting Name" placeholder='Meeting Name' value={meetingName} setMeetingName={setMeetingName} isInvalid={showErrors.meetingName.show} error={showErrors.meetingName.message}/>
            {anyoneCanJoin ? (<MeetingMaximumUsersField value={size} setValue={setSize}/>):(<MeetingUsersField label='Invite User' placeholder='Select a user' options={users} onChange={onUserChange} selectedOptions={selectedUsers} isClearable={false} singleSelection={false} isInvalid={showErrors.meetingUser.show} error={showErrors.meetingUser.message} />)}

            <MeetingDateField selected={startDate} setStartDate={setStartDate}/>
            <CreateMeetingButtons createMeeting={createMeeting} isEdit={false} closeFlyout={closeFlyout}/>
            <EuiSpacer/>
           </EuiForm>
        </EuiFlexGroup>
    </div>
  )
}


export default VideoConference
