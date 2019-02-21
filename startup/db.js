const Sequelize = require('sequelize');
const config = require('config');

const sequelize = new Sequelize(
  config.get('db_name'),
  config.get('db_acc'),
  config.get('db_secret'),
  {
    dialect: 'mysql',
    host: config.get('db_host'),
    timezone: 'Asia/Tbilisi'
  }
);

module.exports = sequelize;
