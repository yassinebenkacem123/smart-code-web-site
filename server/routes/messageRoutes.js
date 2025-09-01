// 📁 routes/messageRoutes.js
const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');
const auth = require('../middlewares/authMiddleware');
const checkRole = require('../middlewares/roleMiddleware');

// ✅ Étudiant envoie un message à un enseignant
router.post('/', auth, checkRole(['etudiant']), messageController.envoyerMessage);

module.exports = router;
