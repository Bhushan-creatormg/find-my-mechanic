const mechanics = [
    { name: "Rahul's Garage", location: "Kalyan", service: "Puncture Repair", price: "₹200", contact: "9876543210" },
    { name: "AutoFix", location: "Thane", service: "Oil Change", price: "₹500", contact: "8765432109" },
    { name: "Speedy Repairs", location: "Navi Mumbai", service: "Tire Replacement", price: "₹1500", contact: "7654321098" }
];

const brandOptions = {
    bike: ["Hero", "Honda", "Bajaj", "Royal Enfield", "TVS", "Others"],
    car: ["Maruti", "Hyundai", "Tata", "Toyota", "Mahindra", "Others"],
    truck: ["Ashok Leyland", "Tata", "Eicher", "Mahindra", "Bharat Benz", "Others"]
};

function showBrands() {
    const vehicleType = document.getElementById("vehicleType").value.toLowerCase();
    const brandSelect = document.getElementById("brandNames");
    brandSelect.innerHTML = "<option value=''>Select Brand</option>";
    if (brandOptions[vehicleType]) {
        brandOptions[vehicleType].forEach(brand => {
            const option = document.createElement("option");
            option.value = brand;
            option.textContent = brand;
            brandSelect.appendChild(option);
        });
    }
}

function loadMechanics(filteredLocation = "") {
    const table = document.getElementById("mechanicTable");
    table.innerHTML = `
        <tr>
            <th>Name</th>
            <th>Location</th>
            <th>Service</th>
            <th>Price</th>
            <th>Contact</th>
        </tr>
    `;
    mechanics
        .filter(mechanic => mechanic.location.toLowerCase().includes(filteredLocation.toLowerCase()))
        .forEach(mechanic => {
            const row = `
                <tr>
                    <td>${mechanic.name}</td>
                    <td>${mechanic.location}</td>
                    <td>${mechanic.service}</td>
                    <td>${mechanic.price}</td>
                    <td>${mechanic.contact}</td>
                </tr>`;
            table.innerHTML += row;
        });
}

function filterMechanics() {
    const location = document.getElementById("locationInput").value;
    loadMechanics(location);
}

window.onload = function () {
    loadMechanics();
    showBrands(); // Initialize default brand list (empty)
};
