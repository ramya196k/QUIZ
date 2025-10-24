import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Import models
import { User } from './server/src/models/User.js';
import { Quiz } from './server/src/models/Quiz.js';

const sampleQuizzes = [
  {
    title: "JavaScript Fundamentals",
    category: "Programming",
    difficulty: "easy",
    questions: [
      {
        questionText: "What is the correct way to declare a variable in JavaScript?",
        options: ["var name = 'John'", "variable name = 'John'", "v name = 'John'", "declare name = 'John'"],
        correctAnswer: "var name = 'John'"
      },
      {
        questionText: "Which method is used to add an element to the end of an array?",
        options: ["push()", "pop()", "shift()", "unshift()"],
        correctAnswer: "push()"
      },
      {
        questionText: "What does 'DOM' stand for?",
        options: ["Document Object Model", "Data Object Management", "Dynamic Object Method", "Document Oriented Markup"],
        correctAnswer: "Document Object Model"
      }
    ]
  },
  {
    title: "React Basics",
    category: "Frontend",
    difficulty: "medium",
    questions: [
      {
        questionText: "What is JSX?",
        options: ["JavaScript XML", "Java Syntax Extension", "JavaScript Extension", "JSON XML"],
        correctAnswer: "JavaScript XML"
      },
      {
        questionText: "Which hook is used to manage state in functional components?",
        options: ["useState", "useEffect", "useContext", "useReducer"],
        correctAnswer: "useState"
      },
      {
        questionText: "What is the purpose of useEffect hook?",
        options: ["State management", "Side effects", "Event handling", "Component mounting"],
        correctAnswer: "Side effects"
      }
    ]
  },
  {
    title: "Node.js & Express",
    category: "Backend",
    difficulty: "hard",
    questions: [
      {
        questionText: "What is middleware in Express.js?",
        options: ["Database connection", "Functions that execute during request processing", "Template engine", "Static file server"],
        correctAnswer: "Functions that execute during request processing"
      },
      {
        questionText: "Which method is used to handle POST requests in Express?",
        options: ["app.get()", "app.post()", "app.put()", "app.delete()"],
        correctAnswer: "app.post()"
      },
      {
        questionText: "What does 'npm' stand for?",
        options: ["Node Package Manager", "New Project Manager", "Network Package Manager", "Node Project Manager"],
        correctAnswer: "Node Package Manager"
      }
    ]
  }
];

async function createSampleData() {
  try {
    // Connect to MongoDB
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/quiz-app';
    await mongoose.connect(mongoURI);
    console.log('Connected to MongoDB');

    // Create admin user
    const adminUser = new User({
      name: 'Admin User',
      email: 'admin@quizapp.com',
      password: await bcrypt.hash('admin123', 10),
      role: 'admin'
    });

    await adminUser.save();
    console.log('Admin user created:', adminUser.email);

    // Create sample quizzes
    for (const quizData of sampleQuizzes) {
      const quiz = new Quiz({
        ...quizData,
        createdBy: adminUser._id
      });
      await quiz.save();
      console.log('Quiz created:', quiz.title);
    }

    console.log('Sample data created successfully!');
    console.log('Admin login: admin@quizapp.com / admin123');
    
  } catch (error) {
    console.error('Error creating sample data:', error);
  } finally {
    await mongoose.disconnect();
  }
}

createSampleData();
