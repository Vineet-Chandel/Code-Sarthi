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
        return <div>Loading...</div>;
    }

    return (
        <div>
            <NavBar />
            <Outlet />
        </div>
    );
};


export default Body;