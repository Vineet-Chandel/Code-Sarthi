import { Outlet } from "react-router-dom";
import NavBar from "./components/Navbar";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "./utils/userSlice";
import { useEffect, useState } from "react";
import BASE_URL from "./Pages/auth/baseURL";
import { useNavigate } from "react-router-dom";
import InternetPopup from "./ErrorSaver/InternetPopup";
import { SocketProvider } from "./socket/SocketProvider";


const Body = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate(); // ✅ rename
    const [isLoading, setIsLoading] = useState(true);
    const [selectedChatUser, setSelectedChatUser] = useState({ id: null, info: null, isOpenTab: false });
    const fetchUserData = async () => {
        try {
            const response = await axios.get(
                `${BASE_URL}/profile/me`,
                {
                    withCredentials: true,
                    headers: { "Cache-Control": "no-cache" },
                }
            );

            dispatch(addUser(response.data));
        } catch (error) {
            if (error.response?.status === 401) { // ✅ axios error fix
                console.log(error.response?.data);
                navigate("/login");
            } else {
                console.error("Failed to fetch user data:", error);
            }
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);


    useEffect(() => {
        const socket = new WebSocket("ws://localhost:3000");

        socket.onopen = () => {
            console.log("Connected");
        };

        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);

        };

        socket.onclose = () => {
            console.log("Disconnected");
        };

        socket.onerror = (err) => {
            console.log(err);
        };

        return () => socket.close();
    }, []);

    if (isLoading) {
        return (
            <div className="min-h-screen w-full bg-zinc-950 flex flex-col items-center justify-center px-4">
                {/* Loader Container with a soft glow effect */}
                <div className="relative">
                    <div className="absolute inset-0 bg-white/10 blur-3xl rounded-full" />

                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="relative w-12 h-12 sm:w-16 sm:h-16 text-white"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                    >
                        <circle cx={4} cy={12} r={2.5} className="opacity-70">
                            <animate
                                id="dot1"
                                attributeName="cy"
                                begin="0;dot3.end+0.2s"
                                calcMode="spline"
                                dur="0.6s"
                                keySplines=".33,.66,.66,1;.33,0,.66,.33"
                                values="12;7;12"
                            />
                            <animate
                                attributeName="opacity"
                                begin="0;dot3.end+0.2s"
                                dur="0.6s"
                                values="0.4;1;0.4"
                            />
                        </circle>

                        <circle cx={12} cy={12} r={2.5}>
                            <animate
                                attributeName="cy"
                                begin="dot1.begin+0.1s"
                                calcMode="spline"
                                dur="0.6s"
                                keySplines=".33,.66,.66,1;.33,0,.66,.33"
                                values="12;7;12"
                            />
                            <animate
                                attributeName="opacity"
                                begin="dot1.begin+0.1s"
                                dur="0.6s"
                                values="0.4;1;0.4"
                            />
                        </circle>

                        <circle cx={20} cy={12} r={2.5} className="opacity-70">
                            <animate
                                id="dot3"
                                attributeName="cy"
                                begin="dot1.begin+0.2s"
                                calcMode="spline"
                                dur="0.6s"
                                keySplines=".33,.66,.66,1;.33,0,.66,.33"
                                values="12;7;12"
                            />
                            <animate
                                attributeName="opacity"
                                begin="dot1.begin+0.2s"
                                dur="0.6s"
                                values="0.4;1;0.4"
                            />
                        </circle>
                    </svg>
                </div>

                {/* Text Content */}
                <div className="mt-8 flex flex-col items-center gap-2">
                    <h2 className="text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-400 
                   font-bold tracking-tight text-2xl sm:text-3xl md:text-4xl">
                        Setting up things for you
                    </h2>
                    <p className="text-zinc-500 text-sm sm:text-base font-medium animate-pulse">
                        This will only take a moment...
                    </p>
                </div>
            </div>
        );
    }



    return (

        <SocketProvider>
            <div data-theme="caramellatte" className="bg-base-200 h-screen scrollbar-none overflow-y-auto">
                <InternetPopup />
                <div className=" h-[53px]">
                    <NavBar selectedChatUser={selectedChatUser} setSelectedChatUser={setSelectedChatUser} />
                </div>

                <div className="h-[calc(100vh-53px)]">
                    <Outlet
                        context={{
                            selectedChatUser,
                            setSelectedChatUser,
                        }}
                    />
                </div>

            </div>

        </SocketProvider>
    );
};


export default Body;