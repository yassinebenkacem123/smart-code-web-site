const bcrypt = require('bcryptjs');
const pool = require('../config/db');
async function insertEtudiant() {
  try {
    const hashed = await bcrypt.hash('etudiant123', 10);
    await pool.execute(
      `INSERT INTO etudiants (nom, email, mot_de_passe, date_naissance, date_inscription_ecole, adress) VALUES (?, ?, ?, ?, ?, ?)`,
      ['Brahim louso', 'brahimslh456@gmail.com', hashed, '2000-01-15', '2023-09-01', '12 rue des Roses, Marseille']
    );
    console.log('✅ Étudiant inséré avec succès !');
    process.exit();
  } catch (error) {
    console.error('❌ Erreur insertion étudiant :', error.message);
    process.exit(1);
  }
}

insertEtudiant();