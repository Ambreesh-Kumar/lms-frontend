import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AIActions from "./AIActions";
import "./LessonDetails.css";
import { useEffect } from "react";
import { fetchLessonsBySectionAdmin } from "../../features/lessons/lessonSlice";
import CircularProgress from "@mui/material/CircularProgress";

const LessonDetails = () => {
  const { lessonId } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();

  const sectionId = location.state?.sectionId;
  const { list: lessons, status } = useSelector((state) => state.lessons);

  const lesson = lessons.find((l) => l._id === lessonId);

  useEffect(() => {
    if (!lesson && sectionId) {
      dispatch(fetchLessonsBySectionAdmin(sectionId));
    }
  }, [lesson, sectionId, dispatch]);

  if (status === "loading") {
    return (
      <div className="loader">
        <CircularProgress size={36} />
      </div>
    );
  }

  if (!lesson) return <p className="lesson-not-found">Lesson not found</p>;

  const isYoutube =
    lesson.type === "video" &&
    (lesson.content.includes("youtube.com") ||
      lesson.content.includes("youtu.be"));

  const getYoutubeEmbedUrl = (url) => {
    if (url.includes("youtu.be")) {
      const id = url.split("/").pop().split("?")[0];
      return `https://www.youtube.com/embed/${id}`;
    }

    if (url.includes("youtube.com/watch")) {
      const params = new URLSearchParams(url.split("?")[1]);
      return `https://www.youtube.com/embed/${params.get("v")}`;
    }

    return null;
  };

  return (
    <div className="lesson-page">
      {/* ===== LEFT: Lesson Content ===== */}
      <div className="lesson-content">
        <div className="lesson-header">
          <span className="lesson-type">
            {lesson.type.toUpperCase()} LESSON
          </span>
          <h1>{lesson.title}</h1>
        </div>

        {lesson.type === "text" && (
          <div className="lesson-text">{lesson.content}</div>
        )}

        {lesson.type === "video" && (
          <div className="lesson-video-wrapper">
            {isYoutube ? (
              <iframe
                src={getYoutubeEmbedUrl(lesson.content)}
                title={lesson.title}
                allowFullScreen
              />
            ) : (
              <video controls>
                <source src={lesson.content} />
                Your browser does not support video playback.
              </video>
            )}
          </div>
        )}
      </div>

      {/* ===== RIGHT: AI PANEL ===== */}
      <aside className="lesson-ai">
        <div className="lesson-ai-header">
          <h2>AI Assistant</h2>
          <p>Smart tools to enhance this lesson</p>
        </div>
        <AIActions lessonId={lessonId} />
      </aside>
    </div>
  );
};

export default LessonDetails;
