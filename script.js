document.addEventListener("DOMContentLoaded", function () {
    if (localStorage.getItem("isLoggedIn") === "true") {
        showMainPage();
    }
});

function registerUser() {
    let username = document.getElementById("signupUsername").value.trim();
    let password = document.getElementById("signupPassword").value.trim();

    if (username && password) {
        localStorage.setItem("user", JSON.stringify({ username, password }));
        alert("Signup Successful! Please log in.");
    } else {
        alert("Please enter a valid username and password.");
    }
}

function loginUser() {
    let username = document.getElementById("loginUsername").value.trim();
    let password = document.getElementById("loginPassword").value.trim();
    let user = JSON.parse(localStorage.getItem("user"));

    if (user && username === user.username && password === user.password) {
        localStorage.setItem("isLoggedIn", "true");
        showMainPage();
    } else {
        alert("Invalid Username or Password!");
    }
}

function logoutUser() {
    localStorage.removeItem("isLoggedIn");
    location.reload();
}

function showMainPage() {
    document.getElementById("authPage").style.display = "none";
    document.getElementById("mainPage").style.display = "block";
}
