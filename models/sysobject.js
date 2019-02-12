const Sequelize = require('sequelize');
const sequelize = require('../startup/db');

const Joi = require('joi');

const { Role } = require('./role');

const SysObject = sequelize.define('sysobject', {
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

function validateSysObject(sysObject) {
  const schema = {
    name: Joi.string()
      .min(3)
      .max(255)
      .required()
  };

  return Joi.validate(sysObject, schema);
}

exports.SysObject = SysObject;
exports.validate = validateSysObject;
