const jwt = require('jsonwebtoken');
const config = require('config');

const { User } = require('../models/user');

module.exports = function auth(req, res, next) {
  const token = req.header('x-auth-token');
  if (!token)
    return res.status(401).send('Access denied. No token provided...');

  try {
    const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
    req.user = decoded;
    User.findById(req.user.id, { attributes: ['groupId']}).then(data => (req.user.groupId = data.groupId));
    next();
  } catch (e) {
    res.status(400).send('Invalid token...');
  }
};
