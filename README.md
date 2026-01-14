# 🚀 AI-Powered Learning Management System (LMS) — Frontend
A **full-scale, AI-integrated Learning Management System frontend** engineered with modern React and Redux Toolkit, designed to work with a scalable Node.js backend that embeds **AI directly into the learning workflow**. The platform enables lesson-aware AI summarization, automated quiz generation, contextual Q&A, intelligent differentiation between text and video lessons, and secure role-based access — demonstrating **production-level AI feature integration, not prototypes**.

This project demonstrates a **real-world LMS workflow** with:
* Role-based access (Admin / Instructor / Student)
* AI-powered lesson enhancements (summaries, MCQs, Q&A)
* Modern frontend architecture with **Redux Toolkit** and **React Router v6**
* Seamless integration with a production-ready backend

**Backend repository**: [LMS Backend](https://github.com/Ambreesh-Kumar/lms-backend.git)
 — featuring **RBAC, AI integration, EJS-based Razorpay checkout, JWT authentication, and cloud media uploads**.

 ### 🌐 Live URLs
 | Component                      | URL                                                                            |
| ------------------------------ | ------------------------------------------------------------------------------ |
| **Backend API (Base Url)**                | [https://lms-backend-rmh5.onrender.com](https://lms-backend-rmh5.onrender.com) |
| **Frontend (Admin Dashboard)** | [http://lms-frontend-seven-taupe.vercel.app/](http://lms-frontend-seven-taupe.vercel.app/)                                               |

### 🧩 Why This Project?
This LMS demonstrates the **integration of cutting-edge AI features into a real-world education platform**, allowing:
* Admins to manage courses, sections, and lessons
* AI-assisted lesson summaries and content generation
* Structured MCQs and Q&A for learning reinforcement
* Modern full-stack design demonstrating **enterprise-level architecture**

It’s a **showcase of full-stack React + Node.js capabilities**, combining AI, RBAC, and cloud-based media management.

### 🧩 System Overview
#### Frontend Architecture
```
src/
├── api/                # API calls for courses, sections, lessons, AI
├── components/         # Reusable components (CourseCards, LessonDetail, etc.)
├── features/           # Redux Toolkit slices (auth, courses, sections, lessons, AI)
├── pages/              # Page-level components (AdminDashboard, CoursePage, LessonPage)
├── layouts/            # Layout components (AdminLayout, Sidebar)
├── router/             # React Router v6 configuration
└── App.jsx             # Root app entry
```
##### Key Points:
* Redux Toolkit slices handle **global state**
* Async thunks fetch data from backend endpoints
* ProtectedRoute ensures **role-based routing**
* Responsive UI with cards, vertical section/lesson lists, and AI actions

#### Backend Architecture Overview
Backend repo:  [LMS Backend](https://github.com/Ambreesh-Kumar/lms-backend.git)
```text
src/
├── config/
│   ├── db.js                         # MongoDB connection
│   ├── cloudinary.js                 # Cloudinary configuration
│   └── razorpay.js                   # Razorpay SDK instance
│
├── controllers/
│   ├── authController.js
│   ├── courseController.js
│   ├── sectionController.js
│   ├── lessonController.js
│   ├── enrollmentController.js
│   ├── progressController.js
│   ├── paymentController.js
│   ├── aiController.js               # AI controller
│   ├── adminDashboardController.js   # Admin dashboards
│   ├── dashboardController.js        # Student dashboards
│   ├── instructorDashboardController.js
│   └── payment/
│       └── checkout.controller.js    # Handle EJS checkout flow
│
├── routes/
│   ├── authRoutes.js
│   ├── courseRoutes.js
│   ├── sectionRoutes.js
│   ├── lessonRoutes.js
│   ├── adminLessonRoutes.js          # Admin lesson access routes
│   ├── enrollmentRoutes.js
│   ├── progressRoutes.js
│   ├── paymentRoutes.js              # API-based Razorpay flow
│   ├── payment.ejs.routes.js         # EJS checkout pages
│   ├── aiRoutes.js                   # Admin-only AI APIs
│   ├── adminDashboardRoutes.js       # Admin dashboard routes
│   ├── dashboardRoutes.js            # Student dashboard routes
│   └── instructorDashboardRoutes.js  # Instructor dashboard routes
│
├── models/
│   ├── User.js
│   ├── Course.js
│   ├── Section.js
│   ├── Lesson.js
│   ├── Enrollment.js
│   ├── Progress.js
│   └── Payment.js
│
├── services/
│   └── ai.service.js                 # Gemini integration (stateless, secure)
│
├── middlewares/
│   ├── auth.js
│   ├── authFromQuery.js              # Auth via query token for EJS checkout
│   ├── authOptional.js
│   ├── requireAdmin.js
│   ├── requireInstructor.js
│   ├── multer.js
│   └── errorHandler.js
│
├── views/                            # Server-rendered payment UI
│   ├── checkout.ejs
│   ├── success.ejs
│   ├── failure.ejs
│   ├── cancel.ejs
│   ├── alreadyPaid.ejs
│   └── unauthorized.ejs              # Token expired during checkout
│
├── public/
│   └── css/
│       └── payments/
│           ├── base.css
│           └── checkout.css
│
├── utils/
│   ├── ApiError.js
│   ├── AsyncHandler.js
│   ├── jwt.js
│   ├── cloudinaryDelete.js
│   ├── cloudinaryUpload.js
│   └── processThumbnail.js           # Thumbnail size handling
│
├── app.js                            # Express app setup
└── server.js                         # Server bootstrap
```

##### Capabilities Used by Frontend:
* **Courses, Sections, Lessons APIs** — fetch & display content
* **AI APIs** — lesson summary, MCQs, Q&A (Admin only)
* **JWT Auth & RBAC** — secure frontend access
* **Media Upload System** — Multer + Cloudinary for avatars and course thumbnails during signup and course creation

### 🧠 AI Features — Advanced Integration
This LMS frontend leverages **lesson-level AI capabilities** fully integrated with the backend, giving admins **intelligent content insights and generation tools**. AI is central to the platform and showcases **modern AI integration in real-world applications**.

#### 1️⃣ AI Lesson Summary
* **Text Lessons**: Automatically generates **structured summaries** from lesson content, including key concepts, examples, usage, and limitations. The summary is formatted for easy reading and quick reference.
* **Video Lessons**: Extracts the **video URL** and displays it with instructions to watch, providing a **ready-to-use summary placeholder**. Video lessons without transcripts cannot generate MCQs or Q&A, and the system intelligently handles this.
* **Purpose**: Helps Students, instructors and admins quickly understand lesson content and generate course previews without manual summarization.
##### API Endpoint:
```
POST /api/ai/lesson/:lessonId/summary
```
#### 2️⃣ AI Multiple-Choice Question (MCQ) Generator
* **Text Lessons**: Automatically creates **questions with 4 options (A-D)**, highlighting the correct answer. Questions are context-aware and aligned with the lesson content.
* **Video Lessons**: MCQs are **disabled for video lessons without transcripts** to avoid inaccurate content generation.
* **Usage**: Students, instructors and Admins can generate assessment-ready questions instantly, enabling quizzes and automated testing.
##### API Endpoint:
```
POST /api/ai/lesson/:lessonId/mcqs
```
##### MCQ Output Example:
```
Q1: What is generative AI?
A) To classify data
B) To predict trends
C) To generate new content ✅
D) To analyze existing data
```
#### 3️⃣ AI Question & Answer (Q&A)
* Admins can ask **natural language questions** related to a lesson.
* **Text Lessons**: AI extracts **contextual answers** strictly from lesson content.
* **Video Lessons**: AI answers are only generated if **transcripts are available**. Otherwise, it prevents inaccurate output.
* **Use Case**: This feature demonstrates real-time intelligent querying and contextual understanding of lessons by AI.
##### API Endpoint with Example:
```
POST /api/ai/lesson/:lessonId/qna
Body: { "question": "What is generative AI?" }

```
####  🔥 Why This AI Integration is Impressive
* **Full production-level AI**: Not a mock or static output, it’s **dynamic and real-time**.
* **Supports multiple content types**: Text and video lessons handled differently, ensuring **data integrity**.
* **Admin-centric**: AI tools empower admins to **generate summaries, assessments, and answers instantly**.
* **Error handling & validation**: Video lessons without transcripts do not generate MCQs/Q&A, showcasing **robust design thinking**.

### 🖥️ UI Flow
1. **Login → Admin Dashboard**
2. **Published Courses** displayed in **responsive cards**
3. **Select a course → Sections listed vertically on left**
4. **Select a section → Lessons displayed on right**
5. **Select a lesson → Lesson content displayed with AI actions**
  * **Summary**, **MCQs**, and **Q&A**
  * Video lessons play in embedded player
6. **Sidebar persists across all pages** with LMS logo, logout, and navigation

### 🔐 Authentication & Role-Based Access
* JWT-based login (access + refresh token)
* Protected routes based on **roles** (Admin / Instructor / Student)
* Admin has access to AI features
* Secure logout & token persistence on refresh

### 🗂️ Media Upload System
* Avatar upload during signup using Multer + Cloudinary
* Course thumbnails handled similarly during course creation
* Ensures fast, scalable, and secure media storage

### 🧪 Testing & Validation
* All APIs tested in Postman
* Validated AI endpoints for text & video lessons
* Error handling implemented for unsupported content (video lessons without transcripts for MCQs/Q&A)
* Frontend state management validated with Redux Toolkit

### 💡 Key Highlights
* Production-ready frontend **integrated with backend**
* Responsive **course cards, section lists, lesson views**
* Admin-only **AI content generation**
* Role-based **secure access**
* Clean, modular, **scalable React architecture**

### 👨‍💻 Developer
**Ambreesh Kumar — Full Stack Developer**  
Specializes in **AI integrations, full-stack architecture, and production-grade applications**  

- **GitHub**: https://github.com/Ambreesh-Kumar 
- **LinkedIn**: [https://www.linkedin.com/in/ambreesh-kumar](https://www.linkedin.com/in/ambreesh-kumar?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app)
- **Email**: kumarambreesh70@gmail.com


### License & Usage
© 2025 Ambreesh Kumar. All rights reserved.
