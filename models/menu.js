const Sequelize = require("sequelize");
const sequelize = require("../startup/db");

const Joi = require("joi");

const Menu = sequelize.define("menu", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  sequence: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  link: {
    type: Sequelize.STRING,
  },
  icon: {
    type: Sequelize.STRING,
  },
  description: {
    type: Sequelize.STRING
  },
  hasParent: {
    type: Sequelize.BOOLEAN
  },
  parent: {
    type: Sequelize.INTEGER
  }
});

function validateMenu(menu) {
  const schema = {
    sequence: Joi.number().required(),
    name: Joi.string()
      .min(3)
      .max(50)
      .required(),
    link: Joi.string().max(50),
    icon: Joi.string(),
    description: Joi.string(),
    hasParent: Joi.bool(),
    parent: Joi.number()
  };

  return Joi.validate(menu, schema);
}

exports.Menu = Menu;
exports.validate = validateMenu;
