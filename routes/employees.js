const auth = require("../middleware/auth");

const authAdmin = require("../middleware/admin");

const employeesController = require("../controller/employee");

const express = require("express");
const employees = express.Router();

employees.get("/", auth, employeesController.getAllEmployees);

employees.get("/:id", auth, employeesController.getEmployee);

employees.post("/", auth, authAdmin, employeesController.createEmployee);

employees.post("/:id", auth, authAdmin, employeesController.updateEmployee);

employees.delete("/:id", auth, authAdmin, employeesController.deleteEmployee);

module.exports = employees;
