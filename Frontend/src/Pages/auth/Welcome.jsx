import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
    const [visible, setVisible] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fadeIn = setTimeout(() => {
            setVisible(true);
        }, 100);

        const fadeOut = setTimeout(() => {
            setVisible(false);
        }, 3500);

        const redirect = setTimeout(() => {
            navigate("/app");
        }, 4500);

        return () => {
            clearTimeout(fadeIn);
            clearTimeout(fadeOut);
            clearTimeout(redirect);
        };
    }, [navigate]);

    return (
        <div
            className={`fixed inset-0 bg-black flex items-center justify-center transition-opacity duration-1000 ease-in-out ${visible ? "opacity-100" : "opacity-0"
                }`}
        >
            <div className="text-center space-y-6">
                <h1 className="text-5xl md:text-7xl font-bold text-white tracking-wide">
                    Welcome to
                </h1>

                <h2 className="text-6xl md:text-8xl font-extrabold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                    CodeSarthi
                </h2>

                <p className="text-gray-400 text-lg animate-pulse">
                    Connecting Developers. Building the Future.
                </p>
            </div>
        </div>
    );
};

export default Welcome;