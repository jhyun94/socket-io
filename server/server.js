const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var port = process.env.PORT;
app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('new user connected');
  
  socket.emit('newMessage', generateMessage('Admin', 'Welcome to chat app'));

  socket.broadcast.emit('newMessage', generateMessage('Admin', 'User has joined'));

  socket.on('disconnect', () => {
    console.log('user disconnected');
  })

  socket.on('createMessage', (data, callback) => {;
    io.emit('newMessage', generateMessage(data.from, data.text));
    callback('hello bobo');
  })
})


server.listen(port || 3000, () => {
  console.log('You are listening on port 3000');
})