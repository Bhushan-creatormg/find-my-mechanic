document.addEventListener("DOMContentLoaded", function () {
    if (localStorage.getItem("isLoggedIn") === "true") {
        showMainPage();
    }
});

// Sample Mechanics Data (Temporary for Testing)
let mechanics = [
    { name: "John Mechanic", location: "Mumbai", vehicle: "Car", company: "Honda", service: "Engine Repair", price: "1500", contact: "9876543210" },
    { name: "Mike Auto", location: "Pune", vehicle: "Bike", company: "Yamaha", service: "Brake Fix", price: "500", contact: "9123456789" }
];

function loginUser() {
    let username = document.getElementById("loginUsername").value;
    let password = document.getElementById("loginPassword").value;

    if (username && password) {
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
    let name = document.getElementById("mechanicName").value;
    let location = document.getElementById("mechanicLocation").value;
    let vehicle = document.getElementById("mechanicVehicle").value;
    let company = document.getElementById("mechanicCompany").value;
    let service = document.getElementById("mechanicService").value;
    let price = document.getElementById("mechanicPrice").value;
    let contact = document.getElementById("mechanicContact").value;

    if (name && location && vehicle && company && service && price && contact) {
        mechanics.push({ name, location, vehicle, company, service, price, contact });
        alert("Mechanic Registered!");
        displayMechanics();
    } else {
        alert("Please fill all fields.");
    }
}

function displayMechanics() {
    let tableBody = document.getElementById("mechanicTable").getElementsByTagName("tbody")[0];
    tableBody.innerHTML = "";

    mechanics.forEach(mechanic => {
        let row = `<tr>
            <td>${mechanic.name}</td>
            <td>${mechanic.location}</td>
            <td>${mechanic.vehicle}</td>
            <td>${mechanic.company}</td>
            <td>${mechanic.service}</td>
            <td>${mechanic.price}</td>
            <td>${mechanic.contact}</td>
        </tr>`;
        tableBody.innerHTML += row;
    });
}

function updateCompanyDropdown() {
    let vehicleType = document.getElementById("vehicleType").value;
    let companySelect = document.getElementById("company");
    
    let carBrands = ["Honda", "Toyota", "Maruti Suzuki", "Hyundai", "Others"];
    let bikeBrands = ["Yamaha", "Royal Enfield", "Bajaj", "Hero", "Others"];
    let truckBrands = ["Tata", "Ashok Leyland", "Mahindra", "Eicher", "Others"];

    let brands = vehicleType === "Car" ? carBrands :
                 vehicleType === "Bike" ? bikeBrands :
                 vehicleType === "Truck" ? truckBrands : ["Others"];

    companySelect.innerHTML = brands.map(brand => <option value="${brand}">${brand}</option>).join("");
}
