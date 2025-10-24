import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-2xl font-bold text-primary">
            Quiz App
          </Link>
          
          <div className="flex items-center space-x-4">
            <Link 
              to="/quizzes" 
              className="text-gray-700 hover:text-primary transition-colors"
            >
              Quizzes
            </Link>
            
            <Link 
              to="/leaderboard" 
              className="text-gray-700 hover:text-primary transition-colors"
            >
              Leaderboard
            </Link>
            
            {user ? (
              <div className="flex items-center space-x-4">
                {user.role === 'admin' && (
                  <Link 
                    to="/admin" 
                    className="text-gray-700 hover:text-primary transition-colors"
                  >
                    Admin
                  </Link>
                )}
                
                <span className="text-gray-700">
                  Welcome, {user.name}
                </span>
                
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link 
                  to="/login" 
                  className="text-gray-700 hover:text-primary transition-colors"
                >
                  Login
                </Link>
                
                <Link 
                  to="/register" 
                  className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition-colors"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
