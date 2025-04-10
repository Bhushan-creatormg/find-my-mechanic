const mechanics = [
    { name: "Rahul's Garage", location: "Mumbai", service: "Puncture Repair", price: "₹200", contact: "9876543210" },
    { name: "AutoFix", location: "Pune", service: "Oil Change", price: "₹500", contact: "8765432109" },
    { name: "Speedy Repairs", location: "Delhi", service: "Tire Replacement", price: "₹1500", contact: "7654321098" }
];

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
