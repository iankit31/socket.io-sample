const http = require('http');
const express = require('express')

const app = express()
const socketio = require('socket.io')

const server = http.createServer(app)
const io  = socketio(server)

io.on('connection',(socket) => {
    console.log('connected with socket id = ', socket.id)


    socket.on('boom' , () =>{
         console.log('boom recive from socket id = ', socket.id)
    })

    setInterval(() =>{ 
        socket.emit('whizz')
    },2000)
})



app.use('/', express.static(__dirname +'/public'))

server.listen(4444, () => {
    console.log('Started sever on http://localhost:4444')
})