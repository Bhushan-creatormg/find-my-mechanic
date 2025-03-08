// Sample Mechanics Data
let mechanics = [
    { name: "Rahul's Garage", location: "Mumbai", service: "Puncture Repair", price: 200, contact: "9876543210" },
    { name: "AutoFix", location: "Pune", service: "Oil Change", price: 500, contact: "8765432109" },
    { name: "Speedy Repairs", location: "Delhi", service: "Tyre Replacement", price: 1500, contact: "7654321098" }
];

// Load Mechanics Data into Table
function loadMechanics() {
    let tableBody = document.getElementById("mechanic-list");
    tableBody.innerHTML = "";
    mechanics.forEach(mech => {
        let row = `<tr>
            <td>${mech.name}</td>
            <td>${mech.location}</td>
            <td>${mech.service}</td>
            <td>₹${mech.price}</td>
            <td>${mech.contact}</td>
        </tr>`;
        tableBody.innerHTML += row;
    });
}

// Filter Mechanics by Location
function filterMechanics() {
    let location = document.getElementById("location").value.toLowerCase();
    let tableBody = document.getElementById("mechanic-list");
    tableBody.innerHTML = "";
    
    let filteredMechanics = mechanics.filter(mech => mech.location.toLowerCase().includes(location));
    
    filteredMechanics.forEach(mech => {
        let row = `<tr>
            <td>${mech.name}</td>
            <td>${mech.location}</td>
            <td>${mech.service}</td>
            <td>₹${mech.price}</td>
            <td>${mech.contact}</td>
        </tr>`;
        tableBody.innerHTML += row;
    });
}

// Register a New Mechanic
function registerMechanic() {
    let name = document.getElementById("mech-name").value;
    let location = document.getElementById("mech-location").value;
    let service = document.getElementById("mech-service").value;
    let price = document.getElementById("mech-price").value;
    let contact = document.getElementById("mech-contact").value;

    if (name && location && service && price && contact) {
        mechanics.push({ name, location, service, price: Number(price), contact });
        loadMechanics();
        alert("Mechanic Registered Successfully!");
    } else {
        alert("Please fill all fields!");
    }
}

// Vehicle Model Selection
const vehicleModels = {
    honda: ["City", "Civic", "Amaze"],
    hero: ["Splendor", "Passion Pro", "Glamour"],
    suzuki: ["Swift", "Baleno", "Dzire"],
    tata: ["Nexon", "Harrier", "Altroz"],
    toyota: ["Innova", "Fortuner", "Corolla"]
};

document.getElementById("manufacturer").addEventListener("change", function () {
    let manufacturer = this.value;
    let modelDropdown = document.getElementById("vehicle-model");
    modelDropdown.innerHTML = <option value="">Select Model</option>;
    
    if (vehicleModels[manufacturer]) {
        vehicleModels[manufacturer].forEach(model => {
            let option = document.createElement("option");
            option.value = model.toLowerCase();
            option.textContent = model;
            modelDropdown.appendChild(option);
        });
    }
});

// Load mechanics on page load
window.onload = loadMechanics;
