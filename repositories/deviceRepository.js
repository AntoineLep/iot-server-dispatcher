'use strict';

var models = require('../models');

var repo = {};


repo.findAuthorizedDevicesIdByAppId = (_appId) => {
  return new Promise((resolve, reject) => {
    models.sequelize.query("SELECT DISTINCT(Devices.id) FROM Devices LEFT JOIN Authorization ON Devices.id = Authorization.DeviceId LEFT JOIN AppGroups ON Authorization.AppGroupId = AppGroups.id LEFT JOIN Membership ON AppGroups.id = Membership.AppGroupId WHERE Membership.AppId = :appid", 
      {replacements: {appid: _appId}, type: models.sequelize.QueryTypes.SELECT})
    .then((devicesId) => {
      resolve(devicesId.map((item) => {
        return item.id;
      }));
    });
  });
}

repo.findDevicesByAppId = (_appId) => {
  return new Promise((resolve, reject) => {
    repo.findAuthorizedDevicesIdByAppId(_appId).then((devicesId) => {
      resolve(models.Device.findAll({
        where: {id: devicesId},
        include: [
          {model: models.DeviceType,
            include: [{
              model: models.Service,
              include: [{model: models.ServiceArgument}]
            }]
          },{
            model: models.Var,
            include: [{
              model: models.GenericVar,
              include: [{model: models.VarType}]
            }]
          }
        ]
      }));
    })
  });
};

repo.findDeviceByIdAndAppId = (_id, _appId) => {
  return models.Device.findOne({
    where: {id: _id},
    include: [
      {
        model: models.AppGroup,
        include: [{
          model: models.App,
          where: {id: _appId}
        }]
      },
      {
        model: models.DeviceType,
        include: [{
          model: models.Service,
          include: [{model: models.ServiceArgument}]
        }]
      },{
        model: models.Var,
        include: [{
          model: models.GenericVar,
          include: [{model: models.VarType}]
        }]
      }
    ]
  })
};

repo.findDeviceByIdAndGatewayId = (_id, _gatewayId) => {
  return models.Device.findOne({
    where: {id: _id},
    include: [
      {
        model: models.Gateway,
        where: {id: _gatewayId}
      },
      {model: models.DeviceType,
        include: [{
          model: models.Service,
          include: [{model: models.ServiceArgument}]
        }]
      },{
        model: models.Var,
        include: [{
          model: models.GenericVar,
          include: [{model: models.VarType}]
        }]
      }
    ]
  })
};

repo.findSubscribedDevicesByAppId = (_appId) => {
  return models.Device.findAll({
    include: [{
      model: models.App,
      where: {id: _appId}
    }]
  });
};


repo.findDevicesByGatewayId = (_gatewayId) => {
  return models.Device.findAll({
    include: [
      {
        model: models.Gateway,
        where: {id: _gatewayId}
      },
      {
        model: models.DeviceType,
        include: [{
          model: models.Service,
          include: [
            {model: models.CommunicationLayer},
            {model: models.ServiceArgument}
          ]
        }]
      },{
        model: models.Var,
        include: [{
          model: models.GenericVar,
          include: [{model: models.VarType}]
        }]
      }
    ]
  });
};

repo.setDeviceState = (_id, _state) => {
  newState = (String(_state).toLowerCase() == "on" || _state == true) ? "ON" : "OFF";
  return models.Device.update(
    {state: newState}, 
    {where: {id: _id}}
  );
}


module.exports = repo
