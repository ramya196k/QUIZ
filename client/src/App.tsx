import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { QuizProvider } from './context/QuizContext';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import QuizList from './pages/QuizList';
import QuizPage from './pages/QuizPage';
import Result from './pages/Result';
import Leaderboard from './pages/Leaderboard';
import AdminDashboard from './pages/AdminDashboard';

// Components
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <QuizProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Navbar />
            <main className="container mx-auto px-4 py-8">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/quizzes" element={<QuizList />} />
                <Route 
                  path="/quiz/:id" 
                  element={
                    <ProtectedRoute>
                      <QuizPage />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/result/:quizId" 
                  element={
                    <ProtectedRoute>
                      <Result />
                    </ProtectedRoute>
                  } 
                />
                <Route path="/leaderboard" element={<Leaderboard />} />
                <Route 
                  path="/admin" 
                  element={
                    <ProtectedRoute requireAdmin>
                      <AdminDashboard />
                    </ProtectedRoute>
                  } 
                />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
            <Toaster position="top-right" />
          </div>
        </Router>
      </QuizProvider>
    </AuthProvider>
  );
}

export default App;
