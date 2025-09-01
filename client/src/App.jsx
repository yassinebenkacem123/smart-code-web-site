import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { Loader } from 'lucide-react';
import useAuthStore from './store/useAuthStore';
import LoginPage from './pages/LoginPage';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import EtudiantPage from './pages/EtudiantPage';
import Home from './pages/Home';
import { ToastContainer } from "react-toastify";
import Navbar from './components/NavBar';
import About from './pages/About';
import Footer from './components/Footer';
import AdminLayout from './components/AdminLayout';
import AdminStatistics from './pages/AdminStatistics';
import AdminProfile from './pages/AdminProfile';
import AdminStudents from './pages/AdminStudents';
import AdminProfessor from './pages/AdminProfessor';
import StudentDetails from './pages/StudentDetails';
import StudentLayout from './components/StudentLayout';
import Admins from './pages/Admins';
import ProfessorLayout from './components/ProfessorLayout';
import ProfessorDetails from './pages/ProfessorDetails';
import AdminPartLayout from './components/AdminPartLayout';
import AdminDetials from './pages/AdminDetials';
import ProfessorMainLayout from './components/ProfessorMainLayout';
import PorfessorStatistics from './pages/PorfessorStatistics';
import ProfessorCourses from './pages/ProfessorCourses';
import ProfessorProfile from './pages/ProfessorProfile';
import ProfessorCoursesLayout from './components/ProfessorCoursesLayout';
import AjoutCours from './pages/AjoutCours';
import AjoutChapitre from './pages/AjoutChapitre';
import CourseDetails from './pages/CourseDetails';
import VoirChapitreContent from './pages/VoirChapitreContent';
import ProfessorTest from './pages/ProfessorTest';
import StudentMainLayout from './components/StudentMainLayout';
import EtudiantCourses from './pages/EtudiantCourses';
import EtudiantProfile from './pages/EtudiantProfile';
import EnrollCouse from './pages/EnrollCouse';
import SuccessPayment from './pages/SuccessPayment';
import ReadCourse from './pages/ReadCourse';
function App() {
  const { isAuthenticated, loading } = useAuthStore();
  const location = useLocation();

  // useEffect(() => {
  //   initAuth(); // Initialize authentication
  // }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-2xl">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }


  return (
    <>
      <div className='bg-black text-white'>
        <ToastContainer />
        {(location.pathname === '/' || 
          location.pathname === '/login' || 
          location.pathname === '/forgot-password' || 
          location.pathname === '/reset-password' || 
          location.pathname === '/about'
        ) ? <Navbar /> : ''}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/voir-chapitre" element={<VoirChapitreContent />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/admin-dashboard" element={<AdminLayout />}>
            <Route path="profile" element={<AdminProfile />} />
            <Route path="students" element={<StudentLayout />} >
              <Route index element={<AdminStudents />} />
              <Route path="details/:studentId" element={<StudentDetails />}/>
            </Route>
            <Route path="professor" element={<ProfessorLayout />}>
              <Route index element={<AdminProfessor />} />
              <Route path="details/:professorId" element={<ProfessorDetails />} />
            </Route>
            <Route path="admins" element={<AdminPartLayout />} >
              <Route index element={<Admins />} />
              <Route path="details/:adminId" element={<AdminDetials />} />
            </Route>
            <Route index element={<AdminStatistics />} />
          </Route>
          <Route path="/enseignant-dashboard" element={<ProfessorMainLayout />}>
            <Route index element={<PorfessorStatistics/>}/>
            <Route path="profile" element={<ProfessorProfile />} />
            <Route path="courses" element={<ProfessorCoursesLayout />} >
              <Route index element={<ProfessorCourses />} />
              <Route path="ajout-cours" element={<AjoutCours />} />
              <Route path="ajout-chapitre" element={<AjoutChapitre />} />
              <Route path="details/:courseId" element={<CourseDetails />} />
            </Route>
            <Route path="ajout-test" element={<ProfessorTest />} />
          </Route>
          <Route path="/about" element={<About />} />
           <Route
            path="/etudiant-dashboard"
            element={<StudentMainLayout />}>
              <Route index element={<EtudiantPage/>}/>
              <Route path="enroll-course/:courseId" element={<EnrollCouse />} />
              <Route path="profile" element={<EtudiantProfile/>}/>
              <Route path="cours" element={<EtudiantCourses/>}/>
              <Route path="read-course" element={<ReadCourse />} />
              <Route path ="paiement-success" element={<SuccessPayment />}/>
            </Route>
        </Routes>
      </div>
      {(location.pathname === '/' || location.pathname === '/about') ? <Footer /> : ''}
    </>
  );
}

export default App;
