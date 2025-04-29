import { auth, initAuthStateListener } from "./firebase.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

initAuthStateListener();

document.querySelector("form").addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.querySelector("input[placeholder='Username']").value;
    const password = document.querySelector("input[placeholder='Password']").value;

    try {
        await signInWithEmailAndPassword(auth, email, password);
        alert("✅ Вход успешен!");
        window.location.href = "personalAccount.html";
    } catch (error) {
        alert("❌ " + error.message);
    }
});