// src/store/slices/projectSlice.js
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Use Vite's environment variables
axios.defaults.baseURL = import.meta.env.VITE_API_URL || "http://localhost:4000";

const projectSlice = createSlice({
  name: "project",
  initialState: {
    loading: false,
    error: null,
    message: null,
    projects: [],
    singleProject: {},
  },
  reducers: {
    // Get all projects
    getAllProjectsRequest(state) {
      state.loading = true;
      state.error = null;
    },
    getAllProjectsSuccess(state, action) {
      state.projects = action.payload;
      state.loading = false;
      state.error = null;
    },
    getAllProjectsFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    // Get single project
    getSingleProjectRequest(state) {
      state.loading = true;
      state.error = null;
    },
    getSingleProjectSuccess(state, action) {
      state.singleProject = action.payload;
      state.loading = false;
      state.error = null;
    },
    getSingleProjectFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    // Add new project
    addProjectRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    addProjectSuccess(state, action) {
      state.message = action.payload;
      state.loading = false;
      state.error = null;
    },
    addProjectFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    // Update project
    updateProjectRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    updateProjectSuccess(state, action) {
      state.message = action.payload;
      state.loading = false;
      state.error = null;
    },
    updateProjectFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    // Delete project
    deleteProjectRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    deleteProjectSuccess(state, action) {
      state.message = action.payload;
      state.loading = false;
      state.error = null;
    },
    deleteProjectFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    // Reset state (clear loading, error, and message)
    resetProjectState(state) {
      state.loading = false;
      state.error = null;
      state.message = null;
    },
    // Clear only errors
    clearAllErrors(state) {
      state.error = null;
    },
  },
});

export const {
  getAllProjectsRequest,
  getAllProjectsSuccess,
  getAllProjectsFailed,
  getSingleProjectRequest,
  getSingleProjectSuccess,
  getSingleProjectFailed,
  addProjectRequest,
  addProjectSuccess,
  addProjectFailed,
  updateProjectRequest,
  updateProjectSuccess,
  updateProjectFailed,
  deleteProjectRequest,
  deleteProjectSuccess,
  deleteProjectFailed,
  resetProjectState,
  clearAllErrors,
} = projectSlice.actions;

// Async Thunks

export const getAllProjects = () => async (dispatch) => {
  try {
    dispatch(getAllProjectsRequest());
    const { data } = await axios.get("/api/v1/project/getall", {
      withCredentials: true,
    });
    dispatch(getAllProjectsSuccess(data.projects));
  } catch (error) {
    dispatch(
      getAllProjectsFailed(
        error.response?.data?.message || "Failed to fetch projects"
      )
    );
  }
};

export const getSingleProject = (id) => async (dispatch) => {
  try {
    dispatch(getSingleProjectRequest());
    const { data } = await axios.get(`/api/v1/project/get/${id}`, {
      withCredentials: true,
    });
    dispatch(getSingleProjectSuccess(data.project));
  } catch (error) {
    dispatch(
      getSingleProjectFailed(
        error.response?.data?.message || "Failed to fetch project"
      )
    );
  }
};

export const addProject = (formData) => async (dispatch) => {
  try {
    dispatch(addProjectRequest());
    const { data } = await axios.post("/api/v1/project/add", formData, {
      withCredentials: true,
      headers: { "Content-Type": "multipart/form-data" },
    });
    dispatch(addProjectSuccess(data.message));
  } catch (error) {
    dispatch(
      addProjectFailed(
        error.response?.data?.message || "Failed to add project"
      )
    );
  }
};

export const updateProject = (id, formData) => async (dispatch) => {
  try {
    dispatch(updateProjectRequest());
    const { data } = await axios.put(`/api/v1/project/update/${id}`, formData, {
      withCredentials: true,
      headers: { "Content-Type": "multipart/form-data" },
    });
    dispatch(updateProjectSuccess(data.message));
  } catch (error) {
    dispatch(
      updateProjectFailed(
        error.response?.data?.message || "Failed to update project"
      )
    );
  }
};

export const deleteProject = (id) => async (dispatch) => {
  try {
    dispatch(deleteProjectRequest());
    const { data } = await axios.delete(`/api/v1/project/delete/${id}`, {
      withCredentials: true,
    });
    dispatch(deleteProjectSuccess(data.message));
  } catch (error) {
    dispatch(
      deleteProjectFailed(
        error.response?.data?.message || "Failed to delete project"
      )
    );
  }
};

export const clearAllProjectSliceErrors = () => (dispatch) => {
  dispatch(clearAllErrors());
};

export const resetProjectStateThunk = () => (dispatch) => {
  dispatch(resetProjectState());
};

export default projectSlice.reducer;
