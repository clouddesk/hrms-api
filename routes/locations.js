const auth = require("../middleware/auth");

const locationController = require("../controller/location");

const express = require("express");
const locations = express.Router();

locations.post("/", auth, locationController.createLocation);
locations.get("/", auth, locationController.getAllLocations);

locations.get("/:id", auth, locationController.getLocation);
locations.delete("/:id", auth, locationController.deleteLocation);

module.exports = locations;
