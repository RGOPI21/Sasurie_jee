@echo off
echo ========================================
echo NETLIFY DEPLOYMENT SCRIPT
echo ========================================
echo.

echo Step 1: Navigating to project directory...
cd /d "E:\PLAN B\college-website 3\college-website 3\college-website"
echo Current directory: %CD%
echo.

echo Step 2: Building the project...
call npm run build
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Build failed!
    pause
    exit /b 1
)
echo Build successful!
echo.

echo Step 3: Deploying to Netlify...
echo.
echo You will be prompted for:
echo - Directory to deploy: frontend/dist
echo - Functions directory: netlify/functions
echo.
pause
call netlify deploy --prod
echo.

echo ========================================
echo DEPLOYMENT COMPLETE!
echo ========================================
echo.
echo Your site should now be live at the URL shown above.
echo.
pause
