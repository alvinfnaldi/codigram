'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Post, {
        foreignKey: "userId"
      })
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      validate : {
        notEmpty: {
          msg: "Username should not be empty"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate : {
        isEmail: {
          msg: "Please enter a valid email address"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate : {
        notEmpty: {
          msg: "Password should not be empty"
        }
      }
    },
    image: {
      type: DataTypes.STRING,
      defaultValue: "https://via.placeholder.com/100"
    },
    fullname: {
      type: DataTypes.STRING,
      defaultValue: "Ini Full Name"
    },
    bio: {
      type: DataTypes.STRING,
      defaultValue: "Ini Bio"
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};