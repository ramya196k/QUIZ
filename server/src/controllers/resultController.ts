import { Request, Response } from 'express';
import { Result } from '../models/Result';
import { User } from '../models/User';
import { Quiz } from '../models/Quiz';
import { AuthRequest } from '../middleware/auth';

export const submitResult = async (req: AuthRequest, res: Response) => {
  try {
    const { quizId, answers } = req.body;

    // Get quiz to validate answers
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    // Calculate score
    let correctAnswers = 0;
    const processedAnswers = answers.map((answer: any) => {
      const question = quiz.questions.find(q => q._id?.toString() === answer.questionId);
      const isCorrect = question?.correctAnswer === answer.selectedAnswer;
      
      if (isCorrect) {
        correctAnswers++;
      }

      return {
        questionId: answer.questionId,
        selectedAnswer: answer.selectedAnswer,
        isCorrect,
      };
    });

    const score = Math.round((correctAnswers / quiz.questions.length) * 100);

    // Save result
    const result = new Result({
      userId: req.user!._id,
      quizId,
      score,
      totalQuestions: quiz.questions.length,
      correctAnswers,
      answers: processedAnswers,
    });

    await result.save();

    // Update user's total score and quiz history
    const user = await User.findById(req.user!._id);
    if (user) {
      user.totalScore += score;
      user.quizHistory.push({
        quizId: quiz._id,
        score,
        date: new Date(),
      });
      await user.save();
    }

    res.status(201).json({
      message: 'Result submitted successfully',
      result: {
        score,
        totalQuestions: quiz.questions.length,
        correctAnswers,
        percentage: score,
      },
    });
  } catch (error) {
    console.error('Submit result error:', error);
    res.status(500).json({ message: 'Server error submitting result' });
  }
};

export const getUserResults = async (req: AuthRequest, res: Response) => {
  try {
    const { userId } = req.params;

    // Check if user is requesting their own results or is admin
    if (userId !== req.user!._id.toString() && req.user!.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to view these results' });
    }

    const results = await Result.find({ userId })
      .populate('quizId', 'title category difficulty')
      .sort({ date: -1 });

    res.json({ results });
  } catch (error) {
    console.error('Get user results error:', error);
    res.status(500).json({ message: 'Server error fetching results' });
  }
};

export const getLeaderboard = async (req: Request, res: Response) => {
  try {
    const users = await User.find({ role: 'user' })
      .select('name totalScore quizHistory')
      .sort({ totalScore: -1 })
      .limit(10);

    const leaderboard = users.map(user => ({
      name: user.name,
      totalScore: user.totalScore,
      quizzesCompleted: user.quizHistory.length,
    }));

    res.json({ leaderboard });
  } catch (error) {
    console.error('Get leaderboard error:', error);
    res.status(500).json({ message: 'Server error fetching leaderboard' });
  }
};