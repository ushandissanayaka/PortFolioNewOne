import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import forgotResetPasswordReducer from "./slices/forgotResetPasswordSlice";
import messageReducer from "./slices/messagesSlices";
import timelineReducer from "./slices/timelineSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    forgotPassword: forgotResetPasswordReducer,
    Messages: messageReducer, // Fixed inconsistent naming
    timeline: timelineReducer,
  },
});
