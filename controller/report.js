const _ = require('lodash');
const { Attendance, validate } = require('../models/attendance');
const { Employee } = require('../models/employee');
const Sequelize = require('sequelize');
const sequelize = require('../startup/db');
const Op = Sequelize.Op;
const casbin = require('../startup/casbin');

exports.attendance = async (req, res) => {
  const enforcer = await casbin();
  if (
    await !enforcer.enforce(
      enforcer.getRolesForUser(req.user.id.toString())[0],
      'report_attendance',
      'read'
    )
  )
    return res.status(403).send('Access forbidden!');

  const dateRange = {
    [Op.between]: [req.body.fromDate, req.body.toDate]
  };
  const report = await Attendance.findAll({
    include: [
      {
        model: Employee
      }
    ],
    where: { createdAt: dateRange, projectId: req.body.projectId }
  });
  res.send(report);
};

exports.summary = async (req, res) => {
  const fromDate = new Date(req.body.fromDate)
  const toDate = new Date(req.body.fromDate)

  from = fromDate.getFullYear() + '-' + fromDate.getMonth() + '-' + fromDate.getDate()
  to = toDate.getFullYear() + '-' + toDate.getMonth() + '-' + toDate.getDate()

  /**
   * CALL filldates('2019-02-01','2019-02-28');
   */

  const summaryReport = sequelize
    .query(`CALL filldates('${from}','${to}')`)
    .then(report => {
      console.log(report);
    });

  res.send(summaryReport);
};
