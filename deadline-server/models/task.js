'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    static associate(models) {
      this.belongsTo(models.Project, {
        foreignKey: 'projectId',
        as: 'project',
      });
      this.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'assignedUser',
      });
    }
  }
  Task.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      dueDate: DataTypes.DATE,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Task',
    }
  );
  return Task;
};
