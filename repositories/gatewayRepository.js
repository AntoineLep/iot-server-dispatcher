'use strict';

var models = require('../models');

var repo = {};

repo.findGatewayByNameAndApiKey = (_name, _apiKey) => {
  return models.Gateway.findOne({
    where: {
      name: _name,
      apiKey: _apiKey
    }
  });
};

repo.findGatewayByDeviceId = (_deviceId) => {
  return models.Gateway.findOne({
    include: [{
      model: models.Device,
      where: {id: _deviceId}
    }]
  });
}


module.exports = repo
