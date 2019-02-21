const auth = require("../middleware/auth");

const attendanceController = require("../controller/attendance");

const express = require("express");
const attendance = express.Router();

attendance.post("/", auth, attendanceController.createEvent);

attendance.post("/linkphoto/:id", auth, attendanceController.addPhotoToAttendance);

attendance.delete("/unlinkphoto/:id", auth, attendanceController.removePhotoFromAttendance);


module.exports = attendance;
