// Brand options const brandOptions = { Bike: ["Hero", "Honda", "Bajaj", "Royal Enfield", "TVS", "Others"], Car: ["Maruti", "Hyundai", "Tata", "Toyota", "Mahindra", "Others"], Truck: ["Ashok Leyland", "Tata", "Eicher", "Mahindra", "Bharat Benz", "Others"] };

// Universal brand population function function setupBrandDropdown(vehicleTypeId, brandSelectId) { const vehicleDropdown = document.getElementById(vehicleTypeId); const brandDropdown = document.getElementById(brandSelectId);

if (vehicleDropdown && brandDropdown) { vehicleDropdown.addEventListener("change", () => { const selected = vehicleDropdown.value; brandDropdown.innerHTML = "<option value=''>Select Brand</option>"; if (brandOptions[selected]) { brandOptions[selected].forEach(brand => { const option = document.createElement("option"); option.value = brand; option.textContent = brand; brandDropdown.appendChild(option); }); } });

if (vehicleDropdown.value) {
  vehicleDropdown.dispatchEvent(new Event("change"));
}

} }

// Mechanics data const mechanics = [ { name: "Rahul's Garage", location: "Kalyan", service: "Puncture Repair", price: "₹200", contact: "9876543210" }, { name: "AutoFix", location: "Thane", service: "Oil Change", price: "₹500", contact: "8765432109" }, { name: "Speedy Repairs", location: "Navi Mumbai", service: "Tire Replacement", price: "₹1500", contact: "7654321098" } ];

// Render mechanic cards function loadMechanics(filteredList = mechanics) { const container = document.getElementById("mechanicCardsContainer"); container.innerHTML = "";

if (filteredList.length === 0) { container.innerHTML = "<p class='text-center'>No mechanics found in this location.</p>"; return; }

filteredList.forEach(mech => { const card = document.createElement("div"); card.className = "col-md-4 mb-4"; card.innerHTML = <div class="card h-100 shadow-sm"> <div class="card-body"> <h5 class="card-title">${mech.name}</h5> <p class="card-text"><strong>Location:</strong> ${mech.location}</p> <p class="card-text"><strong>Service:</strong> ${mech.service}</p> <p class="card-text"><strong>Price:</strong> ${mech.price}</p> <p class="card-text"><strong>Contact:</strong> ${mech.contact}</p> <p class="card-text"><strong>Rating:</strong> ⭐⭐⭐⭐☆</p> <a href="tel:${mech.contact}" class="btn btn-primary">Contact Now</a> </div> </div>; container.appendChild(card); }); }

// Filter by location function filterMechanics() { const searchLocation = document.getElementById("locationInput").value.toLowerCase(); const filtered = mechanics.filter(m => m.location.toLowerCase().includes(searchLocation)); loadMechanics(filtered); }

// Chatbot functions function toggleChatbot() { const box = document.getElementById("chatbot-box"); box.style.display = box.style.display === "flex" ? "none" : "flex"; }

function sendChat() { const input = document.getElementById("chatbot-input"); const msg = input.value.trim(); if (!msg) return;

const msgContainer = document.getElementById("chatbot-messages"); const userMsg = document.createElement("div"); userMsg.className = "user-message"; userMsg.textContent = msg; msgContainer.appendChild(userMsg);

setTimeout(() => { const botReply = document.createElement("div"); botReply.className = "bot-message"; botReply.textContent = "Thanks! We’ll get back to you soon 🚗"; msgContainer.appendChild(botReply); msgContainer.scrollTop = msgContainer.scrollHeight; }, 600);

input.value = ""; msgContainer.scrollTop = msgContainer.scrollHeight; }

// Init window.addEventListener("DOMContentLoaded", () => { loadMechanics(); setupBrandDropdown("vehicleType", "brand"); setupBrandDropdown("mechVehicleType", "mechBrand"); });
