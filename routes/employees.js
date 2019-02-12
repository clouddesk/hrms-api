const auth = require("../middleware/auth");

const employeesController = require("../controller/employee");

const express = require("express");
const employees = express.Router();

employees.get("/", auth, employeesController.getAllEmployees);

employees.get("/:id", auth, employeesController.getEmployee);

employees.post("/", auth, employeesController.createEmployee);

employees.post("/addpersonid/:id", auth, employeesController.addPersonToEmployee);

employees.post("/addpersistedfaceid/:id", auth, employeesController.addFaceToEmployee);

employees.delete("/removepersistedfaceid/:id", auth, employeesController.removeFaceFromEmployee);

employees.post("/linkphoto/:id", auth, employeesController.addPhotoToEmployee);

employees.delete("/unlinkphoto/:id", auth, employeesController.removePhotoFromEmployee);

employees.post("/:id", auth, employeesController.updateEmployee);

employees.delete("/:id", auth, employeesController.deleteEmployee);

module.exports = employees;
