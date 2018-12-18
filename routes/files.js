const auth = require("../middleware/auth");

const authAdmin = require("../middleware/admin");

const filesController = require("../controller/file");

const express = require("express");
const files = express.Router();

upload = require("../config/multer.config");

files.get("/", filesController.listAllFiles);

files.post("/", upload.single("file"), filesController.uploadFile);

files.get("/:id", filesController.downloadFile);

module.exports = files;
