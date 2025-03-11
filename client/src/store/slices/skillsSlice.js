import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const skillSlice = createSlice({
    name: "skill",
    initialState: {
        loading: false,
        skills: [],
        error: null,
        message: null,
    },
    reducers: {
        getAllSkillsRequest(state) {
            state.skills = [];
            state.loading = true;
            state.error = null;
        },
        getAllSkillsSuccess(state, action) {
            state.skills = action.payload;
            state.loading = false;
            state.error = null;
        },
        getAllSkillsFailed(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        addNewSkillRequest(state) {
            state.loading = true;
            state.error = null;
            state.message = null;
        },
        addNewSkillSuccess(state, action) {
            state.loading = false;
            state.error = null;
            state.message = action.payload;
        },
        addNewSkillFailed(state, action) {
            state.loading = false;
            state.error = action.payload;
            state.message = null;
        },
        deleteSkillRequest(state) {
            state.loading = true;
            state.error = null;
            state.message = null;
        },
        deleteSkillSuccess(state, action) {
            state.loading = false;
            state.skills = state.skills.filter(skill => skill._id !== action.payload.id);
            state.error = null;
            state.message = action.payload.message;
        },
        deleteSkillFailed(state, action) {
            state.loading = false;
            state.error = action.payload;
            state.message = null;
        },
        updateSkillRequest(state) {
            state.loading = true;
            state.error = null;
            state.message = null;
        },
        updateSkillSuccess(state, action) {
            state.loading = false;
            state.skills = state.skills.map(skill => 
                skill._id === action.payload.id ? { ...skill, proficiency: action.payload.proficiency } : skill
            );
            state.error = null;
            state.message = action.payload.message;
        },
        updateSkillFailed(state, action) {
            state.loading = false;
            state.error = action.payload;
            state.message = null;
        },
        resetSkillSlice(state) {
            state.error = null;
            state.loading = false;
            state.message = null;
        },
        clearAllErrors(state) {
            state.error = null;
        }
    },
});

export const { resetSkillSlice, clearAllErrors } = skillSlice.actions;

// Thunk function to fetch skills
export const getAllSkills = () => async (dispatch) => {
    dispatch(skillSlice.actions.getAllSkillsRequest());
    try {
        const { data } = await axios.get(
            "http://localhost:4000/api/v1/skill/getall",
            { withCredentials: true }
        );
        dispatch(skillSlice.actions.getAllSkillsSuccess(data.skills));
        dispatch(skillSlice.actions.clearAllErrors());
    } catch (error) {
        dispatch(
            skillSlice.actions.getAllSkillsFailed(
                error.response?.data?.message || "Something went wrong"
            )
        );
    }
};

// Thunk function to add a new skill
export const addNewSkill = (skillData) => async (dispatch) => {
    dispatch(skillSlice.actions.addNewSkillRequest());
    try {
        const response = await axios.post(
            "http://localhost:4000/api/v1/skill/add",
            skillData,
            {
                withCredentials: true,
                headers: { "Content-Type": "multipart/form-data" },
            }
        );
        dispatch(skillSlice.actions.addNewSkillSuccess(response.data.message));
        dispatch(skillSlice.actions.clearAllErrors());
    } catch (error) {
        dispatch(
            skillSlice.actions.addNewSkillFailed(
                error.response?.data?.message || "Something went wrong"
            )
        );
    }
};

// Thunk function to delete a skill
export const deleteSkill = (skillId) => async (dispatch) => {
    dispatch(skillSlice.actions.deleteSkillRequest());
    try {
        const response = await axios.delete(
            `http://localhost:4000/api/v1/skill/delete/${skillId}`,
            { withCredentials: true }
        );
        dispatch(skillSlice.actions.deleteSkillSuccess({ id: skillId, message: response.data.message }));
        dispatch(skillSlice.actions.clearAllErrors());
    } catch (error) {
        dispatch(
            skillSlice.actions.deleteSkillFailed(
                error.response?.data?.message || "Something went wrong"
            )
        );
    }
};

// Thunk function to update a skill
export const updateSkills = (id, proficiency) => async (dispatch) => {
    dispatch(skillSlice.actions.updateSkillRequest());
    try {
        const { data } = await axios.put(
            `http://localhost:4000/api/v1/skill/update/${id}`,
            { proficiency },
            { withCredentials: true, headers: { "Content-Type": "application/json" } }
        );
        dispatch(skillSlice.actions.updateSkillSuccess({ id, proficiency, message: data.message }));
        dispatch(skillSlice.actions.clearAllErrors());
    } catch (error) {
        dispatch(skillSlice.actions.updateSkillFailed(error.response?.data?.message || "Something went wrong"));
    }
};

// Clear all skill slice errors
export const clearAllSkillSliceErrors = () => (dispatch) => {
    dispatch(skillSlice.actions.clearAllErrors());
};

// Reset the skill slice state
export const resetSkillSliceState = () => (dispatch) => {
    dispatch(skillSlice.actions.resetSkillSlice());
};

export default skillSlice.reducer;