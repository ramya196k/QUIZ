import mongoose, { Document, Schema } from 'mongoose';

export interface IQuestion {
  questionText: string;
  options: string[];
  correctAnswer: string;
}

export interface IQuiz extends Document {
  title: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  questions: IQuestion[];
  createdBy: mongoose.Types.ObjectId;
}

const QuestionSchema = new Schema<IQuestion>({
  questionText: {
    type: String,
    required: true,
  },
  options: [{
    type: String,
    required: true,
  }],
  correctAnswer: {
    type: String,
    required: true,
  },
});

const QuizSchema = new Schema<IQuiz>({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    required: true,
    trim: true,
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    required: true,
  },
  questions: [QuestionSchema],
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, {
  timestamps: true,
});

export const Quiz = mongoose.model<IQuiz>('Quiz', QuizSchema);