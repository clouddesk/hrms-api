const auth = require("../middleware/auth");

const authAdmin = require("../middleware/admin");

const postsController = require("../controller/post");

const express = require("express");
const posts = express.Router();

posts.get("/", postsController.getAllPosts);

posts.get("/:id", postsController.getPost);

posts.post("/", auth, authAdmin, postsController.createPost);

posts.post("/:id", auth, authAdmin, postsController.updatePost);

posts.delete("/:id", auth, authAdmin, postsController.deletePost);

module.exports = posts;
