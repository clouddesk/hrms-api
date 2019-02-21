const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

const faceController = require("../controller/face");

upload = require("../config/multer.config");

const express = require("express");
const face = express.Router();

face.post("/persongroups/:id", auth, admin, faceController.updatePersonGroup);
face.post("/persongroups", auth, admin, faceController.createPersonGroup);
face.get("/persongroups/:id", auth, faceController.getPersonGroup);
face.get("/persongroups", auth, faceController.listPersonGroup);
face.delete("/persongroups/:id", auth, admin, faceController.deletePersonGroup);

face.post("/persongroupsperson/:id", auth, faceController.updatePersonOfPersonGroup);
face.post("/persongroupsperson", auth, faceController.addPersonToPersonGroup);
face.get("/persongroupsperson/:id", auth, faceController.getPersonFromPersonGroup);
face.get("/persongroupsperson", auth, faceController.getPersonsFromPersonGroup);
face.delete("/persongroupsperson/:id", auth, faceController.deletePersonFromPersonGroup);

face.post("/persistedface", auth, upload.single("file"), faceController.addPersistedFace);
face.get("/persistedface/:id", auth, faceController.getPersistedFace);
face.delete("/persistedface/:id", auth, faceController.deletePersistedFace);
face.post("/detectperson", auth, upload.single("file"), faceController.detectPerson);
face.post("/verifyperson", auth, faceController.verifyPerson);

module.exports = face;
