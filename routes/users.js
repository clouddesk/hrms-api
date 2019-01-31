const auth = require("../middleware/auth");
const authAdmin = require("../middleware/admin");

const userController = require("../controller/user");

const express = require("express");
const users = express.Router();

users.get("/me", auth, userController.getUserProfile);

users.get("/", auth, authAdmin, userController.getUsers);

users.post("/", userController.createUser);

users.put("/:id", auth, authAdmin, userController.updateUser);

users.delete("/:id", auth, authAdmin, userController.deleteUser);

module.exports = users;
