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
            <div className="h-screen w-screen bg-black flex justify-center flex-col items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><circle cx={4} cy={12} r={3} fill="currentColor"><animate id="SVGKiXXedfO" attributeName="cy" begin="0;SVGgLulOGrw.end+0.25s" calcMode="spline" dur="0.6s" keySplines=".33,.66,.66,1;.33,0,.66,.33" values="12;6;12"></animate></circle><circle cx={12} cy={12} r={3} fill="currentColor"><animate attributeName="cy" begin="SVGKiXXedfO.begin+0.1s" calcMode="spline" dur="0.6s" keySplines=".33,.66,.66,1;.33,0,.66,.33" values="12;6;12"></animate></circle><circle cx={20} cy={12} r={3} fill="currentColor"><animate id="SVGgLulOGrw" attributeName="cy" begin="SVGKiXXedfO.begin+0.2s" calcMode="spline" dur="0.6s" keySplines=".33,.66,.66,1;.33,0,.66,.33" values="12;6;12"></animate></circle></svg>
                <div className="text-4xl text-white font-extrabold ">Setting up things for you!</div>
            </div>
        );
    }

    return (
        <div>
            <NavBar />
            <Outlet />
        </div>
    );
};


export default Body;