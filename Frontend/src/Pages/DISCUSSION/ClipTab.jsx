import { motion } from "framer-motion";
import React from "react";

import {
    Image,
    Music,
    FileCode2,
} from "lucide-react";


const ClipTab = ({ replyHandeler }) => {
    const buttons = [
        {
            title: "Photo or Video",
            icon: <Image />,
        },
        {
            title: "Audio",
            icon: <Music />,
        },
        {
            title: "Code File",
            icon: <FileCode2 />,
        },
    ];

    return (
        <motion.div


            animate={{

                opacity: [0, 1],
                scale: 1
            }}
            transition={{ duration: 0.3 }}
            className={`absolute ${replyHandeler?.isOpen ? "bottom-[155px]" : "bottom-[60px]"}   right-[1030px] z-30 p-2 w-[180px]  rounded-3xl bg-[#212121]   shadow-xl `}>
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