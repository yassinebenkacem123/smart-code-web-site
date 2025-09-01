import React, { useEffect } from 'react';
import useProfessorStore from '../store/useProfessorStore';
import Loading from '../components/Loading';
import { FiUser, FiMail, FiPhone, FiMapPin, FiCalendar, FiEdit2 } from 'react-icons/fi';

const ProfessorProfile = () => {
  const { loading, professor, error, getProfessorProfile } = useProfessorStore();
  
  useEffect(() => {
    getProfessorProfile();
  }, []);
  
  if (loading) {
    return <Loading>Chargement du profil...</Loading>;
  }
  
  if (error) {
    return (
      <div className="w-full min-h-screen flex justify-center items-center p-4">
        <div className="text-red-500 text-xl font-medium p-6 bg-red-100/20 rounded-xl border border-red-300 max-w-md text-center">
          {error}
        </div>
      </div>
    );
  }
  
  // Format date of birth
  const formatDate = (dateString) => {
    if (!dateString) return 'Non spécifié';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  return (
    <div className="min-h-screen w-full  p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">Votre Profile</h1>
          </div>
        </div>
        
        {professor && (
          <div className="rounded-2xl shadow-xl overflow-hidden">
            {/* Profile Header */}
            <div className="bg-gradient-to-r from-sky-900/90 to-sky-800/80 p-6 text-white">
              <div className="flex flex-col items-center text-center">
                <div className="bg-sky-400/30 border-2 border-white/30 w-20 h-20 rounded-full flex items-center justify-center mb-4">
                  {professor.photo ? (
                    <img 
                      src={professor.photo} 
                      alt={professor.name} 
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <FiUser className="text-3xl text-white/80" />
                  )}
                </div>
                <h2 className="text-2xl font-bold">{professor.name}</h2>
                <p className="text-sky-100 mt-2 flex items-center justify-center gap-2">
                  <FiMail className="text-lg" />
                  {professor.email}
                </p>
              </div>
            </div>
            
            {/* Profile Details */}
            <div className="p-6 bg-sky-800/50">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-4 p-4 bg-sky-600/40 rounded-lg">
                  <div className="p-2 bg-white rounded-lg shadow-sm border border-sky-200">
                    <FiCalendar className="text-sky-600 text-xl" />
                  </div>
                  <div>
                    <p className="text-sm text-sky-200 font-medium">Date de naissance</p>
                    <p className="text-sky-300 font-medium mt-1">{formatDate(professor.date_naissance)}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 p-4 bg-sky-600/40 rounded-lg">
                  <div className="p-2 bg-white rounded-lg shadow-sm border border-sky-200">
                    <FiUser className="text-sky-600 text-xl" />
                  </div>
                  <div>
                    <p className="text-sm text-sky-200 font-medium">Genre</p>
                    <p className="text-sky-300 font-medium mt-1">{professor.genre || 'Non spécifié'}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 p-4 bg-sky-600/40 rounded-lg">
                  <div className="p-2 bg-white rounded-lg shadow-sm border border-sky-200">
                    <FiPhone className="text-sky-600 text-xl" />
                  </div>
                  <div>
                    <p className="text-sm text-sky-200 font-medium">Téléphone</p>
                    <p className="text-sky-300 font-medium mt-1">{professor.telephone || 'Non spécifié'}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 p-4 bg-sky-600/40 rounded-lg">
                  <div className="p-2 bg-white rounded-lg shadow-sm border border-sky-200">
                    <FiMapPin className="text-sky-600 text-xl" />
                  </div>
                  <div>
                    <p className="text-sm text-sky-200 font-medium">Adresse</p>
                    <p className="text-sky-300 font-medium mt-1">{professor.adress || 'Non spécifié'}</p>
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfessorProfile;