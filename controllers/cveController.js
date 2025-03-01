/*
controllers/cveController.js: Controller functions for CVE endpoints.
*/

const cveService = require('../services/cveService');

exports.getCVEList = async (req, res) => {
  try {
    // Extract query parameters
    const { cveID, year, score, modifiedInDays, page = 1, limit = 10 } = req.query;
    
    // Build filters based on query parameters
    let filters = {};
    if (cveID) {
      filters.cveID = cveID;
    }
    if (year) {
      // Filter by publishedDate within the given year
      filters.publishedDate = {
        $gte: new Date(`${year}-01-01`),
        $lte: new Date(`${year}-12-31`)
      };
    }
    if (score) {
      // Search in either CVSS V2 or V3 score fields
      filters.$or = [
        { cvssV2Score: Number(score) },
        { cvssV3Score: Number(score) }
      ];
    }
    if (modifiedInDays) {
      const daysAgo = new Date();
      daysAgo.setDate(daysAgo.getDate() - Number(modifiedInDays));
      filters.lastModifiedDate = { $gte: daysAgo };
    }

    const result = await cveService.getCVEList(filters, page, limit);
    res.json(result);
  } catch (error) {
    console.error('Error in getCVEList:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getCVEByID = async (req, res) => {
  try {
    const { cveID } = req.params;
    const result = await cveService.getCVEByID(cveID);
    if (result) {
      res.json(result);
    } else {
      res.status(404).json({ message: 'CVE not found' });
    }
  } catch (error) {
    console.error('Error in getCVEByID:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
