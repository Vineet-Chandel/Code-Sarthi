import { useRef } from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../Pages/auth/baseURL";
import { addConnectionUser } from "../utils/connectionSlice";
import { useDispatch, useSelector } from "react-redux";
const Discussions = () => {
    const connections = useSelector(state => state.connections.users || []);

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


    const makeReset = () => {
        setIsProfileOpen(false);
        setSelectedUserID(null);
    }
    const dispatch = useDispatch();

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


        <div className="w-screen flex bg-black text-white">

            {/* LEFT SIDEBAR */}
            <div className="w-[400px] h-screen border-r border-zinc-800 flex flex-col p-5 gap-6">

                {/* SEARCH BAR */}
                <div className="flex items-center gap-3 bg-zinc-900 border border-zinc-700 px-4 py-3 rounded-2xl focus-within:border-blue-500 transition " onClick={() => focusInput()}>

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
                <div className="flex-1 overflow-y-auto text-gray-400 text-sm">
                    {connections.map((item) => (
                        <li

                            className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-zinc-800 cursor-pointer transition"
                            onClick={() => {
                                setchatActive(true);
                                setChatingPhotoUrl(item.photoUrl);
                                setChatingUserId(item._id);
                                setChatingFirstName(item.FirstName);
                                setChatingLastName(item.LastName);
                            }}
                        >
                            <img
                                src={item.photoUrl}
                                alt="profile"
                                className="w-10 h-10 rounded-full object-cover"
                            />

                            <div className="flex flex-col">
                                <span className="text-white text-sm font-medium">
                                    {item.FirstName} {item.LastName}
                                </span>
                                <span className="text-gray-400 text-xs">
                                    Click to start chat
                                </span>
                            </div>
                        </li>

                    ))}
                </div>

            </div>

            {/* RIGHT CHAT AREA */}
            <div className="flex-1 p-6">

                <div className="w-full h-full border border-zinc-800 rounded-3xl bg-zinc-900/50 backdrop-blur-md flex  justify-center text-gray-500">

                    {!chatActive && < span > Select a conversation to start chatting</span>}
                    {chatActive && (
                        <div className="flex flex-col w-full h-full">

                            {/* TOP HEADER */}
                            <div className="w-full border-b border-zinc-800 h-[80px] flex items-center justify-between px-6">

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


                            {/* MESSAGE AREA */}
                            <div className="flex-1 overflow-y-auto p-6 space-y-4">

                                {/* received message */}
                                <div className="flex items-start gap-3">
                                    <img
                                        src={chatingPhotoUrl}
                                        className="w-8 h-8 rounded-full"
                                    />

                                    <div className="bg-zinc-800 px-4 py-2 rounded-2xl max-w-[300px] text-sm">
                                        Hello 👋
                                    </div>
                                </div>


                                {/* sent message */}
                                <div className="flex justify-end">
                                    <div className="bg-blue-600 px-4 py-2 rounded-2xl max-w-[300px] text-sm">
                                        Hi! How are you?
                                    </div>
                                </div>

                            </div>


                            {/* TYPING AREA */}
                            <div className="border-t border-zinc-800 p-4 flex items-center gap-3">

                                {/* EMOJI BUTTON */}
                                <button className="hover:bg-zinc-800 p-2 rounded-lg transition">
                                    😊
                                </button>

                                {/* INPUT */}
                                <input
                                    type="text"
                                    placeholder="Type a message..."
                                    className="flex-1 bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
                                />

                                {/* SEND BUTTON */}
                                <button className="bg-blue-600 hover:bg-blue-500 px-5 py-2 rounded-xl transition">
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
