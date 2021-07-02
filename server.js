const http = require('http');
const express = require('express')

const app = express()
const socketio = require('socket.io')

const server = http.createServer(app)
const io  = socketio(server)

let users = { 
    
}
io.on('connection',(socket) => {
    console.log('connected with socket id = ', socket.id)
    
    socket.on('login' , (data) =>{
        //  console.log('recived ', data.msg)
        if(users[data.username]){
            if(users[data.username] == data.password){
                socket.join(data.username)
                socket.emit('logged_in')
            }else{
                socket.emit('login_failed')
            }
        }else{
            users[data.username] = data.password
            socket.join(data.username)
            socket.emit('logged_in')
        }
        console.log(users)
    })


    socket.on('msg_send', (data) =>{

        if(data.to){
            io.to(data.to).emit('msg_rcvd', data)
        }else{
            socket.broadcast.emit('msg_rcvd', data)
        }

    })

})


app.use('/', express.static(__dirname +'/public'))

server.listen(4444, () => {
    console.log('Started sever on http://localhost:4444')
})