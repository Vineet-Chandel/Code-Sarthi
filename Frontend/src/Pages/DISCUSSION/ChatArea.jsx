import React, { useCallback, useEffect, useRef, useState } from "react";

import { useSocket } from "../../socket/SocketProvider";
import {

    MoreVertical,
    Smile,
    Paperclip,


} from "lucide-react";
import ClipTab from "./ClipTab";
import MessageArea from "./MessageArea";
import EmojiTab from "./EmojiTab";
import axios from "axios";
import BASE_URL from "../auth/baseURL";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "@/utils/messageSlice";
import ForwardTab from './ForwardTab';


const useLongPress = (callback, ms = 500, setClassLongPress) => {
    const [isHolding, setIsHolding] = useState(false);
    const timeoutRef = useRef(null);

    const start = useCallback((event) => {
        // Prevent default behavior to stop accidental scrolling/zooming on mobile
        if (event.cancelable) event.preventDefault();

        setIsHolding(true);
        timeoutRef.current = setTimeout(() => {
            callback(event);
        }, ms);
    }, [callback, ms]);

    const stop = useCallback(() => {
        setIsHolding(false);
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    }, []);

    return {
        onPointerDown: start,
        onPointerUp: () => { stop(); setClassLongPress("") },
        onPointerLeave: () => { stop(); setClassLongPress("") },
        className: isHolding ? "holding" : "" // Optional: utility to help with styling
    };
};



const ChatArea = ({ subLoading, forwardTabOpen, setForwardTabOpen, selectedChatUser, setSelectedChatUser, addToast, setlastMsgStatus, lastMsgStatus }) => {
    const dispatch = useDispatch()
    const user = useSelector(state => state?.user?.user?.DATA);
    const socketRef = useSocket();
    const [clipTab, setClipTab] = useState(false)
    const [emojiTab, setEmojiTab] = useState(false)
    const [classLongPress, setClassLongPress] = useState("");
    const [message, setMessage] = useState("")

    const handleLongPress = () => {
        if (switcher === "mic") {
            setClassLongPress("bg-red-500");

        }
        if (switcher === "vnote") {
            setClassLongPress("bg-blue-500");

        }

    };

    const [replyHandeler, setReplyHandeler] = useState({
        isOpen: false,
        msg: null,
        senderId: null,
        name: ""
    })

    // Instantiate hook with custom action and time window
    const longPressEvents = useLongPress(handleLongPress, 600, setClassLongPress);

    const [switcher, setSwitcher] = useState("mic");

    const [messageTab, setMessageTab] = useState({
        isOpen: false,
        idx: null,
        x: 0,
        y: 0,
        setMsg: ""
    });




    const handelSend = async (selectedChatUser, message, messageType, isReply) => {

        try {
            const clientMessageId = crypto.randomUUID();
            const conversationKey =
                selectedChatUser.convoId
                    ? selectedChatUser.convoId
                    : `temp_${selectedChatUser.id}`;
            let payload = {}
            if (selectedChatUser.convoId) {
                payload = {
                    clientMessageId,
                    messageType,
                    type: selectedChatUser?.fullChatInfo?.type,
                    conversationId: selectedChatUser.convoId,
                    content: message,
                    replyTo: isReply ? {
                        userId: messageTab.setMsg?.sender_id,
                        content: messageTab.setMsg?.content
                    } : null,
                    does: "message"
                }
            } else {


                payload = {
                    conversationId: selectedChatUser.convoId,
                    clientMessageId,
                    localChatKey: conversationKey,
                    messageType,
                    type: "private",
                    members: [selectedChatUser.id, user._id],
                    content: message,
                    does: "message"
                }
            }


            const tempMessage = {
                _id: clientMessageId,
                clientMessageId,
                conversation_id: conversationKey,
                sender_id: user._id,
                content: message,
                updatedAt: new Date().toISOString(),
                status: "sending",
                isTemporary: true,
                replyTo: isReply
                    ? {
                        userId: messageTab.setMsg?.sender_id,
                        content: messageTab.setMsg?.content
                    }
                    : null
            };

            dispatch(addMessage(tempMessage));
            setMessage("")
            setReplyHandeler({
                isOpen: false,
                msg: null,
                senderId: null,
                name: ""
            })
            const str = JSON.stringify(payload);


            if (socketRef.current?.readyState === WebSocket.OPEN) {
                socketRef.current.send(str);
            }

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
    }
    const handleKeyDown = (e) => {
        if (e.key === "Enter" && message.trim()) {

            handelSend(selectedChatUser, message, "text", replyHandeler.isOpen)
        }
    };




    return (
        <div className=" flex h-full w-full flex-col overflow-hidden rounded-2xl  bg-transparent ">

            {clipTab &&

                <div onClick={() => setClipTab(false)} className="absolute z-30 inset-0 w-full h-full bg-transparent">
                    <ClipTab replyHandeler={replyHandeler} />
                </div>


            }
            {forwardTabOpen &&
                <>

                    <ForwardTab setForwardTabOpen={setForwardTabOpen} />

                </>

            }



            {emojiTab &&
                <>


                    <div onClick={() => setEmojiTab(false)} className="absolute z-30 inset-0 w-full h-full bg-transparent" />
                    <EmojiTab setEmojiTab={setEmojiTab} setText={setMessage} replyHandeler={replyHandeler} />

                </>

            }

            {/* Messages */}

            <div className="flex-1 overflow-y-auto scrollbar-none px-0.5  md:px-4">
                <MessageArea subLoading={subLoading} forwardTabOpen={forwardTabOpen} setForwardTabOpen={setForwardTabOpen} setSelectedChatUser={setSelectedChatUser} selectedChatUser={selectedChatUser} setReplyHandeler={setReplyHandeler} replyHandeler={replyHandeler} setlastMsgStatus={setlastMsgStatus} lastMsgStatus={lastMsgStatus} messageTab={messageTab} setMessageTab={setMessageTab} />

            </div>

            {/* Input */}
            <div className="w-full flex gap-2 items-center px-2 sm:px-4 relative mt-2">
                <div className="relative cursor-pointer" onClick={() => setClipTab(true)} >
                    <span>
                        <div className="bg-[#212121] p-2 sm:p-2.5 rounded-full ">
                            <Paperclip />
                        </div>
                    </span>

                </div>



                <div className={`${replyHandeler.isOpen ? "bg-blue-300" : ""} w-full  rounded-xl flex-col flex gap-1  p-1`}>

                    {replyHandeler.isOpen && (
                        <div className="flex items-stretch gap-3 bg-[#212121] px-4 py-3 rounded-t-xl border-b border-white/10">
                            <div className="w-[3px] rounded-full bg-blue-500 shrink-0"></div>

                            <div className="flex flex-col flex-1 overflow-hidden">
                                <span className="text-sm text-blue-400">
                                    Replying to{" "}
                                    <span className="font-semibold text-white truncate max-w-[180px] block">
                                        {replyHandeler?.senderId === user?._id ? "You" : replyHandeler?.name}
                                    </span>
                                </span>
                                <p className="text-sm text-white/70 line-clamp-1 break-words">
                                    {replyHandeler?.msg}
                                </p>
                            </div>


                            <div
                                onClick={() => {
                                    setReplyHandeler({
                                        isOpen: false,
                                        msg: null,
                                        senderId: null,
                                    });
                                }}
                                className="flex items-center justify-center shrink-0 cursor-pointer text-white/50 hover:text-white transition-colors duration-200"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={20}
                                    height={20}
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        fill="currentColor"
                                        d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41z"
                                    />
                                </svg>
                            </div>
                        </div>
                    )}

                    <div className={`flex items-center gap-2 sm:gap-3 ${replyHandeler.isOpen ? "rounded-b-xl" : "rounded-xl"} bg-[#212121] p-2 sm:p-2.5`}>




                        <input

                            onKeyDown={handleKeyDown}
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}


                            placeholder="Write a message..."
                            className="flex-1 text-base sm:text-lg md:text-xl bg-transparent outline-none"
                        />







                        <div className="cursor-pointer" onClick={() => setEmojiTab(true)} >
                            <Smile
                                className="w-5 h-5 sm:w-6 sm:h-6"
                            />
                        </div>


                    </div>




                </div>




                {message ? <div onClick={(e) => handelSend(selectedChatUser, message, "text", replyHandeler.isOpen)} className=" p-2 sm:p-2.5 rounded-full cursor-pointer bg-white/20 hover:bg-white text-white hover:text-black transition-colors duration-200 ">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M21.864 3.549L15.41 21.417a1.55 1.55 0 0 1-1.41.903a1.54 1.54 0 0 1-1.394-.874l-2.88-5.759zM20.45 2.135L8.311 14.273l-5.728-2.864A1.55 1.55 0 0 1 1.68 10c0-.606.353-1.157.981-1.44z"></path>
                    </svg>
                </div> : < div
                    {...longPressEvents}
                    onClick={() => {
                        if (switcher === "mic") {
                            setSwitcher("vnote");
                            return;
                        }
                        setSwitcher("mic")
                    }}
                    className={` p-2 sm:p-2.5 rounded-full cursor-pointer ${classLongPress ? classLongPress : "bg-[#212121]"} `}>
                    {switcher === "mic" ? <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24">
                        <path fill="#fff" fillRule="evenodd" d="M12 2C9.769 2 8 3.757 8 5.828v6.344C8 14.242 9.769 16 12 16s4-1.758 4-3.828V5.828C16 3.758 14.231 2 12 2" clipRule="evenodd"></path>
                        <path fill="#fff" d="M13 20.945V23a1 1 0 1 1-2 0v-2.055A9 9 0 0 1 3 12a1 1 0 1 1 2 0a7 7 0 1 0 14 0a1 1 0 1 1 2 0a9 9 0 0 1-8 8.945"></path>
                    </svg>
                        :
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24">
                            <g fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}>
                                <circle cx={12} cy={12} r={4}></circle>
                                <rect width={20} height={20} x={2} y={2} rx={5}></rect>
                            </g>
                        </svg>
                    }

                </div>}
            </div>


        </div >
    );
};

export default ChatArea;