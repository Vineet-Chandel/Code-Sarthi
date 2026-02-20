import React, { useState, useEffect } from 'react'
import { BASE_URL } from "../Pages/auth/baseURL";
import axios from "axios";





const Search = () => {
    const [username, setUserName] = useState("")

    const searchHandeler = async (e) => {
        try {
            const res = await axios.post(
                `${BASE_URL}/profile/others`,
                { username },
                { withCredentials: true }
            );
            console.log(res.data);


        } catch (err) {
            console.log(err.response?.data?.message || "User not found");
        }

    }
    useEffect(() => {
        const timer = setTimeout(() => {
            searchHandeler();
        }, 400);

        return () => clearTimeout(timer);
    }, [username]);
    return (
        <div className='w-[90%]'>
            <div className="relative">

                {/* LEFT ICON */}

                <svg xmlns="http://www.w3.org/2000/svg" className='absolute left-3 top-1/2 -translate-y-1/2' width="30" height="30" viewBox="0 0 80 80">
                    <g fill="none">
                        <path fill="#f2994a" d="M65.368 67.848a2 2 0 0 0 2.828-2.829zm-9.634-15.29a2 2 0 0 0-2.828 2.828zm12.462 12.461L55.734 52.557l-2.828 2.829l12.462 12.462z" />
                        <path fill="#56ccf2" stroke="#2f80ed" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.2" d="M13.578 30.724a24.249 24.249 0 1 1 46.844 12.552a24.249 24.249 0 0 1-46.844-12.552" />
                    </g>
                </svg>

                {/* INPUT */}
                <input
                    type="text"
                    placeholder="Search Developers"
                    className="w-full h-[45px] text-gray-200 rounded-xl pl-14 pr-14 bg-black/90 border border-white/10 outline-none focus:border-green-400 transition-all"
                    value={username}
                    onChange={(e) => setUserName(e.target.value)}
                />

                {/* RIGHT ICON */}


                <svg xmlns="http://www.w3.org/2000/svg" className='absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer' width="45" height="45" viewBox="0 0 24 24">
                    <g fill="#0096ff" fill-opacity="0" stroke="#0096ff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1">
                        <path stroke-dasharray="22" d="M12 5c1.66 0 3 1.34 3 3c0 1.66 -1.34 3 -3 3c-1.66 0 -3 -1.34 -3 -3c0 -1.66 1.34 -3 3 -3Z">
                            <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.25s" values="22;0" />
                            <animate fill="freeze" attributeName="fill-opacity" begin="0.55s" dur="0.075s" to="0.3" />
                        </path>
                        <path stroke-dasharray="38" stroke-dashoffset="38" d="M12 14c4 0 7 2 7 3v2h-14v-2c0 -1 3 -3 7 -3Z">
                            <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.25s" dur="0.25s" to="0" />
                            <animate fill="freeze" attributeName="fill-opacity" begin="0.55s" dur="0.075s" to="0.3" />
                        </path>
                    </g>
                </svg>
            </div>
        </div>
    )
}

export default Search