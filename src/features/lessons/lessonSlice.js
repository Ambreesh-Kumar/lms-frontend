import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../api/apiClient";
import { API_ENDPOINTS } from "../../api/endpoints";

// Fetch lessons for admin by section
export const fetchLessonsBySectionAdmin = createAsyncThunk(
  "lessons/fetchBySectionAdmin",
  async (sectionId, { rejectWithValue }) => {
    try {
      const res = await apiClient.get(
        API_ENDPOINTS.LESSONS.BY_SECTION_ADMIN(sectionId)
      );
      return res.data.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch lessons"
      );
    }
  }
);

const lessonSlice = createSlice({
  name: "lessons",
  initialState: {
    list: [],
    selectedLesson: null,
    status: "idle",
    error: null,
  },
  reducers: {
    selectLesson: (state, action) => {
      state.selectedLesson = action.payload;
    },
    clearLessons: (state) => {
      state.list = [];
      state.selectedLesson = null;
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLessonsBySectionAdmin.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchLessonsBySectionAdmin.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(fetchLessonsBySectionAdmin.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { selectLesson, clearLessons } = lessonSlice.actions;
export default lessonSlice.reducer;
