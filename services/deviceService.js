'use strict';

var deviceRepo    = require('../repositories/deviceRepository');
var varRepo       = require('../repositories/varRepository');
var gatewayRepo   = require('../repositories/gatewayRepository');
var async         = require('async');

var service = {};

function stateChanged(id, eventArgs) {
  return new Promise((resolve, reject) => {
    deviceRepo.setDeviceState(id, deviceSate).then(() => {
      resolve(true);
    });
  });
}

function varChanged(id, eventArgs) {
  return new Promise((resolve, reject) => {
    if (Array.isArray(eventArgs)) {
      async.eachSeries(eventArgs.filter((eventArg) => { // Filter on the array elements which has the correct propoerties
        return eventArg.hasOwnProperty('name') && eventArg.hasOwnProperty('value');
      }), (eventArg, callback) => { // For each of these elements update the database
        varRepo.setValueByNameAndDeviceId(eventArg.value, eventArg.name, id).then(() => {
          callback(); // Indicate the element has been performed
        })
      }, (err) => { // Function called at the end of the async.each
        if(err) {
          resolve(false);
        }
        else {
          resolve(true);
        }
      });
    }
    else {
      if(eventArgs.hasOwnProperty('name') && eventArgs.hasOwnProperty('value')){
        varRepo.setValueByNameAndDeviceId(eventArgs.value, eventArgs.name, id).then(() => {
          resolve(true);
        });
      }
    }
  });
}

service.performEventReceived = (id, gatewayId, eventName, eventArgs) => {
  return new Promise((resolve, reject) => {
    deviceRepo.findDeviceByIdAndGatewayId(id, gatewayId).then((device) => {
      if(device != null) {
        var eventNameStr = String(eventName).toLowerCase();
        
        if(eventNameStr =="statechanged") {
          stateChanged(id, eventArgs).then((success) => {
            if(success){
              deviceRepo.findDeviceByIdAndGatewayId(id, socket.app.appId).then((deviceAfter) => {
                resolve(deviceAfter);
              });
            }
            else {
              resolve(false);
            }
          });
        }
        else if (eventNameStr == "varchanged") {
          varChanged(id, eventArgs).then((success) => {
            if(success){
              deviceRepo.findDeviceByIdAndGatewayId(id, socket.app.appId).then((deviceAfter) => {
                resolve(deviceAfter);
              });
            }
            else {
              resolve(false);
            }
          });
        }
        else {
          resolve(false);
        }
      }
      else {
        resolve(false);
      }
    });
  });
};

service.findDeviceGateway = (id, appId) =>{
  return new Promise((resolve, reject) => {
    deviceRepo.findAllowedDevicesIdByAppId(appId).then((allowedDevicesId) => {
      if(allowedDevicesId.indexOf(id) != -1) {
        gatewayRepo.findGatewayByDeviceId(id).then((gateway) => {
          resolve(gateway);
        });
      }
    });
  });
};

service.findSubscribedDevicesByAppId = (appId) => {
  return deviceRepo.findSubscribedDevicesByAppId(appId);
}

module.exports = service
