import { createContext, useContext, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import {

    receiveMessage
} from "../../src/utils/messageSlice";
const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
    console.log("SocketProvider Mounted");

    const dispatch = useDispatch();
    const socketRef = useRef(null);

    useEffect(() => {
        console.log("Creating socket...");
        socketRef.current = new WebSocket("ws://localhost:3000");

        socketRef.current.onopen = () => {
            console.log("✅ Socket Connected");
        };

        socketRef.current.onclose = () => {
            console.log("❌ Socket Closed");
            console.log(event.code);
            console.log(event.reason);
        };

        socketRef.current.onerror = (err) => {
            console.log(err);
        };
        socketRef.current.onmessage = (event) => {
            console.log("RAW EVENT", event.data);


            const payload = JSON.parse(event.data);




            switch (payload.type) {

                case "message": {


                    const payload = JSON.parse(event.data);

                    console.log("PARSED", payload);
                    dispatch(
                        receiveMessage(payload)
                    );

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
        return () => {
            socketRef.current.close();
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