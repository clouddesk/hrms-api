const auth = require("../middleware/auth");

const authAdmin = require("../middleware/admin");

const attendanceController = require("../controller/attendance");

const express = require("express");
const attendance = express.Router();

attendance.post("/", auth, authAdmin, attendanceController.createEvent);

module.exports = attendance;
