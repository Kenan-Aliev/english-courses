import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "axios";
import { rootApi } from '../../api';

export const login = createAsyncThunk(
  "auth/login",
  async (userData, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.post(
        `${rootApi}/api/auth/login/`,
        userData
      );
      localStorage.setItem("token", response.data.access);
      dispatch(getUserProfile());
      return {
        message: "Вы успешно вошли в аккаунт",
        token: response.data.access,
      };
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.detail);
      return rejectWithValue(err.response.data.detail);
    }
  }
);

export const getUserProfile = createAsyncThunk(
  "auth/getProfile",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${rootApi}/api/users/get_user_by_token/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (err) {
      toast.error(err.response.data.detail);
      return rejectWithValue(err.response.data.detail);
    }
  }
);
