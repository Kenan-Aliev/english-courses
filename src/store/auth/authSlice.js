import { createSlice } from "@reduxjs/toolkit";
import { login, getUserProfile } from "./authActions";

const initialState = {
  user: {},
  login: {
    loading: false,
    success: false,
    failed: false,
    message: "",
  },
  getProfile: {
    loading: false,
    success: false,
    failed: false,
    message: "",
  },
  token: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state, action) {
      localStorage.removeItem("token");
      state.login = {
        loading: false,
        success: false,
        failed: false,
        message: "",
      };
      state.token = "";
      state.user = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.login = {
          loading: true,
          success: false,
          failed: false,
        };
      })
      .addCase(login.fulfilled, (state, action) => {
        state.login = {
          loading: false,
          success: true,
          failed: false,
          message: action.payload.message,
        };
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.login = {
          loading: false,
          success: false,
          failed: true,
          message: action.payload.message,
        };
      });
    builder
      .addCase(getUserProfile.pending, (state, action) => {
        state.getProfile = {
          loading: true,
          success: false,
          failed: false,
        };
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.user = action.payload;
        state.getProfile = {
          loading: false,
          success: true,
          failed: false,
        };
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.getProfile = {
          loading: false,
          success: false,
          failed: true,
          message: action.payload,
        };
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
