"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasOne(models.UserProfile, {
        foreignKey: "userId",
        onDelete: "CASCADE",
      });
      // Define the one-to-many relationship with Prodictivity
      User.hasMany(models.Prodictivitie, {
        foreignKey: "UserId",
        onDelete: "CASCADE",
      });
      
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        defaultValue: "default@example.com",
        unique: true, // Make email field unique
      },
      username: {
        type: DataTypes.STRING,
        unique: true, // Make username field unique
      },
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
      freezeTableName: true,
    }
  );
  return User;
};
