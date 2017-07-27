'use strict';

var deviceRepo  = require('../repositories/deviceRepository');
var appRepo     = require('../repositories/appRepository');

var service = {};


service.subscribeToDevice = (id, idDevice) => {
  return new Promise((resolve, reject) => {
    deviceRepo.findAuthorizedDevicesIdByAppId(id).then((authorizedDeviceIds) => {
      if(authorizedDeviceIds.indexOf(idDevice) != -1) {
        appRepo.subscribeToADevice(id, idDevice)
        .then(() => { 
          resolve(true);
        }).catch((err) => {
          resolve(false)
        });
      }
    });
  });
};


service.unsubscribeToDevice = (id, idDevice) => {
  return new Promise((resolve, reject) => {
    appRepo.unsubscribeToADevice(id, idDevice)
    .then(() => { 
      resolve(true);
    }).catch((err) => {
      resolve(false)
    });
  });
};

service.incrementRequestNumber = (id) => {
  return new Promise((resolve, reject) => {
    appRepo.findAppById(id).then((matchingApp) => {
      if(matchingApp != null) {
        appRepo.setAppRequestNumber(matchingApp.id, matchingApp.requestNumber + 1).then(() => { 
          resolve(true);
        });
      }
      else {
        resolve(false);
      }
    });
  });
}

module.exports = service
