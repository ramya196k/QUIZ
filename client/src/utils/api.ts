import axios from 'axios';
import toast from 'react-hot-toast';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    
    const message = error.response?.data?.message || 'Something went wrong';
    toast.error(message);
    
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (name: string, email: string, password: string) =>
    api.post('/auth/register', { name, email, password }),
  
  login: (email: string, password: string) =>
    api.post('/auth/login', { email, password }),
  
  getProfile: () => api.get('/auth/profile'),
};

// Quiz API
export const quizAPI = {
  getAllQuizzes: () => api.get('/quizzes'),
  
  getQuizById: (id: string) => api.get(`/quizzes/${id}`),
  
  createQuiz: (quizData: any) => api.post('/quizzes', quizData),
  
  updateQuiz: (id: string, quizData: any) => api.put(`/quizzes/${id}`, quizData),
  
  deleteQuiz: (id: string) => api.delete(`/quizzes/${id}`),
};

// Result API
export const resultAPI = {
  submitResult: (resultData: any) => api.post('/results', resultData),
  
  getUserResults: (userId: string) => api.get(`/results/user/${userId}`),
  
  getLeaderboard: () => api.get('/results/leaderboard'),
};

export default api;
