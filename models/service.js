'use strict';
module.exports = function(sequelize, DataTypes) {
  var Service = sequelize.define('Service', {
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
    description: {
      type: DataTypes.STRING(1000),
      allowNull: false
    }
  }, {
    classMethods: {
      associate: function(models) {
        Service.belongsTo(models.CommunicationLayer);
        Service.hasMany(models.ServiceArgument);
      }
    }
  });
  return Service;
};