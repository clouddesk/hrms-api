const Sequelize = require('sequelize');
const sequelize = require('../startup/db');

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
      .required(),
  };

  return Joi.validate(company, schema);
}

exports.Company = Company;
exports.validate = validateCompany;