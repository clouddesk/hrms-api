const _ = require('lodash');
const { Attendance, validate } = require('../models/attendance');
const { Employee } = require('../models/employee');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

exports.attendance = async (req, res) => {
  console.log(req.body.fromDate);
  console.log(req.body.toDate);
  console.log(req.body.projectId);
  const dateRange = {
    [Op.between]: [
      req.body.fromDate,
      req.body.toDate
    ]
  };
  const report = await Attendance.findAll({
    include: [{
      model: Employee,
    }],
    where: { createdAt: dateRange, projectId: req.body.projectId }
  });
  console.log(report);
  res.send(report);
};