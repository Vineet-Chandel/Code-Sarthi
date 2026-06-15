


import { useState, useEffect } from "react";

import Preloader from "./preloader";
import Footer from "./Footer";
import ContentFirst from "./ContentFirst";
import ContentSecond from "./ContentSecond";
import ContentThird from "./ContentThird";
import Mainhero from "./main-hero";
import Devs from "./Devs";
import Main2 from "./Main2";
import Lines from "./Lines";
import SecondLanding from "./SecondLanding";
import ContentFirst2 from "./ContentFirst2";


const Hero = () => {
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
        <div>
            {loading && <Preloader />}

            <Main2 />




            {/* <Mainhero /> */}
            <ContentFirst2 />

            <SecondLanding />
            {/* <ContentFirst />

       
            <Devs />
            <ContentSecond />

            <ContentThird /> */}


        </div>
    );
};

export default Hero;