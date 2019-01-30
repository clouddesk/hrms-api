const auth = require("../middleware/auth");

const projectController = require("../controller/project");

const express = require("express");
const projects = express.Router();

projects.post("/", auth, projectController.createProject);
projects.get("/", auth, projectController.getAllProjects);

projects.get("/:id", auth, projectController.getProject);
projects.post("/:id", auth, projectController.updateProject);
projects.delete("/:id", auth, projectController.deleteProject);

module.exports = projects;
