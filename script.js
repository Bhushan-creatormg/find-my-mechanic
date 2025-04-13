const brandOptions = {
  Bike: ["Hero", "Honda", "Bajaj", "Royal Enfield", "TVS", "Others"],
  Car: ["Maruti", "Hyundai", "Tata", "Toyota", "Mahindra", "Others"],
  Truck: ["Ashok Leyland", "Tata", "Eicher", "Mahindra", "Bharat Benz", "Others"]
};

function setupBrandDropdown(vehicleTypeId, brandSelectId) {
  const vehicleDropdown = document.getElementById(vehicleTypeId);
  const brandDropdown = document.getElementById(brandSelectId);
  if (vehicleDropdown && brandDropdown) {
    vehicleDropdown.addEventListener("change", () => {
      const selected = vehicleDropdown.value;
      brandDropdown.innerHTML = "<option value=''>Select Brand</option>";
      if (brandOptions[selected]) {
        brandOptions[selected].forEach(brand => {
          const option = document.createElement("option");
          option.value = brand;
          option.textContent = brand;
          brandDropdown.appendChild(option);
        });
      }
    });
  }
}

function loadMechanicCards() {
  const mechanics = [
    { name: "Rahul's Garage", location: "Kalyan", service: "Puncture Repair", price: "₹200", contact: "9876543210" },
    { name: "AutoFix", location: "Thane", service: "Oil Change", price: "₹500", contact: "8765432109" },
    { name: "Speedy Repairs", location: "Navi Mumbai", service: "Tire Replacement", price: "₹1500", contact: "7654321098" }
  ];
  const container = document.getElementById("mechanicCardContainer");
  if (!container) return;
  mechanics.forEach(mech => {
    const card = document.createElement("div");
    card.className = "col-md-4 mb-4";
    card.innerHTML = `
      <div class="card h-100 shadow-sm border-0">
        <div class="card-body">
          <h5 class="card-title d-flex justify-content-between">${mech.name} <span class="badge bg-success">Verified</span></h5>
          <p><strong>Location:</strong> ${mech.location}</p>
          <p><strong>Service:</strong> ${mech.service}</p>
          <p><strong>Price:</strong> ${mech.price}</p>
          <p><strong>Contact:</strong> ${mech.contact}</p>
          <a href="profile.html" class="btn btn-outline-primary btn-sm mt-2">View Profile</a>
        </div>
      </div>`;
    container.appendChild(card);
  });
}

function filterMechanics() {
  const location = document.getElementById("locationInput").value.toLowerCase();
  const table = document.getElementById("mechanicTable");
  const allMechanics = [
    { name: "Rahul's Garage", location: "Kalyan", service: "Puncture Repair", price: "₹200", contact: "9876543210" },
    { name: "AutoFix", location: "Thane", service: "Oil Change", price: "₹500", contact: "8765432109" },
    { name: "Speedy Repairs", location: "Navi Mumbai", service: "Tire Replacement", price: "₹1500", contact: "7654321098" }
  ];
  table.innerHTML = `<tr>
    <th>Name</th><th>Location</th><th>Service</th><th>Price</th><th>Contact</th>
  </tr>`;
  const filtered = allMechanics.filter(mech => mech.location.toLowerCase().includes(location));
  if (filtered.length > 0) {
    filtered.forEach(mech => {
      table.innerHTML += `<tr><td>${mech.name}</td><td>${mech.location}</td><td>${mech.service}</td><td>${mech.price}</td><td>${mech.contact}</td></tr>`;
    });
  } else {
    table.innerHTML += `<tr><td colspan="5">No mechanics found in this location.</td></tr>`;
  }
}

window.addEventListener("DOMContentLoaded", () => {
  setupBrandDropdown("vehicleType", "brand");
  setupBrandDropdown("mechVehicleType", "mechBrand");
  if (document.getElementById("mechanicCardContainer")) loadMechanicCards();
});