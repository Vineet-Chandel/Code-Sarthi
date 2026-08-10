import { createContext, useContext, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import {

    receiveMessage
} from "../../src/utils/messageSlice";
import { updateConversation } from "@/utils/chat-user-slice";
import BASE_URL from "../Pages/auth/baseURL";

const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {


    const dispatch = useDispatch();
    const socketRef = useRef(null);

    useEffect(() => {

        const wsUrl = BASE_URL.replace(/^http/, 'ws');
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



            const payload = JSON.parse(event.data);


            console.log("payload", payload)

            switch (payload.type) {

                case "message": {


                    const payload = JSON.parse(event.data);
                    console.log("payload", payload)

                    dispatch(
                        receiveMessage(payload)
                    );
                    // dispatch(updateConversation(payload)) 
                    break;
                }

                case "typing": {



                    break;
                }

                case "delete": {
                    break;
                }

                default:

                    break;
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

export const useSocket = () => {
    return useContext(SocketContext);
};