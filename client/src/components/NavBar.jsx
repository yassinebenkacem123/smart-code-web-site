import { useState } from "react";
import { Link } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
import { Home, LogIn, LogOut, MessageSquare, Settings, User, Menu, X } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import Logo from "./Logo";
const Navbar = () => {
  const { logout, user, role, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="flex px-15 items-center justify-between  shadow-sm">
      {/* Logo */}
      <Logo />
      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center w-[65%] justify-between gap-6">
        <div className="flex bg-sky-400/10 border border-sky-400/40 px-6 rounded-full py-1 items-center gap-6">
          <NavLink 
            to="/" 
            className={({isActive}) => 
              `text-sm  ${isActive ? 'text-white  bg-primary/70 px-3 py-[2px]  rounded-full ' : 'text-gray-300'}`
            }
          >
            Accueil
          </NavLink>
          <NavLink 
            to="/about" 
            className={({isActive}) => 
              `text-sm ${isActive ? 'text-white  bg-primary/70 px-3 py-[2px]  rounded-full ' : 'text-gray-300'}`
            }
          >
            À propos
          </NavLink>
          <button 
            onClick={() => navigate(`${role}-dashboard`)}
            disabled={!isAuthenticated || !user}
            className={`flex gap-2 text-sm items-center ${!isAuthenticated || !user ? 'opacity-30 cursor-not-allowed' : 'hover:text-primary cursor-pointer'}`}
          >
            <User className="size-5" />
            <span>Dashboard</span>
          </button>
        </div>
        
        <div className="flex items-center gap-2">
          {isAuthenticated ? (
            <button 
              className="flex bg-primary  text-white cursor-pointer py-1 px-2 rounded-full gap-2 items-center hover:bg-primary/90 transition"
              onClick={()=>{
                logout();
                navigate('/')
              }
              }
            >
              <LogOut className="size-5" />
              <span>Logout</span>
            </button>
          ) : (
            <Link to="/login">
              <button className="flex bg-primary  text-white cursor-pointer py-1 px-2 rounded-full gap-2 items-center hover:bg-primary/90 transition">
                <LogIn className="size-5" />
                <span>Login</span>
              </button>
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Menu Button */}
      <button 
        className="md:hidden text-gray-600 focus:outline-none"
        onClick={toggleMenu}
      >
        {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-50" onClick={closeMenu}>
          <div 
            className="absolute top-0 right-0 h-full w-3/4 bg-white p-6 shadow-lg transform transition-transform"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex flex-col gap-8">
              <button 
                className="self-end text-gray-600"
                onClick={closeMenu}
              >
                <X size={28} />
              </button>
              
              <div className="flex flex-col gap-6">
                <NavLink 
                  to="/" 
                  className={({isActive}) => 
                    `flex items-center gap-3 text-lg ${isActive ? 'text-primary font-medium' : 'text-gray-600'}`
                  }
                  onClick={closeMenu}
                >
                  <Home size={20} />
                  <span>Accueil</span>
                </NavLink>
                
                <NavLink 
                  to="/about" 
                  className={({isActive}) => 
                    `flex items-center gap-3 text-lg ${isActive ? 'text-primary font-medium' : 'text-gray-600'}`
                  }
                  onClick={closeMenu}
                >
                  <MessageSquare size={20} />
                  <span>À propos</span>
                </NavLink>
                
                <button 
                  onClick={() => {
                    navigate(`${role}-dashboard`);
                    closeMenu();
                  }}
                  disabled={!isAuthenticated || !user}
                  className={`flex items-center gap-3 text-lg ${!isAuthenticated || !user ? 'opacity-50 cursor-not-allowed' : 'text-gray-600'}`}
                >
                  <User size={20} />
                  <span>Dashboard</span>
                </button>
              </div>
              
              <div className="mt-8 border-t pt-6">
                {isAuthenticated ? (
                  <button 
                    className="flex items-center gap-3 text-lg text-gray-600 w-full"
                    onClick={() => {
                      logout();
                      closeMenu();
                    }}
                  >
                    <LogOut size={20} />
                    <span>Logout</span>
                  </button>
                ) : (
                  <Link to="/login" className="w-full" onClick={closeMenu}>
                    <button className="flex bg-primary text-white py-3 px-6 rounded-lg gap-3 items-center w-full justify-center">
                      <LogIn size={20} />
                      <span>Login</span>
                    </button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;