const http = require('http');
const express = require('express')

const app = express()
const socketio = require('socket.io')

const server = http.createServer(app)
const io  = socketio(server)

io.on('connection',(socket) => {
    console.log('connected with socket id = ', socket.id)
    
    socket.on('login' , (data) =>{
        //  console.log('recived ', data.msg)
        socket.join(data.username)
        socket.emit('logged_in')
    })

})



app.use('/', express.static(__dirname +'/public'))

server.listen(4444, () => {
    console.log('Started sever on http://localhost:4444')
})