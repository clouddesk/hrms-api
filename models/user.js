const Sequelize = require('sequelize');
const sequelize = require('../startup/db');
const { Company } = require('../models/company');
const { Project } = require('../models/project');

const jwt = require('jsonwebtoken');
const config = require('config');
const Joi = require('joi');

const { Group }  = require('../models/group')

const User = sequelize.define('user', {
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
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

function validateUser(user) {
  const schema = {
    firstName: Joi.string()
      .min(3)
      .max(50)
      .required(),
    lastName: Joi.string()
      .min(3)
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
    groupId: Joi.number(),
    companyId: Joi.number()
  };

  return Joi.validate(user, schema);
}

const generateAuthToken = function(payload) {
  const token = jwt.sign(payload, config.get('jwtPrivateKey'), {
    expiresIn: '1d'
  });
  return token;
};

User.belongsTo(Company);
User.belongsTo(Group);
User.belongsToMany(Project, { through: 'UserProject' });
Project.belongsToMany(User, { through: 'UserProject' });

exports.generateAuthToken = generateAuthToken;

exports.User = User;
exports.validate = validateUser;
