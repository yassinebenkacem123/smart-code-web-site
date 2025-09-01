const express = require('express');
const router = express.Router();
const adminStatsController = require('../controllers/adminStatsController');
const auth = require('../middlewares/authMiddleware');
const checkRole = require('../middlewares/roleMiddleware');

// ✅ Route protégée pour admin uniquement
router.get('/statistics', auth, checkRole(['admin']), adminStatsController.getStatistics);

module.exports = router;
