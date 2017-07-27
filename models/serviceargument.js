'use strict';
module.exports = function(sequelize, DataTypes) {
  var ServiceArgument = sequelize.define("ServiceArgument", {
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
      allowNull: true
    }
  }, {
    classMethods: {
      associate: function(models) {
      }
    }
  });
  return ServiceArgument;
};