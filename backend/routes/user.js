// users.js

const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

// Create a new user
router.post('/', UserController.createUser);
router.post('/login', UserController.login);

// Get a list of all users
router.get('/', UserController.getAllUsers);

// Get a single user by ID
router.get('/:id', UserController.getUserById);

// Update a user by ID
router.put('/:id', UserController.updateUserById);

// Delete a user by ID
router.delete('/:id', UserController.deleteUserById);

module.exports = router;
