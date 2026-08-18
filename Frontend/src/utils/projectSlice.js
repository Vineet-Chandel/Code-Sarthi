import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    teams: [],
    isTeamsFetched: false,
    teamDetails: {},
    teamProjects: {},
    projectDetails: {},
    issuesByProject: {},
    error: null
};

const projectSlice = createSlice({
    name: "projects",
    initialState,
    reducers: {
        // Teams list
        setTeams: (state, action) => {
            state.teams = action.payload;
            state.isTeamsFetched = true;
        },
        addTeam: (state, action) => {
            state.teams.unshift(action.payload);
        },
        updateTeamInList: (state, action) => {
            const index = state.teams.findIndex(t => t._id === action.payload._id);
            if (index !== -1) {
                state.teams[index] = { ...state.teams[index], ...action.payload };
            }
        },
        removeTeam: (state, action) => {
            state.teams = state.teams.filter(t => t._id !== action.payload);
            delete state.teamDetails[action.payload];
            delete state.teamProjects[action.payload];
        },
        invalidateTeams: (state) => {
            state.isTeamsFetched = false;
        },

        // Team Details
        setTeamDetail: (state, action) => {
            const { teamId, team, membership } = action.payload;
            state.teamDetails[teamId] = { team, membership, isFetched: true };
        },
        invalidateTeamDetail: (state, action) => {
            if (state.teamDetails[action.payload]) {
                state.teamDetails[action.payload].isFetched = false;
            }
        },

        // Projects per Team
        setTeamProjects: (state, action) => {
            const { teamId, projects } = action.payload;
            state.teamProjects[teamId] = { projects, isFetched: true };
        },
        addProjectToTeam: (state, action) => {
            const { teamId, project } = action.payload;
            if (state.teamProjects[teamId]) {
                state.teamProjects[teamId].projects.unshift(project);
            }
        },
        updateProjectInTeam: (state, action) => {
            const { teamId, project } = action.payload;
            if (state.teamProjects[teamId]) {
                const idx = state.teamProjects[teamId].projects.findIndex(p => p._id === project._id);
                if (idx !== -1) {
                    state.teamProjects[teamId].projects[idx] = project;
                }
            }
        },
        removeProjectFromTeam: (state, action) => {
            const { teamId, projectId } = action.payload;
            if (state.teamProjects[teamId]) {
                state.teamProjects[teamId].projects = state.teamProjects[teamId].projects.filter(p => p._id !== projectId);
            }
            delete state.projectDetails[projectId];
            delete state.issuesByProject[projectId];
        },
        invalidateTeamProjects: (state, action) => {
            if (state.teamProjects[action.payload]) {
                state.teamProjects[action.payload].isFetched = false;
            }
        },

        // Project Detail
        setProjectDetail: (state, action) => {
            const { projectId, project, repository } = action.payload;
            state.projectDetails[projectId] = { project, repository, isFetched: true };
        },
        invalidateProjectDetail: (state, action) => {
            if (state.projectDetails[action.payload]) {
                state.projectDetails[action.payload].isFetched = false;
            }
        },

        // Issues per Project
        setProjectIssues: (state, action) => {
            const { projectId, issues } = action.payload;
            state.issuesByProject[projectId] = { issues, isFetched: true };
        },
        addIssueToProject: (state, action) => {
            const { projectId, issue } = action.payload;
            if (state.issuesByProject[projectId]) {
                state.issuesByProject[projectId].issues.unshift(issue);
            }
        },
        updateIssueInProject: (state, action) => {
            const { projectId, issue } = action.payload;
            if (state.issuesByProject[projectId]) {
                const idx = state.issuesByProject[projectId].issues.findIndex(i => i._id === issue._id);
                if (idx !== -1) {
                    state.issuesByProject[projectId].issues[idx] = issue;
                }
            }
        },
        removeIssueFromProject: (state, action) => {
            const { projectId, issueId } = action.payload;
            if (state.issuesByProject[projectId]) {
                state.issuesByProject[projectId].issues = state.issuesByProject[projectId].issues.filter(i => i._id !== issueId);
            }
        },
        invalidateProjectIssues: (state, action) => {
            if (state.issuesByProject[action.payload]) {
                state.issuesByProject[action.payload].isFetched = false;
            }
        },

        // Clear all projects data on logout or account switch
        clearProjects: (state) => {
            state.teams = [];
            state.isTeamsFetched = false;
            state.teamDetails = {};
            state.teamProjects = {};
            state.projectDetails = {};
            state.issuesByProject = {};
            state.error = null;
        }
    }
});

export const {
    setTeams,
    addTeam,
    updateTeamInList,
    removeTeam,
    invalidateTeams,
    setTeamDetail,
    invalidateTeamDetail,
    setTeamProjects,
    addProjectToTeam,
    updateProjectInTeam,
    removeProjectFromTeam,
    invalidateTeamProjects,
    setProjectDetail,
    invalidateProjectDetail,
    setProjectIssues,
    addIssueToProject,
    updateIssueInProject,
    removeIssueFromProject,
    invalidateProjectIssues,
    clearProjects
} = projectSlice.actions;

export default projectSlice.reducer;
