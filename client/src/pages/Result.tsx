import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { quizAPI } from '../utils/api';
import { Quiz } from '../types';
import toast from 'react-hot-toast';

const Result: React.FC = () => {
  const { quizId } = useParams<{ quizId: string }>();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuiz = async () => {
      if (!quizId) return;
      
      try {
        const response = await quizAPI.getQuizById(quizId);
        setQuiz(response.data.quiz);
      } catch (error) {
        toast.error('Failed to load quiz details');
        navigate('/quizzes');
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [quizId, navigate]);

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreMessage = (score: number) => {
    if (score >= 90) return 'Excellent! Outstanding performance!';
    if (score >= 80) return 'Great job! Well done!';
    if (score >= 70) return 'Good work! Keep it up!';
    if (score >= 60) return 'Not bad! Room for improvement.';
    return 'Keep practicing! You can do better!';
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Quiz not found</h2>
        <button
          onClick={() => navigate('/quizzes')}
          className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-indigo-600 transition-colors"
        >
          Back to Quizzes
        </button>
      </div>
    );
  }

  // Get the result from localStorage (set by QuizPage)
  const result = JSON.parse(localStorage.getItem('lastQuizResult') || '{}');

  return (
    <div className="max-w-4xl mx-auto">
      {/* Score Summary */}
      <div className="bg-white rounded-lg shadow-lg p-8 mb-6 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Quiz Completed!
        </h1>
        
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            {quiz.title}
          </h2>
          <p className="text-gray-600">
            {quiz.category} • {quiz.difficulty}
          </p>
        </div>
        
        <div className="mb-6">
          <div className={`text-6xl font-bold ${getScoreColor(result.score || 0)}`}>
            {result.score || 0}%
          </div>
          <p className="text-lg text-gray-600 mt-2">
            {result.correctAnswers || 0} out of {result.totalQuestions || quiz.questions.length} correct
          </p>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <p className={`text-lg font-medium ${getScoreColor(result.score || 0)}`}>
            {getScoreMessage(result.score || 0)}
          </p>
        </div>
        
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => navigate('/quizzes')}
            className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-indigo-600 transition-colors"
          >
            Take Another Quiz
          </button>
          
          <button
            onClick={() => navigate('/leaderboard')}
            className="bg-secondary text-white px-6 py-3 rounded-lg hover:bg-amber-600 transition-colors"
          >
            View Leaderboard
          </button>
        </div>
      </div>

      {/* Detailed Results */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          Question Review
        </h3>
        
        <div className="space-y-6">
          {quiz.questions.map((question, index) => {
            const userAnswer = result.answers?.find((a: any) => a.questionId === question._id);
            const isCorrect = userAnswer?.isCorrect;
            
            return (
              <div key={question._id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <h4 className="font-medium text-gray-900">
                    Question {index + 1}
                  </h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {isCorrect ? 'Correct' : 'Incorrect'}
                  </span>
                </div>
                
                <p className="text-gray-700 mb-3">
                  {question.questionText}
                </p>
                
                <div className="space-y-2">
                  {question.options.map((option, optionIndex) => {
                    const isSelected = userAnswer?.selectedAnswer === option;
                    const isCorrectAnswer = option === question.correctAnswer;
                    
                    return (
                      <div
                        key={optionIndex}
                        className={`p-2 rounded ${
                          isCorrectAnswer
                            ? 'bg-green-50 border border-green-200'
                            : isSelected
                            ? 'bg-red-50 border border-red-200'
                            : 'bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center">
                          <span className={`w-2 h-2 rounded-full mr-2 ${
                            isCorrectAnswer
                              ? 'bg-green-500'
                              : isSelected
                              ? 'bg-red-500'
                              : 'bg-gray-300'
                          }`}></span>
                          <span className={`${
                            isCorrectAnswer
                              ? 'text-green-800 font-medium'
                              : isSelected
                              ? 'text-red-800'
                              : 'text-gray-600'
                          }`}>
                            {option}
                          </span>
                          {isCorrectAnswer && (
                            <span className="ml-2 text-green-600 font-medium text-sm">
                              ✓ Correct Answer
                            </span>
                          )}
                          {isSelected && !isCorrectAnswer && (
                            <span className="ml-2 text-red-600 font-medium text-sm">
                              ✗ Your Answer
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Result;
