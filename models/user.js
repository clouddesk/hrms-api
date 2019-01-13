const Sequelize = require('sequelize');
const sequelize = require('../startup/db');

const jwt = require('jsonwebtoken');
const config = require('config');
const Joi = require('joi');

const User = sequelize.define('user', {
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
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  companyId: {
    type: Sequelize.STRING
  }
});

function validateUser(user) {
  const schema = {
    name: Joi.string()
      .min(5)
      .max(50)
      .required(),
    email: Joi.string()
      .min(5)
      .max(255)
      .required()
      .email(),
    password: Joi.string()
      .min(8)
      .max(1024)
      .required(),
    companyId: Joi.string()
  };

  return Joi.validate(user, schema);
}

const generateAuthToken = function(payload) {
  const token = jwt.sign(payload, config.get('jwtPrivateKey'), {
    expiresIn: '1d'
  });
  return token;
};

exports.generateAuthToken = generateAuthToken;

exports.User = User;
exports.validate = validateUser;
