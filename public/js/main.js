/* public/js/main.js: JavaScript for the CVE List UI */

document.addEventListener('DOMContentLoaded', () => {
    let currentPage = 1;
    let resultsPerPage = document.getElementById('resultsPerPage').value;
  
    const loadCVEList = async () => {
      try {
        const response = await fetch(`/cves/list?page=${currentPage}&limit=${resultsPerPage}`);
        const data = await response.json();
        populateTable(data.records);
        document.getElementById('totalRecords').innerText = data.totalRecords;
        document.getElementById('currentPage').innerText = currentPage;
      } catch (error) {
        console.error('Error fetching CVE list:', error);
      }
    };
  
    const populateTable = (records) => {
      const tbody = document.querySelector('#cveTable tbody');
      tbody.innerHTML = '';
      records.forEach(record => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${record.cveID}</td>
          <td>${record.description.substring(0, 100)}...</td>
          <td>${new Date(record.publishedDate).toLocaleDateString()}</td>
          <td>${new Date(record.lastModifiedDate).toLocaleDateString()}</td>
        `;
        // On click, navigate to the detail page with query parameter
        tr.addEventListener('click', () => {
          window.location.href = `/cve-details.html?cveID=${record.cveID}`;
        });
        tbody.appendChild(tr);
      });
    };
  
    document.getElementById('resultsPerPage').addEventListener('change', (e) => {
      resultsPerPage = e.target.value;
      currentPage = 1; // reset page on change
      loadCVEList();
    });
  
    document.getElementById('prevPage').addEventListener('click', () => {
      if (currentPage > 1) {
        currentPage--;
        loadCVEList();
      }
    });
  
    document.getElementById('nextPage').addEventListener('click', () => {
      currentPage++;
      loadCVEList();
    });
  
    // Initial load
    loadCVEList();
  });
  