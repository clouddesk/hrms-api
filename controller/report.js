const _ = require('lodash');
const { Attendance, validate } = require('../models/attendance');
const { Employee } = require('../models/employee');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const casbin = require('../startup/casbin');

exports.attendance = async (req, res) => {
  const enforcer = await casbin();
  if (await !enforcer.enforce(req.user.id, 'Model_Attendance', 'read'))
    return res.status(403).send('Access forbidden!');
  
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
  res.send(report);
};