import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = import.meta.env.VITE_API_URL;

// Generate OTP
export const generateOTP = createAsyncThunk(
  "auth/generateOTP",
  async (email, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${url}/auth/generate-otp`, { email });
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

// Verify OTP
export const verifyOTP = createAsyncThunk(
  "auth/verifyOTP",
  async ({email, otp}, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${url}/auth/verify-otp`, {email, otp});
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// signup
export const signup = createAsyncThunk(
  "auth/signup",
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${url}/auth/signup`, userData);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);
const initialState = {
  loading: false,
  error: null,
  otpSent: false,
  otpVerified: false,
  user: null,
  token: null,
};


const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAuthState: (state) => {
      state.loading = false;
      state.error = null;
      state.otpSent = false;
      state.otpVerified = false;
      state.user = null;
      state.token = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
  },
  extraReducers: (builder) => {
    builder
    // Generate OTP cases
     .addCase(generateOTP.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.otpSent = false;
    })
    .addCase(generateOTP.fulfilled, (state) => {
      state.loading = false;
      state.otpSent = true;
    })
    .addCase(generateOTP.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.message || "Failed to send OTP";
    })

    // Verify OTP cases
    .addCase(verifyOTP.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.otpVerified = false;
    })
    .addCase(verifyOTP.fulfilled, (state) => {
      state.loading = false;
      state.otpVerified = true;
    })
    .addCase(verifyOTP.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.message || "Failed to verify OTP";
    })
     // Signup cases
     .addCase(signup.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(signup.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
    })
    .addCase(signup.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.message || "Failed to register user";
    });
  },
});

export const { resetAuthState, clearError, setUser } = authSlice.actions;
export default authSlice.reducer;