const express = require('express')
const app = express()
const http = require('http')
const cors = require('cors')

const server =  http.createServer(app);
const { Server } = require("socket.io");


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

io.on('connection', (socket) => {             //emit an event 
    console.log(`a user connected ${socket.id}`);
    socket.on('user-login', (data) => loginEventHandler(socket, data));


    socket.on('disconnect', () => {
        disconnectEventHandler(socket.id);
    })
});

const PORT = process.env.PORT || 3003;

server.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})

//socket events
const disconnectEventHandler = (id) =>{
    console.log(`User Disconnected ${id}`)
    removeOnlineUser(id);
    
};

const removeOnlineUser = (id) => {
    if(onlineUsers[id]){
        delete onlineUsers[id];
    };
    broadDisconnectedUserDetails(id);
    console.log(onlineUsers);
};

const broadDisconnectedUserDetails = (disconnectedUserSocketId) =>{
    io.to('logged-users').emit('user-disconnected', disconnectedUserSocketId);
};

const loginEventHandler = (socket, data) => {

    socket.join("logged-users");  // all logged-in user will join the room named as logged-users

    onlineUsers[socket.id] = {
        username: data.username,
        coords: data.coords,
    };

    console.log(onlineUsers);

    io.to('logged-users').emit("online-users", convertOnlineUsersToArray());
    
};

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
