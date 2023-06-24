import { createSlice } from "@reduxjs/toolkit";
import { getWeekdays } from "./weekDaysActions";

const initialState = {
  getWeekdays: {
    loading: false,
    success: false,
    failed: false,
    message: "",
  },
  weekdays: [],
};

const weekdaysSlice = createSlice({
  name: "weekdays",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getWeekdays.pending, (state) => {
        state.getWeekdays = {
          loading: true,
          success: false,
          failed: false,
        };
      })
      .addCase(getWeekdays.fulfilled, (state, action) => {
        state.getWeekdays = {
          loading: false,
          success: true,
          failed: false,
          message: action.payload.message,
        };
        state.weekdays = action.payload;
      })
      .addCase(getWeekdays.rejected, (state, action) => {
        state.getWeekdays = {
          loading: false,
          success: false,
          failed: true,
          message: action.payload.message,
        };
      });
  },
});

export default weekdaysSlice.reducer;
