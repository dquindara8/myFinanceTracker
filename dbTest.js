require('dotenv').config();
const mongoose = require('mongoose');

async function connectToMongoDB() {
  try {
    console.log('Attempting to connect to MongoDB...');
    await mongoose.connect(process.env.ATLAS_URI);
    console.log('MongoDB connection established.');
    // Keep the process alive a little longer to see if the connection message appears
    setTimeout(() => process.exit(0), 5000); // Exit after 5 seconds
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
}

connectToMongoDB();
