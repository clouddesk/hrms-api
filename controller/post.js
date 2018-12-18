const _ = require('lodash');
const { Post, validate } = require('../models/post');

exports.createPost = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).json(error.details[0].message);

  let post = new Post({
    description: req.body.description
  });
  await post.save();

  res.json(post);
};

exports.updatePost = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).json(error.details[0].message);

  let post = await Post.findByPk(+req.params.id);
  if (!post)
    return res.status(404).json(`Post with ID ${req.params.id} doesn't exist`);
  post = await Post.update(
    {
      description: req.body.description
    },
    { where: { id: +req.params.id } }
  );
  res.status(200).json(post);
};

exports.deletePost = async (req, res) => {
  let post = await Post.findByPk(+req.params.id)
    .then(post => {
      if (!post) {
        return res
          .status(404)
          .json(`Post with the given ID ${req.params.id} was not found...`);
      }
    })
    .catch(err => console.log(err));
  post = await Post.destroy({ where: { id: +req.params.id } });
  if (post) {
    res.status(200).json(post);
  }
};

exports.getAllPosts = async (req, res) => {
  res.json(
    await Post.findAll({
      attributes: ['id', 'description', 'createdAt', 'updatedAt'],
      order: [['id', 'DESC']]
    })
  );
};

exports.getPost = async (req, res) => {
  let post = await Post.findByPk(+req.params.id)
    .then(post => {
      if (!post) {
        return res
          .status(404)
          .json(`Post with the given ID ${req.params.id} was not found...`);
      }
    })
    .catch(err => console.log(err));
  post = await Post.findByPk(req.params.id, {
    attributes: ['id', 'description', 'createdAt', 'updatedAt']
  });
  res.json(post);
};
