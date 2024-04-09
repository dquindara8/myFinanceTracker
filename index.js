require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const app = express();

async function startServer() {
  try {
    await mongoose.connect(process.env.ATLAS_URI);
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




const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);




const transactionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User' // This creates a reference to the User model
  },
  type: {
    type: String,
    required: true,
    enum: ['income', 'expense'] // Ensures the type is either 'income' or 'expense'
  },
  category: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  description: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

const Transaction = mongoose.model('Transaction', transactionSchema);
