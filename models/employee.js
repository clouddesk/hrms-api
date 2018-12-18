const Sequelize = require('sequelize');
const sequelize = require('../startup/db');

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
  mobilePhone: Sequelize.STRING
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
      .max(9)
  };

  return Joi.validate(employee, schema);
}

exports.Employee = Employee;
exports.validate = validateEmployee;
