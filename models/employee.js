const Sequelize = require('sequelize');
const sequelize = require('../startup/db');
const { Attendance } = require('../models/attendance');

const Joi = require('joi');

const Employee = sequelize.define('employee', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  personalId: {
    type: Sequelize.STRING,
    allowNull: false
  },
  birthDate: {
    type: Sequelize.DATEONLY,
    allowNull: false
  },
  mobilePhone: Sequelize.STRING,
  personId: Sequelize.STRING,
  personGroupId: Sequelize.STRING,
  employeePhotoFileId: Sequelize.STRING,
  persistedFaceId: Sequelize.STRING
});

function validateEmployee(employee) {
  const schema = {
    firstName: Joi.string()
      .min(3)
      .max(2255)
      .required(),
    lastName: Joi.string()
      .min(3)
      .max(2255)
      .required(),
    personalId: Joi.string()
      .min(11)
      .max(11)
      .required(),
    birthDate: Joi.required(),
    mobilePhone: Joi.string()
      .min(9)
      .max(9),
    personId: Joi.string(),
    personGroupId: Joi.string(),
    projectId: Joi.number(),
    employeePhotoFileId: Joi.string(),
    persistedFaceId: Joi.string()
  };

  return Joi.validate(employee, schema);
}

Employee.hasMany(Attendance);
Attendance.belongsTo(Employee);

exports.Employee = Employee;
exports.validate = validateEmployee;
