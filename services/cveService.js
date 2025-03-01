/*
services/cveService.js: Service functions to interact with the CVE database.
*/

const CVE = require('../models/CVE');

exports.getCVEList = async (filters, page, limit) => {
  const skip = (page - 1) * limit;
  const total = await CVE.countDocuments(filters);
  const records = await CVE.find(filters)
    .skip(skip)
    .limit(Number(limit))
    .sort({ publishedDate: -1 });
  return { totalRecords: total, page: Number(page), records };
};

exports.getCVEByID = async (cveID) => {
  return await CVE.findOne({ cveID });
};

// Upsert (insert/update) a CVE record into the database
exports.upsertCVE = async (cveData) => {
  try {
    await CVE.updateOne(
      { cveID: cveData.cveID },
      { $set: cveData },
      { upsert: true }
    );
  } catch (error) {
    console.error('Error in upserting CVE:', error);
  }
};
