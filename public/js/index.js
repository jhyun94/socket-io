var socket = io();

  socket.on('connect', function() {
    console.log('client connected');
    
  })

  socket.on('connection', function(data) {
    console.log(data.welcome);
  })

  socket.on('disconnect',function() {
    console.log('disconnected from server');
  })

  socket.on('newMessage', function(data) {
    console.log(data);
  })