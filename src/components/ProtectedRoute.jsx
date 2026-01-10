import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children, roles }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  if (roles && !roles.includes(user.role)) {
    switch (user.role) {
      case "admin":
        return <Navigate to="/admin/dashboard" replace />;
      case "instructor":
        return <Navigate to="/instructor/dashboard" replace />;
      case "student":
        return <Navigate to="/student/dashboard" replace />;
      default:
        return <Navigate to="/login" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;
