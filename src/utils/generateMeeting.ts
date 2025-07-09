
function generateMeeting() {
    let meetingid=""
    const char="1234@qwertgbnmhytc$xcvbghypoert"
    const maxpos=char.length
    for(let i=0;i<8;i++){
        meetingid+=char.charAt(Math.floor(Math.random()*maxpos))
    }
  return meetingid
}


export default generateMeeting
