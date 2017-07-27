'use strict';

var models      = require('../models');
var deviceRepo  = require('./deviceRepository');

var repo = {};

repo.findAppByNameAndApiKey = (_name, _apiKey) => {
  return models.App.findOne({
    where: {
      name: _name,
      apiKey: _apiKey
    }
  });
};

repo.findAppById = (_id) => {
  return models.App.findOne({
    where: { 
      id: _id 
    }
  });
};

repo.setAppRequestNumber = (_id, _requestNumber) => {
  return models.App.update(
    {requestNumber: _requestNumber}, 
    {where: {id: _id}}
  );
};

repo.subscribeToADevice = (_id, _deviceId) => {
  return models.sequelize.query("INSERT INTO Subscription (AppId, DeviceId) VALUES(:appid, :deviceid)", 
      {replacements: {appid: _id, deviceid: _deviceId}, type: models.sequelize.QueryTypes.INSERT});
};

repo.unsubscribeToADevice = (_id, _deviceId) => {
  return models.sequelize.query("DELETE FROM Subscription WHERE Subscription.AppId = :appid AND Subscription.DeviceId = :deviceid",
    {replacements: {appid: _id, deviceid: _deviceId}, type: models.sequelize.QueryTypes.DELETE})
};

module.exports = repo
