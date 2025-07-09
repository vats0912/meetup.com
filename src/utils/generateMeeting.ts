
function generateMeeting() {
    let meetingid=""
    const char=process.env.SECRET
    const maxpos=char.length
    for(let i=0;i<8;i++){
        meetingid+=char.charAt(Math.floor(Math.random()*maxpos))
    }
  return meetingid
}


export default generateMeeting
