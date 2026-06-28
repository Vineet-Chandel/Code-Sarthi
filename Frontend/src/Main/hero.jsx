


import { useState, useEffect } from "react";

import Preloader from "./preloader";
import Footer from "./Footer";
import ContentFirst from "./ContentFirst";
import ContentSecond from "./ContentSecond";
import ContentThird from "./ContentThird";

import Devs from "./Devs";
import Main2 from "./Main2";
import Lines2 from "./Lines2";
import SecondLanding from "./SecondLanding";
import { useNavigate } from "react-router-dom";
import BASE_URL from "@/Pages/auth/baseURL";
import axios from "axios";
import ContentSecond2 from "./ContentSecond2";
import Third from "./Third";



const Hero = () => {

    const [ctaData, seCtaData] = useState("Sign Up")
    const navigate = useNavigate();
    useEffect(() => {
        const controller = new AbortController();

        const checkAuth = async () => {
            try {
                const res = await axios.get(
                    `${BASE_URL}/profile/me`,
                    {
                        withCredentials: true,
                        signal: controller.signal,
                    }
                );

                if (res.data.success) {
                    seCtaData("Open Codesarthi");
                }
            } catch (err) { }
        };

        checkAuth();

        return () => controller.abort();
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

            <Main2 ctaData={ctaData} />

            <ContentFirst />

            <SecondLanding />
            <Third />
            <Lines2 />
            <ContentSecond2 />



            <div className="relative">

                <div
                    className="
absolute
inset-0
bg-[linear-gradient(rgba(255,255,255,.09)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.09)_1px,transparent_1px)]
bg-[size:90px_90px]
"
                />

                <Devs />
                <Footer />
            </div>






            {/*  */}
            {/* <ContentSecond /> */}

            {/* <ContentThird /> */}


        </div>
    );
};

export default Hero;