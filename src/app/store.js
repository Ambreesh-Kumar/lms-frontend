import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";

/**
 * Redux Store
 * - This is the global state container for the app
 * - I add Reducers feature by feature (auth, courses, etc.)
 */
export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  devTools: import.meta.env.MODE !== "production",
});
