const Sequelize = require("sequelize");
const sequelize = require("../startup/db");

const Joi = require("joi");

const TeamMember = sequelize.define("team_member", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  biography: {
    type: Sequelize.TEXT
  }
});

function validateTeamMember(teamMember) {
  const schema = {
    title: Joi.string()
      .min(3)
      .max(255),
    name: Joi.string()
      .min(3)
      .max(255)
      .required(),
    biography: Joi.required()
  };

  return Joi.validate(teamMember, schema);
}

exports.TeamMember = TeamMember;
exports.validate = validateTeamMember;
