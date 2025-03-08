document.addEventListener("DOMContentLoaded", function () {
    const mechanics = [
        { name: "Rahul's Garage", location: "Mumbai", vehicle: "Car", company: "Honda", model: "City", service: "Puncture Repair", price: 200, contact: "9876543210" },
        { name: "AutoFix", location: "Pune", vehicle: "Bike", company: "Bajaj", model: "Pulsar", service: "Oil Change", price: 500, contact: "8765432109" },
        { name: "Speedy Repairs", location: "Delhi", vehicle: "Car", company: "Toyota", model: "Innova", service: "Tire Replacement", price: 1500, contact: "7654321098" },
        { name: "Fast Bikes", location: "Chennai", vehicle: "Bike", company: "Hero", model: "Splendor", service: "Engine Repair", price: 800, contact: "9988776655" }
    ];

    const mechanicTableBody = document.getElementById("mechanicTableBody");

    function updateTable(filteredMechanics) {
        mechanicTableBody.innerHTML = ""; // Clear table before adding new rows

        filteredMechanics.forEach(mechanic => {
            const row = `<tr>
                <td>${mechanic.name}</td>
                <td>${mechanic.location}</td>
                <td>${mechanic.vehicle}</td>
                <td>${mechanic.company}</td>
                <td>${mechanic.model}</td>
                <td>${mechanic.service}</td>
                <td>₹${mechanic.price}</td>
                <td>${mechanic.contact}</td>
            </tr>`;
            mechanicTableBody.innerHTML += row;
        });
    }

    function applyFilters() {
        const locationFilter = document.getElementById("locationFilter").value.toLowerCase();
        const vehicleTypeFilter = document.getElementById("vehicleTypeFilter").value;
        const carCompanyFilter = document.getElementById("carCompanyFilter").value;
        const bikeCompanyFilter = document.getElementById("bikeCompanyFilter").value;
        const modelFilter = document.getElementById("modelFilter").value;
        const carCompanyOther = document.getElementById("carCompanyOther").value;
        const bikeCompanyOther = document.getElementById("bikeCompanyOther").value;

        let selectedCompany = vehicleTypeFilter === "Car" ? carCompanyFilter : bikeCompanyFilter;
        if (selectedCompany === "Others") {
            selectedCompany = vehicleTypeFilter === "Car" ? carCompanyOther : bikeCompanyOther;
        }

        const filteredMechanics = mechanics.filter(mechanic =>
            (locationFilter === "" || mechanic.location.toLowerCase().includes(locationFilter)) &&
            (vehicleTypeFilter === "" || mechanic.vehicle === vehicleTypeFilter) &&
            (selectedCompany === "" || mechanic.company === selectedCompany) &&
            (modelFilter === "" || mechanic.model === modelFilter)
        );

        updateTable(filteredMechanics);
    }

    function updateCompanyDropdown() {
        const vehicleTypeFilter = document.getElementById("vehicleTypeFilter").value;
        const carCompanyDropdown = document.getElementById("carCompanyFilter");
        const bikeCompanyDropdown = document.getElementById("bikeCompanyFilter");
        const carCompanyOther = document.getElementById("carCompanyOther");
        const bikeCompanyOther = document.getElementById("bikeCompanyOther");

        // Show the relevant company dropdown
        if (vehicleTypeFilter === "Car") {
            carCompanyDropdown.style.display = "inline-block";
            bikeCompanyDropdown.style.display = "none";
            carCompanyOther.style.display = "none";
            bikeCompanyOther.style.display = "none";
        } else if (vehicleTypeFilter === "Bike") {
            bikeCompanyDropdown.style.display = "inline-block";
            carCompanyDropdown.style.display = "none";
            carCompanyOther.style.display = "none";
            bikeCompanyOther.style.display = "none";
        } else {
            carCompanyDropdown.style.display = "none";
            bikeCompanyDropdown.style.display = "none";
            carCompanyOther.style.display = "none";
            bikeCompanyOther.style.display = "none";
        }

        updateModelDropdown();
    }

    function updateModelDropdown() {
    let modelDropdown = document.getElementById("modelFilter");
    modelDropdown.innerHTML = '<option value="">Select Model</option>'; // Clear previous options

    const vehicleTypeFilter = document.getElementById("vehicleTypeFilter").value;
    const carCompanyFilter = document.getElementById("carCompanyFilter").value;
    const bikeCompanyFilter = document.getElementById("bikeCompanyFilter").value;

    let selectedCompany = vehicleTypeFilter === "Car" ? carCompanyFilter : bikeCompanyFilter;

    // Debugging: Check what company is selected
    console.log("Selected Vehicle Type:", vehicleTypeFilter);
    console.log("Selected Company:", selectedCompany);

    const models = {
        "Honda": ["City", "Civic", "Amaze"],
        "Toyota": ["Corolla", "Innova", "Fortuner"],
        "Yamaha": ["R15", "MT-15"],
        "Royal Enfield": ["Classic 350", "Meteor", "Himalayan"]
    };

    // Check if the selected company exists in models
    console.log("Available Models for Company:", models[selectedCompany]);

    if (selectedCompany in models) {
        models[selectedCompany].forEach(model => {
            let option = document.createElement("option");
            option.value = model;
            option.textContent = model;
            modelDropdown.appendChild(option);
        });
    } else {
        console.error("No models found for:", selectedCompany);
    }
}
    updateTable(mechanics);
    window.applyFilters = applyFilters;
    document.getElementById("vehicleTypeFilter").addEventListener("change", updateCompanyDropdown);
    document.getElementById("carCompanyFilter").addEventListener("change", updateModelDropdown);
    document.getElementById("bikeCompanyFilter").addEventListener("change", updateModelDropdown);
});
