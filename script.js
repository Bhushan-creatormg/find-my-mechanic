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
  if (type && brandOptions[type]) {
    brandOptions[type].forEach(brand => {
      let option = document.createElement("option");
      option.value = brand;
      option.textContent = brand;
      brandSelect.appendChild(option);
    });
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
  const location = document.getElementById("locationInput").value.toLowerCase();
  const filtered = mechanics.filter(m => m.location.toLowerCase().includes(location));
  const table = document.getElementById("mechanicTable");
  table.innerHTML = `<tr>
    <th>Name</th>
    <th>Location</th>
    <th>Service</th>
    <th>Price</th>
    <th>Contact</th>
  </tr>`;
  filtered.forEach(mechanic => {
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

window.onload = function () {
  loadMechanics();
  document.getElementById("vehicleType").addEventListener("change", function () {
    populateBrands(this.value);
  });
};
