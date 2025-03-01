/*
server.js: Starting the Express server.
*/

const app = require('./app');
const syncCVEJob = require('./jobs/syncCVE');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Start the periodic CVE sync job
syncCVEJob.start();
