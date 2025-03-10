import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const timelineSlice = createSlice({
  name: "timeline",
  initialState: {
    loading: false,
    timeline: [],
    error: null,
    message: null,
  },
  reducers: {
    getAllTimelineRequest: (state) => {
      state.loading = true;
    },
    getAllTimelineSuccess: (state, action) => {
      state.timeline = action.payload;
      state.loading = false;
    },
    getAllTimelineFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    addTimelineRequest: (state) => {
      state.loading = true;
    },
    addTimelineSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    addTimelineFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    deleteTimelineRequest: (state) => {
      state.loading = true;
    },
    deleteTimelineSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      // Remove the deleted timeline from the state
      state.timeline = state.timeline.filter(
        (timeline) => timeline._id !== action.payload.id
      );
    },
    deleteTimelineFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    resetTimelineSlice: (state) => {
      state.error = null;
      state.message = null;
    },
    clearAllErrors: (state) => {
      state.error = null;
    },
  },
});

export const {
  getAllTimelineRequest,
  getAllTimelineSuccess,
  getAllTimelineFailed,
  addTimelineRequest,
  addTimelineSuccess,
  addTimelineFailed,
  deleteTimelineRequest,
  deleteTimelineSuccess,
  deleteTimelineFailed,
  resetTimelineSlice,
  clearAllErrors,
} = timelineSlice.actions;

// ✅ Fetch all timelines
export const getAllTimeline = () => async (dispatch) => {
  dispatch(getAllTimelineRequest());
  try {
    const { data } = await axios.get("http://localhost:4000/api/v1/timeLine/getall", { withCredentials: true });
    dispatch(getAllTimelineSuccess(data.timelines));
  } catch (error) {
    dispatch(getAllTimelineFailed(error.response?.data?.message || "Something went wrong!"));
  }
};

// ✅ Add a new timeline
export const addNewTimeline = (timeLinedata) => async (dispatch) => {
  dispatch(addTimelineRequest());
  try {
    const { data } = await axios.post("http://localhost:4000/api/v1/timeLine/add", timeLinedata, {
      withCredentials: true,
    });
    dispatch(addTimelineSuccess(data.message));
  } catch (error) {
    dispatch(addTimelineFailed(error.response?.data?.message || "Failed to add timeline!"));
  }
};

// ✅ Delete a timeline
export const deleteTimeline = (id) => async (dispatch) => {
  dispatch(deleteTimelineRequest());
  try {
    const { data } = await axios.delete(`http://localhost:4000/api/v1/timeLine/delete/${id}`, {
      withCredentials: true,
    });
    dispatch(deleteTimelineSuccess({ message: data.message, id }));
  } catch (error) {
    dispatch(deleteTimelineFailed(error.response?.data?.message || "Failed to delete timeline!"));
  }
};

// ✅ Clear errors
export const clearAllTimelineErrors = () => (dispatch) => {
  dispatch(clearAllErrors());
};

// ✅ Reset slice
export const resetTimelineState = () => (dispatch) => {
  dispatch(resetTimelineSlice());
};

export default timelineSlice.reducer;