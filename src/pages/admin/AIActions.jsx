import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  generateSummary,
  generateMCQs,
  generateQnA,
  clearAI,
} from "../../features/ai/aiSlice";

const AIActions = ({ lessonId }) => {
  const dispatch = useDispatch();
  const { summary, mcqs, qna, status, error } = useSelector(
    (state) => state.ai
  );

  console.log(`summary:`, summary);
  console.log(`mcqs:`, mcqs);
  console.log(`qna:`, qna);
  console.log(`status:`, status);
  console.log(`error:`, error);

  const [questionInput, setQuestionInput] = useState("");

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

  return (
    <div
      style={{
        marginTop: "2rem",
        border: "1px solid #ddd",
        padding: "1rem",
        borderRadius: "8px",
      }}
    >
      <h3>AI Actions</h3>

      {/* Buttons */}
      <div
        style={{
          display: "flex",
          gap: "1rem",
          flexWrap: "wrap",
          marginBottom: "1rem",
        }}
      >
        <button onClick={handleGenerateSummary} disabled={status === "loading"}>
          Generate Summary
        </button>
        <button onClick={handleGenerateMCQs} disabled={status === "loading"}>
          Generate MCQs
        </button>
      </div>

      {/* Q&A input */}
      <div style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          value={questionInput}
          onChange={(e) => setQuestionInput(e.target.value)}
          placeholder="Ask a question"
          style={{ padding: "0.5rem", width: "300px", marginRight: "0.5rem" }}
        />
        <button onClick={handleGenerateQnA} disabled={status === "loading"}>
          Ask
        </button>
      </div>

      {/* Loading/Error */}
      {status === "loading" && <p>Loading...</p>}
      {status === "failed" && <p style={{ color: "red" }}>{error}</p>}

      {/* AI Responses */}
      {summary && (
        <div style={{ marginBottom: "1rem" }}>
          <h4>Summary:</h4>

          {summary.includes("Video URL:") ? (
            <>
              {/* Extract the URL */}
              {(() => {
                const urlMatch = summary.match(/Video URL:\s*(\S+)/);
                const videoUrl = urlMatch ? urlMatch[1] : null;

                if (!videoUrl) return <pre>{summary}</pre>;

                // If YouTube link, embed iframe
                if (
                  videoUrl.includes("youtube.com") ||
                  videoUrl.includes("youtu.be")
                ) {
                  // Convert youtu.be to embed link
                  let embedUrl = videoUrl;
                  if (videoUrl.includes("youtu.be")) {
                    const videoId = videoUrl.split("/").pop().split("?")[0];
                    embedUrl = `https://www.youtube.com/embed/${videoId}`;
                  } else if (videoUrl.includes("youtube.com/watch")) {
                    const urlParams = new URLSearchParams(
                      videoUrl.split("?")[1]
                    );
                    const videoId = urlParams.get("v");
                    embedUrl = `https://www.youtube.com/embed/${videoId}`;
                  }

                  return (
                    <iframe
                      width="560"
                      height="315"
                      src={embedUrl}
                      title="Lesson Video"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  );
                }

                // For direct video URL (.mp4, etc.)
                return (
                  <video src={videoUrl} controls style={{ maxWidth: "100%" }} />
                );
              })()}
            </>
          ) : (
            <pre
              style={{
                whiteSpace: "pre-wrap",
                background: "#f8f8f8",
                padding: "1rem",
                borderRadius: "6px",
              }}
            >
              {summary}
            </pre>
          )}
        </div>
      )}

      {mcqs && mcqs.length > 0 && (
        <div style={{ marginBottom: "1.5rem" }}>
          <h4>MCQs:</h4>

          {mcqs.map((q, i) => {
            const optionLabels = ["A", "B", "C", "D"];

            return (
              <div
                key={i}
                style={{
                  marginBottom: "1.2rem",
                  padding: "1rem",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  background: "#fafafa",
                }}
              >
                <p>
                  <strong>
                    {i + 1}. {q.question}
                  </strong>
                </p>

                <ul style={{ listStyle: "none", paddingLeft: 0 }}>
                  {q.options.map((opt, idx) => (
                    <li key={idx} style={{ marginBottom: "0.25rem" }}>
                      <strong>{optionLabels[idx]}.</strong> {opt}
                    </li>
                  ))}
                </ul>

                <p
                  style={{
                    marginTop: "0.75rem",
                    color: "green",
                    fontWeight: "bold",
                  }}
                >
                  Answer: {q.correctAnswer}
                </p>
              </div>
            );
          })}
        </div>
      )}

      {qna && (
        <div style={{ marginBottom: "1rem" }}>
          <h4>Answer:</h4>
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
