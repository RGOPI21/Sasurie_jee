# 🚀 FINAL DEPLOYMENT GUIDE - Netlify UI Method

## ✅ Your Code is Ready!

All files are committed and ready to deploy.

---

## 🎯 **DEPLOY NOW - 5 Simple Steps:**

### **Step 1: Open Netlify**
Go to: **[app.netlify.com](https://app.netlify.com)**

You're logged in as: **karthikchidambaram A**

---

### **Step 2: Create New Site**
1. Click **"Add new site"** (top right)
2. Choose **"Deploy manually"** (since GitHub push isn't working)

---

### **Step 3: Prepare Your Files**

You need to create a deployment package. Run this in PowerShell:

```powershell
# Create a deployment folder
mkdir deploy-package
cd deploy-package

# Copy frontend build
xcopy /E /I ..\frontend\dist frontend\dist

# Copy backend build  
xcopy /E /I ..\backend\dist backend\dist

# Copy netlify files
xcopy /E /I ..\netlify netlify

# Copy netlify.toml
copy ..\netlify.toml netlify.toml

# Go back
cd ..
```

---

### **Step 4: Deploy**

**Option A: Drag & Drop (Easiest)**
1. In Netlify, you'll see a drag & drop area
2. Drag the `deploy-package` folder to it
3. Wait for upload to complete

**Option B: Use Netlify Drop**
1. Go to: [app.netlify.com/drop](https://app.netlify.com/drop)
2. Drag the `frontend/dist` folder
3. Note: This won't include backend functions

---

### **Step 5: Configure Environment Variables**

After deployment:
1. Go to **Site settings** → **Environment variables**
2. Click **"Add a variable"**
3. Add these:

```
NODE_ENV=production

MONGO_URI=mongodb+srv://habhinav:Abc12345@cluster0.mongodb.net/college-website?retryWrites=true&w=majority

CORS_ORIGINS=https://your-site-name.netlify.app

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=admissions@sasurie.edu
```

4. **Redeploy** after adding variables

---

## 🔧 **Alternative: Fix GitHub and Use Auto-Deploy**

If you want to use GitHub (recommended for future updates):

### **Option 1: Create New Repository**
```powershell
# Create new repo on GitHub first, then:
git remote remove origin
git remote add origin https://github.com/YOUR-USERNAME/NEW-REPO-NAME.git
git push -u origin main
```

### **Option 2: Check Repository Access**
- Go to: https://github.com/BAkash22/college-website
- Make sure the repository exists
- Check if you have push access
- If it's private, make sure you're logged in

---

## 🎯 **Recommended Path: Netlify CLI**

Since you have a full-stack app (Frontend + Backend) and GitHub is giving issues, the **Netlify CLI** is the best way to upload. It allows you to deploy the backend functions correctly, which "Drag & Drop" might miss.

### **Step 1: Install & Login**
Run this in your terminal:
```powershell
npx netlify login
```
*   This will open your browser. Click "Authorize".

### **Step 2: Deploy**
Run this command to build and upload:
```powershell
npx netlify deploy --prod
```

**Follow the prompts:**
1.  **"What would you like to do?"** → Select `Create & configure a new site`
2.  **"Team"** → Select your team (e.g., `karthikchidambaram A's team`)
3.  **"Site name"** → Type a unique name (e.g., `college-website-final-v1`) or leave blank for a random name.
4.  **"Publish directory"** → It should default to `frontend/dist`. Press Enter.
5.  **"Build command"** → It should default to `npm run build`. Press Enter.

### **Step 3: Add Environment Variables**
Once deployed, you still need to add your variables:
1.  Go to the URL shown in the terminal (Admin URL).
2.  Navigate to **Site settings** → **Environment variables**.
3.  Add the variables listed in the "Configure Environment Variables" section below.

---

## 🔧 **Alternative: Drag & Drop (Frontend Only)**
*Use this only if the CLI method fails. This will likely break backend features (forms, login).*

1.  **Go to**: [app.netlify.com/drop](https://app.netlify.com/drop)
2.  **Drag**: The `frontend/dist` folder.
3.  **Note**: API functions won't work.

---

## ✅ **After Deployment Checklist**

- [ ] Site is live at Netlify URL
- [ ] Environment variables added in Netlify Dashboard
- [ ] Test homepage loads
- [ ] Test API: `https://your-site.netlify.app/api/health`
- [ ] Test user registration/login

---

## 🆘 **Need Help?**

If the CLI fails with "Multiple projects detected":
1. Rename `package.json` to `package.json.hide`
2. Run your Netlify command (deploy or env:import)
3. Rename it back to `package.json`

If you see "Could not load data":
1. Ensure `MONGO_URI` is set appropriately in Netlify Site Settings
2. Ensure `CORS_ORIGINS` is set to your Netlify URL
3. Check Netlify Function logs for errors
