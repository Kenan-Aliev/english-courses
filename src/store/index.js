import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import usersReducer from "./users/usersSlice";
import weekdaysReducer from "./weekdays/weekdaysSlice";
import classroomsReducer from "./classrooms/classroomsSlice";
import groupsReducer from "./groups/groupsSlice";
import financialsReducer from "./financials/financialsSlice";
import attendanceReducer from "./attendance/attendanceSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  users: usersReducer,
  weekdays: weekdaysReducer,
  classrooms: classroomsReducer,
  groups: groupsReducer,
  financials: financialsReducer,
  attendance: attendanceReducer,
});

const store = configureStore({
  reducer: rootReducer,
  devTools: true,
});

export default store;
