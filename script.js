document.addEventListener("DOMContentLoaded", function () {
    const mechanicTableBody = document.getElementById("mechanicTableBody");
    let mechanicsData = []; // Store mechanics data globally

    function fetchMechanics() {
        fetch("https://script.google.com/macros/s/AKfycbxYC-hUzcufX8cO8d3IOVLoYt_-bhNwKUdhWNUYI3ujp_ZiELeusMAn-Zcafabni2XyHA/exec")
            .then(response => response.json())
            .then(data => {
                mechanicsData = data; // Store fetched data globally
                updateTable(mechanicsData);
            })
            .catch(error => console.error("Error fetching data:", error));
    }

    function updateTable(mechanics) {
        mechanicTableBody.innerHTML = ""; // Clear existing table rows

        if (mechanics.length === 0) {
            mechanicTableBody.innerHTML = "<tr><td colspan='8'>No mechanics found</td></tr>";
            return;
        }

        mechanics.forEach(mechanic => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${mechanic.name}</td>
                <td>${mechanic.location}</td>
                <td>${mechanic.vehicle}</td>
                <td>${mechanic.company}</td>
                <td>${mechanic.model}</td>
                <td>${mechanic.service}</td>
                <td>₹${mechanic.price}</td>
                <td>${mechanic.contact}</td>
            `;
            mechanicTableBody.appendChild(row);
        });
    }

    function applyFilters() {
        const locationFilter = document.getElementById("locationFilter").value.toLowerCase().trim();
        const vehicleTypeFilter = document.getElementById("vehicleTypeFilter").value;
        const carCompanyFilter = document.getElementById("carCompanyFilter").value;
        const bikeCompanyFilter = document.getElementById("bikeCompanyFilter").value;
        const modelFilter = document.getElementById("modelFilter").value.toLowerCase().trim();
        const carCompanyOther = document.getElementById("carCompanyOther").value.trim();
        const bikeCompanyOther = document.getElementById("bikeCompanyOther").value.trim();

        let selectedCompany = vehicleTypeFilter === "Car" ? carCompanyFilter : bikeCompanyFilter;
        if (selectedCompany === "Others") {
            selectedCompany = vehicleTypeFilter === "Car" ? carCompanyOther : bikeCompanyOther;
        }

        const filteredMechanics = mechanicsData.filter(mechanic =>
            (locationFilter === "" || mechanic.location.toLowerCase().includes(locationFilter)) &&
            (vehicleTypeFilter === "" || mechanic.vehicle === vehicleTypeFilter) &&
            (selectedCompany === "" || mechanic.company.toLowerCase() === selectedCompany.toLowerCase()) &&
            (modelFilter === "" || mechanic.model.toLowerCase().includes(modelFilter))
        );

        updateTable(filteredMechanics);
    }

    function updateCompanyDropdown() {
        const vehicleTypeFilter = document.getElementById("vehicleTypeFilter").value;
        const carCompanyDropdown = document.getElementById("carCompanyFilter");
        const bikeCompanyDropdown = document.getElementById("bikeCompanyFilter");
        const carCompanyOther = document.getElementById("carCompanyOther");
        const bikeCompanyOther = document.getElementById("bikeCompanyOther");

        carCompanyDropdown.style.display = "none";
        bikeCompanyDropdown.style.display = "none";
        carCompanyOther.style.display = "none";
        bikeCompanyOther.style.display = "none";

        if (vehicleTypeFilter === "Car") {
            carCompanyDropdown.style.display = "inline-block";
        } else if (vehicleTypeFilter === "Bike") {
            bikeCompanyDropdown.style.display = "inline-block";
        }
    }

    document.getElementById("locationFilter").addEventListener("input", applyFilters);
    document.getElementById("vehicleTypeFilter").addEventListener("change", () => {
        updateCompanyDropdown();
        applyFilters();
    });
    document.getElementById("carCompanyFilter").addEventListener("change", applyFilters);
    document.getElementById("bikeCompanyFilter").addEventListener("change", applyFilters);
    document.getElementById("modelFilter").addEventListener("input", applyFilters);
    document.getElementById("carCompanyOther").addEventListener("input", applyFilters);
    document.getElementById("bikeCompanyOther").addEventListener("input", applyFilters);

    fetchMechanics(); // Fetch mechanics on page load
});
