import { Router } from 'express';
import { body } from 'express-validator';
import { getAllQuizzes, getQuizById, createQuiz, updateQuiz, deleteQuiz } from '../controllers/quizController';
import { authenticateToken } from '../middleware/auth';
import { requireAdmin } from '../middleware/auth';
import { handleValidationErrors } from '../middleware/validation';

const router = Router();

// Quiz validation
const quizValidation = [
  body('title').trim().isLength({ min: 3 }).withMessage('Title must be at least 3 characters'),
  body('category').trim().isLength({ min: 2 }).withMessage('Category must be at least 2 characters'),
  body('difficulty').isIn(['easy', 'medium', 'hard']).withMessage('Difficulty must be easy, medium, or hard'),
  body('questions').isArray({ min: 1 }).withMessage('At least one question is required'),
  body('questions.*.questionText').trim().isLength({ min: 10 }).withMessage('Question text must be at least 10 characters'),
  body('questions.*.options').isArray({ min: 2, max: 4 }).withMessage('Each question must have 2-4 options'),
  body('questions.*.correctAnswer').notEmpty().withMessage('Correct answer is required'),
];

// Public routes
router.get('/', getAllQuizzes);
router.get('/:id', getQuizById);

// Protected routes
router.post('/', authenticateToken, quizValidation, handleValidationErrors, createQuiz);
router.put('/:id', authenticateToken, quizValidation, handleValidationErrors, updateQuiz);
router.delete('/:id', authenticateToken, deleteQuiz);

export default router;