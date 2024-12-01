import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const messageSlice = createSlice({
  name: "messages",
  initialState: {
    loading: false,
    messages: [],
    error: null,
    message: null,
  },
  reducers: {
    getAllMessagesRequest(state) {
      state.messages = [];
      state.error = null;
      state.loading = true; // Fixed typo
    },
    getAllMessagesSuccess(state, action) {
      state.messages = action.payload;
      state.error = null;
      state.loading = false;
    },
    getAllMessagesFailed(state, action) {
      state.messages = []; // Clear messages on failure
      state.error = action.payload;
      state.loading = false;
    },

    deleteMessageRequest(state) {
      state.message = null;
      state.error = null;
      state.loading = true; // Fixed typo
    },
    deleteMessageSuccess(state, action) {
      state.message = action.payload;
      state.error = null;
      state.loading = false;
    },
    deleteMessageFailed(state, action) {
      state.message = null; // Clear messages on failure
      state.error = action.payload;
      state.loading = false;
    },
    
    resetMessageSlice(state, action){
    state.error=null;
    state.messages=state.messages;
    state.message=null;
    state.loading=false;

    },
    clearAllErrors(state) {
      state.error = null; // Only clear errors
    },
  },
});

export const getAllMessages = () => async (dispatch) => {
  dispatch(messageSlice.actions.getAllMessagesRequest());
  try {
    const { data } = await axios.get("http://localhost:4000/api/v1/message/getall", {
      withCredentials: true,
    });
    dispatch(messageSlice.actions.getAllMessagesSuccess(data.messages)); // Ensure messages contain senseName
  } catch (err) {
    const errorMessage = err.response?.data?.message || "Something went wrong!";
    dispatch(messageSlice.actions.getAllMessagesFailed(errorMessage));
  }
};

export const deleteMessage = (id)=>async(dispatch)=>{
dispatch(messageSlice. actions.deleteMessageRequest());
try {
  const {data} = await axios.delete(`http://localhost:4000/api/v1/message/delete/${id}`,
    {withCredentials: true}
  );
  dispatch(messageSlice.actions.deleteMessageSuccess(data.message));
  dispatch(messageSlice.actions.clearAllErrors());
  
} catch (error) {
  dispatch(messageSlice.actions.deleteMessageFailed(error.response.data.message))
}
}


export  const clearAllMessageErrors = () => (dispatch) => {
  dispatch(messageSlice.actions.clearAllErrors());
};

export const resetMessageSlice = () => (dispatch) => {
  dispatch(messageSlice.actions.resetMessageSlice());
}
  

export default messageSlice.reducer;
