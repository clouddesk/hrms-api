const Joi = require('joi');
const bcrypt = require('bcrypt');
const { User, generateAuthToken } = require('../models/user');

exports.getToken = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  
  let user = await User.findOne({ where: { email: req.body.email } });
  if (!user) return res.status(400).json('Invalid email or password...');

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword)
    return res.status(400).json('Invalid email or password...');

  const token = generateAuthToken({
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    companyId: user.companyId
  });
  res.json(token);
};

function validate(req) {
  const schema = {
    email: Joi.string()
      .min(5)
      .max(255)
      .required()
      .email(),
    password: Joi.string()
      .min(8)
      .max(1024)
      .required(),
    companyId: Joi.string()
  };

  return Joi.validate(req, schema);
}
