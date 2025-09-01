// 📁 controllers/authController.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const pool = require('../config/db');
const nodemailer = require('nodemailer');
require('dotenv').config();

const TABLES = {
  etudiant: 'etudiants',
  enseignant: 'enseignants',
  admin: 'admins',
};

// Login
exports.login = async (req, res) => {
  const { email, mot_de_passe, role } = req.body;
  const table = TABLES[role];
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/;

if (!emailRegex.test(email)) {
  return res.status(400).json({ 
    success: false,
    message: 'Format email invalide' 
  });
}
if (!passwordRegex.test(mot_de_passe)) {
  return res.status(400).json({
    success: false,
    message: 'Mot de passe invalide : au moins 8 caractères avec lettres et chiffres'
  });
}

  if (!table) return res.status(400).json({ 
    success:false,
    message: 'Rôle invalide' 
  });

  try {
    const [rows] = await pool.execute(`SELECT * FROM ${table} WHERE email = ?`, [email]);
    const user = rows[0];
    if (!user) return res.status(401).json({ 
      success:false,
      message: 'Utilisateur non trouvé' 
    });

    const isMatch = await bcrypt.compare(mot_de_passe, user.mot_de_passe);
    if (!isMatch) return res.status(401).json({
      success:false, 
      message: 'Mot de passe incorrect' 
    });

    const token = jwt.sign({ id: user.id, email:user.email,user_name:user.nom, role }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION });
    res.json({
    success:true,
    message:" Connexion réussie",
    token });
  } catch (err) {
    res.status(500).json({ 
    success:false,
    message: 'Erreur serveur', 
    error: err.message });
  }
};

// Mot de passe oublié
exports.forgotPassword = async (req, res) => {
  const { email, role } = req.body;
  const table = TABLES[role];
  if (!table) return res.status(400).json({ message: 'Rôle invalide' });

  try {
    const [rows] = await pool.execute(`SELECT * FROM ${table} WHERE email = ?`, [email]);
    const user = rows[0];
    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });

    const token = uuidv4();
    const expires = new Date(Date.now() + 3600 * 1000); // 1h
    await pool.execute(`INSERT INTO password_reset_tokens (user_id, token, expires_at) VALUES (?, ?, ?)`, [user.id, token, expires]);

    const resetLink = `${process.env.FRONT_URL}/reset-password?token=${token}&role=${role}`;

    // Envoi email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      }
    });

    await transporter.sendMail({
      to: email,
      subject: 'Réinitialisation de mot de passe',
      html: `<p>Cliquez ici pour réinitialiser votre mot de passe : <a href="${resetLink}">${resetLink}</a></p>`
    });

    res.json({ message: 'E-mail envoyé' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur', error: err.message });
  }
};

// Réinitialisation mot de passe
exports.resetPassword = async (req, res) => {
  const { token, nouveau_mdp, role } = req.body;
  const TABLES = {
    etudiant: 'etudiants',
    enseignant: 'enseignants',
    admin: 'admins',
  };
  const table = TABLES[role];
  if (!table) return res.status(400).json({ message: 'Rôle invalide' });

  // Validation du mot de passe
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/;
  if (!passwordRegex.test(nouveau_mdp)) {
    return res.status(400).json({
      message: 'Mot de passe invalide : au moins 8 caractères avec lettres et chiffres'
    });
  }

  try {
    const [rows] = await pool.execute(
      `SELECT * FROM password_reset_tokens WHERE token = ? AND expires_at > NOW()`,
      [token]
    );

    const record = rows[0];
    if (!record) return res.status(400).json({ message: 'Token invalide ou expiré' });

    const hashed = await bcrypt.hash(nouveau_mdp, 10);
    await pool.execute(
      `UPDATE ${table} SET mot_de_passe = ? WHERE id = ?`,
      [hashed, record.user_id]
    );

    await pool.execute(`DELETE FROM password_reset_tokens WHERE token = ?`, [token]);

    res.json({ message: 'Mot de passe réinitialisé avec succès' });

  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};

exports.checkAuth = async (req, res) => {
  const { id, role } = req.user;
  const table = TABLES[role];
  if (!table) return res.status(400).json({ message: 'Rôle invalide' });

  try {
    const [rows] = await pool.execute(`SELECT * FROM ${table} WHERE id = ?, [id]`);
    const user = rows[0];
    if (!user) return res.status(404).json({ message: 'Utilisateur introuvable' });

    res.json({ user: { ...user, role } });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};