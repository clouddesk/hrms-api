const auth = require("../middleware/auth");

const sysObjectController = require("../controller/sysobject");

const express = require("express");
const sysObjects = express.Router();

sysObjects.post("/", auth, sysObjectController.createSysObject);
sysObjects.get("/", auth, sysObjectController.getSysObjects);

sysObjects.get("/:id", auth, sysObjectController.getSysObject);
sysObjects.post("/:id", auth, sysObjectController.updateSysObject);
sysObjects.delete("/:id", auth, sysObjectController.deleteSysObject);

module.exports = sysObjects;
