// Brand options
const brandOptions = {
  Bike: ["Hero", "Honda", "Bajaj", "Royal Enfield", "TVS", "Others"],
  Car: ["Maruti", "Hyundai", "Tata", "Toyota", "Mahindra", "Others"],
  Truck: ["Ashok Leyland", "Tata", "Eicher", "Mahindra", "Bharat Benz", "Others"]
};

// Brand dropdown handler
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

    if (vehicleDropdown.value) {
      vehicleDropdown.dispatchEvent(new Event("change"));
    }
  }
}

// Mechanic display
function filterMechanics() {
  const location = document.getElementById("locationInput").value.toLowerCase();
  const table = document.getElementById("mechanicTable");

  table.innerHTML = `<tr>
    <th>Name</th><th>Location</th><th>Service</th><th>Price</th><th>Contact</th>
  </tr>`;

  const mechanics = JSON.parse(localStorage.getItem("registeredMechanics")) || [];

  const filtered = mechanics.filter(m =>
    m.location.toLowerCase().includes(location)
  );

  filtered.forEach(m => {
    table.innerHTML += `
      <tr>
        <td>${m.name}</td>
        <td>${m.location}</td>
        <td>${m.service}</td>
        <td>${m.price}</td>
        <td>${m.phone}</td>
      </tr>`;
  });

  if (filtered.length === 0) {
    table.innerHTML += `<tr><td colspan="5">No mechanics found.</td></tr>`;
  }
}

// Form submission to Google Sheets
document.addEventListener("DOMContentLoaded", () => {
  setupBrandDropdown("vehicleType", "brand");
  setupBrandDropdown("mechVehicleType", "mechBrand");

  const form = document.getElementById("mechanicForm");
  if (form) {
    form.addEventListener("submit", function (e) {
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

      // Save to localStorage (optional)
      const existing = JSON.parse(localStorage.getItem("registeredMechanics")) || [];
      existing.push(data);
      localStorage.setItem("registeredMechanics", JSON.stringify(existing));

      fetch("https://script.google.com/macros/s/AKfycbz8LXQ34616E9IaIWy9bU8_FGeJZY_eaBy83z7c3v-u7pg1ZVo6f6gk_FShIvHJw_s3pw/exec", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" }
      })
      .then(res => res.json())
      .then(() => {
        alert("✅ Mechanic registered!");
        form.reset();
        filterMechanics();
      })
      .catch(() => {
        alert("❌ Error submitting form.");
      });
    });
  }

  filterMechanics(); // load default
});

// Chatbot
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
    botReply.textContent = "Thanks! We'll get back to you soon.";
    msgContainer.appendChild(botReply);
    msgContainer.scrollTop = msgContainer.scrollHeight;
  }, 500);

  input.value = "";
}
