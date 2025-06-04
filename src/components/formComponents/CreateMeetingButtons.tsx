import React from 'react'
import { useNavigate } from 'react-router-dom'
import { EuiFlexGroup,EuiFlexItem,EuiButton } from '@elastic/eui'
function CreateMeetingButtons({createMeeting,isEdit,closeFlyout}:{
    createMeeting:()=>void,
    isEdit:boolean,
    closeFlyout:()=>{}
}) {
    const navigate=useNavigate()
  return (
    <EuiFlexGroup>
<EuiFlexItem grow={false}>
<EuiButton color='danger' fill onClick={()=>isEdit ? closeFlyout:navigate('/')}>
    Cancel
</EuiButton>
</EuiFlexItem>
<EuiFlexItem>
<EuiButton  fill onClick={createMeeting}>
   {isEdit ? "Edit Meeting" :"Create Meeting"}
</EuiButton>
</EuiFlexItem>
    </EuiFlexGroup>
  )
}


export default CreateMeetingButtons
