const auth = require('../middleware/auth');

const userController = require('../controller/user');

const express = require('express');
const users = express.Router();

users.get('/me', auth, userController.getUserProfile);

users.get('/', auth, userController.getUsers);

users.post('/', auth, userController.createUser);

users.post('/:id', auth, userController.updateUser);

users.delete('/:id', auth, userController.deleteUser);

module.exports = users;
