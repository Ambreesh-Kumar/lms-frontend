import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// =====================
// Request interceptor
// =====================
apiClient.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// =====================
// Response interceptor
// =====================
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (!originalRequest) {
      return Promise.reject(error);
    }

    const authRoutes = [
      "/api/auth/login",
      "/api/auth/register",
      "/api/auth/refresh_token",
    ];

    const isAuthRoute = authRoutes.some((route) =>
      originalRequest.url.startsWith(route)
    );

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !isAuthRoute
    ) {
      originalRequest._retry = true;

      try {
        const res = await apiClient.get("/api/auth/refresh_token");
        const newAccessToken = res.data?.accessToken;

        if (newAccessToken) {
          localStorage.setItem("accessToken", newAccessToken);
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return apiClient(originalRequest);
        }
      } catch (refreshError) {
        localStorage.removeItem("accessToken");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
