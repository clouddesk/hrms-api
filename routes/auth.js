const authController = require("../controller/auth");

const express = require("express");
const auth = express.Router();

auth.post("/", authController.getToken);

module.exports = auth;
