// src/pages/admin/CoursesPage.jsx
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourses } from "../../features/courses/courseSlice";
import CourseCards from "../../components/admin/CourseCards";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

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
    <div style={{ padding: "2rem" }}>
      <h1>All Courses</h1>
      <p>Click a course to view its sections and lessons.</p>
      <br />
      <CourseCards
        courses={list}
        onCourseClick={(courseId) => navigate(`/admin/courses/${courseId}`)}
      />
    </div>
  );
};

export default CoursesPage;
