import React from 'react';
import { useNavigate } from 'react-router-dom';
const CoursCard = ({ course }) => {
  const navigate = useNavigate();

  return (
    <div 
      className="relative  bg-black border-1 border-white/50  rounded-xl  overflow-hidden transition-all duration-500 hover:scale-[1.02] group"
    >

      
      {/* Course image section */}
      <div className="relative h-40 overflow-hidden">
        {course.image_url ? (
          <img 
            src={course.image_url} 
            alt={course.title} 
            className="w-full h-full object-cover transition-transform duration-700 "
          />
        ) : (
          <div className="bg-gradient-to-br from-sky-300 to-blue-500 w-full h-full flex flex-col items-center justify-center p-4">
            <div className="bg-white/30 backdrop-blur-sm rounded-xl p-6 w-full h-full flex flex-col items-center justify-center">
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mb-4" />
              <span className="text-white font-bold text-xl text-center">{course.titre}</span>
            </div>
          </div>
        )}
        
        {/* Price badge with floating effect */}
        <div className="absolute top-2 right-0 bg-sky-900 shadow shadow-white  text-white px-3 py-1  text-sm font-bold  flex items-center gap-2 ">
          <span className="text-lg">{course.prix}</span>
          <span className="text-xs">MAD</span>
        </div>
      </div>
      
      {/* Course content */}
      <div className="p-2">
        <div className="flex justify-between items-start mb-3">
          <h2 className="text-xl font-bold text-sky-400">{course.titre}</h2>
        </div>
        
        {/* Description with fade effect */}
        <p className="text-white/90 mb-5 h-12 overflow-hidden relative">
          {course.description || "Description du cours non disponible"}
        </p>
        {/* Stats and button */}
        <div className="flex justify-between items-center border-t border-sky-100 pt-4">
          <button 
          onClick={()=>{
            navigate(`enroll-course/${course.id}`);
          }}
          className="relative bg-gradient-to-r from-sky-500 to-blue-400 cursor-pointer text-white px-5 py-2 rounded-lg font-medium overflow-hiddenhover:from-blue-400 hover:to-sky-600 transition-all duration-300 hover:shadow-lg">
            <span className="relative z-10">Voir le cours</span>
          </button>
        </div>
      </div>
      
      {/* Floating elements */}
      <div className="absolute -bottom-3 -right-3 w-8 h-8 rounded-full bg-sky-300"></div>
    </div>
  );
};

export default CoursCard;