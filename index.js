require('dotenv').config();

// Importing necessary libraries
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userRoutes = require('./routes/userRoutes');
const transactionRoutes = require('./routes/transactionRoutes');

const MONGODB_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT || 3001;

// Express application initialization
const app = express();
app.use(express.json()); // Middleware to parse JSON

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connection established.');
    // Start the server once MongoDB is connected
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  })
  .catch(err => console.error('MongoDB connection error:', err));

// Define routes
app.use('/api/users', userRoutes);
app.use('/api/transactions', transactionRoutes);

async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

// Password verification function
async function verifyPassword(submittedPassword, storedHash) {
  return bcrypt.compare(submittedPassword, storedHash);
}

// JWT token generation function
function generateToken(userId) {
  const payload = { userId };
  const secretKey = process.env.JWT_SECRET;
  const options = { expiresIn: '1h' };
  return jwt.sign(payload, secretKey, options);
}

// JWT token verification function
function verifyToken(token) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    console.error("Token verification failed:", err.message);
    return null;
  }
}

// For extended functionality or future expansions
// async function additionalDBOperations() {
//   const { MongoClient } = require('mongodb');
//   const client = new MongoClient(MONGODB_URI);
//   try {
//     await client.connect();
//     const database = client.db('test');
//     const collection = database.collection('transactions');
//     // Perform CRUD operations here
//   } finally {
//     await client.close();
//   }
// }

indexedDB.js
