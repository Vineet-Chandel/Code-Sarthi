import { Outlet } from "react-router-dom";
import NavBar from "./components/Navbar";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "./utils/userSlice";
import { useEffect, useState } from "react";

const Body = () => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);

    const fetchUserData = async () => {
        try {
            const response = await axios.get(
                "http://localhost:3000/profile/view",
                {
                    withCredentials: true, // Required for Cookies
                    headers: {
                        "Cache-Control": "no-cache",
                        // If using LocalStorage, uncomment the line below:
                        // "Authorization": `Bearer ${localStorage.getItem("token")}`
                    },
                }
            );

            console.log("Fetched user data:", response.data);

            // IMPORTANT: You must dispatch the user to Redux
            dispatch(addUser(response.data));

        } catch (error) {
            console.error("Authentication failed:", error);
            dispatch(addUser(null));
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