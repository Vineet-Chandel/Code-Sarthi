
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Mainhero from "./main-hero";
import Nav from "./nav";
import { useState } from "react";

import Preloader from "./preloader";
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
        </div>
    )

};

export default Hero;
