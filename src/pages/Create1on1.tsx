import { EuiFlexGroup, EuiFlexItem, EuiForm, EuiSpacer } from '@elastic/eui'
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


function Create1on1() {
  useAuth()
  const navigate=useNavigate()
  const uid=useAppSelector((meet)=>meet.auth.userInfo?.uid)
  const [createToast]=useToast()
  const [users]=useFetchUsers()
  const [meetingName,setMeetingName]=useState('')
  const [selectedUsers,setSelectedUsers]=useState<Array<userType>>([])
  const [startDate,setStartDate]=useState(moment())
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
    if (!validateForm()) {
      createToast({
        title: "Form validation failed. Please check your input.",
        type: "error",
      });
      return;
    }
  
    if (!startDate || !startDate.isValid()) {
      createToast({
        title: "Invalid meeting date.",
        type: "error",
      });
      return;
    }
  
    if (selectedUsers.length === 0) {
      createToast({
        title: "Please select at least one user.",
        type: "error",
      });
      return;
    }
  
    try {
      const meetingId = generateMeeting();
      await addDoc(meetingsRef, {
        createdBy: uid,
        meetingId,
        meetingName,
        meetingType: "1-on-1",
        invitedUsers: [selectedUsers[0].uid],
        meetingDate: startDate.format("L"),
        maxUsers: 1,
        status: true,
      });
      createToast({
        title: "One on One meeting created successfully.",
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
  };
  

  

  const validateForm = () => {
    let hasErrors = false;
  
    // Clone the current `showErrors` state to avoid direct mutation
    const updatedErrors = { ...showErrors };
  
    // Validate `meetingName`
    if (!meetingName.trim().length) {
      updatedErrors.meetingName = {
        show: true,
        message: ["Please enter meeting name"],
      };
      hasErrors = true;
    } else {
      updatedErrors.meetingName = {
        show: false,
        message: [""],
      };
    }
  
    // Validate `selectedUsers`
    if (!selectedUsers.length) {
      updatedErrors.meetingUser = {
        show: true,
        message: ["Please select a user"],
      };
      hasErrors = true;
    } else {
      updatedErrors.meetingUser = {
        show: false,
        message: [""],
      };
    }
  
    // Update the state with the new errors
    setshowErrors(updatedErrors);
  
    // Return `true` if validation passes, `false` otherwise
    return !hasErrors;
  };
  


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
            <MeetingNameField label="Meeting Name" placeholder='Meeting Name' value={meetingName} setMeetingName={setMeetingName} isInvalid={showErrors.meetingName.show} error={showErrors.meetingName.message}/>
            <MeetingUsersField label='Invite User' placeholder='Select a user' options={users} onChange={onUserChange} selectedOptions={selectedUsers} isClearable={false} singleSelection={{asPlainText:true}} isInvalid={showErrors.meetingUser.show} error={showErrors.meetingUser.message} />
            <MeetingDateField selected={startDate} setStartDate={setStartDate}/>
            <CreateMeetingButtons createMeeting={createMeeting} isEdit={false} closeFlyout={closeFlyout}/>
            <EuiSpacer/>
           </EuiForm>
        </EuiFlexGroup>
    </div>
  )
}



export default Create1on1
