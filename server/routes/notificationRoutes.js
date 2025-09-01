// 📁 routes/notificationRoutes.js
const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');
const auth = require('../middlewares/authMiddleware');
const checkRole = require('../middlewares/roleMiddleware');

// ✅ Ajouter une notification à un étudiant spécifique ou globale (admin seulement)
router.post('/', auth, checkRole(['enseignant']), notificationController.ajouterNotification);

// ✅ Obtenir les notifications visibles par un étudiant connecté
router.get('/', auth, checkRole(['etudiant']), notificationController.getNotifications);

module.exports = router;