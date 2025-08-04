# 🚂 Railway Backend Deployment Guide

This guide will help you deploy your Analytics Dashboard backend to Railway.

## ✅ **What I Fixed**

The error `Missing script: "start"` occurred because your `server` directory was missing:
- ❌ `package.json` (with start script)
- ❌ `.gitignore` (for node_modules)
- ❌ `Procfile` (for Railway)

**Now you have:**
- ✅ `server/package.json` with proper start script
- ✅ `server/.gitignore` for clean deployment
- ✅ `server/Procfile` for Railway
- ✅ All necessary dependencies defined

## 🚀 **Step-by-Step Railway Deployment**

### **Step 1: Prepare Your Code**

1. **Commit your changes:**
   ```bash
   git add .
   git commit -m "Add server package.json and deployment files"
   git push origin main
   ```

### **Step 2: Deploy to Railway**

1. **Go to [railway.app](https://railway.app)**
2. **Sign up/Login with GitHub**
3. **Click "New Project"**
4. **Select "Deploy from GitHub repo"**
5. **Choose your repository**
6. **Configure the service:**
   - **Root Directory:** `server`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`

### **Step 3: Set Environment Variables**

In Railway dashboard, go to your project → Variables tab and add:

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/analytics-dashboard?retryWrites=true&w=majority
PORT=5000
NODE_ENV=production
CORS_ORIGIN=*
```

### **Step 4: Get Your Backend URL**

After deployment, Railway will give you a URL like:
`https://your-app-name.railway.app`

## 🗄️ **MongoDB Atlas Setup**

### **Step 1: Create MongoDB Atlas Account**
1. Go to [mongodb.com/atlas](https://mongodb.com/atlas)
2. Create free account
3. Create new cluster (free tier)

### **Step 2: Get Connection String**
1. Click "Connect" on your cluster
2. Choose "Connect your application"
3. Copy the connection string
4. Replace `<username>`, `<password>`, and `<dbname>` with your values

### **Step 3: Add to Railway**
Add the connection string to Railway environment variables as `MONGODB_URI`

## 🔗 **Connect Frontend to Backend**

### **Step 1: Get Backend URL**
From Railway dashboard, copy your app URL.

### **Step 2: Update Vercel Environment Variables**
1. Go to your Vercel project
2. Settings → Environment Variables
3. Add: `REACT_APP_API_URL` = `https://your-app-name.railway.app`
4. Redeploy frontend

## 🧪 **Test Your Deployment**

### **Test Backend API:**
```bash
# Test if backend is running
curl https://your-app-name.railway.app/api/stats

# Test data endpoint
curl https://your-app-name.railway.app/api/data

# Test filter options
curl https://your-app-name.railway.app/api/pestles
```

### **Test Frontend:**
1. Go to your Vercel URL
2. Check if data loads
3. Test filters
4. Test charts

## 🔍 **Troubleshooting**

### **Common Issues:**

1. **Build fails:**
   - Check Railway logs
   - Ensure all dependencies are in package.json
   - Verify Node.js version

2. **Database connection fails:**
   - Check MongoDB Atlas connection string
   - Ensure IP whitelist includes `0.0.0.0/0`
   - Verify username/password

3. **CORS errors:**
   - Check CORS_ORIGIN environment variable
   - Ensure frontend URL is allowed

### **Railway Logs:**
1. Go to Railway dashboard
2. Click on your service
3. Go to "Deployments" tab
4. Click on latest deployment
5. Check logs for errors

## 📊 **Monitoring**

### **Railway Dashboard:**
- **Deployments:** Track deployment status
- **Logs:** View real-time logs
- **Metrics:** Monitor performance
- **Variables:** Manage environment variables

### **MongoDB Atlas:**
- **Database:** Monitor connections
- **Collections:** View your data
- **Performance:** Check query performance

## 🎉 **Success Indicators**

✅ **Backend deployed successfully when:**
- Railway shows "Deployed" status
- API endpoints return data
- No errors in Railway logs

✅ **Frontend connected successfully when:**
- Dashboard loads with data
- Filters work properly
- Charts display correctly

## 📞 **Support**

If you encounter issues:
1. Check Railway deployment logs
2. Verify environment variables
3. Test API endpoints manually
4. Check MongoDB Atlas connection

---

## 🚀 **Quick Commands**

```bash
# Test backend locally
cd server
npm install
npm start

# Test API endpoints
curl http://localhost:5000/api/stats
curl http://localhost:5000/api/data

# Deploy to Railway (via dashboard)
# 1. Push to GitHub
git push origin main

# 2. Deploy from Railway dashboard
# 3. Set environment variables
# 4. Get backend URL and update Vercel
```

Your backend should now deploy successfully to Railway! 🎉 