const auth = require("../middleware/auth");

const attendanceController = require("../controller/attendance");

const express = require("express");
const attendance = express.Router();

attendance.post("/", auth, attendanceController.createEvent);

module.exports = attendance;
