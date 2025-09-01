const express = require('express');
const router = express.Router();
const progressionController = require('../controllers/progressionController');
const auth = require('../middlewares/authMiddleware');
const checkRole = require('../middlewares/roleMiddleware');

// ✅ Marquer un chapitre comme terminé
router.post(
  '/chapitres/:chapitre_id/terminer',
  auth,
  checkRole(['etudiant']),
  progressionController.terminerChapitre
);

// ✅ Voir la progression globale de tous les cours
router.get(
  '/cours',
  auth,
  checkRole(['etudiant']),
  progressionController.getProgressionGlobale
);

// ✅ Voir les chapitres d’un cours avec leur statut
router.get(
  '/cours/:cours_id/chapitres',
  auth,
  checkRole(['etudiant']),
  progressionController.getChapitresAvecStatut
);

module.exports = router;
