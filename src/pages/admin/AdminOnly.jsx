import { useNavigate } from "react-router-dom";
import { logout } from "../../features/auth/authSlice";
import { useDispatch } from "react-redux";
import LockIcon from "@mui/icons-material/Lock";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import "./AdminOnly.css";
// import { ShieldLock } from "lucide-react";

const AdminOnly = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="admin-only-page">
      <div className="admin-only-card">
        <div className="lock-icon">
          <LockIcon fontSize="large" />
        </div>

        <h1> Admin Access Only</h1>

        <p className="subtitle">
          This LMS showcases <strong>AI-powered learning tools</strong>{" "}
          including Summaries, MCQs, and Intelligent Q&A.
        </p>

        <p className="description">
          To prevent misuse of <strong>paid AI APIs</strong> and maintain cost
          control, access to this live demo is intentionally limited to
          <strong> Admin users only</strong>.
        </p>

        <div className="interviewer-note">
          <VerifiedUserOutlinedIcon className="note-icon" />
          <span> For Interview Review</span>
          <p>
            Full access to the LMS, including all AI-driven features, is
            available via Admin credentials. These credentials will be shared
            during the interview to enable a complete technical and functional
            evaluation of the platform.
          </p>
        </div>

        <button className="logout-btn" onClick={handleLogout}>
          Logout & Return to Login
        </button>
      </div>
    </div>
  );
};

export default AdminOnly;
