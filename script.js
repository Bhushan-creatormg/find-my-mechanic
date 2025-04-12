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
