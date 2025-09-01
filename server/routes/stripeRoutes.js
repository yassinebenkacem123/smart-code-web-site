//📁 Routes Stripe
const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const checkRole = require('../middlewares/roleMiddleware');
const stripeController = require('../controllers/stripeController');

router.post('/create-checkout-session', auth, checkRole(['etudiant']), stripeController.createCheckoutSession);
router.post('/confirmer-paiement', auth, checkRole(['etudiant']), stripeController.confirmerPaiementEtInscription);

module.exports = router;
