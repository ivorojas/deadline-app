'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      this.belongsToMany(models.Project, {
        through: 'ProjectMembers',
        foreignKey: 'userId',
        as: 'projects',
      });
      this.hasMany(models.Task, {
        foreignKey: 'userId',
        as: 'tasks',
      });
    }
  }
  User.init(
    {
      firebaseUid: DataTypes.STRING,
      name: DataTypes.STRING,
      email: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'User',
    }
  );
  return User;
};
