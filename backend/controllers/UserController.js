// UserController.js
const Joi = require('joi');
const { createUserSchema } = require('../validations/userValidation');
const { User } = require('../models'); // Import your User model
const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")

// Controller to create a new user
exports.createUser = async (req, res) => {
    try {
        // Validate user input
        const { error, value } = createUserSchema.validate(req.body);
    
        if (error) {
          return res.status(400).json({ error: error.details[0].message });
        }
    
        // Check if a user with the same email or username already exists
        const existingUser = await User.findOne({
          where: {
            [Sequelize.Op.or]: [
              { email: value.email },
              { username: value.username },
            ],
          },
        });
    
        if (existingUser) {
          return res.status(400).json({ error: 'Email or username already exists.' });
        }
    
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(value.password, saltRounds);
        value.password = hashedPassword;    
        // Create a new user
        const user = await User.create(value);
        delete user.dataValues.password;
        return res.status(201).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Error creating user' });
  }
};

// Controller to get a list of all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ error: 'Error fetching users' });
  }
};

// Controller to get a single user by ID
exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error: 'Error fetching user' });
  }
};

// Controller to update a user by ID
exports.updateUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const { newUser } = req.body;
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    await user.update({ newUser });
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error: 'Error updating user' });
  }
};

// Controller to delete a user by ID
exports.deleteUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    await user.destroy();
    return res.status(204).send(); // No content
  } catch (error) {
    return res.status(500).json({ error: 'Error deleting user' });
  }
};


// ...
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: 'User not existed' });
    }

    // Compare the input password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Authentication failed' });
    }

    // User is authenticated, generate a JWT token
    const secretKey = 'your-secret-key'; // Replace with your actual secret key
    const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '7h' }); // Customize the expiration time as needed

    // Return the token in the response
    return res.status(200).json({ token });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error during authentication' });
  }
};
// ...


