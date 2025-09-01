// AdminProfessor.jsx
import React, { useState, useEffect } from 'react';
import { FaSearch, FaPlus, FaFilter, FaSync } from "react-icons/fa";
import useAdminStore from '../store/useAdminData';
import ProfessorTable from '../components/ProfessorTable';
import EditProfessorForm from '../components/EditProfessorForm';
import AddProfessorForm from '../components/AddProfessorForm';
const AdminProfessor = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProfessors, setFilteredProfessors] = useState([]);
  const { professors, fetchProfessors, professorsLoading, professorsError } = useAdminStore();
  
  // Fetch professors on component mount
  useEffect(() => {
    fetchProfessors();
  }, []);
  
  // Filter professors when search term or professors change
  useEffect(() => {
    if (professors && professors.length > 0) {
      const filtered = professors.filter(professor => {
        const fullName = `${professor.nom} ${professor.prenom}`.toLowerCase();
        return fullName.includes(searchTerm.toLowerCase());
      });
      setFilteredProfessors(filtered);
    } else {
      setFilteredProfessors([]);
    }
  }, [searchTerm, professors]);
  // State to manage the Professor form modal
  const [openProfessorForm, setOpenProfessorForm] = useState(false);
  const [openEditForm, setOpenEditForm] = useState(false);
  const [professorData, setProfessorData] = useState(null);

  return (
    <>
    <div 
      className={`p-4 md:p-6 lg:p-8 bg-gradient-to-br from-[#0f172a] relative to-[#1e293b] w-full h-screen overflow-y-auto ${
        openProfessorForm ? 'opacity-35 pointer-events-none' : ''
      }`}
    >
      <div className='flex justify-between items-center mb-6'>
        <div>
          <h1 className='font-bold text-2xl md:text-3xl text-white'>Gestion Des Professors</h1>
        </div>
      </div>
      
      <div className='flex flex-col md:flex-row justify-between items-center gap-4 mb-8'>
        <div className='relative w-full md:w-[40%]'>
          <div className='absolute z-10 inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
            <FaSearch className='text-sky-400' />
          </div>
          <input 
            type="text" 
            placeholder='Rechercher un Professor...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='w-full pl-10 pr-4 py-2 bg-sky-900/30 backdrop-blur-sm border border-sky-500/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-sky-500'
          />
        </div>
        
        <div className="flex gap-2 items-center">
          <button 
            onClick={() => setSearchTerm('')}
            className='bg-amber-700/30 hover:bg-amber-700/50 text-amber-300 px-4 py-2 rounded-lg text-md font-medium transition-colors flex items-center gap-2'
          >
            <FaSync className='text-md' />
            <span>Réinitialiser</span>
          </button>
          
          <button 
          onClick={() => setOpenProfessorForm(true)}
          className='bg-primary/70 cursor-pointer text-white px-4 py-2 rounded-lg text-md font-medium hover:opacity-90 transition-opacity flex items-center gap-2'>
            <FaPlus className='text-md' />
            <span>Ajouter un Professor</span>
          </button>
        </div>
      </div>
      
      <div className='bg-gradient-to-br from-sky-900/30 to-blue-900/30 backdrop-blur-sm border border-sky-500/30 rounded-lg shadow-lg shadow-sky-900/30 overflow-hidden'>
        <ProfessorTable 
          professors={filteredProfessors} 
          professorsLoading={professorsLoading} 
          professorsError={professorsError} 
          fetchProfessors={fetchProfessors}
          openProfessorForm={openProfessorForm}
          setOpenEditForm={setOpenEditForm}
          setProfessorData={setProfessorData}
        />
      </div>
    </div>
    {openProfessorForm && !openEditForm && <AddProfessorForm
      setOpenProfessorForm={setOpenProfessorForm} 

    />}
    {openEditForm && !openProfessorForm && 
    <EditProfessorForm
     professorData={professorData}
     setOpenEditForm={setOpenEditForm}
    />}
    </>
    
  )
}

export default AdminProfessor;