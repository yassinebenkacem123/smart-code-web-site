import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  FaChartBar,
  FaUser,
  FaUserGraduate,
  FaBook,
  FaChalkboardTeacher,
  FaBars,
  FaTimes,
  FaHome,
} from 'react-icons/fa';
import useAuthStore from '../store/useAuthStore';
import {jwtDecode} from 'jwt-decode'; // Corrected import
import { GiSpellBook } from "react-icons/gi";
import { MdAdminPanelSettings,MdOutlineAdminPanelSettings, MdKeyboardDoubleArrowLeft } from 'react-icons/md';
import { PiChalkboardTeacherFill } from "react-icons/pi";

const SideBar = ({role}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const token = useAuthStore((state) => state.token);
  const [userEmail, setUserEmail] = useState('');

  // Function to decode the token and extract the email
  const getEmailFromToken = (token) => {
    try {
      const decodedToken = jwtDecode(token);
      setUserEmail(decodedToken.email);
    } catch (error) {
      console.error('Invalid token:', error);
      setUserEmail('');
    }
  };

  // Effect to decode the token when the component mounts or token changes
  useEffect(() => {
    if (token) {
      getEmailFromToken(token);
    }
  }, [token]);

  // Menu items for the sidebar
  const AdminItems = [
    {
      path: '/admin-dashboard',
      name: 'Dashboard',
      icon: <FaChartBar className="text-lg" />,
      index: true,
    },
    {
      path: '/admin-dashboard/profile',
      name: 'Profile',
      icon: <FaUser className="text-lg" />,
    },
    {
      path: '/admin-dashboard/students',
      name: 'Students',
      icon: <FaUserGraduate className="text-lg" />,
    },
    {
      path: '/admin-dashboard/professor',
      name: 'Professors',
      icon: <FaChalkboardTeacher className="text-lg" />,
    },
    {
      path:'/admin-dashboard/admins',
      name: 'Admins',
      icon:<MdOutlineAdminPanelSettings className='text-lg'/>
    },
    {
      path: '/',
      name: 'Back to Home',
      icon: <FaHome className="text-lg" />,
    },
  ];
  const professorItems = [
    {
      path:'/enseignant-dashboard',
      name: 'Dashboard',
      icon: <FaChartBar className="text-lg" />,
    },
    {
      path: '/enseignant-dashboard/profile',
      name: 'Profile',
      icon: <FaUser className="text-lg" />,
    },
    {
      path: '/enseignant-dashboard/courses',
      name: 'Courses',
      icon: <FaBook className="text-lg" />,
    },
    {
      path: '/enseignant-dashboard/ajout-test',
      name: 'Tests',
      icon: <GiSpellBook className="text-lg" />,
    },
    {
      path:'/',
      name: 'Back to Home',
      icon: <FaHome className="text-lg" />,
    }
  ];
  const menuItems = role === 'admin' ? AdminItems : professorItems;

  // Toggle sidebar open/close
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Toggle sidebar collapse/expand
  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  // Close sidebar for mobile view
  const closeSidebar = () => {
    if (window.innerWidth < 1024) {
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-2 z-50">
        <button
          onClick={toggleSidebar}
          className="bg-gradient-to-r from-sky-600 to-sky-500 text-white p-2 rounded-lg shadow-lg"
        >
          {isOpen ? <FaTimes size={14} /> : <FaBars size={14} />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed lg:sticky inset-y-0 left-0 z-40 bg-gradient-to-b from-sky-900/20 to-sky-900/20 text-white transition-all duration-300 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } ${isCollapsed ? 'w-20' : 'w-64'} shadow-2xl border-r border-sky-700/30`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div
            className={`p-4 flex items-center justify-between border-b border-sky-700/30 ${
              isCollapsed ? 'flex-col gap-2' : 'gap-1'
            }`}
          >
            <div className={`flex items-center w-full gap-2 ${isCollapsed ? 'flex-col' : ''}`}>
              <h1
                className={`font-bold text-center w-full text-white ${
                  isCollapsed ? 'text-xs' : 'text-lg'
                }`}
              >
                {role === 'admin' ? 'Admin Dashboard' : 'Enseignant Dashboard'}
              </h1>
            </div>
            <button
              onClick={toggleCollapse}
              className={`p-1 rounded-full bg-sky-700/30 hover:bg-sky-600/60 cursor-pointer transition-all ${
                isCollapsed ? 'rotate-180' : ''
              }`}
            >
              <MdKeyboardDoubleArrowLeft size={20} className="text-sky-300" />
            </button>
          </div>

          {/* User info */}
          <div
            className={`p-4 flex items-center border-b border-sky-700/30 ${
              isCollapsed ? 'flex-col gap-2 justify-center' : 'gap-4'
            }`}
          >
            <div className="bg-sky-900/30 border-2 border-sky-500/20 rounded-full p-1">
            {
              role === 'admin' ?
              <MdAdminPanelSettings size={isCollapsed ? 20 : 30} className="text-sky-400" />
            :
              <PiChalkboardTeacherFill size={isCollapsed ? 20 : 30} className="text-sky-400" />
            }
            </div>
            {!isCollapsed && (
              <div>
                <p className="text-sky-300 text-sm truncate max-w-[150px]">{userEmail || 'no email trouvé'}</p>
              </div>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4">
            <ul className="space-y-1 px-2">
              {menuItems.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    end
                    onClick={closeSidebar}
                    className={({ isActive }) =>
                      `flex items-center gap-3 p-3 rounded-lg transition-all ${
                        isActive || (item.index && location.pathname === '/admin-dashboard')
                          ? 'bg-sky-700/50 text-white shadow-lg'
                          : 'text-sky-300 hover:bg-sky-800/30'
                      } ${isCollapsed ? 'justify-center' : ''}`
                    }
                  >
                    <span className="text-sky-400">{item.icon}</span>
                    {!isCollapsed && <span>{item.name}</span>}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/90 z-30 lg:hidden"
          onClick={closeSidebar}
        />
      )}
    </>
  );
};

export default SideBar;