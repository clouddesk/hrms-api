const auth = require("../middleware/auth");

const permissionController = require("../controller/permission");

const express = require("express");
const permissions = express.Router();

permissions.post("/group/:id", auth, permissionController.addPermissionForGroup);
permissions.get("/group/:id", auth, permissionController.getPermissionsForGroup);
permissions.delete("/group/:id", auth, permissionController.removePermissionForGroup);

permissions.post("/user/:id", auth, permissionController.addGroupForUser);
permissions.get("/user/:id", auth, permissionController.getGroupsForUser);
permissions.delete("/user/:id", auth, permissionController.removeAllGroupsForUser);

module.exports = permissions;
