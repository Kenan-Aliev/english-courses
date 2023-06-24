import { createSlice } from "@reduxjs/toolkit";
import { getClassrooms } from "./classroomsActions";

const initialState = {
  getClassrooms: {
    loading: false,
    success: false,
    failed: false,
    message: "",
  },
  classrooms: [],
};

const classroomsSlice = createSlice({
  name: "classrooms",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getClassrooms.pending, (state) => {
        state.getClassrooms = {
          loading: true,
          success: false,
          failed: false,
        };
      })
      .addCase(getClassrooms.fulfilled, (state, action) => {
        state.getClassrooms = {
          loading: false,
          success: true,
          failed: false,
          message: action.payload.message,
        };
        state.classrooms = action.payload;
      })
      .addCase(getClassrooms.rejected, (state, action) => {
        state.getClassrooms = {
          loading: false,
          success: false,
          failed: true,
          message: action.payload.message,
        };
      });
  },
});

export default classroomsSlice.reducer;
