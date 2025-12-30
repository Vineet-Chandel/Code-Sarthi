import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BASE_URL } from "./auth/baseURL";

const Explore = () => {
    const reduxUser = useSelector((store) => store.user.user);
    const [isLoading, setIsLoading] = useState(true);
    const [feed, setFeed] = useState([]);
    const page = 1;





    const feedUser = async () => {
        try {
            const response = await axios.get(
                `${BASE_URL}/Feed?page=${page}&limit=12`,
                {
                    withCredentials: true,
                    headers: {
                        "Cache-Control": "no-cache",
                    },
                }
            );

            console.log("Fetched feed data:", response.data);
            setFeed(response.data);

        } catch (error) {
            console.error("Authentication failed:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        feedUser();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Explore</h1>
            <p>Welcome, {reduxUser?.FirstName}</p>
        </div>
    );
};

export default Explore;
