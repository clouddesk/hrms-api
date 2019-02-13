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
  let fromDate = new Date(req.query.fromDate);
  let toDate = new Date(req.query.toDate);
  toDate.setDate(toDate.getDate() - 1)

  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };

  from = fromDate.toLocaleString('ka-GE', options);
  to = toDate.toLocaleString('ka-GE', options);
  
  console.log(from, to)

  from = from.split('.');
  from = from[2] + '-' + from[1] + '-' + from[0];

  to = to.split('.');
  to = to[2] + '-' + to[1] + '-' + to[0];

  console.log(from, to)

  await sequelize
    .query(`CALL filldates('${from}','${to}')`)
    .then(report => {
      console.log(report)
      res.send(report);
    });

};
