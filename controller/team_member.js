const _ = require("lodash");
const { TeamMember, validate } = require("../models/team_member");

exports.createTeamMember = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let teamMember = new TeamMember({
    title: req.body.title,
    name: req.body.name,
    biography: req.body.biography
  });
  await teamMember.save();

  res.send(teamMember);
};

exports.updateTeamMember = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let teamMember = await TeamMember.findByPk(+req.params.id);
  if (!teamMember)
    return res
      .status(404)
      .send(`Team Member with ID ${req.params.id} doesn't exist`);
  teamMember = await TeamMember.update(
    {
      title: req.body.title,
      name: req.body.name,
      biography: req.body.biography
    },
    { where: { id: +req.params.id } }
  );
  res.status(200).send(teamMember);
};

exports.deleteTeamMember = async (req, res) => {
  let teamMember = await TeamMember.findByPk(+req.params.id)
    .then(teamMember => {
      if (!teamMember) {
        return res
          .status(404)
          .send(
            `Team Member with the given ID ${req.params.id} was not found...`
          );
      }
    })
    .catch(err => console.log(err));
  teamMember = await TeamMember.destroy({ where: { id: +req.params.id } });
  if (teamMember) {
    res.status(200).send(teamMember);
  }
};

exports.getAllTeamMembers = async (req, res) => {
  res.send(
    await TeamMember.findAll({
      attributes: ["id", "title", "name", "biography", "createdAt", "updatedAt"]
    })
  );
};

exports.getTeamMember = async (req, res) => {
  let post = await Post.findByPk(+req.params.id)
    .then(post => {
      if (!post) {
        return res
          .status(404)
          .send(`Post with the given ID ${req.params.id} was not found...`);
      }
    })
    .catch(err => console.log(err));
  post = await Post.findByPk(req.params.id, {
    attributes: ["id", "title", "description", "createdAt", "updatedAt"]
  });
  res.send(teamMember);
};
