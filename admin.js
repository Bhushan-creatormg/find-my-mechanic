// Admin dashboard script to load mechanics from Google Sheets JSON
const SHEET_URL = 'https://opensheet.elk.sh/YOUR_GOOGLE_SHEET_ID/Form+Responses+1';

async function loadMechanicsForAdmin() {
  try {
    const res = await fetch(SHEET_URL);
    const data = await res.json();

    const tableBody = document.querySelector("#adminMechanicTable tbody");
    tableBody.innerHTML = "";

    data.forEach(mechanic => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${mechanic.name}</td>
        <td>${mechanic.phone}</td>
        <td>${mechanic.location}</td>
        <td>${mechanic.service}</td>
        <td>${mechanic.experience}</td>
        <td>${mechanic.garage}</td>
        <td><span class="badge bg-warning">Pending</span></td>
      `;
      tableBody.appendChild(row);
    });

  } catch (err) {
    console.error("Error loading mechanics:", err);
  }
}

window.addEventListener("DOMContentLoaded", loadMechanicsForAdmin);
