// middlewares/verifierInscription.js
const pool = require('../config/db');

module.exports = async (req, res, next) => {
  const etudiant_id = req.user.id;
  const chapitre_id = req.params.chapitre_id;

  try {
    const [chapitreRows] = await pool.execute(
      'SELECT cours_id FROM chapitres WHERE id = ?',
      [chapitre_id]
    );

    if (!chapitreRows.length) return res.status(404).json({ message: 'Chapitre introuvable' });

    const cours_id = chapitreRows[0].cours_id;

    const [inscriptionRows] = await pool.execute(
      'SELECT * FROM inscriptions WHERE etudiant_id = ? AND cours_id = ? AND statut_paiement = "payé"',
      [etudiant_id, cours_id]
    );

    req.paiementEffectue = inscriptionRows.length > 0;
    next();
  } catch (err) {
    res.status(500).json({ message: 'Erreur de vérification', error: err.message });
  }
};
