// Fetch brand options
function populateBrands() {
  const vehicleType = document.getElementById('vehicleType').value;
  const brandSelect = document.getElementById('brandSelect');
  brandSelect.innerHTML = "<option value=''>Select Brand</option>";

  if (vehicleType && brandData[vehicleType]) {
    brandData[vehicleType].forEach(brand => {
      const option = document.createElement('option');
      option.value = brand.name;
      option.text = brand.name;
      brandSelect.appendChild(option);
    });
  }
}

// Mechanic registration
document.getElementById('mechanicForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const location = document.getElementById('location').value;
  const vehicleSpecialty = document.getElementById('vehicleSpecialty').value;
  const photo = document.getElementById('photo').files[0];

  const reader = new FileReader();
  reader.onload = function() {
    const mechanic = {
      name: name,
      email: email,
      location: location,
      vehicleSpecialty: vehicleSpecialty,
      photo: reader.result
    };

    saveMechanic(mechanic);
    alert("Mechanic Registered Successfully!");
    document.getElementById('mechanicForm').reset();
  };
  reader.readAsDataURL(photo);
});

function saveMechanic(mechanic) {
  let mechanics = JSON.parse(localStorage.getItem('mechanics')) || [];
  mechanics.push(mechanic);
  localStorage.setItem('mechanics', JSON.stringify(mechanics));
  displayMechanics();
}

function displayMechanics() {
  const mechanics = JSON.parse(localStorage.getItem('mechanics')) || [];
  const container = document.getElementById('mechanicsContainer');
  container.innerHTML = "";

  mechanics.forEach((m, index) => {
    const card = document.createElement('div');
    card.className = 'mechanic-card';
    card.onclick = function() {
      openMechanicProfile(index);
    };
    card.innerHTML = `
      <img src="${m.photo}" alt="Mechanic Photo">
      <div class="mechanic-info">
        <h3>${m.name} <span class="verified-badge">✔ Verified</span></h3>
        <p>${m.location}</p>
        <p>Specializes in: ${m.vehicleSpecialty}</p>
      </div>
    `;
    container.appendChild(card);
  });
}

function openMechanicProfile(index) {
  localStorage.setItem('selectedMechanic', index);
  window.location.href = "mechanic.html";
}

// Chatbot basic responses
function sendMessage() {
  const userInput = document.getElementById('userInput').value;
  const chatBody = document.getElementById('chat-body');

  const userMessage = document.createElement('div');
  userMessage.textContent = "You: " + userInput;
  chatBody.appendChild(userMessage);

  const botMessage = document.createElement('div');
  botMessage.textContent = "Bot: " + getBotResponse(userInput);
  chatBody.appendChild(botMessage);

  document.getElementById('userInput').value = "";
  chatBody.scrollTop = chatBody.scrollHeight;
}

function getBotResponse(input) {
  input = input.toLowerCase();
  if (input.includes("hello") || input.includes("hi")) return "Hello! How can I assist you?";
  if (input.includes("book")) return "You can search and click on a mechanic to book!";
  if (input.includes("register")) return "You can register by filling the form below.";
  if (input.includes("help")) return "Sure! You can search, view profiles and book mechanics.";
  return "I'm sorry, I didn't understand. Please try asking something else!";
}

// On page load
window.onload = function() {
  if (document.getElementById('mechanicsContainer')) {
    displayMechanics();
  }
};
