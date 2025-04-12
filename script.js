const mechanics = [
  { name: "Rahul's Garage", location: "Kalyan", service: "Puncture Repair", price: "₹200", contact: "9876543210" },
  { name: "AutoFix", location: "Thane", service: "Oil Change", price: "₹500", contact: "8765432109" },
  { name: "Speedy Repairs", location: "Navi Mumbai", service: "Tire Replacement", price: "₹1500", contact: "7654321098" }
];

const brandOptions = {
  Bike: ["Hero", "Honda", "Bajaj", "Royal Enfield", "TVS", "Others"],
  Car: ["Maruti", "Hyundai", "Tata", "Toyota", "Mahindra", "Others"],
  Truck: ["Ashok Leyland", "Tata", "Eicher", "Mahindra", "Bharat Benz", "Others"]
};

function populateBrands(type) {
  const brandSelect = document.getElementById("brand");
  brandSelect.innerHTML = "<option value=''>Select Brand</option>";

  if (brandOptions[type]) {
    brandOptions[type].forEach(brand => {
      const option = document.createElement("option");
      option.value = brand;
      option.textContent = brand;
      brandSelect.appendChild(option);
    });
  }
}

function filterMechanics() {
  const location = document.getElementById("locationInput").value.toLowerCase();
  const table = document.getElementById("mechanicTable");

  table.innerHTML = `<tr>
    <th>Name</th>
    <th>Location</th>
    <th>Service</th>
    <th>Price</th>
    <th>Contact</th>
  </tr>`;

  const filtered = mechanics.filter(mechanic =>
    mechanic.location.toLowerCase().includes(location)
  );

  if (filtered.length > 0) {
    filtered.forEach(mechanic => {
      const row = `<tr>
        <td>${mechanic.name}</td>
        <td>${mechanic.location}</td>
        <td>${mechanic.service}</td>
        <td>${mechanic.price}</td>
        <td>${mechanic.contact}</td>
      </tr>`;
      table.innerHTML += row;
    });
  } else {
    table.innerHTML += `<tr><td colspan="5">No mechanics found in this location.</td></tr>`;
  }
}

function loadMechanics() {
  const table = document.getElementById("mechanicTable");
  table.innerHTML = `<tr>
    <th>Name</th>
    <th>Location</th>
    <th>Service</th>
    <th>Price</th>
    <th>Contact</th>
  </tr>`;

  mechanics.forEach(mechanic => {
    const row = `<tr>
      <td>${mechanic.name}</td>
      <td>${mechanic.location}</td>
      <td>${mechanic.service}</td>
      <td>${mechanic.price}</td>
      <td>${mechanic.contact}</td>
    </tr>`;
    table.innerHTML += row;
  });
}

window.addEventListener("DOMContentLoaded", () => {
  loadMechanics();

  document.getElementById("vehicleType").addEventListener("change", function () {
    const selectedType = this.value;
    populateBrands(selectedType);
  });
});
