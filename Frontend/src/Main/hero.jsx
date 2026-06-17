


import { useState, useEffect } from "react";

import Preloader from "./preloader";
import Footer from "./Footer";
import ContentFirst from "./ContentFirst";
import ContentSecond from "./ContentSecond";
import ContentThird from "./ContentThird";

import Devs from "./Devs";
import Main2 from "./Main2";
import Lines from "./Lines";
import SecondLanding from "./SecondLanding";
import { useNavigate } from "react-router-dom";
import BASE_URL from "@/Pages/auth/baseURL";
import axios from "axios";
import ContentSecond2 from "./ContentSecond2";



const Hero = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await axios.get(
                    `${BASE_URL}/profile/me`,
                    {
                        withCredentials: true,
                    }
                );

                if (res.data.success) {
                    navigate("/app", { replace: true });
                }
            } catch (err) {
                // Not logged in
            }
        };

        checkAuth();
    }, []);
    const [loading, setLoading] = useState(true);

    // ✅ Run once
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);


    useEffect(() => {
        if (loading) {
            document.body.style.overflow = "hidden";
            document.documentElement.style.overflow = "hidden"; // mobile fix
        } else {
            document.body.style.overflow = "";
            document.documentElement.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
            document.documentElement.style.overflow = "";
        };
    }, [loading]);

    return (
        <div className="bg-gray-200">
            {loading && <Preloader />}

            <Main2 />

            <ContentFirst />

            <SecondLanding />
            <Devs />
            <ContentSecond2 />

            {/* {/*  */}


            {/*  */}
            {/* <ContentSecond /> */}

            {/* <ContentThird /> */}


        </div>
    );
};

export default Hero;