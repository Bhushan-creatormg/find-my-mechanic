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
// ==========================
// Mechanic Card Display Page (mechanics.html)
// ==========================

const mechanics = [
  { name: "Rahul's Garage", location: "Kalyan", service: "Puncture Repair", price: "₹200", contact: "9876543210" },
  { name: "AutoFix", location: "Thane", service: "Oil Change", price: "₹500", contact: "8765432109" },
  { name: "Speedy Repairs", location: "Navi Mumbai", service: "Tire Replacement", price: "₹1500", contact: "7654321098" }
];

function loadMechanicCards() {
  const container = document.getElementById("mechanicCardContainer");
  if (!container) return;

  mechanics.forEach(mech => {
    const card = document.createElement("div");
    card.className = "col-md-4 mb-4";

    card.innerHTML = `
      <div class="card h-100 shadow-sm border-0">
        <div class="card-body">
          <h5 class="card-title d-flex justify-content-between">
            ${mech.name} <span class="badge bg-success">Verified</span>
          </h5>
          <p class="mb-1"><strong>Location:</strong> ${mech.location}</p>
          <p class="mb-1"><strong>Service:</strong> ${mech.service}</p>
          <p class="mb-1"><strong>Price:</strong> ${mech.price}</p>
          <p class="mb-1"><strong>Contact:</strong> ${mech.contact}</p>
          <a href="#" class="btn btn-outline-primary btn-sm mt-2">View Profile</a>
        </div>
      </div>
    `;

    container.appendChild(card);
  });
}

// Run only on mechanics.html
window.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("mechanicCardContainer")) {
    loadMechanicCards();
  }
});
