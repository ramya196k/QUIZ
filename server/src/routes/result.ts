import { Router } from 'express';
import { body } from 'express-validator';
import { submitResult, getUserResults, getLeaderboard } from '../controllers/resultController';
import { authenticateToken } from '../middleware/auth';
import { handleValidationErrors } from '../middleware/validation';

const router = Router();

// Submit result validation
const submitResultValidation = [
  body('quizId').isMongoId().withMessage('Valid quiz ID is required'),
  body('answers').isArray({ min: 1 }).withMessage('At least one answer is required'),
  body('answers.*.questionId').notEmpty().withMessage('Question ID is required'),
  body('answers.*.selectedAnswer').notEmpty().withMessage('Selected answer is required'),
];

// Public routes
router.get('/leaderboard', getLeaderboard);

// Protected routes
router.post('/', authenticateToken, submitResultValidation, handleValidationErrors, submitResult);
router.get('/user/:userId', authenticateToken, getUserResults);

export default router;