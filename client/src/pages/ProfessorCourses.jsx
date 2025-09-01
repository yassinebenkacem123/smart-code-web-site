import React, { useState, useEffect } from 'react';
import { MdDelete, MdSearch } from "react-icons/md";
import { FaEye, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import useProfessorStore from '../store/useProfessorStore';
import Loading from '../components/Loading';

const ProfessorCourses = () => {
  const { courses, loading, error, setEditCours,fetchCoursesWithChapters,deleteCoursById} = useProfessorStore();
  const navigate = useNavigate();
  
  // State for search and pagination
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 6;

  useEffect(() => {
    fetchCoursesWithChapters();
  }, []);

  // Filter courses based on search term
  const filteredCourses = courses.filter(course => 
    course.titre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = filteredCourses.slice(indexOfFirstCourse, indexOfLastCourse);
  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (loading) {
    return <Loading>Chargement des cours...</Loading>;
  }

  if (error) {
    return (
      <div className="p-6 text-red-500 flex w-full justify-center items-center flex-col gap-3">
        <h2 className="text-lg font-semibold">Erreur</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="p-6 overflow-y-auto bg-gradient-to-br w-full from-sky-900/20 to-blue-900/20">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Mes Cours</h1>
          <p className="text-sky-200 mt-1">
            {filteredCourses.length} cours trouvé{filteredCourses.length !== 1 ? 's' : ''}
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Chercher un cours..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full rounded-lg border border-sky-500/30 bg-sky-900/20 text-white placeholder-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
            <MdSearch className="absolute left-3 top-3 text-sky-300 text-xl" />
          </div>
          <button 
            onClick={() =>{ 
              setEditCours(false);
              navigate('/enseignant-dashboard/courses/ajout-cours')}}
            className="px-4 cursor-pointer py-2 bg-gradient-to-r from-sky-500 to-sky-600 text-white rounded-lg hover:from-sky-600 hover:to-sky-700 transition-all shadow-md hover:shadow-lg whitespace-nowrap"
          >
            Ajouter Un Cours
          </button>
        </div>
      </div>

      <div className="rounded-xl border border-sky-500/30 shadow-lg">
        <table className="min-w-full bg-sky-900/30 backdrop-blur-sm">
          <thead className="bg-gradient-to-r from-sky-800 to-sky-900 text-sky-300">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-semibold uppercase tracking-wider">Titre</th>
              <th className="px-4 py-2 text-center text-sm font-semibold uppercase tracking-wider">Étudiants</th>
              <th className="px-4 py-2 text-center text-sm font-semibold uppercase tracking-wider">Chapitres</th>
              <th className="px-4 py-2 text-left text-sm font-semibold uppercase tracking-wider">Date de Création</th>
              <th className="px-4 py-2 text-right text-sm  font-semibold uppercase tracking-wider">Prix (MAD)</th>
              <th className="px-4 py-2 text-center text-sm font-semibold uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-sky-500/20">
            {currentCourses.map((course, index) => (
              <tr 
                key={index} 
                className="hover:bg-sky-800/20 transition-colors even:bg-sky-900/10"
              >
                <td className="px-6 py-4 text-white font-medium">
                  <div className="flex items-center">
                    <div className="bg-sky-700/50 w-10 h-10 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-sky-200 font-bold">{course.titre[0]}</span>
                    </div>
                    <span className="truncate max-w-xs">{course.titre}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-center text-sky-300">
                    {course.nombre_etudiants}
                </td>
                <td className="px-6 py-4 text-center text-sky-300">
                  {course.chapitres.length}
                </td>
                <td className="px-6 py-4 text-sky-300">
                  {new Date(course.date_de_creation).toLocaleDateString('fr-FR')}
                </td>
                <td className="px-6 py-4 text-right text-emerald-300 font-medium">
                 {course.prix}
                </td>
                <td className="px-6 py-4 text-center">
                  <div className="flex justify-center gap-2">
                    <button 
                      onClick={() => navigate(`/enseignant-dashboard/courses/details/${course.id}`)}
                      className="bg-sky-600/20 hover:bg-sky-700 p-2 rounded-lg cursor-pointer transition-all duration-300 shadow hover:shadow-md"
                    >
                      <FaEye className="text-white text-lg" />
                    </button>
                    <button 
                      onClick={()=>{
                        deleteCoursById(course.id);
                      }}
                      className="bg-red-500/60 cursor-pointer hover:bg-red-500 p-2 rounded-lg transition-all duration-300 shadow hover:shadow-md">
                      <MdDelete className="text-white text-xl" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {filteredCourses.length === 0 && (
          <div className="text-center py-12 text-sky-300 bg-sky-900/10">
            <p className="text-lg">Aucun cours correspondant à votre recherche</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-6 px-4 py-3 bg-sky-900/30 rounded-lg border border-sky-500/30">
          <button 
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`flex items-center px-4 py-2 rounded-lg ${
              currentPage === 1 
                ? 'text-sky-500/50 cursor-not-allowed' 
                : 'text-sky-300 hover:bg-sky-800/50'
            }`}
          >
            <FaChevronLeft className="mr-2" /> Précédent
          </button>
          
          <div className="hidden sm:flex space-x-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`w-10 h-10 rounded-full ${
                  currentPage === page
                    ? 'bg-sky-600 text-white shadow-md'
                    : 'text-sky-300 hover:bg-sky-800/50'
                }`}
              >
                {page}
              </button>
            ))}
          </div>
          <div className="sm:hidden text-sky-300">
            Page {currentPage} sur {totalPages}
          </div>
          
          <button 
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`flex items-center px-4 py-2 rounded-lg ${
              currentPage === totalPages 
                ? 'text-sky-500/50 cursor-not-allowed' 
                : 'text-sky-300 hover:bg-sky-800/50'
            }`}
          >
            Suivant <FaChevronRight className="ml-2" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfessorCourses;