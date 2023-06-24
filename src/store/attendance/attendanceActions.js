import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "axios";
import { rootApi } from "../../api";

export const createAttendance = createAsyncThunk(
  "attendance/create",
  async (attendanceData, { rejectWithValue, dispatch }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${rootApi}/api/attendance/mark_attendance/`,
        attendanceData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Вы успешно отметили группу");
      return response.data;
    } catch (err) {
      console.log(err);
      toast.error(err.response.data);
      return rejectWithValue(err.response.data);
    }
  }
);
