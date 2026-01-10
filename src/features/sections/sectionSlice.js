import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../api/apiClient";
import { API_ENDPOINTS } from "../../api/endpoints";

// Fetch sections for a selected course
export const fetchSections = createAsyncThunk(
  "sections/fetchSections",
  async (courseId, { rejectWithValue }) => {
    try {
      const res = await apiClient.get(API_ENDPOINTS.SECTIONS.BY_COURSE(courseId));
      return res.data.data; // array of sections
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch sections");
    }
  }
);

const sectionSlice = createSlice({
  name: "sections",
  initialState: {
    list: [],
    selectedSection: null,
    status: "idle",
    error: null,
  },
  reducers: {
    selectSection: (state, action) => {
      state.selectedSection = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSections.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchSections.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(fetchSections.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { selectSection } = sectionSlice.actions;
export default sectionSlice.reducer;
