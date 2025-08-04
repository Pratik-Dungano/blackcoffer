#!/bin/bash

echo "🚀 Analytics Dashboard Deployment Script"
echo "========================================"

# Check if we're in the right directory
if [ ! -d "client" ] || [ ! -d "server" ]; then
    echo "❌ Error: Please run this script from the project root directory"
    echo "   Make sure both 'client' and 'server' directories exist"
    exit 1
fi

echo "✅ Project structure verified"
echo ""

# Frontend deployment
echo "🎨 Frontend Deployment (Vercel)"
echo "================================"
echo "1. Navigate to client directory:"
echo "   cd client"
echo ""
echo "2. Install dependencies:"
echo "   npm install"
echo ""
echo "3. Build the project:"
echo "   npm run build"
echo ""
echo "4. Deploy to Vercel:"
echo "   vercel"
echo ""

# Backend deployment
echo "🔧 Backend Deployment (Railway)"
echo "================================"
echo "1. Push code to GitHub:"
echo "   git add ."
echo "   git commit -m 'Ready for deployment'"
echo "   git push origin main"
echo ""
echo "2. Deploy to Railway:"
echo "   - Go to https://railway.app"
echo "   - Sign up/Login with GitHub"
echo "   - Click 'New Project'"
echo "   - Select 'Deploy from GitHub repo'"
echo "   - Choose your repository"
echo "   - Set Root Directory to 'server'"
echo "   - Add environment variables"
echo ""

# Database setup
echo "🗄️ Database Setup (MongoDB Atlas)"
echo "=================================="
echo "1. Go to https://mongodb.com/atlas"
echo "2. Create free account"
echo "3. Create new cluster"
echo "4. Get connection string"
echo "5. Add to Railway environment variables"
echo ""

# Connect frontend to backend
echo "🔗 Connect Frontend to Backend"
echo "=============================="
echo "1. Get your Railway backend URL"
echo "2. Go to Vercel project settings"
echo "3. Add environment variable:"
echo "   REACT_APP_API_URL = https://your-backend-url.railway.app"
echo "4. Redeploy frontend"
echo ""

echo "🎉 Deployment Complete!"
echo "======================"
echo "Frontend: https://your-app.vercel.app"
echo "Backend:  https://your-app.railway.app"
echo "Database: MongoDB Atlas (cloud)"
echo ""
echo "📚 For detailed instructions, see DEPLOYMENT.md" 