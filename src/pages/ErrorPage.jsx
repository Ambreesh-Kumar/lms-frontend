import { useRouteError, Link } from "react-router-dom";
import "./ErrorPage.css";

const ErrorPage = () => {
  const error = useRouteError();

  const status = error?.status || 404;
  const message =
    error?.statusText ||
    error?.message ||
    "The page you’re trying to access doesn’t exist or has been moved.";

  return (
    <div className="error-wrapper">
      {/* Background decoration */}
      <div className="error-bg-circle circle-1"></div>
      <div className="error-bg-circle circle-2"></div>

      <div className="error-container">
        <span className="error-badge">LMS Error</span>

        <h1 className="error-code">{status}</h1>

        <h2 className="error-heading">
          Oops! Something went wrong
        </h2>

        <p className="error-text">{message}</p>

        <div className="error-actions">
          <Link to="/login" className="btn btn-primary">
            Go to Login
          </Link>
          <Link to="/" className="btn btn-outline">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
