const Sequelize = require('sequelize');
const sequelize = require('../startup/db');

const Joi = require('joi');

const Role = sequelize.define('role', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  type: {
    type: Sequelize.TINYINT,
  },
  description: {
    type: Sequelize.STRING,
  },
  level: {
    type: Sequelize.TINYINT,
  },
  state: {
    type: Sequelize.BOOLEAN,
  },
});

function validateRole(role) {
  const schema = {
    name: Joi.string().min(3).max(255).required(),
  };

  return Joi.validate(role, schema);
}

exports.Role = Role;
exports.validate = validateRole;
