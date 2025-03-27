import { auth, provider, database, signInWithPopup, signOut, ref, set, get, child } from "./firebase-config.js";

// Google Login
document.getElementById("login-btn").addEventListener("click", () => {
    signInWithPopup(auth, provider).then((result) => {
        alert("Logged in as " + result.user.displayName);
        document.getElementById("login-btn").style.display = "none";
        document.getElementById("logout-btn").style.display = "block";
    });
});

// Logout
document.getElementById("logout-btn").addEventListener("click", () => {
    signOut(auth).then(() => {
        alert("Logged out!");
        document.getElementById("login-btn").style.display = "block";
        document.getElementById("logout-btn").style.display = "none";
    });
});

// Register Mechanic
function registerMechanic() {
    const name = document.getElementById("name").value;
    const location = document.getElementById("service-location").value;
    const type = document.getElementById("mechanic-type").value;

    set(ref(database, "mechanics/" + name), {
        name: name,
        location: location,
        type: type
    }).then(() => {
        alert("Mechanic Registered!");
    });
}

// Find Mechanics
function findMechanics() {
    const location = document.getElementById("location").value;
    const type = document.getElementById("vehicle-type").value;
    const mechanicList = document.getElementById("mechanic-list");

    get(child(ref(database), "mechanics/")).then((snapshot) => {
        mechanicList.innerHTML = "";
        snapshot.forEach((childSnapshot) => {
            const data = childSnapshot.val();
            if (data.location === location && data.type === type) {
                mechanicList.innerHTML += `<li>${data.name} - ${data.location}</li>`;
            }
        });
    });
}

// Auto-suggest locations (Dummy Data)
function autoSuggestLocation() {
    const input = document.getElementById("location").value.toLowerCase();
    const suggestions = ["Mumbai", "Pune", "Delhi", "Bangalore", "Hyderabad"];
    document.getElementById("suggestions").innerHTML = suggestions
        .filter(city => city.toLowerCase().includes(input))
        .map(city => `<li onclick="setLocation('${city}')">${city}</li>`)
        .join("");
}

function setLocation(city) {
    document.getElementById("location").value = city;
    document.getElementById("suggestions").innerHTML = "";
}
