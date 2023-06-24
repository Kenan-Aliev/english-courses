import { createSlice } from "@reduxjs/toolkit";
import { createAttendance } from "./attendanceActions";

const initialState = {
  createAttendance: {
    loading: false,
    success: false,
    failed: false,
    message: "",
  },
};

const attendanceSlice = createSlice({
  name: "attendance",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createAttendance.pending, (state) => {
        state.createAttendance = {
          loading: true,
          success: false,
          failed: false,
        };
      })
      .addCase(createAttendance.fulfilled, (state, action) => {
        state.createAttendance = {
          loading: false,
          success: true,
          failed: false,
        };
      })
      .addCase(createAttendance.rejected, (state, action) => {
        state.createAttendance = {
          loading: false,
          success: false,
          failed: true,
          message: action.payload.message,
        };
      });
  },
});

export default attendanceSlice.reducer;
