// 📁 scripts/insertAdmins.js
const bcrypt = require('bcryptjs');
const pool = require('../config/db');

async function insertAdmins() {
  try {
    const hashed1 = await bcrypt.hash('admin1234', 10);
    const hashed2 = await bcrypt.hash('admin1234', 10);

    await pool.execute(
      `INSERT INTO admins (nom, email, mot_de_passe) VALUES (?, ?, ?), (?, ?, ?)`,
      [
        'Admin1', 'admin@plateforme1.com', hashed1,
        'Admin2', 'superadmin@plateforme2.com', hashed2
      ]
    );

    console.log('✅ Admins insérés avec succès !');
    process.exit();
  } catch (error) {
    console.error('❌ Erreur lors de linsertion des admins :', error.message);
    process.exit(1);
  }
}

insertAdmins();
