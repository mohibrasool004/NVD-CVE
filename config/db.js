/*
config/db.js: MongoDB connection setup using Mongoose.
*/

const mongoose = require('mongoose');

const connect = () => {
  const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/nvd_cve_db';
  mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));
};

module.exports = { connect };
