var socket = io();
  var locationButton = $('#getLocation');
  socket.on('connect', function() {
    var params = $.deparam(window.location.search);
    console.log('client connected');


    socket.emit('join', params, function(err) {
      if (err){
        alert(err)
        window.location.href = '/';
      }else {

      }
    })
    
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
    scrollToBottom();
  })

  $('#message-form').on('submit', function(e){
    e.preventDefault();

    socket.emit('createMessage', {
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
    scrollToBottom();
  })
//listen for update userslist
socket.on('updateUserList', function(users){
  var ul = $('<ul></ul>');
  users.forEach(function(user){
    ul.append(`<li>${user}</li>`);
  })

  $('#users').html(ul);
})
  function scrollToBottom() {
    var $messages = $('#messages');
    var scrollHeight = $messages.prop('scrollHeight');
    var clientScroll = $messages.prop('clientHeight');
    var scrollTop = $messages.prop('scrollTop');
    var newMessageHeight = $messages.children('li:last-child').innerHeight();

    if (scrollTop + clientScroll + (newMessageHeight*2) >= scrollHeight) {
      $messages.scrollTop(scrollHeight);
    }
    
  }





