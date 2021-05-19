

const videoGrid = document.getElementById('video-grid');
const socket=io('/')
const myVideo = document.createElement('video');
myVideo.classList.add('displayVideo')
myVideo.style.transform = 'rotateY(180deg)';
myVideo.muted = true;

var peer = new Peer(); 

let myVideoStream

navigator.mediaDevices.getUserMedia({
    video:true,
    audio:true
}).then(stream=>{
    myVideoStream=stream
    addVideoStream(myVideo,stream)
    peer.on('call',call=>{
        
        call.answer(stream)
        const video = document.createElement('video');
        video.classList.add('displayVideo')
        video.style.transform = 'rotateY(180deg)';
        call.on('stream',userVideoStream=>{
            addVideoStream(video,userVideoStream)
            
        })   
    })

    socket.on('user-connected',(userId)=>{
        connectToNewUser(userId,stream)


    })

    let msg = $('input');

    $('html').keydown((e)=>{
        if(e.which === 13 && msg.val().length !==0){
            console.log(msg.val(),'My Own Mesaage');
            socket.emit('message',msg.val());
            msg.val('')
        }
    })
    
    socket.on('create_message',message=>{
        $('ul').append(`<li class="message"><b>user</b><br/>${message}</li>`)
        scrollToBottom()
    }) 
})


peer.on('open',id=>{
    socket.emit('join-room',ROOM_ID,id)
})


const connectToNewUser = (userId,stream) => {
    const call = peer.call(userId,stream)
    const video = document.createElement('video');
    video.classList.add('displayVideo')
    video.style.transform = 'rotateY(180deg)';
    call.on('stream',userVideoStream=>{
        addVideoStream(video,userVideoStream)
    })
}

const addVideoStream = (video,stream) => {
    video.srcObject = stream;
    video.addEventListener('loadedmetadata',()=>{
        video.play()
    })
    videoGrid.append(video)
    
}

const scrollToBottom = () => {
    let d = document.querySelector('.main_chat_window');
    d.scrollTop = d.scrollHeight;

}
 const muteUnmute = () => {
     const enabled = myVideoStream.getAudioTracks()[0].enabled;
    //  console.log(myVideoStream.getVideoTracks()[0].enabled);
     if(enabled){
        myVideoStream.getAudioTracks()[0].enabled = false;
         setUnmuteButton();
     }else{
         setMuteButton();
         myVideoStream.getAudioTracks()[0].enabled=true;
     }
 }

 const videoOnOff = () => {
    const enabled = myVideoStream.getVideoTracks()[0].enabled;
   //  console.log(myVideoStream.getVideoTracks()[0].enabled);
    if(enabled){
       myVideoStream.getVideoTracks()[0].enabled = false;
        setVideoButtonOff();
    }else{
        setVideoButtonOn();
        myVideoStream.getVideoTracks()[0].enabled=true;
    }
}

 const setMuteButton = () => {

    const html = `
        <i class='fa fa-microphone'></i>
        <span>Mute</span>
    `
    document.querySelector('.main_mute_button').innerHTML=html;

 }

 const setUnmuteButton = () => {
    const html = `
        <i class='off fa fa-microphone-slash'></i>
        <span>Unmute</span>
    `
    document.querySelector('.main_mute_button').innerHTML=html;
}

const setVideoButtonOn = () => {

    const html = `
        <i class='fas fa-video'></i>
        <span>Stop Video</span>
    `
    document.querySelector('.main_video_button').innerHTML=html;
 }

 const setVideoButtonOff = () => {
    const html = `
        <i class='off fas fa-video-slash'></i>
        <span>Start Video</span>
    `
    document.querySelector('.main_video_button').innerHTML=html;
    //TODO
}

const openCloseChat = () => {
    const chat = document.querySelector('.main_right');
    if(chat.style.display==='none'){
        chat.style.display='flex'
    }else{
        chat.style.display='none'
    }
}

const exitRoom = () => {
    location.replace('/')
  }