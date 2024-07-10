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

io.on('connection', (socket) => {
    console.log(`a user connected ${socket.id}`);
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
}
