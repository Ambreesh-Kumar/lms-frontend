import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { aiApi } from "../../api/aiApi";

export const generateSummary = createAsyncThunk(
  "ai/generateSummary",
  async (lessonId, { rejectWithValue }) => {
    try {
      const res = await aiApi.generateSummary(lessonId);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to generate summary"
      );
    }
  }
);

export const generateMCQs = createAsyncThunk(
  "ai/generateMCQs",
  async (lessonId, { rejectWithValue }) => {
    try {
      const res = await aiApi.generateMCQs(lessonId);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to generate MCQs"
      );
    }
  }
);

export const generateQnA = createAsyncThunk(
  "ai/generateQnA",
  async ({ lessonId, question }, { rejectWithValue }) => {
    try {
      const res = await aiApi.generateQnA(lessonId, question);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to answer question"
      );
    }
  }
);

const aiSlice = createSlice({
  name: "ai",
  initialState: {
    summary: null,
    mcqs: null,
    qna: null,
    status: "idle", // idle | loading | succeeded | failed
    error: null,
  },
  reducers: {
    clearAI: (state) => {
      state.summary = null;
      state.mcqs = null;
      state.qna = null;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Summary
      .addCase(generateSummary.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(generateSummary.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.summary = action.payload.data.summary;
      })
      .addCase(generateSummary.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // MCQs
      .addCase(generateMCQs.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(generateMCQs.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.mcqs = action.payload.data.questions;
      })
      .addCase(generateMCQs.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // QnA
      .addCase(generateQnA.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(generateQnA.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.qna = action.payload;
      })
      .addCase(generateQnA.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { clearAI } = aiSlice.actions;
export default aiSlice.reducer;
