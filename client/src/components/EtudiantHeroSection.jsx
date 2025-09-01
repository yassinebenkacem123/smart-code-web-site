import React, { useState } from 'react';
import { Search } from 'lucide-react';
import StudentNavBar from '../components/StudentNavBar';
import Logo from './Logo';
import { NavLink } from 'react-router-dom';
import { IoMdLogOut } from "react-icons/io";
import useAuthStore from "../store/useAuthStore";
import { useNavigate } from 'react-router-dom';
import StudentForm from './StudentForm';
const EtudiantHeroSection = ({setSearchTerm, setScrollToCourses}) => {
  const [searchValue, setSearchValue] = useState('');
  const {logout} = useAuthStore();
  const [openStudentForm, setOpenStudentForm] = useState(false);

  const navigate = useNavigate(); 
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    setSearchTerm(value.toLowerCase());
  };

  return (
    <div className="relative mb-5 h-screen overflow-hidden">
      {openStudentForm && 
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md  rounded-2xl shadow-xl p-6 relative">
            <StudentForm setOpenStudentForm={setOpenStudentForm} />
          </div>
        </div>
      }
      {/* Animated background elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sky-400/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-20 left-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px]"></div>
      </div>
      
      {/* Top Navigation */}
      <div className="relative z-10 flex justify-between items-center px-10 py-5">
        <Logo />
        <div 
        className='py-2 px-4  border-sky-400/50 border rounded-2xl  bg-gray-600/50 shadow-lg'>
          <StudentNavBar 
          openStudentForm={openStudentForm}
          setOpenStudentForm={setOpenStudentForm} />
        </div>
        <NavLink 
        className="flex rounded-full bg-sky-400 px-2 py-1 items-center gap-2 text-xl  hover:bg-sky-400/80 duration-200 ease-in"
        onClick={logout} to="/">
         Log out
        <IoMdLogOut />
      </NavLink>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-[85vh] flex flex-col md:flex-row items-center justify-between px-4 md:px-8 py-10">
        {/* Text Content */}
        <div className="w-full md:w-1/2 flex flex-col gap-6 mb-10 md:mb-0">
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-chela-one text-white bg-clip-text bg-gradient-to-r from-white to-sky-300">
              Bienvenue sur <span className="text-primary">SmartCode</span>
            </h1>
            <h2 className="text-lg md:text-xl mt-4 text-gray-400 font-medium">
              Prêt pour une nouvelle leçon ?
            </h2>
          </div>
          
          <div className="flex flex-wrap justify-center md:justify-start gap-4">
            <button 
              onClick={() => setScrollToCourses(true)}
              className="px-6 py-3  bg-sky-400 cursor-pointer hover:bg-sky-400/80 text-white rounded-2xl font-medium  transition-all duration-300  transform hover:-translate-y-1"
            >
              Explorer les cours
            </button>
            <button 
            onClick={()=>{
              navigate('/etudiant-dashboard/cours')
            }}
            className="px-6 py-3 cursor-pointer  bg-white/20 backdrop-blur-sm text-white rounded-2xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-white/30 transform hover:-translate-y-1">
              Voir Vos Course
            </button>
          </div>
          
          {/* Search Bar */}
          <div className="mt-6 w-full max-w-lg">
            <div className="flex rounded-full p-1 items-center justify-between bg-white shadow-xl">
              <input 
                type="text" 
                value={searchValue}
                onChange={handleSearch}
                placeholder="Rechercher un cours..."
                className="w-full bg-transparent outline-none px-6 py-3 text-gray-800 placeholder:text-gray-500 rounded-full text-sm md:text-base"
              />
              <button 
                onClick={() => setScrollToCourses(true)}
                className=" bg-primary cursor-pointer text-white px-5 font-medium py-3 rounded-full hover:opacity-90 transition-all duration-300 flex items-center shadow-lg hover:shadow-xl"
              >
                Rechercher...
                <Search size={20} className="ml-2" />
              </button>
            </div>
          </div>
        </div>
        
        {/* Image Section */}
        <div className="w-full md:w-1/2 flex justify-center">
          <div className="relative w-[250px] h-[250px] md:w-[350px] md:h-[350px]">
            <div className="relative w-full h-full">
              {/* Image */}
              <div className="relative border-2 border-white rounded-4xl bg-sky-400/20 w-full h-full flex items-center justify-center">
                <img
                  src="../../src/assets/searching.png"
                  alt="avatar"
                  className="relative  scale-x-[-1] z-10 object-contain w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default EtudiantHeroSection;