import { useEffect } from "react";
import useStudentStore from "../store/useStudentStore";
import { FaUser, FaEnvelope, FaMapMarkerAlt, FaVenusMars, FaCalendarAlt, FaPhone, FaGraduationCap } from "react-icons/fa";
import { PiStudentFill } from "react-icons/pi";
import { FaArrowLeft } from "react-icons/fa";
const EtudiantProfile = () => {
  const { getStudentProfile, studentProfile, loading, error } = useStudentStore();
  
  useEffect(() => {
    getStudentProfile();
  }, [getStudentProfile]);

  if (loading || !studentProfile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-sky-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-sky-300 font-medium">Chargement des données...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
        <div className="bg-red-900/30 border border-red-500/30 rounded-xl p-6 max-w-md text-center">
          <div className="text-red-400 text-4xl mb-3">⚠️</div>
          <h2 className="text-red-300 text-xl font-bold mb-2">Erreur de chargement</h2>
          <p className="text-red-200">{error}</p>
          <button 
            onClick={getStudentProfile}
            className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white transition-colors"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black p-4 md:p-8">
      <button  className="mb-6 px-4 py-2  flex cursor-pointer  text-white rounded-lg transition-colors  items-center gap-2"
      onClick={() => window.history.back()}
      >
        <FaArrowLeft className="text-sky-400 text-xl" />
        Retourne</button>
      <div className="max-w-5xl mx-auto">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-sky-900 to-black p-6 rounded-2xl border border-sky-700/30 shadow-lg shadow-sky-900/20 mb-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative">
              <div className="bg-gradient-to-r from-sky-500 to-blue-600 rounded-full p-1">
                <div className="bg-gray-900 rounded-full p-1">
                  <div className="bg-gray-800 w-24 h-24 rounded-full flex items-center justify-center">
                    <PiStudentFill className="text-sky-400 text-4xl" />
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-2 -right-2 bg-sky-500 text-white rounded-full px-3 py-1 text-xs font-medium">
                Étudiant
              </div>
            </div>
            
            <div className="text-center md:text-left">
              <h1 className="text-2xl md:text-3xl font-bold text-white">{studentProfile.nom}</h1>
              <div className="flex items-center justify-center md:justify-start gap-2 mt-2">
                <span className="bg-sky-900/50 text-sky-300 px-3 py-1 rounded-full text-sm">SmartCode</span>
              </div>
              <p className="mt-4 text-sky-300 flex items-center justify-center md:justify-start gap-2">
                <FaEnvelope className="text-sky-400" />
                {studentProfile.email}
              </p>
            </div>
          </div>
        </div>

        {/* Profile Information Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Personal Information Card */}
          <div className="bg-gray-800/30 backdrop-blur-sm border border-sky-800/50 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <FaUser className="text-sky-400" />
              Informations Personnelles
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="bg-sky-900/30 p-2 rounded-lg">
                  <FaVenusMars className="text-sky-400 text-lg" />
                </div>
                <div>
                  <h3 className="text-gray-400 text-sm">Genre</h3>
                  <p className="text-white">{studentProfile.genre}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="bg-sky-900/30 p-2 rounded-lg">
                  <FaCalendarAlt className="text-sky-400 text-lg" />
                </div>
                <div>
                  <h3 className="text-gray-400 text-sm">Date de Naissance</h3>
                  <p className="text-white">{studentProfile.date_naissance.split('T')[0]}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="bg-sky-900/30 p-2 rounded-lg">
                  <FaGraduationCap className="text-sky-400 text-lg" />
                </div>
                <div>
                  <h3 className="text-gray-400 text-sm">Date d'Inscription</h3>
                  <p className="text-white">{studentProfile.date_inscription_ecole.split('T')[0]}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information Card */}
          <div className="bg-gray-800/30 backdrop-blur-sm border border-sky-800/50 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <FaEnvelope className="text-sky-400" />
              Contact
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="bg-sky-900/30 p-2 rounded-lg">
                  <FaPhone className="text-sky-400 text-lg" />
                </div>
                <div>
                  <h3 className="text-gray-400 text-sm">Téléphone</h3>
                  <p className="text-white">
                    {studentProfile.telephone || (
                      <span className="text-gray-500 italic">Non renseigné</span>
                    )}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="bg-sky-900/30 p-2 rounded-lg">
                  <FaMapMarkerAlt className="text-sky-400 text-lg" />
                </div>
                <div>
                  <h3 className="text-gray-400 text-sm">Adresse</h3>
                  <p className="text-white">
                    {studentProfile.adress || (
                      <span className="text-gray-500 italic">Non renseignée</span>
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>

          
        </div>

      </div>
    </div>
  );
};

export default EtudiantProfile;