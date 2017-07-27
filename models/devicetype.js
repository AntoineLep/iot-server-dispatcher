'use strict';
module.exports = function(sequelize, DataTypes) {
  var DeviceType = sequelize.define('DeviceType', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      unique: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    classMethods: {
      associate: function(models) {
        DeviceType.hasMany(models.Service);
        DeviceType.hasMany(models.GenericVar);
      }
    }
  });
  return DeviceType;
};