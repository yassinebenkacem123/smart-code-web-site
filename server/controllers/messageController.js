// 📁 controllers/messageController.js
const pool = require('../config/db');
exports.envoyerMessage = async (req, res) => {
  const { enseignant_id, texte } = req.body;
  const etudiant_id = req.user.id;

  try {
    // Récupérer email de l’enseignant
    const [[enseignant]] = await pool.execute(
      'SELECT email FROM enseignants WHERE id = ?',
      [enseignant_id]
    );
    if (!enseignant) return res.status(404).json({ message: 'Enseignant non trouvé' });

    // Sauvegarder le message dans la base
    const [result] = await pool.execute(
      `INSERT INTO messages (etudiant_id, enseignant_id, texte) VALUES (?, ?, ?)`,
      [etudiant_id, enseignant_id, texte]
    );
    if (result.affectedRows === 0) {
      return res.status(500).json({ message: 'Échec de l\'envoi du message' });
    }
    
    res.status(201).json({ 
      success:true,
      message: 'Message envoyé avec succès' });
  } catch (err) {
    res.status(500).json({ 
      succes:false,
      message: 'Erreur serveur:' + err.messsage, error: err.message 
    });
  }
};
