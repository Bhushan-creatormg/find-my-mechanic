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

    if (vehicleDropdown.value) {
      vehicleDropdown.dispatchEvent(new Event("change"));
    }
  }
}

window.addEventListener("DOMContentLoaded", () => {
  setupBrandDropdown("vehicleType", "brand");
  setupBrandDropdown("mechVehicleType", "mechBrand");
});