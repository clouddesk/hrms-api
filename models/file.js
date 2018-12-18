const Sequelize = require("sequelize");
const sequelize = require("../startup/db");

const Joi = require("joi");

const File = sequelize.define("file", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  type: {
    type: Sequelize.STRING
  },
  name: {
    type: Sequelize.STRING
  },
  data: {
    type: Sequelize.BLOB("long")
  }
});

function validateFile(file) {
  const schema = {
    type: Joi.string()
      .min(2)
      .max(255)
      .required(),
      name: Joi.string().required(),
      data: Joi.binary().required(),
  };

  return Joi.validate(file, schema);
}

exports.File = File;
exports.validate = validateFile;
