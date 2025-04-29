document.querySelector("form").addEventListener("submit", async (event) => {
    event.preventDefault();

    const username = document.querySelector("input[placeholder='Имя пользователя']").value;
    const email = document.querySelector("input[placeholder='Электронная почта']").value;
    const password = document.querySelector("input[placeholder='Пароль']").value;

    try {
        const response = await fetch("/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, email, password }),
        });

        const data = await response.json();

        if (response.ok) {
            alert("✅ Регистрация успешна!");
            window.location.href = "babyGrownFormPassword.html";  // Переход на новую страницу
        } else {
            alert("❌ " + data.message);
        }
    } catch (error) {
        console.error("Ошибка:", error);
        alert("❌ Ошибка сервера");
    }
});
