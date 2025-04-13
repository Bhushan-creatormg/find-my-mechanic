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

window.addEventListener("DOMContentLoaded", () => {
  setupBrandDropdown("vehicleType", "brand");
  setupBrandDropdown("mechVehicleType", "mechBrand");
});
