const sequelize = require('../config/db');
const User = require('./User');

sequelize.sync({ force: false }) 
  .then(() => console.log('✅ Таблицы синхронизированы'))
  .catch(err => console.error('❌ Ошибка синхронизации:', err));

module.exports = { User };
