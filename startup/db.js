const Sequelize = require('sequelize');

const sequelize = new Sequelize('hrms', 'root', 'root', {
  dialect: 'mysql',
  host: 'localhost',
  timezone: 'Asia/Tbilisi'
});

module.exports = sequelize;
