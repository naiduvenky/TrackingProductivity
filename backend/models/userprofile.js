'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserProfile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      UserProfile.belongsTo(models.User, {
        foreignKey: "userId",
        onDelete: "CASCADE",
      });
      // define association here
    }
  }
  UserProfile.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: true
    },
    profilePictureURL: DataTypes.STRING,
    mobileNumber: {
      type: DataTypes.STRING,
      unique: true, // Make mobileNumber field unique
    },
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    country: DataTypes.STRING,
    adharNumber: {
      type: DataTypes.STRING,
      unique: true, // Make adharNumber field unique
    },
  }, {
    sequelize,
    modelName: 'UserProfile',
    freezeTableName : true,
  });
  return UserProfile;
};