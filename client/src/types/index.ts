export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  totalScore: number;
}

export interface Question {
  _id: string;
  questionText: string;
  options: string[];
  correctAnswer: string;
}

export interface Quiz {
  _id: string;
  title: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  questions: Question[];
  createdBy: {
    _id: string;
    name: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface QuizResult {
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  percentage: number;
}

export interface Result {
  _id: string;
  userId: string;
  quizId: Quiz;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  answers: Array<{
    questionId: string;
    selectedAnswer: string;
    isCorrect: boolean;
  }>;
  date: string;
}

export interface LeaderboardEntry {
  name: string;
  totalScore: number;
  quizzesCompleted: number;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

export interface QuizContextType {
  quizzes: Quiz[];
  currentQuiz: Quiz | null;
  currentQuestionIndex: number;
  answers: Record<string, string>;
  setQuizzes: (quizzes: Quiz[]) => void;
  setCurrentQuiz: (quiz: Quiz | null) => void;
  setCurrentQuestionIndex: (index: number) => void;
  setAnswer: (questionId: string, answer: string) => void;
  resetQuiz: () => void;
}
