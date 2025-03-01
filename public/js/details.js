/* public/js/details.js: JavaScript for the CVE Detail UI */

document.addEventListener('DOMContentLoaded', async () => {
    // Get cveID from URL query parameters
    const urlParams = new URLSearchParams(window.location.search);
    const cveID = urlParams.get('cveID');
  
    if (!cveID) {
      document.getElementById('cveDetail').innerText = 'CVE ID not provided.';
      return;
    }
  
    try {
      const response = await fetch(`/cves/${cveID}`);
      if (response.ok) {
        const data = await response.json();
        displayCveDetails(data);
      } else {
        document.getElementById('cveDetail').innerText = 'CVE not found.';
      }
    } catch (error) {
      console.error('Error fetching CVE details:', error);
      document.getElementById('cveDetail').innerText = 'Error fetching CVE details.';
    }
  });
  
  function displayCveDetails(data) {
    const container = document.getElementById('cveDetail');
    container.innerHTML = `
      <h2>${data.cveID}</h2>
      <p><strong>Description:</strong> ${data.description}</p>
      <p><strong>Published Date:</strong> ${new Date(data.publishedDate).toLocaleString()}</p>
      <p><strong>Last Modified Date:</strong> ${new Date(data.lastModifiedDate).toLocaleString()}</p>
      <p><strong>CVSS V2 Score:</strong> ${data.cvssV2Score || 'N/A'}</p>
      <p><strong>CVSS V3 Score:</strong> ${data.cvssV3Score || 'N/A'}</p>
    `;
  }
  