# 🚀 Deployment Guide

This guide will help you deploy your Analytics Dashboard to production.

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account (for database)
- Vercel account (for frontend)
- Railway/Render/Heroku account (for backend)

## 🗂️ Project Structure

```
new try/
├── client/                 # React Frontend
│   ├── src/
│   ├── package.json
│   └── vercel.json
├── server/                 # Node.js Backend
│   ├── index.js
│   └── package.json
├── jsondata.json          # Sample data
├── package.json           # Root package.json
└── vercel.json           # Root deployment config
```

## 🎯 Deployment Options

### Option 1: Frontend Only (Recommended for Demo)

Deploy only the React frontend to Vercel with mock data.

### Option 2: Full Stack Deployment

Deploy both frontend and backend separately.

---

## 🎨 Frontend Deployment (Vercel)

### Step 1: Prepare Frontend

1. **Navigate to client directory:**
   ```bash
   cd client
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Test build locally:**
   ```bash
   npm run build
   ```

### Step 2: Deploy to Vercel

#### Method A: Using Vercel CLI

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Deploy from client directory:**
   ```bash
   cd client
   vercel
   ```

3. **Follow the prompts:**
   - Set up and deploy? `Y`
   - Which scope? `[Your account]`
   - Link to existing project? `N`
   - Project name: `analytics-dashboard`
   - Directory: `./` (current directory)

#### Method B: Using Vercel Dashboard

1. **Go to [vercel.com](https://vercel.com)**
2. **Click "New Project"**
3. **Import your GitHub repository**
4. **Configure project:**
   - Framework Preset: `Create React App`
   - Root Directory: `client`
   - Build Command: `npm run build`
   - Output Directory: `build`
   - Install Command: `npm install`

### Step 3: Environment Variables (Optional)

If you have a backend API, add environment variable in Vercel:

1. **Go to Project Settings → Environment Variables**
2. **Add:**
   - Name: `REACT_APP_API_URL`
   - Value: `https://your-backend-url.com`

---

## 🔧 Backend Deployment

### Option A: Railway (Recommended)

1. **Go to [railway.app](https://railway.app)**
2. **Connect your GitHub repository**
3. **Create new project**
4. **Add service from GitHub repo**
5. **Set root directory to `server`**
6. **Add environment variables:**
   ```
   MONGODB_URI=your_mongodb_atlas_connection_string
   PORT=5000
   NODE_ENV=production
   ```

### Option B: Render

1. **Go to [render.com](https://render.com)**
2. **Create new Web Service**
3. **Connect your GitHub repository**
4. **Configure:**
   - Name: `analytics-dashboard-api`
   - Root Directory: `server`
   - Build Command: `npm install`
   - Start Command: `npm start`
5. **Add environment variables**

### Option C: Heroku

1. **Install Heroku CLI**
2. **Create Heroku app:**
   ```bash
   heroku create your-app-name
   ```
3. **Set environment variables:**
   ```bash
   heroku config:set MONGODB_URI=your_mongodb_connection_string
   heroku config:set NODE_ENV=production
   ```
4. **Deploy:**
   ```bash
   git subtree push --prefix server heroku main
   ```

---

## 🗄️ Database Setup (MongoDB Atlas)

1. **Create MongoDB Atlas account**
2. **Create new cluster**
3. **Get connection string**
4. **Add to environment variables**

### Sample MongoDB Connection String:
```
mongodb+srv://username:password@cluster.mongodb.net/analytics-dashboard?retryWrites=true&w=majority
```

---

## 🔗 Connect Frontend to Backend

### For Frontend-Only Deployment:

The app will work with mock data. No backend needed.

### For Full Stack Deployment:

1. **Deploy backend first**
2. **Get backend URL**
3. **Add to Vercel environment variables:**
   ```
   REACT_APP_API_URL=https://your-backend-url.com
   ```
4. **Redeploy frontend**

---

## 🚀 Quick Deployment Commands

### Frontend Only (Recommended):
```bash
cd client
npm install
npm run build
vercel
```

### Full Stack:
```bash
# Deploy backend first
cd server
# Follow backend deployment steps above

# Then deploy frontend
cd ../client
npm install
npm run build
vercel
```

---

## 🔍 Troubleshooting

### Common Issues:

1. **Build Fails:**
   - Check ESLint errors
   - Ensure all dependencies are installed
   - Verify Node.js version

2. **API Calls Fail:**
   - Check CORS settings
   - Verify API URL in environment variables
   - Ensure backend is running

3. **Charts Don't Load:**
   - Check browser console for errors
   - Verify data format
   - Ensure Chart.js is properly imported

### Debug Commands:

```bash
# Check for linting errors
cd client
npm run lint

# Test build locally
npm run build

# Check dependencies
npm list --depth=0
```

---

## 📱 Final Steps

1. **Test your deployed app**
2. **Check all features work**
3. **Share your live URL!**

---

## 🎉 Success!

Your Analytics Dashboard is now live! 🚀

**Frontend URL:** `https://your-app.vercel.app`
**Backend URL:** `https://your-backend-url.com` (if deployed)

---

## 📞 Support

If you encounter issues:
1. Check the troubleshooting section
2. Review deployment logs
3. Verify environment variables
4. Test locally first 