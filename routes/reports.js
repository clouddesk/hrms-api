const auth = require("../middleware/auth");

const reportController = require("../controller/report");

const express = require("express");
const attendance = express.Router();

attendance.get("/attendance/summary", auth, reportController.summary);
attendance.post("/attendance", auth, reportController.attendance);

module.exports = attendance;
