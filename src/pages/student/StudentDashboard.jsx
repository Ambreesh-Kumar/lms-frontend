import "./StudentDashboard.css";

const StudentDashboard = () => {
  return (
    <div className="student-restricted-page">
      <div className="student-restricted-card">
        <h1>Student Dashboard</h1>

        <p className="subtitle">
          Student access is intentionally limited in this demo.
        </p>

        <div className="content">
          <p>
            This LMS portfolio focuses on demonstrating
            <strong> AI-powered learning workflows</strong> from an
            administrative perspective.
          </p>

          <p>
            Features such as lesson summarization, automated MCQs, and AI-based
            Q&A consume <strong>paid AI APIs</strong>.
          </p>

          <p>
            To avoid uncontrolled usage and to keep the demo
            production-realistic, <strong>student access is disabled</strong> in
            the live environment.
          </p>

          <div className="highlight-box">
            <p>
              🎯 <strong>Demo Scope:</strong>
            </p>
            <ul>
              <li>Admin-controlled courses & lessons</li>
              <li>AI-assisted learning tools</li>
              <li>Secure role-based access</li>
            </ul>
          </div>

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

export default StudentDashboard;
