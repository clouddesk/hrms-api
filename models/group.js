const Sequelize = require('sequelize');
const sequelize = require('../startup/db');

const Joi = require('joi');

const Group = sequelize.define('group', {
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
  description: {
    type: Sequelize.STRING
  },
  level: {
    type: Sequelize.TINYINT
  },
  state: {
    type: Sequelize.BOOLEAN
  }
});

function validateGroup(group) {
  const schema = {
    name: Joi.string()
      .min(3)
      .max(255)
      .required()
  };

  return Joi.validate(group, schema);
}

exports.Group = Group;
exports.validate = validateGroup;
