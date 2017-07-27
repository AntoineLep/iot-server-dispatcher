'use strict';
module.exports = function(sequelize, DataTypes) {
  var Device = sequelize.define('Device', {
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
    },
    state: {
      type: DataTypes.ENUM('ON', 'OFF'),
      allowNull: false
    }
  }, {
    classMethods: {
      associate: function(models) {
        Device.belongsTo(models.DeviceType);
        Device.belongsTo(models.Gateway);
        Device.hasMany(models.Var);
        Device.belongsToMany(models.App, {through: 'Subscription'});
        Device.belongsToMany(models.AppGroup, {through: 'Authorization'});
      }
    }
  });
  return Device;
};