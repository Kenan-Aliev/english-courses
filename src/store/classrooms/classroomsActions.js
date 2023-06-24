import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "axios";

export const getClassrooms = createAsyncThunk(
  "classrooms/getList",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "https://lms-backend-4to8.onrender.com/api/classroom/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.response.data.detail);
    }
  }
);
