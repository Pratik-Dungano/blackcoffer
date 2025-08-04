#!/bin/bash

echo "🚀 Backend-Only Vercel Deployment"
echo "================================="

# Check if we're in the right directory
if [ ! -d "server" ]; then
    echo "❌ Error: Please run this script from the project root directory"
    echo "   Make sure the 'server' directory exists"
    exit 1
fi

echo "✅ Server directory found"
echo ""

# Check if vercel.json exists
if [ ! -f "vercel.json" ]; then
    echo "❌ Error: vercel.json not found"
    echo "   Make sure vercel.json is in the root directory"
    exit 1
fi

echo "✅ vercel.json found"
echo ""

# Check if package.json exists
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found"
    echo "   Make sure package.json is in the root directory"
    exit 1
fi

echo "✅ package.json found"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully"
else
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo ""

# Deploy to Vercel
echo "🚀 Deploying to Vercel..."
echo ""

echo "📋 Deployment Steps:"
echo "1. Run: vercel"
echo "2. Follow the prompts:"
echo "   - Set up and deploy? Y"
echo "   - Which scope? [Your account]"
echo "   - Link to existing project? N"
echo "   - Project name: analytics-dashboard-api"
echo "   - Directory: ./ (current directory)"
echo ""
echo "3. Set environment variables in Vercel dashboard:"
echo "   - MONGODB_URI=your_mongodb_atlas_connection_string"
echo "   - NODE_ENV=production"
echo "   - CORS_ORIGIN=*"
echo "   - PORT=5000"
echo ""

echo "🎯 Your API will be available at:"
echo "   https://your-app.vercel.app/api/*"
echo ""
echo "🧪 Test endpoints:"
echo "   - Health: https://your-app.vercel.app/api/health"
echo "   - Data: https://your-app.vercel.app/api/data"
echo "   - Stats: https://your-app.vercel.app/api/stats"
echo ""

echo "📚 For detailed instructions, see BACKEND_DEPLOYMENT.md" 