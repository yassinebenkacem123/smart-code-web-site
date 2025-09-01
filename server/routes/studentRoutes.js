const studentRouter = require('express').Router();
const studentController = require('../controllers/studentController');
const auth = require('../middlewares/authMiddleware');
const checkRole = require('../middlewares/roleMiddleware');
// get the courses platform and its data :
studentRouter.get('/course/:courseId',auth, checkRole(['etudiant']),studentController.getCourseDetails);
studentRouter.get('/enrolled-courses', auth, checkRole(['etudiant']), studentController.getEnrolledCourses);
studentRouter.get('/profile', auth, checkRole(['etudiant']), studentController.getStudentProfile);
studentRouter.get('/chapter/:coursId', auth, checkRole(['etudiant']), studentController.getChapterDetails);
module.exports = studentRouter;

