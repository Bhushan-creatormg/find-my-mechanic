
const mechanics = [
    { name: "Rahul's Garage", location: "Mumbai", service: "Puncture Repair", price: "₹200", contact: "9876543210" },
    { name: "AutoFix", location: "Pune", service: "Oil Change", price: "₹500", contact: "8765432109" },
    { name: "Speedy Repairs", location: "Delhi", service: "Tire Replacement", price: "₹1500", contact: "7654321098" }
];

function loadMechanics() {
    const table = document.getElementById("mechanicTable");
    mechanics.forEach(mechanic => {
        let row = `<tr>
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
    const locationInput = document.getElementById("location").value.toLowerCase();
    const table = document.getElementById("mechanicTable");
    table.innerHTML = `<tr>
        <th>Name</th><th>Location</th><th>Service</th><th>Price</th><th>Contact</th>
    </tr>`;

    mechanics
        .filter(mech => mech.location.toLowerCase().includes(locationInput))
        .forEach(mechanic => {
            let row = `<tr>
                          <td>${mechanic.name}</td>
                          <td>${mechanic.location}</td>
                          <td>${mechanic.service}</td>
                          <td>${mechanic.price}</td>
                          <td>${mechanic.contact}</td>
                       </tr>`;
            table.innerHTML += row;
        });
}

function updateBrands() {
    const vehicleType = document.getElementById("vehicleType").value;
    const brandSelect = document.getElementById("brand");

    const brands = {
        Car: ["Maruti Suzuki", "Hyundai", "Tata", "Honda", "Toyota", "Others"],
        Bike: ["Royal Enfield", "Hero", "Honda", "Bajaj", "TVS", "Others"],
        Others: ["Mahindra", "Force", "Ashok Leyland", "Piaggio", "Jeep", "Others"]
    };

    brandSelect.innerHTML = "";

    if (vehicleType && brands[vehicleType]) {
        brands[vehicleType].forEach(brand => {
            const option = document.createElement("option");
            option.value = brand;
            option.textContent = brand;
            brandSelect.appendChild(option);
        });
    } else {
        const defaultOption = document.createElement("option");
        defaultOption.textContent = "--Select Vehicle Type First--";
        brandSelect.appendChild(defaultOption);
    }
}

window.onload = loadMechanics;
