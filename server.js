const express = require("express");
const { Pool } = require("pg");
const path = require("path");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const app = express();

const SECRET_KEY = "your_secret_key"; // Замените на надежный секретный ключ

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'BabyGrown',
    password: '12345',
    port: 5432
});

app.use(express.json());
app.use(express.static(path.join(__dirname, 'frontend')));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'babyGrownFormPassword.html'));
});

// Регистрация пользователя
app.post("/api/auth/register", async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const query = "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *";
        const values = [username, email, hashedPassword];
        const result = await pool.query(query, values);

        res.status(201).json({
            message: "User registered successfully",
            user: result.rows[0]
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Логин пользователя
app.post("/api/auth/login", async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
    }

    try {
        const query = "SELECT * FROM users WHERE username = $1";
        const values = [username];
        const result = await pool.query(query, values);

        if (result.rows.length === 0) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        const user = result.rows[0];
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: "5m" });
        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Middleware для проверки токена
const authenticateToken = (req, res, next) => {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) return res.status(403).json({ message: "Access denied" });

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.status(403).json({ message: "Invalid token" });
        req.user = user;
        next();
    });
};

// Пример защищенного маршрута
app.get("/api/protected", authenticateToken, async (req, res) => {
  try {
      const query = "SELECT id, username, email FROM users WHERE id = $1";
      const result = await pool.query(query, [req.user.id]);

      if (result.rows.length === 0) {
          return res.status(404).json({ message: "User not found" });
      }

      console.log("Отправляем user:", result.rows[0]); // Лог для проверки

      res.json({ user: result.rows[0] });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(3001, () => {
    console.log("Server is running on http://localhost:3001");
});
