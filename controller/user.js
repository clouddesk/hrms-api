const bcrypt = require("bcrypt");
const _ = require("lodash");
const { User, validate, generateAuthToken } = require("../models/user");

exports.createUser = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).json(error.details[0].message);

  let user = await User.findAll({ where: { email: req.body.email } });
  if (user.length > 0)
    return res.status(400).json("User already registered...");

  user = new User(_.pick(req.body, ["name", "email", "password", "companyId"]));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  const token = generateAuthToken({
    id: user["dataValues"].id,
    name: user["dataValues"].name,
    email: user["dataValues"].email,
    companyId: user["dataValues"].companyId,
  });
  res
    .header("x-auth-token", token)
    .json(_.pick(user["dataValues"], ["id", "name", "email", "companyId"]));
};

exports.updateUser = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).json(error.details[0].message);

  const user = await User.update(
    { name: req.body.name, password: req.body.password },
    { where: { email: req.body.email } }
  );

  res.json(_.pick(user["dataValues"], ["id", "name", "email"]));
};

exports.deleteUser = async (req, res) => {
  let user = await User.find({ where: { id: +req.params.id } })
    .then(user => {
      if (!user) {
        return res
          .status(404)
          .json("The user with the given ID was not found.");
      }
    })
    .catch(err => console.log(err));
  user = await User.destroy({ where: { id: +req.params.id } }).then(() =>
    res.status(200).json("User was deleted from the system...")
  );
};

exports.getUsers = async (req, res) => {
  res.json(
    await User.findAll({
      attributes: ["name", "email", "createdAt", "updatedAt"]
    })
  );
};

exports.getUserProfile = async (req, res) => {
  const user = await User.findByPk(req.user.id, {
    attributes: ["name", "email", "createdAt", "updatedAt"]
  });
  res.json(user);
};
