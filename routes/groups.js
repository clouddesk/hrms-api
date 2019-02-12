const auth = require("../middleware/auth");

const groupController = require("../controller/group");

const express = require("express");
const groups = express.Router();

groups.post("/", auth, groupController.createGroup);
groups.get("/", auth, groupController.getAllGroups);

groups.get("/:id", auth, groupController.getGroup);
groups.post("/:id", auth, groupController.updateGroup);
groups.delete("/:id", auth, groupController.deleteGroup);

module.exports = groups;
