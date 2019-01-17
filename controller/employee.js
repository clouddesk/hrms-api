const _ = require('lodash');
const { Employee, validate } = require('../models/employee');
const Op = require('sequelize').Op;

exports.createEmployee = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let employee = new Employee({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    personalId: req.body.personalId,
    birthDate: req.body.birthDate,
    mobilePhone: req.body.mobilePhone,
    personGroupId: req.user.companyId,
    companyId: req.user.companyId
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

exports.addPersonToEmployee = async (req, res) => {
  let employee = await Employee.findByPk(+req.params.id);
  if (!employee)
    return res
      .status(404)
      .json(`Employee with ID ${req.params.id} doesn't exist`);
  employee = await Employee.update(
    {
      personId: req.body.personId
    },
    { where: { id: +req.params.id } }
  );
  res.status(200).json(employee);
};

exports.addFaceToEmployee = async (req, res) => {
  let employee = await Employee.findByPk(+req.params.id);
  if (!employee)
    return res
      .status(404)
      .json(`Employee with ID ${req.params.id} doesn't exist`);
  employee = await Employee.update(
    {
      persistedFaceId: req.body.persistedFaceId
    },
    { where: { id: +req.params.id } }
  );
  res.status(200).json(employee);
};

exports.removeFaceFromEmployee = async (req, res) => {
  let employee = await Employee.findByPk(+req.params.id);
  if (!employee)
    return res
      .status(404)
      .json(`Employee with ID ${req.params.id} doesn't exist`);
  employee = await Employee.update(
    {
      persistedFaceId: ''
    },
    { where: { id: +req.params.id } }
  );
  res.status(200).json(employee);
};

exports.addPhotoToEmployee = async (req, res) => {
  let employee = await Employee.findByPk(+req.params.id);
  if (!employee)
    return res
      .status(404)
      .json(`Employee with ID ${req.params.id} doesn't exist`);
  employee = await Employee.update(
    {
      employeePhotoFileId: req.body.file_id.id
    },
    { where: { id: +req.params.id } }
  ).catch(error => console.log(error));
  res.status(200).json(employee);
};

exports.removePhotoFromEmployee = async (req, res) => {
  let employee = await Employee.findByPk(+req.params.id);
  if (!employee)
    return res
      .status(404)
      .json(`Employee with ID ${req.params.id} doesn't exist`);
  employee = await Employee.update(
    {
      employeePhotoFileId: ''
    },
    { where: { id: +req.params.id } }
  ).catch(error => console.log(error));
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
  let limit = +req.query.limit || 10;
  let offset = limit * req.query.page;

  const employee_attributes = [
    'id',
    'firstName',
    'lastName',
    'personalId',
    'birthDate',
    'mobilePhone',
    'createdAt',
    'updatedAt'
  ];

  if (req.query.term === 'undefined') {
    Employee.findAndCountAll().then(data => {
      Employee.findAll({
        attributes: employee_attributes,
        limit: limit,
        offset: offset
      })
        .then(employees => {
          res.status(200).json({ items: employees, total_count: data.count });
        })
        .catch(error => {
          console.log(error.details[0].message);
          res.status(500).send('Internal Server Error');
        });
    });
  } else {
    const query = `%${req.query.term}%`;
    const term = {
      [Op.or]: {
        firstName: { [Op.like]: query },
        lastName: { [Op.like]: query }
      }
    };
    Employee.findAndCountAll({ where: term }).then(data => {
      Employee.findAll({
        where: term,
        attributes: employee_attributes,
        limit: limit,
        offset: offset
      })
        .then(employees => {
          res.status(200).json({ items: employees, total_count: data.count });
        })
        .catch(error => {
          console.log(error.details[0].message);
          res.status(500).send('Internal Server Error');
        });
    });
  }
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
      'personId',
      'personGroupId',
      'employeePhotoFileId',
      'persistedFaceId',
      'companyId',
      'createdAt',
      'updatedAt'
    ]
  });
  res.json(employee);
};
