# Deployment Guide

This guide will help you deploy the Feedback Management Dashboard to Render (backend) and Vercel (frontend).

## Prerequisites

- GitHub account with the repository pushed
- Render account (sign up at https://render.com)
- Vercel account (sign up at https://vercel.com)

---

## Part 1: Deploy Backend to Render

### Step 1: Create Render Account
1. Go to https://render.com and sign up/login
2. Connect your GitHub account

### Step 2: Create New Web Service
1. Click **"New +"** → **"Web Service"**
2. Connect your GitHub repository: `ARJUNPATEL9/feedback-dashboard1`
3. Configure the service:
   - **Name**: `feedback-api` (or any name you prefer)
   - **Region**: Choose closest to you
   - **Branch**: `main`
   - **Root Directory**: `backend` ⚠️ **IMPORTANT: Set this to `backend`**
   - **Environment**: `Node`
   - **Build Command**: `npm install --legacy-peer-deps`
   - **Start Command**: `node api/feedback.js`
   - **Plan**: Free (or choose paid for better performance)

### Step 3: Add Environment Variables
In the Render dashboard, add these environment variables:
- `NODE_ENV`: `production`
- `PORT`: `10000` (Render sets this automatically, but you can specify)

### Step 4: Add Persistent Disk (Important for Database)
1. Go to your service settings
2. Scroll to **"Disks"** section
3. Click **"Add Disk"**
4. Configure:
   - **Name**: `feedback-db`
   - **Mount Path**: `/opt/render/project/src/backend` (or `/opt/render/project/src` if rootDir is set)
   - **Size**: 1 GB (minimum)

**Note**: The persistent disk ensures your SQLite database persists across deployments.

### Step 5: Deploy
1. Click **"Create Web Service"**
2. Wait for the build to complete (usually 2-5 minutes)
3. Once deployed, copy your service URL (e.g., `https://feedback-api.onrender.com`)

### Step 6: Test Backend
Visit: `https://your-service-url.onrender.com/health`

You should see: `{"status":"ok"}`

---

## Part 2: Deploy Frontend to Vercel

### Step 1: Create Vercel Account
1. Go to https://vercel.com and sign up/login
2. Connect your GitHub account

### Step 2: Import Project
1. Click **"Add New..."** → **"Project"**
2. Import your repository: `ARJUNPATEL9/feedback-dashboard1`
3. Vercel will auto-detect Next.js

### Step 3: Configure Project
1. **Framework Preset**: Next.js (auto-detected)
2. **Root Directory**: `frontend` ⚠️ **IMPORTANT: Set this to `frontend`**
3. **Build Command**: `npm run build` (auto-filled)
4. **Output Directory**: `.next` (auto-filled)
5. **Install Command**: `npm install --legacy-peer-deps`

### Step 4: Add Environment Variables
**CRITICAL**: Add this environment variable:
- **Key**: `NEXT_PUBLIC_API_URL`
- **Value**: `https://your-render-service-url.onrender.com` (use your actual Render URL from Part 1)

**Example**: If your Render service is `https://feedback-api.onrender.com`, then:
- `NEXT_PUBLIC_API_URL` = `https://feedback-api.onrender.com`

### Step 5: Deploy
1. Click **"Deploy"**
2. Wait for build to complete (usually 1-3 minutes)
3. Vercel will provide you with a URL (e.g., `https://feedback-dashboard1.vercel.app`)

### Step 6: Test Frontend
1. Visit your Vercel URL
2. Try submitting feedback
3. Check if analytics update correctly

---

## Troubleshooting

### Backend Issues (Render)

**Database not persisting:**
- Ensure persistent disk is mounted correctly
- Check disk mount path matches the root directory setting
- Verify database file path in `backend/api/feedback.js`

**Build fails:**
- Check build logs in Render dashboard
- Ensure `--legacy-peer-deps` flag is used
- Verify Node.js version (Render uses latest LTS)
- Make sure Root Directory is set to `backend`

**CORS errors:**
- Verify CORS is enabled in `backend/api/feedback.js` (already configured)
- Check if frontend URL is allowed (CORS allows all origins currently)

### Frontend Issues (Vercel)

**API connection fails:**
- Verify `NEXT_PUBLIC_API_URL` environment variable is set correctly
- Check Render service is running and accessible
- Test Render API directly: `https://your-api.onrender.com/health`
- Ensure Root Directory is set to `frontend`

**Build fails:**
- Check build logs in Vercel dashboard
- Ensure all dependencies are in `frontend/package.json`
- Try clearing Vercel cache and redeploying
- Verify Root Directory is set to `frontend`

---

## Post-Deployment Checklist

- [ ] Backend deployed and accessible on Render
- [ ] Backend health check returns `{"status":"ok"}`
- [ ] Frontend deployed and accessible on Vercel
- [ ] Environment variable `NEXT_PUBLIC_API_URL` set correctly
- [ ] Can submit feedback from frontend
- [ ] Analytics display correctly
- [ ] Database persists data (test by submitting feedback and checking if it remains after service restart)

---

## URLs Reference

After deployment, you'll have:
- **Backend API**: `https://your-service.onrender.com`
- **Frontend**: `https://your-project.vercel.app`

Update the frontend environment variable if you change the backend URL.

---

## Notes

- **Free Tier Limitations**:
  - Render free tier services spin down after 15 minutes of inactivity
  - First request after spin-down may take 30-60 seconds
  - Consider upgrading for production use

- **Database**: SQLite works well for small to medium applications. For production with high traffic, consider PostgreSQL (Render offers managed PostgreSQL).

- **Environment Variables**: Never commit `.env` files. Always set them in the platform dashboards.

- **Root Directories**: 
  - Render: Set Root Directory to `backend`
  - Vercel: Set Root Directory to `frontend`

