require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'BabyGrown',
  password: process.env.DB_PASSWORD || 'новый_пароль',
  port: process.env.DB_PORT || 5432,
});

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('❌ Ошибка подключения к базе:', err);
  } else {
    console.log('✅ Подключение к базе успешно! Время:', res.rows[0].now);
  }
});

module.exports = pool;
