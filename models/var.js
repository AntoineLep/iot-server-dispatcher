'use strict';
module.exports = function(sequelize, DataTypes) {
  var Var = sequelize.define("Var", {
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
    value: {
      type: DataTypes.STRING(1000),
      allowNull: true
    }
  }, {
    classMethods: {
      associate: function(models) {
        Var.belongsTo(models.GenericVar);
      }
    }
  });
  return Var;
};