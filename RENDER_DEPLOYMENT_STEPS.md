# Render Backend Deployment - Step by Step

## Prerequisites
- GitHub repository pushed: `ARJUNPATEL9/feedback-dashboard1`
- Render account (sign up at https://render.com if you don't have one)

## Deployment Steps

### Step 1: Sign in to Render
1. Go to https://render.com
2. Sign in or create an account
3. Connect your GitHub account if prompted

### Step 2: Create New Web Service
1. Click the **"New +"** button (top right)
2. Select **"Web Service"**

### Step 3: Connect Repository
1. In the "Connect a repository" section, find and select:
   - **Repository**: `ARJUNPATEL9/feedback-dashboard1`
   - If not listed, click "Configure account" to connect GitHub

### Step 4: Configure Service Settings
Fill in the following settings:

**Basic Settings:**
- **Name**: `feedback-api` (or your preferred name)
- **Region**: Choose closest to you (e.g., `Oregon (US West)`)
- **Branch**: `main`
- **Root Directory**: `backend` ⚠️ **IMPORTANT: Must be `backend`**
- **Runtime**: `Node`
- **Build Command**: `npm install --legacy-peer-deps`
- **Start Command**: `node api/feedback.js`
- **Plan**: `Free` (or choose a paid plan)

**Advanced Settings (Optional):**
- You can leave defaults or configure as needed

### Step 5: Add Environment Variables
Click on **"Advanced"** or scroll to **"Environment Variables"** section:

Add these variables:
- **Key**: `NODE_ENV`
- **Value**: `production`

(Note: PORT is automatically set by Render, no need to add it)

### Step 6: Add Persistent Disk (CRITICAL for Database)
1. Scroll down to **"Disks"** section
2. Click **"Add Disk"**
3. Configure:
   - **Name**: `feedback-db`
   - **Mount Path**: `/opt/render/project/src/backend`
   - **Size**: `1 GB` (minimum)

⚠️ **Important**: The persistent disk ensures your SQLite database persists across deployments and restarts.

### Step 7: Deploy
1. Review all settings
2. Click **"Create Web Service"**
3. Wait for deployment (usually 2-5 minutes)

### Step 8: Monitor Deployment
- Watch the build logs in real-time
- The service will automatically start after successful build
- Copy your service URL (e.g., `https://feedback-api.onrender.com`)

### Step 9: Test Deployment
1. Visit: `https://your-service-name.onrender.com/health`
2. You should see: `{"status":"ok"}`

### Step 10: Update Frontend (After Backend is Deployed)
Once you have your Render backend URL, update your Vercel frontend:
- Add environment variable: `NEXT_PUBLIC_API_URL` = `https://your-backend-url.onrender.com`

## Troubleshooting

### Build Fails
- Check build logs for errors
- Verify Root Directory is set to `backend`
- Ensure `--legacy-peer-deps` flag is in build command

### Database Not Persisting
- Verify persistent disk is added and mounted correctly
- Check disk mount path matches: `/opt/render/project/src/backend`
- Database file should be created automatically in the backend directory

### Service Won't Start
- Check start command: `node api/feedback.js`
- Verify the file exists at `backend/api/feedback.js`
- Review logs for runtime errors

### CORS Errors
- CORS is already configured in the API to allow all origins
- If issues persist, check Render service URL is correct

## Your Service URL
After deployment, your backend will be available at:
`https://feedback-api.onrender.com` (or your custom name)

Use this URL in your frontend's `NEXT_PUBLIC_API_URL` environment variable.

