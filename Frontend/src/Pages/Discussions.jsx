import { useRef } from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../Pages/auth/baseURL";
import { addConnectionUser } from "../utils/connectionSlice";
import { addChatsUser } from "../utils/chatUserSlice";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
const Discussions = () => {
    const socketRef = useRef(null);

    const user = useSelector(store => store.user.user.DATA);
    const connections = useSelector(state => state.connections.users || []);
    const chatsUsers = useSelector(state => state.chats.users || []);




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


    //onclicking outer box focusing in the input box
    const inputRef = useRef(null);
    const focusInput = () => {
        inputRef.current.focus();
    }

    // onsending the message it goes to down 
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





    const currentUserId = user?._id;

    useEffect(() => {

        socketRef.current = io(BASE_URL, {
            withCredentials: true
        });
        if (!currentUserId) return;
        socketRef.current.on("connect", () => {
            console.log("Socket Connected:", socketRef.current.id);

            if (currentUserId) {
                socketRef.current.emit("userConnected", currentUserId);
            }
        });

        socketRef.current.on("user_typing", (data) => {
            setTypingUser(data.isTyping);
        });

        socketRef.current.on("receiveMessage", (message) => {

            setMessages(prev => {

                const exists = prev.some(m => m._id === message._id);
                if (exists) return prev;

                return [...prev, message];
            });

        });
        return () => {
            socketRef.current.disconnect();
        };

    }, [currentUserId]);



    const sendMessage = async () => {
        if (!messageText.trim()) return;

        const tempId = Date.now(); // temporary unique id

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

            if (messageIds.length) {
                await axios.post(
                    `${BASE_URL}/mark-read`,
                    { messageIds },
                    { withCredentials: true }
                );
            }

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

    const handleTyping = () => {

        socketRef.current.emit("typing_start", {
            conversationId: chatingUserId,
            receiverId: chatingUserId
        });

    };




    const makeReset = () => {
        setIsProfileOpen(false);
        setSelectedUserID(null);
    }
    const dispatch = useDispatch();


    //fetching the connections 
    const chats = async () => {
        try {
            const response = await axios.get(
                `${BASE_URL}/chats`,
                { withCredentials: true }
            );
            dispatch(addChatsUser(response.data.data));


        } catch (err) {
            console.error(err?.message || err);
        }
    };


    const convo = async () => {
        try {
            const response = await axios.get(
                `${BASE_URL}/chats`,
                { withCredentials: true }
            );
            dispatch(addChatsUser(response.data.data));
        } catch (err) {
            console.error(err?.message || err);
        }
    };
    useEffect(() => {
        chats();
    }, []);

    //fetching the connections 
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



    return (


        <div className="w-screen h-[calc(100vh-50px)] flex bg-black text-white">

            {/* LEFT SIDEBAR */}
            <div className=" w-[380px] border-r border-zinc-800 flex flex-col px-5 py-6 gap-6 bg-gradient-to-b from-zinc-950 to-zinc-900 backdrop-blur-xl ">

                {/* SEARCH BAR */}
                <div
                    onClick={focusInput}
                    className=" flex items-center gap-3 bg-zinc-900/80 border border-zinc-800 px-4 py-3 rounded-2xl backdrop-blur-md hover:border-blue-500 focus-within:border-blue-500 transition-all duration-200 shadow-sm "
                >

                    <svg xmlns="http://www.w3.org/2000/svg" width={22} height={22} viewBox="0 0 24 24">
                        <path fill="#9ca3af" d="M10.5 2a8.5 8.5 0 1 0 5.262 15.176l3.652 3.652a1 1 0 0 0 1.414-1.414l-3.652-3.652A8.5 8.5 0 0 0 10.5 2" />
                    </svg>

                    <input
                        ref={inputRef}
                        type="text"
                        placeholder="Search or start a new collab..."
                        className="flex-1 bg-transparent outline-none text-sm placeholder-gray-400"
                    />

                    <svg xmlns="http://www.w3.org/2000/svg" width={32} height={32} viewBox="0 0 24 24">
                        <path fill="#f7f7f7" d="M19 10a3 3 0 0 1 3 3v3a3 3 0 0 1-3 3v.966c0 1.06-1.236 1.639-2.05.96L14.638 19H12a3 3 0 0 1-3-3v-3a3 3 0 0 1 3-3z" className="duoicon-secondary-layer" opacity={0.3}></path>
                        <path fill="#f7f7f7" d="M16 4a3 3 0 0 1 3 3v1h-8a4 4 0 0 0-4 4v4c0 1.044.4 1.996 1.056 2.708L7 19.5c-.824.618-2 .03-2-1V17a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3z" className="duoicon-primary-layer"></path>
                    </svg>

                </div>

                <div className="border-t border-zinc-800"></div>

                {/* SECTION TOGGLE */}
                <div className="flex bg-zinc-900 rounded-xl p-1">

                    <button
                        onClick={() => setSection(1)}
                        className={`flex-1 py-2 rounded-lg text-sm font-medium transition 
                ${section === 1
                                ? "bg-blue-600 text-white shadow-md"
                                : "text-gray-400 hover:text-white"
                            }`}
                    >
                        Connections
                    </button>

                    <button
                        onClick={() => setSection(2)}
                        className={`flex-1 py-2 rounded-lg text-sm font-medium transition 
                ${section === 2
                                ? "bg-blue-600 text-white shadow-md"
                                : "text-gray-400 hover:text-white"
                            }`}
                    >
                        Teams
                    </button>

                </div>

                {/* LIST AREA */}
                <div className="flex-1 overflow-y-auto text-gray-400 text-sm pr-1 scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent">
                    {chatsUsers.map((item) => (
                        <li

                            className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-zinc-800/70 transition-all duration-200 cursor-pointer"
                            onClick={() => {

                                setMessages([]);
                                setchatActive(true);
                                setChatingPhotoUrl(item.otherUser?.photoUrl?.url);
                                setChatingUserId(item.otherUser?._id);
                                setChatingFirstName(item.otherUser?.firstName);
                                setChatingLastName(item.otherUser?.lastName);
                                setChatingUsername(item.otherUser?.username);
                                setChatingGmail(item.otherUser?.gmail);
                                setChatingMiddleName(item.otherUser?.middleName);
                                loadMessages(item.chatId);

                            }}
                        >
                            <img
                                src={item.otherUser?.photoUrl?.url}
                                alt="profile"
                                className="w-[50px] h-[50px] rounded-full object-cover"
                            />
                            <div className="flex justify-between w-full items-center">
                                <div className="flex flex-col">
                                    <span className="text-white text-xl font-medium">
                                        {item.otherUser?.firstName} {item.otherUser?.lastName}
                                    </span>
                                    <span className="text-gray-400 text-sm pl-1">
                                        {item.lastMsg && (<span>{item.lastMsg}</span>)}
                                        {!item.lastMsg && (<span>Hey! let's collab</span>)}
                                    </span>
                                </div>

                                {item.unReadCount != 0 && (<div className="h-6 w-6 rounded-full bg-blue-500/90 text-white flex justify-center items-center" >
                                    {item.unReadCount}
                                </div>)}
                            </div>
                        </li>

                    ))}
                    <div className="text-white text-2xl mt-4 ml-1 flex gap-2  items-center">Start Collabing! <svg xmlns="http://www.w3.org/2000/svg" width={25} height={25} viewBox="0 0 24 24">
                        <path fill="none" stroke="#f7f7f7" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 12h2.5M20 12l-6-6m6 6l-6 6m6-6H9.5"></path>
                    </svg></div>
                    {chatsUsers.map((chats) =>
                        connections.map((item) =>
                            chats.otherUser?._id !== item.userId ? (
                                <li
                                    key={item.otherUser?._id}
                                    className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-zinc-800 cursor-pointer transition"
                                    onClick={() => {
                                        setMessages([]);
                                        setchatActive(true);
                                        setChatingPhotoUrl(item.photoUrl);
                                        setChatingUserId(item._id);
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
                            ) : null
                        )
                    )}
                </div>
            </div>

            {/* RIGHT CHAT AREA */}
            <div
                ref={chatRef}
                className="flex-1 p-6">

                <div className=" w-full h-full border border-zinc-800 rounded-3xl bg-gradient-to-b from-zinc-900/80 to-zinc-950 backdrop-blur-xl shadow-2xl flex flex-col overflow-hidden ">

                    {!chatActive && < span > Select a conversation to start chatting</span>}
                    {chatActive && (
                        <div className="flex flex-col w-full h-full">

                            {/* TOP HEADER */}
                            <div className="sticky top-0 z-10 w-full border-b border-zinc-800 
                flex items-center justify-between px-6 py-3
                bg-zinc-900/70 backdrop-blur ">

                                <div className="flex items-center gap-3">
                                    <img
                                        src={chatingPhotoUrl}
                                        className="w-10 h-10 rounded-full object-cover"
                                    />

                                    <div>
                                        <div className="text-white font-medium">
                                            {chatingFirstName} {chatingLastName}
                                        </div>

                                        <div className="text-xs text-green-400">
                                            Online
                                        </div>
                                    </div>
                                </div>

                                {/* 3 DOT MENU */}
                                <div className="cursor-pointer hover:bg-zinc-800 p-2 rounded-lg transition">
                                    <svg xmlns="http://www.w3.org/2000/svg" width={22} height={22} viewBox="0 0 24 24">
                                        <circle cx="12" cy="5" r="2" fill="white" />
                                        <circle cx="12" cy="12" r="2" fill="white" />
                                        <circle cx="12" cy="19" r="2" fill="white" />
                                    </svg>
                                </div>

                            </div>



                            <div className="relative flex flex-col overflow-y-auto p-4 space-y-3 bg-[#0b141a] scrollbar-thin scrollbar-thumb-zinc-700">

                                {messages.map((msg, index) => {
                                    const isMe = msg.sender._id === currentUserId;

                                    return isMe ? (
                                        // ✅ MY MESSAGE
                                        <div key={msg._id} className="flex justify-end animate-fadeIn">
                                            <div className="bg-[#005c4b] flex gap-1 w-fit max-w-[75%] text-white px-4 py-2 
                  rounded-2xl rounded-br-md text-lg shadow-md">

                                                <div className="break-all whitespace-pre-wrap">
                                                    {msg.content}
                                                </div>

                                                <div className="flex justify-end mt-1 h-full pt-2 items-end text-xs opacity-80">
                                                    {msg.status === "sending" && <span><svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24"><path fill="none" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="m5 14l3.5 3.5L19 6.5"></path></svg></span>}
                                                    {msg.status === "sent" && <span><svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24"><path fill="none" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.5 13.833L6 17.5l1.024-1.073M16.5 6.5l-6.063 6.352m-2.937.981L11 17.5l10.5-11"></path></svg></span>}
                                                    {msg.status === "failed" && <span><svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 16 16"><g fill="none"><path fill="url(#SVG46elwcsk)" d="M2 8a6 6 0 1 1 12 0A6 6 0 0 1 2 8"></path><path fill="url(#SVGQMDY1c6m)" d="M8 10a.75.75 0 1 0 0 1.5a.75.75 0 0 0 0-1.5m0-5.5a.5.5 0 0 0-.492.41L7.5 5v3.5l.008.09a.5.5 0 0 0 .984 0L8.5 8.5V5l-.008-.09A.5.5 0 0 0 8 4.5"></path><defs><linearGradient id="SVG46elwcsk" x1={3.875} x2={11.75} y1={0.125} y2={15.125} gradientUnits="userSpaceOnUse"><stop stopColor="#ffcd0f"></stop><stop offset={1} stopColor="#fe8401"></stop></linearGradient><linearGradient id="SVGQMDY1c6m" x1={6} x2={9.213} y1={4.5} y2={11.844} gradientUnits="userSpaceOnUse"><stop stopColor="#4a4a4a"></stop><stop offset={1} stopColor="#212121"></stop></linearGradient></defs></g></svg></span>}
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        // ✅ OTHER USER MESSAGE
                                        <div key={msg._id} className="flex items-end gap-2 animate-fadeIn">

                                            <img
                                                src={msg.sender?.photoUrl?.url}
                                                className="w-8 h-8 rounded-full object-cover"
                                            />

                                            <div className="bg-[#202c33] w-fit max-w-[75%] text-white px-4 py-2 
                  rounded-2xl rounded-bl-md text-lg shadow-sm">

                                                <div className="break-all whitespace-pre-wrap">
                                                    {msg.content}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}

                                {/* 🔽 Scroll to bottom button */}
                                <div
                                    onClick={() => bottomRef.current?.scrollIntoView({ behavior: "smooth" })}
                                    className={`fixed bottom-6 right-6 transition-all duration-300 ${scrollDown ? "opacity-100 scale-100" : "opacity-0 scale-75 pointer-events-none"
                                        }`}
                                >
                                    <div className="bg-[#202c33] p-2 rounded-full shadow-lg hover:bg-[#2a3942] cursor-pointer">
                                        ⬇️
                                    </div>
                                </div>

                                <div ref={bottomRef}></div>
                            </div>
                            {/* TYPING AREA */}
                            <div className="border-t border-zinc-800 p-4 flex items-center gap-3">

                                {/* EMOJI BUTTON */}
                                <button className="hover:bg-zinc-800 p-2 rounded-lg transition">
                                    <svg xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 16 16">
                                        <path fill="#f7f7f7" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16M2.31 5.243A1 1 0 0 1 3.28 4H6a1 1 0 0 1 1 1v.116A4.2 4.2 0 0 1 8 5c.35 0 .69.04 1 .116V5a1 1 0 0 1 1-1h2.72a1 1 0 0 1 .97 1.243l-.311 1.242A2 2 0 0 1 11.439 8H11a2 2 0 0 1-1.994-1.839A3 3 0 0 0 8 6c-.393 0-.74.064-1.006.161A2 2 0 0 1 5 8h-.438a2 2 0 0 1-1.94-1.515zM4.969 9.75A3.5 3.5 0 0 0 8 11.5a3.5 3.5 0 0 0 3.032-1.75a.5.5 0 1 1 .866.5A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1-3.898-2.25a.5.5 0 0 1 .866-.5z"></path>
                                    </svg>
                                </button>

                                {/* INPUT */}
                                <input
                                    value={messageText}
                                    onChange={(e) => { setMessageText(e.target.value); handleTyping(); }}
                                    onKeyDown={handleKeyDown}
                                    type="text"
                                    placeholder="Type a message..."
                                    className="flex-1 text-white bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-2.5 outline-none focus:border-blue-500 text-sm transition"
                                />

                                {/* SEND BUTTON */}
                                <button
                                    onClick={sendMessage}
                                    className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-xl text-white text-sm font-medium transition active:scale-95"
                                >
                                    Send
                                </button>

                            </div>

                        </div>
                    )}
                </div>

            </div>

        </div >

    )
}
export default Discussions;
