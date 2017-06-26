var socket = io();

  socket.on('connect', function() {
    console.log('client connected');
    socket.emit('createMessage', {
      from: "bobo@example.com",
      text: "im bobo"
    })
  })

  socket.on('disconnect',function() {
    console.log('disconnected from server');
  })

  socket.on('newMessage', function(data) {
    console.log(data);
  })