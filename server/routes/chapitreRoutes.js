
// 📁 routes/chapitreRoutes.js
const express = require('express');
const router = express.Router();
const chapitreController = require('../controllers/chapitreController');
const auth = require('../middlewares/authMiddleware');
const checkRole = require('../middlewares/roleMiddleware');
const verifierInscription = require('../middlewares/verifierInscription');

router.post('/', auth, checkRole(['enseignant']), chapitreController.createChapitre);
router.get('/cours/:cours_id', chapitreController.getChapitres);
router.get(
  '/:chapitre_id',
  auth,
  checkRole(['etudiant']),
  verifierInscription, // middleware de vérification
  chapitreController.getChapitreAvecCondition // controller
);
router.delete(
  '/:chapitre_id',
  auth,
  checkRole(['enseignant']),
  chapitreController.deleteChapitre
);
router.delete('/', auth, checkRole(['enseignant']), chapitreController.deleteAllChaptres);



module.exports = router;
