const { File, validate } = require('../models/file');

var stream = require('stream');

exports.uploadFile = async (req, res) => {
  // const { error } = validate(req.body);
  // if (error) return res.status(400).send(error.details[0].message);

  await File.create({
    type: req.file.mimetype,
    name: req.file.originalname,
    data: req.file.buffer
  })
    .then(file => {
      res.json({
        id: file.id
      });
    })
    .catch(err => {
      console.log(err);
      res.json({ msg: 'Error', detail: err.message });
    });
};

exports.listAllFiles = async (req, res) => {
  await File.findAll({ attributes: ['id', 'name', 'createdAt', 'updatedAt'] })
    .then(files => {
      res.json(files);
    })
    .catch(err => {
      console.log(err);
      res.json({ msg: 'Error', detail: err });
    });
};

exports.downloadFile = async (req, res) => {
  await File.findByPk(req.params.id)
    .then(file => {
      var fileContents = Buffer.from(file.data, 'base64');
      var readStream = new stream.PassThrough();
      readStream.end(fileContents);

      res.set('Content-disposition', 'attachment; filename=' + file.name);
      res.set('Content-Type', file.type);

      readStream.pipe(res);
    })
    .catch(err => {
      console.log(err);
      res.json({ msg: 'Error', detail: err });
    });
};

exports.deleteFile = async (req, res) => {
  file = await File.destroy({ where: { id: +req.params.id } });
  if (file) {
    res.status(200).json(file);
  }
};
