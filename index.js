require('dotenv').config();

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connection established.'))
  .catch(err => console.error('MongoDB connection error:', err));




const dbHost = process.env.DB_HOST;
const jwtSecret = process.env.JWT_SECRET;



const jwt = require('jsonwebtoken');

const token = jwt.sign({ data: 'your data here' }, process.env.JWT_SECRET, { expiresIn: '180d' });



const express = require('express');
const app = express();

async function startServer() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connection established.');

    app.listen(3000, () => {
      console.log('Server is running on http://localhost:3000');
    });
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
  }
}

startServer();


process.stdin.resume();

setTimeout(() => console.log('Timeout reached'), 20000); // 20-second delay






const connectDB = require('./config/db');

// Connect to MongoDB
connectDB();

app.use(express.json()); // Middleware to parse JSON

// Define routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/transactions', require('./routes/transactionRoutes'));





const bcrypt = require('bcryptjs');

async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10); // Generate a salt
  const hashedPassword = await bcrypt.hash(password, salt); // Hash the password with the salt
  return hashedPassword;
}






async function verifyPassword(submittedPassword, storedHash) {
  const isMatch = await bcrypt.compare(submittedPassword, storedHash);
  return isMatch; // true if the password matches, false otherwise
}






function generateToken(userId) {
  const payload = { userId };
  const secretKey = 'yourSecretKey'; // Should be in your environment variables
  const options = { expiresIn: '1h' }; // Token expires in 1 hour
  const token = jwt.sign(payload, secretKey, options);
  return token;
}






function verifyToken(token) {
  const secretKey = 'yourSecretKey'; // Same key used for signing the tokens
  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded; // Decoded payload if the token is valid
  } catch (err) {
    console.error("Token verification failed:", err.message);
    return null; // or handle the error appropriately
  }
}


const PORT = process.env.PORT || 3001; // Use 3001 instead of 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
