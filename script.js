const mechanics = [
    { name: "Rahul's Garage", location: "Mumbai", service: "Puncture Repair", price: "₹200", contact: "9876543210" },
    { name: "AutoFix", location: "Pune", service: "Oil Change", price: "₹500", contact: "8765432109" },
    { name: "Speedy Repairs", location: "Delhi", service: "Tire Replacement", price: "₹1500", contact: "7654321098" }
];

function loadMechanics(filteredMechanics = mechanics) {
    const table = document.getElementById("mechanicTable");
    table.innerHTML = `<tr>
        <th>Name</th>
        <th>Location</th>
        <th>Service</th>
        <th>Price</th>
        <th>Contact</th>
    </tr>`;
    filteredMechanics.forEach(mechanic => {
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
    const location = document.getElementById("location").value.toLowerCase();
    const filtered = mechanics.filter(mech => mech.location.toLowerCase().includes(location));
    loadMechanics(filtered);
}

function updateBrands() {
    const vehicleType = document.getElementById("vehicleType").value;
    const brandSelect = document.getElementById("brand");
    brandSelect.innerHTML = "";

    let brands = [];
    if (vehicleType === "Car") {
        brands = ["Maruti Suzuki", "Hyundai", "Tata", "Honda", "Mahindra", "Others"];
    } else if (vehicleType === "Bike") {
        brands = ["Hero", "Honda", "Royal Enfield", "Bajaj", "TVS", "Others"];
    } else if (vehicleType === "Others") {
        brands = ["Piaggio", "Force Motors", "Ashok Leyland", "Eicher", "SML Isuzu", "Others"];
    }

    brands.forEach(brand => {
        let option = document.createElement("option");
        option.value = brand;
        option.text = brand;
        brandSelect.add(option);
    });
}

window.onload = loadMechanics;
