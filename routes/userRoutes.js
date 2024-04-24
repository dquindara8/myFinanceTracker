const jwt = require('jsonwebtoken');
const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

const { body } = require('express-validator');
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware'); // Assuming you have authentication middleware

const router = express.Router();

// Register a new user
router.post('/signup', [
  body('username', 'Username is required').notEmpty(),
  body('email', 'Please include a valid email').isEmail(),
  body('password', 'Password must be 6 or more characters').isLength({ min: 6 })
], userController.signup);

// Log in a user
router.post('/login', [
  body('email', 'Please include a valid email').isEmail(),
  body('password', 'Password is required').exists()
], userController.login);

router.get('/me', authMiddleware, userController.getProfile);

router.get('/myProtectedRoute', authMiddleware, (req, res) => {
  // Protected route logic here
});


module.exports = router;
