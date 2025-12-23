# MyLinkedIn - Professional Networking Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-15.4.5-black)](https://nextjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-22.14.0-green)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Database-green)](https://www.mongodb.com/)
[![Firebase](https://img.shields.io/badge/Firebase-Auth-orange)](https://firebase.google.com/)

A modern, full-stack professional networking platform inspired by LinkedIn. Built with Next.js 15, React, Firebase Authentication, MongoDB, Express.js, and Cloudinary for media management. Features real-time interactions, profile management, post creation, and social engagement.

## 🌟 Live Demo

Experience the platform: [MyLinkedIn Platform](https://my-linkedin-platform.vercel.app/)

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
├── src/                              # Frontend source code
│   ├── app/                          # Next.js App Router
│   │   ├── api/                      # API route handlers (Next.js proxies)
│   │   │   ├── posts/                # Post-related API routes
│   │   │   ├── profile/              # Profile API routes
│   │   │   ├── search/               # Search functionality
│   │   │   ├── upload/               # File upload routes
│   │   │   └── users/                # User management routes
│   │   ├── auth/                     # Authentication pages
│   │   │   ├── login/                # Login page
│   │   │   └── register/             # Registration page
│   │   ├── post/[postId]/            # Individual post page
│   │   ├── profile/                  # Profile pages
│   │   │   ├── [id]/                 # User profile by ID
│   │   │   └── complete/             # Profile completion
│   │   ├── search/                   # Search page
│   │   ├── globals.css               # Global styles
│   │   ├── layout.js                 # Root layout
│   │   ├── page.js                   # Homepage/Feed
│   │   └── not-found.js              # 404 page
│   ├── components/                   # Reusable React components
│   │   ├── Button.jsx                # Custom button component
│   │   ├── Card.jsx                  # Card wrapper
│   │   ├── CreatePost.jsx            # Post creation form
│   │   ├── Footer.jsx                # Footer component
│   │   ├── Header.jsx                # Navigation header
│   │   ├── Input.jsx                 # Form input component
│   │   ├── LeftSidebar.jsx           # Left navigation sidebar
│   │   ├── LoadingComponents.jsx    # Loading skeletons
│   │   ├── LoadingScreen.jsx        # Full-page loader
│   │   ├── MediaCarousel.jsx        # Media gallery
│   │   ├── PageTransitionLoader.jsx # Page transitions
│   │   ├── PostCard.jsx              # Individual post display
│   │   ├── PostFeed.jsx              # Posts feed container
│   │   ├── ProfileCompletionWrapper.jsx # Profile flow wrapper
│   │   ├── ProfileGuard.jsx          # Profile protection HOC
│   │   ├── RightSidebar.jsx          # Right sidebar
│   │   ├── SearchResults.jsx         # Search results display
│   │   ├── SmoothScrollProvider.jsx  # Smooth scroll context
│   │   └── Textarea.jsx              # Textarea component
│   ├── context/                      # React Context providers
│   │   └── AuthContext.js            # Authentication context
│   ├── hooks/                        # Custom React hooks
│   │   └── useDebounce.js            # Debounce hook
│   └── lib/                          # Utility libraries
│       ├── firebase.js               # Firebase configuration
│       ├── realtime.js               # Real-time utilities
│       └── utils.js                  # Helper functions
├── server/                           # Backend Express.js server
│   ├── config/                       # Configuration files
│   │   └── cloudinary.js             # Cloudinary setup
│   ├── models/                       # Mongoose models
│   │   ├── Post.js                   # Post schema
│   │   └── User.js                   # User schema
│   ├── routes/                       # API route handlers
│   │   ├── posts.js                  # Post endpoints
│   │   ├── upload.js                 # File upload endpoints
│   │   └── users.js                  # User endpoints
│   ├── index.js                      # Server entry point
│   ├── package.json                  # Backend dependencies
│   ├── .env                          # Environment variables (ignored)
│   └── .env.example                  # Environment template
├── public/                           # Static assets
│   └── [images]                      # Screenshots and assets
├── .env.local                        # Frontend env variables (ignored)
├── .env.example                      # Frontend env template
├── .gitignore                        # Git ignore rules
├── next.config.mjs                   # Next.js configuration
├── tailwind.config.mjs               # Tailwind CSS config
├── package.json                      # Frontend dependencies
├── start-dev.bat                     # Development startup script
└── README.md                         # Project documentation
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:

- **Node.js** 18.x or higher ([Download](https://nodejs.org/))
- **npm** 9.x or higher (comes with Node.js)
- **MongoDB** ([Local Installation](https://www.mongodb.com/try/download/community) or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))
- **Git** ([Download](https://git-scm.com/))

### Installation

#### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/MyLinkedIn.git
cd MyLinkedIn
```

#### 2. Install Frontend Dependencies

```bash
npm install
```

#### 3. Install Backend Dependencies

```bash
cd server
npm install
cd ..
```

#### 4. Environment Configuration

Create environment files from templates:

**Frontend (`.env.local`):**

```bash
cp .env.example .env.local
```

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

## 🚢 Deployment

### Frontend (Vercel)

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com/)
3. Import your repository
4. Add environment variables from `.env.local`
5. Deploy

### Backend (Render)

1. Push your code to GitHub
2. Go to [Render](https://render.com/)
3. Create new Web Service
4. Connect your repository
5. Configure:
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Root Directory: `server`
6. Add environment variables from `server/.env`
7. Create MongoDB database (or use Atlas)
8. Deploy

### Environment Variables for Production

Update these in your deployment platforms:

- `NEXT_PUBLIC_API_URL` → Your backend URL
- `MONGODB_URI` → Production MongoDB connection
- All Firebase and Cloudinary credentials

---

## 🧪 Testing

**Health Check:**

```bash
curl http://localhost:5000/health
```

**API Test:**

```bash
# Get all users
curl http://localhost:5000/api/users

# Get all posts
curl http://localhost:5000/api/posts
```

---

## 🐛 Troubleshooting

### Common Issues

**1. "Cannot find module" errors**

```bash
# Reinstall dependencies
npm install
cd server && npm install
```

**2. MongoDB connection failed**

```bash
# Check if MongoDB is running
mongod --version

# Or check MongoDB Atlas connection string
```

**3. Firebase authentication errors**

- Verify Firebase project is active
- Check API keys in `.env.local`
- Ensure auth providers are enabled in Firebase Console

**4. Cloudinary upload fails**

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

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Avinash Ranjan**

- GitHub: [@yourusername](https://github.com/Avi2014)
- LinkedIn: [Your LinkedIn](https://www.linkedin.com/in/avinash-ranjan-16185a28a/)

---

## 🙏 Acknowledgments

- [Next.js Documentation](https://nextjs.org/docs)
- [Firebase Documentation](https://firebase.google.com/docs)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Cloudinary](https://cloudinary.com/)
- [Lucide Icons](https://lucide.dev/)
- [Framer Motion](https://www.framer.com/motion/)

---

## 📧 Support

For support, email your-email@example.com or open an issue in the repository.

---

## 🗺️ Roadmap

- [ ] Real-time notifications
- [ ] Direct messaging
- [ ] Job postings
- [ ] Groups and communities
- [ ] Advanced search filters
- [ ] Analytics dashboard
- [ ] Mobile app (React Native)
- [ ] Video posts support
- [ ] Stories feature
- [ ] Endorsements and skills

---

**⭐ If you found this project helpful, please give it a star!**

---

Made with ❤️ by Avinash Ranjan
