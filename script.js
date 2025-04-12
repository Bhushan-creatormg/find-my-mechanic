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

window.addEventListener("DOMContentLoaded", () => {
  document.getElementById("vehicleType")?.addEventListener("change", () => {
    populateBrands("vehicleType", "brand");
  });
  document.getElementById("mechVehicleType")?.addEventListener("change", () => {
    populateBrands("mechVehicleType", "mechBrand");
  });
});
