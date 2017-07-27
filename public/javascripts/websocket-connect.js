$(function () {
  var count = 0;
  var connected = false;
  var userToken = null;

  function addElementToList(element) {
    $('#event-list').append('<li class="list-group-item">' + element + '</li>');
    count++;
    if(count > 10) {
      $('#event-list li:first-child').remove();
    }
  }

  $('#connect').on('click', () => {
    if(!connected) {
      userToken = $('#token').val();
      socket = io.connect('http://192.168.1.11:3000');

      socket.on('connect', () => {
        socket.emit('authenticate', {token: userToken})
        .on('authenticated', () => {

          addElementToList('Authenticated');
          connected = true;


          $('#subscribe').on('click', () => {
            socket.emit('subscribe', parseInt($('#subscribe_id').val()));
          });

          $('#unsubscribe').on('click', () => {
            socket.emit('unsubscribe', parseInt($('#unsubscribe_id').val()));
          });

          $('#device_service').on('click', () => {
            socket.emit('device-service', parseInt($('#device_service_id').val()), $('#device_service_service').val(), $('#device_service_args').val());
          });

          socket.on('device-service', (deviceServiceInfo) => {
            console.log('device-service request received');
            addElementToList('Received device-service: id=>' + deviceServiceInfo.id + ' service =>' + deviceServiceInfo.service + ' args=>' + deviceServiceInfo.args);
          });

          $('#unsubscribe').on('click', () => {
            socket.emit('unsubscribe', parseInt($('#unsubscribe_id').val()));
          });
        })
      });
    }
  });

});