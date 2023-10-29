const { Post, User } = require("../models");

const getPosts = async (req, res) => {
  try {
    const posts = await Post.findAll({
      // order: [["createdAt", "DESC"]],
      // attributes : { exclude: ["userId"] }, 
      include: [
        {
          model: User,
          attributes: { exclude: ["password", "bio", "email", "fullname"] },
        },
      ],
      order: [["createdAt", "DESC"]]
    });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json(error);
  }
};

const addPost = async (req, res) => {
  try {
    const { caption, image, userId } = req.body;

    const result = await Post.create({
      caption,
      image,
      userId,
    });
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

const deletePost = async (req, res) => {
  try {
    const id = +req.params.id;

    const result = await Post.destroy({
      where: { id },
    });
    result === 1
      ? res.status(200).json({ message: `Post with id ${id} has been deleted` })
      : res.status(404).json({ message: `There's no post with id ${id}` });
  } catch (error) {
    res.status(500).json(error);
  }
};

const updatePost = async (req, res) => {
  try {
    const id = +req.params.id;
    const { caption, image, userId } = req.body;

    const result = await Post.update(
      {
        caption,
        image,
        userId,
      },
      { where: { id } }
    );
    result[0] === 1
      ? res.status(200).json({ message: `Post with id ${id} has been updated` })
      : res.status(404).json({ message: `There's no post with id ${id}` });
  } catch (error) {
    res.status(500).json(error);
  }
};

const getDetailPost = async (req, res) => {
  try {
    const id = +req.params.id;
    const result = await Post.findByPk(id);
    result
      ? res.status(200).json(result)
      : res.status(404).json({
          message: `Post with id ${id} not found`,
        });
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteAllPosts = async (req, res) => {
  try {
    const result = await Post.truncate();
    result === 0
      ? res.status(200).json({ message: "All posts have been deleted" })
      : "";
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  getPosts,
  addPost,
  deletePost,
  updatePost,
  getDetailPost,
  deleteAllPosts,
};
