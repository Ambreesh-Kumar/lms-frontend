import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser, clearAuthError } from "../../features/auth/authSlice";
import "./Signup.css";
import CircularProgress from "@mui/material/CircularProgress";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { status, error, isAuthenticated, user } = useSelector(
    (state) => state.auth
  );

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    avatar: null,
  });

  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "avatar") {
      setFormData({ ...formData, avatar: files[0] || null });
      if (files[0]) setPreview(URL.createObjectURL(files[0]));
      else setPreview(null);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("password", formData.password);
    if (formData.avatar) data.append("avatar", formData.avatar);
    dispatch(registerUser(data));
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
    return () => dispatch(clearAuthError());
  }, [isAuthenticated, user, navigate, dispatch]);

  return (
    <div className="signup-wrapper">
      <div className="signup-image">
        <img
          src="https://plus.unsplash.com/premium_photo-1720192861639-1524439fc166?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Learning"
        />
      </div>

      <div className="signup-form-wrapper">
        <form className="signup-card" onSubmit={handleSubmit}>
          <h2>Create Account</h2>

          {error && <p className="error-text">{error}</p>}

          <div className="input-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
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
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group avatar-group">
            <label>Avatar</label>
            <input
              type="file"
              name="avatar"
              accept="image/*"
              onChange={handleChange}
            />
            {preview && (
              <img
                src={preview}
                alt="Avatar Preview"
                className="avatar-preview"
              />
            )}
          </div>

          <button
            type="submit"
            className="signup-btn"
            disabled={status === "loading"}
          >
            {status === "loading" ? (
              <div className="loader">
                <CircularProgress size={26} sx={{ color: "#fff" }} />
              </div>
            ) : (
              "Sign Up"
            )}
          </button>

          <p className="login-link">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="link-btn"
            >
              Login
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
