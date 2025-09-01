const db = require('../config/db');
// controller to get messages by professor ID
exports.getProfessorStatistics = async (req, res) => {
  const enseignantId = req.params.id;
  try {
    // Query 1: Students per course
    const [statistics] = await db.query(`
      SELECT 
        c.id AS cours_id,
        c.titre,
        COUNT(i.etudiant_id) AS nombre_etudiants
      FROM cours c
      LEFT JOIN inscriptions i ON c.id = i.cours_id
      WHERE c.enseignant_id = ?
      GROUP BY c.id;
    `, [enseignantId]);

    res.status(200).json({
      success: true,
      statistics,

    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ 
      success: false, 
      message: "Erreur serveur." 
    });
  }
}
// controler to get messages by professor ID
exports.getMessagesByProfessorId = async (req, res) => {
  const enseignantId = req.params.id;
  try{
    const [messages] = await db.execute(`
      SELECT
        m.id AS message_id,
        m.texte,
        m.date_envoi,
        e.nom AS etudiant_nom,
        e.email AS etudiant_email
        FROM messages m 
        JOIN etudiants e ON m.etudiant_id = e.id
        WHERE m.enseignant_id = ?
        ORDER BY m.date_envoi DESC;
    `, [enseignantId]);
    res.status(200).json({
      success: true,
      messages
    });

  }catch(err){
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Erreur serveur."
    });

  }
}
// controller to delete message by ID
exports.deleteMessageById = async (req, res)=>{
  const {id} = req.params;
  try{
    const [result] = await db.execute(`
      DELETE FROM messages WHERE id = ?
    `, [id]);
    
    if(result.affectedRows === 0){
      return res.status(404).json({
        success: false,
        message: "Message non trouvé."
      });
    }
    
    res.status(200).json({
      success: true,
      message: "Message supprimé avec succès."
    });
  }catch(err){
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Erreur serveur."
    });
  }
}

// cours data controller :
exports.getCoursesWithChaptersByProfessorId = async (req, res) => {
  const enseignantId = req.user.id;
  try {
    const [courses] = await db.query(`
      SELECT 
        c.*, 
        (SELECT COUNT(*) FROM inscriptions WHERE cours_id = c.id) AS nombre_etudiants
      FROM cours c
      WHERE c.enseignant_id = ?;
    `, [enseignantId]);

    if (courses.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Aucun cours trouvé pour cet enseignant."
      });
    }

    const coursesWithChapitres = await Promise.all(courses.map(async (course) => {
      const [chapitres] = await db.query(`
        SELECT * FROM chapitres WHERE cours_id = ?;
      `, [course.id]);
      return {
        ...course,
        chapitres
      };
    }));

    res.status(200).json({
      success: true,
      data: coursesWithChapitres
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Erreur serveur."
    });
  }
};
// get professor profile by ID
exports.getProfessor = async (req, res)=>{
  const enseignantId = req.user.id;
  try {
    const [professor] = await db.query(`
      SELECT
         id, nom, email, telephone, date_naissance, adress,genre
      FROM enseignants
      WHERE id = ?;`, [enseignantId]);
    if(professor.length === 0){
      return res.status(404).json({
        success:false,
        message: "Enseignant non trouvé."
      });
    }
    res.status(200).json({
      success:true,
      professor: professor[0],
      message:'Professeur récupéré avec succès.'
    })
  }catch(err){
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Erreur serveur."
    });
  }
}