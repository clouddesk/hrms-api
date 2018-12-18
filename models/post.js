const Sequelize = require("sequelize");
const sequelize = require("../startup/db");

const Joi = require("joi");

const Post = sequelize.define("post", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  description: {
    type: Sequelize.TEXT
  }
});

function validatePost(post) {
  const schema = {
    description: Joi.string().required()
  };

  return Joi.validate(post, schema);
}

exports.Post = Post;
exports.validate = validatePost;
