import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useQuiz } from '../context/QuizContext';
import { quizAPI, resultAPI } from '../utils/api';
import { Quiz, Question } from '../types';
import toast from 'react-hot-toast';

const QuizPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { currentQuiz, setCurrentQuiz, currentQuestionIndex, setCurrentQuestionIndex, answers, setAnswer, resetQuiz } = useQuiz();
  
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes per quiz
  const [quizStarted, setQuizStarted] = useState(false);

  useEffect(() => {
    const fetchQuiz = async () => {
      if (!id) return;
      
      try {
        const response = await quizAPI.getQuizById(id);
        setCurrentQuiz(response.data.quiz);
        setQuizStarted(true);
      } catch (error) {
        toast.error('Failed to load quiz');
        navigate('/quizzes');
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [id, setCurrentQuiz, navigate]);

  useEffect(() => {
    if (!quizStarted) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleSubmitQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [quizStarted]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (questionId: string, answer: string) => {
    setAnswer(questionId, answer);
  };

  const handleNextQuestion = () => {
    if (currentQuiz && currentQuestionIndex < currentQuiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmitQuiz = async () => {
    if (!currentQuiz || !user) return;

    const answersArray = Object.entries(answers).map(([questionId, selectedAnswer]) => ({
      questionId,
      selectedAnswer,
    }));

    try {
      const response = await resultAPI.submitResult({
        quizId: currentQuiz._id,
        answers: answersArray,
      });

      // Store result in localStorage for the Result page
      localStorage.setItem('lastQuizResult', JSON.stringify(response.data.result));

      resetQuiz();
      navigate(`/result/${currentQuiz._id}`);
    } catch (error) {
      toast.error('Failed to submit quiz');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!currentQuiz) {
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

  const currentQuestion: Question = currentQuiz.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === currentQuiz.questions.length - 1;
  const isFirstQuestion = currentQuestionIndex === 0;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-900">{currentQuiz.title}</h1>
          <div className="text-right">
            <div className="text-sm text-gray-600">Time Remaining</div>
            <div className={`text-2xl font-bold ${timeLeft < 60 ? 'text-red-600' : 'text-gray-900'}`}>
              {formatTime(timeLeft)}
            </div>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="text-gray-600">
            Question {currentQuestionIndex + 1} of {currentQuiz.questions.length}
          </div>
          <div className="text-gray-600">
            {currentQuiz.category} • {currentQuiz.difficulty}
          </div>
        </div>
        
        {/* Progress bar */}
        <div className="mt-4">
          <div className="bg-gray-200 rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{
                width: `${((currentQuestionIndex + 1) / currentQuiz.questions.length) * 100}%`,
              }}
            ></div>
          </div>
        </div>
      </div>

      {/* Question */}
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          {currentQuestion.questionText}
        </h2>
        
        <div className="space-y-3">
          {currentQuestion.options.map((option, index) => (
            <label
              key={index}
              className={`block p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                answers[currentQuestion._id] === option
                  ? 'border-primary bg-indigo-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <input
                type="radio"
                name={`question-${currentQuestion._id}`}
                value={option}
                checked={answers[currentQuestion._id] === option}
                onChange={() => handleAnswerSelect(currentQuestion._id, option)}
                className="sr-only"
              />
              <div className="flex items-center">
                <div className={`w-4 h-4 rounded-full border-2 mr-3 ${
                  answers[currentQuestion._id] === option
                    ? 'border-primary bg-primary'
                    : 'border-gray-300'
                }`}>
                  {answers[currentQuestion._id] === option && (
                    <div className="w-2 h-2 bg-white rounded-full m-0.5"></div>
                  )}
                </div>
                <span className="text-gray-900">{option}</span>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center mt-6">
        <button
          onClick={handlePreviousQuestion}
          disabled={isFirstQuestion}
          className={`px-6 py-3 rounded-lg transition-colors ${
            isFirstQuestion
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-gray-500 text-white hover:bg-gray-600'
          }`}
        >
          Previous
        </button>
        
        <div className="flex space-x-4">
          <button
            onClick={() => navigate('/quizzes')}
            className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            Exit Quiz
          </button>
          
          {isLastQuestion ? (
            <button
              onClick={handleSubmitQuiz}
              className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              Submit Quiz
            </button>
          ) : (
            <button
              onClick={handleNextQuestion}
              className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-indigo-600 transition-colors"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
