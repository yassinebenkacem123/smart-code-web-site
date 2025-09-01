// Professor Table.jsx
import React, { useState, useEffect } from 'react';
import { FaEye, FaEnvelope, FaEdit, FaTrash, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { IoMdFemale, IoMdMale } from "react-icons/io";
import useAdminStore from '../store/useAdminData';
import { useNavigate } from 'react-router-dom';
import Loading from './Loading';

const ProfessorTable = ({ 
  professors = [], 
  professorsLoading = false, 
  professorsError = null, 
  fetchProfessors = () => {},
  setOpenEditForm,
  setProfessorData

}) => {
  // States and Variables
  const itemsPerPage = 6;
  const totalPages = Math.max(1, Math.ceil(professors.length / itemsPerPage));
  const { deleteProfessor } = useAdminStore();
  
  // Always start at page 1
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProfessor = professors.slice(indexOfFirstItem, indexOfLastItem);
  const navigate = useNavigate();
  
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  
  useEffect(() => {
    const totalPages = Math.max(1, Math.ceil(professors.length / itemsPerPage));
    if (currentPage > totalPages) {
      setCurrentPage(totalPages); // Keep it at least 1
    }
  }, [professors, currentPage, itemsPerPage]);

  if (professorsLoading) return (
    <Loading>Chargement des données...</Loading>
  );
  
  if (professorsError) return (
    <div className="text-center w-full h-screen flex items-center justify-center gap-3 py-12">
      <div className="text-red-500 bg-red-900/30 p-4 rounded-lg inline-block">
        {professorsError}
      </div>
      <button 
        onClick={fetchProfessors}
        className="mt-4 bg-sky-700/50 hover:bg-sky-700 text-white px-4 py-2 rounded-lg transition-colors"
      >
        Réessayer
      </button>
    </div>
  );
  
  if (!professors || professors.length === 0) return (
    <div className="text-center py-12">
      <div className="text-sky-300 bg-sky-900/30 p-4 rounded-lg inline-block">
        Aucun étudiant trouvé
      </div>
    </div>
  );

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead className="bg-sky-800/50">
          <tr>
            <th className="px-6 py-4 text-left text-xs font-medium text-sky-300 uppercase tracking-wider">#</th>
            <th className="px-6 py-4 text-left text-xs font-medium text-sky-300 uppercase tracking-wider">Professor</th>
            <th className="px-6 py-4 text-left text-xs font-medium text-sky-300 uppercase tracking-wider">Email</th>
            <th className="px-6 py-4 text-left text-xs font-medium text-sky-300 uppercase tracking-wider">Téléphone</th>
            <th className="px-6 py-4 text-center text-xs font-medium text-sky-300 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        
        <tbody className="divide-y divide-sky-500/20">
          {currentProfessor.map((professor, index) => (
            <tr key={professor.id} className="hover:bg-sky-800/20 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-sky-300">{indexOfFirstItem + index + 1}</td>
               
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className={`${professor.genre === 'Homme' ? 'bg-sky-900/30 border border-sky-500/30' : 'bg-fuchsia-900/30 border border-fuchsia-500/30'} rounded-full p-2 mr-3`}>
                    {professor.genre === 'Homme' ? <IoMdMale className="text-sky-400" /> : <IoMdFemale className="text-fuchsia-500" />}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white">{professor.nom} {professor.prenom}</div>
                  </div>
                </div>
              </td>
              
              <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{professor.email}</td>
              
              <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                {professor.telephone || <span className="text-gray-500">Non renseigné</span>}
              </td>
            
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                <div className="flex justify-center gap-2">
                  <button 
                  onClick={() => {
                    navigate(`/admin-dashboard/professor/details/${professor.id}`)
                  }}
                  className="bg-sky-700/30 cursor-pointer hover:bg-sky-600 p-2 rounded-lg text-sky-300">
                    <FaEye />
                  </button>
                  <button 
                  onClick={() => {
                    setProfessorData(professor);
                    setOpenEditForm(true)
                  }}
                  className="bg-amber-700/30 cursor-pointer hover:bg-amber-600 p-2 rounded-lg text-amber-300">
                    <FaEdit />
                  </button>
                  <button 
                    onClick={() => {
                      const subject = encodeURIComponent("Message from Admin");
                      const body = encodeURIComponent(`Hello ${professor.nom},\n\nThis is a message from the admin.`);
                      const outlookWebUrl = `https://outlook.office.com/mail/deeplink/compose?to=${professor.email}&subject=${subject}&body=${body}`;
                      window.open(outlookWebUrl, '_blank');}}
                    className="bg-emerald-700/30 cursor-pointer hover:bg-emerald-600 p-2 rounded-lg text-emerald-300">
                    <FaEnvelope />
                  </button>
                  <button 
                    onClick={() => { deleteProfessor(professor.id) }}
                    className="bg-red-700/30 cursor-pointer hover:bg-red-600 p-2 rounded-lg text-red-300">
                    <FaTrash />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between border-t border-sky-700/50 px-4 py-3 mt-4 gap-4">
          <div className="text-sm text-sky-300">
            Page <span className="font-medium">{currentPage}</span> sur <span className="font-medium">{totalPages}</span>
            <span className="ml-2">({professors.length} étudiants)</span>
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className={`p-2 rounded-lg ${
                currentPage === 1 
                  ? 'bg-sky-900/30 text-sky-500/50 cursor-not-allowed' 
                  : 'bg-sky-700/50 hover:bg-sky-700 text-sky-300 cursor-pointer'
              }`}
            >
              <FaChevronLeft className="h-4 w-4" />
            </button>
            
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i + 1}
                onClick={() => paginate(i + 1)}
                className={`px-3 py-1 rounded-lg text-sm ${
                  currentPage === i + 1
                    ? 'bg-sky-600 text-white'
                    : 'bg-sky-800/50 hover:bg-sky-700/50 text-sky-300'
                }`}
              >
                {i + 1}
              </button>
            ))}
            
            <button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className={`p-2 rounded-lg ${
                currentPage === totalPages
                  ? 'bg-sky-900/30 text-sky-500/50 cursor-not-allowed' 
                  : 'bg-sky-700/50 hover:bg-sky-700 text-sky-300 cursor-pointer'
              }`}
            >
              <FaChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfessorTable;