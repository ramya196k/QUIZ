@echo off
echo 🚀 Starting MERN Quiz Application...

REM Check if MongoDB is running (Windows)
tasklist /FI "IMAGENAME eq mongod.exe" 2>NUL | find /I /N "mongod.exe">NUL
if "%ERRORLEVEL%"=="1" (
    echo ⚠️  MongoDB is not running. Please start MongoDB first.
    echo    Start MongoDB service or run mongod.exe
    pause
    exit /b 1
)

REM Start backend server
echo 🔧 Starting backend server...
cd server
start "Backend Server" cmd /k "npm run dev"

REM Wait a moment for backend to start
timeout /t 3 /nobreak > nul

REM Start frontend server
echo 🎨 Starting frontend server...
cd ..\client
start "Frontend Server" cmd /k "npm run dev"

echo ✅ Both servers are starting...
echo 📱 Frontend: http://localhost:5173
echo 🔧 Backend: http://localhost:5000
echo.
echo Press any key to exit...
pause > nul
