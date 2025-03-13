
document.addEventListener("DOMContentLoaded", function () {
    const mechanicTableBody = document.getElementById("mechanicTableBody");

    function fetchMechanics() {
        fetch("https://script.google.com/macros/s/AKfycbxYC-hUzcufX8cO8d3IOVLoYt_-bhNwKUdhWNUYI3ujp_ZiELeusMAn-Zcafabni2XyHA/exec")
            .then(response => response.json())
            .then(data => {
                updateTable(data); // Update the table with fetched data
            })
            .catch(error => console.error("Error fetching data:", error));
    }

    function updateTable(mechanics) {
        mechanicTableBody.innerHTML = ""; // Clear existing table rows

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
        const locationFilter = document.getElementById("locationFilter").value.toLowerCase();
        const vehicleTypeFilter = document.getElementById("vehicleTypeFilter").value;
        const carCompanyFilter = document.getElementById("carCompanyFilter").value;
        const bikeCompanyFilter = document.getElementById("bikeCompanyFilter").value;
        const modelFilter = document.getElementById("modelFilter").value;
        const carCompanyOther = document.getElementById("carCompanyOther").value.trim();
        const bikeCompanyOther = document.getElementById("bikeCompanyOther").value.trim();

        let selectedCompany = vehicleTypeFilter === "Car" ? carCompanyFilter : bikeCompanyFilter;
        if (selectedCompany === "Others") {
            selectedCompany = vehicleTypeFilter === "Car" ? carCompanyOther : bikeCompanyOther;
        }

        fetch("https://script.google.com/macros/s/AKfycbxYC-hUzcufX8cO8d3IOVLoYt_-bhNwKUdhWNUYI3ujp_ZiELeusMAn-Zcafabni2XyHA/exec")
            .then(response => response.json())
            .then(mechanics => {
                const filteredMechanics = mechanics.filter(mechanic =>
                    (locationFilter === "" || mechanic.location.toLowerCase().includes(locationFilter)) &&
                    (vehicleTypeFilter === "" || mechanic.vehicle === vehicleTypeFilter) &&
                    (selectedCompany === "" || mechanic.company === selectedCompany) &&
                    (modelFilter === "" || mechanic.model === modelFilter)
                );
                updateTable(filteredMechanics);
            })
            .catch(error => console.error("Error fetching filtered data:", error));
    }

    function updateCompanyDropdown() {
        const vehicleTypeFilter = document.getElementById("vehicleTypeFilter").value;
        const carCompanyDropdown = document.getElementById("carCompanyFilter");
        const bikeCompanyDropdown = document.getElementById("bikeCompanyFilter");
        const carCompanyOther = document.getElementById("carCompanyOther");
        const bikeCompanyOther = document.getElementById("bikeCompanyOther");

        console.log("Selected Vehicle Type:", vehicleTypeFilter);

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
    }

    fetchMechanics(); // Fetch mechanics on page load
});
