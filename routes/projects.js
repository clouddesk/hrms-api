const auth = require("../middleware/auth");

const projectController = require("../controller/project");

const express = require("express");
const projects = express.Router();

projects.post("/", auth, projectController.createProject);
projects.get("/", auth, projectController.getAllProjects);

projects.get("/:id", auth, projectController.getProject);

module.exports = projects;
