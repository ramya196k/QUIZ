# MERN Quiz Application

A full-stack quiz application built with the MERN stack and TypeScript. Users can take quizzes, view scores, and compete on the leaderboard. Admins can create and manage quizzes.

## 🚀 Features

### User Features
- User registration and authentication with JWT
- Browse available quizzes by category and difficulty
- Take quizzes with timer functionality
- View detailed results with correct answers
- Track personal scores and quiz history
- Compete on the leaderboard

### Admin Features
- Create, edit, and delete quizzes
- Add multiple questions with options
- Manage quiz categories and difficulty levels
- View all quizzes and user statistics

## 🛠️ Tech Stack

### Frontend
- **React 19** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS** for styling
- **React Router DOM** for routing
- **Axios** for API calls
- **React Hot Toast** for notifications
- **React Context API** for state management

### Backend
- **Node.js** with Express.js
- **TypeScript** for type safety
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **bcryptjs** for password hashing
- **Express Validator** for input validation
- **CORS** for cross-origin requests

## 📁 Project Structure

```
mern-quiz-app/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── context/       # React Context providers
│   │   ├── types/         # TypeScript type definitions
│   │   ├── utils/         # Utility functions
│   │   └── App.tsx        # Main app component
│   ├── public/            # Static assets
│   └── package.json       # Frontend dependencies
└── server/                # Express backend
    ├── src/
    │   ├── models/        # Mongoose models
    │   ├── routes/        # API routes
    │   ├── controllers/   # Route controllers
    │   ├── middleware/    # Custom middleware
    │   ├── utils/         # Utility functions
    │   └── index.ts       # Server entry point
    └── package.json       # Backend dependencies
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd mern-quiz-app
   ```

2. **Install backend dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../client
   npm install
   ```

4. **Environment Setup**

   **Backend (.env)**
   ```bash
   cd server
   cp env.example .env
   ```
   
   Edit `.env` file:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/quiz-app
   JWT_SECRET=your-super-secret-jwt-key
   CLIENT_URL=http://localhost:5173
   ```

   **Frontend (.env)**
   ```bash
   cd client
   cp env.example .env
   ```
   
   Edit `.env` file:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

### Running the Application

1. **Start MongoDB** (if running locally)
   ```bash
   mongod
   ```

2. **Start the backend server**
   ```bash
   cd server
   npm run dev
   ```
   Server will run on `http://localhost:5000`

3. **Start the frontend development server**
   ```bash
   cd client
   npm run dev
   ```
   Frontend will run on `http://localhost:5173`

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (protected)

### Quizzes
- `GET /api/quizzes` - Get all quizzes
- `GET /api/quizzes/:id` - Get single quiz
- `POST /api/quizzes` - Create quiz (admin)
- `PUT /api/quizzes/:id` - Update quiz (admin)
- `DELETE /api/quizzes/:id` - Delete quiz (admin)

### Results
- `POST /api/results` - Submit quiz result
- `GET /api/results/user/:id` - Get user results
- `GET /api/results/leaderboard` - Get leaderboard

## 🎨 UI/UX Features

- **Responsive Design**: Works on desktop, tablet, and mobile
- **Modern UI**: Clean design with Tailwind CSS
- **Color Scheme**: 
  - Primary: Indigo (#6366f1)
  - Secondary: Amber (#f59e0b)
  - Background: Light gray (#f9fafb)
- **Interactive Elements**: Hover effects, transitions, and animations
- **Toast Notifications**: Success and error messages
- **Loading States**: Spinners and skeleton screens

## 🔐 Security Features

- JWT-based authentication
- Password hashing with bcryptjs
- Input validation and sanitization
- CORS protection
- Role-based access control (admin/user)
- Protected routes

## 🚀 Deployment

### Frontend (Vercel)
1. Build the project: `npm run build`
2. Deploy to Vercel with environment variables:
   ```
   VITE_API_URL=https://your-backend-url.com/api
   ```

### Backend (Render/Railway)
1. Set environment variables:
   ```
   PORT=5000
   NODE_ENV=production
   MONGODB_URI=your-mongodb-connection-string
   JWT_SECRET=your-production-jwt-secret
   CLIENT_URL=https://your-frontend-url.com
   ```
2. Deploy with build command: `npm run build`
3. Start command: `npm start`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📝 License

This project is licensed under the ISC License.

## 🎯 Future Enhancements

- [ ] Quiz categories filtering
- [ ] User profiles and avatars
- [ ] Quiz sharing functionality
- [ ] Advanced analytics dashboard
- [ ] Mobile app with React Native
- [ ] Real-time multiplayer quizzes
- [ ] Quiz templates and themes
- [ ] Social features (friends, challenges)

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check connection string in `.env`

2. **CORS Issues**
   - Verify `CLIENT_URL` in backend `.env`
   - Check frontend `VITE_API_URL`

3. **Build Errors**
   - Clear node_modules and reinstall
   - Check TypeScript configuration

4. **Authentication Issues**
   - Verify JWT_SECRET is set
   - Check token expiration

## 📞 Support

For support, email your-email@example.com or create an issue in the repository.
