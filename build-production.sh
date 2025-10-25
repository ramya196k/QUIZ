#!/bin/bash

echo "🚀 Building MERN Quiz Application for Production..."

# Build backend
echo "🔧 Building backend server..."
cd server
npm run build
if [ $? -ne 0 ]; then
    echo "❌ Backend build failed!"
    exit 1
fi
echo "✅ Backend built successfully!"

# Build frontend
echo "🎨 Building frontend client..."
cd ../client
npm run build
if [ $? -ne 0 ]; then
    echo "❌ Frontend build failed!"
    exit 1
fi
echo "✅ Frontend built successfully!"

echo ""
echo "🎉 Build completed successfully!"
echo "📁 Backend build: server/dist/"
echo "📁 Frontend build: client/dist/"
echo ""
echo "🚀 Ready for deployment!"
