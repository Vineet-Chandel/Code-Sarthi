import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userId: null,
    header: null,
    skills: [],
    projects: [],
    experience: [],
    education: [],

    certifications: [],
    summaryBody: "",
    achievements: [],
    languages: [],
};

export const resSlice = createSlice({
    name: "res",
    initialState,
    reducers: {
        setRes: (state, action) => {
            Object.assign(state, {
                userId: action.payload.userId ?? null,
                header: action.payload.header ?? null,
                skills: action.payload.skills ?? [],
                projects: action.payload.projects ?? [],
                experience: action.payload.experience ?? [],
                education: action.payload.education ?? [],
                certifications: action.payload.certifications ?? [],
                achievements: action.payload.achievements ?? [],
                languages: action.payload.languages ?? [],
                summaryBody: action.payload.summaryBody ?? "",
            });
        }
    },
});

export const { setRes } = resSlice.actions;
export default resSlice.reducer;