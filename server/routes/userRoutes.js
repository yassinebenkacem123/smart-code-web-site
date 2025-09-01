const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middlewares/authMiddleware');
const checkRole = require('../middlewares/roleMiddleware');

// Étudiants : admin uniquement
router.get('/etudiants', auth, checkRole(['admin']), userController.getAll('etudiant'));
router.get('/etudiants/:id', auth, checkRole(['admin']), userController.getOne('etudiant'));
router.post('/etudiants', auth, checkRole(['admin']), userController.create('etudiant'));
router.put('/etudiants/:id', auth, checkRole(['admin']), userController.update('etudiant'));
router.delete('/etudiants/:id', auth, checkRole(['admin']), userController.remove('etudiant'));
router.get('/etudiants/:id/cours', auth, checkRole(['admin']), userController.getStudentCoursesStatus)
// Enseignants : admin uniquement
router.get('/enseignants', auth, checkRole(['admin']), userController.getAll('enseignant'));
router.get('/enseignants/:id', auth, checkRole(['admin']), userController.getOne('enseignant'));
router.post('/enseignants', auth, checkRole(['admin']), userController.create('enseignant'));
router.put('/enseignants/:id', auth, checkRole(['admin']), userController.update('enseignant'));
router.delete('/enseignants/:id', auth, checkRole(['admin']), userController.remove('enseignant'));
router.get('/enseignants/:id/cours', auth, checkRole(['admin']), userController.getTeacherCourses);
// Admins : superadmin uniquement
router.get('/admins', auth, checkRole(['admin']), userController.getAll('admin'));
router.get('/admins/:id', auth, checkRole(['admin']), userController.getOne('admin'));
router.post('/admins', auth, checkRole(['admin']), userController.create('admin'));
router.put('/admins/:id', auth, checkRole(['admin']), userController.update('admin'));
router.delete('/admins/:id', auth, checkRole(['admin']), userController.remove('admin'));

module.exports = router;
