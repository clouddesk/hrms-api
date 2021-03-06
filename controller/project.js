const _ = require('lodash');
const { Project, validate } = require('../models/project');
const { Location } = require('../models/location');

exports.createProject = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let project = new Project({
    name: req.body.name,
    locationId: req.body.locationId,
    companyId: req.user.companyId
  });
  await project.save();

  res.json(project);
};

exports.updateProject = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).json(error.details[0].message);

  let project = await Project.findByPk(+req.params.id);
  if (!project)
    return res
      .status(404)
      .json(`Project with ID ${req.params.id} doesn't exist`);

  project = await Project.update(
    {
      name: req.body.name,
      locationId: req.body.locationId
    },
    { where: { id: +req.params.id } }
  );
  res.status(200).json(project);
};

exports.deleteProject = async (req, res) => {
  let project = await Project.findByPk(+req.params.id)
    .then(project => {
      if (!project) {
        return res
          .status(404)
          .json(`Project with the given ID ${req.params.id} was not found...`);
      }
    })
    .catch(err => console.log(err));
  project = await Project.destroy({ where: { id: +req.params.id } });
  if (project) {
    res.status(200).json(project);
  }
};

exports.getProject = async (req, res) => {
  let project = await Project.findByPk(+req.params.id)
    .then(project => {
      if (!project) {
        return res
          .status(404)
          .json(`Project with the given ID ${req.params.id} was not found...`);
      }
    })
    .catch(err => console.log(err));
  project = await Project.findByPk(req.params.id);
  res.json(project);
};

exports.getAllProjects = async (req, res) => {
  project = await Project.findAll({
    where: { companyId: req.user.companyId },
    include: [{ model: Location }]
  });
  res.json(project);
};
