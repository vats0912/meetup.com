import React from 'react'
import useAuth from '../hooks/useAuth'
import { EuiFlexGroup, EuiFlexItem, EuiImage,EuiCard } from '@elastic/eui'
import dashboard1 from '../assets/dashboard1.png'
import dashboard2 from '../assets/dashboard2.png'
import dashboard3 from '../assets/dashboard3.png'
import { useNavigate } from 'react-router'
import Header from '../components/header'

function Dashboard() {
  
  const navigate=useNavigate()
  useAuth()
  return (
    <>
    <div style={
      {
        height:'100vh',
        display:'flex',
        flexDirection:'column'

      }
    }>
      <Header/>
     <EuiFlexGroup justifyContent='center' alignItems='center' style={{margin:"5vh 10vw"}}>
<EuiFlexItem>
<EuiCard
        icon={<EuiImage size="5rem" alt='icon' src={dashboard1} />}
        title={'Create a meeting'}
        description="Create a new meeting and invite people"
        onClick={() => navigate('/create')}
        paddingSize='xl'
      />
</EuiFlexItem>

<EuiFlexItem>
<EuiCard
        icon={<EuiImage size="100%" alt='icon' src={dashboard2} />}
        title={'My meetings'}
        description="View your created meetings"
        onClick={() => navigate('/mymeetings')}
        paddingSize='xl'
      />
</EuiFlexItem>

<EuiFlexItem>
<EuiCard
        icon={<EuiImage size="5rem" alt='icon' src={dashboard3} />}
        title={'Meetings'}
        description="View the meetings which you are invited to"
        onClick={() => navigate('/meetings')}
        paddingSize='xl'
      />
</EuiFlexItem>
     </EuiFlexGroup>
    </div>
    </>
  )
}



export default Dashboard
