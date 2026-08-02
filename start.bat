@echo off
title LUXESTATE Real Estate Portal Launcher
echo =======================================================
echo     LUXESTATE - FULL STACK REAL ESTATE PORTAL
echo =======================================================
echo.
echo [1/4] Installing Server Dependencies...
call cmd /c npm --prefix server install

echo.
echo [2/4] Installing Client Dependencies...
call cmd /c npm --prefix client install

echo.
echo [3/4] Building Client Bundle & Seeding Database...
call cmd /c npm --prefix client run build
call node server/seed.js

echo.
echo =======================================================
echo   Starting Express Backend & React Server
echo   Opening browser at: http://localhost:3000
echo =======================================================
echo.

start http://localhost:3000
node scripts/dev.js
pause
