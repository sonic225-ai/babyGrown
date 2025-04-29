import { auth, initAuthStateListener } from "./firebase.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

initAuthStateListener();

document.querySelector("form").addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.querySelector("input[placeholder='Электронная почта']").value;
    const password = document.querySelector("input[placeholder='Пароль']").value;

    try {
        await createUserWithEmailAndPassword(auth, email, password);
        alert("✅ Регистрация успешна!");
        window.location.href = "babyGrownFormPassword.html";
    } catch (error) {
        alert("❌ " + error.message);
    }
});