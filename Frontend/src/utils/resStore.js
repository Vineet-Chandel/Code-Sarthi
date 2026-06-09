import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userId: null,
    header: null,
    skills: [],
    projects: [],
    experience: [],
    education: [],

    certifications: [],

    achievements: [],
    languages: [],
};

export const resSlice = createSlice({
    name: "res",
    initialState,
    reducers: {
        setRes: (state, action) => {
            state.userId = action.payload.userId;
            state.header = action.payload.header;
            state.skills = action.payload.skills;
            state.projects = action.payload.projects;
            state.experience = action.payload.experience;
            state.education = action.payload.education;
            state.certifications = action.payload.certifications;
            state.achievements = action.payload.achievements;
            state.languages = action.payload.languages;
        },
    },
});

export const { setRes } = resSlice.actions;
export default resSlice.reducer;