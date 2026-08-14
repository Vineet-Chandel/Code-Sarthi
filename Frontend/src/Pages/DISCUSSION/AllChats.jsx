import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import BASE_URL from '../auth/baseURL';
import axios from 'axios';
import { addConnectionUser } from '@/utils/connectionSlice';
import { useTeamChat } from './TeamChatContext';

import { useNavigate, useOutletContext } from "react-router-dom";

import { setChatUsers } from '@/utils/chat-user-slice';
import ChatClickedTab from './ChatClickedTab';
import ChatProfile from './AllChats/ChatProfile';
import EmptyChats from './AllChats/ChatList/EmptyChats';

const AllChats = ({ setNewConvoFinded, newConvoFinded, setForwardTabOpen, forwardTabOpen, loading, setLoading, addToast, selectedChatUser, setSelectedChatUser, lastMsgStatus }) => {
    const { setActiveTeam } = useTeamChat();

    const navigate = useNavigate()

    const connectionsARR = useSelector(state => state?.connections || []);
    const chatsARR = useSelector(
        state => state.chats.users
    );
    const loggedUser = useSelector(store => store.user.user.DATA);
    const dispatch = useDispatch();




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


            dispatch(setChatUsers(response.data.data));
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
    useEffect(() => {
        console.log(chatsARR);
    }, [chatsARR]);
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
        if (!connectionsARR) {
            connectionUser();
        }
        if (!chatsARR) {


            chatUser();
        }
    }, [dispatch]);




    useEffect(() => {
        console.log("dcnewo")
        chatUser();
        connectionUser();
    }, [newConvoFinded])

    const matrix = [
        [0, 0, 1, 0, 0],
        [0, 0, 0, 1, 0],
        [1, 1, 1, 1, 1],
        [0, 0, 0, 1, 0],
        [0, 0, 1, 0, 0]
    ];
    const matrix2 = [
        [1, 0, 0, 0, 1],
        [0, 1, 0, 1, 0],
        [0, 0, 1, 0, 0],
        [0, 1, 0, 1, 0],
        [1, 0, 0, 0, 1]
    ];


    const [chatTab, setChatTab] = useState({
        isOpen: false,
        idx: null,
        userId: null,
        convoId: null,
        x: 0,
        y: 0,
    })


    const MENU = {
        width: 260,
        height: 430,
        padding: 8,
    };

    let left = chatTab.x;
    let top = chatTab.y;

    if (left + MENU.width > window.innerWidth) {
        left -= MENU.width;
    }

    if (top + MENU.height > window.innerHeight) {
        top -= MENU.height;
    }

    left = Math.max(MENU.padding, left);
    top = Math.max(MENU.padding, top);
    return (
        <div
            onContextMenu={(e) => {
                e.preventDefault();
            }}
            className='bg-transparent h-full w-full relative'>


            {chatTab.isOpen && (

                <>

                    <div
                        onClick={() => setChatTab({

                            isOpen: false,
                            idx: null,
                            userId: null,
                            convoId: null,
                            x: 0,
                            y: 0,
                        })}

                        onContextMenu={(e) => {
                            e.preventDefault();
                            setChatTab({

                                isOpen: false,
                                idx: null,
                                userId: null,
                                convoId: null,
                                x: 0,
                                y: 0,
                            });
                        }}
                        className='absolute z-10 w-full h-full inset-0'></div>
                    <div
                        className="fixed z-50"
                        style={{
                            left,
                            top,
                        }}
                    >
                        <ChatClickedTab setChatTab={setChatTab} chatTab={chatTab} selectedChatUser={selectedChatUser} />
                    </div>
                </>
            )
            }


            <div className='h-full w-full overflow-y-auto   scrollbar-none '>


                {!selectedChatUser?.isOpenTab &&


                    <div className='mt-3 p-0 w-[100%] '>
                        {chatsARR?.map((chatUser, idx) => {
                            return (chatUser.members.map((user, index) => {
                                if (chatUser.type === "team_general") {
                                    if (index !== 0) return null;
                                    const team = chatUser.teamId;
                                    if (!team) return null;
                                    const unreadCount =
                                        chatUser?.unreadCounts?.find(
                                            (item) => item.user === loggedUser._id
                                        )?.count ?? 0;
                                    return (
                                        <div
                                            key={chatUser._id}
                                            onClick={() => {
                                                if (forwardTabOpen) {
                                                    setForwardTabOpen(false);
                                                }
                                                setActiveTeam(team._id);
                                            }}
                                            className="group text-white h-auto w-full cursor-pointer rounded-2xl my-2 flex items-center gap-2 p-1.5 hover:bg-white/5 transition-colors bg-transparent border border-white/5"
                                        >
                                            <div className='w-full flex items-center gap-1 h-full bg-transparent rounded-2xl'>
                                                <div className="w-[60px] h-[60px] rounded-xl bg-zinc-950 border border-white/10 flex items-center justify-center text-white text-xl font-extrabold shrink-0 overflow-hidden">
                                                    {team.logo ? (
                                                        <img src={team.logo} className="w-full h-full object-cover" alt="" />
                                                    ) : (
                                                        team.name?.[0]?.toUpperCase() || 'T'
                                                    )}
                                                </div>
                                                <div className='w-full h-full rounded-2xl bg-transparent px-1'>
                                                    <div className="flex justify-between items-center ">
                                                        <span className="font-semibold text-md truncate text-white">{team.name}</span>
                                                        <span className="text-sm text-gray-400">
                                                            {chatUser?.lastMessage?.updatedAt ?
                                                                new Date(chatUser?.lastMessage?.updatedAt).toLocaleTimeString("en-US", {
                                                                    hour: "numeric",
                                                                    minute: "2-digit",
                                                                    hour12: true,
                                                                })
                                                                : ""
                                                            }
                                                        </span>
                                                    </div>
                                                    <div className="flex justify-between items-center ">
                                                        <span className="text-sm pl-1 line-clamp-1 break-words text-zinc-500">
                                                            {chatUser?.type === "team_general" ? (team.description || "No description") : "Issue thread"}
                                                        </span>
                                                        <div className="flex items-center gap-1">
                                                            {unreadCount > 0 && (
                                                                <span className="min-w-5 h-5 px-1 rounded-full bg-white text-black text-xs font-bold flex items-center justify-center">
                                                                    {unreadCount}
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                }
                                const unreadCount =
                                    chatUser?.unreadCounts?.find(
                                        (item) => item.user === user._id
                                    )?.count ?? 0;
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
                                        onClick={() => {

                                            if (forwardTabOpen) {
                                                setForwardTabOpen(false)
                                            }
                                            if (selectedChatUser?.id === user._id) {


                                                setSelectedChatUser(prev => ({
                                                    id: null,
                                                    info: null,
                                                    convoId: null,
                                                    fullChatInfo: null
                                                }));
                                                return;
                                            }



                                            setSelectedChatUser(prev => ({
                                                isNew: false,
                                                id: user._id,
                                                info: user,
                                                convoId: chatUser._id,
                                                fullChatInfo: chatUser
                                            }));
                                        }}
                                        className={`${selectedChatUser?.id === user._id ? "bg-white/20" : "bg-transparent"} group text-white h-auto w-full  cursor-pointer  rounded-2xl my-2 flex items-center gap-2 p-1.5`}>


                                        <div className='w-full flex items-center gap-1 h-full bg-transparent rounded-2xl'>
                                            <div className="w-[60px] h-[60px] rounded-xl bg-black flex items-center  justify-center overflow-hidden shrink-0">

                                                {selectedChatUser?.id !== user._id &&
                                                    <>
                                                        <span className='group-hover:hidden flex'>


                                                            <img src={user?.photoUrl?.url} alt="" className=' w-fit h-full rounded-xl object-cover' />
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
                                                }


                                                {selectedChatUser?.id === user._id &&
                                                    <>


                                                        <span className="flex  flex-col items-center gap-1 justify-center py-1">
                                                            {matrix2.map((item, idx) => (
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
                                                }

                                            </div>
                                            {< div className='w-full h-full rounded-2xl bg-transparent px-1'>
                                                <div className="flex justify-between items-center ">
                                                    <span className={`font-semibold text-md truncate text-white`}>{user.firstName + ' ' + user.lastName}</span>
                                                    <span className={`text-sm  text-gray-300`}>{lastMsgStatus?.convoId === chatUser?._id && lastMsgStatus?.msgId ?
                                                        lastMsgStatus?.lastMsgTime ?
                                                            new Date(lastMsgStatus?.lastMsgTime).toLocaleTimeString("en-US", {
                                                                hour: "numeric",
                                                                minute: "2-digit",
                                                                hour12: true,
                                                            })
                                                            : ""
                                                        : chatUser?.lastMessage?.updatedAt ?
                                                            new Date(chatUser?.lastMessage?.updatedAt).toLocaleTimeString("en-US", {
                                                                hour: "numeric",
                                                                minute: "2-digit",
                                                                hour12: true,
                                                            })
                                                            : ""
                                                    }</span>
                                                </div>
                                                <div className="flex justify-between items-center ">

                                                    <span className={`text-sm  pl-1 line-clamp-1 break-words  text-gray-300`}>{lastMsgStatus?.convoId === chatUser?._id && lastMsgStatus?.msgId ? lastMsgStatus?.lastMsg : chatUser?.lastMessage?.content}</span>
                                                    <div className="flex items-center gap-1">
                                                        {unreadCount > 0 && (
                                                            <span className="min-w-5 h-5 px-1 rounded-full bg-blue-500 text-xs font-medium flex items-center justify-center">
                                                                {unreadCount < 10 ? unreadCount : "!"}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>

                                            </div>}
                                        </div>
                                    </div>)
                            }))
                        })}
                        {chatsARR.length <= 5 && chatsARR.length >= 0 && availableConnections.length !== 0 && <div>


                            <div className="w-full px-3 my-4 h-10 rounded-xl bg-black flex items-center  justify-center overflow-hidden shrink-0 bg-white">



                                <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24">
                                    <g fill="none">
                                        <path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"></path>
                                        <path fill="#000" d="M19 3a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3h-3.697l-2.61 1.74c-.42.28-.966.28-1.386 0L8.697 19H5a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3zM8.5 10a1.5 1.5 0 1 0 0 3a1.5 1.5 0 0 0 0-3m7 0a1.5 1.5 0 1 0 0 3a1.5 1.5 0 0 0 0-3"></path>
                                    </g>
                                </svg>
                                <p className="w-full text-end text-black text-md">Start Collabrating </p>


                            </div>


                            {availableConnections?.map((user, index) =>

                                <div key={index}
                                    onClick={() => {

                                        if (forwardTabOpen) {
                                            setForwardTabOpen(false)
                                        }
                                        if (selectedChatUser?.id === user._id) {


                                            setSelectedChatUser(prev => ({
                                                id: null,
                                                info: null,
                                                convoId: null,
                                                fullChatInfo: null
                                            }));
                                            return;
                                        }

                                        setSelectedChatUser({
                                            isNew: true,
                                            id: user._id,
                                            info: user,
                                            convoId: `temp_${user._id}`,
                                            fullChatInfo: chatUser,

                                        });


                                    }}
                                    className={`${selectedChatUser?.id === user._id ? "bg-white" : "bg-white/20"} group text-white h-auto w-full  cursor-pointer  rounded-2xl my-2 flex items-center gap-2 p-1.5`}>


                                    <div className='w-full flex items-center gap-1 h-full bg-transparent rounded-2xl'>
                                        <div className="w-[60px] h-[60px] rounded-xl bg-black flex items-center  justify-center overflow-hidden shrink-0">

                                            {selectedChatUser?.id !== user._id &&
                                                <>
                                                    <span className='group-hover:hidden flex'>


                                                        <img src={user?.photoUrl.url} alt="" className=' w-fit h-full rounded-xl object-cover' />
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
                                            }


                                            {selectedChatUser?.id === user._id &&
                                                <>


                                                    <span className="flex  flex-col items-center gap-1 justify-center py-1">
                                                        {matrix2.map((item, idx) => (
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
                                            }

                                        </div>
                                        <div className='w-full h-full rounded-2xl bg-transparent px-1'>
                                            <div className="flex justify-between items-center ">
                                                <span className={`font-semibold text-md truncate ${selectedChatUser?.id === user._id ? "text-black" : "text-white"}`}>{user.firstName + ' ' + user.lastName}</span>
                                                <span className={`text-sm  ${selectedChatUser?.id === user._id ? "text-black/60" : "text-gray-400"}`}>10:30 AM</span>
                                            </div>
                                            <div className="flex justify-between items-center ">
                                                <span className={`text-sm  pl-1 truncate ${selectedChatUser?.id === user._id ? "text-black/60" : "text-gray-400"}`}>Tap to start collabrating </span>
                                                <div className="flex items-center gap-1">
                                                    <span className="w-5 h-5 rounded-full bg-green-500 text-sm flex items-center justify-center">3</span>

                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>}
                    </div>
                }
                {
                    selectedChatUser?.isOpenTab && (
                        <ChatProfile selectedChatUser={selectedChatUser} setSelectedChatUser={setSelectedChatUser} />
                    )
                }
                {!loading && connectionsARR?.total == 0 && (
                    <EmptyChats />
                )}
            </div>
        </div >
    )
}

export default AllChats