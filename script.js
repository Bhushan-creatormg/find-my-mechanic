document.addEventListener("DOMContentLoaded", function () {
    const mechanics = [
        { name: "Rahul's Garage", location: "Mumbai", service: "Puncture Repair", price: 200, contact: "9876543210" },
        { name: "AutoFix", location: "Pune", service: "Oil Change", price: 500, contact: "8765432109" },
        { name: "Speedy Repairs", location: "Delhi", service: "Tire Replacement", price: 1500, contact: "7654321098" }
    ];

    const mechanicTableBody = document.getElementById("mechanicTableBody");

    function updateTable(filteredMechanics) {
        mechanicTableBody.innerHTML = ""; // Clear table before adding new rows

        filteredMechanics.forEach(mechanic => {
            const row = `<tr>
                <td>${mechanic.name}</td>
                <td>${mechanic.location}</td>
                <td>${mechanic.service}</td>
                <td>₹${mechanic.price}</td>
                <td>${mechanic.contact}</td>
            </tr>`;
            mechanicTableBody.innerHTML += row;
        });
    }

    function applyFilters() {
        const locationFilter = document.getElementById("locationFilter").value.toLowerCase();
        
        const filteredMechanics = mechanics.filter(mechanic =>
            mechanic.location.toLowerCase().includes(locationFilter)
        );

        updateTable(filteredMechanics);
    }

    updateTable(mechanics); // Load initial data

    // Attach filter function to the button
    window.applyFilters = applyFilters;
});

function loadMechanics() {
    const table = document.getElementById("mechanicTable");
    mechanics.forEach(mechanic => {
        let row = `<tr>
                      <td>${mechanic.name}</td>
                      <td>${mechanic.location}</td>
                      <td>${mechanic.service}</td>
                      <td>${mechanic.price}</td>
                      <td>${mechanic.contact}</td>
                   </tr>`;
        table.innerHTML += row;
    });
}

window.onload = loadMechanics;
function getUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

function showPosition(position) {
    alert("Your location:\nLatitude: " + position.coords.latitude + "\nLongitude: " + position.coords.longitude);
}

function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            alert("User denied the request for Geolocation.");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            alert("The request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            alert("An unknown error occurred.");
            break;
    }
}

// Add a button to HTML to trigger location tracking
function filterMechanics() {
    let serviceInput = document.getElementById("serviceFilter").value.toLowerCase();
    let priceInput = document.getElementById("priceFilter").value;

    let table = document.getElementById("mechanicTable");
    let rows = table.getElementsByTagName("tr");

    for (let i = 1; i < rows.length; i++) {
        let service = rows[i].getElementsByTagName("td")[2].innerText.toLowerCase();
        let priceText = rows[i].getElementsByTagName("td")[3].innerText.replace("₹", "").trim();
        let price = parseInt(priceText);

        if ((service.includes(serviceInput) || serviceInput === "") && 
            (isNaN(priceInput) || price <= parseInt(priceInput))) {
            rows[i].style.display = "";
        } else {
            rows[i].style.display = "none";
        }
    }
}
