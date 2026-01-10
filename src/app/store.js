import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import courseReducer from "../features/courses/courseSlice";
import sectionReducer from "../features/sections/sectionSlice";
import lessonReducer from "../features/lessons/lessonSlice";
import aiReducer from "../features/ai/aiSlice";

/**
 * Redux Store
 * - This is the global state container for the app
 * - I add Reducers feature by feature (auth, courses, etc.)
 */
export const store = configureStore({
  reducer: {
    auth: authReducer,
    courses: courseReducer,
    sections: sectionReducer,
    lessons: lessonReducer,
    ai: aiReducer, 
  },
  devTools: import.meta.env.MODE !== "production",
});
