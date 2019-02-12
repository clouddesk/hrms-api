const _ = require('lodash');
const { Menu, validate } = require('../models/menu');

exports.createMenuItem = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).json(error.details[0].message);

  let menuItem = await Menu.findAll({
    where: { name: req.body.name }
  });
  if (menuItem.length > 0)
    return res
      .status(400)
      .json(
        `Menu item with the name ${req.body.name} is already registered...`
      );

  menuItem = new Menu({
    sequence: req.body.sequence,
    name: req.body.name,
    link: req.body.link,
    icon: req.body.icon,
    description: req.body.description,
    hasParent: req.body.hasParent,
    parent: req.body.parent
  });
  await menuItem.save();

  res.json(
    await Menu.findAll({
      attributes: [
        'id',
        'sequence',
        'name',
        'link',
        'icon',
        'description',
        'hasParent',
        'parent'
      ]
    })
  );
};

exports.updateMenuItem = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).json(error.details[0].message);

  let menuItem = await Menu.findByPk(+req.params.id);
  if (!menuItem)
    return res.status(404).json(`Menu with ID ${req.params.id} doesn't exist`);
  menuItem = await Menu.update(
    {
      sequence: req.body.sequence,
      name: req.body.name,
      description: req.body.description,
      tooltip: req.body.tooltip,
      hasParent: req.body.hasParent,
      parent: req.body.parent
    },
    { where: { id: +req.params.id } }
  );
  res.status(200).json(
    await Menu.findAll({
      attributes: [
        'id',
        'sequence',
        'name',
        'link',
        'icon',
        'description',
        'hasParent',
        'parent'
      ]
    })
  );
};

exports.deleteMenuItem = async (req, res) => {
  let menuItem = await Menu.findByPk(+req.params.id)
    .then(menuItem => {
      if (!menuItem) {
        return res
          .status(404)
          .json(
            `Menu item with the given ID ${req.params.id} was not found...`
          );
      }
    })
    .catch(err => console.log(err));
  menuItem = await Menu.destroy({ where: { id: +req.params.id } });
  if (menuItem) {
    res.status(200).json(
      await Menu.findAll({
        attributes: [
          'id',
          'sequence',
          'name',
          'link',
          'icon',
          'description',
          'hasParent',
          'parent'
        ]
      })
    );
  }
};

exports.getMenu = async (req, res) => {
  res.json(
    await Menu.findAll({
      attributes: [
        'id',
        'sequence',
        'name',
        'link',
        'icon',
        'description',
        'hasParent',
        'parent'
      ]
    })
  );
};
