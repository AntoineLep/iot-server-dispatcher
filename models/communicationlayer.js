'use strict';
module.exports = function(sequelize, DataTypes) {
  var CommunicationLayer = sequelize.define('CommunicationLayer', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      unique: true
    },
    communicationLayerType: 
    {
      type: DataTypes.ENUM('IP', 'RF2_4G', 'RF433M', 'BT'),
      allowNull: false
    },
    IP_ip: {
      type: DataTypes.STRING,
      allowNull: true
    },
    IP_port: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    IP_protocol: {
      type: DataTypes.ENUM('HTTP', 'HTTPS'),
      allowNull: true
    },
    IP_uri: {
      type: DataTypes.STRING,
      allowNull: true
    },
    IP_method: {
      type: DataTypes.ENUM('GET', 'POST', 'PUT', 'DELETE'),
      allowNull: true
    },
    RF2_4G_identity: {
      type: DataTypes.STRING,
      allowNull: true
    },
    RF2_4G_assocKey: {
      type: DataTypes.STRING,
      allowNull: true
    },
    RF433M_identity: {
      type: DataTypes.STRING,
      allowNull: true
    },
    RF433M_assocKey: {
      type: DataTypes.STRING,
      allowNull: true
    },
    BT_identity: {
      type: DataTypes.STRING,
      allowNull: true
    },
    BT_assocKey: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    classMethods: {
      associate: function(models) {
      }
    }
  });
  return CommunicationLayer;
};