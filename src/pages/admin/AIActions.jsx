import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  generateSummary,
  generateMCQs,
  generateQnA,
  clearAI,
} from "../../features/ai/aiSlice";
import "./AIActions.css";

const AIActions = ({ lessonId }) => {
  const dispatch = useDispatch();
  const { summary, mcqs, qna, status, error } = useSelector(
    (state) => state.ai
  );

  const [questionInput, setQuestionInput] = useState("");

  useEffect(() => {
    dispatch(clearAI());
  }, [dispatch]);

  const handleGenerateSummary = () => {
    dispatch(clearAI());
    dispatch(generateSummary(lessonId));
  };

  const handleGenerateMCQs = () => {
    dispatch(clearAI());
    dispatch(generateMCQs(lessonId));
  };

  const handleGenerateQnA = () => {
    if (!questionInput.trim()) return;
    dispatch(clearAI());
    dispatch(generateQnA({ lessonId, question: questionInput }));
  };

  const handleClearAI = () => {
    dispatch(clearAI());
    setQuestionInput(""); // optional UX reset
  };

  return (
    <div className="ai-panel">
      {/* ===== Header ===== */}
      <div className="ai-panel-header">
        <h4>⚡ AI Actions</h4>
        <p>Summaries, questions & assessments</p>
        {(summary || mcqs?.length > 0 || qna) && (
          <button className="ai-clear-btn" onClick={handleClearAI}>
            ✖ Clear
          </button>
        )}
      </div>

      {/* ===== Actions ===== */}
      <div className="ai-actions">
        <button
          className="ai-btn primary"
          onClick={handleGenerateSummary}
          disabled={status === "loading"}
        >
          Generate Summary
        </button>

        <button
          className="ai-btn secondary"
          onClick={handleGenerateMCQs}
          disabled={status === "loading"}
        >
          Generate MCQs
        </button>
      </div>

      {/* ===== Q&A ===== */}
      <div className="ai-qna">
        <input
          type="text"
          placeholder="Ask anything about this lesson..."
          value={questionInput}
          onChange={(e) => setQuestionInput(e.target.value)}
        />
        <button
          className="ai-btn ask"
          onClick={handleGenerateQnA}
          disabled={status === "loading"}
        >
          Ask
        </button>
      </div>

      {/* ===== Status ===== */}
      {status === "loading" && (
        <p className="ai-loading">⏳ AI is thinking...</p>
      )}
      {status === "failed" && <p className="ai-error">{error}</p>}

      {/* ===== Summary ===== */}
      {summary && (
        <div className="ai-output">
          <h4>📘 Lesson Summary</h4>

          {summary.includes("Video URL:") ? (
            (() => {
              const urlMatch = summary.match(/Video URL:\s*(\S+)/);
              const videoUrl = urlMatch ? urlMatch[1] : null;

              if (!videoUrl) return <pre>{summary}</pre>;

              if (
                videoUrl.includes("youtube.com") ||
                videoUrl.includes("youtu.be")
              ) {
                let embedUrl = videoUrl;

                if (videoUrl.includes("youtu.be")) {
                  const id = videoUrl.split("/").pop().split("?")[0];
                  embedUrl = `https://www.youtube.com/embed/${id}`;
                } else {
                  const params = new URLSearchParams(videoUrl.split("?")[1]);
                  embedUrl = `https://www.youtube.com/embed/${params.get("v")}`;
                }

                return (
                  <iframe src={embedUrl} title="Lesson Video" allowFullScreen />
                );
              }

              return <video src={videoUrl} controls />;
            })()
          ) : (
            <pre>{summary}</pre>
          )}
        </div>
      )}

      {/* ===== MCQs ===== */}
      {mcqs && mcqs.length > 0 && (
        <div className="ai-output">
          <h4>📝 Practice MCQs</h4>

          {mcqs.map((q, i) => (
            <div key={i} className="mcq-card">
              <p className="mcq-question">
                {i + 1}. {q.question}
              </p>

              <ul>
                {q.options.map((opt, idx) => (
                  <li key={idx}>
                    <strong>{String.fromCharCode(65 + idx)}.</strong> {opt}
                  </li>
                ))}
              </ul>

              <p className="mcq-answer">✔ Correct Answer: {q.correctAnswer}</p>
            </div>
          ))}
        </div>
      )}

      {/* ===== QnA ===== */}
      {qna && (
        <div className="ai-output">
          <h4>💡 AI Answer</h4>
          <p>
            <strong>Q:</strong> {qna.data.question}
          </p>
          <p>
            <strong>A:</strong> {qna.data.answer}
          </p>
        </div>
      )}
    </div>
  );
};

export default AIActions;
