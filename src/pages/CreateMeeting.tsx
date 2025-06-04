import { EuiCard, EuiFlexGroup, EuiFlexItem,EuiImage } from '@elastic/eui'
import React from 'react'
import meeting1 from '../assets/meeting1.png'
import meeting2 from '../assets/meeting2.png'
import { useNavigate } from 'react-router'
import Header from '../components/header'

function CreateMeeting() {
    const navigate=useNavigate()
  return (
    <div style={ {
        height:'100vh',
        display:'flex',
        flexDirection:'column'

      }
    }
    >
        <Header/>
        <EuiFlexGroup justifyContent='center' alignItems='center' style={{margin:"5vh 10vw"}}>
            <EuiFlexItem>
            <EuiCard
        icon={<EuiImage size="100%" alt='icon' src={meeting1} />}
        title={'Create 1 on 1 meeting'}
        description="Create a personal meeting for a single person"
        onClick={() => navigate('/create1on1')}
        paddingSize='xl'
      />
            </EuiFlexItem>

            <EuiFlexItem>
            <EuiCard
        icon={<EuiImage size="100%" alt='icon' src={meeting2} />}
        title={'Create a video conference'}
        description="Invite multiple persons to meeting"
        onClick={() => navigate('/videoconference')}
        paddingSize='xl'
      />
            </EuiFlexItem>


        </EuiFlexGroup>
    </div>
  )
}



export default CreateMeeting
