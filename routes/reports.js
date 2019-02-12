const auth = require("../middleware/auth");

const reportController = require("../controller/report");

const express = require("express");
const attendance = express.Router();

// attendance.post("/attendance", auth, reportController.attendance);
attendance.post("/attendance", auth, reportController.summary);

module.exports = attendance;
