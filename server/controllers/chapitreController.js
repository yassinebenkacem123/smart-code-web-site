
// 📁 controllers/chapitreController.js
const pool = require('../config/db');

exports.createChapitre = async (req, res) => {
  let chapitres = req.body;
  // Si un seul chapitre est envoyé, on le convertit en tableau
  if (!Array.isArray(chapitres)) {
    chapitres = [chapitres];
  }

  try {
    const values = chapitres.map(({ cours_id, titre, description, contenu, ordre }) => [
      cours_id,
      titre,
      description,
      contenu,
      ordre,
    ]);

    await pool.query(
      `INSERT INTO chapitres (cours_id, titre, description, contenu, ordre) VALUES ?`,
      [values]
    );

    res.status(201).json({
      success: true,
      message: chapitres.length > 1 ? 'Chapitres créés avec succès.' : 'Chapitre créé avec succès.',
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de l’ajout des chapitres',
      error: err.message,
    });
  }
};


exports.getChapitres = async (req, res) => {
  const { cours_id } = req.params;
  try {
    const [rows] = await pool.execute(`SELECT id, cours_id, titre, description, img_url FROM chapitres WHERE cours_id = ? ORDER BY ordre ASC`, [cours_id]);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Erreur', error: err.message });
  }
};

exports.getChapitreAvecCondition = async (req, res) => {
  const chapitre_id = req.params.chapitre_id;

  try {
    const [rows] = await pool.execute(
      'SELECT id, cours_id, titre, description, img_url, contenu FROM chapitres WHERE id = ?',
      [chapitre_id]
    );

    if (!rows.length) return res.status(404).json({ message: 'Chapitre non trouvé' });

    const chapitre = rows[0];

    if (!req.paiementEffectue) {
      delete chapitre.contenu;
    }

    res.json(chapitre);
  } catch (err) {
    res.status(500).json({ message: 'Erreur', error: err.message });
  }
};

// delete chapitre :
exports.deleteChapitre = async (req, res)=>{
  const chapitreId = req.params.chapitre_id;
  try{
    const [result] = await pool.execute('DELETE FROM chapitres WHERE id = ?', [chapitreId]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ 
        success:false,
        message: 'Chapitre non trouvé' 
      });
    }
    res.json({ 
      success:true,
      message: 'Chapitre supprimé avec succès' 
    });
  }catch(err){
    console.error(err);
    res.status(500).json({ 
      success:false,
      message: 'Erreur lors de la suppression du chapitre',
      error: err.message 
    });
  }
  
}
// delete all chapters of a course
exports.deleteAllChaptres = async (req, res)=>{
  const coursId = req.body.cours_id;
  if (!coursId) {
    return res.status(400).json({ 
      success:false,
      message: 'ID du cours est requis' 
    });
  }
  
  try{
    const [result] = await pool.execute('DELETE FROM chapitres WHERE cours_id = ?', [coursId]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ 
        success:false,
        message: 'Aucun chapitre trouvé pour ce cours' 
      });
    }
    res.json({ 
      success:true,
      message: 'Tous les chapitres du cours ont été supprimés avec succès' 
    });

  }catch(err){
    console.error(err);
    res.status(500).json({ 
      success:false,
      message: 'Erreur lors de la suppression des chapitres',
      error: err.message 
    });

  }
}
