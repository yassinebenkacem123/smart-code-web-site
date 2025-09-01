import React, { useState, useEffect } from 'react';
import { FaArrowLeft } from "react-icons/fa";
import useStudentStore from '../store/useStudentStore';
import Loading from '../components/Loading';
import CompletedCourses from '../components/CompletedCourses';
import UnCompletedCourses from '../components/unCompletedCourses';

const EtudiantCourses = () => {
  const { getEnrolledCourses, enrolledCourses, loading, error } = useStudentStore();
  const [slidToCompletedCourses, setSlidToCompletedCourses] = useState(false);

  useEffect(() => {
    getEnrolledCourses();
  }, []);

  if (loading) return <Loading>Chargement des données...</Loading>;

  if (error) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-black">
        <h1 className="text-2xl text-rose-500 font-semibold text-center">{error}</h1>
      </div>
    );
  }

  const uncompletedCourses = enrolledCourses.filter(course => course.cours_status === 'en_cours');
  const completedCourses = enrolledCourses.filter(course => course.cours_status === 'termine');

  return (
    <div className="min-h-screen bg-black text-white px-4 py-6">
      
      {/* Retour */}
      <button 
        onClick={() => window.history.back()}
        className="flex items-center cursor-pointer gap-2 text-sky-400 hover:text-sky-300 transition"
      >
        <FaArrowLeft /> <span>Retour</span>
      </button>

      {/* Titre */}
      <h1 className="text-4xl font-bold text-center mt-4 text-sky-300 font-orienta">Mes Cours</h1>

      {/* Filtres */}
      <div className="flex justify-center gap-4 mt-6">
        <button
          onClick={() => setSlidToCompletedCourses(false)}
          className={`px-6 py-2  cursor-pointer rounded-xl transition font-medium ${
            !slidToCompletedCourses
              ? 'bg-sky-400 text-white'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-800'
          }`}
        >
          En cours
        </button>
        <button
          onClick={() => setSlidToCompletedCourses(true)}
          className={`px-6 cursor-pointer py-2 rounded-xl transition font-medium ${
            slidToCompletedCourses
              ? 'bg-sky-400 text-white'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-800'
          }`}
        >
          Terminé
        </button>
      </div>

      <div className="mt-8">
        {slidToCompletedCourses ? (
          <CompletedCourses 
          setSlidToCompletedCourses={setSlidToCompletedCourses}
          completedCourses={completedCourses} />
        ) : (
          <UnCompletedCourses uncompletedCourses={uncompletedCourses} />
        )}
      </div>
    </div>
  );
};

export default EtudiantCourses;
