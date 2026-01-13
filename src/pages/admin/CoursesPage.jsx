// src/pages/admin/CoursesPage.jsx
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourses } from "../../features/courses/courseSlice";
import CourseCards from "../../components/admin/CourseCards";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { FaBook } from "react-icons/fa";

const CoursesPage = () => {
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
    <div className="courses-page">
      <div className="courses-header">
        <div className="header-top">
          <div className="header-top-heading">
            <FaBook className="header-icon" />
            <h1>All Courses</h1>
          </div>
          <span className="course-count">{list.length} Courses available</span>
        </div>
        <p className="subtitle">
          Click a course to access lessons and AI-generated summaries, MCQs, and
          Q&A insights.
        </p>
      </div>
      <div className="course-card-container">
        <CourseCards
          courses={list}
          onCourseClick={(courseId) => navigate(`/admin/courses/${courseId}`)}
        />
      </div>
    </div>
  );
};

export default CoursesPage;
