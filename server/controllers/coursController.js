// 📁 controllers/coursController.js
const pool = require('../config/db');

exports.createCours = async (req, res) => {
  const { titre, description, image_type, image_url, prix } = req.body;
  const enseignant_id = req.user.id;

  let finalImageUrl = image_url;
  if (image_type === 'upload' && req.file) {
    finalImageUrl = `/uploads/${req.file.filename}`;
  }

  try {
    const [result] = await pool.execute(
      `INSERT INTO cours (titre, description, prix, enseignant_id, image_url, image_type)
      VALUES (?, ?, ?, ?, ?, ?)`,
      [titre, description, prix, enseignant_id, finalImageUrl, image_type]
    );

    res.status(201).json({
      success: true,
      message: 'Cours créé',
      coursId: result.insertId, // Return the ID of the newly created course
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Erreur serveur',
      error: err.message,
    });
  }
};

exports.updateCours = async (req, res) => {
  const { titre, description, image_type, image_url, prix } = req.body;
  const idCours = req.params.id;
  const enseignant_id = req.user.id;

  let finalImageUrl = image_url;
  if (image_type === 'upload' && req.file) {
    finalImageUrl = `/uploads/${req.file.filename}`;
  }

  try {
    const [result] = await pool.execute(
      `UPDATE cours SET titre = ?, description = ?, prix = ?, image_url = ?, image_type = ? WHERE id = ? AND enseignant_id = ?`,
      [titre, description, prix, finalImageUrl, image_type, idCours, enseignant_id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Cours non trouvé ou vous n'êtes pas autorisé à le modifier",
      });
    }

    res.status(200).json({
      success: true,
      message: 'Cours mis à jour',
      coursId: idCours, // Return the ID of the updated course
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Erreur serveur',
      error: err.message,
    });
  }
};

exports.deleteCoursById = async (req, res) => {

  try {
   const [result] =  await pool.execute(`DELETE FROM cours WHERE id = ? AND enseignant_id = ?`, [req.params.id, req.user.id]);
   if(result.affectedRows === 0) {
    return res.status(404).json(
      {
        success:false,
        message:'Cours non trouvé ou vous n\'êtes pas autorisé à le supprimer'
      }
    );
   }
    res.status(200).json({
      success:true,
      message:'Cours (et chapitre associés) supprimé avec succès'
    })
  } catch (err) {
    res.status(500).json({
      success:false,
      message: 'Erreur', 
      error: err.message });
  }
};

exports.getCours = async (req, res) => {
  try {
    const [rows] = await pool.execute(`SELECT * FROM cours`);
    res.json(
      {
        success:true,
        message: 'Liste des cours récupérée avec succès',
        cours: rows
      }
    );
  } catch (err) {
    res.status(500).json({ 
      success: false,
      message: 'Erreur serveur', 
      error: err.message });
  }
};

exports.getEtudiantsInscrits = async (req, res) => {
  const cours_id = req.params.cours_id;
  const enseignant_id = req.user.id;

  try {
    // Vérifier que ce cours appartient à l'enseignant connecté
    const [[cours]] = await pool.execute(`SELECT * FROM cours WHERE id = ? AND enseignant_id = ?`, [cours_id, enseignant_id]);
    if (!cours) return res.status(403).json({ message: 'Ce cours ne vous appartient pas' });

    const [etudiants] = await pool.execute(`
      SELECT e.id, e.nom, e.email, i.date_inscription
      FROM inscriptions i
      JOIN etudiants e ON e.id = i.etudiant_id
      WHERE i.cours_id = ? AND i.statut_paiement = 'payé'
    `, [cours_id]);

    res.json(etudiants);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};

exports.getCoursById = async (req, res) => {
  const coursId = req.params.id;

  try {
    // Fetch the course details
    const [rows] = await pool.execute('SELECT * FROM cours WHERE id = ?', [coursId]);
    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Cours non trouvé',
      });
    }

    // Fetch the chapters associated with the course
    const [chapitres] = await pool.execute('SELECT * FROM chapitres WHERE cours_id = ?', [coursId]);

    res.status(200).json({
      success: true,
      cours: {
        ...rows[0],
        chapitres, // Include chapters in the response
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Erreur serveur',
      error: err.message,
    });
  }
};