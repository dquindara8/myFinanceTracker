require('dotenv').config();

const mongoose = require('mongoose');

const atlasUri = process.env.ATLAS_URI;

mongoose.connect(atlasUri)
  .then(() => console.log('MongoDB connection established.'))
  .catch((error) => console.error('MongoDB connection error:', error));
