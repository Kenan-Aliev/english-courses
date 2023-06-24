import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "axios";
import { rootApi } from "../../api";

export const getGroupPayment = createAsyncThunk(
  "groups/getGroupPayment",
  async (params = {}, { rejectWithValue, dispatch }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${rootApi}/api/payment/get_group_payments/`,
        {
          params,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data.detail);
    }
  }
);

export const createPayment = createAsyncThunk(
  "financials/createPayment",
  async (paymentData, { rejectWithValue, dispatch }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${rootApi}/api/payment/`,
        paymentData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      //   dispatch(getGroups());
      toast.success("Вы успешно внесли оплату");
      return response.data;
    } catch (err) {
      toast.error("Что-то пошло не так");
      return rejectWithValue(err.response.data.detail);
    }
  }
);

export const getSalaries = createAsyncThunk(
  "groups/getSalaries",
  async (params = {}, { rejectWithValue, dispatch }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${rootApi}/api/salary/`, {
        params,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data.detail);
    }
  }
);

export const createSalary = createAsyncThunk(
  "financials/createSalary",
  async (salaryData, { rejectWithValue, dispatch }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(`${rootApi}/api/salary/`, salaryData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      //   dispatch(getGroups());
      toast.success("Вы успешно начислили зарплату");
      dispatch(getSalaries());
      return response.data;
    } catch (err) {
      toast.error("Что-то пошло не так");
      return rejectWithValue(err.response.data.detail);
    }
  }
);
