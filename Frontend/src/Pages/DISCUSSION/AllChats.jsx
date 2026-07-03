import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import BASE_URL from '../auth/baseURL';
import axios from 'axios';
import { addConnectionUser } from '@/utils/connectionSlice';
import { FaUniversity, FaVideo } from 'react-icons/fa';

import { useOutletContext } from "react-router-dom";
import { BsPersonWorkspace } from 'react-icons/bs';
import { IoBarChart } from 'react-icons/io5';
import { setChatUsers } from '@/utils/chat-user-slice';

const AllChats = ({ loading, setLoading, selectedChatUser, setSelectedChatUser, }) => {
    const {
        selectedChatUser2,
        setSelectedChatUser2,
    } = useOutletContext();
    const connectionsARR = useSelector(state => state?.connections || []);
    const chatsARR = useSelector(state => state?.chats?.users?.data || [])
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
            console.error(err?.message || err);
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
            console.error(err?.message || err);
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


    const [trueConnection, setTrueConnection] = useState([])





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




    return (
        <div className='bg-transparent h-full w-full '>

            <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-20 z-20 bg-gradient-to-t from-black/30 via-black/10 to-transparent dark:from-black/60 dark:via-black/20" />
            <div className='h-full overflow-y-auto  overflow-y-scroll '>
                {!selectedChatUser2?.isOpenTab &&


                    <div className='w-full '>
                        {chatsARR?.map((chatUser, idx) => {
                            return (chatUser.members.map((user, index) => (

                                user?._id !== loggedUser._id && chatUser.type === "private" && <div key={index}
                                    onClick={() => {
                                        if (selectedChatUser?.id === user._id) {
                                            setSelectedChatUser({
                                                id: null,
                                                info: null,
                                            });

                                            setSelectedChatUser2(prev => ({

                                                id: null,
                                                info: null,
                                            }));
                                            return;
                                        }

                                        setSelectedChatUser({
                                            id: user._id,
                                            info: user,
                                        });

                                        setSelectedChatUser2(prev => ({

                                            id: user._id,
                                            info: user,
                                        }));
                                    }}
                                    className={`${selectedChatUser?.id === user._id ? "bg-white" : "bg-white/20"} group text-white h-13 w-full  cursor-pointer  rounded-2xl my-2 flex items-center gap-2 p-1.5`}>


                                    <div className='w-full flex items-center gap-1 h-full bg-transparent rounded-2xl'>
                                        <div className="w-10 h-10 rounded-xl bg-black flex items-center  justify-center overflow-hidden shrink-0">

                                            {selectedChatUser?.id !== user._id &&
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
                                                                        className={`w-[2.5px] h-[2.5px] rounded-full ${dot === 1 ? "bg-white" : "bg-white/20"
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
                                                                        className={`w-[2.5px] h-[2.5px] rounded-full ${dot === 1 ? "bg-white" : "bg-white/20"
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
                                                <span className={`font-semibold text-sm truncate ${selectedChatUser?.id === user._id ? "text-black" : "text-white"}`}>{user.firstName + ' ' + user.lastName}</span>
                                                <span className={`text-xs  ${selectedChatUser?.id === user._id ? "text-black/60" : "text-gray-400"}`}>10:30 AM</span>
                                            </div>
                                            <div className="flex justify-between items-center ">
                                                <span className={`text-xs  pl-1 truncate ${selectedChatUser?.id === user._id ? "text-black/60" : "text-gray-400"}`}>{chatUser?.lastMessage?.content}</span>
                                                <div className="flex items-center gap-1">
                                                    <span className="w-5 h-5 rounded-full bg-green-500 text-xs flex items-center justify-center">3</span>

                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            )))
                        })
                        }


                        {chatsARR.length <= 5 && chatsARR.length > 0 && <div>


                            <div className="w-full px-3 my-4 h-10 rounded-xl bg-black flex items-center  justify-center overflow-hidden shrink-0 bg-white">



                                <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24">
                                    <g fill="none">
                                        <path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"></path>
                                        <path fill="#000" d="M19 3a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3h-3.697l-2.61 1.74c-.42.28-.966.28-1.386 0L8.697 19H5a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3zM8.5 10a1.5 1.5 0 1 0 0 3a1.5 1.5 0 0 0 0-3m7 0a1.5 1.5 0 1 0 0 3a1.5 1.5 0 0 0 0-3"></path>
                                    </g>
                                </svg>
                                <p className="w-full text-end text-black text-sm">Start Collabrating </p>


                            </div>


                            {availableConnections?.map((user, index) =>

                                <div key={index}
                                    onClick={() => {
                                        if (selectedChatUser?.id === user._id) {
                                            setSelectedChatUser({
                                                id: null,
                                                info: null,
                                            });

                                            setSelectedChatUser2(prev => ({

                                                id: null,
                                                info: null,
                                            }));
                                            return;
                                        }

                                        setSelectedChatUser({
                                            id: user._id,
                                            info: user,
                                        });

                                        setSelectedChatUser2(prev => ({

                                            id: user._id,
                                            info: user,
                                        }));
                                    }}
                                    className={`${selectedChatUser?.id === user._id ? "bg-white" : "bg-white/20"} group text-white h-13 w-full  cursor-pointer  rounded-2xl my-2 flex items-center gap-2 p-1.5`}>


                                    <div className='w-full flex items-center gap-1 h-full bg-transparent rounded-2xl'>
                                        <div className="w-10 h-10 rounded-xl bg-black flex items-center  justify-center overflow-hidden shrink-0">

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
                                                                        className={`w-[2.5px] h-[2.5px] rounded-full ${dot === 1 ? "bg-white" : "bg-white/20"
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
                                                                        className={`w-[2.5px] h-[2.5px] rounded-full ${dot === 1 ? "bg-white" : "bg-white/20"
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
                                                <span className={`font-semibold text-sm truncate ${selectedChatUser?.id === user._id ? "text-black" : "text-white"}`}>{user.firstName + ' ' + user.lastName}</span>
                                                <span className={`text-xs  ${selectedChatUser?.id === user._id ? "text-black/60" : "text-gray-400"}`}>10:30 AM</span>
                                            </div>
                                            <div className="flex justify-between items-center ">
                                                <span className={`text-xs  pl-1 truncate ${selectedChatUser?.id === user._id ? "text-black/60" : "text-gray-400"}`}>Tap to start collabrating </span>
                                                <div className="flex items-center gap-1">
                                                    <span className="w-5 h-5 rounded-full bg-green-500 text-xs flex items-center justify-center">3</span>

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
                    selectedChatUser2?.isOpenTab && (
                        <div className="w-full  h-[calc(100vh-130px)] rounded-3xl bg-base-100 mt-2 flex flex-col  items-center overflow-hidden  relative">
                            <div className="w-full flex justify-between absolute z-10 p-5 ">

                                <div className="hover:bg-base-300 hover:border hover:border-secondary bg-base-200 w-12 flex justify-center items-center rounded-full h-12 cursor-pointer" onClick={() => setSelectedChatUser2({ ...selectedChatUser2, isOpenTab: false })}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                                        <path fill="#fff" d="M20 11H7.83l5.59-5.59L12 4l-8 8l8 8l1.41-1.41L7.83 13H20z"></path>
                                    </svg>
                                </div>
                                <div className="flex justify-center items-center gap-2 " onClick={() => setSelectedChatUser2({ ...selectedChatUser2, isOpenTab: false })}>
                                    <div className='flex justify-center items-center  hover:bg-base-300 hover:border hover:border-secondary bg-base-200 w-12 rounded-full h-12 cursor-pointer'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                                            <path fill="currentColor" d="M19.95 21q-3.125 0-6.175-1.362t-5.55-3.863t-3.862-5.55T3 4.05q0-.45.3-.75t.75-.3H8.1q.35 0 .625.238t.325.562l.65 3.5q.05.4-.025.675T9.4 8.45L6.975 10.9q.5.925 1.187 1.787t1.513 1.663q.775.775 1.625 1.438T13.1 17l2.35-2.35q.225-.225.588-.337t.712-.063l3.45.7q.35.1.575.363T21 15.9v4.05q0 .45-.3.75t-.75.3"></path>
                                        </svg>

                                    </div>
                                    <div className='flex justify-center items-center  hover:bg-base-300 hover:border hover:border-secondary bg-base-200 w-12 rounded-full h-12 cursor-pointer'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                                            <g fill="currentColor">
                                                <path d="M20.117 7.625a1 1 0 0 0-.564.1L15 10v4l4.553 2.275A1 1 0 0 0 21 15.383V8.617a1 1 0 0 0-.883-.992"></path>
                                                <path d="M5 5C3.355 5 2 6.355 2 8v8c0 1.645 1.355 3 3 3h8c1.645 0 3-1.355 3-3V8c0-1.645-1.355-3-3-3z"></path>
                                            </g>
                                        </svg>
                                    </div>
                                </div>


                            </div>
                            <div className="w-full  flex flex-col ">
                                <div className="w-full flex justify-center mt-5">

                                    {selectedChatUser2?.info?.photoUrl?.url ? (<img src={selectedChatUser2?.info?.photoUrl?.url} alt="profile" className="w-[150px] h-[150px] rounded-full object-cover ring-2 ring-accent group-hover:ring-secondary transition-all duration-300" />
                                    ) : (
                                        <img src="https://res.cloudinary.com/dggoaxqxl/image/upload/q_auto/f_auto/v1776259172/Pinterest_Pin_di5dy8.jpg" alt="profile" className="w-[150px] h-[150px] rounded-full object-cover ring-2 ring-accent group-hover:ring-secondary transition-all duration-300" />
                                    )}
                                </div>
                                <div className="flex flex-col items-center">
                                    <span className="text-info text-2xl font-extrabold mt-3" >
                                        {selectedChatUser2?.info?.firstName ? (
                                            <>{selectedChatUser2?.info?.firstName} {selectedChatUser2?.info?.middleName} {selectedChatUser2?.info?.lastName} </>
                                        ) : (
                                            <>CodeSarthi User</>
                                        )}
                                    </span>
                                    <span className="text-info text-sm pl-1 flex justify-center items-center gap-1">
                                        {selectedChatUser2?.info?._id && (selectedChatUser2?.info?.username)}
                                        {selectedChatUser2?.info?._id && (<div onClick={() => handleCopy(selectedChatUser2?.info?.username)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24">
                                                <g fill="none">
                                                    <path fill="#fff" d="M8 7h12v12a2 2 0 0 1-2 2h-8a2 2 0 0 1-2-2z" opacity={0.16}></path>
                                                    <path stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 3H4v13"></path>
                                                    <path stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12v12a2 2 0 0 1-2 2h-8a2 2 0 0 1-2-2z"></path>
                                                </g>
                                            </svg>
                                        </div>)}




                                    </span>


                                </div>

                                {/* Info List */}
                                <div className="mt-1 ">

                                    <div className="flex items-center gap-3  px-5 py-1 rounded-xl">
                                        {selectedChatUser2?.info?._id && (
                                            <span className="text-sm text-info font-medium flex justify-center items-center gap-3"><FaUniversity color="#fff" />
                                                {selectedChatUser2?.info?.college}
                                            </span>
                                        )}
                                    </div>

                                    <div className="flex items-center gap-3 px-5 py-1 rounded-xl">
                                        {selectedChatUser2?.info?._id && (
                                            <span className="text-sm text-info font-medium flex justify-center items-center gap-3"><BsPersonWorkspace color="#fff" />
                                                {selectedChatUser2?.info?.profession}
                                            </span>
                                        )}
                                    </div>

                                    <div className="flex items-center gap-3 px-5 py-1 rounded-xl">
                                        {selectedChatUser2?.info?._id && (
                                            <span className="text-sm text-info font-medium flex justify-center items-center gap-3">
                                                <IoBarChart color="#fff" />
                                                {selectedChatUser2?.info?.skills?.join(", ")}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                {/* About */}
                                {selectedChatUser2?.info?._id && (
                                    <div className="my-2 bg-base-100 border border-base-300  py-2 px-3 rounded-2xl m-1">
                                        <h3 className="text-lg font-semibold mb-1 text-white">
                                            About
                                        </h3>
                                        <p className="text-info text-xs leading-relaxed">
                                            {selectedChatUser2?.info?.about}
                                        </p>
                                    </div>
                                )}
                                {selectedChatUser2?.info?._id && (
                                    <div>

                                        <div className="text-white text-sm pl-1 flex justify-between px-3 pl-3 cursor-pointer items-center gap-1 bg-base-300   border border-secondary border-[2px] py-2 rounded-2xl">
                                            <div className="flex justify-center items-center gap-1 font-extrabold">
                                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 32 32">
                                                    <path fill="#fff" d="M26 20h-6v-2h6zm4 8h-6v-2h6zm-2-4h-6v-2h6z"></path>
                                                    <path fill="#fff" d="M17.003 20a4.9 4.9 0 0 0-2.404-4.173L22 3l-1.73-1l-7.577 13.126a5.7 5.7 0 0 0-5.243 1.503C3.706 20.24 3.996 28.682 4.01 29.04a1 1 0 0 0 1 .96h14.991a1 1 0 0 0 .6-1.8c-3.54-2.656-3.598-8.146-3.598-8.2m-5.073-3.003A3.11 3.11 0 0 1 15.004 20c0 .038.002.208.017.469l-5.9-2.624a3.8 3.8 0 0 1 2.809-.848M15.45 28A5.2 5.2 0 0 1 14 25h-2a6.5 6.5 0 0 0 .968 3h-2.223A16.6 16.6 0 0 1 10 24H8a17.3 17.3 0 0 0 .665 4H6c.031-1.836.29-5.892 1.803-8.553l7.533 3.35A13 13 0 0 0 17.596 28Z"></path>
                                                </svg> Clear chat
                                            </div>
                                            <div>

                                            </div>

                                        </div>

                                        <div className="text-white text-sm pl-1 flex justify-between px-3 pl-3 items-center gap-1  mt-2 bg-base-300  border border-secondary border-[2px] py-2 rounded-2xl">
                                            <div className="flex justify-center items-center gap-1">
                                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 16 16">
                                                    <path fill="#fff" d="M4 3a2 2 0 0 0-2 2v.201l6 3.231l6-3.23V5a2 2 0 0 0-2-2zm10 3.337L8.237 9.44a.5.5 0 0 1-.474 0L2 6.337V11a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2z"></path>
                                                </svg>   {selectedChatUser2?.info?.gmail}
                                            </div>
                                            <div>
                                                <div onClick={() => handleCopy(selectedChatUser2?.info?.gmail)}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24">
                                                        <g fill="none">
                                                            <path fill="#fff" d="M8 7h12v12a2 2 0 0 1-2 2h-8a2 2 0 0 1-2-2z" opacity={0.16}></path>
                                                            <path stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 3H4v13"></path>
                                                            <path stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12v12a2 2 0 0 1-2 2h-8a2 2 0 0 1-2-2z"></path>
                                                        </g>
                                                    </svg>
                                                </div>
                                            </div>

                                        </div>


                                        <div className="text-white text-sm  flex justify-between px-3 pl-3 items-center gap-1 bg-base-300  mt-2 border border-secondary  py-2 rounded-2xl cursor-pointer ">
                                            <div className="flex justify-center items-center gap-1">
                                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                                                    <path fill="#fff" d="M12 2c5.5 0 10 4.5 10 10s-4.5 10-10 10S2 17.5 2 12S6.5 2 12 2m0 2c-1.9 0-3.6.6-4.9 1.7l11.2 11.2c1-1.4 1.7-3.1 1.7-4.9c0-4.4-3.6-8-8-8m4.9 14.3L5.7 7.1C4.6 8.4 4 10.1 4 12c0 4.4 3.6 8 8 8c1.9 0 3.6-.6 4.9-1.7"></path>
                                                </svg> <span className="font-extrabold">Block</span>

                                                <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 12 24">
                                                    <path d="M0 0h12v24H0z" fill="none" />
                                                    <path fill="#fff" fill-rule="evenodd" d="M10.157 12.711L4.5 18.368l-1.414-1.414l4.95-4.95l-4.95-4.95L4.5 5.64l5.657 5.657a1 1 0 0 1 0 1.414" />
                                                </svg>

                                                {selectedChatUser2?.info?.username}
                                            </div>
                                            <div>

                                            </div>

                                        </div>


                                        <div className="text-white text-sm pl-1 flex justify-between px-3 pl-3 items-center gap-1 bg-base-300  my-2 border border-secondary border-[2px] py-2 rounded-2xl cursor-pointer ">
                                            <div className="flex justify-center items-center gap-1">
                                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                                                    <g fill="none" fillRule="evenodd">
                                                        <path d="m12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036q-.016-.004-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.016-.018m.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01z"></path>
                                                        <path fill="#fff" d="M12 7a6 6 0 0 1 5.996 5.775L18 13v7h1a1 1 0 0 1 .117 1.993L19 22H5a1 1 0 0 1-.117-1.993L5 20h1v-7a6 6 0 0 1 6-6m-.857 4.986L9.652 14.47a1.01 1.01 0 0 0 .866 1.53h1.216l-.591.985a1 1 0 0 0 1.714 1.03l1.491-2.485a1.01 1.01 0 0 0-.866-1.53h-1.216l.591-.985a1 1 0 0 0-1.714-1.03ZM5.542 5.139l.094.083l.707.707a1 1 0 0 1-1.32 1.497l-.094-.083l-.707-.707a1 1 0 0 1 1.32-1.497m14.236.083a1 1 0 0 1 0 1.414l-.707.707a1 1 0 1 1-1.414-1.414l.707-.707a1 1 0 0 1 1.414 0M12 2a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0V3a1 1 0 0 1 1-1"></path>
                                                    </g>
                                                </svg><span className="font-extrabold">Report</span>



                                                <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 12 24">
                                                    <path d="M0 0h12v24H0z" fill="none" />
                                                    <path fill="#fff" fill-rule="evenodd" d="M10.157 12.711L4.5 18.368l-1.414-1.414l4.95-4.95l-4.95-4.95L4.5 5.64l5.657 5.657a1 1 0 0 1 0 1.414" />
                                                </svg>


                                                {selectedChatUser2?.info?.username}
                                            </div>
                                            <div>

                                            </div>

                                        </div>
                                    </div>
                                )}


                            </div>


                        </div>
                    )
                }
            </div>


        </div >
    )
}

export default AllChats