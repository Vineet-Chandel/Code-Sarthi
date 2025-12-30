import { Navigate, Outlet } from "react-router-dom";
import NavBar from "./components/Navbar";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "./utils/userSlice";
import { useEffect, useState } from "react";
import { BASE_URL } from "./Pages/auth/baseURL";
import { useNavigate } from "react-router-dom";
const Body = () => {
    const dispatch = useDispatch();
    const Navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    const fetchUserData = async () => {
        try {
            const response = await axios.get(
                "http://localhost:3000/profile/view",
                {
                    withCredentials: true, // Required for Cookies
                    headers: {
                        "Cache-Control": "no-cache",
                    },
                }
            );

            // IMPORTANT: You must dispatch the user to Redux
            dispatch(addUser(response.data));

        } catch (error) {
            if (error.status == 401) {
                Navigate("/login");
            }
            else {
                console.error("Failed to fetch user data:", error);
            }
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, [dispatch]); // Added dispatch to dependency array for best practice

    if (isLoading) {
        return <div>Loading...</div>; // Prevents Outlet from rendering without user data
    }

    return (
        <div>
            <NavBar />
            <Outlet />
        </div>
    );
};

export default Body;