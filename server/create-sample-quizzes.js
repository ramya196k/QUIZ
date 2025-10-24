const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Import models
const { User } = require('./src/models/User');
const { Quiz } = require('./src/models/Quiz');

const sampleQuizzes = [
  {
    title: "JavaScript Fundamentals",
    category: "JavaScript",
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
      },
      {
        questionText: "Which operator is used for strict equality in JavaScript?",
        options: ["==", "===", "!=", "!=="],
        correctAnswer: "==="
      },
      {
        questionText: "What is the purpose of the 'this' keyword in JavaScript?",
        options: ["Refers to the current object", "Creates a new object", "Deletes an object", "Imports a module"],
        correctAnswer: "Refers to the current object"
      },
      {
        questionText: "Which method is used to convert a string to uppercase?",
        options: ["toUpperCase()", "toUpper()", "upperCase()", "toUppercase()"],
        correctAnswer: "toUpperCase()"
      },
      {
        questionText: "What is the result of typeof null in JavaScript?",
        options: ["null", "undefined", "object", "string"],
        correctAnswer: "object"
      },
      {
        questionText: "Which keyword is used to declare a constant in JavaScript?",
        options: ["var", "let", "const", "constant"],
        correctAnswer: "const"
      },
      {
        questionText: "What does JSON stand for?",
        options: ["JavaScript Object Notation", "Java Standard Object Notation", "JavaScript Oriented Network", "Java Script Object Network"],
        correctAnswer: "JavaScript Object Notation"
      },
      {
        questionText: "Which method is used to remove the last element from an array?",
        options: ["push()", "pop()", "shift()", "unshift()"],
        correctAnswer: "pop()"
      },
      {
        questionText: "What is the purpose of the 'return' statement in a function?",
        options: ["To exit the function", "To return a value", "To stop execution", "All of the above"],
        correctAnswer: "All of the above"
      },
      {
        questionText: "Which method is used to find the length of a string?",
        options: ["length()", ".length", "size()", "count()"],
        correctAnswer: ".length"
      }
    ]
  },
  {
    title: "React Development",
    category: "React",
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
      },
      {
        questionText: "What is the correct way to pass data from parent to child component?",
        options: ["props", "state", "context", "refs"],
        correctAnswer: "props"
      },
      {
        questionText: "Which method is used to update state in a class component?",
        options: ["this.setState()", "this.updateState()", "this.changeState()", "this.modifyState()"],
        correctAnswer: "this.setState()"
      },
      {
        questionText: "What is the purpose of keys in React lists?",
        options: ["Styling", "Performance optimization", "Event handling", "Data validation"],
        correctAnswer: "Performance optimization"
      },
      {
        questionText: "Which hook is used to perform cleanup in functional components?",
        options: ["useEffect with return function", "useCleanup", "useUnmount", "useDispose"],
        correctAnswer: "useEffect with return function"
      },
      {
        questionText: "What is the purpose of React.Fragment?",
        options: ["Group elements without extra DOM node", "Create new components", "Handle events", "Manage state"],
        correctAnswer: "Group elements without extra DOM node"
      },
      {
        questionText: "Which method is used to handle form submissions in React?",
        options: ["onSubmit", "onClick", "onChange", "onFocus"],
        correctAnswer: "onSubmit"
      },
      {
        questionText: "What is the purpose of useCallback hook?",
        options: ["Memoize functions", "Manage state", "Handle side effects", "Create refs"],
        correctAnswer: "Memoize functions"
      },
      {
        questionText: "Which hook is used to access context in functional components?",
        options: ["useContext", "useContextValue", "useContextData", "useContextState"],
        correctAnswer: "useContext"
      },
      {
        questionText: "What is the purpose of React.memo?",
        options: ["Memoize components", "Create components", "Destroy components", "Update components"],
        correctAnswer: "Memoize components"
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
      },
      {
        questionText: "Which module is used to handle file system operations in Node.js?",
        options: ["fs", "file", "filesystem", "path"],
        correctAnswer: "fs"
      },
      {
        questionText: "What is the purpose of package.json in Node.js?",
        options: ["Project configuration", "Database schema", "API documentation", "Test configuration"],
        correctAnswer: "Project configuration"
      },
      {
        questionText: "Which method is used to parse JSON in Express?",
        options: ["express.json()", "JSON.parse()", "express.parse()", "app.json()"],
        correctAnswer: "express.json()"
      },
      {
        questionText: "What is the purpose of process.env in Node.js?",
        options: ["Access environment variables", "Process events", "Handle errors", "Manage memory"],
        correctAnswer: "Access environment variables"
      },
      {
        questionText: "Which method is used to create a server in Node.js?",
        options: ["http.createServer()", "server.create()", "node.createServer()", "app.createServer()"],
        correctAnswer: "http.createServer()"
      },
      {
        questionText: "What is the purpose of CORS in Express?",
        options: ["Cross-Origin Resource Sharing", "Create REST APIs", "Handle authentication", "Manage sessions"],
        correctAnswer: "Cross-Origin Resource Sharing"
      },
      {
        questionText: "Which method is used to handle errors in Express?",
        options: ["app.use() with error handler", "app.error()", "app.catch()", "app.handleError()"],
        correctAnswer: "app.use() with error handler"
      },
      {
        questionText: "What is the purpose of body-parser in Express?",
        options: ["Parse request bodies", "Parse response bodies", "Parse headers", "Parse cookies"],
        correctAnswer: "Parse request bodies"
      },
      {
        questionText: "Which method is used to serve static files in Express?",
        options: ["express.static()", "app.static()", "express.files()", "app.serve()"],
        correctAnswer: "express.static()"
      }
    ]
  },
  {
    title: "Database & MongoDB",
    category: "Database",
    difficulty: "medium",
    questions: [
      {
        questionText: "What does 'NoSQL' stand for?",
        options: ["Not Only SQL", "New SQL", "Network SQL", "Non-Structured Query Language"],
        correctAnswer: "Not Only SQL"
      },
      {
        questionText: "Which method is used to insert a document in MongoDB?",
        options: ["insertOne()", "addOne()", "createOne()", "saveOne()"],
        correctAnswer: "insertOne()"
      },
      {
        questionText: "What is a collection in MongoDB?",
        options: ["A group of documents", "A database", "A field", "An index"],
        correctAnswer: "A group of documents"
      },
      {
        questionText: "Which method is used to find documents in MongoDB?",
        options: ["find()", "search()", "query()", "get()"],
        correctAnswer: "find()"
      },
      {
        questionText: "What is the purpose of an index in MongoDB?",
        options: ["Improve query performance", "Store data", "Validate data", "Backup data"],
        correctAnswer: "Improve query performance"
      },
      {
        questionText: "Which method is used to update documents in MongoDB?",
        options: ["updateOne()", "modifyOne()", "changeOne()", "editOne()"],
        correctAnswer: "updateOne()"
      },
      {
        questionText: "What is the purpose of aggregation in MongoDB?",
        options: ["Process data and return computed results", "Store data", "Delete data", "Backup data"],
        correctAnswer: "Process data and return computed results"
      },
      {
        questionText: "Which method is used to delete documents in MongoDB?",
        options: ["deleteOne()", "removeOne()", "dropOne()", "eraseOne()"],
        correctAnswer: "deleteOne()"
      },
      {
        questionText: "What is the purpose of Mongoose in Node.js?",
        options: ["MongoDB object modeling", "Database connection", "Query optimization", "Data validation"],
        correctAnswer: "MongoDB object modeling"
      },
      {
        questionText: "Which method is used to create a schema in Mongoose?",
        options: ["new Schema()", "createSchema()", "defineSchema()", "makeSchema()"],
        correctAnswer: "new Schema()"
      },
      {
        questionText: "What is the purpose of populate() in Mongoose?",
        options: ["Replace referenced documents", "Create documents", "Delete documents", "Update documents"],
        correctAnswer: "Replace referenced documents"
      },
      {
        questionText: "Which method is used to save a document in Mongoose?",
        options: ["save()", "store()", "create()", "insert()"],
        correctAnswer: "save()"
      }
    ]
  },
  {
    title: "Web Development Fundamentals",
    category: "Web Development",
    difficulty: "easy",
    questions: [
      {
        questionText: "What does HTML stand for?",
        options: ["HyperText Markup Language", "High Tech Modern Language", "Home Tool Markup Language", "Hyperlink and Text Markup Language"],
        correctAnswer: "HyperText Markup Language"
      },
      {
        questionText: "What does CSS stand for?",
        options: ["Cascading Style Sheets", "Computer Style Sheets", "Creative Style Sheets", "Colorful Style Sheets"],
        correctAnswer: "Cascading Style Sheets"
      },
      {
        questionText: "Which tag is used to create a hyperlink in HTML?",
        options: ["<a>", "<link>", "<href>", "<url>"],
        correctAnswer: "<a>"
      },
      {
        questionText: "Which property is used to change the text color in CSS?",
        options: ["color", "text-color", "font-color", "text-style"],
        correctAnswer: "color"
      },
      {
        questionText: "What is the purpose of the <div> tag in HTML?",
        options: ["Container element", "Text element", "Image element", "Link element"],
        correctAnswer: "Container element"
      },
      {
        questionText: "Which CSS property is used to control spacing between elements?",
        options: ["margin", "padding", "border", "Both margin and padding"],
        correctAnswer: "Both margin and padding"
      },
      {
        questionText: "What is the purpose of the <script> tag in HTML?",
        options: ["Include JavaScript", "Include CSS", "Include images", "Include videos"],
        correctAnswer: "Include JavaScript"
      },
      {
        questionText: "Which CSS property is used to make text bold?",
        options: ["font-weight", "text-weight", "bold", "font-style"],
        correctAnswer: "font-weight"
      },
      {
        questionText: "What is the purpose of the <form> tag in HTML?",
        options: ["Create forms", "Style elements", "Add images", "Create links"],
        correctAnswer: "Create forms"
      },
      {
        questionText: "Which CSS property is used to control element positioning?",
        options: ["position", "location", "place", "arrange"],
        correctAnswer: "position"
      },
      {
        questionText: "What is the purpose of the <img> tag in HTML?",
        options: ["Display images", "Create links", "Add text", "Style elements"],
        correctAnswer: "Display images"
      },
      {
        questionText: "Which CSS property is used to control element size?",
        options: ["width and height", "size", "dimensions", "measure"],
        correctAnswer: "width and height"
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
      name: 'Quiz Admin',
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
      console.log(`Quiz created: ${quiz.title} (${quiz.questions.length} questions)`);
    }

    console.log('\n🎉 Sample data created successfully!');
    console.log('📊 Summary:');
    console.log(`- 5 quiz categories created`);
    console.log(`- Total questions: ${sampleQuizzes.reduce((total, quiz) => total + quiz.questions.length, 0)}`);
    console.log(`- Admin login: admin@quizapp.com / admin123`);
    console.log('\n🚀 You can now test the quiz application!');
    
  } catch (error) {
    console.error('Error creating sample data:', error);
  } finally {
    await mongoose.disconnect();
  }
}

createSampleData();
