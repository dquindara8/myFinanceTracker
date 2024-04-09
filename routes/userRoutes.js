const express = require('express');
const { check } = require('express-validator'); // Optional: For validating request bodies
const router = express.Router();
const userController = require('../controllers/userController');

// POST /api/users/signup - Register a new user
router.post('/signup', [
  // Optional: Add validation checks here
  check('username', 'Username is required').notEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password must be 6 or more characters').isLength({ min: 6 })
], userController.signup);

// POST /api/users/login - Log in a user
router.post('/login', [
  // Optional: Add validation checks here
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').exists()
], userController.login);

// You can add more routes for user operations here
// For example, GET /api/users/me to fetch the logged-in user's profile
// Make sure to protect it with authentication middleware if needed

module.exports = router;
