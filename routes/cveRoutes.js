/*
routes/cveRoutes.js: Express routes for CVE endpoints.
*/

const express = require('express');
const router = express.Router();
const cveController = require('../controllers/cveController');

// GET /cves/list - list CVEs with optional filtering and pagination
router.get('/list', cveController.getCVEList);

// GET /cves/:cveID - get details for a specific CVE
router.get('/:cveID', cveController.getCVEByID);

module.exports = router;
