# NVD CVE API Project

This project retrieves CVE information from the NVD CVE API, stores it in a MongoDB database, and provides API endpoints to list and filter CVE data. It also includes a simple front-end UI for displaying the CVE list and details.

## Project Structure

project-folder/ │ ├── app.js # Express app setup ├── server.js # Server entry point ├── package.json # Project dependencies and scripts ├── config/ │ └── db.js # MongoDB connection configuration ├── models/ │ └── CVE.js # Mongoose model for CVE data ├── routes/ │ └── cveRoutes.js # Express routes for CVE endpoints ├── controllers/ │ └── cveController.js # Controller functions for API endpoints ├── services/ │ └── cveService.js # Service layer for DB operations ├── jobs/ │ └── syncCVE.js # Job to sync CVE data from NVD API ├── public/ │ ├── index.html # UI for CVE list │ ├── cve-details.html # UI for CVE details │ ├── css/ │ │ └── styles.css # CSS styling │ └── js/ │ ├── main.js # JavaScript for index.html │ └── details.js # JavaScript for cve-details.html └── test/ └── cve.test.js # Unit tests for API endpoints


## Setup Instructions

1. **Clone the repository** and navigate into the project directory.
2. **Install dependencies** using:
npm install
3. **Set up MongoDB:**
- Ensure MongoDB is installed and running.
- By default, the application connects to `mongodb://localhost:27017/nvd_cve_db`. You can change this by setting the `MONGO_URI` environment variable.
4. **Run the server:**
npm start
The server will start on port 3000 by default.

5. **Access the UI:**
- Open your browser and navigate to `http://localhost:3000/index.html` to see the CVE list.
- Click on a CVE row to view details.

6. **Run Tests:**
npm test


## API Endpoints

- **GET /cves/list**
- **Description:** Retrieve a paginated list of CVEs.
- **Query Parameters:**
 - `cveID` (optional): Filter by CVE ID.
 - `year` (optional): Filter by published year.
 - `score` (optional): Filter by CVSS score.
 - `modifiedInDays` (optional): Filter by CVE modified in the last N days.
 - `page` (optional): Page number (default: 1).
 - `limit` (optional): Records per page (default: 10).

- **GET /cves/:cveID**
- **Description:** Retrieve detailed information for a specific CVE.

## Notes

- The CVE data is synchronized from the NVD API periodically (every day at 2 AM). You can adjust the schedule in `jobs/syncCVE.js`.
- Data cleansing and de-duplication are handled during the upsert process in the database.
- The project follows best practices and includes unit tests for the API endpoints.
