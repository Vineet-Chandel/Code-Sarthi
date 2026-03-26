import { useRef } from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../Pages/auth/baseURL";
import { addConnectionUser } from "../utils/connectionSlice";
import { setChatUsers } from "../utils/chatUserSlice";
import { useDispatch, useSelector } from "react-redux";
import { useMemo } from "react";
import { io } from "socket.io-client";
import {
    smileys_people,
    animals_nature,
    food_drink,
    activity,
    travel_places,
    objects,
    symbols,
    flags
} from "./CollectionEmojieData";


const emojis = {
    smileys_people,
    animals_nature,
    food_drink,
    activity,
    travel_places,
    objects,
    symbols,
    flags
};
const Discussions = () => {
    //using the dispatch 
    const dispatch = useDispatch();
    const socketRef = useRef(null);
    const pickerRef = useRef(null);
    const connections = useSelector(state => state.connections?.users || []);
    const user = useSelector(state => state.user?.user?.DATA);
    const [messages, setMessages] = useState([]);
    const [messageText, setMessageText] = useState("");
    const [profileOpen, setIsProfileOpen] = useState(false);
    //activation of the chat
    const [chatActive, setchatActive] = useState(false);
    const [chatingUserId, setChatingUserId] = useState("");
    const [chatingUsername, setChatingUsername] = useState("");
    const [chatingFirstName, setChatingFirstName] = useState("");
    const [chatingMiddleName, setChatingMiddleName] = useState("");
    const [chatingLastName, setChatingLastName] = useState("");
    const [chatingGmail, setChatingGmail] = useState("");
    const [chatingPhotoUrl, setChatingPhotoUrl] = useState("");
    const [activeEmojiFeild, setActiveEmojiFeild] = useState("smileys_people");
    const [activeEFeild, setActiveEFeild] = useState("Smileys & Peoples");
    const [isLoadingChats, setIsLoadingChats] = useState(false);


    //for switching between the teams and connections
    const [section, setSection] = useState(1);

    const [showPicker, setShowPicker] = useState(false);

    //chats 
    const chatMessages = useSelector(
        state => {
            state?.chats?.users;
            console.log("state?.chats?.users", state?.chats?.users);
            console.log("state?.chats", state?.chats);
            console.log("state", state)
        }
    );
    //connections user 
    const connectionUser = async () => {
        try {
            const response = await axios.get(
                `${BASE_URL}/user/connections`,
                { withCredentials: true }
            );
            dispatch(addConnectionUser(response.data.data));


        } catch (err) {
            console.error(err?.message || err);
        }
    };
    useEffect(() => {
        connectionUser();
    }, []);
    //filtered connection list 
    const connectionList = useMemo(() => {
        return connections.filter(
            conn => !chatMessages.some(chat => chat.atFrontUser?._id === conn.userId)
        );
    }, [connections, chatMessages]);



    //handeling the emojis tabs
    const handleEmojiClick = (emoji) => {
        setMessageText((prev) => prev + emoji);
    };
    useEffect(() => {
        function handleClickOutside(e) {
            if (pickerRef.current && !pickerRef.current.contains(e.target)) {
                setShowPicker(false);
                setIsMsgOptionTabOpen(false);
                setIsCopied(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);


    const currentUserId = user?._id;
    //chats api
    const convo = async () => {
        try {
            const response = await axios.post(
                `${BASE_URL}/get-convo`, {},
                { withCredentials: true }
            );

            //chats dispatching
            dispatch(setChatUsers(response.data.conversation));
            console.log(response.data.conversation);
        } catch (err) {
            console.error(err?.message || err);
        }
    };
    useEffect(() => {
        convo();
    }, [messages]);


    //onclicking outer box focusing in the input box
    //for the ui optimization
    const inputRef = useRef(null);
    const focusInput = () => {
        inputRef.current.focus();
    }


    const [isMsgOptionTabOpen, setIsMsgOptionTabOpen] = useState(false);
    const [messageId, setMessageId] = useState("");
    const [msgProfile, setMsgProfile] = useState("");

    const [deleteType, setDeleteType] = useState("");
    const [msgBY, setMsgBY] = useState("");
    const [isCopied, setIsCopied] = useState(false);
    const [msg, setMsg] = useState("");
    const [msgById, setMsgById] = useState("");
    const handleCopy = async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            console.log("Copied!");
        } catch (err) {
            console.error("Failed to copy", err);
        }
    };
    const deleteMessage = async (deleteType, messageId) => {
        try {
            if (deleteType === "Everyone") {
                await axios.delete(
                    `${BASE_URL}/delete-for-everyone/${messageId}`,
                    { withCredentials: true }
                );
            }
            if (deleteType === "Me") {
                await axios.delete(
                    `${BASE_URL}/delete-for-me/${messageId}`,
                    { withCredentials: true }
                );
            }
        } catch (error) {
            console.log(error?.data.message)
        }
    }

    useEffect(() => {
        deleteMessage(deleteType, messageId);
    }, [deleteType])

    // // onsending the message it goes to down 
    const bottomRef = useRef(null);
    const [scrollDown, setScrollDown] = useState(false);
    const chatRef = useRef(null);
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
        setScrollDown(false);
    }, [messages, scrollDown]);

    // useEffect(() => {

    //     socketRef.current = io(BASE_URL, {
    //         withCredentials: true
    //     });
    //     if (!currentUserId) return;
    //     socketRef.current.on("connect", () => {
    //         console.log("Socket Connected:", socketRef.current.id);

    //         if (currentUserId) {
    //             socketRef.current.emit("userConnected", currentUserId);
    //         }
    //     });

    //     // socketRef.current.on("user_typing", (data) => {
    //     //     setTypingUser(data.isTyping);
    //     // });

    //     socketRef.current.on("receiveMessage", (message) => {

    //         setMessages(prev => {

    //             const exists = prev.some(m => m._id === message._id);
    //             if (exists) return prev;

    //             return [...prev, message];
    //         });

    //     });
    //     return () => {
    //         socketRef.current.disconnect();
    //     };

    // }, [currentUserId]);


    const sendMessage = async () => {
        if (!messageText.trim()) return;

        const tempId = Date.now(); // temporary unique id

        console.log(currentUserId);
        console.log(user._id);
        console.log(connections.userId);


        const tempMessage = {
            _id: tempId,
            content: messageText,
            sender: { _id: currentUserId },
            receiver: { _id: chatingUserId },
            createdAt: new Date(),
            status: "sending" // 👈 important
        };

        // 🚀 Show instantly
        setMessages(prev => [...prev, tempMessage]);

        setMessageText("");

        try {
            const res = await axios.post(

                `${BASE_URL}/send-message`,
                {
                    receiverId: chatingUserId,
                    content: tempMessage.content
                },
                { withCredentials: true }
            );

            const realMessage = res.data.populatedMessage;

            // 🔄 Replace temp message with real one
            setMessages(prev =>
                prev.map(msg =>
                    msg._id === tempId
                        ? { ...realMessage, status: "sent" }
                        : msg
                )
            );

            socketRef.current.emit("sendMessage", realMessage);

        } catch (error) {
            setMessages(prev =>
                prev.map(msg =>
                    msg._id === tempId
                        ? { ...msg, status: "failed" }
                        : msg
                )
            );
        }
    };
    const loadMessages = async (conversationId) => {

        try {
            setIsLoadingChats(true)
            const res = await axios.post(
                `${BASE_URL}/get-message/${conversationId}`,
                {},
                { withCredentials: true }
            );

            const msgs = res.data.messages;
            console.log(msgs);

            setMessages(msgs.map(m => ({ ...m, status: "sent" })));

            const messageIds = msgs
                .filter(m => m.receiver._id === currentUserId)
                .map(m => { m._id });

            // if (messageIds.length) {
            //     await axios.post(
            //         `${BASE_URL}/mark-read`,
            //         { messageIds },
            //         { withCredentials: true }
            //     );
            // }

        } catch (error) {
            console.log(error);
        } finally {
            setIsLoadingChats(false);
        }

    };



    //to sent the msg on clicking enter
    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault(); // prevents newline
            sendMessage();
        }
    };
    // const handleTyping = () => {
    //     socketRef.current.emit("typing_start", {
    //         conversationId: chatingUserId,
    //         receiverId: chatingUserId
    //     });
    // };



    // const makeReset = () => {
    //     setIsProfileOpen(false);
    //     setSelectedUserID(null);
    // }



    //fetching the connections 
    // const chats = async () => {
    //     try {
    //         const response = await axios.get(
    //             `${BASE_URL}/chats`,
    //             { withCredentials: true }
    //         );
    //         dispatch(addChatsUser(response?.data?.data || []));


    //     } catch (err) {
    //         console.error(err?.message || err);
    //     }
    // };




    //fetching the connections 
    // const connectionUser = async () => {
    //     try {
    //         const response = await axios.get(
    //             `${BASE_URL}/user/connections`,
    //             { withCredentials: true }
    //         );
    //         dispatch(addConnectionUser(response.data.data));


    //     } catch (err) {
    //         console.error(err?.message || err);
    //     }
    // };
    // useEffect(() => {
    //     connectionUser();
    // }, []);



    return (
        <div className="w-screen h-[calc(100vh-50px)] flex bg-gradient-to-br from-[#0a0a0f] via-[#0c0c14] to-[#080810] text-white font-sans antialiased overflow-hidden">
            {/* LEFT SIDEBAR - Premium Glass Morphism */}
            <div className="w-[320px] md:w-[360px] lg:w-[400px] flex-shrink-0 border-r border-white/5 flex flex-col px-3 md:px-4 py-5 gap-5 bg-white/[0.03] backdrop-blur-2xl relative overflow-hidden ">

                <div className="relative z-10">
                    {/* SEARCH BAR - Premium */}
                    <div
                        onClick={focusInput}
                        className="group flex items-center gap-3 bg-white/[0.04] border border-white/10 px-4 py-3 rounded-2xl backdrop-blur-xl hover:border-blue-500/40 focus-within:border-blue-500/60 transition-all duration-300 "
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" className="opacity-50 group-focus-within:opacity-100 transition-opacity">
                            <path fill="currentColor" d="M10.5 2a8.5 8.5 0 1 0 5.262 15.176l3.652 3.652a1 1 0 0 0 1.414-1.414l-3.652-3.652A8.5 8.5 0 0 0 10.5 2" />
                        </svg>

                        <input
                            ref={inputRef}
                            type="text"
                            placeholder="Search conversations..."
                            className="flex-1 bg-transparent outline-none text-sm placeholder-white/40 font-light tracking-wide"
                        />

                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center opacity-0 group-focus-within:opacity-100 transition-opacity ">
                            <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24">
                                <path fill="white" d="M19 10a3 3 0 0 1 3 3v3a3 3 0 0 1-3 3v.966c0 1.06-1.236 1.639-2.05.96L14.638 19H12a3 3 0 0 1-3-3v-3a3 3 0 0 1 3-3z" />
                            </svg>
                        </div>
                    </div>

                    {/* SECTION TOGGLE - Premium Segmented Control */}
                    <div className="mt-5 p-1 bg-white/[0.04] rounded-2xl border border-white/10 backdrop-blur-xl">
                        <div className="flex relative">
                            <div className={`absolute top-0 h-full w-1/2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl transition-transform duration-300  ${section === 2 ? "translate-x-full" : ""}`}></div>
                            <button
                                onClick={() => setSection(1)}
                                className={`flex-1 py-2.5 text-sm font-medium rounded-xl transition-all duration-300 relative z-10 ${section === 1 ? 'text-white' : 'text-white/60 hover:text-white/80'}`}
                            >
                                Connections
                            </button>
                            <button
                                onClick={() => setSection(2)}
                                className={`flex-1 py-2.5 text-sm font-medium rounded-xl transition-all duration-300 relative z-10 ${section === 2 ? 'text-white' : 'text-white/60 hover:text-white/80'}`}
                            >
                                Teams
                            </button>
                        </div>
                    </div>

                    {/* LIST AREA - Premium Cards */}
                    <div className="mt-6 space-y-1 overflow-y-auto max-h-[calc(100vh-250px)] pr-2 custom-scrollbar">
                        {chatMessages.map((item, index) => (
                            <div
                                key={index}
                                className="group relative flex items-center gap-3 p-3 rounded-xl hover:bg-white/[0.06] transition-all duration-300 cursor-pointer border border-transparent hover:border-white/10 "
                                onClick={() => {
                                    setMessages([]);
                                    setchatActive(true);
                                    setChatingPhotoUrl(item.atFrontUser?.photoUrl?.url);
                                    setChatingUserId(item.atFrontUser?._id);
                                    setChatingFirstName(item.atFrontUser?.firstName);
                                    setChatingLastName(item.atFrontUser?.lastName);
                                    setChatingUsername(item.atFrontUser?.username);
                                    setChatingGmail(item.atFrontUser?.gmail);
                                    setChatingMiddleName(item.atFrontUser?.middleName);
                                    loadMessages(item.LastMsg?.conversation);
                                }}
                            >
                                {/* Online indicator */}
                                <div className="relative">
                                    <img
                                        src={item.atFrontUser?.photoUrl?.url}
                                        alt="profile"
                                        className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover ring-2 ring-white/10 group-hover:ring-blue-500/40 transition-all duration-300"
                                    />
                                    <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-[#0A0A0F]"></div>
                                </div>

                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-center">
                                        <h3 className="text-white font-semibold truncate">
                                            {item.atFrontUser?.firstName} {item.atFrontUser?.lastName}
                                        </h3>
                                        <span className="text-xs text-white/40">
                                            {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                    </div>
                                    <p className="text-sm text-white/60 truncate mt-0.5">
                                        {item.LastMsg?.content || "Hey! let's collab"}
                                    </p>
                                </div>

                                {/* Unread badge - commented but styled */}
                                {(item.unReadCount != 0 && item.atFrontUser.username == user.username) && (
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white text-xs flex items-center justify-center ">
                                        {item.unReadCount}
                                    </div>
                                )}
                            </div>
                        ))}

                        {/* Start Collabing CTA */}
                        <div className="mt-6 p-4 rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-600/10 border border-white/10 text-center group cursor-pointer hover:from-blue-500/20 hover:to-purple-600/20 transition-all duration-300">
                            <div className="flex items-center justify-center gap-2 text-white/80 group-hover:text-white">
                                <span className="text-sm font-medium">Start New Collab</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" className="group-hover:translate-x-1 transition-transform">
                                    <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 12h16m-6-6l6 6-6 6" />
                                </svg>
                            </div>
                        </div>


                        {
                            connectionList.map((item) =>
                                <li
                                    key={item.userId}
                                    className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-zinc-800 cursor-pointer transition"
                                    onClick={() => {
                                        setMessages([]);
                                        setchatActive(true);
                                        setChatingPhotoUrl(item.photoUrl);
                                        setChatingUserId(item.userId);
                                        setChatingFirstName(item.FirstName);
                                        setChatingLastName(item.LastName);
                                        setChatingUsername(item.username);
                                        setChatingGmail(item.gmail);
                                        setChatingMiddleName(item.MiddleName);
                                    }}
                                >
                                    <img
                                        src={item.photoUrl}
                                        alt="profile"
                                        className="w-[50px] h-[50px] rounded-full object-cover"
                                    />

                                    <div className="flex flex-col">
                                        <span className="text-white text-xl font-medium">
                                            {item.FirstName} {item.LastName}
                                        </span>

                                        <span className="text-gray-400 text-sm pl-1">
                                            {!item.lastMsg && <span>Hey! let's collab</span>}
                                        </span>
                                    </div>


                                </li>

                            )
                        }
                    </div>
                </div>
            </div>

            {/* RIGHT CHAT AREA - Premium Design */}
            <div ref={chatRef} className="flex-1 p-4">
                <div className="w-[calc(100vw-400px)]  h-full rounded-3xl bg-gradient-to-b from-[#0C0C14] to-[#080810] border border-white/10  flex flex-col overflow-hidden  relative">

                    {!chatActive ? (
                        <div className="flex-1 flex items-center justify-center">
                            <div className="text-center">
                                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-600/20 flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width={32} height={32} viewBox="0 0 24 24" className="opacity-50">
                                        <path fill="white" d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4V4c0-1.1-.9-2-2-2z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-light text-white/60">Select a conversation to start chatting</h3>
                                <p className="text-sm text-white/40 mt-2">Choose from your existing connections</p>
                            </div>
                        </div>
                    ) : isLoadingChats ? (
                        <div className="w-full h-full flex flex-col justify-center items-center">
                            <h2 className="text-6xl md:text-8xl font-extrabold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                                CodeSarthi
                            </h2>
                            <svg xmlns="http://www.w3.org/2000/svg" width={100} height={100} viewBox="0 0 24 24"><circle cx={4} cy={12} r={3} fill="currentColor"><animate id="SVGKiXXedfO" attributeName="cy" begin="0;SVGgLulOGrw.end+0.25s" calcMode="spline" dur="0.6s" keySplines=".33,.66,.66,1;.33,0,.66,.33" values="12;6;12"></animate></circle><circle cx={12} cy={12} r={3} fill="currentColor"><animate attributeName="cy" begin="SVGKiXXedfO.begin+0.1s" calcMode="spline" dur="0.6s" keySplines=".33,.66,.66,1;.33,0,.66,.33" values="12;6;12"></animate></circle><circle cx={20} cy={12} r={3} fill="currentColor"><animate id="SVGgLulOGrw" attributeName="cy" begin="SVGKiXXedfO.begin+0.2s" calcMode="spline" dur="0.6s" keySplines=".33,.66,.66,1;.33,0,.66,.33" values="12;6;12"></animate></circle></svg>

                        </div >
                    ) : (

                        <div className="flex flex-col h-full relative">
                            {/* TOP HEADER - Premium */}
                            <div className="sticky top-0 z-20 w-full border-b border-white/10 flex items-center justify-between px-6 py-4 bg-[#0C0C14]/80 backdrop-blur-xl">
                                <div className="flex items-center gap-4">
                                    <div className="relative">
                                        <img
                                            src={chatingPhotoUrl}
                                            className="w-12 h-12 rounded-full object-cover ring-2 ring-blue-500/50"
                                        />
                                        <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-[#0C0C14]"></div>
                                    </div>
                                    <div>
                                        <div className="text-white font-semibold">
                                            {chatingFirstName} {chatingLastName}
                                        </div>
                                        <div className="flex items-center gap-1 mt-0.5">
                                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                            <span className="text-xs text-green-400">Online</span>
                                        </div>
                                    </div>
                                </div>

                                {/* 3 DOT MENU - Premium */}
                                <button className="p-2 hover:bg-white/5 rounded-xl transition-all duration-300 group">
                                    <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" className="opacity-60 group-hover:opacity-100">
                                        <circle cx="12" cy="5" r="2" fill="white" />
                                        <circle cx="12" cy="12" r="2" fill="white" />
                                        <circle cx="12" cy="19" r="2" fill="white" />
                                    </svg>
                                </button>
                            </div>

                            {/* MESSAGES AREA - Premium Bubbles */}
                            <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar bg-[#0A0A0F]" >
                                {messages.map((msg, index) => {
                                    const isMe = msg.sender._id === currentUserId;

                                    return isMe ? (
                                        // MY MESSAGE - Premium

                                        <div key={msg._id} className="flex justify-end ">
                                            {!(msg.deletedFor?.includes(user._id)) && (
                                                <div className="relative max-w-[70%] group">

                                                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white px-4 md:px-5 py-2.5 md:py-3 rounded-2xl rounded-br-md transition-all duration-300  hover:scale-[1.01]">

                                                        <div className="relative flex items-center gap-2">

                                                            {/* Message */}
                                                            <div className="break-words  break-all whitespace-pre-wrap">
                                                                {msg.deletedForEveryone && <p className="text-md text-white/80 truncate mt-0.5">You deleted this message</p>}
                                                                {!msg.deletedForEveryone && msg.content}


                                                            </div>

                                                            {/* Action Icon */}
                                                            {!msg.deletedForEveryone && (
                                                                <button
                                                                    className=" opacity-0 group-hover:opacity-100 translate-x-3 group-hover:translate-x-0 scale-90 group-hover:scale-100 transition-all duration-200 ease-out p-1.5 rounded-lg hover:bg-white/10 active:scale-90 "

                                                                    onClick={() => { setIsMsgOptionTabOpen(true); setMessageId(`${msg._id}`); setMsg(`${msg.content}`); setMsgProfile(`${msg.sender?.photoUrl?.url}`); setMsgBY(`${msg.sender?.username}`); setMsgById(`${msg.sender?._id}`) }}
                                                                >
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                                                                        className="text-white/50 hover:text-white transition cursor-pointer "
                                                                    >
                                                                        <path fill="#ffffff" d="M12 17a1.72 1.72 0 0 1-1.33-.64l-4.21-5.1a2.1 2.1 0 0 1-.26-2.21A1.76 1.76 0 0 1 7.79 8h8.42a1.76 1.76 0 0 1 1.59 1.05a2.1 2.1 0 0 1-.26 2.21l-4.21 5.1A1.72 1.72 0 0 1 12 17" />
                                                                    </svg>
                                                                </button>
                                                            )}
                                                        </div>

                                                        {/* Time + Status */}
                                                        <div className="flex justify-end items-center gap-1 mt-1">
                                                            <span className="text-[10px] text-white/60">
                                                                {new Date(msg.createdAt).toLocaleTimeString([], {
                                                                    hour: "2-digit",
                                                                    minute: "2-digit",
                                                                })}
                                                            </span>

                                                            <span className="text-white/60 flex items-center">
                                                                {msg.status === "sending" && <span><svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24"><path fill="none" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="m5 14l3.5 3.5L19 6.5"></path></svg></span>}
                                                                {msg.status === "sent" && <span><svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24"><path fill="none" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.5 13.833L6 17.5l1.024-1.073M16.5 6.5l-6.063 6.352m-2.937.981L11 17.5l10.5-11"></path></svg></span>}
                                                                {msg.status === "failed" && <span><svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 16 16"><g fill="none"><path fill="url(#SVG46elwcsk)" d="M2 8a6 6 0 1 1 12 0A6 6 0 0 1 2 8"></path><path fill="url(#SVGQMDY1c6m)" d="M8 10a.75.75 0 1 0 0 1.5a.75.75 0 0 0 0-1.5m0-5.5a.5.5 0 0 0-.492.41L7.5 5v3.5l.008.09a.5.5 0 0 0 .984 0L8.5 8.5V5l-.008-.09A.5.5 0 0 0 8 4.5"></path><defs><linearGradient id="SVG46elwcsk" x1={3.875} x2={11.75} y1={0.125} y2={15.125} gradientUnits="userSpaceOnUse"><stop stopColor="#ffcd0f"></stop><stop offset={1} stopColor="#fe8401"></stop></linearGradient><linearGradient id="SVGQMDY1c6m" x1={6} x2={9.213} y1={4.5} y2={11.844} gradientUnits="userSpaceOnUse"><stop stopColor="#4a4a4a"></stop><stop offset={1} stopColor="#212121"></stop></linearGradient></defs></g></svg></span>}
                                                            </span>
                                                        </div>
                                                    </div>


                                                </div>

                                            )}
                                        </div>


                                    ) : (
                                        // OTHER USER MESSAGE - Premium

                                        <div key={msg._id} className="flex gap-3 items-end ">

                                            {!(msg.deletedFor?.includes(user._id)) && (
                                                <img
                                                    src={msg.sender?.photoUrl?.url}
                                                    className="w-8 h-8 rounded-full object-cover 
    ring-2 ring-white/10
    transition-transform duration-200 hover:scale-110"
                                                />
                                            )}
                                            {!(msg.deletedFor?.includes(user._id)) && (
                                                <div className="relative max-w-[70%] group">

                                                    <div className="bg-[#1A1A22] text-white px-4 py-2.5 rounded-2xl rounded-bl-md border border-white/5 transition-all duration-300 hover:bg-[#222230]">


                                                        <div className="relative flex items-center gap-2">

                                                            {/* Message */}


                                                            <div className="break-words break-all whitespace-pre-wrap text-[15px] ">
                                                                {msg.deletedForEveryone && <p className="text-md flex items-center justify-center  gap-1  text-white/80 italic truncate mt-0.5">
                                                                    This message was deleted
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 48 48"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M11.275 13.707h25.45V39.94a3.56 3.56 0 0 1-3.56 3.56h-18.33a3.56 3.56 0 0 1-3.56-3.56zm19.678-6.138l-.89-3.069H17.937l-.89 3.069H9.328v6.138h29.344V7.569z" strokeWidth={1}></path></svg>
                                                                </p>}
                                                                {!msg.deletedForEveryone && msg.content}
                                                            </div>


                                                            {/* Action Icon */}
                                                            {!msg.deletedForEveryone && (
                                                                <button
                                                                    className=" opacity-0 group-hover:opacity-100 translate-x-3 group-hover:translate-x-0 scale-90 group-hover:scale-100 transition-all duration-200 ease-out p-1.5 rounded-lg hover:bg-white/10 active:scale-90 "

                                                                    onClick={() => { setIsMsgOptionTabOpen(true); setMessageId(`${msg._id}`); setMsg(`${msg.content}`); setMsgProfile(`${msg.sender?.photoUrl?.url}`); setMsgBY(`${msg.sender?.username}`); setMsgById(`${msg.sender?._id}`) }}
                                                                >
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                                                                        className="text-white/50 hover:text-white transition cursor-pointer "
                                                                    >
                                                                        <path fill="#ffffff" d="M12 17a1.72 1.72 0 0 1-1.33-.64l-4.21-5.1a2.1 2.1 0 0 1-.26-2.21A1.76 1.76 0 0 1 7.79 8h8.42a1.76 1.76 0 0 1 1.59 1.05a2.1 2.1 0 0 1-.26 2.21l-4.21 5.1A1.72 1.72 0 0 1 12 17" />
                                                                    </svg>
                                                                </button>
                                                            )}
                                                        </div>
                                                        <div className="text-left mt-1">
                                                            <span className="text-[10px] text-white/40">
                                                                {new Date(msg.createdAt).toLocaleTimeString([], {
                                                                    hour: "2-digit",
                                                                    minute: "2-digit",
                                                                })}
                                                            </span>
                                                        </div>
                                                    </div>

                                                </div>

                                            )}
                                        </div>
                                    );
                                })}

                                {/* Typing indicator - optional */}
                                <div className="flex gap-3">
                                    <img src={chatingPhotoUrl} className="w-8 h-8 rounded-full object-cover opacity-0" />
                                    <div className="bg-[#1A1A24] px-4 py-3 rounded-2xl rounded-bl-md">
                                        <div className="flex gap-1">
                                            <span className="w-2 h-2 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                                            <span className="w-2 h-2 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                                            <span className="w-2 h-2 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                                        </div>
                                    </div>
                                </div>

                                <div ref={bottomRef}></div>
                            </div>

                            {/* TYPING AREA - Premium */}


                            {
                                showPicker && (
                                    <div ref={pickerRef} className=" absolute bottom-20 left-4 z-50  w-[720px] h-[520px] bg-white/[0.04]  border border-white/10 rounded-3xl  p-4 flex flex-col overflow-hidden  ">
                                        <div className="w-full border-b h-[50px] rounded-t-3xl">

                                            {/* Tabs */}
                                            <div className="flex gap-2 item-center h-full  justify-center">
                                                <button className={`w-[12.5%] h-full flex items-center justify-center 
group rounded-xl transition-all duration-200
hover:bg-white/10 active:scale-95`} onClick={() => { setActiveEmojiFeild("smileys_people"); setActiveEFeild("Smileys & Peoples"); }}>
                                                    <div className="flex flex-col items-center">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-[40%] h-[40%]" viewBox="0 0 24 24"><g fill="none"><path fill="#ffef5e" d="M12 23c6.075 0 11-4.925 11-11S18.075 1 12 1S1 5.925 1 12s4.925 11 11 11" /><path fill="#fff9bf" d="M12 4.826a11.8 11.8 0 0 1 10.994 7.517c0-.114.006-.228.006-.343a11 11 0 1 0-21.994.343A11.8 11.8 0 0 1 12 4.826" /><path stroke="#191919" strokeLinecap="round" strokeLinejoin="round" d="M14.39 9.505a2.256 2.256 0 0 0 3.827 0m-8.609 0a2.256 2.256 0 0 1-3.826 0m.478 5.843a6.218 6.218 0 0 0 11.479 0" strokeWidth="1" /><path stroke="#191919" strokeLinecap="round" strokeLinejoin="round" d="M12 23c6.075 0 11-4.925 11-11S18.075 1 12 1S1 5.925 1 12s4.925 11 11 11" strokeWidth="1" /></g></svg>
                                                        {activeEmojiFeild === "smileys_people" && (<div className="w-[20%] mt-1 h-1 rounded-3xl bg-white/70" ></div>)}
                                                    </div>
                                                </button>
                                                <button className="w-[12.5%] h-full flex items-center  justify-center" onClick={() => { setActiveEmojiFeild("animals_nature"); setActiveEFeild("Animals & Nature"); }}>
                                                    <div className="flex flex-col items-center">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-[40%] h-[40%]" viewBox="0 0 16 16"><g fill="none"><path fill="url(#SVGkglt4bPE)" d="M8 7a5 5 0 0 0-5 5c0 1.298 1.212 2 2.285 2h5.43C11.788 14 13 13.298 13 12a5 5 0 0 0-5-5" /><path fill="url(#SVGVlWkwbUw)" d="M8.5 3.875C8.5 2.938 9.138 2 10.125 2s1.625.938 1.625 1.875s-.638 1.875-1.625 1.875S8.5 4.812 8.5 3.875m-6.125.375C1.388 4.25.75 5.188.75 6.125S1.388 8 2.375 8S4 7.062 4 6.125S3.362 4.25 2.375 4.25m11.25 0c-.987 0-1.625.938-1.625 1.875S12.638 8 13.625 8s1.625-.938 1.625-1.875s-.638-1.875-1.625-1.875M5.875 2c-.987 0-1.625.938-1.625 1.875S4.888 5.75 5.875 5.75S7.5 4.812 7.5 3.875S6.862 2 5.875 2" /><defs><radialGradient id="SVGVlWkwbUw" cx="0" cy="0" r="1" gradientTransform="matrix(0 -7.71429 11.6 0 8.403 8.429)" gradientUnits="userSpaceOnUse"><stop stopColor="#eb4824" /><stop offset="1" stopColor="#ff921f" /></radialGradient><linearGradient id="SVGkglt4bPE" x1="5.378" x2="8.294" y1="7.931" y2="14.583" gradientUnits="userSpaceOnUse"><stop offset=".125" stopColor="#ff921f" /><stop offset="1" stopColor="#eb4824" /></linearGradient></defs></g></svg>
                                                        {activeEmojiFeild === "animals_nature" && (<div className="w-[20%] mt-1 h-1 rounded-3xl bg-white/70" ></div>)}
                                                    </div>
                                                </button>
                                                <button className="w-[12.5%] h-full flex items-center  justify-center" onClick={() => { setActiveEmojiFeild("food_drink"); setActiveEFeild("Foods & Drinks"); }}>
                                                    <div className="flex flex-col items-center">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-[40%] h-[40%]" viewBox="0 0 16 16"><g fill="none"><path fill="url(#SVGjZsZrbsg)" d="M13.5 1A4.5 4.5 0 0 0 9 5.5V7a1 1 0 0 0 1 1h.944l-.02.191c-.046.452-.109 1.062-.172 1.7c-.123 1.255-.252 2.663-.252 3.109a2 2 0 1 0 4 0c0-.446-.129-1.854-.252-3.11a304 304 0 0 0-.23-2.24L14 7.473V1.5a.5.5 0 0 0-.5-.5" /><path fill="url(#SVGWHu4Ndaz)" d="M6.723 1.054a.5.5 0 0 1 .265.335C7.006 1.468 7.5 3.582 7.5 5c0 .95-.442 1.797-1.13 2.346c-.25.2-.37.418-.37.6v.486q0 .035.004.066c.034.248.157 1.169.272 2.124c.113.937.224 1.959.224 2.378a2 2 0 1 1-4 0c0-.42.111-1.44.224-2.378c.115-.955.238-1.876.272-2.124L3 8.432v-.486c0-.182-.12-.4-.37-.6A3 3 0 0 1 1.5 5c0-1.413.49-3.516.512-3.61A.505.505 0 0 1 2.505 1c.28 0 .507.227.507.507v2.998A.495.495 0 1 0 4 4.5v-3a.5.5 0 0 1 1 0v3.026a.495.495 0 0 0 .99-.021v-3c0-.279.226-.505.506-.505c.022 0 .12 0 .227.054" /><defs><linearGradient id="SVGjZsZrbsg" x1="8.154" x2="21.198" y1="1.875" y2="6.749" gradientUnits="userSpaceOnUse"><stop stopColor="#6ce0ff" /><stop offset="1" stopColor="#0067bf" /></linearGradient><linearGradient id="SVGWHu4Ndaz" x1=".577" x2="14.483" y1="1.875" y2="7.543" gradientUnits="userSpaceOnUse"><stop stopColor="#6ce0ff" /><stop offset="1" stopColor="#0067bf" /></linearGradient></defs></g></svg>
                                                        {activeEmojiFeild === "food_drink" && (<div className="w-[20%] mt-1 h-1 rounded-3xl bg-white/70" ></div>)}
                                                    </div>
                                                </button>
                                                <button className="w-[12.5%] h-full flex items-center  justify-center" onClick={() => { setActiveEmojiFeild("activity"); setActiveEFeild("Activity"); }}>
                                                    <div className="flex flex-col items-center">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-[40%] h-[40%]" viewBox="0 0 24 24"><g fill="none"><path fill="#fff" d="M12 .751L4.046 4.046L.751 12l3.295 7.954L12 23.249l7.954-3.295L23.249 12l-3.295-7.954z" /><path fill="#bbd8ff" d="m8.924 17.113l-1.912-6.26l5.001-3.644l5.002 3.645l-1.91 6.259zM8.805 2.075l3.208 1.37l3.195-1.364L12 .75zM22.979 12.65l-2.876-3.309l.361-4.085L23.249 12zm-2.225 5.374l-3.74.861l-1.812 3.037l4.752-1.968zM1.021 12.65l2.876-3.309l-.361-4.085L.75 12zm2.225 5.374l3.74.861l1.812 3.037l-4.752-1.968z" /><path stroke="#092f63" strokeLinecap="round" strokeLinejoin="round" d="M12 .751L4.046 4.046L.751 12l3.295 7.954L12 23.249l7.954-3.295L23.249 12l-3.295-7.954z" strokeWidth="1" /><path stroke="#092f63" strokeLinecap="round" strokeLinejoin="round" d="m8.924 17.113l-1.912-6.26l5.001-3.644l5.002 3.645l-1.91 6.259zM3.557 5.225l.364 4.118l-2.891 3.329m2.214 5.348l3.769.868l1.823 3.05m11.918-3.914l-3.74.861l-1.812 3.037l4.752-1.968zM12.013 7.209V3.445l3.195-1.365l4.746 1.966l.51 1.21l-.36 4.085l-3.09 1.512zm3.092 9.904l1.91 1.772m-8.091-1.772l-1.911 1.774M3.921 9.343l3.09 1.51" strokeWidth="1" /><path stroke="#092f63" strokeLinecap="round" strokeLinejoin="round" d="m8.805 2.075l3.208 1.37l3.195-1.364L12 .75zM22.979 12.65l-2.876-3.309l.361-4.085L23.249 12z" strokeWidth="1" /></g></svg>
                                                        {activeEmojiFeild === "activity" && (<div className="w-[20%] mt-1 h-1 rounded-3xl bg-white/70" ></div>)}
                                                    </div>
                                                </button>
                                                <button className="w-[12.5%] h-full flex items-center  justify-center" onClick={() => { setActiveEmojiFeild("travel_places"); setActiveEFeild("Travel & Places"); }}>
                                                    <div className="flex flex-col items-center">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-[40%] h-[40%]" viewBox="0 0 24 24"><g fill="none"><path fill="#ff808c" d="M4.826 9.13h14.348A3.826 3.826 0 0 1 23 12.957v4.782a.957.957 0 0 1-.957.957H1.957A.956.956 0 0 1 1 17.739v-4.783A3.826 3.826 0 0 1 4.826 9.13" /><path fill="#ffbfc5" d="M22.88 12a3.826 3.826 0 0 0-3.706-2.87H4.827A3.826 3.826 0 0 0 1.12 12z" /><path fill="#ffef5e" d="M2.914 13.913h2.87L5.305 12H1.122a4 4 0 0 0-.117.78a2.15 2.15 0 0 0 1.91 1.133M18.696 12l-.478 1.913h2.87A2.16 2.16 0 0 0 23 12.778a4 4 0 0 0-.12-.778z" /><path fill="#66e1ff" d="m4.348 9.13l.69-4.14A1.91 1.91 0 0 1 6.93 3.392h10.146a1.91 1.91 0 0 1 1.886 1.599l.69 4.14z" /><path fill="#c2f3ff" d="M15.348 3.391H6.93a1.91 1.91 0 0 0-1.889 1.6l-.693 4.14h5.26z" /><path stroke="#191919" strokeLinecap="round" strokeLinejoin="round" d="M4.826 9.13h14.348A3.826 3.826 0 0 1 23 12.957v4.782a.957.957 0 0 1-.957.957H1.957A.956.956 0 0 1 1 17.739v-4.783A3.826 3.826 0 0 1 4.826 9.13m-.478 0l.69-4.14a1.91 1.91 0 0 1 1.886-1.6h10.15a1.91 1.91 0 0 1 1.887 1.599l.69 4.14" strokeWidth="1" /><path fill="#ff808c" stroke="#191919" strokeLinecap="round" strokeLinejoin="round" d="m19.652 9.13l1.435-1.913h1.435a.48.48 0 0 1 .478.479v.956a.48.48 0 0 1-.478.478zm-15.304 0L2.913 7.217H1.478A.48.48 0 0 0 1 7.696v.956a.48.48 0 0 0 .478.478z" strokeWidth="1" /><path fill="#808080" stroke="#191919" strokeLinecap="round" strokeLinejoin="round" d="M5.782 18.696v.956a.956.956 0 0 1-.956.957H2.913a.957.957 0 0 1-.957-.957v-.956zm16.262 0v.956a.956.956 0 0 1-.957.957h-1.913a.957.957 0 0 1-.956-.957v-.956z" strokeWidth="1" /><path stroke="#191919" strokeLinecap="round" strokeLinejoin="round" d="M22.88 12h-4.184l-.478 1.913h2.87A2.16 2.16 0 0 0 23 12.78M1.12 12h4.184l.479 1.913h-2.87A2.15 2.15 0 0 1 1 12.78" strokeWidth="1" /><path fill="#808080" stroke="#191919" strokeLinecap="round" strokeLinejoin="round" d="m18.218 13.913l-1.953.78a3 3 0 0 1-.923.177H8.174a2.4 2.4 0 0 1-.907-.215l-1.484-.742L5.305 12h13.391z" strokeWidth="1" /><path fill="#b2b2b2" stroke="#191919" strokeLinecap="round" strokeLinejoin="round" d="m5.305 18.696l.956-1.913H17.74l.956 1.913z" strokeWidth="1" /><path stroke="#191919" strokeLinecap="round" strokeLinejoin="round" d="M17.74 16.783h3.347m-18.174 0h3.348" strokeWidth="1" /></g></svg>
                                                        {activeEmojiFeild === "travel_places" && (<div className="w-[20%] mt-1 h-1 rounded-3xl bg-white/70" ></div>)}
                                                    </div>
                                                </button>
                                                <button className="w-[12.5%] h-full flex items-center  justify-center" onClick={() => { setActiveEmojiFeild("objects"); setActiveEFeild("Objects"); }}>
                                                    <div className="flex flex-col items-center">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-[40%] h-[40%]" viewBox="0 0 28 28"><g fill="none"><path fill="url(#SVGeFf7wcDq)" d="M15.525 25.992c1.208-.09 2.23-.927 2.506-2.083l1.448-6.05a.3.3 0 0 1 .088-.149C21.84 15.613 23 13.265 23 10.7C23 5.896 18.97 2 14 2s-9 3.895-9 8.7c0 2.565 1.162 4.913 3.435 7.01q.066.061.088.15l1.444 6.047l.057.201C10.386 25.226 11.46 26 12.689 26h2.621z" /><path fill="url(#SVG3u1kdbnT)" d="M15.525 25.992c1.208-.09 2.23-.927 2.506-2.083l1.448-6.05a.3.3 0 0 1 .088-.149C21.84 15.613 23 13.265 23 10.7C23 5.896 18.97 2 14 2s-9 3.895-9 8.7c0 2.565 1.162 4.913 3.435 7.01q.066.061.088.15l1.444 6.047l.057.201C10.386 25.226 11.46 26 12.689 26h2.621z" /><path fill="url(#SVGEF9bvdXB)" fillOpacity="0.2" d="M15.525 25.992c1.208-.09 2.23-.927 2.506-2.083l1.448-6.05a.3.3 0 0 1 .088-.149C21.84 15.613 23 13.265 23 10.7C23 5.896 18.97 2 14 2s-9 3.895-9 8.7c0 2.565 1.162 4.913 3.435 7.01q.066.061.088.15l1.444 6.047l.057.201C10.386 25.226 11.46 26 12.689 26h2.621z" /><path fill="url(#SVGthJLqccG)" fillOpacity="0.2" d="M15.525 25.992c1.208-.09 2.23-.927 2.506-2.083l1.448-6.05a.3.3 0 0 1 .088-.149C21.84 15.613 23 13.265 23 10.7C23 5.896 18.97 2 14 2s-9 3.895-9 8.7c0 2.565 1.162 4.913 3.435 7.01q.066.061.088.15l1.444 6.047l.057.201C10.386 25.226 11.46 26 12.689 26h2.621z" /><path fill="url(#SVGEDEatbIo)" fillOpacity="0.2" d="M15.525 25.992c1.208-.09 2.23-.927 2.506-2.083l1.448-6.05a.3.3 0 0 1 .088-.149C21.84 15.613 23 13.265 23 10.7C23 5.896 18.97 2 14 2s-9 3.895-9 8.7c0 2.565 1.162 4.913 3.435 7.01q.066.061.088.15l1.444 6.047l.057.201C10.386 25.226 11.46 26 12.689 26h2.621z" /><path fill="url(#SVGTyyduXEa)" fillOpacity="0.2" d="M15.525 25.992c1.208-.09 2.23-.927 2.506-2.083l1.448-6.05a.3.3 0 0 1 .088-.149C21.84 15.613 23 13.265 23 10.7C23 5.896 18.97 2 14 2s-9 3.895-9 8.7c0 2.565 1.162 4.913 3.435 7.01q.066.061.088.15l1.444 6.047l.057.201C10.386 25.226 11.46 26 12.689 26h2.621z" /><rect width="1.865" height="10.138" x="13.066" y="11.599" fill="url(#SVGTkdKVc1J)" rx=".932" /><rect width="1.865" height="3.599" x="13.066" y="6.798" fill="url(#SVGysatlGtA)" rx=".932" /><path fill="url(#SVGQIt36cLl)" d="M8.736 10.782a.932.932 0 0 1 1.318-1.319l1.227 1.226a.932.932 0 1 1-1.32 1.32z" /><path fill="url(#SVGa8Do9doS)" d="M19.266 10.782a.933.933 0 0 0-1.319-1.319l-1.226 1.226a.932.932 0 1 0 1.319 1.32z" /><path fill="url(#SVGIcBP9bHE)" d="M9.606 22.397h8.787l.431-1.801H9.176z" /><defs><linearGradient id="SVG3u1kdbnT" x1="14" x2="14" y1="2" y2="26" gradientUnits="userSpaceOnUse"><stop offset=".792" stopColor="#d34719" fillOpacity="0" /><stop offset=".835" stopColor="#d34719" /><stop offset="1" stopColor="#d34719" fillOpacity="0" /></linearGradient><linearGradient id="SVGTkdKVc1J" x1="13.998" x2="13.998" y1="11.599" y2="21.743" gradientUnits="userSpaceOnUse"><stop stopColor="#fff2be" /><stop offset=".437" stopColor="#ffd638" /></linearGradient><linearGradient id="SVGysatlGtA" x1="13.066" x2="14.931" y1="8.598" y2="8.598" gradientUnits="userSpaceOnUse"><stop stopColor="#fff2be" /><stop offset="1" stopColor="#ffd638" /></linearGradient><linearGradient id="SVGQIt36cLl" x1="9.384" x2="10.638" y1="11.378" y2="10.124" gradientUnits="userSpaceOnUse"><stop stopColor="#fff2be" /><stop offset="1" stopColor="#ffd638" /></linearGradient><linearGradient id="SVGa8Do9doS" x1="17.316" x2="18.56" y1="10.171" y2="11.416" gradientUnits="userSpaceOnUse"><stop stopColor="#fff2be" /><stop offset="1" stopColor="#ffd638" /></linearGradient><linearGradient id="SVGIcBP9bHE" x1="13.215" x2="14.347" y1="20.596" y2="23.595" gradientUnits="userSpaceOnUse"><stop stopColor="#ffc7a3" /><stop offset="1" stopColor="#ff9c70" /></linearGradient><radialGradient id="SVGeFf7wcDq" cx="0" cy="0" r="1" gradientTransform="rotate(73.984 1.108 7.487)scale(21.4494 32.65)" gradientUnits="userSpaceOnUse"><stop stopColor="#ffe06b" /><stop offset=".376" stopColor="#ffa43d" /><stop offset="1" stopColor="#e67505" /></radialGradient><radialGradient id="SVGEF9bvdXB" cx="0" cy="0" r="1" gradientTransform="rotate(46.818 -8.363 17.31)scale(2.38769 1.90901)" gradientUnits="userSpaceOnUse"><stop offset=".165" stopColor="#741c06" /><stop offset=".854" stopColor="#741c06" fillOpacity="0" /></radialGradient><radialGradient id="SVGthJLqccG" cx="0" cy="0" r="1" gradientTransform="matrix(0 3.00822 -2.25616 0 14 8.93)" gradientUnits="userSpaceOnUse"><stop offset=".165" stopColor="#741c06" /><stop offset=".854" stopColor="#741c06" fillOpacity="0" /></radialGradient><radialGradient id="SVGEDEatbIo" cx="0" cy="0" r="1" gradientTransform="rotate(133.802 6.55 9.575)scale(2.8674 2.15055)" gradientUnits="userSpaceOnUse"><stop offset=".165" stopColor="#741c06" /><stop offset=".854" stopColor="#741c06" fillOpacity="0" /></radialGradient><radialGradient id="SVGTyyduXEa" cx="0" cy="0" r="1" gradientTransform="matrix(-2.29826 0 0 -6.61925 14 16.058)" gradientUnits="userSpaceOnUse"><stop offset=".165" stopColor="#741c06" /><stop offset=".777" stopColor="#741c06" fillOpacity="0" /></radialGradient></defs></g></svg>
                                                        {activeEmojiFeild === "objects" && (<div className="w-[20%] mt-1 h-1 rounded-3xl bg-white/70" ></div>)}
                                                    </div>
                                                </button>
                                                <button className="w-[12.5%] h-full flex items-center  justify-center" onClick={() => { setActiveEmojiFeild("symbols"); setActiveEFeild("Symbols"); }}>
                                                    <div className="flex flex-col items-center">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-[40%] h-[40%]" viewBox="0 0 48 48"><g fill="none"><path fill="url(#SVG1hh7icZR)" d="M21.263 10.178a10.77 10.77 0 0 0-12.575-.296c-5.65 3.866-6.308 11.953-1.357 16.681l15.806 15.092a1.25 1.25 0 0 0 1.726 0l15.803-15.091c4.952-4.728 4.293-12.816-1.358-16.681a10.77 10.77 0 0 0-12.577.298L24 12.246z" /><defs><linearGradient id="SVG1hh7icZR" x1="-4.752" x2="15.69" y1="-1.713" y2="42.43" gradientUnits="userSpaceOnUse"><stop stopColor="#f97dbd" /><stop offset="1" stopColor="#d7257d" /></linearGradient></defs></g></svg>
                                                        {activeEmojiFeild === "symbols" && (<div className="w-[20%] mt-1 h-1 rounded-3xl bg-white/70" ></div>)}
                                                    </div>
                                                </button>
                                                <button className="w-[12.5%] h-full flex items-center  justify-center" onClick={() => { setActiveEmojiFeild("flags"); setActiveEFeild("Flags"); }}>
                                                    <div className="flex flex-col items-center">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-[40%] h-[40%]" viewBox="0 0 32 32"><g fill="none"><path fill="url(#SVGjc3ufb1q)" d="M6 29a1 1 0 0 1-1-1v-9h2v9a1 1 0 0 1-1 1" /><path fill="url(#SVGDiak0brK)" d="M5 4.5A1.5 1.5 0 0 1 6.5 3H28a1 1 0 0 1 .8 1.6L23.25 12l5.55 7.4A1 1 0 0 1 28 21H6.5A1.5 1.5 0 0 1 5 19.5z" /><defs><linearGradient id="SVGjc3ufb1q" x1="7" x2="6.235" y1="32.214" y2="19.363" gradientUnits="userSpaceOnUse"><stop stopColor="#889096" /><stop offset="1" stopColor="#63686e" /></linearGradient><linearGradient id="SVGDiak0brK" x1="-.25" x2="9.688" y1="-2.143" y2="22.178" gradientUnits="userSpaceOnUse"><stop stopColor="#f97dbd" /><stop offset="1" stopColor="#d7257d" /></linearGradient></defs></g></svg>
                                                        {activeEmojiFeild === "flags" && (<div className="w-[20%] mt-1 h-1 rounded-3xl bg-white/70" ></div>)}
                                                    </div>
                                                </button>
                                            </div>

                                            <h2 className="text-white text-xl font-extrabold text-gray-800 m-3">{activeEFeild}</h2>

                                            {/* Emoji Grid */}
                                            <div className="grid grid-cols-12 gap-2  h-[380px] overflow-y-auto pr-2 custom-scrollbar">
                                                {emojis[activeEmojiFeild].map((emoji, index) => (
                                                    <button
                                                        key={`${emoji}-${index}`}
                                                        onClick={() => handleEmojiClick(emoji)}
                                                        className="text-xl m-1 scale-[1.8]  transition"
                                                    >
                                                        {emoji}
                                                    </button>
                                                ))}
                                            </div>

                                        </div>
                                    </div>
                                )
                            }
                            {
                                isMsgOptionTabOpen && (<div ref={pickerRef} className="border-t border-white/10 p-3 md:p-4 bg-white/[0.03] backdrop-blur-2xl flex gap-[20px] items-center justify-center">
                                    <div className="flex items-center justify-center gap-2">
                                        <h2 className="text-green-500"> Message By : <span className="text-white mr-2 ml-1">{msgBY}</span>  </h2>
                                        <div className="border border-gray-500  rounded-full ">
                                            <img src={msgProfile} alt="" className="w-[50px] rounded-full" />
                                        </div>
                                    </div>
                                    <div onClick={() => { setIsCopied(true); handleCopy(msg) }}>{isCopied ? (<div className="border border-gray-500 px-4 py-2 rounded-3xl  bg-green-700 flex items-center jutify-center gap-1"> <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 16 16"><polyline fill="none" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} points="2.75 8.75 6.25 12.25 13.25 4.75"></polyline></svg> Copied</div>) : (<div className="border border-gray-500 px-4 py-2 rounded-3xl hover:bg-gray-400/30 flex items-center jutify-center gap-1"> <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24"><g fill="none"><path fill="currentColor" d="M8 7h12v12a2 2 0 0 1-2 2h-8a2 2 0 0 1-2-2z" opacity={0.16}></path><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 3H4v13"></path><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12v12a2 2 0 0 1-2 2h-8a2 2 0 0 1-2-2z"></path></g></svg>Copy</div>)}</div>
                                    <div className="border border-gray-500 px-4 py-2 rounded-3xl hover:bg-gray-400/30 flex items-center jutify-center gap-1"><svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 16 16"><path fill="currentColor" d="M13 7a6 6 0 1 0-5.746 5.995A4.5 4.5 0 0 1 7.027 12H7a5 5 0 1 1 5-5v.027q.518.06.995.227Q13 7.128 13 7m-5.888 3.498q.127-.554.38-1.046q-.24.047-.492.048c-.74 0-1.405-.321-1.864-.833a.5.5 0 0 0-.745.666a3.5 3.5 0 0 0 2.72 1.165M6 6a.75.75 0 1 1-1.5 0A.75.75 0 0 1 6 6m2.75.75a.75.75 0 1 0 0-1.5a.75.75 0 0 0 0 1.5M15 11.5a3.5 3.5 0 1 1-7 0a3.5 3.5 0 0 1 7 0m-3-2a.5.5 0 0 0-1 0V11H9.5a.5.5 0 0 0 0 1H11v1.5a.5.5 0 0 0 1 0V12h1.5a.5.5 0 0 0 0-1H12z"></path></svg>React</div>
                                    <div className="border border-gray-500 px-4 py-2 rounded-3xl hover:bg-gray-400/30 flex items-center jutify-center gap-1"><svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24"><path fill="currentColor" d="M18.483 16.767A8.5 8.5 0 0 1 8.118 7.081a1 1 0 0 1-.113.097c-.28.213-.63.292-1.33.45l-.635.144c-2.46.557-3.69.835-3.983 1.776c-.292.94.546 1.921 2.223 3.882l.434.507c.476.557.715.836.822 1.18c.107.345.071.717-.001 1.46l-.066.677c-.253 2.617-.38 3.925.386 4.506s1.918.052 4.22-1.009l.597-.274c.654-.302.981-.452 1.328-.452s.674.15 1.329.452l.595.274c2.303 1.06 3.455 1.59 4.22 1.01c.767-.582.64-1.89.387-4.507z"></path><path fill="currentColor" d="m9.153 5.408l-.328.588c-.36.646-.54.969-.82 1.182q.06-.045.113-.097a8.5 8.5 0 0 0 10.366 9.686l-.02-.19c-.071-.743-.107-1.115 0-1.46c.107-.344.345-.623.822-1.18l.434-.507c1.677-1.96 2.515-2.941 2.222-3.882c-.292-.941-1.522-1.22-3.982-1.776l-.636-.144c-.699-.158-1.049-.237-1.33-.45c-.28-.213-.46-.536-.82-1.182l-.327-.588C13.58 3.136 12.947 2 12 2s-1.58 1.136-2.847 3.408" opacity={0.5}></path></svg>Star</div>

                                    {msgById === user._id && (<div className="border border-gray-500 px-4 py-2 rounded-3xl hover:bg-gray-400/30 flex items-center jutify-center gap-1 cursor-pointer" onClick={() => { setDeleteType("Everyone") }}><svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth={1.5}><path d="m19.5 5.5l-.402 6.506M4.5 5.5l.605 10.025c.154 2.567.232 3.85.874 4.774c.317.456.726.842 1.2 1.131c.671.41 1.502.533 2.821.57"></path><path strokeLinejoin="round" d="m20 15l-7 7m7 0l-7-7"></path><path d="M3 5.5h18m-4.944 0l-.683-1.408c-.453-.936-.68-1.403-1.071-1.695a2 2 0 0 0-.275-.172C13.594 2 13.074 2 12.035 2c-1.066 0-1.599 0-2.04.234a2 2 0 0 0-.278.18c-.395.303-.616.788-1.058 1.757L8.053 5.5" ></path></g></svg>Delete For Everyone</div>)}
                                    <div className="border border-gray-500 px-4 py-2 rounded-3xl hover:bg-gray-400/30 flex items-center jutify-center gap-1 cursor-pointer" onClick={() => { setDeleteType("Me") }}><svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth={1.5} d="m19.5 5.5l-.62 10.025c-.158 2.561-.237 3.842-.88 4.763a4 4 0 0 1-1.2 1.128c-.957.584-2.24.584-4.806.584c-2.57 0-3.855 0-4.814-.585a4 4 0 0 1-1.2-1.13c-.642-.922-.72-2.205-.874-4.77L4.5 5.5M9 11.735h6m-4.5 3.919h3M3 5.5h18m-4.945 0l-.682-1.408c-.454-.936-.68-1.403-1.071-1.695a2 2 0 0 0-.275-.172C13.594 2 13.074 2 12.034 2c-1.065 0-1.598 0-2.039.234a2 2 0 0 0-.278.18c-.396.303-.617.788-1.059 1.757L8.053 5.5"></path></svg>Delete For Me</div>
                                </div>)
                            }

                            <div className="border-t border-white/10 p-1 md:p-2 bg-white/[0.03]">

                                <div className="flex items-center gap-1 ">
                                    <button className="p-2.5 hover:bg-white/5 rounded-xl transition-all duration-300 text-white/60 hover:text-white/90">
                                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><path fill="currentColor" d="M11.288 20.713Q11 20.425 11 20v-7H4q-.425 0-.712-.288T3 12t.288-.712T4 11h7V4q0-.425.288-.712T12 3t.713.288T13 4v7h7q.425 0 .713.288T21 12t-.288.713T20 13h-7v7q0 .425-.288.713T12 21t-.712-.288"></path></svg>
                                    </button>
                                    <button className="p-2.5 hover:bg-white/5 rounded-xl transition-all mr-3 duration-300 text-white/60 hover:text-white/90" onClick={() => setShowPicker((prev) => !prev)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 16 16">
                                            <path fill="currentColor" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16M2.31 5.243A1 1 0 0 1 3.28 4H6a1 1 0 0 1 1 1v.116A4.2 4.2 0 0 1 8 5c.35 0 .69.04 1 .116V5a1 1 0 0 1 1-1h2.72a1 1 0 0 1 .97 1.243l-.311 1.242A2 2 0 0 1 11.439 8H11a2 2 0 0 1-1.994-1.839A3 3 0 0 0 8 6c-.393 0-.74.064-1.006.161A2 2 0 0 1 5 8h-.438a2 2 0 0 1-1.94-1.515zM4.969 9.75A3.5 3.5 0 0 0 8 11.5a3.5 3.5 0 0 0 3.032-1.75a.5.5 0 1 1 .866.5A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1-3.898-2.25a.5.5 0 0 1 .866-.5z" />
                                        </svg>
                                    </button>
                                    {/* INPUT */}
                                    <div className="flex-1 mr-3 relative">
                                        <input
                                            value={messageText}
                                            onChange={(e) => setMessageText(e.target.value)}
                                            onKeyDown={handleKeyDown}
                                            type="text"
                                            placeholder="Type a message..."
                                            className="w-full text-white bg-white/[0.05] border border-white/10 rounded-xl px-4 py-2.5 md:py-3 outline-none focus:border-blue-500/50 text-xl transition-all placeholder-white/40 pr-24 backdrop-blur-md"
                                        />
                                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-white/20 font-mono">
                                            {messageText.length}/500
                                        </span>
                                    </div>
                                    {/* SEND BUTTON - Premium */}
                                    <button
                                        onClick={sendMessage}
                                        className="bg-gradient-to-r mr-5 from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-5 py-3 rounded-xl text-white text-sm font-medium transition-all duration-300   flex items-center gap-2 group"
                                    >
                                        <span>Send</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 24 24" className="group-hover:translate-x-0.5 transition-transform">
                                            <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                    }
                </div >
            </div >


        </div >
    );
}
export default Discussions;

