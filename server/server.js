const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');
const {generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const publicPath = path.join(__dirname, '../public');
const {Users} = require('./utils/users');


var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var port = process.env.PORT;
app.use(express.static(publicPath));
var users = new Users();
io.on('connection', (socket) => {
  console.log('new user connected');
  //join a room
  socket.on('join', (params, callback) => {
    if (!isRealString(params.name) || !isRealString(params.room)){
      callback('invalid user or room');
    }else{
      callback
    }

    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);

    io.to(params.room).emit('updateUserList', users.getUserList(params.room));
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined.`));
  })

  socket.on('disconnect', () => {
    console.log('user disconnected');
    var user = users.removeUser(socket.id);
    io.to(user.room).emit('updateUserList', users.getUserList(user.room));
  });



  socket.on('createMessage', (data, callback) => {
    var user = users.getUser(socket.id);
    io.to(user.room).emit('newMessage', generateMessage(user.name, data.text));
    callback();
  })

  socket.on('createLocationMessage', (data) => {
    var user = users.getUser(socket.id);
    io.to(user.room).emit('newLocation', generateLocationMessage(user.name, data.latitude, data.longitude));
  })


})


server.listen(port || 3000, () => {
  console.log('You are listening on port 3000');
})