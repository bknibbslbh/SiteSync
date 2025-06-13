import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ClipboardCheck, LayoutDashboard, Settings, LogOut, User as UserIcon } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    closeMenu();
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-primary-800 text-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 text-xl font-semibold"
            onClick={closeMenu}
          >
            <ClipboardCheck size={24} />
            <span>SiteSync</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {currentUser && (
              <>
                <Link 
                  to="/dashboard" 
                  className={`hover:text-primary-200 transition-colors ${
                    isActive('/dashboard') ? 'text-white font-medium' : 'text-primary-100'
                  }`}
                >
                  Dashboard
                </Link>
                <Link 
                  to="/logbook" 
                  className={`hover:text-primary-200 transition-colors ${
                    isActive('/logbook') ? 'text-white font-medium' : 'text-primary-100'
                  }`}
                >
                  Logbook
                </Link>
                <Link 
                  to="/scan"

                  className={`hover:text-primary-200 transition-colors ${
                    isActive('/scan') ? 'text-white font-medium' : 'text-primary-100'
                  }`}
                >
                  Scan QR
                </Link>
                {currentUser.role === 'admin' && (
                  <Link 
                    to="/admin" 
                    className={`hover:text-primary-200 transition-colors ${
                      isActive('/admin') ? 'text-white font-medium' : 'text-primary-100'
                    }`}
                  >
                    Admin
                  </Link>
                )}
              </>
            )}
          </nav>

          {/* User Menu (Desktop) */}
          <div className="hidden md:flex items-center space-x-4">
            {currentUser ? (
              <div className="relative group">
                <button className="flex items-center space-x-2 py-2">
                  <div className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center">
                    {currentUser.avatar ? (
                      <img 
                        src={currentUser.avatar} 
                        alt={currentUser.name} 
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <UserIcon size={18} />
                    )}
                  </div>
                  <span>{currentUser.name}</span>
                </button>
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white text-gray-800 transform scale-0 group-hover:scale-100 opacity-0 group-hover:opacity-100 origin-top-right transition-all duration-200 z-50">
                  <div className="py-1">
                    <Link 
                      to="/profile" 
                      className="block px-4 py-2 hover:bg-gray-100 transition-colors flex items-center"
                    >
                      <UserIcon size={16} className="mr-2" />
                      Profile
                    </Link>
                    <Link 
                      to="/settings" 
                      className="block px-4 py-2 hover:bg-gray-100 transition-colors flex items-center"
                    >
                      <Settings size={16} className="mr-2" />
                      Settings
                    </Link>
                    <button 
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors flex items-center"
                    >
                      <LogOut size={16} className="mr-2" />
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Link to="/login" className="bg-primary-600 hover:bg-primary-700 transition-colors px-4 py-2 rounded-md">
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white focus:outline-none"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-primary-900 animate-fade-in">
          <div className="px-4 py-2 space-y-1">
            {currentUser && (
              <>
                <Link 
                  to="/dashboard" 
                  className="block py-3 px-4 hover:bg-primary-800 rounded-md flex items-center"
                  onClick={closeMenu}
                >
                  <LayoutDashboard size={18} className="mr-2" />
                  Dashboard
                </Link>
                <Link 
                  to="/logbook" 
                  className="block py-3 px-4 hover:bg-primary-800 rounded-md flex items-center"
                  onClick={closeMenu}
                >
                  <ClipboardCheck size={18} className="mr-2" />
                  Logbook
                </Link>
                <Link 
                  to="/scan" 
                  className="block py-3 px-4 hover:bg-primary-800 rounded-md flex items-center"
                  onClick={closeMenu}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="mr-2" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="14" height="14" x="5" y="5" rx="1" />
                    <path d="M10 10h4v4h-4z" />
                  </svg>
                  Scan QR
                </Link>
                {currentUser.role === 'admin' && (
                  <Link 
                    to="/admin" 
                    className="block py-3 px-4 hover:bg-primary-800 rounded-md flex items-center"
                    onClick={closeMenu}
                  >
                    <Settings size={18} className="mr-2" />
                    Admin
                  </Link>
                )}
                <div className="pt-4 pb-2 border-t border-primary-700">
                  <div className="flex items-center px-4 py-2">
                    <div className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center mr-2">
                      {currentUser.avatar ? (
                        <img 
                          src={currentUser.avatar} 
                          alt={currentUser.name} 
                          className="w-8 h-8 rounded-full object-cover"
                        />
                      ) : (
                        <UserIcon size={18} />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{currentUser.name}</p>
                      <p className="text-xs text-primary-300">{currentUser.email}</p>
                    </div>
                  </div>
                  <Link 
                    to="/profile" 
                    className="block py-3 px-4 hover:bg-primary-800 rounded-md flex items-center"
                    onClick={closeMenu}
                  >
                    <UserIcon size={18} className="mr-2" />
                    Profile
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="w-full text-left py-3 px-4 hover:bg-primary-800 rounded-md flex items-center"
                  >
                    <LogOut size={18} className="mr-2" />
                    Logout
                  </button>
                </div>
              </>
            )}
            {!currentUser && (
              <Link 
                to="/login" 
                className="block py-3 px-4 text-center bg-primary-600 hover:bg-primary-700 rounded-md"
                onClick={closeMenu}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;