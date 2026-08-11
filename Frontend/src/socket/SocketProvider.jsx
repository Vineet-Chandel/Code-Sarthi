import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import {
    receiveMessage
} from "../../src/utils/messageSlice";
import { updateConversation } from "@/utils/chat-user-slice";
import BASE_URL from "../Pages/auth/baseURL";
import { SocketContext } from "./SocketContext";

export const SocketProvider = ({ children }) => {


    const dispatch = useDispatch();
    const socketRef = useRef(null);

    useEffect(() => {

        // Append a trailing slash to prevent NGINX 301 redirects which WebSockets cannot follow
        const wsUrl = BASE_URL.replace(/^http/, 'ws') + '/';
        socketRef.current = new WebSocket(wsUrl);

        socketRef.current.onopen = () => {
            console.log("✅ Socket Connected");
        };

        socketRef.current.onclose = () => {
            console.log("❌ Socket Closed");

        };

        socketRef.current.onerror = (err) => {
            console.log(err);
        };
        const handleMessage = (event) => {

            console.log("🚨🚨🚨 RAW WEBSOCKET FRAME RECEIVED 🚨🚨🚨");
            console.log("EVENT:", event);
            console.log("EVENT.DATA:", event.data);
            console.log("DATA TYPE:", typeof event.data);

            try {

                const payload = JSON.parse(event.data);

                console.log("========== WS MESSAGE ==========");
                console.log("localChatKey:", payload.localChatKey);
                console.log("conversation:", payload.conversation);
                console.log("message:", payload.message);
                console.log(
                    "message.conversation_id:",
                    payload.message?.conversation_id
                );
                console.log("clientMessageId:", payload.clientMessageId);
                console.log("================================");

                if (payload?.type === "message") {

                    console.log("🔥 MESSAGE EVENT");

                    console.log(
                        "BEFORE RECEIVE",

                        {
                            localChatKey: payload.localChatKey,

                            realConversationId:
                                payload.message.conversation_id,


                        }
                    ); 
                    dispatch(
                        receiveMessage(payload)
                    );

                    if (payload.localChatKey && payload.conversation) {

                        dispatch(
                            updateConversation({
                                localChatKey: payload.localChatKey,
                                conversation: payload.conversation
                            })
                        );

                    }
                }

            } catch (error) {

                console.error(
                    "❌ FAILED TO PROCESS WS MESSAGE:",
                    error
                );

            }
        };

        socketRef.current.addEventListener("message", handleMessage);

        return () => {
            if (socketRef.current) {
                socketRef.current.removeEventListener("message", handleMessage);
                socketRef.current.close();
            }
        };

    }, []);

    return (
        <SocketContext.Provider value={socketRef}>
            {children}
        </SocketContext.Provider>
    );
};