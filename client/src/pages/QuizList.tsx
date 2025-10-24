import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useQuiz } from '../context/QuizContext';
import { quizAPI } from '../utils/api';
import { Quiz } from '../types';
import toast from 'react-hot-toast';

const QuizList: React.FC = () => {
  const { user } = useAuth();
  const { setQuizzes, quizzes } = useQuiz();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await quizAPI.getAllQuizzes();
        setQuizzes(response.data.quizzes);
      } catch (error) {
        toast.error('Failed to load quizzes');
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, [setQuizzes]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'hard':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Available Quizzes
        </h1>
        <p className="text-lg text-gray-600">
          Choose a quiz to test your knowledge
        </p>
      </div>

      {quizzes.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg">
            No quizzes available at the moment.
          </div>
          {user?.role === 'admin' && (
            <Link
              to="/admin"
              className="mt-4 inline-block bg-primary text-white px-6 py-3 rounded-lg hover:bg-indigo-600 transition-colors"
            >
              Create First Quiz
            </Link>
          )}
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quizzes.map((quiz) => (
            <div key={quiz._id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {quiz.title}
                  </h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(quiz.difficulty)}`}>
                    {quiz.difficulty}
                  </span>
                </div>
                
                <p className="text-gray-600 mb-4">
                  <span className="font-medium">Category:</span> {quiz.category}
                </p>
                
                <p className="text-gray-600 mb-4">
                  <span className="font-medium">Questions:</span> {quiz.questions.length}
                </p>
                
                <p className="text-sm text-gray-500 mb-6">
                  Created by {quiz.createdBy.name}
                </p>
                
                <div className="flex justify-between items-center">
                  {user ? (
                    <Link
                      to={`/quiz/${quiz._id}`}
                      className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition-colors"
                    >
                      Start Quiz
                    </Link>
                  ) : (
                    <Link
                      to="/login"
                      className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                    >
                      Login to Start
                    </Link>
                  )}
                  
                  <span className="text-sm text-gray-500">
                    {new Date(quiz.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default QuizList;
