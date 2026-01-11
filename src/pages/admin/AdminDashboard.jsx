import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CourseCards from "../../components/admin/CourseCards";
import { fetchCourses } from "../../features/courses/courseSlice";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";
import CircularProgress from "@mui/material/CircularProgress";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { list, status, error } = useSelector((state) => state.courses);

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  if (status === "loading")
    return (
      <div className="loader">
        <CircularProgress size={36} />
      </div>
    );
  if (status === "failed") return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="admin-dashboard">
      {/* ===== Header Section ===== */}
      <header className="admin-header">
        <h1>AI-Powered Learning Management System</h1>
        <p>
          Manage courses, structure lessons, and demonstrate intelligent
          learning features like AI summaries, Q&A, and MCQs.
        </p>
      </header>

      {/* ===== Courses Section ===== */}
      <section className="courses-section">
        <div className="section-heading">
          <h2>Published Courses</h2>
          <span>
            Click a course → view sections → explore lessons with AI tools
          </span>
        </div>
        <div className="course-card-container">
          <CourseCards
            courses={list}
            onCourseClick={(courseId) => navigate(`/admin/courses/${courseId}`)}
          />
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;
