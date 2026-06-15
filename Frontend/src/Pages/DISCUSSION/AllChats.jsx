import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import BASE_URL from '../auth/baseURL';
import axios from 'axios';
import { addConnectionUser } from '@/utils/connectionSlice';
import { FaVideo } from 'react-icons/fa';



const AllChats = ({ loading, setLoading }) => {

    const connectionsARR = useSelector(state => state.connections || []);

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
    useEffect(() => {
        if (!connectionsARR) {
            connectionUser();
        }
    }, [dispatch]);

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


    const [selectedChatUser, setSelectedChatUser] = useState({
        idx: null,
    });

    return (
        <div className='bg-transparent h-auto w-full'>

            {connectionsARR.users?.map((user, index) => (
                <div key={index}
                    onClick={() => {
                        if (selectedChatUser.idx === index) {
                            setSelectedChatUser({ idx: null });
                            return;
                        }

                        setSelectedChatUser({ idx: index })
                    }}
                    className={`${selectedChatUser.idx === index ? "bg-white" : "bg-white/20"} group text-white h-17 w-full  cursor-pointer  rounded-2xl my-2 flex items-center gap-2 p-1.5`}>


                    <div className='w-full flex items-center gap-1 h-full bg-transparent rounded-2xl'>
                        <div className="w-14 h-14 rounded-xl bg-black flex items-center  justify-center overflow-hidden shrink-0">

                            {selectedChatUser.idx !== index &&
                                <>
                                    <span className='group-hover:hidden flex'>


                                        <img src={user.photoUrl} alt="" className=' w-fit h-full rounded-xl object-cover' />
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
                                                        className={`w-[5px] h-[5px] rounded-full ${dot === 1 ? "bg-white" : "bg-white/20"
                                                            }`}
                                                    />
                                                ))}
                                            </div>
                                        ))}
                                    </span>

                                </>
                            }


                            {selectedChatUser.idx === index &&
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
                                                        className={`w-[5px] h-[5px] rounded-full ${dot === 1 ? "bg-white" : "bg-white/20"
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
                                <span className={`font-semibold text-lg truncate ${selectedChatUser.idx === index ? "text-black" : "text-white"}`}>{user.FirstName + ' ' + user.LastName}</span>
                                <span className={`text-xs  ${selectedChatUser.idx === index ? "text-black/60" : "text-gray-400"}`}>10:30 AM</span>
                            </div>
                            <div className="flex justify-between items-center ">
                                <span className={`text-sm  pl-1 truncate ${selectedChatUser.idx === index ? "text-black/60" : "text-gray-400"}`}>Hey, how are you?</span>
                                <div className="flex items-center gap-1">
                                    <span className="w-5 h-5 rounded-full bg-green-500 text-xs flex items-center justify-center">3</span>
                                    <FaVideo className={`  cursor-pointer ${selectedChatUser.idx === index ? "text-black/60 hover:text-black" : "text-gray-400 hover:text-white"}`} />
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            ))}


        </div>
    )
}

export default AllChats