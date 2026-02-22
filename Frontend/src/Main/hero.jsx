
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Mainhero from "./main-hero";
import Nav from "./nav";
import { useState } from "react";
import Preloader from "./preloader";
import Footer from "./Footer";
import ContentFirst from "./ContentFirst";
import ContentSecond from "./ContentSecond";
import ContentThird from "./ContentThird";
const Hero = () => {
    const [loading, setLoading] = useState(true)
    setInterval(() => {
        setLoading(false);
    }, 5000);
    return (
        <div>
            {loading && <Preloader loading />}
            <Nav />
            <Mainhero />
            <ContentFirst />
            <ContentSecond />
            <ContentThird />
            <Footer />
        </div>
    )

};

export default Hero;
