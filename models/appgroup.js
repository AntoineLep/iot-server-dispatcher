'use strict';
module.exports = function(sequelize, DataTypes) {
  var AppGroup = sequelize.define('AppGroup', {
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
        AppGroup.belongsToMany(models.App, {through: 'Membership'});
        AppGroup.belongsToMany(models.Device, {through: 'Authorization'});
      }
    }
  });
  return AppGroup;
};