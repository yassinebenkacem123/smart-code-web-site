const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const professorController = require('../controllers/professorControllers');
const checkRole = require('../middlewares/roleMiddleware');
router.get('/:id/statistics/',auth, checkRole(['enseignant']),professorController.getProfessorStatistics);
router.get('/:id/messages', auth, checkRole(['enseignant']), professorController.getMessagesByProfessorId);
router.delete('/messages/:id', auth, checkRole(['enseignant']), professorController.deleteMessageById);
router.get('/cours-avec-chpitre', auth, checkRole(['enseignant']), professorController.getCoursesWithChaptersByProfessorId);
router.get('/', auth, checkRole(['enseignant']), professorController.getProfessor);

// export default router;
module.exports = router;