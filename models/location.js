const Sequelize = require('sequelize');
const sequelize = require('../startup/db');

const Joi = require('joi');

const Location = sequelize.define('location', {
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
  address: {
    type: Sequelize.STRING,
    allowNull: false
  },
  position: {
    type: Sequelize.GEOMETRY('POINT')
  }
});

function validateLocation(location) {
  const schema = {
    name: Joi.string().min(3).max(255).required(),
    address: Joi.string(),
    position: Joi.any(),
  };

  return Joi.validate(location, schema);
}

exports.Location = Location;
exports.validate = validateLocation;
