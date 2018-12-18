const auth = require("../middleware/auth");

const authAdmin = require("../middleware/admin");

const teamMemberController = require("../controller/team_member");

const express = require("express");
const teamMembers = express.Router();

teamMembers.get("/", teamMemberController.getAllTeamMembers);

teamMembers.get("/:id", teamMemberController.getTeamMember);

teamMembers.post("/", auth, authAdmin, teamMemberController.createTeamMember);

teamMembers.post(
  "/:id",
  auth,
  authAdmin,
  teamMemberController.updateTeamMember
);

teamMembers.delete(
  "/:id",
  auth,
  authAdmin,
  teamMemberController.deleteTeamMember
);

module.exports = teamMembers;
