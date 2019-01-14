const auth = require("../middleware/auth");

const authAdmin = require("../middleware/admin");

const employeesController = require("../controller/employee");

const express = require("express");
const employees = express.Router();

employees.get("/", auth, employeesController.getAllEmployees);

employees.get("/:id", auth, employeesController.getEmployee);

employees.post("/", auth, authAdmin, employeesController.createEmployee);

employees.post("/addpersonid/:id", auth, authAdmin, employeesController.addPersonToEmployee);

employees.post("/addpersistedfaceid/:id", auth, authAdmin, employeesController.addFaceToEmployee);

employees.delete("/removepersistedfaceid/:id", auth, authAdmin, employeesController.removeFaceFromEmployee);

employees.post("/linkphoto/:id", auth, authAdmin, employeesController.addPhotoToEmployee);

employees.delete("/unlinkphoto/:id", auth, authAdmin, employeesController.removePhotoFromEmployee);

employees.post("/:id", auth, authAdmin, employeesController.updateEmployee);

employees.delete("/:id", auth, authAdmin, employeesController.deleteEmployee);

module.exports = employees;
