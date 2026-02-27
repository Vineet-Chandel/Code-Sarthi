import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import feedReducer from "./feedSlice";
import connectionReducer from "./connectionSlice";
import blocksReducer from "./blockedSlice";
import RequestedUser from "./requestedUserSlice";
import ReceivedRequests from "./receivedConnection";

const appStore = configureStore({
    reducer: {
        user: userReducer,
        feed: feedReducer,
        connections: connectionReducer,
        blockedUsers: blocksReducer,
        requestedUser: RequestedUser,
        receivedConnection: ReceivedRequests
    },
    devTools: {
        trace: true,
    },
});

export default appStore;