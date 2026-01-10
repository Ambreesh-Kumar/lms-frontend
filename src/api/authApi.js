import apiClient from "./apiClient";
import { API_ENDPOINTS } from "./endpoints";

/**
 * Auth API
 * -----------------
 * Functions for authentication backend calls:
 * register, login, refresh token, logout.
 *
 * Purely for HTTP requests — no Redux or UI logic.
 */

export const authApi = {
  register: (formData) =>
    apiClient.post(API_ENDPOINTS.AUTH.REGISTER, formData, {
      headers: {
        "Content-Type": "multipart/form-data", // required for file upload
      },
    }),
  login: (data) => apiClient.post(API_ENDPOINTS.AUTH.LOGIN, data),

  logout: () => apiClient.post(API_ENDPOINTS.AUTH.LOGOUT),

  refreshToken: () => apiClient.get(API_ENDPOINTS.AUTH.REFRESH_TOKEN),
};
