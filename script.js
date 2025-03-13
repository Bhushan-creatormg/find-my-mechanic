document.addEventListener("DOMContentLoaded", function () {
    if (localStorage.getItem("isLoggedIn") === "true") {
        showMainPage();
    }
});

function loginUser() {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (username === "admin" && password === "12345") {
        localStorage.setItem("isLoggedIn", "true");
        showMainPage();
    } else {
        alert("Invalid Username or Password!");
        document.getElementById("username").value = "";
        document.getElementById("password").value = "";
    }
}

function logoutUser() {
    localStorage.removeItem("isLoggedIn");
    document.getElementById("mainPage").style.display = "none";
    document.getElementById("loginPage").style.display = "block";
}

function showMainPage() {
    document.getElementById("loginPage").style.display = "none";
    document.getElementById("mainPage").style.display = "block";
    fetchMechanics();
}

function fetchMechanics() {
    fetch("https://script.google.com/macros/s/YOUR_SCRIPT_URL/exec")
        .then(response => response.json())
        .then(data => updateTable(data))
        .catch(error => console.error("Error fetching data:", error));
}

function updateTable(mechanics) {
    let tableBody = document.getElementById("mechanicTableBody");
    tableBody.innerHTML = "";

    if (mechanics.length === 0) {
        tableBody.innerHTML = "<tr><td colspan='8'>No mechanics found.</td></tr>";
        return;
    }

    mechanics.forEach(mechanic => {
        let row = document.createElement("tr");
        row.innerHTML = `
            <td>${mechanic.name}</td>
            <td>${mechanic.location}</td>
            <td>${mechanic.vehicle}</td>
            <td>${mechanic.company}</td>
            <td>${mechanic.model}</td>
            <td>${mechanic.service}</td>
            <td>₹${mechanic.price}</td>
            <td>${mechanic.contact}</td>
        `;
        tableBody.appendChild(row);
    });
}

function applyFilters() {
    let vehicleType = document.getElementById("vehicleTypeFilter").value;
    let company = document.getElementById("companyFilter").value.toLowerCase();
    let service = document.getElementById("serviceFilter").value.toLowerCase();

    fetch("https://script.google.com/macros/s/YOUR_SCRIPT_URL/exec")
        .then(response => response.json())
        .then(mechanics => {
            let filtered = mechanics.filter(mechanic =>
                (vehicleType === "" || mechanic.vehicle === vehicleType) &&
                (company === "" || mechanic.company.toLowerCase().includes(company)) &&
                (service === "" || mechanic.service.toLowerCase().includes(service))
            );
            updateTable(filtered);
        })
        .catch(error => console.error("Error fetching filtered data:", error));
}

function searchMechanics() {
    let input = document.getElementById("searchBox").value.toLowerCase();
    let rows = document.querySelectorAll("#mechanicTableBody tr");

    rows.forEach(row => {
        let name = row.cells[0].innerText.toLowerCase();
        let location = row.cells[1].innerText.toLowerCase();
        row.style.display = (name.includes(input) || location.includes(input)) ? "" : "none";
    });
}
