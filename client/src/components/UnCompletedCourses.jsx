import React from 'react';
import { useNavigate } from 'react-router-dom';
const UnCompletedCourses = ({ uncompletedCourses }) => {
  const navigate = useNavigate();
  return (
    <div className="bg-black text-gray-200 py-6 px-4 rounded-xl">
      <h2 className="text-2xl font-bold text-sky-300 mb-6 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
        Cours en Cours
      </h2>
      
      {uncompletedCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {uncompletedCourses.map((course) => {
            const progress = course.progression || 0;
            
            return (
              <div 
                key={course.cours_id} 
                className="bg-gray-800/80 rounded-xl shadow-lg overflow-hidden border border-gray-800 hover:border-sky-500 transition-all duration-300 group"
              >
                <div className="relative">
                  <img 
                    className="w-full h-48 object-cover group-hover:opacity-80 transition-opacity"
                    src={course.image_url} 
                    alt={course.titre} 
                  />
                </div>
                <div className="p-4 flex items-start justify-between">
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-white mb-2 group-hover:text-sky-300 transition-colors">{course.titre}</h2>
                    <div className="flex items-center text-sm text-gray-400">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      {course.chapitres.length - course.nb_chapitres_non_termines} / {course.chapitres.length} chapitres
                    </div>
                  </div>
                  
                  {/* Circular progress indicator */}
                  <div className="relative w-16 h-16">
                    <svg className="w-full h-full" viewBox="0 0 36 36">
                      {/* Background circle */}
                      <circle
                        cx="18"
                        cy="18"
                        r="15.9155"
                        fill="none"
                        stroke="#1e293b"
                        strokeWidth="2"
                      />
                      {/* Progress circle */}
                      <circle
                        cx="18"
                        cy="18"
                        r="15.9155"
                        fill="none"
                        stroke="#0ea5e9"
                        strokeWidth="2"
                        strokeDasharray={`${progress}, 100`}
                        strokeLinecap="round"
                        transform="rotate(-90 18 18)"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xs font-bold text-sky-300">{progress}%</span>
                    </div>
                  </div>
                </div>
                
                <div className="px-4 pb-4">
                  <button 
                  onClick={()=>{
                    navigate('/etudiant-dashboard/read-course', {state:{courseId: course.cours_id, courseTitre: course.titre}});
                  }}
                  className="w-full cursor-pointer py-2 bg-gradient-to-r from-sky-600 to-sky-800 text-white font-medium rounded-lg hover:from-sky-700 hover:to-sky-900 transition-all duration-300 flex items-center justify-center group-hover:shadow-lg group-hover:shadow-sky-900/30">
                    Continuer
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-10">
          <div className="flex justify-center mb-4">
            <div className="bg-sky-900/50 p-4 rounded-full border border-sky-800">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
          </div>
          <h3 className="text-xl font-semibold text-sky-400 mb-2">Aucun cours en cours</h3>
          <p className="text-gray-400 max-w-md mx-auto">
            Vous n'avez pas encore commencé de cours. Parcourez notre catalogue pour trouver votre prochain cours !
          </p>
          <button className="mt-4 px-6 cursor-pointer py-2 bg-sky-700 text-white rounded-lg font-medium hover:bg-sky-800 transition-colors">
            Explorer les cours
          </button>
        </div>
      )}
    </div>
  );
};

export default UnCompletedCourses;