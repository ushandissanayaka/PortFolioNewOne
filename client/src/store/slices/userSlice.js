import {  createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const userSlice = createSlice({
    name: "user",
    initialState:{
        loading: false,
        user: {},
        isAuthenticated: false,
        error: null,
        message: null,
        isUpdated: false,
    },

    reducers:{
        loginRequest(state, action){
            state.loading = true;
            state.isAuthenticated = false;
            state.user = {};
            state.error = null;
        },
        loginSuccess(state, action){
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload;
            state.error = null;
        },
        loginFailed(state, action){
            state.loading = false;
            state.isAuthenticated = false;
            state.user = {};
            state.error = action.payload;
        },
        clearAllErrors(state,action){
            state.error=null;
            state.user = state.user;
        }
    },
});

export const login = (email, password )=>async( dispatch )=>{
    dispatch(userSlice.actions.loginRequest());
    try {
        const {data} = await axios.post("", {email,password}, {withCredentials: true,headers:{ "Content-Type": "application/json"}})
        dispatch(userSlice.actions.loginSuccess(data.user));
        dispatch(userSlice.actions.clearAllErrors());
    } catch (error) {
        dispatch(userSlice.actions.loginFailed(error.response.data.message));
    }
}

export const clearAllUserErrors = ()=>()=>{
    dispatch(userSlice.actions.clearAllErrors());
};


export default userSlice .reducer;

