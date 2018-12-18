const auth = require("../middleware/auth");

const authAdmin = require("../middleware/admin");

const subscriberController = require("../controller/subscriber");

const express = require("express");
const subscribers = express.Router();

subscribers.post("/subscribe", subscriberController.subscribe);

subscribers.post("/unsubscribe", auth, subscriberController.unsubscribe);

subscribers.get("/", auth, authAdmin, subscriberController.getAllSubscribers);

module.exports = subscribers;
