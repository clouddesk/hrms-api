const auth = require("../middleware/auth");

const authAdmin = require("../middleware/admin");

const menuController = require("../controller/menu");

const express = require("express");
const menu = express.Router();

menu.get("/", menuController.getMenu);

menu.post("/", auth, authAdmin, menuController.createMenuItem);

menu.post("/:id", auth, authAdmin, menuController.updateMenuItem);

menu.delete("/:id", auth, authAdmin, menuController.deleteMenuItem);

module.exports = menu;
