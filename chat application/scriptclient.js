const socket=io('http://localhost:process.env.PORT || 8000');
const form= document.getElementById('sendcontainer');
const messageinput=document.getElementById('messageinp');
const messagecontainer=document.querySelector('.container');
var audio=new Audio('ting.mp3');
 const append=(message,position)=>{
    const messageelement=document.createElement('div');
    messageelement.innerText=message;
    messageelement.classList.add('message');
    messageelement.classList.add(position);
    messagecontainer.append(messageelement);
    if (position=='left'){
         audio.play();
    }
}

const name=prompt('Enter your name to join the chat');
socket.emit('new-user-joined',name);
socket.on('user-joined',name=>{
    append(`${name} joined the chat `,'right')
    
});
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message=messageinput.value;
    messageinput.value="";
    append(`You:${message}`,'right');
    socket.emit('send',message);
    


})
socket.on('receive',data=>{
    append(`${data.name}:${data.message}`,'left')
    
});
socket.on('gone',name=>{
    append(`${name} left the chat`,'right')
})
