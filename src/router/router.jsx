import { createBrowserRouter, Navigate } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import ErrorPage from "../pages/ErrorPage";

import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";

import AdminDashboard from "../pages/admin/AdminDashboard";
import InstructorDashboard from "../pages/instructor/InstructorDashboard";
import StudentDashboard from "../pages/student/StudentDashboard";

import ProtectedRoute from "../components/ProtectedRoute";
import AdminLayout from "../layouts/AdminLayout";
import CourseDetails from "../pages/admin/CourseDetails";
import LessonDetails from "../pages/admin/LessonDetails";
import CoursesPage from "../pages/admin/CoursesPage";
import AIFeatures from "../pages/admin/AIFeatures";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Navigate to="/login" replace /> },

      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },

      {
        path: "admin",
        element: (
          <ProtectedRoute roles={["admin"]}>
            <AdminLayout />
          </ProtectedRoute>
        ),
        children: [
          { path: "dashboard", element: <AdminDashboard /> },
          { path: "courses/:courseId", element: <CourseDetails /> },
          { path: "lessons/:lessonId", element: <LessonDetails /> },
          { path: "courses", element: <CoursesPage /> },
          { path: "ai-tools", element: <AIFeatures /> },
        ],
      },
      {
        path: "instructor/dashboard",
        element: (
          <ProtectedRoute roles={["instructor"]}>
            <InstructorDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "student/dashboard",
        element: (
          <ProtectedRoute roles={["student"]}>
            <StudentDashboard />
          </ProtectedRoute>
        ),
      },

      { path: "*", element: <ErrorPage /> },
    ],
  },
]);

export default router;
