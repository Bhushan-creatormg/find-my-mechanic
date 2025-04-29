document.addEventListener("DOMContentLoaded", () => {
  // Simulating profile info - later this can be dynamic
  const mechanic = {
    name: "Raj Motors",
    location: "Thane",
    service: "Brake Fixing",
    experience: "5",
    garage: "Raj Garage",
    verified: false
  };

  document.getElementById("profileName").textContent = mechanic.name;
  document.getElementById("profileLocation").textContent = mechanic.location;
  document.getElementById("profileService").textContent = mechanic.service;
  document.getElementById("profileExperience").textContent = mechanic.experience;
  document.getElementById("profileGarage").textContent = mechanic.garage;
  document.getElementById("profileStatus").textContent = mechanic.verified ? "Verified" : "Pending";
});
