const Sequelize = require('sequelize');
const sequelize = require('../startup/db');
const { Location } = require('../models/location');
const { Attendance } = require('../models/attendance');
const { Employee } = require('../models/employee');

const Joi = require('joi');

const Project = sequelize.define('project', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

function validateProject(project) {
  const schema = {
    name: Joi.string()
      .min(3)
      .max(255)
      .required(),
    locationId: Joi.any()
  };

  return Joi.validate(project, schema);
}

Project.belongsTo(Location);

Project.hasMany(Employee);
Project.hasMany(Attendance);

exports.Project = Project;
exports.validate = validateProject;
