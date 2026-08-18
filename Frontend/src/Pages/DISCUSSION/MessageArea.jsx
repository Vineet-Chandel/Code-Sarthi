import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react'
import MsgClickedTab from './MsgClickedTab';
import { useRef } from "react";
import axios from 'axios';
import BASE_URL from '../auth/baseURL';
import { useSelector } from 'react-redux';
import { useTeamChat } from './TeamChatContext';


const MessageArea = ({ newConvoFinded, subLoading, forwardTabOpen, setForwardTabOpen, selectedChatUser, setReplyHandeler, replyHandeler, setlastMsgStatus, lastMsgStatus, messageTab, setMessageTab, handelSend }) => {
    const user = useSelector(state => state?.user?.user?.DATA);
    const allMessages = useSelector(state => state.messages);
    const { activeTeamId, activeConversationId, teamWorkspace } = useTeamChat();
    const [readMore, setReadMore] = useState({
        idx: null,
        isOpen: false,
    });



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


    const convoId = activeTeamId ? activeConversationId : selectedChatUser?.convoId;
    const messages = allMessages?.messages?.[convoId];



    useEffect(() => {


        if (chatRef.current) {
            chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }

        if (messages?.length) {
            const last = messages[messages?.length - 1];
            setlastMsgStatus({
                lastMsg: last.content,
                lastMsgTime: last.createdAt,
                msgId: last._id,
                convoId: convoId
            })


        }
    }, [messages]);





    return (
        <div className='relative z-10 text-white  h-full w-full flex flex-col justify-end items-end '>

            {messageTab?.isOpen && (
                <div
                    className="fixed z-50 "
                    style={{
                        ...(messageTab?.setMsg?.sender_id === user._id
                            ? { left: `${messageTab?.x - 220}px` } // your message
                            : { left: `${messageTab?.x}px` }),     // other user's message
                        top: `${messageTab?.y}px`,
                    }}
                >


                    <MsgClickedTab setForwardTabOpen={setForwardTabOpen} senderId={messageTab?.setMsg?.sender_id} msg={messageTab?.setMsg?.content} setMessageTab={setMessageTab} messageTab={messageTab} setReplyHandeler={setReplyHandeler} replyHandeler={replyHandeler} selectedChatUser={selectedChatUser} />
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

                {messages ?
                    messages.map((items, idx) => {

                        const expanded = readMore.idx === idx && readMore.isOpen;

                        let isGitHubNotification = false;
                        let notificationData = null;
                        if (items?.content && items.content.startsWith('[GITHUB_NOTIFICATION]:')) {
                            isGitHubNotification = true;
                            try {
                                notificationData = JSON.parse(items.content.substring('[GITHUB_NOTIFICATION]:'.length));
                            } catch (e) {
                                console.error("Failed to parse GitHub notification data", e);
                            }
                        }

                        if (isGitHubNotification) {
                            return (
                                <div key={items?._id} className="w-full flex justify-center my-4 font-poppins px-4">
                                    <div className="w-full max-w-md bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/30 rounded-2xl p-4 shadow-xl backdrop-blur-sm flex items-start gap-4">
                                        <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
                                            <svg className="w-5 h-5 animate-bounce" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                                            </svg>
                                        </div>
                                        <div className="flex-1 space-y-2">
                                            <div className="flex items-center justify-between">
                                                <span className="text-[9px] font-black uppercase tracking-wider text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-full border border-amber-400/20">GitHub Integration Request</span>
                                                <span className="text-[9px] text-zinc-500 font-mono">
                                                    {new Date(items.createdAt).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true })}
                                                </span>
                                            </div>
                                            <p className="text-xs font-medium text-zinc-300 leading-relaxed">
                                                <span className="text-white font-bold">{notificationData?.senderName || "A team member"}</span> requested the team leader to connect the project <span className="text-amber-300 font-bold">"{notificationData?.projectName || "Untitled"}"</span> with a GitHub repository to enable issue tracking.
                                            </p>
                                            <div className="bg-[#000000] border border-white/[0.05] rounded-lg px-2.5 py-1.5 flex items-center justify-between text-[10px] text-zinc-500 font-mono">
                                                <span className="truncate">ID: {notificationData?.projectId}</span>
                                                <button 
                                                    onClick={() => navigator.clipboard.writeText(notificationData?.projectId)}
                                                    className="hover:text-white transition-colors"
                                                    type="button"
                                                >
                                                    Copy
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        }

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

                        const getSenderId = (sender) => {
                            if (!sender) return null;

                            if (typeof sender === "object") {
                                return String(sender._id ?? sender.id);
                            }

                            return String(sender);
                        };
                        return (

                            <div key={items?._id} className='relative '>

                                {(!prev ||
                                    new Date(prev.updatedAt).toDateString() !==
                                    new Date(items.updatedAt).toDateString()) && (
                                        <div className="my-7 sm:my-15  flex justify-center text-xs font-poppins text-white/60 items-center bg-[#242424]  w-fit mx-auto px-2 py-1 rounded-lg">
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
                                {getSenderId(items.sender_id) !== String(user?._id) ? (
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
                                        className={`${messageTab.idx == idx ? "bg-white/5 absolute w-full inset-0 rounded-2xl" : "bg-transparent"} transition-all duration-300 w-full flex items-center  justify-start   ${marginClass}  relative`}>


                                        <motion.div
                                            layout
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0 }}

                                            className={` text-sm sm:text-md lg:text-xl max-w-[80%]
md:max-w-[65%]
xl:max-w-[55%]  break-words [overflow-wrap:anywhere] whitespace-pre-wrap overflow-hidden [overflow-wrap:anywhere] flex  font-poppins  flex-col gap-3 items-end min-w-[10%] bg-[#242424]  px-3 py-1.5 ${isSingle ? SingleClassName : isFirst ? FirstClassName : isMiddle ? MiddleClassName : isLast ? LastClassName : ""}`}>
                                            {items.replyTo && (


                                                <div
                                                    className="w-full  mb-1 mt-4 rounded-xl border-l-4 border-blue-500 bg-black/80  px-3 py-2 cursor-pointer   transition-all duration-200"
                                                    onClick={() => {
                                                        // Scroll to original message
                                                        document
                                                            .getElementById(`message-${items.replyTo?.messageId}`)
                                                            ?.scrollIntoView({
                                                                behavior: "smooth",
                                                                block: "center",
                                                            });
                                                    }}
                                                >
                                                    <div className="flex items-start gap-3">
                                                        {/* Reply Indicator */}
                                                        <div className="flex-shrink-0 mt-1">
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                width="18"
                                                                height="18"
                                                                viewBox="0 0 24 24"
                                                                fill="none"
                                                            >
                                                                <path
                                                                    d="M10 9L5 12L10 15"
                                                                    stroke="#fff"
                                                                    strokeWidth="2"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                />
                                                                <path
                                                                    d="M5 12H15C18.3137 12 21 14.6863 21 18V19"
                                                                    stroke="#fff"
                                                                    strokeWidth="2"
                                                                    strokeLinecap="round"
                                                                />
                                                            </svg>
                                                        </div>

                                                        {/* Preview */}
                                                        <div className="flex-1 overflow-hidden">
                                                            <p className="text-lg font-semibold text-white truncate">
                                                                {items.replyTo?.userId === user._id
                                                                    ? "You"
                                                                    : activeTeamId
                                                                        ? (teamWorkspace?.members?.find(m => String(m._id) === String(items.replyTo?.userId))
                                                                            ? `${teamWorkspace?.members?.find(m => String(m._id) === String(items.replyTo?.userId))?.firstName} ${teamWorkspace?.members?.find(m => String(m._id) === String(items.replyTo?.userId))?.lastName}`
                                                                            : "Team Member")
                                                                        : selectedChatUser?.info?.firstName + " " + selectedChatUser?.info?.lastName || "Unknown User"}
                                                            </p>

                                                            <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 break-words">
                                                                {items.replyTo?.content}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            <div className={`flex w-full justify-between gap-2 ${items?.content?.length > 40 ? "flex-col items-end gap-3" : "items-end gap-3 flex-col "}`}>
                                                <span className='w-full'>
                                                    {displayText?.replace(/\t/g, "    ")}
                                                </span>



                                                <span className="  text-xs font-mono text-gray-400">{new Date(items?.updatedAt).toLocaleTimeString("en-US", {
                                                    hour: "numeric",
                                                    minute: "2-digit",
                                                    hour12: true,
                                                })}</span>
                                            </div>



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
                                        className={` ${messageTab.idx == idx ? "bg-white/5 absolute w-full inset-0 rounded-2xl" : "bg-transparent"} w-full flex flex-col items-end justify-end   ${marginClass}  relative`}>

                                        <motion.div


                                            className={` text-sm sm:text-md lg:text-xl max-w-[80%]
md:max-w-[65%]
xl:max-w-[55%] break-words [overflow-wrap:anywhere]   whitespace-pre-wrap overflow-hidden [overflow-wrap:anywhere] flex  font-poppins bg-white ${items?.content?.length > 40 ? "flex-col items-start gap-2" : " gap-3 flex-col items-start"} text-black px-3 py-1.5    ${isSingle ? singleClass : isFirst ? firstClass : isMiddle ? middleClass : isLast ? lastClass : ""}`}>



                                            {items.replyTo && (


                                                <div
                                                    className="w-full  mb-1 mt-4 rounded-xl border-l-4 border-blue-500 bg-black/80  px-3 py-2 cursor-pointer   transition-all duration-200"
                                                    onClick={() => {
                                                        // Scroll to original message
                                                        document
                                                            .getElementById(`message-${items.replyTo?.messageId}`)
                                                            ?.scrollIntoView({
                                                                behavior: "smooth",
                                                                block: "center",
                                                            });
                                                    }}
                                                >
                                                    <div className="flex items-start gap-3">
                                                        {/* Reply Indicator */}
                                                        <div className="flex-shrink-0 mt-1">
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                width="18"
                                                                height="18"
                                                                viewBox="0 0 24 24"
                                                                fill="none"
                                                            >
                                                                <path
                                                                    d="M10 9L5 12L10 15"
                                                                    stroke="#fff"
                                                                    strokeWidth="2"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                />
                                                                <path
                                                                    d="M5 12H15C18.3137 12 21 14.6863 21 18V19"
                                                                    stroke="#fff"
                                                                    strokeWidth="2"
                                                                    strokeLinecap="round"
                                                                />
                                                            </svg>
                                                        </div>

                                                        {/* Preview */}
                                                        <div className="flex-1 overflow-hidden">
                                                            <p className="text-lg font-semibold text-white truncate">
                                                                {items.replyTo?.userId === user._id
                                                                    ? "You"
                                                                    : items.replyTo?.senderName || "Unknown User"}
                                                            </p>

                                                            <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 break-words">
                                                                {items.replyTo?.content}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
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
                        subLoading ?
                            (<div className="h-full w-full flex flex-col justify-end overflow-y-auto p-4 space-y-4 animate-pulse">
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

                            ) : (
                                <div className="flex justify-center items-center h-full">
                                    <div className='h-auto w-auto px-5 py-7 bg-[#212121] rounded-xl flex flex-col justify-center gap-3'>

                                        <span className="text-md font-extrabold">No messages here yet...</span>
                                        <span className="text-sm">Send a message or tap on <br />the greeting below.</span>
                                        <div
                                            onClick={() => handelSend("Hey! How's it going?")}
                                            className='group bg-green-200 rounded-xl h-[40px] w-[80%] mx-auto mt-3 flex items-center justify-center text-black text-xs font-extrabold animate-bounce cursor-pointer transition-all duration-300 ease-out hover:scale-105 hover:bg-green-300 hover:shadow-[0_0_0_3px_rgba(187,247,208,0.25)]'
                                        >
                                            Hey! How's it going?
                                        </div>
                                    </div>
                                </div>
                            )
                    )


                }
            </div>



        </div >
    )
}

export default MessageArea