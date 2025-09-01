import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaChevronLeft, FaEnvelope, FaPhone, FaMapMarkerAlt, FaBirthdayCake, FaCalendarAlt, FaBook } from 'react-icons/fa';
import { IoMdMale, IoMdFemale } from "react-icons/io";
import useAdminStore from '../store/useAdminData';
import EditStudentForm from '../components/EditStudentForm';

const StudentDetails = () => {
  const { studentId } = useParams();
  const { getStudentCoursesStats, getStudentById,student } = useAdminStore();
  
  const [paidCourses, setPaidCourses] = useState([]);
  const [unpaidCourses, setUnpaidCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openEditForm, setOpenEditForm] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch student details
        getStudentById(studentId);
        // Fetch course stats
        const stats = await getStudentCoursesStats(studentId);
        if (stats) {
          setPaidCourses(stats.purchasedCourses || []);
          setUnpaidCourses(stats.notPurchasedCourses || []);
        }
      } catch (err) {
        setError("Erreur lors du chargement des données de l'étudiant");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [studentId, getStudentCoursesStats, getStudentById]);

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'Non spécifié';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR');
  };

  if (loading) {
    return (
      <div className='p-4 md:p-6 lg:p-8 w-full bg-gradient-to-br from-[#0f172a] to-[#1e293b] min-h-screen flex items-center justify-center'>
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-sky-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='p-4 md:p6 lg:p-8 w-full bg-gradient-to-br from-[#0f172a] to-[#1e293b] min-h-screen flex flex-col items-center justify-center'>
        <div className="text-red-500 bg-red-900/30 p-4 rounded-lg text-center">
          {error}
        </div>
        <button 
          onClick={() => window.location.reload()}
          className="mt-4 bg-sky-700/50 hover:bg-sky-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          Réessayer
        </button>
      </div>
    );
  }

  if (!student) {
    return (
      <div className='p-4 md:p6 lg:p-8 w-full bg-gradient-to-br from-[#0f172a] to-[#1e293b] min-h-screen flex items-center justify-center'>
        <div className="text-sky-300 bg-sky-900/30 p-4 rounded-lg inline-block">
          Aucun étudiant trouvé avec cet ID
        </div>
      </div>
    );
  }

  const totalCourses = paidCourses.length + unpaidCourses.length;

  return (
  <>  
    <div className='p-4 md:p-6 lg:p-8 w-full bg-gradient-to-br from-[#0f172a] to-[#1e293b] min-h-screen overflow-y-auto'>
      <div className='flex items-center mb-6'>
        <button 
          onClick={() => window.history.back()} 
          className="flex cursor-pointer items-center text-sky-300 hover:text-sky-200 mr-4 transition-colors"
        >
          <FaChevronLeft className="mr-1" /> Retour
        </button>
        <h1 className='font-bold text-2xl md:text-3xl text-white'>Détails de l'Étudiant</h1>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8'>
        {/* Student Profile Card */}
        <div className='bg-gradient-to-br from-sky-900/30 to-blue-900/30 backdrop-blur-sm border border-sky-500/30 rounded-xl shadow-lg shadow-sky-900/30 p-6 lg:col-span-1'>
          <div className='flex flex-col items-center mb-6'>
            <div className={`${student.genre === 'Homme' ? 'bg-sky-900/30 border border-sky-500/30' : 'bg-fuchsia-900/30 border border-fuchsia-500/30'} rounded-full p-4 mb-4`}>
              {student.genre === 'Homme' ? 
                <IoMdMale className='text-sky-400 text-4xl' /> : 
                <IoMdFemale className='text-fuchsia-500 text-4xl' />
              }
            </div>
            <h2 className='text-xl font-bold text-white text-center'>{student.nom} {student.prenom}</h2>
            <p className='text-sky-300'>ID: {student.id}</p>
          </div>

          <div className='space-y-4'>
            <div className='flex items-center'>
              <div className='bg-sky-800/30 p-2 rounded-lg mr-3'>
                <FaEnvelope className='text-sky-400' />
              </div>
              <div>
                <p className='text-sm text-sky-300'>Email</p>
                <p className='text-white'>{student.email}</p>
              </div>
            </div>

            <div className='flex items-center'>
              <div className='bg-sky-800/30 p-2 rounded-lg mr-3'>
                <FaPhone className='text-sky-400' />
              </div>
              <div>
                <p className='text-sm text-sky-300'>Téléphone</p>
                <p className='text-white'>{student.telephone || 'Non renseigné'}</p>
              </div>
            </div>

            <div className='flex items-center'>
              <div className='bg-sky-800/30 p-2 rounded-lg mr-3'>
                <FaMapMarkerAlt className='text-sky-400' />
              </div>
              <div>
                <p className='text-sm text-sky-300'>Adresse</p>
                <p className='text-white'>{student.adress || 'Non renseignée'}</p>
              </div>
            </div>

            <div className='flex items-center'>
              <div className='bg-sky-800/30 p-2 rounded-lg mr-3'>
                <FaBirthdayCake className='text-sky-400' />
              </div>
              <div>
                <p className='text-sm text-sky-300'>Date de naissance</p>
                <p className='text-white'>{formatDate(student.date_naissance)}</p>
              </div>
            </div>

            <div className='flex items-center'>
              <div className='bg-sky-800/30 p-2 rounded-lg mr-3'>
                <FaCalendarAlt className='text-sky-400' />
              </div>
              <div>
                <p className='text-sm text-sky-300'>Date d'inscription</p>
                <p className='text-white'>{formatDate(student.date_inscription_ecole)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Courses Section */}
        <div className='bg-gradient-to-br h-full overflow-y-auto from-sky-900/30 to-blue-900/30 backdrop-blur-sm border border-sky-500/30 rounded-xl shadow-lg shadow-sky-900/30 p-6 lg:col-span-2'>
          <div className='flex justify-between items-center mb-6'>
            <h2 className='text-xl font-bold text-white flex items-center'>
              <FaBook className='mr-2 text-sky-400' /> Cours de l'Étudiant
            </h2>
            <div className='bg-sky-800/30 px-3 py-1 rounded-lg text-sky-300'>
              Total: {totalCourses} cours
            </div>
          </div>
          
          {/* Paid Courses */}
          <div className='mb-8'>
            <div className='flex justify-between items-center mb-4'>
              <h3 className='text-lg font-semibold text-emerald-300'>Cours Payés</h3>
              <span className='bg-emerald-900/30 text-emerald-300 px-3 py-1 rounded-lg text-sm'>
                {paidCourses.length} cours
              </span>
            </div>
            
            {paidCourses.length > 0 ? (
              <div className='overflow-x-auto'>
                <table className='min-w-full'>
                  <thead className='bg-sky-800/50'>
                    <tr>
                      <th className='px-6 py-3 text-left text-xs font-medium text-sky-300 uppercase tracking-wider'>Nom du Cours</th>
                      <th className='px-6 py-3 text-left text-xs font-medium text-sky-300 uppercase tracking-wider'>Date d'inscription</th>
                      <th className='px-6 py-3 text-center text-xs font-medium text-sky-300 uppercase tracking-wider'>Status</th>
                    </tr>
                  </thead>
                  <tbody className='divide-y divide-sky-500/20'>
                    {paidCourses.map((course) => (
                      <tr key={course.id} className='hover:bg-sky-800/20 transition-colors'>
                        <td className='px-6 py-4 whitespace-nowrap text-sm text-white'>{course.titre}</td>
                        <td className='px-6 py-4 whitespace-nowrap text-sm text-sky-300'>{formatDate(course.date_inscription)}</td>
                        <td className='px-6 py-4 whitespace-nowrap text-sm text-center'>
                          <span className='px-3 py-1 rounded-full text-xs font-medium bg-emerald-900/30 text-emerald-300'>
                            payé
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className='text-center py-4'>
                <div className='text-sky-300 bg-sky-900/30 p-3 rounded-lg inline-block'>
                  Aucun cours payé trouvé
                </div>
              </div>
            )}
          </div>

          {/* Unpaid Courses */}
          <div>
            <div className='flex justify-between items-center mb-4'>
              <h3 className='text-lg font-semibold text-amber-300'>Cours Non Payés</h3>
              <span className='bg-amber-900/30 text-amber-300 px-3 py-1 rounded-lg text-sm'>
                {unpaidCourses.length} cours
              </span>
            </div>
            
            {unpaidCourses.length > 0 ? (
              <div className='overflow-x-auto'>
                <table className='min-w-full'>
                  <thead className='bg-sky-800/50'>
                    <tr>
                      <th className='px-6 py-3 text-left text-xs font-medium text-sky-300 uppercase tracking-wider'>Nom du Cours</th>
                      <th className='px-6 py-3 text-center text-xs font-medium text-sky-300 uppercase tracking-wider'>Status</th>
                    </tr>
                  </thead>
                  <tbody className='divide-y divide-sky-500/20'>
                    {unpaidCourses.map((course) => (
                      <tr key={course.id} className='hover:bg-sky-800/20 transition-colors'>
                        <td className='px-6 py-4 whitespace-nowrap text-sm text-white'>{course.titre}</td>
                        <td className='px-6 py-4 whitespace-nowrap text-sm text-center'>
                          <span className='px-3 py-1 rounded-full text-xs font-medium bg-amber-900/30 text-amber-300'>
                            non payé
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className='text-center py-4'>
                <div className='text-sky-300 bg-sky-900/30 p-3 rounded-lg inline-block'>
                  Tous les cours sont payés
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className='flex justify-end gap-3'>
        <button className='bg-sky-700/50 cursor-pointer hover:bg-sky-700 text-white px-5 py-2 rounded-lg transition-colors'>
          Envoyer un message
        </button>
        <button 
        onClick={()=>{
          setOpenEditForm(true)
        }}
        className='bg-amber-700/50 cursor-pointer hover:bg-amber-700 text-white px-5 py-2 rounded-lg transition-colors'>
          Modifier le profil
        </button>
      </div>
    </div>
    {openEditForm && <EditStudentForm
       studentData={student}
       setOpenEditForm={setOpenEditForm}
    />}
  </>  
  );
};

export default StudentDetails;