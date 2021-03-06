const Sequelize = require('sequelize');
const sequelize = require('../startup/db');
const { Employee } = require('../models/employee');
const { Project } = require('../models/project');
const { Location } = require('../models/location');

const Joi = require('joi');

const Company = sequelize.define('company', {
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

function validateCompany(company) {
  const schema = {
    name: Joi.string()
      .min(3)
      .max(255)
      .required()
  };

  return Joi.validate(company, schema);
}

Company.hasMany(Employee);
Company.hasMany(Project);
Company.hasMany(Location);

exports.Company = Company;
exports.validate = validateCompany;
