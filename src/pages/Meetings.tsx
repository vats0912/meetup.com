import React, { useState,useEffect } from 'react'
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

function Meetings(){
    useAuth()

  const [meetings, setMeetings] = useState<MeetingType[]>([]);
  const uid = useAppSelector((meet) => meet.auth.userInfo?.uid);

  useEffect(() => {
    if (!uid) return;
    const fetchUserMeetings = async () => {
      try {
        const firestoreQuery = query(meetingsRef);
        const fetchedMeetings = await getDocs(firestoreQuery);

        const myMeetings: MeetingType[] = fetchedMeetings.docs
          .map((doc) => ({ docId: doc.id, ...(doc.data() as MeetingType) }))
          .filter((meeting) => {
            // Filter based on conditions
            return (
              meeting.meetingType === "Anyone can join" || "1 on 1" || "video conference" ||
              meeting.invitedUsers?.some((user) => user === uid)
            );
          });

        setMeetings(myMeetings);
      } catch (error) {
        console.error("Error fetching meetings:", error);
      }
    };

    fetchUserMeetings();
  }, [uid]);

  console.log(meetings)

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

        
    } ,
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
</div>
       
)}
export default Meetings
