const express = require('express')
const app = express()
const http = require('http')
const cors = require('cors')

const server =  http.createServer(app);
const { Server } = require("socket.io");
const {PeerServer} = require('peer');

app.use(cors());
const io = new Server(server, {
    cors : {
        origin: "*",
        methods: ["GET", "POST"],
    },
});

app.get('/', (req, res) => {
  res.send('Hello World!')
});

let onlineUsers = {};
let videoRooms = {};

io.on('connection', (socket) => {             //emit an event 
    console.log(`a user connected ${socket.id}`);
    socket.on('user-login', (data) => loginEventHandler(socket, data));

    socket.on('chat-message', data => {
        chatMessageHandler(socket,data);
    })

    socket.on('video-room-create' , data => videoRoomCreateHandler(socket,data));

    socket.on('video-room-join', data =>{
        videoRoomJoinHandler(socket,data);
    })

    socket.on('video-room-leave', (data)=> {
        videoRoomLeaveHandler(socket,data);
    })

    socket.on('disconnect', () => {
        disconnectEventHandler(socket.id);
    })
});

const peerServer = PeerServer({port : 9000, path: '/peer'});

const PORT = process.env.PORT || 3003;

server.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})

//socket events

const loginEventHandler = (socket, data) => {

    socket.join("logged-users");  // all logged-in user will join the room named as logged-users

    onlineUsers[socket.id] = {
        username: data.username,
        coords: data.coords,
    };

    //console.log(onlineUsers);

    io.to('logged-users').emit("online-users", convertOnlineUsersToArray());
    broadcastVideoRooms();
    
};

const disconnectEventHandler = (id) =>{
    console.log(`User Disconnected ${id}`);
    checkIfUserIsInCall(id);
    removeOnlineUser(id);
};

const chatMessageHandler = (socket, data) => {
    const {receiverSocketId, content, id} = data;

    if(onlineUsers[receiverSocketId]){
        console.log('message received');
        console.log('sending message to other user');
        io.to(receiverSocketId).emit('chat-message',{
            senderSocketId: socket.id,
            content: content,
            id: id,
        });
    }
}   

const videoRoomCreateHandler = (socket,data) => {
    const {peerId, newRoomId} = data;

    videoRooms[newRoomId] = {
        participants: [
            {
                socketId: socket.id,
                username: onlineUsers[socket.id].username,
                peerId,
            },
        ],
    };

    broadcastVideoRooms();

    console.log("new room", data);

}
const videoRoomJoinHandler = (socket, data) => {
    const { roomId,peerId} = data;

    if(videoRooms[roomId]){
        videoRooms[roomId].participants.forEach((participant) =>{
            socket.to(participant.socketId).emit('video-room-init',{
                newParticipantPeerId: peerId,
            });
        });

        videoRooms[roomId].participants = [
            ...videoRooms[roomId].participants,
            {
                socketId: socket.id,
                username: onlineUsers[socket.id].username,
                peerId,
            }
        ];

        broadcastVideoRooms();
    }
}

const videoRoomLeaveHandler = (socket, data) =>{
    const {roomId} = data;
    if(videoRooms[roomId]){
        videoRooms[roomId].participants = videoRooms[roomId].participants.filter(p => p.socketId !== socket.id);
    };
    //console.log(videoRooms[roomId]);

    if(videoRooms[roomId].participants.length>0){
        //emit an event to the user which is in the room that he should also close his peer connection
        socket.to(videoRooms[roomId].participants[0].socketId).emit("video-call-disconnect");
    }

    if(videoRooms[roomId].participants.length<1){
        delete videoRooms[roomId];
    }

    broadcastVideoRooms();
}

//helper functions
const removeOnlineUser = (id) => {
    if(onlineUsers[id]){
        delete onlineUsers[id];
    };
    broadDisconnectedUserDetails(id);
    console.log(onlineUsers);
};

const checkIfUserIsInCall = (id) => {
    Object.entries(videoRooms).forEach(([key,value]) => {
        const participant = value.participants.find( p => p.socketId===id);

        if(participant){
            removeUserFromTheVideoRoom(id ,key);
        }
    })
};

const removeUserFromTheVideoRoom =  (socketId,roomId) => {
    videoRooms[roomId].participants = videoRooms[roomId].participants.filter(p => p.socketId !==socketId);

    if(videoRooms[roomId].participants.length>0){
        //emit an event to the user which is in the room that he should also close his peer connection
        io.to(videoRooms[roomId].participants[0].socketId).emit("video-call-disconnect");
    }

    if(videoRooms[roomId].participants.length<1){
        delete videoRooms[roomId];
    }

    broadcastVideoRooms();


};

const broadDisconnectedUserDetails = (disconnectedUserSocketId) =>{
    io.to('logged-users').emit('user-disconnected', disconnectedUserSocketId);
};

const broadcastVideoRooms = () => {
    io.to('logged-users').emit('video-rooms', videoRooms);
}

const convertOnlineUsersToArray = () => {
    const onlineUsersArray = [];

    Object.entries(onlineUsers).forEach(([key,value]) => {
        onlineUsersArray.push({
            socketId: key,
            username: value.username,
            coords: value.coords,
        });
    });

    return onlineUsersArray;
};
