import { createSlice } from "@reduxjs/toolkit";
import {
  createPayment,
  getGroupPayment,
  createSalary,
  getSalaries,
} from "./financialsActions";

const initialState = {
  getGroupPayment: {
    loading: false,
    success: false,
    failed: false,
    message: "",
  },
  getSalaries: {
    loading: false,
    success: false,
    failed: false,
    message: "",
  },
  createPayment: {
    loading: false,
    success: false,
    failed: false,
    message: "",
  },
  createSalary: {
    loading: false,
    success: false,
    failed: false,
    message: "",
  },
  groupPayment: [],
  salaries: [],
};

const financialsSlice = createSlice({
  name: "financials",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createPayment.pending, (state) => {
        state.createPayment = {
          loading: true,
          success: false,
          failed: false,
        };
      })
      .addCase(createPayment.fulfilled, (state, action) => {
        state.createPayment = {
          loading: false,
          success: true,
          failed: false,
        };
      })
      .addCase(createPayment.rejected, (state, action) => {
        state.createPayment = {
          loading: false,
          success: false,
          failed: true,
          message: action.payload,
        };
      });

    builder
      .addCase(getGroupPayment.pending, (state) => {
        state.getGroupPayment = {
          loading: true,
          success: false,
          failed: false,
        };
      })
      .addCase(getGroupPayment.fulfilled, (state, action) => {
        state.getGroupPayment = {
          loading: false,
          success: true,
          failed: false,
        };
        state.groupPayment = action.payload;
      })
      .addCase(getGroupPayment.rejected, (state, action) => {
        state.getGroupPayment = {
          loading: false,
          success: false,
          failed: true,
          message: action.payload,
        };
      });

    builder
      .addCase(getSalaries.pending, (state) => {
        state.getSalaries = {
          loading: true,
          success: false,
          failed: false,
        };
      })
      .addCase(getSalaries.fulfilled, (state, action) => {
        state.getSalaries = {
          loading: false,
          success: true,
          failed: false,
        };
        state.salaries = action.payload;
      })
      .addCase(getSalaries.rejected, (state, action) => {
        state.getSalaries = {
          loading: false,
          success: false,
          failed: true,
          message: action.payload,
        };
      });

    builder
      .addCase(createSalary.pending, (state) => {
        state.createSalary = {
          loading: true,
          success: false,
          failed: false,
        };
      })
      .addCase(createSalary.fulfilled, (state, action) => {
        state.createSalary = {
          loading: false,
          success: true,
          failed: false,
        };
      })
      .addCase(createSalary.rejected, (state, action) => {
        state.createSalary = {
          loading: false,
          success: false,
          failed: true,
          message: action.payload,
        };
      });
  },
});

export default financialsSlice.reducer;
