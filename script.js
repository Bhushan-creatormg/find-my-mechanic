const brandOptions = {
  Bike: ["Hero", "Honda", "Bajaj", "Royal Enfield", "TVS", "Others"],
  Car: ["Maruti", "Hyundai", "Tata", "Toyota", "Mahindra", "Others"],
  Truck: ["Ashok Leyland", "Tata", "Eicher", "Mahindra", "Bharat Benz", "Others"]
};

function populateBrands(vehicleTypeId, brandId) {
  const vehicleType = document.getElementById(vehicleTypeId).value;
  const brandSelect = document.getElementById(brandId);

  brandSelect.innerHTML = "<option value=''>Select Brand</option>";

  if (brandOptions[vehicleType]) {
    brandOptions[vehicleType].forEach(brand => {
      const option = document.createElement("option");
      option.value = brand;
      option.textContent = brand;
      brandSelect.appendChild(option);
    });
  }
}

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
    botReply.textContent = "Thanks! We’ll get back to you soon 🚗";
    msgContainer.appendChild(botReply);
    msgContainer.scrollTop = msgContainer.scrollHeight;
  }, 600);

  input.value = "";
  msgContainer.scrollTop = msgContainer.scrollHeight;
}

window.addEventListener("DOMContentLoaded", () => {
  // for top search section
  document.getElementById("vehicleType").addEventListener("change", () => {
    populateBrands("vehicleType", "brand");
  });

  // for mechanic registration form
  document.getElementById("mechVehicleType").addEventListener("change", () => {
    populateBrands("mechVehicleType", "mechBrand");
  });
});
