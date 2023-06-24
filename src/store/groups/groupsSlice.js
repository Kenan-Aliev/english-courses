import { createSlice } from "@reduxjs/toolkit";
import {
  createGroup,
  getGroups,
  getGroupStudents,
  addStudentsToGroup,
  getTeacherGroupsByWeekDay,
  cancelLesson,
  createHomework,
  createMaterial,
  getGroupMaterials,
  getGroupHomeworks,
} from "./groupsActions";

const initialState = {
  getGroups: {
    loading: false,
    success: false,
    failed: false,
    message: "",
  },
  getGroupStudents: {
    loading: false,
    success: false,
    failed: false,
    message: "",
  },
  createGroup: {
    loading: false,
    success: false,
    failed: false,
    message: "",
  },
  addStudentsToGroup: {
    loading: false,
    success: false,
    failed: false,
    message: "",
  },
  getTeacherGroupsByWeekDay: {
    loading: false,
    success: false,
    failed: false,
    message: "",
  },
  cancelLesson: {
    loading: false,
    success: false,
    failed: false,
    message: "",
  },
  createHomework: {
    loading: false,
    success: false,
    failed: false,
    message: "",
  },
  getGroupMaterials: {
    loading: false,
    success: false,
    failed: false,
    message: "",
  },
  getGroupHomeworks: {
    loading: false,
    success: false,
    failed: false,
    message: "",
  },
  createMaterial: {
    loading: false,
    success: false,
    failed: false,
    message: "",
  },
  groupHomeworks: [],
  groupMaterials: [],
  groups: [],
  groupStudents: [],
};

const groupsSlice = createSlice({
  name: "groups",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getGroups.pending, (state) => {
        state.getGroups = {
          loading: true,
          success: false,
          failed: false,
        };
      })
      .addCase(getGroups.fulfilled, (state, action) => {
        state.getGroups = {
          loading: false,
          success: true,
          failed: false,
          message: action.payload,
        };
        state.groups = action.payload;
      })
      .addCase(getGroups.rejected, (state, action) => {
        state.getGroups = {
          loading: false,
          success: false,
          failed: true,
          message: action.payload,
        };
      });
    builder
      .addCase(createGroup.pending, (state, action) => {
        state.createGroup = {
          loading: true,
          success: false,
          failed: false,
        };
      })
      .addCase(createGroup.fulfilled, (state, action) => {
        state.createGroup = {
          loading: false,
          success: true,
          failed: false,
        };
      })
      .addCase(createGroup.rejected, (state, action) => {
        state.createGroup = {
          loading: false,
          success: false,
          failed: true,
          message: action.payload,
        };
      });
    builder
      .addCase(getGroupStudents.pending, (state, action) => {
        state.getGroupStudents = {
          loading: true,
          success: false,
          failed: false,
        };
      })
      .addCase(getGroupStudents.fulfilled, (state, action) => {
        state.getGroupStudents = {
          loading: false,
          success: true,
          failed: false,
        };
        state.groupStudents = action.payload;
      })
      .addCase(getGroupStudents.rejected, (state, action) => {
        state.getGroupStudents = {
          loading: false,
          success: false,
          failed: true,
          message: action.payload,
        };
      });
    builder
      .addCase(addStudentsToGroup.pending, (state, action) => {
        state.addStudentsToGroup = {
          loading: true,
          success: false,
          failed: false,
        };
      })
      .addCase(addStudentsToGroup.fulfilled, (state, action) => {
        state.addStudentsToGroup = {
          loading: false,
          success: true,
          failed: false,
        };
      })
      .addCase(addStudentsToGroup.rejected, (state, action) => {
        state.addStudentsToGroup = {
          loading: false,
          success: false,
          failed: true,
          message: action.payload,
        };
      });

    builder
      .addCase(getTeacherGroupsByWeekDay.pending, (state, action) => {
        state.getTeacherGroupsByWeekDay = {
          loading: true,
          success: false,
          failed: false,
        };
      })
      .addCase(getTeacherGroupsByWeekDay.fulfilled, (state, action) => {
        state.getTeacherGroupsByWeekDay = {
          loading: false,
          success: true,
          failed: false,
        };
        state.groups = action.payload;
      })
      .addCase(getTeacherGroupsByWeekDay.rejected, (state, action) => {
        state.getTeacherGroupsByWeekDay = {
          loading: false,
          success: false,
          failed: true,
          message: action.payload,
        };
      });

    builder
      .addCase(cancelLesson.pending, (state, action) => {
        state.cancelLesson = {
          loading: true,
          success: false,
          failed: false,
        };
      })
      .addCase(cancelLesson.fulfilled, (state, action) => {
        state.cancelLesson = {
          loading: false,
          success: true,
          failed: false,
        };
      })
      .addCase(cancelLesson.rejected, (state, action) => {
        state.cancelLesson = {
          loading: false,
          success: false,
          failed: true,
          message: action.payload,
        };
      });

    builder
      .addCase(createHomework.pending, (state, action) => {
        state.createHomework = {
          loading: true,
          success: false,
          failed: false,
        };
      })
      .addCase(createHomework.fulfilled, (state, action) => {
        state.createHomework = {
          loading: false,
          success: true,
          failed: false,
        };
      })
      .addCase(createHomework.rejected, (state, action) => {
        state.createHomework = {
          loading: false,
          success: false,
          failed: true,
          message: action.payload,
        };
      });

    builder
      .addCase(createMaterial.pending, (state, action) => {
        state.createMaterial = {
          loading: true,
          success: false,
          failed: false,
        };
      })
      .addCase(createMaterial.fulfilled, (state, action) => {
        state.createMaterial = {
          loading: false,
          success: true,
          failed: false,
        };
      })
      .addCase(createMaterial.rejected, (state, action) => {
        state.createMaterial = {
          loading: false,
          success: false,
          failed: true,
          message: action.payload,
        };
      });

    builder
      .addCase(getGroupMaterials.pending, (state, action) => {
        state.getGroupMaterials = {
          loading: true,
          success: false,
          failed: false,
        };
      })
      .addCase(getGroupMaterials.fulfilled, (state, action) => {
        state.getGroupMaterials = {
          loading: false,
          success: true,
          failed: false,
        };
        state.groupMaterials = action.payload;
      })
      .addCase(getGroupMaterials.rejected, (state, action) => {
        state.getGroupMaterials = {
          loading: false,
          success: false,
          failed: true,
          message: action.payload,
        };
      });

    builder
      .addCase(getGroupHomeworks.pending, (state, action) => {
        state.getGroupHomeworks = {
          loading: true,
          success: false,
          failed: false,
        };
      })
      .addCase(getGroupHomeworks.fulfilled, (state, action) => {
        state.getGroupHomeworks = {
          loading: false,
          success: true,
          failed: false,
        };
        state.groupHomeworks = action.payload;
      })
      .addCase(getGroupHomeworks.rejected, (state, action) => {
        state.getGroupHomeworks = {
          loading: false,
          success: false,
          failed: true,
          message: action.payload,
        };
      });
  },
});

export default groupsSlice.reducer;
