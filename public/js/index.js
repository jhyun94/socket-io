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
    var formattedTime = moment(data.createdAt).format('h:mm a');
    var template = $('#message-template').html();

    html = Mustache.render(template, {
      text: data.text,
      createdAt: formattedTime,
      from: data.from
    })
    $('#messages').append(html);
  })

  $('#message-form').on('submit', function(e){
    e.preventDefault();

    socket.emit('createMessage', {
      from: 'User',
      text: $('input[name=message]').val()
    }, function(){
      $('input[name=message]').val('');
    })
  })


  locationButton.on('click', function(e) {
    if (!navigator.geolocation) {
      alert('Your browser does not support geolocation');
    }
    locationButton.attr('disabled', 'disabled').text('sending location..')
    navigator.geolocation.getCurrentPosition(function(position){
      locationButton.removeAttr('disabled').text('Send location');
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
    var formattedTime = moment(data.createdAt).format('h:mm a');
    var template = $('#location-message-template').html();
    var html = Mustache.render(template, {
      createdAt: formattedTime,
      url: data.url,
      from: data.from
    })

    $('#messages').append(html);
  })





