const _ = require('lodash');
const { Location, validate } = require('../models/location');
const Sequelize = require('sequelize');


exports.createLocation = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let location = new Location({
    name: req.body.name,
    address: req.body.address,
    position: Sequelize.fn(
      'Point',
      req.body.position.longitude,
      req.body.position.latitude
    ),
    companyId: req.user.companyId
  });
  await location.save();

  res.json(location);
};

exports.getLocation = async (req, res) => {
  let location = await Location.findByPk(+req.params.id)
    .then(location => {
      if (!location) {
        return res
          .status(404)
          .json(`Location with the given ID ${req.params.id} was not found...`);
      }
    })
    .catch(err => console.log(err));
  location = await Location.findByPk(req.params.id);
  res.json(location);
};

exports.getAllLocations = async (req, res) => {
  location = await Location.findAll({ where: { companyId: req.user.companyId } });
  res.json(location);
};
