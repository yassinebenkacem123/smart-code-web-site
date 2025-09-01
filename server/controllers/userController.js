// 📁 controllers/userController.js
const pool = require('../config/db');
const bcrypt = require('bcryptjs');

// Utilitaire pour choisir la bonne table
const TABLES = {
  etudiant: 'etudiants',
  enseignant: 'enseignants',
  admin: 'admins',
};

// 🔄 CRUD Générique
exports.getAll = (role) => async (req, res) => {
  try {
    const [rows] = await pool.execute(`SELECT * FROM ${TABLES[role]}`);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};

exports.getOne = (role) => async (req, res) => {
  try {
    const [rows] = await pool.execute(`SELECT * FROM ${TABLES[role]} WHERE id = ?`, [req.params.id]);
    if (!rows.length) return res.status(404).json({ message: 'Utilisateur non trouvé' });
    res.json(
      {
        success: true,
        message: `${role} trouvé`,
        user: rows[0], 
      });
  } catch (err) {
    res.status(500).json({ 
      success:false,
      message: 'Erreur serveur', 
      error: err.message });
  }
};

exports.create = (role) => async (req, res) => {
  try {
    // Extract common fields
    const { nom, email, mot_de_passe, date_naissance, adress, telephone, genre } = req.body;

    // Validate input
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/;
    const telephoneRegex = /^(\+?\d{1,3}[- ]?)?\d{10}$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Format email invalide',
      });
    }

    if (!passwordRegex.test(mot_de_passe)) {
      return res.status(400).json({
        success: false,
        message: 'Mot de passe invalide : au moins 8 caractères avec lettres et chiffres',
      });
    }

    if (!telephoneRegex.test(telephone)) {
      return res.status(400).json({
        success: false,
        message: 'Format téléphone invalide',
      });
    }

    // Hash the password
    const hash = await bcrypt.hash(mot_de_passe, 10);

    // Prepare dynamic fields based on role
    let query, params;
    if (role === 'etudiant') {
      const { date_inscription_ecole } = req.body; // Specific to students
      query = `INSERT INTO ${TABLES[role]} (nom, email, mot_de_passe, date_inscription_ecole, genre, telephone, date_naissance, adress) VALUES (?,?,?,?,?,?,?,?)`;
      params = [nom, email, hash, date_inscription_ecole, genre, telephone, date_naissance, adress];
    } else if (role === 'enseignant' || role === 'admin') {
      query = `INSERT INTO ${TABLES[role]} (nom, email, mot_de_passe, date_naissance, genre, telephone, adress) VALUES (?,?,?,?,?,?,?)`;
      params = [nom, email, hash, date_naissance, genre, telephone, adress];
    } else {
      return res.status(400).json({
        success: false,
        message: 'Rôle invalide',
      });
    }

    // Execute the query
    const [result] = await pool.execute(query, params);

    // Fetch the newly created user using the inserted ID
    const [rows] = await pool.execute(
      `SELECT * FROM ${TABLES[role]} WHERE id = ?`,
      [result.insertId]
    );

    res.status(201).json({
      success: true,
      message: `${role} a été créé avec succès`,
      user: rows[0], // Return the newly created user
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Erreur serveur',
      error: err.message,
    });
  }
};

exports.update = (role) => async (req, res) => {
  try {
    // Extract common fields
    const { nom, email, date_naissance, genre, adress, mot_de_passe, telephone } = req.body;

    console.log('Request Body:', req.body);
    console.log('Role:', role);
    console.log('ID:', req.params.id);

    // Hash the password if provided
    let hashedPassword = mot_de_passe;
    if (mot_de_passe) {
      hashedPassword = await bcrypt.hash(mot_de_passe, 10);
    }

    // Prepare dynamic fields based on role
    let query, params;
    if (role === 'etudiant') {
      const { date_inscription_ecole } = req.body; // Specific to students
      query = `UPDATE ${TABLES[role]} SET nom = ?, email = ?, date_naissance = ?, mot_de_passe = ?, date_inscription_ecole = ?, genre = ?, adress = ?, telephone = ? WHERE id = ?`;
      params = [nom, email, date_naissance, hashedPassword, date_inscription_ecole, genre, adress, telephone, req.params.id];
    } else if (role === 'enseignant' || role === 'admin') {
      query = `UPDATE ${TABLES[role]} SET nom = ?, email = ?, date_naissance = ?, mot_de_passe = ?, genre = ?, adress = ?, telephone = ? WHERE id = ?`;
      params = [nom, email, date_naissance, hashedPassword, genre, adress, telephone, req.params.id];
    } else {
      return res.status(400).json({
        success: false,
        message: 'Rôle invalide',
      });
    }

    // Execute the update query
    try {
      await pool.execute(query, params);
    } catch (dbError) {
      console.error('Database Error:', dbError.message);
      throw dbError;
    }

    // Fetch the updated user data
    const [rows] = await pool.execute(
      `SELECT * FROM ${TABLES[role]} WHERE id = ?`,
      [req.params.id]
    );

    if (!rows.length) {
      return res.status(404).json({
        success: false,
        message: 'Utilisateur non trouvé après la mise à jour',
      });
    }

    res.json({
      success: true,
      message: `${role} mis à jour avec succès`,
      user: rows[0], // Return the updated user data
    });
  } catch (err) {
    console.error('Error:', err.message);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur',
      error: err.message,
    });
  }
};

exports.remove = (role) => async (req, res) => {
  try {
    await pool.execute(`DELETE FROM ${TABLES[role]} WHERE id = ?`, [req.params.id]);
    res.json({ 
      success: true,
      message: 'Utilisateur supprimé' });
  } catch (err) {
    res.status(500).json({ 
      success:false,
      message: 'Erreur serveur', 
      error: err.message });
  }
};
// 📚 Obtenir les cours d'un étudiant :
exports.getStudentCoursesStatus = async (req, res) => {
  const etudiantId = req.params.id;
  try {
    // Courses the student has purchased
    const [purchased] = await pool.execute(
      `SELECT c.id, c.titre, i.date_inscription, i.statut_paiement
       FROM inscriptions i
       JOIN cours c ON i.cours_id = c.id
       WHERE i.etudiant_id = ? AND i.statut_paiement = 'payé'`,
      [etudiantId]
    );

    // Courses the student has NOT purchased
    const [notPurchased] = await pool.execute(
      `SELECT c.id, c.titre
       FROM cours c
       WHERE c.id NOT IN (
         SELECT cours_id FROM inscriptions WHERE etudiant_id = ? AND statut_paiement = 'payé'
       )`,
      [etudiantId]
    );

    res.json({
      purchasedCourses: purchased,
      notPurchasedCourses: notPurchased,
      totalPurchased: purchased.length,
      totalNotPurchased: notPurchased.length,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ 
      success:false,
      message: 'Erreur serveur', 
      error: err.message });
  }
};

// 📚 Obtenir les cours d'un enseignant :
exports.getTeacherCourses = async (req, res) => {
  try{
    const enseignantId = req.params.id;
    const [rows] = await pool.execute(
      `SELECT c.id, c.titre, c.date_de_creation, c.prix
       FROM cours c
       JOIN enseignants e ON c.enseignant_id = e.id
       WHERE e.id = ?`,
      [enseignantId]
    );
    if(rows.length === 0){
      return res.status(404).json({
        success: false,
        message: 'Aucun cours trouvé pour cet enseignant'
      })
    }
    res.json({
      success: true,
      message: 'Cours de l\'enseignant récupérés',
      courses: rows
    });
  }catch(err){
    res.status(500).json({
      success: false,
      message: 'Erreur serveur',
      error: err.message
    });

  }
}