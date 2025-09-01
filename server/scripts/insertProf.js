
// 📁 scripts/insertProf.js
const bcrypt2 = require('bcryptjs');
const pool2 = require('../config/db');

async function insertProf() {
  try {
    const hashed = await bcrypt2.hash('code1234', 10);
    await pool2.execute(
      `INSERT INTO enseignants (nom, email, mot_de_passe, date_naissance, adress) VALUES (?, ?, ?, ?, ?)`,
      ['Jean Martin', 'elgadsalma@gmail.com', hashed, '1980-09-10', '5 avenu Riyad Fes, Fes']
    );
    console.log('✅ Enseignant inséré avec succès !');
    process.exit();
  } catch (error) {
    console.error('❌ Erreur insertion enseignant :', error.message);
    process.exit(1);
  }
}

insertProf();
