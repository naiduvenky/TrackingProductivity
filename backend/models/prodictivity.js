'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Prodictivitie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Define the association to the User model
      Prodictivitie.belongsTo(models.User, {
        foreignKey: "UserId"
        
      });
    }
  }
  Prodictivitie.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    UserId: {
      type: DataTypes.UUID,
      allowNull: false // Assuming UserId cannot be null
    },
    dateOfEntry: {
      type: DataTypes.DATE, // Data type for date and time
      allowNull: false // Assuming dateOfEntry cannot be null
    },
    subjects: {
      type: DataTypes.JSON, // Array of strings
      allowNull: false, // Assuming subjects cannot be null
      defaultValue: JSON.stringify([]) // Default value is an empty array
    },
    timing: {
      type: DataTypes.JSON, // Array of integers
      allowNull: false, // Assuming timing cannot be null
      defaultValue: JSON.stringify([]) // Default value is an empty array
    },
    productivity: {
      type: DataTypes.INTEGER, // Assuming productivity will be stored as an integer
      allowNull: false // Assuming productivity cannot be null
    }

  }, {
    sequelize,
    modelName: 'Prodictivitie',
    freezeTableName : true,
  });
  return Prodictivitie;
};