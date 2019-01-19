const auth = require("../middleware/auth");

const locationController = require("../controller/location");

const express = require("express");
const locations = express.Router();

locations.post("/", auth, locationController.createLocation);
locations.get("/", auth, locationController.getAllLocations);

locations.get("/:id", auth, locationController.getLocation);

module.exports = locations;
