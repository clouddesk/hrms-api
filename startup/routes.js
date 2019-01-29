const express = require("express");
const users = require("../routes/users");
const projects = require("../routes/projects");
const locations = require("../routes/locations");
const employees = require("../routes/employees");
const attendance = require("../routes/attendance");
const reports = require("../routes/reports");
const files = require("../routes/files");
const menu = require("../routes/menu");
const auth = require("../routes/auth");
const error = require("../middleware/error");

const cors = require("cors");
const corsOptions = {
  origin: "http://localhost:4200",
  optionsSuccessStatus: 200
};

module.exports = function(app) {
  app.use(cors(corsOptions));
  app.use(express.json());
  app.use("/api/users", users);
  app.use("/api/projects", projects);
  app.use("/api/locations", locations);
  app.use("/api/employees", employees);
  app.use("/api/attendance", attendance);
  app.use("/api/reports", reports);
  app.use("/api/files", files);
  app.use("/api/menu", menu);
  app.use("/api/auth", auth);
  app.use(error);
};
