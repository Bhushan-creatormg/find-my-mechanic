// Data for brand logos
const brands = {
  bike: [
    { name: 'Royal Enfield', logo: 'images/royal-enfield.png' },
    { name: 'Honda', logo: 'images/honda.png' },
    { name: 'Yamaha', logo: 'images/yamaha.png' }
  ],
  car: [
    { name: 'Maruti Suzuki', logo: 'images/maruti.png' },
    { name: 'Hyundai', logo: 'images/hyundai.png' },
    { name: 'Toyota', logo: 'images/toyota.png' }
  ],
  others: [
    { name: 'Truck', logo: 'images/truck.png' },
    { name: 'Rickshaw', logo: 'images/rickshaw.png' }
  ]
};

// Function to update brand dropdown based on vehicle type
function updateBrandOptions(vehicleType) {
  const brandSelect = document.getElementById('brand');
  brandSelect.innerHTML = '<option value="">Select Brand</option>'; // Clear previous options

  if (brands[vehicleType]) {
    brands[vehicleType].forEach(brand => {
      const option = document.createElement('option');
      option.value = brand.name;
      option.innerHTML = `<img src="${brand.logo}" alt="${brand.name}" width="20px"> ${brand.name}`;
      brandSelect.appendChild(option);
    });
  }
}
