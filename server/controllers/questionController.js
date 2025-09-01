// 📁 controllers/questionController.js
const pool = require('../config/db');

// ✅ Récupérer toutes les questions d’un chapitre (enseignant)
exports.getQuestionsByChapitre = async (req, res) => {
  const chapitre_id = req.params.chapitre_id;
  try {
    const [rows] = await pool.execute(
      `SELECT * FROM questions WHERE chapitre_id = ? ORDER BY id ASC`,
      [chapitre_id]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};

// ✅ Mettre à jour une question (enseignant)
exports.updateQuestion = async (req, res) => {
  const question_id = req.params.id;
  const { texte_question, option_a, option_b, option_c, option_d, bonne_reponse } = req.body;
  try {
    await pool.execute(
      `UPDATE questions SET texte_question = ?, option_a = ?, option_b = ?, option_c = ?, option_d = ?, bonne_reponse = ? WHERE id = ?`,
      [texte_question, option_a, option_b, option_c, option_d, bonne_reponse, question_id]
    );
    res.json({ message: 'Question mise à jour' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};

// ✅ Supprimer une question (enseignant)
exports.deleteQuestion = async (req, res) => {
  const question_id = req.params.id;
  try {
    await pool.execute(`DELETE FROM questions WHERE id = ?`, [question_id]);
    res.json({ message: 'Question supprimée' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};

// ✅ Renvoyer les questions (avec 3 options dont la bonne, aléatoirement)
exports.getQuestionsForTest = async (req, res) => {
  const chapitre_id = req.params.chapitre_id;
  try {
    const [questions] = await pool.execute(`SELECT * FROM questions WHERE chapitre_id = ?`, [chapitre_id]);
   
    res.json(
      {
        success:true,
        questions,
      }
    );
  } catch (err) {
    res.status(500).json({ 
      success:false,
      message: 'Erreur', 
      error: err.message });
  }
};

// ✅ Créer plusieurs questions (enseignant)
exports.ajouterQuestions = async (req, res) => {
  const questions = req.body.questions; // Expect an array of questions
  if (!Array.isArray(questions) || questions.length === 0) {
    return res.status(400).json({ message: 'Veuillez fournir une liste de questions valide.' });
  }

  try {
    const query = `INSERT INTO questions (chapitre_id, texte_question, option_a, option_b, option_c, option_d, bonne_reponse)
                   VALUES (?, ?, ?, ?, ?, ?, ?)`;

    // Insert each question into the database
    for (const question of questions) {
      const { chapitre_id, texte_question, option_a, option_b, option_c, option_d, bonne_reponse } = question;
      await pool.execute(query, [chapitre_id, texte_question, option_a, option_b, option_c, option_d, bonne_reponse]);
    }

    res.status(201).json({ 
      success:true,
      message: 'Questions ajoutées avec succès.' 
    });
  } catch (err) {
    res.status(500).json({ 
      success:false,
      message: 'Erreur serveur', 
      error: err.message });
  }
};
