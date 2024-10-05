import { configureStore } from "@reduxjs/toolkit";
import userReducer from './slices/userSlice'; // Correct path

export const store = configureStore({
    reducer: {
        user: userReducer,
    },
});
