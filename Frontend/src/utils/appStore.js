//Importing the configureStore from the redux !
import { configureStore } from "@reduxjs/toolkit";


import userReducer from "./userSlice";
import feedReducer from "./feedSlice";
import connectionReducer from "./connectionSlice";
import blocksReducer from "./blockedSlice";
import RequestedUser from "./requestedUserSlice";
import ReceivedRequests from "./receivedConnection";
import chatsReducer from "./chat-user-slice";
import resReducer from "./resStore";
import messageReducer from "./messageSlice"

const appStore = configureStore({
    reducer: {
        user: userReducer,
        feed: feedReducer,
        connections: connectionReducer,
        blockedUsers: blocksReducer,
        requestedUser: RequestedUser,
        receivedConnection: ReceivedRequests,
        chats: chatsReducer,
        res: resReducer,
        messages: messageReducer
    }
});

export default appStore;