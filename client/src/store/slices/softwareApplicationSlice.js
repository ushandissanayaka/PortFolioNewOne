import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const softwareApplicationSlice = createSlice({
  name: "softwareApplication",
  initialState: {
    softwareApplications: [],
    loading: false,
    error: null,
    message: null,
  },
  reducers: {
    getAllSoftwareApplicationsRequest(state) {
      state.softwareApplications = [];
      state.loading = true;
      state.error = null;
    },
    getSoftwareApplicationsSuccess(state, action) {
      state.softwareApplications = action.payload;
      state.loading = false;
      state.error = null;
    },
    getAllSoftwareApplicationsFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    addNewSoftwareRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    addNewSoftwareApplicationsSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.message = action.payload;
    },
    addNewSoftwareApplicationsFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    deleteApplicationRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    deleteApplicationSuccess(state, action) {
      state.loading = false;
      state.softwareApplications = state.softwareApplications.filter(
        (app) => app._id !== action.payload.id
      );
      state.error = null;
      state.message = action.payload.message;
    },
    deleteApplicationFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    resetApplicationSlice(state) {
      state.error = null;
      state.loading = false;
      state.message = null;
      // Retain existing softwareApplications
    },
    clearAllErrors(state) {
      state.error = null;
      // Retain existing softwareApplications
    },
  },
});

export const {
  getAllSoftwareApplicationsRequest,
  getSoftwareApplicationsSuccess,
  getAllSoftwareApplicationsFailed,
  addNewSoftwareRequest,
  addNewSoftwareApplicationsSuccess,
  addNewSoftwareApplicationsFailed,
  deleteApplicationRequest,
  deleteApplicationSuccess,
  deleteApplicationFailed,
  resetApplicationSlice,
  clearAllErrors,
} = softwareApplicationSlice.actions;

// Thunk to fetch all software applications
export const getAllSoftwareApplications = () => async (dispatch) => {
  dispatch(getAllSoftwareApplicationsRequest());
  try {
    const { data } = await axios.get(
      "http://localhost:4000/api/v1/softwareApplication/getall",
      { withCredentials: true }
    );
    dispatch(getSoftwareApplicationsSuccess(data.softwareApplications));
    dispatch(clearAllErrors());
  } catch (error) {
    dispatch(
      getAllSoftwareApplicationsFailed(
        error.response?.data?.message || "Something went wrong"
      )
    );
  }
};

// Thunk to add a new software application
export const addNewSoftwareApplication = (applicationData) => async (dispatch) => {
  dispatch(addNewSoftwareRequest());
  try {
    const response = await axios.post(
      "http://localhost:4000/api/v1/softwareApplication/add",
      applicationData,
      {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    dispatch(addNewSoftwareApplicationsSuccess(response.data.message));
    dispatch(clearAllErrors());
  } catch (error) {
    dispatch(
      addNewSoftwareApplicationsFailed(
        error.response?.data?.message || "Something went wrong"
      )
    );
  }
};

// Thunk to delete a software application
export const deleteSoftwareApplication = (applicationId) => async (dispatch) => {
  dispatch(deleteApplicationRequest());
  try {
    const response = await axios.delete(
      `http://localhost:4000/api/v1/softwareApplication/delete/${applicationId}`,
      { withCredentials: true }
    );
    dispatch(
      deleteApplicationSuccess({
        id: applicationId,
        message: response.data.message,
      })
    );
    dispatch(clearAllErrors());
  } catch (error) {
    dispatch(
      deleteApplicationFailed(
        error.response?.data?.message || "Something went wrong"
      )
    );
  }
};

// Clear all errors
export const clearAllApplicationSliceErrors = () => (dispatch) => {
  dispatch(clearAllErrors());
};

// Reset the application slice state
export const resetApplicationSliceThunk = () => (dispatch) => {
  dispatch(resetApplicationSlice());
};

export default softwareApplicationSlice.reducer;
