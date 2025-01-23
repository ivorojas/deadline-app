'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    static associate(models) {
      this.belongsToMany(models.User, {
        through: 'ProjectMembers',
        foreignKey: 'projectId',
        as: 'members',
      });
      this.hasMany(models.Task, {
        foreignKey: 'projectId',
        as: 'tasks',
      });
    }
  }
  Project.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Project',
    }
  );
  return Project;
};
