import { motion } from "framer-motion";
import React, { useState } from "react";




const ChatClickedTab = ({ setChatTab, chatTab, selectedChatUser }) => {



    const buttons = [
        {
            id: "open-tab",
            title: "Open in New Tab",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="1.4em" height="1.4em" viewBox="0 0 24 24">
                    <g fill="none" stroke="#fff" strokeWidth={1.5}>
                        <path d="M2 19V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2Z"></path>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2 7h20M9 14h3m3 0h-3m0 0v-3m0 3v3"></path>
                    </g>
                </svg>

            ),
            danger: false,
        },
        {
            id: "quick-preview",
            title: "Quick Preview",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="1.4em" height="1.4em" viewBox="0 0 24 24">
                    <path fill="#fff" d="M12 9a3 3 0 0 1 3 3a3 3 0 0 1-3 3a3 3 0 0 1-3-3a3 3 0 0 1 3-3m0-4.5c5 0 9.27 3.11 11 7.5c-1.73 4.39-6 7.5-11 7.5S2.73 16.39 1 12c1.73-4.39 6-7.5 11-7.5M3.18 12a9.821 9.821 0 0 0 17.64 0a9.821 9.821 0 0 0-17.64 0"></path>
                </svg>
            ),
            danger: false,
        },
        {
            id: "add-folder",
            title: "Add to Folder",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="1.4em" height="1.4em" viewBox="0 0 24 24">
                    <path fill="#fff" d="M4 20q-.825 0-1.412-.587T2 18V6q0-.825.588-1.412T4 4h6l2 2h8q.825 0 1.413.588T22 8v10q0 .825-.587 1.413T20 20z"></path>
                </svg>
            ),
            danger: false,
        },
        {
            id: "mark-read",
            title: "Mark as Read",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="1.4em" height="1.4em" viewBox="0 0 16 16">
                    <path fill="#fff" d="M15 5.5a4.5 4.5 0 1 1-9 0a4.5 4.5 0 0 1 9 0m-2.146-1.854a.5.5 0 0 0-.708 0L9.5 6.293l-.646-.647a.5.5 0 1 0-.708.708l1 1a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0 0-.708M10.5 11c.9 0 1.75-.216 2.5-.6V13a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8.337l5.763 3.103a.5.5 0 0 0 .474 0l1.411-.76c.579.207 1.202.32 1.852.32M3 5h2.022a5.5 5.5 0 0 0 2.522 5.14L7 10.431l-6-3.23V7a2 2 0 0 1 2-2"></path>
                </svg>
            ),
            danger: false,
        },
        {
            id: "pin-top",
            title: "Pin to Top",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="1.4em" height="1.4em" viewBox="0 0 24 24">
                    <path fill="#fff" d="M16 12V4h1V2H7v2h1v8l-2 2v2h5.2v6h1.6v-6H18v-2z"></path>
                </svg>
            ),
            danger: false,
        },
        {
            id: "unmute",
            title: "Unmute",
            icon: (
                true ?
                    (
                        <svg xmlns="http://www.w3.org/2000/svg" width="1.4em" height="1.4em" viewBox="0 0 12 12" >
                            <path fill="#fff" d="M6 10.77c-.26 0-.52-.11-.72-.3L2.79 8H1c-.55 0-1-.45-1-1V5c0-.55.45-1 1-1h1.79l2.49-2.47a1 1 0 0 1 1.1-.22c.37.15.62.51.62.92v7.53a1.016 1.016 0 0 1-1 1.01"></path>
                            <path fill="none" stroke="#fff" strokeLinecap="round" d="M8.76 7.3c.46-.33.74-.79.74-1.3s-.28-.97-.73-1.3m1.59 4.12C11.07 8.09 11.5 7.1 11.5 6c0-1.12-.45-2.13-1.18-2.86"></path>
                        </svg >
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="1.4em" height="1.4em" viewBox="0 0 24 24">
                            <path fill="#fff" d="M12 4L9.91 6.09L12 8.18M4.27 3L3 4.27L7.73 9H3v6h4l5 5v-6.73l4.25 4.26c-.67.51-1.42.93-2.25 1.17v2.07c1.38-.32 2.63-.95 3.68-1.81L19.73 21L21 19.73l-9-9M19 12c0 .94-.2 1.82-.54 2.64l1.51 1.51A8.9 8.9 0 0 0 21 12c0-4.28-3-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71m-2.5 0c0-1.77-1-3.29-2.5-4.03v2.21l2.45 2.45c.05-.2.05-.42.05-.63"></path>
                        </svg>
                    )
            ),
            danger: false,
        },
        {
            id: "archive",
            title: "Archive",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="1.4em" height="1.4em" viewBox="0 0 24 24">
                    <path fill="#fff" d="m12 18l4-4l-1.4-1.4l-1.6 1.6V10h-2v4.2l-1.6-1.6L8 14zm-7 3q-.825 0-1.412-.587T3 19V6.525q0-.35.113-.675t.337-.6L4.7 3.725q.275-.35.687-.538T6.25 3h11.5q.45 0 .863.188t.687.537l1.25 1.525q.225.275.338.6t.112.675V19q0 .825-.587 1.413T19 21zm.4-15h13.2l-.85-1H6.25z"></path>
                </svg>
            ),
            danger: false,
        },
        {
            id: "delete-chat",
            title: "Delete Chat",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="1.4em" height="1.4em" viewBox="0 0 24 24">
                    <path fill="#ff4343ff" d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6zM19 4h-3.5l-1-1h-5l-1 1H5v2h14z"></path>
                </svg>
            ),
            danger: true,
        },
    ];




    return (
        <motion.div


            animate={{

                opacity: [0, 1],
                scale: 1
            }}
            transition={{ duration: 0.3 }}
            className=" z-50 p-2 w-[200px] rounded-3xl bg-white/20 text-white backdrop-blur-xl  shadow-xl overflow-hidden">
            {buttons.map((item, idx) => (

                <>
                    <button
                        key={idx}

                        className="relative z-30 flex items-center gap-2 w-full rounded-3xl px-3 py-2 text-white hover:bg-white/20 transition-all duration-200  "
                    >
                        <span className="text-sm ">






                            {item.icon}

                        </span>
                        <span className="text-sm font-medium">{item.title}</span>
                    </button>



                </>
            ))
            }
        </motion.div >
    );
};

export default ChatClickedTab;