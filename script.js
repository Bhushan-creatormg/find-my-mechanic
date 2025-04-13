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

    // Trigger on load (optional)
    if (vehicleDropdown.value) {
      vehicleDropdown.dispatchEvent(new Event("change"));
    }
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

// Apply everything when DOM is loaded
window.addEventListener("DOMContentLoaded", () => {
  setupBrandDropdown("vehicleType", "brand");         // For top search section
  setupBrandDropdown("mechVehicleType", "mechBrand"); // For registration form
});
