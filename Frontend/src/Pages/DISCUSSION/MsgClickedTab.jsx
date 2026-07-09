import { motion } from "framer-motion";
import React, { useState } from "react";




const MsgClickedTab = ({ msg, setMessageTab, messageTab, setReplyHandeler, replyHandeler, selectedChatUser }) => {

    const [isCopied, setIsCopied] = useState({
        isCopied: false,
        idx: null
    })
    const buttons = [
        {
            title: "Reply",
            icon: (<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                <path fill="#fff" d="M10 9V7.41c0-.89-1.08-1.34-1.71-.71L3.7 11.29a.996.996 0 0 0 0 1.41l4.59 4.59c.63.63 1.71.19 1.71-.7V14.9c5 0 8.5 1.6 11 5.1c-1-5-4-10-11-11"></path>
            </svg>),
        },
        {
            title: "Copy Text",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                    <g fill="none" stroke="#fff" strokeWidth={1.5}>
                        <path d="M6 11c0-2.828 0-4.243.879-5.121C7.757 5 9.172 5 12 5h3c2.828 0 4.243 0 5.121.879C21 6.757 21 8.172 21 11v5c0 2.828 0 4.243-.879 5.121C19.243 22 17.828 22 15 22h-3c-2.828 0-4.243 0-5.121-.879C6 20.243 6 18.828 6 16z"></path>
                        <path d="M6 19a3 3 0 0 1-3-3v-6c0-3.771 0-5.657 1.172-6.828S7.229 2 11 2h4a3 3 0 0 1 3 3"></path>
                    </g>
                </svg>
            )


        },
        {
            title: "Forward",
            icon: (<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                <path fill="#fff" d="m16 17l-1.425-1.4l4.6-4.6l-4.6-4.6L16 5l6 6zM2 19v-4q0-2.075 1.463-3.537T7 10h6.175l-3.6-3.6L11 5l6 6l-6 6l-1.425-1.4l3.6-3.6H7q-1.25 0-2.125.875T4 15v4z"></path>
            </svg>),
        },
        {
            title: "Delete",
            icon: (<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                <path fill="#fff" d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6zM19 4h-3.5l-1-1h-5l-1 1H5v2h14z"></path>
            </svg>),
        },
        {
            title: "edited 7, May 2026 at 6:50 PM",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                    <path fill="#fff" d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75zM20.71 7.04a.996.996 0 0 0 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83l3.75 3.75z"></path>
                </svg>),
        },
    ];
    const handleCopy = async (text, idx) => {
        try {
            setIsCopied({
                isCopied: true,
                idx: idx
            });
            await navigator.clipboard.writeText(text);

        } catch (err) {
            addToast({
                type: "error",
                title: "Error",
                message:
                    err?.response?.data?.message ||
                    err?.message ||
                    "Something went wrong"
            });
        }
    };



    return (
        <motion.div


            animate={{

                opacity: [0, 1],
                scale: 1
            }}
            transition={{ duration: 0.3 }}
            className=" z-50 p-2 w-[170px] rounded-3xl bg-[#212121] backdrop-blur-xl  shadow-xl overflow-hidden">
            {buttons.map((item, idx) => (

                <>
                    <button
                        key={idx}

                        onClick={() => {

                            if (idx === 0) {

                                console.log(msg)
                                setReplyHandeler({
                                    isOpen: true,
                                    senderId: selectedChatUser?.info?.firstName + " " + selectedChatUser?.info?.lastName,
                                    msg: msg
                                })
                                setMessageTab(prev => ({
                                    ...prev,
                                    isOpen: false,
                                    idx: null
                                }));

                            }
                            if (idx === 1) {
                                handleCopy(msg, idx);
                                console.log("clicked");

                                setMessageTab(prev => ({
                                    ...prev,
                                    isOpen: false,
                                    idx: null
                                }));


                            }
                        }}
                        className="relative z-30 flex items-center gap-2 w-full rounded-3xl px-3 py-2 text-white hover:bg-white/20 transition-all duration-200  "
                    >
                        <span className="text-sm ">






                            {item.icon}

                        </span>
                        <span className="text-sm font-medium">{item.title}</span>
                    </button>

                    {idx === buttons.length - 2 && (
                        <div className="w-full h-[1px] bg-white/20 my-1" ></div>
                    )}
                    {idx === buttons.length - 1 && (
                        <div className="w-full h-[1px] bg-white/20 my-1" ></div>
                    )}

                </>
            ))
            }
        </motion.div >
    );
};

export default MsgClickedTab;