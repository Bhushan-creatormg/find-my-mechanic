document.addEventListener("DOMContentLoaded", function () {
    const mechanicTableBody = document.getElementById("mechanicTableBody");
    const loginSection = document.getElementById("login-section");
    const mainContent = document.getElementById("main-content");
    const loginForm = document.getElementById("login-form");
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    const loginError = document.getElementById("login-error");

    function login() {
        const username = usernameInput.value;
        const password = passwordInput.value;

        if (username === "admin" && password === "1234") {
            loginSection.style.display = "none";
            mainContent.style.display = "block";
            fetchMechanics();
        } else {
            loginError.textContent = "Invalid username or password";
            loginError.style.display = "block";
        }
    }

    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();
        login();
    });

    function fetchMechanics() {
        fetch("https://bhushan-creatormg.github.io/find-my-mechanic/")
            .then(response => response.json())
            .then(data => {
                updateTable(data);
            })
            .catch(error => console.error("Error fetching data:", error));
    }

    function updateTable(mechanics) {
        mechanicTableBody.innerHTML = "";

        if (mechanics.length === 0) {
            mechanicTableBody.innerHTML = "<tr><td colspan='8'>No mechanics found.</td></tr>";
            return;
        }

        mechanics.forEach(mechanic => {
            const row = document.createElement("tr");
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
            mechanicTableBody.appendChild(row);
        });
    }

    function updateCompany() {
        const vehicleType = document.getElementById("vehicleTypeFilter").value;
        const carCompany = document.getElementById("carCompanyFilter");
        const bikeCompany = document.getElementById("bikeCompanyFilter");

        carCompany.style.display = vehicleType === "Car" ? "inline-block" : "none";
        bikeCompany.style.display = vehicleType === "Bike" ? "inline-block" : "none";
    }

    fetchMechanics();
});
