import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
import { getDatabase, ref, set, get, child } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyBmEjqu8EDahw2_hVhJYhni_7Ftr6o7rxs",
    authDomain: "find-my-mechanic-6e79e.firebaseapp.com",
    databaseURL: "https://find-my-mechanic-6e79e-default-rtdb.firebaseio.com",
    projectId: "find-my-mechanic-6e79e",
    storageBucket: "find-my-mechanic-6e79e.appspot.com",
    messagingSenderId: "558344535085",
    appId: "1:558344535085:web:37267d33ab8574e75ccca4",
    measurementId: "G-W4XC6C6DB0"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);
const provider = new GoogleAuthProvider();

export { auth, provider, database, signInWithPopup, signOut, ref, set, get, child };

