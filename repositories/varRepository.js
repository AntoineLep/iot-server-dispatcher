'use strict';

var models = require('../models');

var repo = {};


repo.setValueByNameAndDeviceId = (_value, _name, _deviceId) => {
  models.Var.update({value: _value}, {
    where: {name: _name},
    include: [{
      model: models.Device,
      where: {id: _deviceId}
    }]
  });
}


module.exports = repo
