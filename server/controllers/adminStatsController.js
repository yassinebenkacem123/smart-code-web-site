// 📁 controllers/adminStatsController.js
const pool = require('../config/db');

exports.getStatistics = async (req, res) => {
  try {
    const [[{ total_etudiants }]] = await pool.execute('SELECT COUNT(*) AS total_etudiants FROM etudiants');
    const [[{ total_enseignants }]] = await pool.execute('SELECT COUNT(*) AS total_enseignants FROM enseignants');
    const [[{ total_admins }]] = await pool.execute('SELECT COUNT(*) AS total_admins FROM admins');
    const [[{ total_cours }]] = await pool.execute('SELECT COUNT(*) AS total_cours FROM cours');

    const [etudiants_par_cours] = await pool.execute(`
      SELECT 
        c.id AS cours_id,
        c.titre,
        e.nom AS enseignant,
        COUNT(i.etudiant_id) AS total_etudiants_inscrits
      FROM cours c
      JOIN enseignants e ON e.id = c.enseignant_id
      LEFT JOIN inscriptions i ON i.cours_id = c.id AND i.statut_paiement = 'payé'
      GROUP BY c.id, c.titre, e.nom
    `);

    const [top_cours] = await pool.execute(`
      SELECT c.titre, COUNT(i.etudiant_id) AS inscrits
      FROM inscriptions i
      JOIN cours c ON c.id = i.cours_id
      WHERE i.statut_paiement = 'payé'
      GROUP BY c.id
      ORDER BY inscrits DESC
      LIMIT 5
    `);

    res.json({
      total_etudiants,
      total_enseignants,
      total_admins,
      total_cours,
      etudiants_par_cours,
      top_cours
    });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};
