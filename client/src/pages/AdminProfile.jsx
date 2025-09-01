import React, { useEffect } from 'react';
import useAdminStore from '../store/useAdminData';
import { FaUser, FaEnvelope, FaBirthdayCake, FaHome, FaPhone} from 'react-icons/fa';
import { MdAdminPanelSettings } from 'react-icons/md';
import { motion } from 'framer-motion';
import Loading from '../components/Loading';

const AdminProfile = () => {
  const { profile, fetchAdminProfile, loading } = useAdminStore();
  
  useEffect(() => {
    fetchAdminProfile();
  }, [fetchAdminProfile]);
  console.log(profile)

  if (loading) return (
    <Loading>Chargement du profil...</Loading>
  );

  return (
    <div className="p-4 md:p-6 lg:p-8 w-full bg-gradient-to-br from-[#0f172a] to-[#1e293b] min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
          <MdAdminPanelSettings className="text-sky-400" />
          Profil Administrateur
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="">
          <div className="bg-gradient-to-br flex items-center justify-center from-sky-900/30 to-blue-900/30 backdrop-blur-sm border border-sky-500/30 rounded-2xl p-6 shadow-lg shadow-sky-900/30 h-full">
            <div className="flex flex-col  items-center">
              <div className="relative">
                <div className="bg-sky-900/30 border-2 border-sky-500/20 rounded-full w-32 h-32 flex items-center justify-center mb-2">
                  <MdAdminPanelSettings  className="text-sky-400 text-6xl" />
                </div>
              </div>
              <h3 className="text-xl font-ms text-white ">Name : <span className='font-medium'>{profile?.nom}</span></h3>

            </div>
          </div>
        </div>
        
        {/* Information Section */}
        <div className="lg:col-span-2">
          <div className="bg-gradient-to-br from-sky-900/30 to-blue-900/30 backdrop-blur-sm border border-sky-500/30 rounded-2xl p-6 shadow-lg shadow-sky-900/30">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-white">Informations Personnelles</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InfoCard 
                icon={<FaEnvelope className="text-sky-400 text-xl" />}
                label="Email"
                value={profile?.email || "Non renseigné"}
              />
              
              <InfoCard 
                icon={<FaBirthdayCake className="text-amber-400 text-xl" />}
                label="Date de naissance"
                value={profile?.date_naissance ? profile.date_naissance.split('T')[0] : "Non renseigné"}
              />
              
              <InfoCard 
                icon={<FaHome className="text-emerald-400 text-xl" />}
                label="Adresse"
                value={profile?.adress || "Non renseigné"}
              />
              
              <InfoCard 
                icon={<FaPhone className="text-violet-400 text-xl" />}
                label="Téléphone"
                value={profile?.telephone || "Non renseigné"}
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

const InfoCard = ({ icon, label, value }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="bg-sky-800/20 border border-sky-500/30 rounded-xl p-4"
  >
    <div className="flex items-center gap-3 mb-3">
      {icon}
      <h4 className="text-sky-300 font-medium">{label}</h4>
    </div>
    <p className="text-white text-lg">{value}</p>
  </motion.div>
);

export default AdminProfile;