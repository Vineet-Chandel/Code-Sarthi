import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react'
import MsgClickedTab from './MsgClickedTab';
import { useRef } from "react";
import axios from 'axios';
import BASE_URL from '../auth/baseURL';
import { useSelector } from 'react-redux';





const MessageArea = ({ selectedChatUser, setReplyHandeler, replyHandeler, setlastMsgStatus, lastMsgStatus }) => {
    const user = useSelector(state => state?.user?.user?.DATA);
    const allMessages = useSelector(state => state.messages);
    const [readMore, setReadMore] = useState({
        idx: null,
        isOpen: false,
    });
    const [messageTab, setMessageTab] = useState({
        isOpen: false,
        idx: null,
        x: 0,
        y: 0,
        setMsg: ""
    });

    useEffect(() => { console.log(readMore) }, [readMore])
    const chatRef = useRef(null);
    useEffect(() => {
        const chat = chatRef.current;

        if (!chat) return;

        const handleScroll = () => {
            setMessageTab(prev => ({
                ...prev,
                isOpen: false,
                idx: null
            }));
        };
        chat.addEventListener("scroll", handleScroll);

        return () => {
            chat.removeEventListener("scroll", handleScroll);
        };

    }, []);


    const messages = allMessages?.messages?.[selectedChatUser?.convoId];
    useEffect(() => {
        console.log(messages)

        if (chatRef.current) {
            chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }

        if (messages?.length) {
            const last = messages[messages?.length - 1];
            setlastMsgStatus({
                lastMsg: last.content,
                lastMsgTime: last.createdAt,
                msgId: last._id,
                convoId: selectedChatUser?.convoId
            })

            console.log(selectedChatUser.fullChatInfo?._id)
            console.log(lastMsgStatus?.convoId)
        }
    }, [messages]);



    return (
        <div className='relative z-10 text-white  h-full w-full flex flex-col justify-end items-end '>
            {/* Top */}


            {messageTab.isOpen && (
                <div
                    className="fixed z-50"
                    style={{
                        ...(messageTab.setMsg?.sender_id === user._id
                            ? { left: `${messageTab.x - 220}px` } // your message
                            : { left: `${messageTab.x}px` }),     // other user's message
                        top: `${messageTab.y}px`,
                    }}
                >
                    <MsgClickedTab msg={messageTab.setMsg.content} setMessageTab={setMessageTab} messageTab={messageTab} setReplyHandeler={setReplyHandeler} replyHandeler={replyHandeler} selectedChatUser={selectedChatUser} />
                </div>
            )
            }
            <div className="pointer-events-none absolute top-0 left-0 right-0 h-20 z-20 bg-gradient-to-b from-black/30 via-black/10 to-transparent dark:from-black/60 dark:via-black/20" />

            <div
                ref={chatRef}
                onClick={() => setMessageTab(prev => ({
                    ...prev,
                    isOpen: false,
                    idx: null
                }))}

                className='h-full  w-full flex flex-col   overflow-y-auto scrollbar-none '>

                {messages ? messages.map((items, idx) => {

                    const expanded = readMore.idx === idx && readMore.isOpen;

                    const displayText =
                        items?.content?.length > 500
                            ? expanded
                                ? items?.content
                                : items?.content?.slice(0, 500) + "..."
                            : items?.content;



                    const prev = messages[idx - 1];
                    const next = messages[idx + 1];
                    const currentId = String(items.sender_id);
                    const prevId = prev ? String(prev.sender_id) : null;
                    const nextId = next ? String(next.sender_id) : null;

                    const isSameAsPrev = currentId === prevId;
                    const isSameAsNext = currentId === nextId;

                    const isSingle = !isSameAsPrev && !isSameAsNext;
                    const isFirst = !isSameAsPrev && isSameAsNext;
                    const isMiddle = isSameAsPrev && isSameAsNext;
                    const isLast = isSameAsPrev && !isSameAsNext;

                    const marginClass =
                        isSingle || isFirst
                            ? "mt-4"
                            : "mt-0.5";
                    const SingleClassName =
                        "rounded-2xl";
                    const FirstClassName =
                        "rounded-2xl rounded-bl-md"
                    const MiddleClassName =
                        "rounded-2xl rounded-tl-md rounded-bl-md";

                    const LastClassName =
                        "rounded-2xl rounded-tl-md";


                    const singleClass =
                        "rounded-2xl";

                    const firstClass =
                        "rounded-2xl rounded-br-md";
                    const middleClass =
                        "rounded-2xl rounded-tr-md rounded-br-md";
                    const lastClass =
                        "rounded-2xl rounded-tr-md";


                    return (

                        <div key={items?._id} className='relative '>

                            {(!prev ||
                                new Date(prev.updatedAt).toDateString() !==
                                new Date(items.updatedAt).toDateString()) && (
                                    <div className="my-10 sm:my-20  flex justify-center text-xs font-poppins text-white/60 items-center bg-[#242424]  w-fit mx-auto px-2 py-1 rounded-lg">
                                        {new Date(items.updatedAt).toLocaleDateString(
                                            "en-US",
                                            new Date(items.updatedAt).getFullYear() === new Date().getFullYear()
                                                ? {
                                                    day: "numeric",
                                                    month: "long",
                                                }
                                                : {
                                                    day: "numeric",
                                                    month: "long",
                                                    year: "numeric",
                                                }
                                        )}
                                    </div>
                                )}
                            {items?.sender_id !== user?._id ? (
                                <div
                                    onContextMenu={(e) => {
                                        e.preventDefault();


                                        setMessageTab({
                                            isOpen: true,
                                            idx: idx,
                                            x: e.clientX,
                                            y: e.clientY,
                                            setMsg: items
                                        });
                                    }}
                                    className={`${messageTab.idx == idx ? "bg-white/5 absolute w-full inset-0" : "bg-transparent"} transition-all duration-300 w-full flex items-center  justify-start   ${marginClass}  relative`}>


                                    <motion.div
                                        layout
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0 }}

                                        className={` text-sm sm:text-md lg:text-xl max-w-[80%]
md:max-w-[65%]
xl:max-w-[55%] break-words [overflow-wrap:anywhere] whitespace-pre-wrap overflow-hidden [overflow-wrap:anywhere] flex  font-poppins  ${items?.content?.length > 40 ? "flex-col items-start gap-2" : "items-end gap-3 flex-row "} min-w-[10%] bg-[#242424]  px-3 py-1.5 ${isSingle ? SingleClassName : isFirst ? FirstClassName : isMiddle ? MiddleClassName : isLast ? LastClassName : ""}`}>

                                        {displayText?.replace(/\t/g, "    ")}


                                        <span className="  text-xs font-mono text-gray-400">{new Date(items?.updatedAt).toLocaleTimeString("en-US", {
                                            hour: "numeric",
                                            minute: "2-digit",
                                            hour12: true,
                                        })}</span>


                                        {items?.content?.length > 500 && < div onClick={() => {
                                            if (readMore.idx === idx) {
                                                setReadMore({
                                                    idx: null,
                                                    isOpen: false,
                                                });
                                            } else {
                                                setReadMore({
                                                    idx: idx,
                                                    isOpen: true,
                                                });
                                            }
                                        }} className='w-full flex items-center justify-center '>


                                            {<svg className={`cursor-pointer hover:bg-white/20 p-1 rounded-full transition-all duration-300 ${readMore.idx === idx && readMore.isOpen ? "" : "rotate-180"
                                                }`} width="35" height="35" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M18 15L12 9L6 15" stroke="#aeacacff" strokeWidth="2" />
                                            </svg>}
                                        </div>}
                                    </motion.div>



                                </div>
                            ) : (

                                <div
                                    onContextMenu={(e) => {
                                        e.preventDefault();


                                        setMessageTab({
                                            isOpen: true,
                                            idx: idx,
                                            x: e.clientX,
                                            y: e.clientY,
                                            setMsg: items
                                        });
                                    }}
                                    className={`w-full flex items-center justify-end   ${marginClass}  relative`}>

                                    <motion.div
                                        layout
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0 }}


                                        className={` text-sm sm:text-md lg:text-xl max-w-[80%]
md:max-w-[65%]
xl:max-w-[55%] break-words [overflow-wrap:anywhere]   whitespace-pre-wrap overflow-hidden [overflow-wrap:anywhere] flex  font-poppins   ${items?.content?.length > 40 ? "flex-col items-start gap-2" : " gap-3 flex-col items-start"} bg-white text-black px-3 py-1.5    ${isSingle ? singleClass : isFirst ? firstClass : isMiddle ? middleClass : isLast ? lastClass : ""}`}>


                                        {displayText?.replace(/\t/g, "    ")}

                                        <span className="text-xs font-mono pl-1 flex w-full justify-between text-gray-700">

                                            <span className="mr-3">{new Date(items?.updatedAt).toLocaleTimeString("en-US", {
                                                hour: "numeric",
                                                minute: "2-digit",
                                                hour12: true,
                                            })}</span>


                                            <span>{items?.status === "sent" ? (<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                                                <path fill="#000" d="M.41 13.41L6 19l1.41-1.42L1.83 12m20.41-6.42L11.66 16.17L7.5 12l-1.43 1.41L11.66 19l12-12M18 7l-1.41-1.42l-6.35 6.35l1.42 1.41z"></path>
                                            </svg>) : (items?.status === "sending" ? (<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16">
                                                <polyline fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} points="2.75 8.75 6.25 12.25 13.25 4.75"></polyline>
                                            </svg>) : (items?.status === "error" ? (<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                                                <path fill="#000" d="M12.713 16.713Q13 16.425 13 16t-.288-.712T12 15t-.712.288T11 16t.288.713T12 17t.713-.288m0-4Q13 12.425 13 12V8q0-.425-.288-.712T12 7t-.712.288T11 8v4q0 .425.288.713T12 13t.713-.288M12 22q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"></path>
                                            </svg>) : (<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16">
                                                <path fill="#000" d="M8 9.5a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3"></path>
                                            </svg>)))}

                                            </span>



                                        </span>

                                        {items?.content?.length > 500 && < div onClick={() => {
                                            if (readMore.idx === idx) {
                                                setReadMore({
                                                    idx: null,
                                                    isOpen: false,
                                                });
                                            } else {
                                                setReadMore({
                                                    idx: idx,
                                                    isOpen: true,
                                                });
                                            }
                                        }} className='w-full flex items-center justify-center '>


                                            {<svg className={`cursor-pointer hover:bg-black/10 p-1 rounded-full transition-all duration-300 ${readMore.idx === idx && readMore.isOpen ? "" : "rotate-180"
                                                }`} width="35" height="35" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M18 15L12 9L6 15" stroke="#7f7c7cff" strokeWidth="2" />
                                            </svg>}
                                        </div>}
                                    </motion.div>

                                </div>
                            )
                            }


                        </div>

                    )
                })
                    : (


                        <div className="h-full w-full flex flex-col justify-end overflow-y-auto p-4 space-y-4 animate-pulse">
                            {/* Left Message */}
                            <div className="flex justify-start overflow-y-auto">
                                <div className="flex items-end  gap-2 max-w-[75%]">
                                    <div className="w-8 h-8 rounded-full bg-gray-300"></div>

                                    <div className="space-y-2">
                                        <div className="h-4 w-20 rounded-full bg-gray-300"></div>
                                        <div className="h-10 w-56 rounded-2xl rounded-bl-md bg-gray-300"></div>
                                        <div className="h-3 w-12 rounded-full bg-gray-300"></div>
                                        <div className="h-4 w-20 rounded-full bg-gray-300"></div>
                                        <div className="h-10 w-56 rounded-2xl rounded-bl-md bg-gray-300"></div>
                                        <div className="h-3 w-12 rounded-full bg-gray-300"></div>


                                        <div className="h-4 w-20 rounded-full bg-gray-300"></div>
                                        <div className="h-10 w-56 rounded-2xl rounded-bl-md bg-gray-300"></div>
                                        <div className="h-3 w-12 rounded-full bg-gray-300"></div>
                                        <div className="h-4 w-20 rounded-full bg-gray-300"></div>
                                        <div className="h-10 w-56 rounded-2xl rounded-bl-md bg-gray-300"></div>
                                        <div className="h-3 w-12 rounded-full bg-gray-300"></div>

                                    </div>
                                </div>
                            </div>

                            {/* Right Message */}
                            <div className="flex justify-end">
                                <div className="space-y-2 flex flex-col items-end max-w-[75%]">
                                    <div className="h-10 w-44 rounded-2xl rounded-br-md bg-gray-300"></div>
                                    <div className="h-3 w-12 rounded-full bg-gray-300"></div>
                                    <div className="h-10 w-44 rounded-2xl rounded-br-md bg-gray-300"></div>
                                    <div className="h-3 w-12 rounded-full bg-gray-300"></div>
                                    <div className="h-10 w-44 rounded-2xl rounded-br-md bg-gray-300"></div>
                                    <div className="h-3 w-12 rounded-full bg-gray-300"></div>
                                    <div className="h-10 w-44 rounded-2xl rounded-br-md bg-gray-300"></div>
                                    <div className="h-3 w-12 rounded-full bg-gray-300"></div>
                                </div>
                            </div>

                            {/* Left Message */}
                            <div className="flex justify-start">
                                <div className="flex items-end gap-2 max-w-[75%]">
                                    <div className="w-8 h-8 rounded-full bg-gray-300"></div>

                                    <div className="space-y-2">
                                        <div className="h-10 w-72 rounded-2xl rounded-bl-md bg-gray-300"></div>
                                        <div className="h-10 w-48 rounded-2xl rounded-bl-md bg-gray-300"></div>
                                        <div className="h-3 w-10 rounded-full bg-gray-300"></div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Message */}
                            <div className="flex justify-end">
                                <div className="space-y-2 flex flex-col items-end max-w-[75%]">
                                    <div className="h-10 w-64 rounded-2xl rounded-br-md bg-gray-300"></div>
                                    <div className="h-3 w-12 rounded-full bg-gray-300"></div>
                                </div>
                            </div>

                            {/* Left Message */}
                            <div className="flex justify-start">
                                <div className="flex items-end gap-2 max-w-[75%]">
                                    <div className="w-8 h-8 rounded-full bg-gray-300"></div>

                                    <div className="space-y-2">
                                        <div className="h-10 w-40 rounded-2xl rounded-bl-md bg-gray-300"></div>
                                        <div className="h-3 w-14 rounded-full bg-gray-300"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )


                }
            </div>



        </div >
    )
}

export default MessageArea