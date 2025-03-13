// Fake User Login Data
const users = {
    admin: "1234",  // Username: admin, Password: 1234
};

// Login Function
function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (users[username] === password) {
        document.getElementById("loginContainer").style.display = "none";
        document.getElementById("mainContent").style.display = "block";
        fetchMechanics();
    } else {
        document.getElementById("loginError").innerText = "Invalid credentials!";
    }
}

// Fetch Mechanics from API
function fetchMechanics() {
    fetch("https://script.google.com/macros/s/AKfycbxYC-hUzcufX8cO8d3IOVLoYt_-bhNwKUdhWNUYI3ujp_ZiELeusMAn-Zcafabni2XyHA/exec")
        .then(response => response.json())
        .then(data => updateTable(data))
        .catch(error => console.error("Error fetching data:", error));
}

// Update Table with Mechanic Data
function updateTable(mechanics) {
    const tableBody = document.getElementById("mechanicTableBody");
    tableBody.innerHTML = "";

    if (mechanics.length === 0) {
        tableBody.innerHTML = "<tr><td colspan='8'>No mechanics found.</td></tr>";
        return;
    }

    mechanics.forEach(mechanic => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${mechanic.name || "N/A"}</td>
            <td>${mechanic.location || "N/A"}</td>
            <td>${mechanic.vehicle || "N/A"}</td>
            <td>${mechanic.company || "N/A"}</td>
            <td>${mechanic.model || "N/A"}</td>
            <td>${mechanic.service || "N/A"}</td>
            <td>₹${mechanic.price !== undefined ? mechanic.price : "N/A"}</td>
            <td>${mechanic.contact || "N/A"}</td>
        `;
        tableBody.appendChild(row);
    });
}

// Search Mechanics
function searchMechanics() {
    let input = document.getElementById("searchBox").value.toLowerCase();
    let rows = document.querySelectorAll("#mechanicTableBody tr");

    rows.forEach(row => {
        let name = row.cells[0].innerText.toLowerCase();
        let location = row.cells[1].innerText.toLowerCase();
        row.style.display = (name.includes(input) || location.includes(input)) ? "" : "none";
    });
}

// Apply Filters
function applyFilters() {
    const vehicleType = document.getElementById("vehicleTypeFilter").value;
    const company = document.getElementById("companyFilter").value;
    const service = document.getElementById("serviceFilter").value.toLowerCase();

    fetch("https://script.google.com/macros/s/AKfycbxYC-hUzcufX8cO8d3IOVLoYt_-bhNwKUdhWNUYI3ujp_ZiELeusMAn-Zcafabni2XyHA/exec")
        .then(response => response.json())
        .then(mechanics => {
            const filtered = mechanics.filter(mech =>
                (vehicleType === "" || mech.vehicle === vehicleType) &&
                (company === "" || mech.company === company) &&
                (service === "" || mech.service.toLowerCase().includes(service))
            );
            updateTable(filtered);
        })
        .catch(error => console.error("Error filtering data:", error));
}

fetchMechanics();  // Load data on page load
