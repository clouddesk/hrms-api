const { User } = require('../models/user');

const { Post } = require('../models/post');

const { Employee } = require('../models/employee');

const { Company } = require('../models/company');

Post.belongsTo(User);
Employee.hasOne(Company);
User.hasOne(Employee);
