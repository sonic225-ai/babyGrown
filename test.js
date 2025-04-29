const fetch = require("node-fetch");

fetch("http://localhost:5000/api/auth/register", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ username: "testuser", password: "testpassword" })
})
  .then(res => res.json())
  .then(data => console.log("Ответ сервера:", data))
  .catch(err => console.error("Ошибка:", err));
