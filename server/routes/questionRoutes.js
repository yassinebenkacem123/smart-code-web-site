// 📁 routes/questionRoutes.js
const express = require('express');
const router = express.Router();
const questionController = require('../controllers/questionController');
const auth = require('../middlewares/authMiddleware');
const checkRole = require('../middlewares/roleMiddleware');

// 👨‍🏫 Enseignant - CRUD des questions
router.post('/', auth, checkRole(['enseignant']), questionController.ajouterQuestions);
router.get('/by-chapitre/:chapitre_id', auth, checkRole(['enseignant']), questionController.getQuestionsByChapitre);
router.put('/:id', auth, checkRole(['enseignant']), questionController.updateQuestion);
router.delete('/:id', auth, checkRole(['enseignant']), questionController.deleteQuestion);

// 👨‍🎓 Étudiant - récupérer les questions (test avec 3 options aléatoires)
router.get('/:chapitre_id', auth, checkRole(['etudiant']), questionController.getQuestionsForTest);
module.exports = router;
