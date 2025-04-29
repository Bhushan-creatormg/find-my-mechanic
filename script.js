// --- BRAND OPTIONS (don't touch)
const brandOptions = {
  Bike: ["Hero", "Honda", "Bajaj", "Royal Enfield", "TVS", "Others"],
  Car: ["Maruti", "Hyundai", "Tata", "Toyota", "Mahindra", "Others"],
  Truck: ["Ashok Leyland", "Tata", "Eicher", "Mahindra", "Bharat Benz", "Others"]
};

// --- Populate Brands (Universal Function)
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
    // Trigger once if pre-filled
    if (vehicleDropdown.value) {
      vehicleDropdown.dispatchEvent(new Event("change"));
    }
  }
}

// --- Mechanic Data (preloaded examples)
const mechanics = [
  {
    name: "Rahul's Garage",
    location: "Kalyan",
    service: "Puncture Repair",
    price: "₹200",
    contact: "9876543210",
    verified: false
  },
  {
    name: "AutoFix",
    location: "Thane",
    service: "Oil Change",
    price: "₹500",
    contact: "8765432109",
    verified: true
  }
];

// --- Load Mechanics to Table
function loadMechanics() {
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

  mechanics.forEach(mechanic => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${mechanic.name} ${mechanic.verified ? '<span class="verified">✔ Verified</span>' : '<span class="pending">Pending</span>'}</td>
      <td>${mechanic.location}</td>
      <td>${mechanic.service}</td>
      <td>${mechanic.price}</td>
      <td>${mechanic.contact}</td>
    `;
    table.appendChild(row);
  });
}

// --- Filter Mechanics
function filterMechanics() {
  const locationInput = document.getElementById("locationInput").value.trim().toLowerCase();
  const vehicleInput = document.getElementById("vehicleType").value;
  const brandInput = document.getElementById("brand").value;
  const problemInput = document.getElementById("problemInput").value.trim().toLowerCase();

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

  const filtered = mechanics.filter(mechanic => {
    return mechanic.location.toLowerCase().includes(locationInput);
  });

  if (filtered.length > 0) {
    filtered.forEach(mechanic => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${mechanic.name} ${mechanic.verified ? '<span class="verified">✔ Verified</span>' : '<span class="pending">Pending</span>'}</td>
        <td>${mechanic.location}</td>
        <td>${mechanic.service}</td>
        <td>${mechanic.price}</td>
        <td>${mechanic.contact}</td>
      `;
      table.appendChild(row);
    });
  } else {
    const row = document.createElement("tr");
    row.innerHTML = <td colspan="5">No mechanics found in this location.</td>;
    table.appendChild(row);
  }
}

// --- Mechanic Registration Form Submit to Google Sheets
document.getElementById("mechanicForm").addEventListener("submit", function(e) {
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
    price: document.getElementById("mechPrice").value,
    verified: "Pending"
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
      alert("✅ Mechanic Registered Successfully!");
      document.getElementById("mechanicForm").reset();
    })
    .catch(err => {
      alert("❌ Error submitting form.");
      console.error(err);
    });
});

// --- Chatbot Functions
function toggleChatbot() {
  const box = document.getElementById("chatbot-box");
  box.style.display = box.style.display === "flex" ? "none" : "flex";
}

function sendChat() {
  const input = document.getElementById("chatbot-input");
  const msg = input.value.trim();
  if (!msg) return;

  const msgContainer = document.getElementById("chatbot-messages");
  const userMsg = document.createElement("div");
  userMsg.className = "user-message";
  userMsg.textContent = msg;
  msgContainer.appendChild(userMsg);

  setTimeout(() => {
    const botReply = document.createElement("div");
    botReply.className = "bot-message";

    if (msg.toLowerCase().includes("price")) {
      botReply.textContent = "Mechanic prices vary by service. Please check the table above.";
    } else if (msg.toLowerCase().includes("location")) {
      botReply.textContent = "Please enter your location in the search bar.";
    } else {
      botReply.textContent = "Thanks! We'll assist you soon.";
    }

    msgContainer.appendChild(botReply);
    msgContainer.scrollTop = msgContainer.scrollHeight;
  }, 500);

  input.value = "";
  msgContainer.scrollTop = msgContainer.scrollHeight;
}

// --- Setup All Dropdowns on Load
window.addEventListener("DOMContentLoaded", () => {
  setupBrandDropdown("vehicleType", "brand");
  setupBrandDropdown("mechVehicleType", "mechBrand");
  loadMechanics();
});
