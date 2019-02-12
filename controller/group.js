const _ = require('lodash');
const { Group, validate } = require('../models/group');
const Op = require('sequelize').Op;

exports.createGroup = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let group = new Group({
    name: req.body.name,
    name: req.body.name,
    description: req.body.description,
    level: req.body.level,
    state: req.body.state
  });
  await group.save();

  res.json(group);
};

exports.updateGroup = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).json(error.details[0].message);

  let group = await Group.findByPk(+req.params.id);
  if (!group)
    return res.status(404).json(`Group with ID ${req.params.id} doesn't exist`);

  group = await Group.update(
    {
      name: req.body.name,
      description: req.body.description,
      level: req.body.level,
      state: req.body.state
    },
    { where: { id: +req.params.id } }
  );
  res.status(200).json(group);
};

exports.deleteGroup = async (req, res) => {
  let group = await Group.findByPk(+req.params.id)
    .then(group => {
      if (!group) {
        return res
          .status(404)
          .json(`Group with the given ID ${req.params.id} was not found...`);
      }
    })
    .catch(err => console.log(err));
  group = await Group.destroy({ where: { id: +req.params.id } });
  if (group) {
    res.status(200).json(group);
  }
};

exports.getGroup = async (req, res) => {
  let group = await Group.findByPk(+req.params.id)
    .then(group => {
      if (!group) {
        return res
          .status(404)
          .json(`Group with the given ID ${req.params.id} was not found...`);
      }
    })
    .catch(err => console.log(err));
  group = await Group.findByPk(req.params.id);
  res.json(group);
};

exports.getAllGroups = async (req, res) => {
  if (req.headers.getallgroups === 'yes') {
    const groups = await Group.findAll();
    res.status(200).json(groups);
  } else {
    if (req.query.term === 'undefined') {
      let limit = +req.query.limit || 10;
      let offset = limit * req.query.page;

      Group.findAndCountAll().then(data => {
        Group.findAll({
          limit: limit,
          offset: offset
        })
          .then(groups => {
            res.status(200).json({ items: groups, total_count: data.count });
          })
          .catch(error => {
            console.log(error.details[0].message);
            res.status(500).send('Internal Server Error');
          });
      });
    } else {
      const query = `%${req.query.term}%`;
      const term = {
        [Op.or]: {
          name: { [Op.like]: query },
          email: { [Op.like]: query }
        }
      };
      Group.findAndCountAll({ where: term }).then(data => {
        Group.findAll({
          where: term,
          limit: limit,
          offset: offset
        })
          .then(groups => {
            res.status(200).json({ items: groups, total_count: data.count });
          })
          .catch(error => {
            console.log(error.details[0].message);
            res.status(500).send('Internal Server Error');
          });
      });
    }
  }
};
