'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Post.belongsTo(models.User, {
        foreignKey: "userId"
      })
    }
  }
  Post.init({
    caption: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Caption cannot be empty"
        }
      }
    },
    image: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Image cannot be empty"
        }
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: true,
        notEmpty: {
          msg: "UserId cannot be empty"
        }
      }
    }, 
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};