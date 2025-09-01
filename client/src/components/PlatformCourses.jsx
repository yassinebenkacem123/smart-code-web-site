import React, { useEffect, useRef, useState } from 'react';
import useStudentStore from '../store/useStudentStore';
import Loading from './Loading';
import CoursCard from './CoursCard';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const PlatformCourses = ({ searchTerm, scrollToCourses, setScrollToCourses }) => {
  const { courses, getCourses, loading, error } = useStudentStore();
  const coursesSectionRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [coursesPerPage] = useState(8); // 2 rows of 4 courses

  useEffect(() => {
    getCourses();
  }, []);

  useEffect(() => {
    if (scrollToCourses && coursesSectionRef.current) {
      window.scrollTo({
        top: coursesSectionRef.current.offsetTop - 100,
        behavior: 'smooth',
      });
      setScrollToCourses(false);
    }
  }, [scrollToCourses, setScrollToCourses]);

  // Filter courses based on search term
  const filteredCourses = courses.filter(course =>
    course.titre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate pagination
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = filteredCourses.slice(indexOfFirstCourse, indexOfLastCourse);
  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);

  // Handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
  // Handle previous/next buttons
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  if (loading) return <Loading>Chargement des Données...</Loading>;
  if (error) return <div className="text-red-500 text-center py-8">{error}</div>;

  return (
    <div ref={coursesSectionRef} className="bg-black p-4">
      <div className="max-w-7xl px-4 mx-auto">
        <div className="text-center py-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            Liste Des <span className="text-sky-400">Cours</span>
          </h1>
          <p className="text-sky-300 max-w-2xl mx-auto mt-3">
            {filteredCourses.length} cours disponibles - Page {currentPage} sur {totalPages}
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pb-12">
          {currentCourses.map((course) => (
            <CoursCard course={course} key={course.id} />
          ))}
        </div>
        {/* Pagination controls - only show if more than one page */}
        {totalPages > 1 && (
          <div className="flex flex-col items-center py-8 border-t border-sky-800">
            <div className="flex items-center space-x-2 mb-4">
              <button
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
                className={`flex items-center justify-center w-10 h-10 rounded-full ${
                  currentPage === 1 
                    ? 'bg-gray-800 text-gray-600 cursor-not-allowed' 
                    : 'bg-sky-800 text-white hover:bg-sky-700'
                }`}
              >
                <FiChevronLeft size={20} />
              </button>
              
              {/* Page numbers */}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
                <button
                  key={number}
                  onClick={() => paginate(number)}
                  className={`flex items-center justify-center w-10 h-10 rounded-full ${
                    currentPage === number
                      ? 'bg-sky-500 text-white'
                      : 'bg-sky-900 text-sky-300 hover:bg-sky-800'
                  }`}
                >
                  {number}
                </button>
              ))}
              
              <button
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
                className={`flex items-center justify-center w-10 h-10 rounded-full ${
                  currentPage === totalPages 
                    ? 'bg-gray-800 text-gray-600 cursor-not-allowed' 
                    : 'bg-sky-800 text-white hover:bg-sky-700'
                }`}
              >
                <FiChevronRight size={20} />
              </button>
            </div>
            
            <p className="text-sky-400 text-sm">
              Affichage des cours {indexOfFirstCourse + 1} à {Math.min(indexOfLastCourse, filteredCourses.length)} sur {filteredCourses.length}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlatformCourses;