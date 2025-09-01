import React, { useEffect, useState } from "react";
import useStudentStore from "../store/useStudentStore";
import Loading from "../components/Loading";
import { useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
const EnrollCourse = () => {
  const { courseId } = useParams();
  const { getCourseDetails, course, loading, enroll,error,buyCourse } = useStudentStore();
  const [openChapters, setOpenChapters] = useState({});

  useEffect(() => {
    getCourseDetails(courseId);
  }, [courseId, getCourseDetails]);

  const toggleChapter = (index) => {
    setOpenChapters((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const courseProvides = [
    "Support technique et pédagogique",
    "Accès à des forums de discussion",
    "Certificat de réussite",
    "Accès à des mises à jour de cours",
    "Accès à des sessions de questions-réponses en direct",
    "Accès à des exercices pratiques",
    "Accès à des études de cas",
    "Communication direct avec les enseignants",
    "Accès à des ressources supplémentaires",
  ];

  

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loading>Chargement des données...</Loading>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="bg-red-900/30 border border-red-700 text-red-300 px-8 py-6 rounded-xl max-w-md text-center backdrop-blur-sm">
          <h2 className="text-2xl font-bold mb-2">Erreur</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="bg-blue-900/30 border border-blue-700 text-blue-300 px-8 py-6 rounded-xl max-w-md text-center backdrop-blur-sm">
          <h2 className="text-2xl font-bold mb-2">Cours non trouvé</h2>
          <p>Aucun cours correspondant à cet identifiant.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-gray-200 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <button className="mb-6 text-sky-400 cursor-pointer hover:text-sky-300 transition-colors flex items-center gap-2" onClick={() => window.history.back()}>
          <FaArrowLeft className="h-5 w-5" />
          Retourne
        </button>
        {/* Course Header */}
        <div className="bg-gradient-to-r from-sky-900/50 to-blue-900/30 rounded-xl p-6 shadow-xl backdrop-blur-sm border border-sky-800/50">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2 text-white">{course.titre}</h1>
              <p className="text-sky-200/80 mb-4 max-w-3xl">{course.description}</p>
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center">
                  <div className="bg-sky-900 text-sky-300 rounded-full p-2 mr-2 border border-sky-700">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="font-medium">Enseignant: {course.enseignant?.nom || "Nom non disponible"}</p>
                </div>
                
                <div className="flex items-center">
                  <div className="bg-sky-900 text-sky-300 rounded-full p-2 mr-2 border border-sky-700">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="font-medium">{course.chapitres.length * 10} jours pour compléter</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          {/* Course Chapters Section */}
          <div className="lg:col-span-2">
            <div className="bg-gray-900 rounded-2xl shadow-xl p-6 border border-gray-800">
              <h2 className="text-2xl font-bold text-sky-300 mb-6 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Les Chapitres Du Cours
              </h2>
              
              {course.chapitres?.length > 0 ? (
                <div className="space-y-4">
                  {course.chapitres.map((chapitre, index) => (
                    <div key={index} className="border border-gray-800 rounded-xl overflow-hidden bg-gray-850">
                      <button
                        type="button"
                        onClick={() => toggleChapter(index)}
                        className="w-full flex justify-between items-center p-4 bg-gray-800 hover:bg-gray-750 transition-colors"
                      >
                        <div className="flex items-center">
                          <div className="bg-sky-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">
                            {index + 1}
                          </div>
                          <span className="font-medium text-left text-gray-200">{chapitre.titre}</span>
                        </div>
                        <svg
                          className={`w-5 h-5 text-sky-400 transition-transform duration-300 ${
                            openChapters[index] ? "rotate-180" : ""
                          }`}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                      
                      {openChapters[index] && (
                        <div className="p-4 bg-gray-850 border-t border-gray-800 animate-fadeIn">
                          <p className="text-gray-300">
                            {chapitre.description || "Aucune description disponible pour ce chapitre."}
                          </p>
                          <div className="mt-3 flex items-center text-sm text-sky-400">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Durée estimée: 45 minutes
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-amber-900/30 border border-amber-700 rounded-lg p-4">
                  <p className="text-amber-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    Aucun chapitre disponible pour ce cours.
                  </p>
                </div>
              )}
            </div>
          </div>
          
          {/* Course Info & Enrollment Section */}
          <div>
            <div className="bg-gray-900 rounded-2xl shadow-xl overflow-hidden border border-gray-800">
              <div className="relative">
                {course.image_url ? (
                  <img 
                    src={course.image_url} 
                    alt={course.titre} 
                    className="w-full h-56 object-cover"
                  />
                ) : (
                  <div className="bg-gradient-to-r from-sky-900 to-blue-900 w-full h-56 flex items-center justify-center">
                    <div className="text-sky-300 text-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <p className="mt-2 font-medium">Image du cours</p>
                    </div>
                  </div>
                )}
                <div className="absolute bottom-4 right-4 bg-sky-600 text-white px-3 py-1 rounded-full font-bold shadow-lg">
                  {course.chapitres.length} chapitres
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-white">{course.prix} MAD</h3>
                    <p className="text-gray-400">Prix unique</p>
                  </div>
                  <button
                    onClick={() => {
                      if (!enroll) {
                        buyCourse(course.id);
                      }
                    }}
                    disabled={enroll}
                    className={`px-6 py-3 rounded-full font-bold text-white shadow-lg transition-all ${
                      enroll 
                        ? "bg-gray-700 cursor-not-allowed" 
                        : "bg-gradient-to-r from-sky-500 to-sky-400 cursor-pointer hover:from-sky-600 hover:to-blue-400 hover:shadow-xl"
                    }`}
                  >
                    {enroll ? (
                      <div className="flex items-center">
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Traitement...
                      </div>
                    ) : (
                      "S'inscrire au cours"
                    )}
                  </button>
                </div>
                
                <div className="border-t border-gray-800 pt-6">
                  <h4 className="text-xl font-bold text-sky-300 mb-4 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Les Valeurs Ajoutées Du Cours
                  </h4>
                  <ul className="space-y-3">
                    {courseProvides.map((provide, index) => (
                      <li key={index} className="flex items-start">
                        <div className="bg-sky-900 text-sky-400 rounded-full p-1 mt-1 mr-3">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-gray-300">{provide}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnrollCourse;