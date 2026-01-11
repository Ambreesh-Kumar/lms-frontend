import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/admin/AdminSidebar";
import { useEffect } from "react";
import { loadUser } from "../features/auth/authSlice";
import { useDispatch } from "react-redux";
// import "./AdminLayout.css";

const AdminLayout = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      dispatch(loadUser());
    }
  }, [dispatch]);
  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        overflow: "hidden",
        width: "100vw"
      }}
    >
      <AdminSidebar />

      <main
        style={{
          flex: 1,
          padding: "1rem",
          background: "#f5f7fb",
          overflow: "hidden",
          boxSizing: "border-box",
        }}
      >
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
