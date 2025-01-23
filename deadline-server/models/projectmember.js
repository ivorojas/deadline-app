'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProjectMember extends Model {
    static associate(models) {}
  }
  ProjectMember.init(
    {
      userId: DataTypes.INTEGER,
      projectId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'ProjectMember',
    }
  );
  return ProjectMember;
};
