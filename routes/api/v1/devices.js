'use strict';

var express     = require('express');
var _           = require('lodash');
var validator   = require('validator');
var deviceRepo  = require ('../../../repositories/deviceRepository');
var dto         = require('../../../dto');

var router  = express.Router();

// GET devices list
router.get('/', (req, res) => {
  if(req.decoded.isGateway){
    deviceRepo.findDevicesByGatewayId(req.decoded.appId).then((devices) => {
      return res.json(devices.map((device) => { 
        return dto.DeviceFull(dto, device);
      }));
    });
  }
  else {
    deviceRepo.findDevicesByAppId(req.decoded.appId).then((devices) => {
      return res.json(devices.map((device) => { 
        return dto.Device(dto, device);
      }));
    });
  }
});

// GET device subscriptions list
router.get('/subscriptions', (req, res) => {
  deviceRepo.findSubscribedDevicesByAppId(req.decoded.appId).then((devices) => {
    return res.json(devices.map((device) => { 
      return dto.DeviceLight(dto, device);
    }));
  })
});

// GET device with its id
router.get('/:id', (req, res) => {
  if(validator.isInt(req.params.id)) {
    deviceRepo.findDeviceByIdAndAppId(req.params.id, req.decoded.appId).then((device) => {
      return res.json(dto.Device(dto, device));
    });
  }
  else { 
    return res.status(400).json({success: false, message: 'The url id field must be an integer'});
  }
});


module.exports = router;
