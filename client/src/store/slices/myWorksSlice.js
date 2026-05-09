import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const myWorksSlice = createSlice({
  name: "myWorks",
  initialState: {
    loading: false,
    myWorks: [],
    error: null,
    message: null,
  },
  reducers: {
    getAllMyWorksRequest: (state) => {
      state.loading = true;
    },
    getAllMyWorksSuccess: (state, action) => {
      state.myWorks = action.payload;
      state.loading = false;
    },
    getAllMyWorksFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addMyWorkRequest: (state) => {
      state.loading = true;
    },
    addMyWorkSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    addMyWorkFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteMyWorkRequest: (state) => {
      state.loading = true;
    },
    deleteMyWorkSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.myWorks = state.myWorks.filter(
        (work) => work._id !== action.payload.id
      );
    },
    deleteMyWorkFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    resetMyWorksSlice: (state) => {
      state.error = null;
      state.message = null;
    },
    clearAllMyWorksErrors: (state) => {
      state.error = null;
    },
  },
});

export const {
  getAllMyWorksRequest,
  getAllMyWorksSuccess,
  getAllMyWorksFailed,
  addMyWorkRequest,
  addMyWorkSuccess,
  addMyWorkFailed,
  deleteMyWorkRequest,
  deleteMyWorkSuccess,
  deleteMyWorkFailed,
  resetMyWorksSlice,
  clearAllMyWorksErrors,
} = myWorksSlice.actions;

export const getAllMyWorks = () => async (dispatch) => {
  dispatch(getAllMyWorksRequest());
  try {
    const { data } = await axios.get("http://localhost:4000/api/v1/myWorks/getall", { withCredentials: true });
    dispatch(getAllMyWorksSuccess(data.myWorks));
  } catch (error) {
    dispatch(getAllMyWorksFailed(error.response?.data?.message || "Something went wrong!"));
  }
};

export const addNewMyWork = (data) => async (dispatch) => {
  dispatch(addMyWorkRequest());
  try {
    const response = await axios.post("http://localhost:4000/api/v1/myWorks/add", data, {
      withCredentials: true,
      headers: { "Content-Type": "application/json" }
    });
    dispatch(addMyWorkSuccess(response.data.message));
  } catch (error) {
    dispatch(addMyWorkFailed(error.response?.data?.message || "Failed to add work!"));
  }
};

export const deleteMyWork = (id) => async (dispatch) => {
  dispatch(deleteMyWorkRequest());
  try {
    const { data } = await axios.delete(`http://localhost:4000/api/v1/myWorks/delete/${id}`, {
      withCredentials: true,
    });
    dispatch(deleteMyWorkSuccess({ message: data.message, id }));
  } catch (error) {
    dispatch(deleteMyWorkFailed(error.response?.data?.message || "Failed to delete work!"));
  }
};

export const clearAllMyWorksErrorsAction = () => (dispatch) => {
  dispatch(clearAllMyWorksErrors());
};

export const resetMyWorksState = () => (dispatch) => {
  dispatch(resetMyWorksSlice());
};

export default myWorksSlice.reducer;
