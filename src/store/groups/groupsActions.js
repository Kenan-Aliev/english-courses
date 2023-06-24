import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "axios";
import { rootApi } from "../../api";

export const getGroups = createAsyncThunk(
  "groups/getList",
  async (params = {}, { rejectWithValue, dispatch }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${rootApi}/api/groups/`, {
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

export const createGroup = createAsyncThunk(
  "groups/create",
  async (groupData, { rejectWithValue, dispatch }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(`${rootApi}/api/groups/`, groupData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(getGroups());
      toast.success("Вы успешно создали новую группу");
      return response.data;
    } catch (err) {
      toast.error("Что-то пошло не так");
      return rejectWithValue(err.response.data.detail);
    }
  }
);

export const getGroupStudents = createAsyncThunk(
  "groups/getStudents",
  async (groupId, { rejectWithValue, dispatch }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${rootApi}/api/groups/${groupId}/get_students/`,
        {
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

export const addStudentsToGroup = createAsyncThunk(
  "groups/addStudents",
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${rootApi}/api/groups/${data.groupId}/add_students_to_group/`,
        { student_ids: data.students },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(getGroupStudents(data.groupId));
      toast.success("Вы успешно добавили студентов в группу");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data.detail);
    }
  }
);

export const getTeacherGroupsByWeekDay = createAsyncThunk(
  "groups/getTeacherGroupsByWeekDay",
  async (params, { rejectWithValue, dispatch }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${rootApi}/api/groups/get_teacher_groups_by_day/`,
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

export const cancelLesson = createAsyncThunk(
  "groups/cancelLesson",
  async (groupId, { rejectWithValue, dispatch }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${rootApi}/api/lesson/cancel_lesson/`,
        { group_id: groupId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Вы успешно отменили урок");
      return response.data;
    } catch (err) {
      toast.error(err.response.data);
      return rejectWithValue(err.response.data);
    }
  }
);

export const getGroupHomeworks = createAsyncThunk(
  "groups/getGroupHomeworks",
  async (params = {}, { rejectWithValue, dispatch }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${rootApi}/api/homework/`, {
        params,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (err) {
      toast.error(err.response.data);
      return rejectWithValue(err.response.data);
    }
  }
);

export const createHomework = createAsyncThunk(
  "groups/createHomework",
  async (homeworkData, { rejectWithValue, dispatch }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${rootApi}/api/lesson/create_homework/`,
        homeworkData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Вы успешно задали домашнее задание");
      return response.data;
    } catch (err) {
      toast.error(err.response.data);
      return rejectWithValue(err.response.data);
    }
  }
);

export const getGroupMaterials = createAsyncThunk(
  "groups/getGroupMaterials",
  async (params = {}, { rejectWithValue, dispatch }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${rootApi}/api/materials/`, {
        params,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (err) {
      toast.error(err.response.data);
      return rejectWithValue(err.response.data);
    }
  }
);

export const createMaterial = createAsyncThunk(
  "groups/createMaterial",
  async (materialData, { rejectWithValue, dispatch }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${rootApi}/api/materials/`,
        materialData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Вы успешно создали новый материал для курса");
      return response.data;
    } catch (err) {
      toast.error(err.response.data);
      return rejectWithValue(err.response.data);
    }
  }
);
