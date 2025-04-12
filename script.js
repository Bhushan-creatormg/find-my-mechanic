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
  

  document.getElementById("mechanicForm").addEventListener("submit", function(e) {
  e.preventDefault();
    

  const name = document.getElementById("mechName").value;
  const location = document.getElementById("mechLocation").value;
  const service = document.getElementById("mechService").value;
  const price = document.getElementById("mechPrice").value;
  const contact = document.getElementById("mechContact").value;
  const vehicle = document.getElementById("mechVehicleType").value;
  const brand = document.getElementById("mechBrand").value;

  const table = document.getElementById("mechanicTable");
  const row = table.insertRow();

  row.innerHTML = `
    <td>${name} <span class="unverified">Pending Verification</span></td>
    <td>${location}</td>
    <td>${service} (${vehicle}, ${brand})</td>
    <td>₹${price}</td>
    <td>${contact}</td>
  `;

  document.getElementById("mechanicForm").reset();
});
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
function toggleChatbot() {
  const box = document.getElementById("chatbot-box");
  box.style.display = box.style.display === "flex" ? "none" : "flex";
}

function sendChat() {
  const input = document.getElementById("chatbot-input");
  const msg = input.value.trim();
  if (!msg) return;

  const msgContainer = document.getElementById("chatbot-messages");

  // Add user message
  const userMsg = document.createElement("div");
  userMsg.className = "user-message";
  userMsg.textContent = msg;
  msgContainer.appendChild(userMsg);

  // Dummy bot response
  setTimeout(() => {
    const botReply = document.createElement("div");
    botReply.className = "bot-message";
    botReply.textContent = "Thanks! We’ll get back to you soon 🚗";
    msgContainer.appendChild(botReply);
    msgContainer.scrollTop = msgContainer.scrollHeight;
  }, 600);

  input.value = "";
  msgContainer.scrollTop = msgContainer.scrollHeight;
}
document.getElementById("mechanicForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const data = {
    name: document.getElementById("mechName").value,
    phone: document.getElementById("mechContact").value,
    email: document.getElementById("mechEmail").value,
    aadhar: document.getElementById("mechAadhar").value,
    garage: document.getElementById("mechGarage").value,
    experience: document.getElementById("mechExperience").value,
    location: document.getElementById("mechLocation").value,
    vehicleType: document.getElementById("mechVehicleType").value,
    brand: document.getElementById("mechBrand").value,
    service: document.getElementById("mechService").value,
    price: document.getElementById("mechPrice").value
  };

  fetch("https://script.google.com/macros/s/AKfycbz8LXQ34616E9IaIWy9bU8_FGeJZY_eaBy83z7c3v-u7pg1ZVo6f6gk_FShIvHJw_s3pw/exec", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(res => res.json())
    .then(response => {
      alert("✅ Mechanic registered successfully!");
      document.getElementById("mechanicForm").reset();
    })
    .catch(err => {
      alert("❌ Error submitting form.");
      console.error(err);
    });
});


