const auth = require("../middleware/auth");

const mapsController = require("../controller/map");

const express = require("express");
const maps = express.Router();

maps.get("/", auth, mapsController.getLocationMap);

module.exports = maps;
