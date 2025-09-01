// 📁 routes/reponseRoutes.js
const express = require('express');
const router = express.Router();
const reponseController = require('../controllers/reponseController');
const auth = require('../middlewares/authMiddleware');
const checkRole = require('../middlewares/roleMiddleware');

// ✅ Étudiant : soumettre toutes les réponses d’un chapitre
router.post('/chapitre/:chapitre_id', auth, checkRole(['etudiant']), reponseController.soumettreReponsesChapitre);

// ✅ Étudiant : soumettre une seule réponse (facultatif)
router.post('/unique', auth, checkRole(['etudiant']), reponseController.soumettreReponseUnique);

module.exports = router;