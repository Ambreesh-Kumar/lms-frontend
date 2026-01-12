import "./InstructorDashboard.css";

const InstructorDashboard = () => {
  return (
    <div className="restricted-page">
      <div className="restricted-card">
        <h1>Instructor Dashboard</h1>

        <p className="subtitle">
          This dashboard is intentionally restricted in this demo.
        </p>

        <div className="content">
          <p>
            This Learning Management System focuses on demonstrating
            <strong> advanced AI-powered learning features</strong> such as:
          </p>

          <ul>
            <li>AI-generated lesson summaries</li>
            <li>Automated MCQs for practice</li>
            <li>Context-aware Q&A using lesson content</li>
          </ul>

          <p>
            These features consume <strong>paid AI APIs</strong>. To prevent
            misuse and control costs, only <strong>Admin access</strong> is
            enabled in this live demo.
          </p>

          <p className="note">
            Instructor and Student dashboards are intentionally excluded to keep
            the demo focused, secure, and production-realistic.
          </p>

          <p className="interviewer-note">
            👨‍💼 <strong>For Interview Review : </strong>
            Admin access credentials will be provided during the interview for a
            full walkthrough of LMS and AI capabilities.
          </p>
        </div>
        <button
          className="logout-btn"
          onClick={() => {
            localStorage.clear();
            window.location.href = "/";
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default InstructorDashboard;
