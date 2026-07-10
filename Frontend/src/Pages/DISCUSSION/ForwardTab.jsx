import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addConnectionUser } from '@/utils/connectionSlice';
import { setChatUsers } from '@/utils/chat-user-slice';
import BASE_URL from '../auth/baseURL';
import axios from 'axios'
import { Search, X } from "lucide-react";

const SearchTab = ({ search, setSearch }) => {
    return (
        <div className="sticky top-0 z-20 bg-white border-b border-gray-200 p-4">
            <div className="relative">
                <Search
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search conversations..."
                    className="
                        w-full
                        rounded-2xl
                        bg-gray-200
                        py-3
                        pl-11
                        pr-11
                        text-sm
                        text-gray-900
                        placeholder:text-gray-400
                        outline-none
                        transition-all
                        duration-300
                        focus:bg-white
                        focus:ring-2
                        focus:ring-blue-500/20
                    "
                />

                {search.length > 0 && (
                    <button
                        onClick={() => setSearch("")}
                        className="
                            absolute
                            right-3
                            top-1/2
                            -translate-y-1/2
                            p-1
                            rounded-full
                            hover:bg-gray-200
                            transition
                        "
                    >
                        <X size={16} className="text-gray-500" />
                    </button>
                )}
            </div>
        </div>
    );
};
const ForwardTab = ({ setForwardTabOpen }) => {
    const connectionsARR = useSelector(state => state?.connections || []);
    const chatsARR = useSelector(state => state?.chats?.users?.data || [])
    const loggedUser = useSelector(store => store.user.user.DATA);
    const dispatch = useDispatch();


    const [loading, setLoading] = useState(false);
    const connectionUser = async () => {

        try {
            setLoading(true);
            const response = await axios.get(
                `${BASE_URL}/user/connections`,
                { withCredentials: true }
            );
            dispatch(addConnectionUser(response.data.data));


        } catch (err) {
            addToast({
                type: "error",
                title: "Error",
                message:
                    err?.response?.data?.message ||
                    err?.message ||
                    "Something went wrong"
            });
        } finally {
            setLoading(false);
        }
    };
    const chatUser = async () => {
        try {
            setLoading(true);
            const response = await axios.get(
                `${BASE_URL}/chats`,
                { withCredentials: true }
            );


            dispatch(setChatUsers(response.data));
        } catch (err) {
            addToast({
                type: "error",
                title: "Error",
                message:
                    err?.response?.data?.message ||
                    err?.message ||
                    "Something went wrong"
            });
        } finally {
            setLoading(false);
        }
    };

    const availableConnections =
        connectionsARR?.users?.filter(connection => {
            return !chatsARR.some(chat =>
                chat.members.some(
                    member =>
                        member._id === connection._id &&
                        member._id !== loggedUser._id
                )
            );
        });


    useEffect(() => {
        chatUser()
    }, [dispatch])
    useEffect(() => {
        if (!connectionsARR) {
            connectionUser();
        }
        if (!chatsARR) {


            chatUser();
        }
    }, [dispatch]);

    const [search, setSearch] = useState("");

    const [selectedChats, setSelectedChats] = useState([]);
    const toggleChat = (id) => {
        setSelectedChats(prev =>
            prev.includes(id)
                ? prev.filter(x => x !== id)
                : [...prev, id]
        )
    }
    useEffect(() => {
        console.log(selectedChats)
    }, [selectedChats]);

    const matrix = [
        [0, 0, 1, 0, 0],
        [0, 0, 0, 1, 0],
        [1, 1, 1, 1, 1],
        [0, 0, 0, 1, 0],
        [0, 0, 1, 0, 0]
    ];

    const filteredChats = chatsARR.filter(chat => {
        const otherUser = chat.members.find(
            member => member._id !== loggedUser._id
        );

        if (!otherUser) return false;

        return (
            otherUser.firstName +
            " " +
            otherUser.lastName
        )
            .toLowerCase()
            .includes(search.toLowerCase());
    });
    return (


        <div
            onClick={() => setForwardTabOpen(false)}
            className="absolute inset-0 z-30 bg-black/40 flex items-center justify-center"
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="relative w-fit min-w-[20vw] max-h-[90%] overflow-y-auto scrollbar-none bg-white rounded-2xl px-3 text-black"
            >       <SearchTab
                    search={search}
                    setSearch={setSearch}
                />




                <div className='mt-3 p-0 w-[100%] '>
                    {filteredChats?.map((chatUser, idx) => {
                        return (chatUser.members.map((user, index) => {

                            return (user?._id !== loggedUser._id && chatUser.type === "private" &&

                                <div
                                    onContextMenu={(e) => {
                                        e.preventDefault();


                                        setChatTab({
                                            isOpen: true,
                                            idx: idx,
                                            x: e.clientX,
                                            y: e.clientY,
                                            userId: user._id,
                                            convoId: chatUser._id,
                                        });
                                    }}
                                    key={index}

                                    className={`hover:bg-white/20 transistion-all duration-300 group text-white h-auto w-full  cursor-pointer  rounded-2xl my-2 flex items-center gap-2 p-1.5`}>


                                    <div className='w-full flex items-center gap-1 h-full bg-transparent rounded-2xl'>
                                        <div className="w-[60px] h-[60px] rounded-xl bg-black flex items-center  justify-center overflow-hidden shrink-0">


                                            <>
                                                <span className='group-hover:hidden flex'>


                                                    <img src={user.photoUrl.url} alt="" className=' w-fit h-full rounded-xl object-cover' />
                                                </span>

                                                <span className="group-hover:flex hidden flex-col items-center gap-1 justify-center py-1">
                                                    {matrix.map((item, idx) => (
                                                        <div
                                                            key={idx}
                                                            className="flex items-center justify-between gap-1 px-0.5"
                                                        >
                                                            {item.map((dot, dotIdx) => (
                                                                <div
                                                                    key={dotIdx}
                                                                    className={`w-[4px] h-[4px] rounded-full ${dot === 1 ? "bg-white" : "bg-white/20"
                                                                        }`}
                                                                />
                                                            ))}
                                                        </div>
                                                    ))}
                                                </span>

                                            </>




                                        </div>
                                        {< div className='w-full h-full rounded-2xl bg-transparent px-1'>
                                            <div className="flex justify-between items-center ">
                                                <span className={`font-semibold text-md truncate text-black`}>{user.firstName + ' ' + user.lastName}</span>
                                            </div>


                                        </div>}
                                    </div>
                                </div>)
                        }))
                    })
                    }


                </div>


            </div>

        </div>
    )
}

export default ForwardTab