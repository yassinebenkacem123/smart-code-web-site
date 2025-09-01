
require('dotenv').config();
const mysql = require('mysql2/promise');
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test de connexion
(async () => {
  try {
    const conn = await pool.getConnection();
    console.log('✅ Connexion à la base de données réussie !');
    conn.release();
  } catch (error) {
    console.error('❌ Erreur de connexion à la base de données :', error.message);
  }
})();

module.exports = pool;
