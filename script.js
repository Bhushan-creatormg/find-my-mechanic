const mechanics = [
    { name: "Rahul's Garage", location: "Mumbai", service: "Puncture Repair", price: "₹200", contact: "9876543210", image: "https://via.placeholder.com/300x180?text=Garage+1" },
    { name: "AutoFix", location: "Pune", service: "Oil Change", price: "₹500", contact: "8765432109", image: "https://via.placeholder.com/300x180?text=Garage+2" },
    { name: "Speedy Repairs", location: "Delhi", service: "Tire Replacement", price: "₹1500", contact: "7654321098", image: "https://via.placeholder.com/300x180?text=Garage+3" }
];

function loadMechanics() {
    const container = document.getElementById("mechanicCards");
    container.innerHTML = "";
    mechanics.forEach(mechanic => {
        let card = `
            <div class="card">
                <img src="${mechanic.image}" alt="Mechanic">
                <h3>${mechanic.name}</h3>
                <p><strong>Location:</strong> ${mechanic.location}</p>
                <p><strong>Service:</strong> ${mechanic.service}</p>
                <p><strong>Price:</strong> ${mechanic.price}</p>
                <p><strong>Contact:</strong> ${mechanic.contact}</p>
            </div>
        `;
        container.innerHTML += card;
    });
}

function updateBrandOptions() {
    const vehicleType = document.getElementById("vehicleType").value;
    const brandDropdown = document.getElementById("brandOptions");
    brandDropdown.innerHTML = '<option value="">Select Brand</option>';

    let brands = [];
    if (vehicleType === "bike") {
        brands = ["Royal Enfield", "Hero", "Honda", "Bajaj", "TVS", "Others"];
    } else if (vehicleType === "car") {
        brands = ["Maruti Suzuki", "Hyundai", "Tata", "Honda", "Mahindra", "Others"];
    } else if (vehicleType === "truck") {
        brands = ["Tata", "Ashok Leyland", "Mahindra", "BharatBenz", "Eicher", "Others"];
    }

    brands.forEach(brand => {
        const option = document.createElement("option");
        option.value = brand;
        option.textContent = brand;
        brandDropdown.appendChild(option);
    });
}

function filterMechanics() {
    const location = document.getElementById("locationInput").value.toLowerCase();
    const container = document.getElementById("mechanicCards");
    container.innerHTML = "";

    const filtered = mechanics.filter(m =>
        m.location.toLowerCase().includes(location)
    );

    if (filtered.length === 0) {
        container.innerHTML = "<p>No mechanics found for this location.</p>";
        return;
    }

    filtered.forEach(mechanic => {
        let card = `
            <div class="card">
                <img src="${mechanic.image}" alt="Mechanic">
                <h3>${mechanic.name}</h3>
                <p><strong>Location:</strong> ${mechanic.location}</p>
                <p><strong>Service:</strong> ${mechanic.service}</p>
                <p><strong>Price:</strong> ${mechanic.price}</p>
                <p><strong>Contact:</strong> ${mechanic.contact}</p>
            </div>
        `;
        container.innerHTML += card;
    });
}

window.onload = loadMechanics;
