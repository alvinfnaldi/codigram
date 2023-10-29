const { User, Post, sequelize } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getUsers = async (req, res) => {
  try {
    let users = await User.findAll({
      // order: [["id", "ASC"]],
      // include: [Post]
      attributes: { exclude: ["password", "fullname", "bio"] },
      include: [
        {
          model: Post,
          attributes: { exclude: ["userId"] },
        },
      ],
      order: [
        // ["id", "ASC"],
        ["createdAt", "DESC"],
      ],
    });

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
};

const userCount = async (req, res) => {
  try {
    let users = await User.count()
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
};

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // default value from models
    let image, fullname, bio;

    const userExists = await User.findOne({
      where: { email },
    });

    if (userExists) {
      res.status(400).json({
        message: "Email already used",
      });
    } else {
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(password, salt);

      const result = await User.create({
        username,
        email,
        password: hashedPassword,
        image,
        fullname,
        bio,
      });

      res.status(201).json(result);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      where: { email },
    });

    if (!user) {
      res.status(400).json({ message: "Email not found" });
    } else {
      const matchPassword = bcrypt.compareSync(password, user.password);

      if (matchPassword) {
        const token = jwt.sign(
          { username: user.username },
          process.env.SECRET_KEY,
          { expiresIn: "15s" }
        );
        res.status(200).json({
          message: "Login Success",
          token: token,
        });
      } else {
        res.status(400).json({ message: "Invalid Password" });
      }
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteUser = async (req, res) => {
  try {
    let id = +req.params.id;

    let result = await User.destroy({
      where: { id: id },
    });

    result === 1
      ? res.status(200).json({
          message: `Id ${id} has been deleted.`,
        })
      : res.status(400).json({
          message: `Id ${id} has not been deleted.`,
        });
  } catch (error) {
    res.status(500).json(error);
  }
};
const updateUser = async (req, res) => {
  try {
    let id = +req.params.id;
    const { username, email, password, image, fullname, bio } = req.body;

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    let result = await User.update(
      {
        username,
        email,
        password: hashedPassword,
        image,
        fullname,
        bio,
      },
      {
        where: { id: id },
      }
    );

    result[0] === 1
      ? res.status(200).json({
          message: `Id ${id} has been updated.`,
        })
      : res.status(400).json({
          message: `Id ${id} has not been updated.`,
        });
  } catch (error) {
    res.status(500).json(error);
  }
};
const getDetailUser = async (req, res) => {
  try {
    const id = +req.params.id;

    let result = await User.findByPk(id);

    result
      ? res.status(200).json(result)
      : res.status(404).json({
          message: `User id ${id} not found`,
        });
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteAllUsers = async (req, res) => {
  try {
    const result = await User.truncate();
    result === 0
      ? res.status(200).json({ message: "All users have been deleted" })
      : "";
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  getUsers,
  loginUser,
  registerUser,
  updateUser,
  deleteUser,
  getDetailUser,
  deleteAllUsers,
  userCount
};
