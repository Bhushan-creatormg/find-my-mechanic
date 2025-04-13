
// Brand options
const brandOptions = {
  Bike: ["Hero", "Honda", "Bajaj", "Royal Enfield", "TVS", "Others"],
  Car: ["Maruti", "Hyundai", "Tata", "Toyota", "Mahindra", "Others"],
  Truck: ["Ashok Leyland", "Tata", "Eicher", "Mahindra", "Bharat Benz", "Others"]
};

// Universal brand population function
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

    // Optional: trigger once on page load if a value is pre-selected
    if (vehicleDropdown.value) {
      vehicleDropdown.dispatchEvent(new Event("change"));
    }
  }
}

// When page is ready, apply it to both sets
window.addEventListener("DOMContentLoaded", () => {
  setupBrandDropdown("vehicleType", "brand");               // Top section
  setupBrandDropdown("mechVehicleType", "mechBrand");       // Mechanic form
});
// Chatbot toggle
function toggleChatbot() {
  const box = document.getElementById("chatbot-box");
  box.style.display = box.style.display === "flex" ? "none" : "flex";
}

// Chatbot messaging
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
    botReply.textContent = "Thanks! We’ll get back to you soon 🚗";
    msgContainer.appendChild(botReply);
    msgContainer.scrollTop = msgContainer.scrollHeight;
  }, 600);

  input.value = "";
  msgContainer.scrollTop = msgContainer.scrollHeight;
}

// Setup event listeners
window.addEventListener("DOMContentLoaded", () => {
  // Top search section
  const vehicleSelect = document.getElementById("vehicleType");
  if (vehicleSelect) {
    vehicleSelect.addEventListener("change", () => {
      populateBrands("vehicleType", "brand");
    });
  }

  // Mechanic registration form
  const mechVehicleSelect = document.getElementById("mechVehicleType");
  if (mechVehicleSelect) {
    mechVehicleSelect.addEventListener("change", () => {
      populateBrands("mechVehicleType", "mechBrand");
    });
  }
});
