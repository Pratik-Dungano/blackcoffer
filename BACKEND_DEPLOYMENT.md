# 🚀 Backend-Only Vercel Deployment Guide

This guide will help you deploy **only the backend server** to Vercel as serverless functions.

## ✅ **What's Set Up**

- ✅ **Backend:** Node.js API in `server/` directory
- ✅ **Database:** MongoDB Atlas (cloud)
- ✅ **Configuration:** `vercel.json` for routing
- ✅ **Dependencies:** All server dependencies in root `package.json`

## 🗂️ **Project Structure**

```
new try/
├── server/                 # Backend (Vercel Serverless Functions)
│   ├── index.js           # Main API handler
│   ├── package.json       # Server dependencies
│   ├── .gitignore         # Server ignore rules
│   └── Procfile           # Railway deployment (not used for Vercel)
├── client/                 # Frontend (not deployed)
│   └── ...
├── jsondata.json          # Sample data
├── package.json           # Root dependencies (includes server deps)
└── vercel.json           # Vercel configuration
```

## 🎯 **Deployment Strategy**

### **Vercel Backend-Only Deployment:**
- **Backend:** Serverless functions from `server/` directory
- **Database:** MongoDB Atlas (external)
- **API Routes:** All routes under `https://your-app.vercel.app/api/*`

---

## 🚀 **Step-by-Step Deployment**

### **Step 1: Prepare Your Code**

1. **Commit your changes:**
   ```bash
   git add .
   git commit -m "Setup backend-only Vercel deployment"
   git push origin main
   ```

### **Step 2: Deploy to Vercel**

#### **Method A: Using Vercel CLI**

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Deploy from project root:**
   ```bash
   vercel
   ```

3. **Follow the prompts:**
   - Set up and deploy? `Y`
   - Which scope? `[Your account]`
   - Link to existing project? `N`
   - Project name: `analytics-dashboard-api`
   - Directory: `./` (current directory)

#### **Method B: Using Vercel Dashboard**

1. **Go to [vercel.com](https://vercel.com)**
2. **Click "New Project"**
3. **Import your GitHub repository**
4. **Configure project:**
   - Framework Preset: `Node.js`
   - Root Directory: `./` (root)
   - Build Command: `npm install`
   - Output Directory: `./` (not used for API)
   - Install Command: `npm install`

### **Step 3: Set Environment Variables**

In Vercel dashboard, go to your project → Settings → Environment Variables and add:

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/analytics-dashboard?retryWrites=true&w=majority
NODE_ENV=production
CORS_ORIGIN=*
PORT=5000
```

---

## 🗄️ **Database Setup (MongoDB Atlas)**

1. **Go to [mongodb.com/atlas](https://mongodb.com/atlas)**
2. **Create free account**
3. **Create new cluster (free tier)**
4. **Get connection string**
5. **Add to Vercel environment variables**

### **Sample MongoDB Connection String:**
```
mongodb+srv://username:password@cluster.mongodb.net/analytics-dashboard?retryWrites=true&w=majority
```

---

## 🔗 **API Endpoints**

After deployment, your API will be available at:

### **Data Endpoints:**
- `https://your-app.vercel.app/api/data` → Get all data
- `https://your-app.vercel.app/api/stats` → Get statistics
- `https://your-app.vercel.app/api/sector-analysis` → Sector analysis
- `https://your-app.vercel.app/api/topic-trends` → Topic trends
- `https://your-app.vercel.app/api/pestle-analysis` → PESTLE analysis

### **Filter Options:**
- `https://your-app.vercel.app/api/topics` → Get all topics
- `https://your-app.vercel.app/api/sectors` → Get all sectors
- `https://your-app.vercel.app/api/regions` → Get all regions
- `https://your-app.vercel.app/api/countries` → Get all countries
- `https://your-app.vercel.app/api/sources` → Get all sources
- `https://your-app.vercel.app/api/pestles` → Get all PESTLE categories
- `https://your-app.vercel.app/api/impacts` → Get all impacts

### **Health Check:**
- `https://your-app.vercel.app/api/health` → API health status

---

## 🧪 **Test Your Backend**

### **Test API Endpoints:**
```bash
# Health check
curl https://your-app.vercel.app/api/health

# Get data
curl https://your-app.vercel.app/api/data

# Get statistics
curl https://your-app.vercel.app/api/stats

# Get filter options
curl https://your-app.vercel.app/api/pestles
curl https://your-app.vercel.app/api/sources
curl https://your-app.vercel.app/api/impacts

# Test with filters
curl "https://your-app.vercel.app/api/data?sector=Technology"
curl "https://your-app.vercel.app/api/data?country=United%20States"
```

### **Test in Browser:**
1. Go to `https://your-app.vercel.app/api/health`
2. Should see: `{"status":"OK","timestamp":"..."}`
3. Go to `https://your-app.vercel.app/api/data`
4. Should see JSON data array

---

## 🔍 **Troubleshooting**

### **Common Issues:**

1. **Build fails:**
   - Check Vercel build logs
   - Ensure all dependencies are in package.json
   - Verify Node.js version

2. **API calls fail:**
   - Check MongoDB Atlas connection string
   - Verify environment variables in Vercel
   - Check CORS settings

3. **Database connection fails:**
   - Verify MongoDB Atlas connection string
   - Ensure IP whitelist includes `0.0.0.0/0`
   - Check username/password

### **Vercel Logs:**
1. Go to Vercel dashboard
2. Click on your project
3. Go to "Deployments" tab
4. Click on latest deployment
5. Check "Functions" tab for API logs

---

## 📊 **Monitoring**

### **Vercel Dashboard:**
- **Deployments:** Track deployment status
- **Functions:** Monitor API performance
- **Analytics:** View usage statistics
- **Environment Variables:** Manage configuration

### **MongoDB Atlas:**
- **Database:** Monitor connections
- **Collections:** View your data
- **Performance:** Check query performance

---

## 🎉 **Success Indicators**

✅ **Backend deployed successfully when:**
- Vercel shows "Deployed" status
- API endpoints return data
- No errors in Vercel logs
- Health check returns OK

✅ **API working when:**
- `/api/health` returns status OK
- `/api/data` returns JSON array
- `/api/stats` returns statistics
- Filter endpoints return options

---

## 📞 **Support**

If you encounter issues:
1. Check Vercel deployment logs
2. Verify environment variables
3. Test API endpoints manually
4. Check MongoDB Atlas connection

---

## 🚀 **Quick Commands**

```bash
# Deploy to Vercel
vercel

# Deploy with production settings
vercel --prod

# Check deployment status
vercel ls

# View logs
vercel logs

# Test API locally (optional)
cd server
npm install
npm start
```

---

## 🎯 **Benefits of Vercel Backend**

✅ **Serverless:** Automatic scaling and optimization
✅ **Global CDN:** Fast API responses worldwide
✅ **Easy Deployment:** Git-based deployments
✅ **Free Tier:** Generous free hosting
✅ **Built-in Analytics:** API performance monitoring
✅ **Environment Variables:** Secure configuration management

---

## 🎉 **Final Result**

Your Backend API is now live on Vercel! 🚀

**API Base URL:** `https://your-app.vercel.app/api`
**Health Check:** `https://your-app.vercel.app/api/health`
**Database:** MongoDB Atlas (cloud)

**No more `cd client` errors!** Only the backend is deployed to Vercel. 🎯 