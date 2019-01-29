const _ = require('lodash');
const { Attendance, validate } = require('../models/attendance');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

exports.createEvent = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let attendance = new Attendance({
    eventTypeId: req.body.eventTypeId,
    position: Sequelize.fn(
      'Point',
      req.body.position.longitude,
      req.body.position.latitude
    ),
    employeeId: req.body.employeeId,
    projectId: req.body.projectId
  });
  await attendance.save();

  res.json(attendance);
};
