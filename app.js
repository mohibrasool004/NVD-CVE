/*
app.js: Express application setup (without starting server).
*/

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');

const db = require('./config/db');
const cveRoutes = require('./routes/cveRoutes');

const app = express();

// Connect to MongoDB
db.connect();

// Middleware
app.use(bodyParser.json());
app.use(morgan('dev'));

// Serve static files from public folder
app.use(express.static(path.join(__dirname, 'public')));

// API routes
app.use('/cves', cveRoutes);

// Default 404 route
app.use((req, res, next) => {
  res.status(404).json({ message: 'Not Found' });
});

module.exports = app;
