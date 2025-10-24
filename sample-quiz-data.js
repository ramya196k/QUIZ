// Sample quiz data for testing
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

console.log("Sample quiz data ready to be added to the database");
console.log("You can use this data to create quizzes through the admin dashboard");
