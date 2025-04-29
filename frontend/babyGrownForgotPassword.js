document.querySelector("form").addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.querySelector("input[type='email']").value.trim();

    // Проверка валидности email
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(email)) {
        alert("❌ Введите корректный email!");
        return;
    }

    try {
        // Отображаем спиннер или сообщение о загрузке
        const submitButton = event.target.querySelector("button");
        submitButton.disabled = true;
        submitButton.textContent = "Отправка...";

        const response = await fetch("/api/auth/forgot-password", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
        });

        const data = await response.json();

        if (response.ok) {
            alert("📧 Инструкции отправлены на почту!");
        } else {
            alert("❌ " + data.message);
        }
    } catch (error) {
        console.error("Ошибка:", error);
        alert("❌ Ошибка сервера");
    } finally {
        // Снимаем спиннер или возвращаем кнопку в исходное состояние
        const submitButton = event.target.querySelector("button");
        submitButton.disabled = false;
        submitButton.textContent = "Отправить инструкции";
    }
});
