const io=require('socket.io')(process.env.PORT||8081);
const users={

};
io.on('connection',socket=>{
    socket.on('new-user-joined',name=>{
        console.log('hy '+name);
        users[socket.id]=name;
        socket.broadcast.emit('user-joined',name);
    });
    socket.on('send',message=>{
        socket.broadcast.emit('receive',{message:message,name:users[socket.id]})

    });
    socket.on('disconnect',message=>{
        socket.broadcast.emit('gone',users[socket.id]);
        delete users[socket.id];

    });
})