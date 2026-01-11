import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchSections } from "../../features/sections/sectionSlice";
import {
  fetchLessonsBySectionAdmin,
  clearLessons,
} from "../../features/lessons/lessonSlice";

import "./CourseDetails.css";

const CourseDetails = () => {
  const { courseId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { list: courses } = useSelector((state) => state.courses);
  const { list: sections } = useSelector((state) => state.sections);
  const { list: lessons } = useSelector((state) => state.lessons);

  const [selectedSectionId, setSelectedSectionId] = useState(null);

  const course = courses.find((c) => c._id === courseId);

  useEffect(() => {
    dispatch(clearLessons());
    dispatch(fetchSections(courseId));
  }, [courseId, dispatch]);

  useEffect(() => {
    if (selectedSectionId) {
      dispatch(fetchLessonsBySectionAdmin(selectedSectionId));
    }
  }, [selectedSectionId, dispatch]);

  return (
    <div className="course-details">
      {/* ===== Header ===== */}
      <header className="course-header">
        <h1>{course?.title || "Course Details"}</h1>
        <p>
          Select a section to explore lessons. Each lesson demonstrates
          AI-powered features like summaries, Q&A, and MCQs.
        </p>
      </header>

      {/* ===== Content Layout ===== */}
      <div className="course-content">
        {/* LEFT — Sections */}
        <aside className="sections-panel">
          <h3>Course Sections</h3>

          {sections.length === 0 && (
            <p className="empty-text">No sections found</p>
          )}

          {sections.map((section) => (
            <div
              key={section._id}
              onClick={() => setSelectedSectionId(section._id)}
              className={`section-item ${
                section._id === selectedSectionId ? "active" : ""
              }`}
            >
              <span>📂</span>
              {section.title}
            </div>
          ))}
        </aside>

        {/* RIGHT — Lessons */}
        <section className="lessons-panel">
          <h3>Lessons</h3>

          {!selectedSectionId && (
            <p className="empty-text">Select a section to view lessons</p>
          )}

          {lessons.map((lesson) => (
            <div
              key={lesson._id}
              className="lesson-card"
              onClick={() =>
                navigate(`/admin/lessons/${lesson._id}`, {
                  state: { sectionId: selectedSectionId },
                })
              }
            >
              <div>
                <h4>{lesson.title}</h4>
                <p>Click to open lesson & AI tools</p>
              </div>
              <span className="arrow">→</span>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};

export default CourseDetails;
