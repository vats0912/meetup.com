import React, { useState,useEffect, useCallback } from 'react'
import { MeetingType } from '../utils/Types';
import { getDocs, query, where } from 'firebase/firestore';
import { meetingsRef } from '../utils/FirebaseSetup';
import { useAppSelector } from '../app/hooks';
import useAuth from '../hooks/useAuth';
import Header from '../components/header';
import { EuiBadge, EuiBasicTable, EuiButtonIcon, EuiCopy, EuiFlexGroup, EuiFlexItem, EuiPanel } from '@elastic/eui';
import { Link } from 'react-router-dom';
import moment from 'moment';
import EditFlyout from '../components/formComponents/EditFlyout';

function MyMeetings() {
    useAuth()
    const [meetings,setMeetings]=useState<MeetingType[]>([])
    const uid=useAppSelector((meet)=>meet.auth.userInfo?.uid)

    const getMeetings = useCallback(async () => {
        if (!uid) {
          console.warn("User ID is undefined");
          return;
        } 
        try {
          const firestoreQuery = query(meetingsRef, where("createdBy", "==",uid));
          const fetchedMeetings = await getDocs(firestoreQuery);
      
          const  myMeetings:Array<MeetingType>=[]
           fetchedMeetings.docs.forEach((meeting) => {
            const data = meeting.data();
            if (data && typeof data === "object" && "meetingName" in data) {
              myMeetings.push( {
                docId: meeting.id,
                ...(data as MeetingType),
              });
            }
            // console.warn("Invalid meeting data:", data);
            
          })
          setMeetings(myMeetings);
        } catch (error) {
          console.error("Error fetching meetings:", error);
        }
      },[uid]);
      
    useEffect(()=>{
        getMeetings()
    },[getMeetings])
    
const [showEditFlyout,setShowEditFlyOut] = useState(false)
const [editMeeting,setEditMeeting]=useState<MeetingType>()

const openEditFlyout=(meeting:MeetingType)=>
{
setShowEditFlyOut(true)
setEditMeeting(meeting)
}

const closeEditFlyLayout=(dataChanged=false)=>{
    setEditMeeting(undefined)
    setShowEditFlyOut(false)
    if(dataChanged)
        getMeetings()
}

const columns=[
    {
        field:"meetingName",
        name:"Meeting Name"
    },
    {
        field:"meetingType",
        name:"Meeting Type"
    },
    {
        field:"meetingDate",
        name:"Meeting Date"
    },
    {
        field:"",
        name:"Status",
        render:(meeting:MeetingType)=>{
            if(meeting.status){
           if(meeting.meetingDate===moment().format('L')){
            return(
                <EuiBadge color='success'>
                    <Link style={{color:"black"}} to={`/join/${meeting.meetingId}`}>
                      Join now
                    </Link>
                </EuiBadge>
            )
           }

           else if(moment(meeting.meetingDate).isBefore(moment().format('L'))){
            return(
                <EuiBadge color='default'>
Ended
                </EuiBadge>
            )
           }
           else if(moment(meeting.meetingDate).isAfter(moment().format('L'))){
            return(
                <EuiBadge color='primary'>
                    Upcoming
                </EuiBadge>
            )
           }
           else{
            return(
                <EuiBadge color='danger'>
                    Cancelled
                </EuiBadge>
            )
           }
            }

        }

        
    }
    ,
    {
        field:"",
        name:"Edit",
        render:(meeting:MeetingType)=>{
            return(
                <EuiButtonIcon aria-label='meeting-edit' iconType="indexEdit" color='danger' display='base' isDisabled={
                    !meeting.status || moment(meeting.meetingDate).isBefore(moment().format('L'))
                }
                onClick={
                    ()=>{openEditFlyout(meeting)}
                }
                
                />
            )
        }
    },

    {
        field:"meetingId",
        name:"Copy Link",
        render:(meetingId:string)=>{
            return(
                <EuiCopy textToCopy={`${process.env.REACT_APP_HOST}/join/${meetingId}`}>
                    {
                        (copy:any)=>(
                            <EuiButtonIcon
                            iconType={"copy"}
                            onClick={copy}
                            display='base'
                            aria-label='Copy meeting'
                            />
                        )
                    }
                </EuiCopy>
            )
        }
    }

]
   return(
    <div style={
        {
            display:'flex',
            height:'100vh',
            flexDirection:'column'
        }
    }>
        <Header/>
        <EuiFlexGroup justifyContent='center'  style={{margin:'1rem'}}>
            <EuiFlexItem>
              <EuiPanel>
                <EuiBasicTable
                items={meetings}
                columns={columns}
                />
              </EuiPanel>
            </EuiFlexItem>
        </EuiFlexGroup>

        {
            showEditFlyout && <EditFlyout closeFlyout={closeEditFlyLayout} meetings={editMeeting!}/>
        }
    </div>
   )
}

export default MyMeetings
