// 📁 controllers/messageController.js
const pool = require('../config/db');
const nodemailer = require('nodemailer');
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
    await pool.execute(
      `INSERT INTO messages (etudiant_id, enseignant_id, texte) VALUES (?, ?, ?)`,
      [etudiant_id, enseignant_id, texte]
    );

    // Récupérer email de l’étudiant
    const [[etudiant]] = await pool.execute(
      'SELECT nom, email FROM etudiants WHERE id = ?',
      [etudiant_id]
    );

    // Envoi d’email à l’enseignant
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      }
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: enseignant.email,
      subject: `Message de ${etudiant.nom} `,
        html: `
    <div style="font-family: Arial, sans-serif; color: #333;">
      <p><strong style="color: #2a7ae2;">Message reçu :</strong></p>
      <p style="margin: 10px 0; padding: 10px; background: #f5f5f5; border-left: 4px solid #2a7ae2;">
        ${texte}
      </p>
      <p>
        Pour répondre, contactez l'étudiant à : 
        <a href="mailto:${etudiant.email}" style="color: #2a7ae2;">${etudiant.email}</a>
      </p>
    </div>
  `
    });
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
