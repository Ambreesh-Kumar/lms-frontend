import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../api/apiClient";
import { API_ENDPOINTS } from "../../api/endpoints";

// Fetch published courses (public API)
export const fetchCourses = createAsyncThunk(
  "courses/fetchCourses",
  async (_, { rejectWithValue }) => {
    try {
      const res = await apiClient.get(API_ENDPOINTS.COURSES.PUBLISHED);
      // res.data.data contains array of courses
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch courses");
    }
  }
);

const courseSlice = createSlice({
  name: "courses",
  initialState: {
    list: [],
    selectedCourse: null,
    status: "idle",
    error: null,
  },
  reducers: {
    selectCourse: (state, action) => {
      state.selectedCourse = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { selectCourse } = courseSlice.actions;
export default courseSlice.reducer;
