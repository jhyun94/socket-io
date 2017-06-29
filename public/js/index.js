var socket = io();
  var locationButton = $('#getLocation');
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


  locationButton.on('click', function(e) {
    if (!navigator.geolocation) {
      alert('Your browser does not support geolocation');
    }

    navigator.geolocation.getCurrentPosition(function(position){
      socket.emit('createLocationMessage', {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      })
    }, function() {
      alert('unable to fetch data');
    })
  })

//listen for newLocation
  socket.on('newLocation', function(data){
    console.log(data);
    var li = $('<li></li>');
    var a = $('<a target="_blank">My current location</a>');
    a.attr('href', data.url);
    li.append(a);
    $('#messages').append(li);
  })







