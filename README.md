# LUXESTATE - Real Estate Portal (Full-Stack)

A complete full-stack Real Estate Portal application built with **Node.js, Express, SQLite, and React (Vite)** with glassmorphic dark mode UI, dynamic property filtering, owner inquiry management, favorite wishlists, and a full admin dashboard.

---

## 🌟 Key Features

1. **Property Listings & Showcase**:
   - Grid and List views with toggle.
   - High-res image galleries, specs (Bedrooms, Bathrooms, Sqft, Garage), location maps, and agent details.
2. **Dynamic Search & Filters**:
   - Keyword, city, listing status (For Sale / For Rent), property type (Villa, Apartment, House, Commercial), price range, and sorting.
3. **Contact Owner Modal**:
   - Buyer inquiry form sending persistent messages to the backend database.
4. **Favorite Wishlist**:
   - Bookmarking saved to LocalStorage and synced with real-time counters.
5. **Admin Panel**:
   - KPI Stats (Total Listings, Buyer Inquiries, Portfolio Value).
   - CRUD Listing Management (Create, Edit, Delete, Toggle Status).
   - Buyer Inquiries Inbox (View and update message status).

---

## 🚀 How to Run on Windows Laptop

### Option A: One-Click Launcher (Recommended)
Double-click `start.bat` in the project root folder. It will automatically install dependencies, seed the SQLite database, and launch both backend (Port 5000) and frontend (Port 3000) servers.

### Option B: Manual Command Prompt / PowerShell

1. **Install Dependencies**:
   ```cmd
   cmd /c npm --prefix server install
   cmd /c npm --prefix client install
   ```

2. **Seed Initial Database**:
   ```cmd
   node server/seed.js
   ```

3. **Start Development Servers**:
   ```cmd
   node scripts/dev.js
   ```

4. **Access App**:
   Open browser at: `http://localhost:3000`

---

## 🔑 Admin Credentials
- **Email**: `admin@realestate.com`
- **Password**: `admin123`

---

## 📦 How to Create `.ZIP` File

To recreate the distribution zip package at any time, run:
```cmd
npm run package
```
This generates `real-estate-portal.zip` in the root directory ready to unzip and run anywhere.
