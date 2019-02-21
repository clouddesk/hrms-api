const express = require('express');
const users = require('../routes/users');
const sysObjects = require('../routes/sysobjects');
const groups = require('../routes/groups');
const permissions = require('../routes/permissions');
const projects = require('../routes/projects');
const locations = require('../routes/locations');
const maps = require('../routes/maps');
const face = require('../routes/face');
const employees = require('../routes/employees');
const attendance = require('../routes/attendance');
const reports = require('../routes/reports');
const files = require('../routes/files');
const menu = require('../routes/menu');
const auth = require('../routes/auth');
const error = require('../middleware/error');
const cors = require('cors');



module.exports = function(app) {
  app.use(cors());
  app.use(express.json());
  app.use('/api/users', users);
  app.use('/api/sysobjects', sysObjects);
  app.use('/api/groups', groups);
  app.use('/api/permissions', permissions);
  app.use('/api/projects', projects);
  app.use('/api/locations', locations);
  app.use('/api/maps', maps);
  app.use('/api/face', face);
  app.use('/api/employees', employees);
  app.use('/api/attendance', attendance);
  app.use('/api/reports', reports);
  app.use('/api/files', files);
  app.use('/api/menu', menu);
  app.use('/api/auth', auth);
  app.use(error);
};
