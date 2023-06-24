import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "axios";
import { rootApi } from "../../api";

export const getUsers = createAsyncThunk(
  "users/getList",
  async (params = {}, { rejectWithValue, dispatch }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${rootApi}/api/users/`, {
        params,
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

export const createUser = createAsyncThunk(
  "users/create",
  async (userData, { rejectWithValue, dispatch }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${rootApi}/api/auth/registration/`,
        userData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(getUsers({ role: userData.role }));
      toast.success("Вы успешно создали пользователя в системе");
      return response.data;
    } catch (err) {
      toast.error("Что-то пошло не так");
      return rejectWithValue(err.response.data.detail);
    }
  }
);
