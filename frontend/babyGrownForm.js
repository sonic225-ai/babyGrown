document.querySelector("form").addEventListener("submit", async (event) => {
    event.preventDefault();

    const username = document.querySelector("input[placeholder='Username']").value;
    const password = document.querySelector("input[placeholder='Password']").value;

    try {
        const response = await fetch("/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });
        const data = await response.json();

        if (response.ok) {
            alert("✅ Логин успешна!");
            localStorage.setItem("token", data.token);
            window.location.href = "personalAccount.html";  // Переход на новую страницу
        } else {
            alert("❌ " + data.message);
        }
    } catch (error) {
        console.error("Ошибка:", error);
        alert("❌ Ошибка сервера");
    }
});