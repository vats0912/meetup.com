
function generateMeeting() {
    let meetingid=""
    const char="12345quertyuiopasdfgh68790jklmnbvcxzMNBVCXZASDQWERTYHGFUIOLKJP"
    const maxpos=char.length
    for(let i=0;i<8;i++){
        meetingid+=char.charAt(Math.floor(Math.random()*maxpos))
    }
  return meetingid
}


export default generateMeeting
