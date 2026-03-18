import { useRef } from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../Pages/auth/baseURL";
import { addConnectionUser } from "../utils/connectionSlice";
import { setChatUsers } from "../utils/chatUserSlice";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
const Discussions = () => {
    //using the dispatch 
    const dispatch = useDispatch();
    const socketRef = useRef(null);

    const connections = useSelector(state => state.connections?.users || []);
    const user = useSelector(state => state.user?.user?.DATA);

    //chats 
    const chatMessages = useSelector(
        state => state?.chats?.users || []

    );
    const currentUserId = user._id;
    //chats api
    const convo = async () => {
        try {
            const response = await axios.post(
                `${BASE_URL}/get-convo`, {},
                { withCredentials: true }
            );

            //chats dispatching
            dispatch(setChatUsers(response.data.conversation));
        } catch (err) {
            console.error(err?.message || err);
        }
    };
    useEffect(() => {
        convo();
    }, []);


    //onclicking outer box focusing in the input box
    //for the ui optimization
    const inputRef = useRef(null);
    const focusInput = () => {
        inputRef.current.focus();
    }



    const [messages, setMessages] = useState([]);
    const [messageText, setMessageText] = useState("");
    const [typingUser, setTypingUser] = useState(false);

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

    //for switching between the teams and connections
    const [section, setSection] = useState(1);




    // // onsending the message it goes to down 
    const bottomRef = useRef(null);
    const [scrollDown, setScrollDown] = useState(false);
    const chatRef = useRef(null);
    const prevScrollTop = useRef(0);
    useEffect(() => {
        const container = chatRef.current;
        if (!container) return;
        const handleScroll = () => {
            const currentScrollTop = container.scrollTop;

            if (currentScrollTop < prevScrollTop.current) {
                setScrollDown(true); // scrolling up
            } else {
                setScrollDown(false); // scrolling down
            }

            prevScrollTop.current = currentScrollTop;
        };
        container.addEventListener("scroll", handleScroll);
        return () => container.removeEventListener("scroll", handleScroll);
    }, []);
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

            const res = await axios.post(
                `${BASE_URL}/get-message/${conversationId}`,
                {},
                { withCredentials: true }
            );

            const msgs = res.data.messages;


            setMessages(msgs.map(m => ({ ...m, status: "sent" })));

            const messageIds = msgs
                .filter(m => m.receiver._id === currentUserId)
                .map(m => m._id);

            // if (messageIds.length) {
            //     await axios.post(
            //         `${BASE_URL}/mark-read`,
            //         { messageIds },
            //         { withCredentials: true }
            //     );
            // }

        } catch (error) {
            console.log(error);
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
        <div className="w-screen h-[calc(100vh-50px)] flex bg-[#0A0A0F] text-white font-sans antialiased">
            {/* LEFT SIDEBAR - Premium Glass Morphism */}
            <div className="w-[400px] flex-shrink-0 border-r border-white/5 flex flex-col px-4 py-6 gap-5 bg-[#0B0B10] backdrop-blur-md relative overflow-hidden">

                <div className="relative z-10">
                    {/* SEARCH BAR - Premium */}
                    <div
                        onClick={focusInput}
                        className="group flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-3.5 rounded-2xl backdrop-blur-md hover:border-blue-500/50 focus-within:border-blue-500 transition-all duration-300 shadow-lg shadow-black/50"
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
                    <div className="mt-6 p-1 bg-white/5 rounded-2xl border border-white/10">
                        <div className="flex relative">
                            <div className={`absolute top-0 h-full w-1/2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl transition-transform duration-300 shadow-lg  `}></div>
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
                                className="group relative flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-all duration-300 cursor-pointer border border-transparent hover:border-white/10"
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
                                    loadMessages(item.LastMsg.conversation);
                                }}
                            >
                                {/* Online indicator */}
                                <div className="relative">
                                    <img
                                        src={item.atFrontUser?.photoUrl?.url}
                                        alt="profile"
                                        className="w-14 h-14 rounded-full object-cover ring-2 ring-white/10 group-hover:ring-blue-500/50 transition-all duration-300"
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
                                        {item.LastMsg.content || "Hey! let's collab"}
                                    </p>
                                </div>

                                {/* Unread badge - commented but styled */}
                                {(item.unReadCount != 0 && item.atFrontUser.username == user.username) && (
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white text-xs flex items-center justify-center shadow-lg">
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
                    </div>
                </div>
            </div>

            {/* RIGHT CHAT AREA - Premium Design */}
            <div ref={chatRef} className="flex-1 p-4">
                <div className="w-[calc(100vw-400px)] h-full rounded-3xl bg-gradient-to-b from-[#0C0C14] to-[#080810] border border-white/10  flex flex-col overflow-hidden  relative">

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
                            <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar bg-[#0A0A0F]">
                                {messages.map((msg, index) => {
                                    const isMe = msg.sender._id === currentUserId;

                                    return isMe ? (
                                        // MY MESSAGE - Premium
                                        <div key={msg._id} className="flex justify-end animate-fadeIn">
                                            <div className="relative max-w-[70%] group">
                                                <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white px-5 py-3 rounded-2xl rounded-br-md shadow-lg ">
                                                    <div className="break-words whitespace-pre-wrap text-[15px] leading-relaxed pr-8">
                                                        {msg.content}
                                                    </div>
                                                    <div className="flex justify-end items-center gap-1 mt-1">
                                                        <span className="text-[10px] text-white/60">
                                                            {new Date(msg.createdAt).toLocaleTimeString([], {
                                                                hour: "2-digit",
                                                                minute: "2-digit",
                                                            })}
                                                        </span>
                                                        <span className="text-white/60">
                                                            {msg.status === "sending" && <span><svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24"><path fill="none" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="m5 14l3.5 3.5L19 6.5"></path></svg></span>}
                                                            {msg.status === "sent" && <span><svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24"><path fill="none" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.5 13.833L6 17.5l1.024-1.073M16.5 6.5l-6.063 6.352m-2.937.981L11 17.5l10.5-11"></path></svg></span>}
                                                            {msg.status === "failed" && <span><svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 16 16"><g fill="none"><path fill="url(#SVG46elwcsk)" d="M2 8a6 6 0 1 1 12 0A6 6 0 0 1 2 8"></path><path fill="url(#SVGQMDY1c6m)" d="M8 10a.75.75 0 1 0 0 1.5a.75.75 0 0 0 0-1.5m0-5.5a.5.5 0 0 0-.492.41L7.5 5v3.5l.008.09a.5.5 0 0 0 .984 0L8.5 8.5V5l-.008-.09A.5.5 0 0 0 8 4.5"></path><defs><linearGradient id="SVG46elwcsk" x1={3.875} x2={11.75} y1={0.125} y2={15.125} gradientUnits="userSpaceOnUse"><stop stopColor="#ffcd0f"></stop><stop offset={1} stopColor="#fe8401"></stop></linearGradient><linearGradient id="SVGQMDY1c6m" x1={6} x2={9.213} y1={4.5} y2={11.844} gradientUnits="userSpaceOnUse"><stop stopColor="#4a4a4a"></stop><stop offset={1} stopColor="#212121"></stop></linearGradient></defs></g></svg></span>}
                                                        </span>
                                                    </div>
                                                </div>
                                                {/* Message tail */}
                                                <div className="absolute bottom-0 right-[-8px] w-4 h-4 bg-blue-600 clip-message-tail"></div>
                                            </div>
                                        </div>
                                    ) : (
                                        // OTHER USER MESSAGE - Premium
                                        <div key={msg._id} className="flex gap-3 animate-fadeIn">
                                            <img
                                                src={msg.sender?.photoUrl?.url}
                                                className="w-8 h-8 rounded-full object-cover ring-2 ring-white/10 self-end"
                                            />
                                            <div className="relative max-w-[70%] group">
                                                <div className="bg-[#1A1A24] text-white px-5 py-3 rounded-2xl rounded-bl-md bg-[#1A1A22]">
                                                    <div className="break-words whitespace-pre-wrap text-[15px] leading-relaxed">
                                                        {msg.content}
                                                    </div>
                                                    <div className="text-right mt-1">
                                                        <span className="text-[10px] text-white/40">
                                                            {new Date(msg.createdAt).toLocaleTimeString([], {
                                                                hour: "2-digit",
                                                                minute: "2-digit",
                                                            })}
                                                        </span>
                                                    </div>
                                                </div>
                                                {/* Message tail */}
                                                <div className="absolute bottom-0 left-[-8px] w-4 h-4 bg-[#1A1A24] clip-message-tail-left border-l border-b border-white/5"></div>
                                            </div>
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
                            <div className="border-t border-white/10 p-4 bg-[#0C0C14]/80 backdrop-blur-xl">
                                <div className="flex items-center gap-3">
                                    {/* EMOJI BUTTON */}
                                    <button className="p-2.5 hover:bg-white/5 rounded-xl transition-all duration-300 text-white/60 hover:text-white/90">
                                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 16 16">
                                            <path fill="currentColor" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16M2.31 5.243A1 1 0 0 1 3.28 4H6a1 1 0 0 1 1 1v.116A4.2 4.2 0 0 1 8 5c.35 0 .69.04 1 .116V5a1 1 0 0 1 1-1h2.72a1 1 0 0 1 .97 1.243l-.311 1.242A2 2 0 0 1 11.439 8H11a2 2 0 0 1-1.994-1.839A3 3 0 0 0 8 6c-.393 0-.74.064-1.006.161A2 2 0 0 1 5 8h-.438a2 2 0 0 1-1.94-1.515zM4.969 9.75A3.5 3.5 0 0 0 8 11.5a3.5 3.5 0 0 0 3.032-1.75a.5.5 0 1 1 .866.5A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1-3.898-2.25a.5.5 0 0 1 .866-.5z" />
                                        </svg>
                                    </button>

                                    {/* INPUT */}
                                    <div className="flex-1 relative">
                                        <input
                                            value={messageText}
                                            onChange={(e) => setMessageText(e.target.value)}
                                            onKeyDown={handleKeyDown}
                                            type="text"
                                            placeholder="Type a message..."
                                            className="w-full text-white bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-blue-500/50 text-sm transition-all placeholder-white/40 pr-24"
                                        />
                                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-white/20 font-mono">
                                            {messageText.length}/500
                                        </span>
                                    </div>

                                    {/* SEND BUTTON - Premium */}
                                    <button
                                        onClick={sendMessage}
                                        className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-5 py-3 rounded-xl text-white text-sm font-medium transition-all duration-300 shadow-lg  flex items-center gap-2 group"
                                    >
                                        <span>Send</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 24 24" className="group-hover:translate-x-0.5 transition-transform">
                                            <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Scroll to bottom button - Premium */}
            <div
                onClick={() => bottomRef.current?.scrollIntoView({ behavior: "smooth" })}
                className={`fixed bottom-24 right-8 transition-all duration-300 z-50 ${scrollDown ? "opacity-100 " : "opacity-0  pointer-events-none"
                    }`}
            >
                <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-3 rounded-full shadow-xl   hover:shadow-blue-500/40 cursor-pointer  transition-all duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24">
                        <path fill="none" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v14m-6-6l6 6 6-6" />
                    </svg>
                </div>
            </div>
        </div>
    );
}
export default Discussions;

