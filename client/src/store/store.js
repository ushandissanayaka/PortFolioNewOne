import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import forgotResetPasswordReducer from "./slices/forgotResetPasswordSlice";
import messageReducer from "./slices/messagesSlices";
import myWorksReducer from "./slices/myWorksSlice";
import skillReducer from "./slices/skillsSlice"
import softwareApplicationReducer from "./slices/softwareApplicationSlice";
import projectReducer from "./slices/projectSlice"
export const store = configureStore({
  reducer: {
    user: userReducer,
    forgotPassword: forgotResetPasswordReducer,
    Messages: messageReducer, // Fixed inconsistent naming
    myWorks: myWorksReducer,
    skill: skillReducer,
    softwareApplication: softwareApplicationReducer,
    project: projectReducer

  },
});
