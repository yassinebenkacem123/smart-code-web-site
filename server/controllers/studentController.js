const db = require('../config/db');

exports.getCourseDetails = async (req, res) => {
  const { courseId } = req.params;
  try {
    const [courseResults] = await db.query(`
      SELECT 
        c.*, 
        e.nom AS enseignant_nom 
      FROM cours c
      JOIN enseignants e ON c.enseignant_id = e.id
      WHERE c.id = ?
    `, [courseId]);

    if (courseResults.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Course not found."
      });
    }

    const course = courseResults[0];

    // 2. Get chapters
    const [chapitres] = await db.query(`
      SELECT id, titre, description, ordre, date_de_creation
      FROM chapitres
      WHERE cours_id = ?
      ORDER BY ordre ASC
    `, [courseId]);

    res.status(200).json({
      success: true,
        message: "Course details retrieved successfully.",
        cours: {
          id: course.id,
          titre: course.titre,
          description: course.description,
          prix: course.prix,
          image_url: course.image_url,
          date_de_creation: course.date_de_creation,
          enseignant: {
            nom: course.enseignant_nom,
            email: course.enseignant_email,
            genre: course.enseignant_genre
          },
          chapitres
        }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Erreur lors de la récupération des détails du cours."
    });
  }
};

// Get enrolled courses for a student width additional data:

exports.getEnrolledCourses = async (req, res) => {
  const studentId = req.user.id;

  try {
    // Étape 1 : récupérer tous les cours dans lesquels l’étudiant est inscrit (via inscriptions)
    const [courses] = await db.execute(`
      SELECT 
        c.id AS cours_id,
        c.titre,
        c.description,
        c.image_url,
        c.prix,
        IFNULL(ec.status, 'en_cours') AS cours_status,
        IFNULL(ec.progression, 0.00) AS progression
      FROM inscriptions i
      JOIN cours c ON c.id = i.cours_id
      LEFT JOIN etudiant_cours ec 
        ON ec.id_cours = c.id AND ec.id_etudiant = i.etudiant_id
      WHERE i.etudiant_id = ? AND i.statut_paiement = 'payé'
    `, [studentId]);

    // Étape 2 : pour chaque cours, récupérer ses chapitres et leur statut
    for (const course of courses) {
      const [chapters] = await db.execute(`
        SELECT 
          ch.id AS chapitre_id,
          ch.titre,
          ch.ordre,
          ch.contenu,
          COALESCE(ech.status, 'non_commence') AS chapitre_status
        FROM chapitres ch
        LEFT JOIN etudiant_chapitre ech 
          ON ch.id = ech.id_chapitre AND ech.id_etudiant = ?
        WHERE ch.cours_id = ?
        ORDER BY ch.ordre ASC
      `, [studentId, course.cours_id]);

      course.chapitres = chapters;
      course.nb_chapitres_non_termines = chapters.filter(c => c.chapitre_status !== 'termine').length;
    }

    return res.status(200).json({
      success: true,
      courses
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des cours inscrits.'
    });
  }
};

exports.getStudentProfile = async (req, res)=>{
  const etudiant_id = req.user.id;
  try{
    const [profile] = await db.execute(
      'SELECT id, nom, email, genre, date_naissance, date_inscription_ecole, telephone, adress FROM etudiants WHERE id = ?',
      [etudiant_id]
    );

    if (profile.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: 'Profil étudiant non trouvé.' 
      });
    }

    res.json({ 
      success: true, 
      profile: profile[0] 
    });
  }catch(err){
    console.error('Error fetching student profile:', err);
    res.status(500).json({ 
      success: false, 
      message: `Erreur lors de la récupération du profil étudiant.${err.message}`, 
      error: err.message 
    });

  }
}

// get chapter data with some details :
exports.getChapterDetails = async (req, res) => {
  try {
    const coursId = req.params.coursId
    const etudiantId = req.user.id; // fourni par authMiddleware

    const [rows] = await db.execute(
      `
      SELECT  c.id AS chapitre_id,
              c.titre,
              c.description,
              c.contenu,
              c.ordre,
              ec.status AS status
      FROM    chapitres AS c
      LEFT JOIN etudiant_chapitre AS ec
             ON ec.id_chapitre = c.id
            AND ec.id_etudiant = ?
      WHERE   c.cours_id = ?
      ORDER BY c.ordre ASC, c.id ASC
      `,
      [etudiantId, coursId]
    );
    return res.status(200).json({
      success:true,
      message: "Chapter details retrieved successfully.",
      chapters: rows,
    });
  } catch (error) {
    console.error('Error fetching chapter details:', error);
    return res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des détails du chapitre.'+ error.message,
      error: error.message
    });
  }
}