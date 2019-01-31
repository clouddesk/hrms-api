const bcrypt = require('bcrypt');
const _ = require('lodash');
const { User, validate, generateAuthToken } = require('../models/user');
const Op = require('sequelize').Op;

exports.createUser = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).json(error.details[0].message);

  let user = await User.findAll({ where: { email: req.body.email } });
  if (user.length > 0)
    return res.status(400).json('User already registered...');

  user = new User(
    _.pick(req.body, [
      'firstName',
      'lastName',
      'email',
      'password',
      'companyId'
    ])
  );
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  const token = generateAuthToken({
    id: user['dataValues'].id,
    firstName: user['dataValues'].firstName,
    lastName: user['dataValues'].lastName,
    email: user['dataValues'].email,
    companyId: user['dataValues'].companyId
  });
  res
    .header('x-auth-token', token)
    .json(
      _.pick(user['dataValues'], [
        'id',
        'firstName',
        'lastName',
        'email',
        'companyId'
      ])
    );
};

exports.updateUser = async (req, res) => {
  let user = await User.findByPk(+req.params.id)
    .then(user => {
      if (!user) {
        return res
          .status(404)
          .json('The user with the given ID was not found.');
      } else {
        User.update({
          firstName: req.body.firstName,
          lastname: req.body.lastName
        });
      }
    })
    .catch(err => console.log(err));

  res.json(
    _.pick(user['dataValues'], ['id', 'firstName', 'lastName', 'email'])
  );
};

exports.deleteUser = async (req, res) => {
  let user = await User.find({ where: { id: +req.params.id } })
    .then(user => {
      if (!user) {
        return res
          .status(404)
          .json('The user with the given ID was not found.');
      }
    })
    .catch(err => console.log(err));
  user = await User.destroy({ where: { id: +req.params.id } }).then(() =>
    res.status(200).json('User was deleted from the system...')
  );
};

exports.getUsers = async (req, res) => {
  let limit = +req.query.limit || 10;
  let offset = limit * req.query.page;

  const user_attributes = [
    'id',
    'firstName',
    'lastName',
    'email',
    'createdAt',
    'updatedAt'
  ];

  if (req.query.term === 'undefined') {
    User.findAndCountAll({
      where: {
        id: {
          [Op.ne]: 1
        }
      }
    }).then(data => {
      User.findAll({
        attributes: user_attributes,
        limit: limit,
        offset: offset,
        where: {
          id: {
            [Op.ne]: 1
          }
        }
      })
        .then(users => {
          res.status(200).json({ items: users, total_count: data.count });
        })
        .catch(error => {
          console.log(error.details[0].message);
          res.status(500).send('Internal Server Error');
        });
    });
  } else {
    const query = `%${req.query.term}%`;
    const term = {
      id: {
        [Op.ne]: 1
      },
      [Op.or]: {
        name: { [Op.like]: query },
        email: { [Op.like]: query }
      }
    };
    User.findAndCountAll({ where: term }).then(data => {
      User.findAll({
        where: term,
        attributes: user_attributes,
        limit: limit,
        offset: offset
      })
        .then(users => {
          res.status(200).json({ items: users, total_count: data.count });
        })
        .catch(error => {
          console.log(error.details[0].message);
          res.status(500).send('Internal Server Error');
        });
    });
  }
};

exports.getUserProfile = async (req, res) => {
  const user = await User.findByPk(req.user.id, {
    attributes: ['firstName', 'lastName', 'email', 'createdAt', 'updatedAt']
  });
  res.json(user);
};
