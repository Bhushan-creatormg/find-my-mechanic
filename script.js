document.addEventListener("DOMContentLoaded", function () {
    if (localStorage.getItem("isLoggedIn") === "true") {
        showMainPage();
    }

    loadMechanics();
});

// Load mechanics from localStorage
function loadMechanics() {
    let storedMechanics = localStorage.getItem("mechanics");
    if (storedMechanics) {
        mechanics = JSON.parse(storedMechanics);
    }
}

// Store mechanics in localStorage
function saveMechanics() {
    localStorage.setItem("mechanics", JSON.stringify(mechanics));
}

// Sample Mechanics Data (Initial Test)
let mechanics = [
    { name: "John Mechanic", location: "Mumbai", vehicle: "Car", company: "Maruti Suzuki", service: "Engine Repair", price: "1500", contact: "9876543210" },
    { name: "Mike Auto", location: "Pune", vehicle: "Bike", company: "Royal Enfield", service: "Brake Fix", price: "500", contact: "9123456789" }
];

function registerUser() {
    let username = document.getElementById("signupUsername").value.trim();
    let password = document.getElementById("signupPassword").value.trim();

    if (username && password) {
        localStorage.setItem("user", JSON.stringify({ username, password }));
        alert("Signup Successful! Please log in.");
    } else {
        alert("Please enter all details.");
    }
}

function loginUser() {
    let username = document.getElementById("loginUsername").value.trim();
    let password = document.getElementById("loginPassword").value.trim();
    let user = JSON.parse(localStorage.getItem("user"));

    if (user && username === user.username && password === user.password) {
        localStorage.setItem("isLoggedIn", "true");
        showMainPage();
    } else {
        alert("Invalid Username or Password!");
    }
}

function logoutUser() {
    localStorage.removeItem("isLoggedIn");
    location.reload();
}

function showMainPage() {
    document.getElementById("authPage").style.display = "none";
    document.getElementById("mainPage").style.display = "block";
    displayMechanics();
}

function registerMechanic() {
    let name = document.getElementById("mechanicName").value.trim();
    let location = document.getElementById("mechanicLocation").value.trim();
    let vehicle = document.getElementById("mechanicVehicle").value;
    let company = document.getElementById("mechanicCompany").value;
    let service = document.getElementById("mechanicService").value.trim();
    let price = document.getElementById("mechanicPrice").value.trim();
    let contact = document.getElementById("mechanicContact").value.trim();

    if (name && location && vehicle && company && service && price && contact) {
        mechanics.push({ name, location, vehicle, company, service, price, contact });
        saveMechanics();
        alert("Mechanic Registered!");
        displayMechanics();
    } else {
        alert("Please fill all fields.");
    }
}

function displayMechanics() {
    let tableBody = document.querySelector("#mechanicTable tbody");
    tableBody.innerHTML = "";

    mechanics.forEach(mechanic => {
        let row = `<tr>
            <td>${mechanic.name}</td>
            <td>${mechanic.location}</td>
            <td>${mechanic.vehicle}</td>
            <td>${mechanic.company}</td>
            <td>${mechanic.service}</td>
            <td>₹${mechanic.price}</td>
            <td>${mechanic.contact}</td>
        </tr>`;
        tableBody.innerHTML += row;
    });
}

// Update Company Dropdown Based on Vehicle Type
function updateCompanyDropdown() {
    let vehicleType = document.getElementById("mechanicVehicle").value;
    let companyDropdown = document.getElementById("mechanicCompany");

    companyDropdown.innerHTML = <option value="">Select Company</option>;

    let carCompanies = [
        "Maruti Suzuki", "Hyundai", "Tata", "Mahindra", "Honda", "Toyota", "Kia",
        "Volkswagen", "Renault", "Nissan", "MG", "Skoda", "Ford", "Mercedes-Benz", "BMW", "Audi"
    ];

    let bikeCompanies = [
        "Yamaha", "Royal Enfield", "Bajaj", "Honda", "TVS", "KTM", "Suzuki", "Hero", "Ducati"
    ];

    let companies = vehicleType === "Car" ? carCompanies : bikeCompanies;

    companies.forEach(company => {
        let option = document.createElement("option");
        option.value = company;
        option.textContent = company;
        companyDropdown.appendChild(option);
    });
}

// Apply Filters for Search
function applyFilters() {
    let vehicleType = document.getElementById("vehicleType").value;
    let company = document.getElementById("company").value.toLowerCase();

    let filteredMechanics = mechanics.filter(mechanic =>
        (vehicleType === "" || mechanic.vehicle === vehicleType) &&
        (company === "" || mechanic.company.toLowerCase() === company)
    );

    let tableBody = document.querySelector("#mechanicTable tbody");
    tableBody.innerHTML = "";

    filteredMechanics.forEach(mechanic => {
        let row = `<tr>
            <td>${mechanic.name}</td>
            <td>${mechanic.location}</td>
            <td>${mechanic.vehicle}</td>
            <td>${mechanic.company}</td>
            <td>${mechanic.service}</td>
            <td>₹${mechanic.price}</td>
            <td>${mechanic.contact}</td>
        </tr>`;
        tableBody.innerHTML += row;
    });
}

// Live Search Functionality
document.getElementById("searchBox").addEventListener("input", function () {
    let input = this.value.toLowerCase();
    let tableRows = document.querySelectorAll("#mechanicTable tbody tr");

    tableRows.forEach(row => {
        let name = row.cells[0].textContent.toLowerCase();
        let location = row.cells[1].textContent.toLowerCase();

        if (name.includes(input) || location.includes(input)) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }
    });
});
