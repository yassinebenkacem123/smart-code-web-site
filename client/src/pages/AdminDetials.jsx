import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaChevronLeft, FaEnvelope, FaPhone, FaMapMarkerAlt, FaBirthdayCake, FaBook, FaChalkboardTeacher, FaDollarSign, FaCalendarAlt } from 'react-icons/fa';
import { IoMdMale, IoMdFemale } from "react-icons/io";
import useAdminStore from '../store/useAdminData';
import { FaEdit } from 'react-icons/fa';
import EditAdminForm from '../components/EditAdminForm';
const AdminDetails = () => {
  const { adminId } = useParams();
  const { admin,getAdminById } = useAdminStore();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openEditForm, setOpenEditForm] = useState(false);
  

  useEffect(() => {
    const fetchAdminData = async () => {
      setLoading(true);
      try {
        // Fetch admin details
        getAdminById(adminId);
        // Fetch admin courses
      } catch (err) {
        setError("Erreur lors du chargement des données du professeur");
        console.error("Error fetching admin data:", err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchAdminData();
  }, [adminId, getAdminById]);

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'Non spécifié';
    try {
      // Extract the date part (assuming format: "2334-05-15723:00:00.0002")
      const datePart = dateString.split('T')[0];
      const date = new Date(datePart);
      return date.toLocaleDateString('fr-FR');
    } catch {
      return dateString;
    }
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

  if (!admin) {
    return (
      <div className='p-4 md:p6 lg:p-8 w-full bg-gradient-to-br from-[#0f172a] to-[#1e293b] min-h-screen flex items-center justify-center'>
        <div className="text-sky-300 bg-sky-900/30 p-4 rounded-lg inline-block">
          Aucun professeur trouvé avec cet ID
        </div>
      </div>
    );
  }

  return (
  <>
    <div className='p-4 md:p-6 lg:p-8 w-full  flex flex-col items-center bg-gradient-to-br from-[#0f172a] to-[#1e293b] min-h-screen overflow-y-auto'>
      <div className='flex w-full justify-between items-center mb-6'>
        <button 
          onClick={() => window.history.back()} 
          className="flex  cursor-pointer items-center text-sky-300 hover:text-sky-200 transition-colors"
        >
          <FaChevronLeft className="mr-1" /> Retour
        </button>
        <h1 className='font-bold mr-85 text-2xl md:text-3xl text-white'>Détails du Professeur</h1>
      </div>

        {/* Admin Profile Card */}
        <div className='bg-gradient-to-br mb-4  w-[70%] from-sky-900/30 to-blue-900/30 backdrop-blur-sm border border-sky-500/30 rounded-xl shadow-lg shadow-sky-900/30 p-6 lg:col-span-1'>
          <div className='flex flex-col items-center mb-6'>
            <div className={`${admin.genre === 'Homme' ? 'bg-sky-900/30 border border-sky-500/30' : 'bg-fuchsia-900/30 border border-fuchsia-500/30'} rounded-full p-4 mb-4`}>
              {admin.genre === 'Homme' ? 
                <IoMdMale className='text-sky-400 text-4xl' /> : 
                <IoMdFemale className='text-fuchsia-500 text-4xl' />
              }
            </div>
            <h2 className='text-xl font-bold text-white text-center'>{admin.nom}</h2>
            <p className='text-sky-300'>ID: {admin.id}</p>
          </div>

          <div className='w-full flex items-center p-4 justify-center'>
            <div className='grid grid-cols-1  md:grid-cols-2 gap-10'>
              <div className='flex items-center'>
                <div className='bg-sky-800/30 p-2 rounded-lg mr-3'>
                  <FaEnvelope className='text-sky-400' />
                </div>
                <div>
                  <p className='text-sm text-sky-300'>Email</p>
                  <p className='text-white'>{admin.email}</p>
                </div>
              </div>

              <div className='flex items-center'>
                <div className='bg-sky-800/30 p-2 rounded-lg mr-3'>
                  <FaPhone className='text-sky-400' />
                </div>
                <div>
                  <p className='text-sm text-sky-300'>Téléphone</p>
                  <p className='text-white'>{admin.telephone || 'Non renseigné'}</p>
                </div>
              </div>

              <div className='flex items-center'>
                <div className='bg-sky-800/30 p-2 rounded-lg mr-3'>
                  <FaMapMarkerAlt className='text-sky-400' />
                </div>
                <div>
                  <p className='text-sm text-sky-300'>Adresse</p>
                  <p className='text-white'>{admin.adress || 'Non renseignée'}</p>
                </div>
              </div>

              <div className='flex items-center'>
                <div className='bg-sky-800/30 p-2 rounded-lg mr-3'>
                  <FaBirthdayCake className='text-sky-400' />
                </div>
                <div>
                  <p className='text-sm text-sky-300'>Date de naissance</p>
                  <p className='text-white'>{formatDate(admin.date_naissance)}</p>
                </div>
              </div>
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
     {openEditForm && <EditAdminForm      
       adminData={admin}
       setOpenEditForm={setOpenEditForm}
    />}
  </>
  );
};

export default AdminDetails;