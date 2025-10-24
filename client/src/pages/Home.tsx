import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="text-center">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Welcome to Quiz App
        </h1>
        
        <p className="text-xl text-gray-600 mb-8">
          Test your knowledge, challenge yourself, and climb the leaderboard!
        </p>
        
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              🧠 Take Quizzes
            </h2>
            <p className="text-gray-600 mb-6">
              Choose from various categories and difficulty levels. Answer questions 
              and see how you perform!
            </p>
            <Link 
              to="/quizzes"
              className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-indigo-600 transition-colors inline-block"
            >
              Browse Quizzes
            </Link>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              🏆 Leaderboard
            </h2>
            <p className="text-gray-600 mb-6">
              See how you rank against other players. Compete for the top spot!
            </p>
            <Link 
              to="/leaderboard"
              className="bg-secondary text-white px-6 py-3 rounded-lg hover:bg-amber-600 transition-colors inline-block"
            >
              View Leaderboard
            </Link>
          </div>
        </div>
        
        {!user && (
          <div className="bg-blue-50 p-8 rounded-lg">
            <h3 className="text-2xl font-semibold text-blue-800 mb-4">
              Ready to get started?
            </h3>
            <p className="text-blue-600 mb-6">
              Create an account to track your progress and compete with others!
            </p>
            <div className="space-x-4">
              <Link 
                to="/register"
                className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-indigo-600 transition-colors inline-block"
              >
                Sign Up
              </Link>
              <Link 
                to="/login"
                className="bg-white text-primary px-6 py-3 rounded-lg border-2 border-primary hover:bg-primary hover:text-white transition-colors inline-block"
              >
                Login
              </Link>
            </div>
          </div>
        )}
        
        {user && (
          <div className="bg-green-50 p-8 rounded-lg">
            <h3 className="text-2xl font-semibold text-green-800 mb-4">
              Welcome back, {user.name}!
            </h3>
            <p className="text-green-600 mb-4">
              Your total score: <span className="font-bold">{user.totalScore}</span>
            </p>
            <Link 
              to="/quizzes"
              className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-indigo-600 transition-colors inline-block"
            >
              Start a Quiz
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
