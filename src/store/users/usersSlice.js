import { createSlice } from "@reduxjs/toolkit";
import { createUser, getUsers } from "./usersActions";

const initialState = {
  getUsers: {
    loading: false,
    success: false,
    failed: false,
    message: "",
  },
  createUser: {
    loading: false,
    success: false,
    failed: false,
    message: "",
  },
  users: [],
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.getUsers = {
          loading: true,
          success: false,
          failed: false,
        };
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.getUsers = {
          loading: false,
          success: true,
          failed: false,
          message: action.payload.message,
        };
        state.users = action.payload;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.getUsers = {
          loading: false,
          success: false,
          failed: true,
          message: action.payload.message,
        };
      });
    builder
      .addCase(createUser.pending, (state, action) => {
        state.createUser = {
          loading: true,
          success: false,
          failed: false,
        };
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.createUser = {
          loading: false,
          success: true,
          failed: false,
        };
      })
      .addCase(createUser.rejected, (state, action) => {
        state.createUser = {
          loading: false,
          success: false,
          failed: true,
          message: action.payload,
        };
      });
  },
});

export default usersSlice.reducer;
