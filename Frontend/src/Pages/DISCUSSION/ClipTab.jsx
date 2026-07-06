import { motion } from "framer-motion";
import React from "react";
import {
    FaImage,
    FaMusic,
    FaFileCode,
} from "react-icons/fa";



const ClipTab = () => {
    const buttons = [
        {
            title: "Photo or Video",
            icon: <FaImage />,
        },
        {
            title: "Audio",
            icon: <FaMusic />,
        },
        {
            title: "Code File",
            icon: <FaFileCode />,
        },
    ];

    return (
        <motion.div


            animate={{

                opacity: [0, 1],
                scale: 1
            }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-[80px] right-[1040px] z-50 p-2 w-[170px] rounded-3xl bg-[#212121] backdrop-blur-xl  shadow-xl overflow-hidden">
            {buttons.map((item, idx) => (
                <button
                    key={idx}
                    className="flex items-center gap-2 w-full rounded-3xl px-3 py-2 text-white hover:bg-white/20 transition-all duration-200"
                >
                    <span className="text-sm">{item.icon}</span>
                    <span className="text-sm font-medium">{item.title}</span>
                </button>
            ))}
        </motion.div>
    );
};

export default ClipTab;