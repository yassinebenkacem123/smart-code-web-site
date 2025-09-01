// AdminStudents.jsx
import React, { useState, useEffect } from 'react';
import { FaSearch, FaPlus, FaFilter, FaSync } from "react-icons/fa";
import StudentsTable from '../components/StudentsTable';
import useAdminStore from '../store/useAdminData';
import AddStudentForm from '../components/AddStudentForm';
import EditStudentForm from '../components/EditStudentForm';

const AdminStudents = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredStudents, setFilteredStudents] = useState([]);
  const { students, fetchStudents, studentsLoading, studentsError } = useAdminStore();
  
  // Fetch students on component mount
  useEffect(() => {
    fetchStudents();
  }, []);
  
  // Filter students when search term or students change
  useEffect(() => {
    if (students && students.length > 0) {
      const filtered = students.filter(student => {
        const fullName = `${student.nom} ${student.prenom}`.toLowerCase();
        return fullName.includes(searchTerm.toLowerCase());
      });
      setFilteredStudents(filtered);
    } else {
      setFilteredStudents([]);
    }
  }, [searchTerm, students]);
  // State to manage the student form modal
  const [openStudentForm, setOpenStudentForm] = useState(false);
  const [openEditForm, setOpenEditForm] = useState(false);
  const [studentData, setStudentData] = useState(null);

  return (
    <>
    <div 
      className={`p-4 md:p-6 lg:p-8 bg-gradient-to-br from-[#0f172a] relative to-[#1e293b] w-full h-screen overflow-y-auto ${
        openStudentForm ? 'opacity-35 pointer-events-none' : ''
      }`}
    >
      <div className='flex justify-between items-center mb-6'>
        <div>
          <h1 className='font-bold text-2xl md:text-3xl text-white'>Gestion des Étudiants</h1>
        </div>
      </div>
      
      <div className='flex flex-col md:flex-row justify-between items-center gap-4 mb-8'>
        <div className='relative w-full md:w-[40%]'>
          <div className='absolute z-10 inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
            <FaSearch className='text-sky-400' />
          </div>
          <input 
            type="text" 
            placeholder='Rechercher un étudiant...'
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
          onClick={() => setOpenStudentForm(true)}
          className='bg-primary/70 cursor-pointer text-white px-4 py-2 rounded-lg text-md font-medium hover:opacity-90 transition-opacity flex items-center gap-2'>
            <FaPlus className='text-md' />
            <span>Ajouter un Étudiant</span>
          </button>
        </div>
      </div>
      
      <div className='bg-gradient-to-br from-sky-900/30 to-blue-900/30 backdrop-blur-sm border border-sky-500/30 rounded-lg shadow-lg shadow-sky-900/30 overflow-hidden'>
        <StudentsTable 
          students={filteredStudents} 
          studentsLoading={studentsLoading} 
          studentsError={studentsError} 
          fetchStudents={fetchStudents}
          openStudentForm={openStudentForm}
          setOpenEditForm={setOpenEditForm}
          setStudentData={setStudentData}
        />
      </div>
    </div>
    {openStudentForm && !openEditForm && <AddStudentForm
      setOpenStudentForm={setOpenStudentForm} 

    />}
    {openEditForm && !openStudentForm && 
    <EditStudentForm
     studentData={studentData}
     setOpenEditForm={setOpenEditForm}
    />}
    </>
    
  )
}

export default AdminStudents;