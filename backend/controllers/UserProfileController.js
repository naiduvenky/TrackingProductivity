const { UserProfile } = require('../models');
const joiProfile = require('joi');
const { createUserProfileSchema } = require('../validations/userProfileValidation');
const Sequelize = require('sequelize');
// Create a new user
exports.createUserProfile = async (req, res) => {
  try {
    console.log(req.body)
    // Validate user input
    const { error, value } = await createUserProfileSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    // Check if a user with the same mobileNumber or adharNumber already exists
    const existingUserProfile = await UserProfile.findOne({
      where: {
        [Sequelize.Op.or]: [
          { mobileNumber: value.mobileNumber },
          { adharNumber: value.adharNumber },
          {userId: req.user.id}
        ],
      },
    });

    if (existingUserProfile) {
      return res.status(400).json({ error: 'mobileNumber or adharNumber or userId already exists.' });
    }
   value.userId = req.user.id
    // Create a new user
    const userProfile = await UserProfile.create(value);
    return res.status(201).json(userProfile);
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: 'Failed to create userProfile' });
  }
};

// Get all users
exports.getAllUserProfiles = async (req, res) => {
  try {
    const userProfile = await UserProfile.findOne({
      where:{userId: req.user.id}
    });
    return res.status(200).json(userProfile);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to retrieve userProfile' });
  }
};

// Get a specific user by ID
exports.getUserProfileById = async (req, res) => {
  const { id } = req.params;
  try {
    const userProfile = await UserProfile.findByPk(id);
    if (!userProfile) {
      return res.status(404).json({ error: 'UserProfile not found' });
    }
    return res.status(200).json(userProfile);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to retrieve userProfile' });
  }
};

// Update a user by ID
exports.updateUserProfileById = async (req, res) => {
  const { id } = req.params;
  req.body.userId = req.user.id
  try {
    const [updated] = await UserProfile.update(req.body, {
      where: { id },
    });
    if (updated) {
      const updatedUserProfile = await UserProfile.findByPk(id);
      return res.status(200).json(updatedUserProfile);
    }
    return res.status(404).json({ error: 'UserProfile not found' });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to update userProfile' });
  }
};

// Delete a user by ID
exports.deleteUserProfileById = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await UserProfile.destroy({
      where: { id },
    });
    if (deleted) {
      return res.status(204).send();
    }
    return res.status(404).json({ error: 'UserProfile not found' });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to delete userProfile' });
  }
};
