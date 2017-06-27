const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var port = process.env.PORT;
app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('new user connected');
  
  socket.emit('newMessage', {
    from: 'Admin',
    text: 'Welcome to the chat app',
    createdAt: new Date().getTime()
  })

  socket.broadcast.emit('newMessage', {
    from: 'Admin',
    text: 'User has joined',
    createdAt: new Date().getTime()
  })

  socket.on('disconnect', () => {
    console.log('user disconnected');
  })

  socket.on('createMessage', (data) => {
    io.emit('newMessage', {
      from: data.from,
      text: data.text,
      createdAt: new Date().getTime()
    })
  })
})


server.listen(port || 3000, () => {
  console.log('You are listening on port 3000');
})