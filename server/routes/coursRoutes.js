const express = require('express');
const router = express.Router();
const coursController = require('../controllers/coursController');
const auth = require('../middlewares/authMiddleware');
const checkRole = require('../middlewares/roleMiddleware');
const upload = require('../middlewares/upload');


router.post('/', auth, checkRole(['enseignant']),
upload.single('imageFile'),
coursController.createCours);

router.put('/:id', auth, checkRole(['enseignant']), 
upload.single('imageFile'),
coursController.updateCours);

router.delete('/:id', auth, checkRole(['enseignant']), coursController.deleteCoursById);

router.get('/', coursController.getCours); // accessible à tous
router.get('/:id', coursController.getCoursById); // accessible à tous

module.exports = router;