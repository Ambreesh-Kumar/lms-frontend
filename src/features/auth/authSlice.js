import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authApi } from "../../api/authApi";
import { jwtDecode } from "jwt-decode";

const token = localStorage.getItem("accessToken");

let initialUser = null;

if (token) {
  try {
    const decoded = jwtDecode(token);
    initialUser = {
      id: decoded.userId,
      role: decoded.role,
    };
  } catch (err) {
    localStorage.removeItem("accessToken");
  }
}

export const loadUser = createAsyncThunk(
  "auth/loadUser",
  async (_, { rejectWithValue }) => {
    try {
      const res = await authApi.getMyDetails();
      return res.data; // { user }
    } catch (err) {
      return rejectWithValue("Session expired");
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const res = await authApi.login(credentials);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Invalid email or password"
      );
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/register",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await authApi.register(formData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Signup failed");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: initialUser,
    accessToken: token,
    isAuthenticated: Boolean(token),
    status: "idle",
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.isAuthenticated = false;
      state.status = "idle";
      state.error = null;
      localStorage.removeItem("accessToken");
    },
    clearAuthError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // --- LOGIN ---
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.accessToken = action.payload.accessToken;

        let decoded = {};
        try {
          decoded = jwtDecode(action.payload.accessToken);
        } catch (e) {}

        state.user = { ...action.payload.user, role: decoded.role };
        state.isAuthenticated = true;
        localStorage.setItem("accessToken", action.payload.accessToken);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });

    // --- SIGNUP ---
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.accessToken = action.payload.accessToken;

        let decoded = {};
        try {
          decoded = jwtDecode(action.payload.accessToken);
        } catch (e) {}

        state.user = { ...action.payload.user, role: decoded.role };
        state.isAuthenticated = true;
        localStorage.setItem("accessToken", action.payload.accessToken);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
    // --- LOAD USER ON REFRESH ---
    builder
      .addCase(loadUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.status = "succeeded";

        // Preserve role from token
        const decoded = jwtDecode(state.accessToken);

        state.user = {
          ...action.payload.user,
          role: decoded.role,
        };

        state.isAuthenticated = true;
      })
      .addCase(loadUser.rejected, (state) => {
        state.user = null;
        state.accessToken = null;
        state.isAuthenticated = false;
        localStorage.removeItem("accessToken");
      });
  },
});

export const { logout, clearAuthError } = authSlice.actions;
export default authSlice.reducer;
