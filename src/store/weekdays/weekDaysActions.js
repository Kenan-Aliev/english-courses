import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "axios";
import { rootApi } from "../../api";

export const getWeekdays = createAsyncThunk(
  "weekdays/getList",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${rootApi}/api/weekdays/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.response.data.detail);
    }
  }
);
