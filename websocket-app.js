'use strict';

var socketioJwt   = require('socketio-jwt');
var deviceService = require('./services/deviceService');
var appService    = require('./services/appService');
var dto           = require('./dto')

// Todo bind a gateway for each device

var wsApp = {}
var gateways = {};

wsApp.listen = (io) => {
  io.sockets.on('connection', socketioJwt.authorize({
    secret: process.env.JWT_SECRET,
    timeout: 15000
  })).on('authenticated', (socket) => {
    socket.app = socket.decoded_token;

    if(socket.app.isGateway) {
      gateways[socket.app.appId] = socket.id;
    }
    else {
      deviceService.findSubscribedDevicesByAppId(socket.app.appId).then((devices) => {
        devices.forEach((device) => {
          socket.join('chan_' + device.id);
        })
      })
    }

    if(!socket.app.isGateway) {
      socket.on('subscribe', (id) => {
        appService.subscribeToDevice(socket.app.appId, id).then((success) => {
          if(success) {
            socket.join('chan_' + id);
          }
        });
      });

      socket.on('unsubscribe', (id) => {
        appService.unsubscribeToDevice(socket.app.appId, id).then((success) => {
          if(success) {
            socket.leave('chan_' + id);
          }
        });
      });

      socket.on('device-service', (id, service, args) => {
        deviceService.findDeviceGateway(id, socket.app.appId).then((gateway) => {
          if(gateway != null) {
            if(gateways.hasOwnProperty(gateway.id)) {
              socket.broadcast.to(gateways[gateway.id]).emit('device-service', {id: id, service: service, args: args});
            }
          }
        });
      });
    }
    else { // for gateways
      socket.on('device-event', (id, eventName, eventArgs) => {
        deviceService.performEventReceived(id, socket.app.appId, eventName, eventArgs).then((deviceAfter) => {
          if(deviceAfter) {
            socket.broadcast.to('chan_' + device.id).emit('device-changed', dto.Device(dto, deviceAfter));
          }
        });
      });
    }

    socket.on('disconnect', () => { 
    /* bye */
    });
  });
}

module.exports = wsApp