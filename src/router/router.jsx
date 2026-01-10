import { createBrowserRouter, Navigate } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import ErrorPage from "../pages/ErrorPage";

import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";

import AdminDashboard from "../pages/admin/AdminDashboard";
import InstructorDashboard from "../pages/instructor/InstructorDashboard";
import StudentDashboard from "../pages/student/StudentDashboard";

import ProtectedRoute from "../components/ProtectedRoute";

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
        path: "admin/dashboard",
        element: (
          <ProtectedRoute roles={["admin"]}>
            <AdminDashboard />
          </ProtectedRoute>
        ),
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
