// Mechanic registration logic
const mechanicForm = document.getElementById('mechanicForm');
const mechanicList = document.getElementById('mechanicListContainer');
const vehicleTypeSelect = document.getElementById('vehicleType');

// Dynamically update brand options based on vehicle type
vehicleTypeSelect.addEventListener('change', function() {
  const vehicleType = vehicleTypeSelect.value;
  updateBrandOptions(vehicleType); // Call the function from brandData.js
});

// Register mechanic
mechanicForm.addEventListener('submit', function(event) {
  event.preventDefault();
  
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const vehicleType = vehicleTypeSelect.value;
  const brand = document.getElementById('brand').value;
  const service = document.getElementById('service').value;
  const photo = document.getElementById('profilePhoto').files[0];
  
  const mechanic = {
    name,
    email,
    vehicleType,
    brand,
    service,
    photo,
    verified: true // Assume verification for now
  };

  addMechanicToList(mechanic);
});

function addMechanicToList(mechanic) {
  const mechanicCard = document.createElement('div');
  mechanicCard.classList.add('mechanic-card');
  
  const photoURL = URL.createObjectURL(mechanic.photo);
  mechanicCard.innerHTML = `
    <img src="${photoURL}" alt="${mechanic.name}">
    <div class="mechanic-info">
      <h3>${mechanic.name}</h3>
      <p>${mechanic.service}</p>
      <p>${mechanic.brand}</p>
    </div>
    <div class="verify">${mechanic.verified ? 'Verified' : 'Not Verified'}</div>
  `;
  
  mechanicCard.onclick = () => viewMechanicProfile(mechanic);
  mechanicList.appendChild(mechanicCard);
}

function viewMechanicProfile(mechanic) {
  alert('View profile: ' + mechanic.name);
}
