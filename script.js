// script.js

const mechanics = [ { name: "Rahul's Garage", location: "Mumbai", service: "Puncture Repair", price: "₹200", contact: "9876543210", image: "https://images.unsplash.com/photo-1605187165680-b64138aa4f3c" }, { name: "AutoFix", location: "Pune", service: "Oil Change", price: "₹500", contact: "8765432109", image: "https://images.unsplash.com/photo-1515920037688-79b97f4f8b9d" }, { name: "Speedy Repairs", location: "Delhi", service: "Tire Replacement", price: "₹1500", contact: "7654321098", image: "https://images.unsplash.com/photo-1587583773570-0f763be24b4f" } ];

const brandOptions = { Car: ["Maruti", "Hyundai", "Tata", "Honda", "Toyota", "Others"], Bike: ["Hero", "Honda", "Royal Enfield", "TVS", "Bajaj", "Others"], Truck: ["Ashok Leyland", "Tata", "Eicher", "Mahindra", "BharatBenz", "Others"], Others: ["Generic", "Local", "Imported", "Luxury", "Budget", "Others"] };

function updateBrandOptions() { const vehicleType = document.getElementById("vehicleType").value; const brandSelect = document.getElementById("brand"); brandSelect.innerHTML = "<option value=''>Select Brand</option>"; if (vehicleType && brandOptions[vehicleType]) { brandOptions[vehicleType].forEach(brand => { const option = document.createElement("option"); option.value = brand; option.textContent = brand; brandSelect.appendChild(option); }); } }

function filterMechanics() { const location = document.getElementById("location").value.toLowerCase(); const mechanicContainer = document.getElementById("mechanicCards"); mechanicContainer.innerHTML = "";

const filtered = mechanics.filter(m =>
    m.location.toLowerCase().includes(location)
);

filtered.forEach(mechanic => {
    const card = `
        <div class="card">
            <img src="${mechanic.image}" alt="${mechanic.name}">
            <h3>${mechanic.name}</h3>
            <p><strong>Service:</strong> ${mechanic.service}</p>
            <p><strong>Price:</strong> ${mechanic.price}</p>
            <p><strong>Location:</strong> ${mechanic.location}</p>
            <p><strong>Contact:</strong> ${mechanic.contact}</p>
        </div>
    `;
    mechanicContainer.innerHTML += card;
});

}
