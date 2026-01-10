import { useRouteError, Link } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>Oops! Something went wrong !!!</h1>

      <p>
        {error?.statusText || error?.message || "Page not found"}
      </p>

      <Link to="/login">Go to Login</Link>
    </div>
  );
};

export default ErrorPage;
