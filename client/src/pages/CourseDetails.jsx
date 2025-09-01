import React, { useEffect } from 'react';
import { BsThreeDots, BsPlus } from "react-icons/bs";
import { FaEye, FaTrash, FaCalendarAlt, FaMoneyBillWave, FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import useProfessorStore from '../store/useProfessorStore'; 
import CoursDescriptionCard from '../components/CoursDescriptionCard';
import { useParams } from 'react-router-dom';
import Loading from '../components/Loading';
const CourseDetails = () => {
  const {courseId} = useParams();
  const [openChapitreMenu, setOpenChapitreMenu] = React.useState(false);
  const [openCoursMenu, setOpenCoursMenu] = React.useState(false);
  const [openDescription, setOpenDescription] = React.useState(false);
  const navigate = useNavigate();
  const {deleteChaptre, deleteAllChaptres,editCours,error,loading, fetchCoursById,course, setEditCours} = useProfessorStore();
  useEffect(()=>{
    fetchCoursById(courseId);
  },[courseId, fetchCoursById]);
  if(loading || !course) {
    return <Loading>Chargement des données...</Loading>
  }
  return (
    <div className="p-6 overflow-y-auto w-full h-screen bg-gradient-to-br from-sky-900/20 to-blue-900/20 ">
      <button 
        onClick={() => window.history.back()} 
        className="flex items-center gap-2 px-4 py-2 bg-sky-800/50 text-sky-200 rounded-lg hover:bg-sky-700/50 transition-colors mb-6 shadow-md"
      >
        <FaArrowLeft /> Retour
      </button>
      
      <div className='bg-sky-900/20 p-6 rounded-2xl border border-sky-500/30 shadow-xl relative'>
        {openCoursMenu && (
          <div className='absolute top-18 right-6 bg-sky-800 rounded-lg shadow-lg z-10 overflow-hidden border border-sky-500/30'>
            <button 
            onClick={() => {
              setOpenCoursMenu(false);
              setOpenDescription(!openDescription)}
          }
            className='w-full px-4 py-2 text-left text-sky-200 hover:bg-sky-700/50 transition-colors flex items-center gap-2'>
              <FaEye /> Voir description
            </button>
            <button 
            onClick={()=>{
              setEditCours(true);
              navigate('/enseignant-dashboard/courses/ajout-cours',{state: {course}})
            }}
            className='w-full px-4 py-2 text-left text-sky-200 hover:bg-sky-700/50 transition-colors flex items-center gap-2 border-t border-sky-500/30'>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Modifier le cours
            </button>
          </div>
        )}
        
        <div className='flex items-start justify-between mb-6'>
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">{course.titre}</h1>
            <div className="flex flex-wrap gap-4 mt-3">
              <div className="flex items-center text-sky-300 gap-2">
                <FaMoneyBillWave className="text-emerald-400" />
                <span>{course.prix} (MAD)</span>
              </div>
              <div className="flex items-center text-sky-300 gap-2">
                <FaCalendarAlt className="text-amber-400" />
                <span>Créé le: {new Date(course.date_de_creation).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
          <button 
            onClick={() => setOpenCoursMenu(!openCoursMenu)}
            className='bg-sky-700/50 cursor-pointer hover:bg-sky-700 p-2 rounded-lg transition-colors mt-1'
          >
            <BsThreeDots className="text-xl text-sky-300" />
          </button>
        </div>
        
        <div className='flex flex-col lg:flex-row gap-7'>
          <div className='flex-1'>
            <div className='bg-sky-900/30 rounded-xl p-5 border border-sky-500/30'>
              <div className='flex items-center justify-between mb-5'>
                <h2 className="text-xl font-bold text-white">Chapitres</h2>
                
                {/* Chapter Menu Dropdown */}
                {openChapitreMenu && (
                  <div className='absolute right-110  top-45  bg-sky-800 rounded-lg shadow-lg z-10 overflow-hidden border border-sky-500/30 w-48'>
                    <button
                      onClick={() =>  navigate('/enseignant-dashboard/courses/ajout-chapitre', {state: {coursId: course.id}})}
                      className='w-full px-1 py-2 text-left text-sky-200 hover:bg-sky-700/50 transition-colors flex items-center gap-2'
                    >
                      <BsPlus className="text-lg" /> Ajouter un chapitre
                    </button>
                    <button
                      onClick={()=>{
                        if (window.confirm("Êtes-vous sûr de vouloir supprimer tous les chapitres ? Cette action est irréversible.")) {
                          deleteAllChaptres(course.id);
                          setOpenChapitreMenu(false);
                        }
                      }}
                      className='w-full px-4 py-2 text-left text-red-400 hover:bg-red-900/30 transition-colors flex items-center gap-2 border-t border-sky-500/30'
                    >
                      <FaTrash /> Supprimer tous
                    </button>
                  </div>
                )}
                <button 
                  onClick={() => setOpenChapitreMenu(!openChapitreMenu)}
                  className='bg-sky-700/50 cursor-pointer hover:bg-sky-700 p-2 rounded-lg transition-colors'
                >
                  <BsThreeDots className="text-xl text-sky-300" />
                </button>
              </div>
              <div className="space-y-3 mt-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {course.chapitres.map((chapitre, index) => (
                  <div key={index} className='flex items-center justify-between p-4 bg-sky-800/30 rounded-lg hover:bg-sky-800/50 transition-colors group'>
                    <div>
                      <p className="text-white font-medium">Chapitre {index+1}: {chapitre.titre}</p>
                      {chapitre.description && (
                        <p className="text-sky-300 text-sm mt-1 truncate max-w-md">{chapitre.description}</p>
                      )}
                    </div>
                    <div className='flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity'>
                      <button 
                      onClick={()=>navigate('/voir-chapitre', {state:{chapitreContent:chapitre.contenu}})}
                      className="p-2 text-sky-300/50 hover:text-sky-300 cursor-pointer rounded-lg bg-sky-600/50 hover:bg-sky-700 transition-colors">
                        <FaEye className='text-md' />
                      </button>
                      <button 
                      onClick={()=>{
                        deleteChaptre(chapitre.id);
                      }}
                      className="p-2 rounded-lg text-red-500/70 cursor-pointer bg-red-800/30  hover:text-red-500/90 hover:bg-red-800/70 transition-colors">
                        <FaTrash className = 'text-md' />
                      </button>
                    </div>
                  </div>
                ))}
                
                {course.chapitres.length === 0 && (
                  <div className="text-center py-6 text-sky-400">
                    <p>Aucun chapitre disponible</p>
                    <button 
                      onClick={() => navigate('/enseignant-dashboard/courses/ajout-chapitre',{state:{coursId: course.id}})}
                      className="mt-3 px-4 py-2 bg-sky-700/50 hover:bg-sky-700 text-sky-200 rounded-lg transition-colors flex items-center gap-2 mx-auto"
                    >
                      <BsPlus className="text-lg" /> Ajouter un chapitre
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className='lg:w-2/5'>
            <div className="rounded-xl overflow-hidden border border-sky-500/30 shadow-lg bg-sky-900/20 ">
              {course.image_type === 'url' ? 
                <img 
                  className='w-full   object-cover ' 
                  src={course.image_url} 
                  alt={course.titre} 
                /> :
                <img 
                  className='w-full h-full object-cover min-h-[300px]' 
                  src={`http://localhost:8000${course.image_url}`} 
                  alt={course.titre} 
                />
              }
              <div className="p-4 bg-gradient-to-t from-sky-900 to-transparent relative -mt-16">
                <h3 className="text-white font-bold text-lg">Image du cours</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(14, 116, 144, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(56, 189, 248, 0.3);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(56, 189, 248, 0.5);
        }
      `}</style>
      { 
        openDescription && <CoursDescriptionCard
         desc={course.description}
         closeDescription={setOpenDescription}
        />
      }
    </div>
  );
};

export default CourseDetails;