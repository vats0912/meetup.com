import React, { useEffect } from 'react'
import {useNavigate, useParams} from "react-router-dom"
import { useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { firebaseAuth, meetingsRef } from '../utils/FirebaseSetup'
import useToast from '../hooks/useToast'
import { getDoc, getDocs, query, where } from 'firebase/firestore'
import moment from 'moment'
import MeetingDateField from '../components/formComponents/MeetingDateField';
import { create } from 'domain'
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt'
import generateMeeting from '../utils/generateMeeting'



function JoinMeeting() {
const navigate=useNavigate()
const [user,setUser]=useState<any>(undefined)
const [isAllowed,setIsAllowed]=useState(false)
const [userLoaded,setUserLoaded]=useState(false)
const params=useParams()
const [createToast]=useToast()

onAuthStateChanged(firebaseAuth,(currentUser)=>{
    if(currentUser){
        setUser(currentUser)
    }
    setUserLoaded(true)
})

useEffect(()=>{
const getMeetingData=async()=>{
const firestoreQuery=query(meetingsRef,where("meetingId","==",params.id))
const fetchedDocs=await getDocs(firestoreQuery)
if(params.id && userLoaded){
    if(fetchedDocs.docs.length){
    const meeting=fetchedDocs.docs[0].data()
    const isCreator=meeting.createdBy===user?.uid
    if(meeting.meetingType==="1 on 1"){
        if(meeting.invitedUsers[0]===user?.uid||isCreator){
            if(meeting.meetingDate===moment().format('L')){
                setIsAllowed(true)
            }
            else if(moment(meeting.meetingDate).isBefore(moment().format('L'))){
                createToast({title:"Meeting has ended",type:"danger"})
                navigate(user ?"/":"/login")
            }

            else if(moment(meeting.meetingDate).isAfter(moment().format('L'))){
                createToast({title:`Meeting is on ${meeting.meetingDate}`,type:"warning"})
                navigate(user ? "/":"/login")
            }
            else{
                navigate(user ? "/":"/login")
            }
        }
    }
    else if(meeting.meetingType==="video conference" ){
        const index=meeting.invitedUsers.findIndex(
        (invitedUser:string)=>invitedUser===user?.uid
        )

        if(index!==-1|| isCreator){
            if(meeting.meetingDate===moment().format('L')){
                setIsAllowed(true)
            }
            else if(moment(meeting.meetingDate).isBefore(moment().format('L'))){
                createToast({title:"Meeting has ended",type:"danger"})
                navigate(user ?"/":"/login")
            }

            else if(moment(meeting.meetingDate).isAfter(moment().format('L'))){
                createToast({title:`Meeting is on ${meeting.meetingDate}`,type:"warning"})
                navigate(user ? "/":"/login")
            }
            
        }else{
            createToast({title:"You are not invited to the meeting",type:"danger"})
             navigate(user ? "/":"/login")
        }
    }
    else{
        setIsAllowed(true)
    }
    }else{
        navigate('/')
    }
}
}
getMeetingData()
},[createToast, navigate, params.id, user, userLoaded])

const myMeeting={
    
}



// const myMeeting=(element:any)=>{
//     const kitToken=ZegoUIKitPrebuilt.generateKitTokenForTest(
//         AppId,
//         serverSecret,
//         params.id as string,
//         user?.uid ? user.uid:generateMeeting(),
//         user?.displayName?user.displayName:generateMeeting()

//     )
//     // console.log(kitToken)
//     const zp=ZegoUIKitPrebuilt.create(kitToken)
//     zp.joinRoom({
//         container:element,
//         maxUsers:50,
//         sharedLinks:[
//             {
//                 name:"Personal Link",
//                 url:window.location.origin
//             }
//         ],
//         scenario:{
//             mode:ZegoUIKitPrebuilt.VideoConference,
//         }
//     })
// }

  return (
    <div>
      
      <h2>Meeting creation will be coming soon</h2>
        
         </div>

       
  )

}
export default JoinMeeting
