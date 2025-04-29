const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: 'postgres',
  logging: false,
});

module.exports = sequelize;
sequelize.authenticate()
  .then(() => console.log('✅ Подключение к БД установлено'))
  .catch(err => console.error('❌ Ошибка подключения:', err));
