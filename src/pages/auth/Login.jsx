import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser, clearAuthError } from "../../features/auth/authSlice";
import "./Login.css";
import CircularProgress from "@mui/material/CircularProgress";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { status, error, isAuthenticated, user } = useSelector(
    (state) => state.auth
  );

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) dispatch(clearAuthError());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(formData));
  };

  useEffect(() => {
    if (isAuthenticated && user?.role) {
      switch (user.role) {
        case "admin":
          navigate("/admin/dashboard");
          break;
        case "instructor":
          navigate("/instructor/dashboard");
          break;
        case "student":
          navigate("/student/dashboard");
          break;
        default:
          navigate("/login");
      }
    }
  }, [isAuthenticated, user, navigate]);

  return (
    <div className="login-wrapper">
      {/* Left Side Image */}
      <div className="login-image">
        <img
          src="https://media.istockphoto.com/id/1426988809/photo/security-password-login-online-concept-hands-typing-and-entering-username-and-password-of.jpg?s=1024x1024&w=is&k=20&c=IKu9EHf5cdK7cvXYU55go7M_7G4nKl2t8GowU8z_2F8="
          alt="Learning"
        />
      </div>

      {/* Right Side Form */}
      <div className="login-form-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2 className="login-title">Welcome Back!</h2>
          <p className="login-subtitle">Login to your account</p>

          {error && <p className="error-text">{error}</p>}

          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="login-btn"
            disabled={status === "loading"}
          >
            {status === "loading" ? (
              <div className="loader">
                <CircularProgress size={26} sx={{ color: "#fff" }}/>
              </div>
            ) : (
              "Login"
            )}
          </button>

          <p className="signup-text">
            Don't have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/signup")}
              className="link-btn"
              disabled={status === "loading"}
            >
              Sign Up
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
