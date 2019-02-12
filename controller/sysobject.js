const _ = require('lodash');
const { SysObject, validate } = require('../models/sysobject');
const Op = require('sequelize').Op;

exports.createSysObject = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let sysObject = new SysObject({
    name: req.body.name
  });
  await sysObject.save();

  res.json(sysObject);
};

exports.updateSysObject = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).json(error.details[0].message);

  let sysObject = await SysObject.findByPk(+req.params.id);
  if (!sysObject)
    return res
      .status(404)
      .json(`SysObject with ID ${req.params.id} doesn't exist`);

  sysObject = await SysObject.update(
    {
      name: req.body.name
    },
    { where: { id: +req.params.id } }
  );
  res.status(200).json(sysObject);
};

exports.deleteSysObject = async (req, res) => {
  let sysObject = await SysObject.findByPk(+req.params.id)
    .then(sysObject => {
      if (!sysObject) {
        return res
          .status(404)
          .json(
            `SysObject with the given ID ${req.params.id} was not found...`
          );
      }
    })
    .catch(err => console.log(err));
  sysObject = await SysObject.destroy({ where: { id: +req.params.id } });
  if (sysObject) {
    res.status(200).json(sysObject);
  }
};

exports.getSysObject = async (req, res) => {
  let sysObject = await SysObject.findByPk(+req.params.id)
    .then(sysObject => {
      if (!sysObject) {
        return res
          .status(404)
          .json(
            `SysObject with the given ID ${req.params.id} was not found...`
          );
      }
    })
    .catch(err => console.log(err));
  sysObject = await SysObject.findByPk(req.params.id);
  res.json(sysObject);
};

exports.getSysObjects = async (req, res) => {
  let limit = +req.query.limit || 10;
  let offset = limit * req.query.page;
  if (req.headers.getallsysobjects === 'yes') {
    const sysObject = await SysObject.findAll();
    res.status(200).json(sysObject);
  } else {
    if (req.query.term === 'undefined') {
      SysObject.findAndCountAll().then(data => {
        SysObject.findAll({
          limit: limit,
          offset: offset
        })
          .then(sysObjects => {
            res
              .status(200)
              .json({ items: sysObjects, total_count: data.count });
          })
          .catch(error => {
            console.log(error.details[0].message);
            res.status(500).send('Internal Server Error');
          });
      });
    } else {
      const query = `%${req.query.term}%`;
      const term = {
        name: { [Op.like]: query }
      };
      SysObject.findAndCountAll({ where: term }).then(data => {
        SysObject.findAll({
          where: term,
          limit: limit,
          offset: offset
        })
          .then(sysObjects => {
            res
              .status(200)
              .json({ items: sysObjects, total_count: data.count });
          })
          .catch(error => {
            console.log(error.details[0].message);
            res.status(500).send('Internal Server Error');
          });
      });
    }
  }
};
