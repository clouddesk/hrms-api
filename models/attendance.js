const Sequelize = require('sequelize');
const sequelize = require('../startup/db');

const Joi = require('joi');

const Attendance = sequelize.define('attendance', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  eventTypeId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  position: {
    type: Sequelize.GEOMETRY('POINT')
  },
  capturedPhotoFileId: Sequelize.STRING,
});

function validateAttendance(attendance) {
  const schema = {
    eventTypeId: Joi.number().required(),
    position: Joi.any(),
    projectId: Joi.any(),
    employeeId: Joi.number(),
    capturedPhotoFileId: Joi.number()
  };

  return Joi.validate(attendance, schema);
}

exports.Attendance = Attendance;
exports.validate = validateAttendance;
