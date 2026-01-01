import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authApi } from "./authApi";

/**
 * Async thunk for login
 * - Handles async API call
 * - Automatically dispatches pending/fulfilled/rejected actions
 */
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await authApi.login(credentials);
      return response.data; // contains { user, accessToken }
    } catch (error) {
      return rejectWithValue(error.response?.data || "Login failed");
    }
  }
);

/**
 * Auth Slice
 * - Manages auth state in Redux store
 */
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    accessToken: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout(state) {
      state.user = null;
      state.accessToken = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
