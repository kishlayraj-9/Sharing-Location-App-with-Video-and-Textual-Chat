import io from 'socket.io-client';
import { onlineUsersHandler, userDisconnectedHandler } from '../store/actions/userActions';
import { chatMessageHandler } from '../store/actions/messengerActions';
import { videoRoomsListHandler } from '../store/actions/videoRoomActions';
import { call, disconnect } from '../realtimeCommunication/webRTCHandler';

let socket = null;

export const connectWithSocketIOServer = () =>{
    socket = io('http://localhost:3003');  //io function responsible for connecting to the given server

    socket.on('connect', () => {                   //that is responsible to listen to the event emitted by the server
        console.log('Connected to the socket server');
    });
 
    socket.on('online-users', (usersData) => {console.log("HI");
        onlineUsersHandler(socket.id,usersData);
    });

    socket.on('chat-message', (messageData) => {
        chatMessageHandler(messageData);
    });

    socket.on('video-rooms', (videoRooms)=>{
        videoRoomsListHandler(videoRooms)
    });

    socket.on('video-room-init',(data)=>{
        call(data);
    });

    socket.on('video-call-disconnect', () => {
        disconnect();
    })

    socket.on('user-disconnected', (disconnectedUserSocketId) => {
        userDisconnectedHandler(disconnectedUserSocketId);
    });

};

export const login = (data) =>{          //emiiting the events for the server by the client
    socket.emit('user-login', data);
}

export const sendChatMessage = (data) => {
    socket.emit('chat-message', data);
}

export const createVideoRoom =(data) =>{
    socket.emit('video-room-create', data);
}

export const joinVideoRoom = (data) => {
    console.log('emmiting event to join a room');
    console.log(data);
    socket.emit('video-room-join', data); 
}

export const leaveVideoRoom = (data) =>{
    socket.emit('video-room-leave', data);
}