import { Outlet } from "react-router-dom";
import NavBar from "./components/Navbar";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "./utils/userSlice";
import { useEffect, useState } from "react";
import { BASE_URL } from "./Pages/auth/baseURL";
import { useNavigate } from "react-router-dom";
const Body = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate(); // ✅ rename
    const [isLoading, setIsLoading] = useState(true);

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

    if (isLoading) {
        return (
            <div className="min-h-screen w-full bg-black flex flex-col items-center justify-center px-4 text-center">

                {/* Loader */}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 text-white"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                >
                    <circle cx={4} cy={12} r={3}>
                        <animate
                            id="dot1"
                            attributeName="cy"
                            begin="0;dot3.end+0.25s"
                            calcMode="spline"
                            dur="0.6s"
                            keySplines=".33,.66,.66,1;.33,0,.66,.33"
                            values="12;6;12"
                        />
                    </circle>

                    <circle cx={12} cy={12} r={3}>
                        <animate
                            attributeName="cy"
                            begin="dot1.begin+0.1s"
                            calcMode="spline"
                            dur="0.6s"
                            keySplines=".33,.66,.66,1;.33,0,.66,.33"
                            values="12;6;12"
                        />
                    </circle>

                    <circle cx={20} cy={12} r={3}>
                        <animate
                            id="dot3"
                            attributeName="cy"
                            begin="dot1.begin+0.2s"
                            calcMode="spline"
                            dur="0.6s"
                            keySplines=".33,.66,.66,1;.33,0,.66,.33"
                            values="12;6;12"
                        />
                    </circle>
                </svg>

                {/* Text */}
                <div className="mt-6 text-white font-extrabold 
                    text-xl sm:text-2xl md:text-3xl lg:text-4xl">
                    Setting up things for you!
                </div>

            </div>
        );
    }

    return (
        <div data-theme="caramellatte" className="bg-base-200">
            <NavBar />
            <Outlet />
        </div>
    );
};


export default Body;