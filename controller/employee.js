const _ = require('lodash');
const { Employee, validate } = require('../models/employee');

// sort=${sort}&order=${order}&page=${page + 1}

exports.createEmployee = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).json(error.details[0].message);

  let employee = new Employee({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    personalId: req.body.personalId,
    birthDate: req.body.birthDate,
    mobilePhone: req.body.mobilePhone
  });
  await employee.save();

  res.json(employee);
};

exports.updateEmployee = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).json(error.details[0].message);

  let employee = await Employee.findByPk(+req.params.id);
  if (!employee)
    return res
      .status(404)
      .json(`Employee with ID ${req.params.id} doesn't exist`);
  employee = await Employee.update(
    {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      personalId: req.body.personalId,
      birthDate: req.body.birthDate,
      mobilePhone: req.body.mobilePhone
    },
    { where: { id: +req.params.id } }
  );
  res.status(200).json(employee);
};

exports.deleteEmployee = async (req, res) => {
  let employee = await Employee.findByPk(+req.params.id)
    .then(employee => {
      if (!employee) {
        return res
          .status(404)
          .json(`Employee with the given ID ${req.params.id} was not found...`);
      }
    })
    .catch(err => console.log(err));
  employee = await Employee.destroy({ where: { id: +req.params.id } });
  if (employee) {
    res.status(200).json(employee);
  }
};

exports.getAllEmployees = async (req, res) => {
  res.json(
    await Employee.findAll({
      attributes: [
        'id',
        'firstName',
        'lastName',
        'personalId',
        'birthDate',
        'mobilePhone',
        'createdAt',
        'updatedAt'
      ]
    })
  );
};

exports.getEmployee = async (req, res) => {
  let employee = await Employee.findByPk(+req.params.id)
    .then(employee => {
      if (!employee) {
        return res
          .status(404)
          .json(`Employee with the given ID ${req.params.id} was not found...`);
      }
    })
    .catch(err => console.log(err));
  employee = await Employee.findByPk(req.params.id, {
    attributes: [
      'id',
      'firstName',
      'lastName',
      'personalId',
      'birthDate',
      'mobilePhone',
      'createdAt',
      'updatedAt'
    ]
  });
  res.json(employee);
};
