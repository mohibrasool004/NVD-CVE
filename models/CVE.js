/*
models/CVE.js: Mongoose model for storing CVE data.
*/

const mongoose = require('mongoose');

const CVESchema = new mongoose.Schema({
  cveID: { type: String, unique: true, required: true },
  description: { type: String },
  publishedDate: { type: Date },
  lastModifiedDate: { type: Date },
  cvssV2Score: { type: Number },
  cvssV3Score: { type: Number }
}, { timestamps: true });

module.exports = mongoose.model('CVE', CVESchema);
