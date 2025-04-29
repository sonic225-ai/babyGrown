const express = require('express');
const router = express.Router();

// Определите маршруты, например,
router.post('/login', (req, res) => {
  // Логика входа
});

module.exports = router;

const authRoutes = require('./routes/authRoutes');
app.use('/auth', authRoutes);
