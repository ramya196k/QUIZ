@echo off
echo 🚀 Building MERN Quiz Application for Production...

echo 🔧 Building backend server...
cd server
call npm run build
if %errorlevel% neq 0 (
    echo ❌ Backend build failed!
    exit /b 1
)
echo ✅ Backend built successfully!

echo 🎨 Building frontend client...
cd ..\client
call npm run build
if %errorlevel% neq 0 (
    echo ❌ Frontend build failed!
    exit /b 1
)
echo ✅ Frontend built successfully!

echo.
echo 🎉 Build completed successfully!
echo 📁 Backend build: server\dist\
echo 📁 Frontend build: client\dist\
echo.
echo 🚀 Ready for deployment!
pause
