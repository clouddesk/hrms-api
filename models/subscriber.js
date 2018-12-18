const Sequelize = require("sequelize");
const sequelize = require("../startup/db");

const Joi = require("joi");

const Subscriber = sequelize.define("subscriber", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  isSubscribed: Sequelize.BOOLEAN
});

function validateSubscriber(subscriber) {
  const schema = {
    name: Joi.string()
      .min(3)
      .max(255)
      .required(),
    email: Joi.string()
      .min(5)
      .max(255)
      .required()
      .email()
  };

  return Joi.validate(subscriber, schema);
}

exports.Subscriber = Subscriber;
exports.validate = validateSubscriber;
