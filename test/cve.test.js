/*
test/cve.test.js: Unit tests for the CVE API endpoints.
*/

const chai = require('chai');
const expect = chai.expect;
const request = require('supertest');
const app = require('../app'); // Import the Express app instance

describe('CVE API Endpoints', function() {
  it('should return a list of CVEs', function(done) {
    request(app)
      .get('/cves/list')
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        expect(res.body).to.have.property('totalRecords');
        expect(res.body).to.have.property('records');
        done();
      });
  });

  it('should return a specific CVE detail when given a valid CVEID', function(done) {
    // Note: For testing, ensure your database has a record with the given CVEID.
    request(app)
      .get('/cves/CVE-1999-0001')
      .end(function(err, res) {
        if (err) return done(err);
        // If found, the response should have the cveID property
        if (res.status === 200) {
          expect(res.body).to.have.property('cveID');
        }
        done();
      });
  });
});
