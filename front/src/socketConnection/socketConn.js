import io from 'socket.io-client';
import { onlineUsersHandler, userDisconnectedHandler } from '../store/actions/userActions';

let socket = null;

export const connectWithSocketIOServer = () =>{
    socket = io('http://localhost:3003');  //io function responsible for connecting to the given server

    socket.on('connect', () => {                   //that is responsible to listen to the event emitted by the server
        console.log('Connected to the socket server');
    });
 
    socket.on('online-users', (usersData) => {console.log("HI");
        onlineUsersHandler(socket.id,usersData);
    });

    socket.on('user-disconnected', (disconnectedUserSocketId) => {
        userDisconnectedHandler(disconnectedUserSocketId);
    })
};

export const login = (data) =>{          //emiiting the events for the server by the client
    socket.emit('user-login', data);
}