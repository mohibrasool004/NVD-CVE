/*
jobs/syncCVE.js: Periodic job to synchronize CVE data from the NVD API.
*/

const axios = require("axios");
const cron = require("node-cron");
const cveService = require("../services/cveService");

const BASE_URL = "https://services.nvd.nist.gov/rest/json/cves/2.0";
const RESULTS_PER_PAGE = 100; // Number of records per chunk

// Function to fetch and sync CVE data in chunks
async function syncCVEData() {
  console.log("Starting CVE data synchronization...");
  let startIndex = 0;
  let totalResults = Infinity;

  try {
    while (startIndex < totalResults) {
      const response = await axios.get(BASE_URL, {
        params: {
          startIndex: startIndex,
          resultsPerPage: RESULTS_PER_PAGE,
        },
      });

      // Ensure data is valid
      if (!response.data || !response.data.vulnerabilities) {
        console.error("Invalid API response format. No vulnerabilities found.");
        break;
      }

      const data = response.data;
      totalResults = data.totalResults || 0;
      const cveItems = data.vulnerabilities || [];

      console.log(`Fetched ${cveItems.length} records starting from index ${startIndex}`);

      // Process each CVE record
      for (const item of cveItems) {
        const cve = item.cve;

        // Extract CVE Data
        const cveData = {
          cveID: cve.id, // ✅ Fix: Correct field path
          description: cve.descriptions?.find((desc) => desc.lang === "en")?.value || "No description", // ✅ Fix: Correct description extraction
          publishedDate: cve.published,
          lastModifiedDate: cve.lastModified,
          cvssV2Score: cve.metrics?.cvssMetricV2?.[0]?.cvssData?.baseScore || null, // ✅ Fix: Ensure safe access
          cvssV3Score: cve.metrics?.cvssMetricV3?.[0]?.cvssData?.baseScore || null, // ✅ Fix: Ensure safe access
        };

        // Upsert CVE data into DB
        await cveService.upsertCVE(cveData);
      }

      startIndex += RESULTS_PER_PAGE;
      if (cveItems.length === 0) break;
    }
    console.log("CVE data synchronization completed.");
  } catch (error) {
    console.error("Error during CVE synchronization:", error);
  }
}

// Schedule the job to run every day at 2 AM
const task = cron.schedule("0 2 * * *", () => {
  syncCVEData();
});

// Export a function to start the sync process (runs immediately and then schedules)
module.exports = {
  start: () => {
    // Run sync on startup
    syncCVEData();
    // Start the scheduled task
    task.start();
  },
};
