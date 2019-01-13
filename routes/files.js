const auth = require("../middleware/auth");

const authAdmin = require("../middleware/admin");

const filesController = require("../controller/file");

const express = require("express");
const files = express.Router();

upload = require("../config/multer.config");

files.get("/", auth, filesController.listAllFiles);

files.get("/:id", auth, filesController.downloadFile);

files.post("/", auth, upload.single("file"), filesController.uploadFile);

files.delete("/:id", auth, filesController.deleteFile);

module.exports = files;
