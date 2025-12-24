# 🚀 MyLinkedIn - Professional Networking Platform

<div align="center">

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-15.4.5-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-22.14.0-339933?logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb)](https://www.mongodb.com/)
[![Firebase](https://img.shields.io/badge/Firebase-Auth-FFCA28?logo=firebase)](https://firebase.google.com/)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000?logo=vercel)](https://vercel.com/)

A full-stack LinkedIn-inspired platform built with Next.js, React, Firebase, MongoDB, and Express. Connect with professionals, share posts, and build your network.

[View Demo](https://my-linkedin-platform.vercel.app/) · [Report Bug](https://github.com/Avi2014/MyLinkedIn/issues) · [Request Feature](https://github.com/Avi2014/MyLinkedIn/issues)

</div>

---

## 📸 Screenshots

### Homepage & Landing

![Homepage](./public/HomePage.png)
_Modern landing page with call-to-action_

### User Authentication

![Login](./public/SignIn.png)
_Secure Firebase authentication_

### Main Feed

![Feed](./public/FeedPage.png)
_Dynamic social feed with posts_

### User Profile

![Profile](./public/ProfilePage.png)
_Comprehensive user profiles_

---

## ✨ Features

### 🔐 Authentication & Authorization

- **Firebase Authentication** - Email/password and Google OAuth
- Secure session management
- Protected routes and API endpoints
- Profile completion flow

### 👤 User Management

- Complete profile creation and editing
- Profile picture upload with Cloudinary
- User search functionality
- View other users' profiles
- Professional information (headline, bio, location, etc.)

### 📝 Post Management

- Create posts with text content
- Multi-media support (images, videos, documents)
- Edit and delete own posts
- Rich text formatting
- Post visibility controls

### 💬 Social Interactions

- Like/unlike posts
- Comment on posts
- Delete own comments
- Share posts
- View engagement metrics (likes count, comments count)

### 🔍 Search & Discovery

- Global user search
- Post search functionality
- Real-time search results
- Debounced search for performance

### 🎨 UI/UX Features

- Responsive design (mobile, tablet, desktop)
- Dark/light theme support
- Smooth animations with Framer Motion
- Loading states and skeletons
- Toast notifications
- Infinite scroll
- Image carousel for multiple media
- Optimistic UI updates

---

## 🛠️ Tech Stack

### Frontend

- **Framework:** Next.js 15.4.5 (App Router)
- **UI Library:** React 19
- **Styling:** Tailwind CSS 3.4.1
- **Animations:** Framer Motion 11.15.0
- **Icons:** Lucide React 0.468.0
- **State Management:** React Context API
- **HTTP Client:** Axios
- **Authentication:** Firebase Auth 11.2.0

### Backend

- **Runtime:** Node.js 22.14.0
- **Framework:** Express.js 4.21.2
- **Database:** MongoDB with Mongoose 8.9.4
- **File Upload:** Multer 1.4.5-lts.1
- **Cloud Storage:** Cloudinary
- **CORS:** cors 2.8.5
- **Environment:** dotenv 16.4.7

### Development Tools

- **Linting:** ESLint 9
- **Code Quality:** Prettier (implicit via VS Code)
- **Version Control:** Git

---

## 📁 Project Structure

```
my-linkedin-platform/
├── src/                                 # Frontend source code
│   ├── app/                             # Next.js App Router
│   │   ├── api/                         # API route handlers (Next.js proxies)
│   │   │   ├── posts/                   # Post-related API routes
│   │   │   ├── profile/                 # Profile API routes
│   │   │   ├── search/                  # Search functionality
│   │   │   ├── upload/                  # File upload routes
│   │   │   └── users/                   # User management routes
│   │   ├── auth/                        # Authentication pages
│   │   │   ├── login/                   # Login page
│   │   │   └── register/                # Registration page
│   │   ├── post/[postId]/               # Individual post page
│   │   ├── profile/                     # Profile pages
│   │   │   ├── [id]/                    # User profile by ID
│   │   │   └── complete/                # Profile completion
│   │   ├── search/                      # Search page
│   │   ├── globals.css                  # Global styles
│   │   ├── layout.js                    # Root layout
│   │   ├── page.js                      # Homepage/Feed
│   │   └── not-found.js                 # 404 page
│   ├── components/                      # Reusable React components
│   │   ├── Button.jsx                   # Custom button component
│   │   ├── Card.jsx                     # Card wrapper
│   │   ├── CreatePost.jsx               # Post creation form
│   │   ├── Footer.jsx                   # Footer component
│   │   ├── Header.jsx                   # Navigation header
│   │   ├── Input.jsx                    # Form input component
│   │   ├── LeftSidebar.jsx              # Left navigation sidebar
│   │   ├── LoadingComponents.jsx        # Loading skeletons
│   │   ├── LoadingScreen.jsx            # Full-page loader
│   │   ├── MediaCarousel.jsx            # Media gallery
│   │   ├── PageTransitionLoader.jsx     # Page transitions
│   │   ├── PostCard.jsx                 # Individual post display
│   │   ├── PostFeed.jsx                 # Posts feed container
│   │   ├── ProfileCompletionWrapper.jsx # Profile flow wrapper
│   │   ├── ProfileGuard.jsx             # Profile protection HOC
│   │   ├── RightSidebar.jsx             # Right sidebar
│   │   ├── SearchResults.jsx            # Search results display
│   │   ├── SmoothScrollProvider.jsx     # Smooth scroll context
│   │   └── Textarea.jsx                 # Textarea component
│   ├── context/                         # React Context providers
│   │   └── AuthContext.js               # Authentication context
│   ├── hooks/                           # Custom React hooks
│   │   └── useDebounce.js               # Debounce hook
│   └── lib/                             # Utility libraries
│       ├── firebase.js                  # Firebase configuration
│       ├── realtime.js                  # Real-time utilities
│       └── utils.js                     # Helper functions
├── server/                              # Backend Express.js server
│   ├── config/                          # Configuration files
│   │   └── cloudinary.js                # Cloudinary setup
│   ├── models/                          # Mongoose models
│   │   ├── Post.js                      # Post schema
│   │   └── User.js                      # User schema
│   ├── routes/                          # API route handlers
│   │   ├── posts.js                     # Post endpoints
│   │   ├── upload.js                    # File upload endpoints
│   │   └── users.js                     # User endpoints
│   ├── index.js                         # Server entry point
│   ├── package.json                     # Backend dependencies
│   ├── .env                             # Environment variables (ignored)
│   └── .env.example                     # Environment template
├── public/                              # Static assets
│   └── [images]                         # Screenshots and assets
├── .env.local                           # Frontend env variables (ignored)
├── .env.example                         # Frontend env template
├── .gitignore                           # Git ignore rules
├── next.config.mjs                      # Next.js configuration
├── tailwind.config.mjs                  # Tailwind CSS config
├── package.json                         # Frontend dependencies
├── start-dev.bat                        # Development startup script
└── README.md                            # Project documentation
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:

| Tool    | Version        | Download                            |
| ------- | -------------- | ----------------------------------- |
| Node.js | 18.x or higher | [nodejs.org](https://nodejs.org/)   |
| npm     | 9.x or higher  | Comes with Node.js                  |
| Git     | Latest         | [git-scm.com](https://git-scm.com/) |

### Quick Start

#### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Avi2014/MyLinkedIn.git
cd MyLinkedIn
```

#### 2️⃣ Install Dependencies

```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd server
npm install
cd ..
```

#### 3️⃣ Environment Setup

**Create `.env.local` in root directory:**

```env
# Frontend Environment Variables
NEXT_PUBLIC_API_URL=http://localhost:5000/api

# Firebase Configuration (Get from https://console.firebase.google.com/)
NEXT_PUBLIC_FIREBASE_API_KEY=your-firebase-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your-measurement-id
```

**Create `server/.env` file:**

```env
# Backend Environment Variables
MONGODB_URI=mongodb://localhost:27017/MyLinkedIn
# For production, use MongoDB Atlas:
# MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/MyLinkedIn

PORT=5000

# Cloudinary Configuration (Get from https://cloudinary.com/console)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

#### 4️⃣ Set Up Services

<details>
<summary><b>📱 Firebase Setup</b></summary>

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable **Authentication** → Email/Password & Google providers
4. Go to Project Settings → General → Your apps
5. Click "Web" and register your app
6. Copy configuration values to `.env.local`

</details>

<details>
<summary><b>☁️ Cloudinary Setup</b></summary>

1. Sign up at [Cloudinary](https://cloudinary.com/)
2. Go to Dashboard
3. Copy **Cloud Name**, **API Key**, and **API Secret**
4. Add them to `server/.env`

</details>

<details>
<summary><b>🗄️ MongoDB Setup</b></summary>

**Option A: Local MongoDB**

```bash
# Install MongoDB locally and start service
mongod
```

**Option B: MongoDB Atlas (Recommended for Production)**

1. Create free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a **M0 Free Cluster**
3. Add database user (Database Access)
4. Whitelist IP: `0.0.0.0/0` (Network Access)
5. Get connection string and update `MONGODB_URI`

</details>

#### 5️⃣ Run the Application

**Option 1: Using Batch Script (Windows)**

```bash
start-dev.bat
```

**Option 2: Manual Start**

```bash
# Terminal 1 - Backend
cd server
npm start

# Terminal 2 - Frontend
npm run dev
```

#### 6️⃣ Access the Application

- 🌐 **Frontend:** http://localhost:3000
- ⚙️ **Backend API:** http://localhost:5000
- 💚 **Health Check:** http://localhost:5000/health

Add your Firebase configuration:

```env
# Frontend Environment Variables
NEXT_PUBLIC_API_URL=http://localhost:5000/api

# Firebase Configuration (Get from https://console.firebase.google.com/)
NEXT_PUBLIC_FIREBASE_API_KEY=your-firebase-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your-measurement-id
```

**Backend (`server/.env`):**

```bash
cd server
cp .env.example .env
cd ..
```

Add your backend configuration:

```env
# Backend Environment Variables

# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/MyLinkedIn
# Or use MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/MyLinkedIn

# Server Port
PORT=5000

# Cloudinary Configuration (Get from https://cloudinary.com/console)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

#### 5. Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable **Authentication** → Email/Password & Google providers
4. Copy your web app configuration to `.env.local`
5. Set up Firestore Security Rules (optional):

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

#### 6. Cloudinary Setup

1. Sign up at [Cloudinary](https://cloudinary.com/)
2. Go to Dashboard
3. Copy your **Cloud Name**, **API Key**, and **API Secret**
4. Add them to `server/.env`

#### 7. MongoDB Setup

**Option A: Local MongoDB**

```bash
# Start MongoDB service
mongod
```

**Option B: MongoDB Atlas**

1. Create cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Get connection string
3. Update `MONGODB_URI` in `server/.env`

---

## 🏃 Running the Application

### Development Mode

**Option 1: Using the Batch Script (Windows)**

```bash
start-dev.bat
```

**Option 2: Manual Start**

Open two terminals:

**Terminal 1 - Backend:**

```bash
cd server
npm start
```

**Terminal 2 - Frontend:**

```bash
npm run dev
```

### Access the Application

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000
- **Health Check:** http://localhost:5000/health

---

## 📡 API Endpoints

### User Endpoints

| Method | Endpoint                      | Description              |
| ------ | ----------------------------- | ------------------------ |
| GET    | `/api/users`                  | Get all users            |
| GET    | `/api/users/:firebaseUid`     | Get user by Firebase UID |
| GET    | `/api/users/search?query=`    | Search users             |
| POST   | `/api/users`                  | Create new user          |
| POST   | `/api/users/complete-profile` | Complete user profile    |
| PUT    | `/api/users/:firebaseUid`     | Update user profile      |

### Post Endpoints

| Method | Endpoint                                | Description          |
| ------ | --------------------------------------- | -------------------- |
| GET    | `/api/posts`                            | Get all posts (feed) |
| GET    | `/api/posts/:postId`                    | Get single post      |
| GET    | `/api/posts/search?query=`              | Search posts         |
| POST   | `/api/posts`                            | Create new post      |
| PUT    | `/api/posts/:postId`                    | Update post          |
| DELETE | `/api/posts/:postId`                    | Delete post          |
| POST   | `/api/posts/:postId/like`               | Like/unlike post     |
| POST   | `/api/posts/:postId/comment`            | Add comment          |
| DELETE | `/api/posts/:postId/comment/:commentId` | Delete comment       |
| POST   | `/api/posts/:postId/share`              | Share post           |
| GET    | `/api/posts/:postId/likes`              | Get post likes       |
| GET    | `/api/posts/:postId/comments`           | Get post comments    |

### Upload Endpoints

| Method | Endpoint                      | Description            |
| ------ | ----------------------------- | ---------------------- |
| POST   | `/api/upload`                 | Upload post media      |
| POST   | `/api/upload/profile-picture` | Upload profile picture |
| POST   | `/api/upload/post-image`      | Upload post image      |

---

## 🗄️ Database Schema

### User Model

```javascript
{
  firebaseUid: String (unique, required),
  email: String (required),
  name: String (required),
  profilePicture: String,
  headline: String,
  location: String,
  bio: String,
  website: String,
  connections: [ObjectId],
  createdAt: Date,
  updatedAt: Date
}
```

### Post Model

```javascript
{
  author: ObjectId (ref: User, required),
  content: String (required),
  media: [{
    url: String,
    type: String (image/video/document),
    publicId: String
  }],
  likes: [ObjectId (ref: User)],
  comments: [{
    user: ObjectId (ref: User),
    text: String,
    createdAt: Date
  }],
  shares: Number,
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🎨 Styling & Theming

The application uses **Tailwind CSS** for styling with a custom color palette:

```javascript
// Key Colors
Primary Blue: #0A66C2
Hover Blue: #004182
Background: #F3F2EF
Card Background: #FFFFFF
Text Primary: #000000E6
Text Secondary: #00000099
```

### Responsive Breakpoints

- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

---

## 🔒 Security Features

- **Environment Variables** - All sensitive keys stored securely
- **Firebase Authentication** - Industry-standard auth
- **CORS Protection** - Configured for specific origins
- **Input Validation** - Server-side validation
- **Protected Routes** - Authentication required for sensitive pages
- **Secure File Upload** - Validation and size limits
- **MongoDB Injection Protection** - Mongoose sanitization

---

## 🚢 Deployment Guide

### 🌐 Frontend Deployment (Vercel)

<details open>
<summary><b>Step-by-Step Vercel Deployment</b></summary>

1. **Push to GitHub**

   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy on Vercel**

   - Go to [Vercel](https://vercel.com/new)
   - Import your GitHub repository
   - Configure:
     - **Framework:** Next.js (auto-detected)
     - **Root Directory:** `./`
     - **Build Command:** `npm run build`

3. **Add Environment Variables**

   - Go to Settings → Environment Variables
   - Add all `NEXT_PUBLIC_*` variables from `.env.local`
   - Set `NEXT_PUBLIC_API_URL` to your Render backend URL

4. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes
   - Your app will be live at: `https://your-app.vercel.app`

</details>

### ⚙️ Backend Deployment (Render)

<details open>
<summary><b>Step-by-Step Render Deployment</b></summary>

1. **Create Web Service**

   - Go to [Render Dashboard](https://dashboard.render.com/)
   - Click "New +" → "Web Service"
   - Connect your GitHub repository

2. **Configure Service**

   ```
   Name: mylinkedin-api
   Root Directory: server
   Environment: Node
   Build Command: npm install
   Start Command: npm start
   Plan: Free
   ```

3. **Add Environment Variables**

   ```env
   MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/MyLinkedIn
   PORT=5000
   CLOUDINARY_CLOUD_NAME=your-cloud-name
   CLOUDINARY_API_KEY=your-api-key
   CLOUDINARY_API_SECRET=your-api-secret
   ```

4. **Deploy**

   - Click "Create Web Service"
   - Wait 3-5 minutes for deployment
   - Copy your Render URL: `https://mylinkedin-api.onrender.com`

5. **Update Vercel**
   - Go back to Vercel → Your Project → Settings → Environment Variables
   - Update `NEXT_PUBLIC_API_URL` to: `https://mylinkedin-api.onrender.com/api`
   - Redeploy from Deployments tab

</details>

### 🗄️ Database (MongoDB Atlas)

<details>
<summary><b>Production Database Setup</b></summary>

1. **Create Free Cluster**

   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Create M0 Free Cluster

2. **Configure Access**

   - Database Access: Create user with password
   - Network Access: Add `0.0.0.0/0` (allow all)

3. **Get Connection String**

   ```
   mongodb+srv://username:password@cluster.mongodb.net/MyLinkedIn?retryWrites=true&w=majority
   ```

4. **Update Render**
   - Add connection string to `MONGODB_URI` in Render
   - Service will auto-redeploy

</details>

### ✅ Post-Deployment Checklist

- [ ] Frontend deployed on Vercel
- [ ] Backend deployed on Render
- [ ] MongoDB Atlas configured
- [ ] Environment variables set correctly
- [ ] `NEXT_PUBLIC_API_URL` points to Render backend
- [ ] CORS allows Vercel domain in backend
- [ ] Test registration and login
- [ ] Test profile completion
- [ ] Test post creation and upload

---

## 🧪 Testing & Verification

### Local Testing

```bash
# Health check
curl http://localhost:5000/health

# Test user endpoints
curl http://localhost:5000/api/users

# Test posts endpoints
curl http://localhost:5000/api/posts
```

### Production Testing

```bash
# Replace with your actual URLs
curl https://mylinkedin-api.onrender.com/health
curl https://my-linkedin-platform.vercel.app
```

---

## 🐛 Troubleshooting

<details>
<summary><b>❌ "Cannot find module" errors</b></summary>

```bash
# Clear and reinstall dependencies
rm -rf node_modules package-lock.json
npm install

cd server
rm -rf node_modules package-lock.json
npm install
```

</details>

<details>
<summary><b>❌ MongoDB connection failed</b></summary>

**Local MongoDB:**

```bash
# Check if MongoDB is running
mongod --version
# Start MongoDB service
mongod
```

**MongoDB Atlas:**

- Verify connection string format
- Check username/password (URL encode special characters)
- Ensure IP `0.0.0.0/0` is whitelisted
- Confirm database name is included in URI

</details>

<details>
<summary><b>❌ Firebase authentication errors</b></summary>

- Verify Firebase project is active
- Check all API keys in `.env.local`
- Ensure Email/Password & Google auth are enabled in Firebase Console
- Check Firebase domain whitelist includes your Vercel URL

</details>

<details>
<summary><b>❌ Cloudinary upload fails</b></summary>

- Verify credentials in `server/.env`
- Check file size (default limit: 50MB)
- Ensure cloud storage quota not exceeded
- Test credentials in Cloudinary dashboard

</details>

<details>
<summary><b>❌ Port already in use</b></summary>

```bash
# Windows
netstat -ano | findstr :3000
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:3000 | xargs kill -9
lsof -ti:5000 | xargs kill -9
```

</details>

<details>
<summary><b>❌ Render backend sleeping / 500 errors</b></summary>

- Free tier sleeps after 15 minutes of inactivity
- First request after sleep takes ~30 seconds to wake
- Consider keeping backend awake with periodic health checks
- Check Render logs for specific errors

</details>

<details>
<summary><b>❌ CORS errors in production</b></summary>

Ensure `server/index.js` includes your Vercel URL:

```javascript
origin: [
  "http://localhost:3000",
  "https://your-vercel-app.vercel.app",
  /\.vercel\.app$/,
],
```

</details>

- Verify credentials in `server/.env`
- Check file size limits (default 50MB)
- Ensure cloud storage quota not exceeded

**5. Port already in use**

```bash
# Kill process on port 3000 or 5000
npx kill-port 3000 5000
```

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/Avi2014/MyLinkedIn/issues).

### How to Contribute

1. **Fork the Project**
2. **Create your Feature Branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Commit your Changes**
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. **Push to the Branch**
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **Open a Pull Request**

---

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

<div align="center">

**Avinash Ranjan**

[![GitHub](https://img.shields.io/badge/GitHub-Avi2014-181717?style=for-the-badge&logo=github)](https://github.com/Avi2014)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Avinash%20Ranjan-0A66C2?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/avinash-ranjan-16185a28a/)

</div>

---

## 🙏 Acknowledgments

Special thanks to these amazing tools and resources:

- [Next.js](https://nextjs.org/) - The React Framework
- [Firebase](https://firebase.google.com/) - Authentication & Hosting
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) - Cloud Database
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [Cloudinary](https://cloudinary.com/) - Media Management
- [Lucide Icons](https://lucide.dev/) - Beautiful Icons
- [Framer Motion](https://www.framer.com/motion/) - Animation Library
- [Vercel](https://vercel.com/) - Frontend Hosting
- [Render](https://render.com/) - Backend Hosting

---

## 🗺️ Roadmap

### Phase 1 - Core Features ✅

- [x] User authentication (Email/Google)
- [x] Profile management
- [x] Post creation and interactions
- [x] Image/video uploads
- [x] Search functionality

### Phase 2 - Enhanced Features 🚧

- [ ] Real-time notifications
- [ ] Direct messaging
- [ ] Connection requests
- [ ] Post analytics
- [ ] Advanced search filters

### Phase 3 - Professional Features 📋

- [ ] Job postings
- [ ] Company pages
- [ ] Skills & endorsements
- [ ] Recommendations
- [ ] Groups and communities

### Phase 4 - Platform Expansion 🎯

- [ ] Mobile app (React Native)
- [ ] Video calls integration
- [ ] Stories feature
- [ ] Learning platform
- [ ] API for third-party integrations

---

## 📊 Project Stats

<div align="center">

![GitHub repo size](https://img.shields.io/github/repo-size/Avi2014/MyLinkedIn)
![GitHub stars](https://img.shields.io/github/stars/Avi2014/MyLinkedIn?style=social)
![GitHub forks](https://img.shields.io/github/forks/Avi2014/MyLinkedIn?style=social)
![GitHub issues](https://img.shields.io/github/issues/Avi2014/MyLinkedIn)
![GitHub pull requests](https://img.shields.io/github/issues-pr/Avi2014/MyLinkedIn)

</div>

---

<div align="center">

## 💙 Show Your Support

If you found this project helpful or learned something from it, please give it a ⭐️!

**Made with ❤️ by [Avinash Ranjan](https://github.com/Avi2014)**

---

**[Back to Top ⬆️](#-mylinkedin---professional-networking-platform)**

</div>
