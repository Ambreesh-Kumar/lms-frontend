import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourses } from "../../features/courses/courseSlice";
import { fetchSections } from "../../features/sections/sectionSlice";
import { fetchLessonsBySectionAdmin } from "../../features/lessons/lessonSlice";
import AIActions from "./AIActions";
import "./AIFeatures.css";

const AIFeatures = () => {
  const dispatch = useDispatch();
  const { list: courses } = useSelector((state) => state.courses);
  const { list: sections } = useSelector((state) => state.sections);
  const { list: lessons } = useSelector((state) => state.lessons);

  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [selectedSectionId, setSelectedSectionId] = useState(null);
  const [selectedLessonId, setSelectedLessonId] = useState(null);

  // Load all courses on mount
  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  // Load sections when a course is selected
  useEffect(() => {
    if (selectedCourseId) {
      dispatch(fetchSections(selectedCourseId));
      setSelectedSectionId(null);
      setSelectedLessonId(null);
    }
  }, [selectedCourseId, dispatch]);

  // Load lessons when a section is selected
  useEffect(() => {
    if (selectedSectionId) {
      dispatch(fetchLessonsBySectionAdmin(selectedSectionId));
      setSelectedLessonId(null);
    }
  }, [selectedSectionId, dispatch]);

  const renderVideo = (url) => {
    if (!url) return null;

    // YouTube link embed
    if (url.includes("youtu.be") || url.includes("youtube.com/watch")) {
      let embedUrl = url;

      if (url.includes("youtu.be")) {
        const videoId = url.split("/").pop().split("?")[0];
        embedUrl = `https://www.youtube.com/embed/${videoId}`;
      } else if (url.includes("youtube.com/watch")) {
        const urlParams = new URLSearchParams(url.split("?")[1]);
        const videoId = urlParams.get("v");
        embedUrl = `https://www.youtube.com/embed/${videoId}`;
      }

      return (
        <div className="lesson-video-wrapper">
          <iframe
            width="100%"
            height="360"
            src={embedUrl}
            title="Lesson Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      );
    }

    // Direct video file
    return (
      <div className="lesson-video-wrapper">
        <video controls>
          <source src={url} />
          Your browser does not support video playback.
        </video>
      </div>
    );
  };

  return (
    <div className="ai-page">
      {/* ===== LEFT: Lesson Selector + Preview ===== */}
      <div className="ai-left">
        <h1 className="ai-page-title">AI-Driven Learning Tools</h1>
        <p className="ai-page-subtitle">
          Select a course → section → lesson to generate summaries, MCQs, and Q&A
        </p>

        <div className="ai-selects">
          {/* Course Select */}
          <div className="ai-select">
            <label>Course</label>
            <select
              value={selectedCourseId || ""}
              onChange={(e) => setSelectedCourseId(e.target.value)}
            >
              <option value="">Select Course</option>
              {courses.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.title}
                </option>
              ))}
            </select>
          </div>

          {/* Section Select */}
          {sections.length > 0 && (
            <div className="ai-select">
              <label>Section</label>
              <select
                value={selectedSectionId || ""}
                onChange={(e) => setSelectedSectionId(e.target.value)}
              >
                <option value="">Select Section</option>
                {sections.map((s) => (
                  <option key={s._id} value={s._id}>
                    {s.title}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Lesson Select */}
          {lessons.length > 0 && (
            <div className="ai-select">
              <label>Lesson</label>
              <select
                value={selectedLessonId || ""}
                onChange={(e) => setSelectedLessonId(e.target.value)}
              >
                <option value="">Select Lesson</option>
                {lessons.map((l) => (
                  <option key={l._id} value={l._id}>
                    {l.title}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Lesson Preview */}
        {selectedLessonId && (
          <div className="lesson-preview">
            {lessons
              .filter((l) => l._id === selectedLessonId)
              .map((lesson) =>
                lesson.type === "text" ? (
                  <div key={lesson._id} className="lesson-text-preview">
                    {lesson.content}
                  </div>
                ) : (
                  renderVideo(lesson.content)
                )
              )}
          </div>
        )}
      </div>

      {/* ===== RIGHT: AI Actions Panel ===== */}
      {selectedLessonId && (
        <aside className="ai-right">
          <AIActions lessonId={selectedLessonId} />
        </aside>
      )}
    </div>
  );
};

export default AIFeatures;
