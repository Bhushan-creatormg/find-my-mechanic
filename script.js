const apiUrl = "https://script.google.com/macros/s/AKfycbxYC-hUzcufX8cO8d3IOVLoYt_-bhNwKUdhWNUYI3ujp_ZiELeusMAn-Zcafabni2XyHA/exec";

function fetchMechanics() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => updateTable(data))
        .catch(error => console.error("Error fetching data:", error));
}

function updateTable(mechanics) {
    const mechanicTableBody = document.getElementById("mechanicTableBody");
    mechanicTableBody.innerHTML = ""; // Clear table

    if (mechanics.length === 0) {
        mechanicTableBody.innerHTML = "<tr><td colspan='8'>No mechanics found.</td></tr>";
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
            <td>₹${mechanic.price || "N/A"}</td>
            <td>${mechanic.contact || "N/A"}</td>
        `;
        mechanicTableBody.appendChild(row);
    });
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

// User Authentication
function signUp() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    if (localStorage.getItem(username)) {
        alert("Username already exists. Please choose a different one.");
    } else {
        localStorage.setItem(username, password);
        alert("Sign Up successful! Please log in.");
    }
}

function login() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    if (localStorage.getItem(username) === password) {
        alert("Login successful!");
        document.getElementById("authSection").style.display = "none";
        document.getElementById("logout").style.display = "block";
        document.getElementById("mechanicSection").style.display = "block";
        fetchMechanics();
    } else {
        alert("Invalid username or password.");
    }
}

function logout() {
    alert("You have been logged out.");
    document.getElementById("authSection").style.display = "block";
    document.getElementById("logout").style.display = "none";
    document.getElementById("mechanicSection").style.display = "none";
}

// Load mechanics on page load
window.onload = function () {
    if (localStorage.getItem("loggedInUser")) {
        document.getElementById("authSection").style.display = "none";
        document.getElementById("logout").style.display = "block";
        document.getElementById("mechanicSection").style.display = "block";
        fetchMechanics();
    }
};
