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
    var li = $('<li></li>');
    li.text(`${data.from}: ${data.text}`);
    $('#messages').append(li);
  })

  $('#message-form').on('submit', function(e){
    e.preventDefault();

    socket.emit('createMessage', {
      from: 'User',
      text: $('input[name=message]').val()
    }, function(){

    })
  })