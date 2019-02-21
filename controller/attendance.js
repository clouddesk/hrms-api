const _ = require('lodash');
const { Attendance, validate } = require('../models/attendance');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

exports.createEvent = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let checkOutCount = await Attendance.findAndCountAll({
    where: { employeeId: req.body.employeeId, eventTypeId: 2 }
  });

  let checkInCount = await Attendance.findAndCountAll({
    where: { employeeId: req.body.employeeId, eventTypeId: 1 }
  });

  if (req.body.eventTypeId === 1) {
    console.log('Trying to check in...');
    console.log(checkInCount.count);
    console.log(checkOutCount.count);
    if (+checkInCount.count > +checkOutCount.count) {
      console.log('checkins are higher than checkouts');
      return res
        .status(400)
        .json(`Can't check you in, you are already here....`);
    }
  } else if (req.body.eventTypeId === 2) {
    console.log('Trying to check out...');
    if (+checkOutCount.count === +checkInCount.count) {
      console.log('checkouts equal to checkins');
      return res
        .status(400)
        .json(`Can't check you out, you are already out...`);
    }
  }
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

exports.addPhotoToAttendance = async (req, res) => {
  let attendance = await Attendance.findByPk(+req.params.id);
  if (!attendance)
    return res
      .status(404)
      .json(`Attendance with ID ${req.params.id} doesn't exist`);
  attendance = await Attendance.update(
    {
      capturedPhotoFileId: req.body.file_id.id
    },
    { where: { id: +req.params.id } }
  ).catch(error => console.log(error));
  res.status(200).json(attendance);
};

exports.removePhotoFromAttendance = async (req, res) => {
  let attendance = await Attendance.findByPk(+req.params.id);
  if (!attendance)
    return res
      .status(404)
      .json(`Attendance with ID ${req.params.id} doesn't exist`);
      attendance = await Attendance.update(
    {
      capturedPhotoFileId: ''
    },
    { where: { id: +req.params.id } }
  ).catch(error => console.log(error));
  res.status(200).json(attendance);
};