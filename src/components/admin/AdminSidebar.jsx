import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../../features/auth/authSlice";
import "./AdminSidebar.css";

const AdminSidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <aside className="admin-sidebar">
      {/* BRAND */}
      <div className="sidebar-top">
        <h2>
          LMS<span>AI</span>
        </h2>
        <p className="sidebar-tagline">Admin Panel</p>
      </div>

      {/* USER */}
      <div className="sidebar-user">
        <img
          src={user?.avatar || "https://i.pravatar.cc/100"}
          alt="Admin"
        />
        <p className="user-name">{user?.name}</p>
        <span className="user-role">{user?.role}</span>
      </div>

      {/* NAV */}
      <nav className="sidebar-nav">
        <NavLink to="/admin/dashboard" end>
          <span>📊</span>
          Dashboard
        </NavLink>

        <NavLink to="/admin/courses" end>
          <span>📚</span>
          Courses
        </NavLink>

        <NavLink to="/admin/ai-tools" end>
          <span>🤖</span>
          AI Features
        </NavLink>
      </nav>

      {/* LOGOUT */}
      <div className="sidebar-logout">
        <button onClick={handleLogout}>Logout</button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
