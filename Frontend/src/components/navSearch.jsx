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
        <div className='w-[90%] '>
            <div className="relative ">
                {/* Search Icon */}
                <svg xmlns="http://www.w3.org/2000/svg" className="absolute m-2" width="31" height="30" viewBox="0 0 20 20"><path fill="#fff" d="M10 2a4 4 0 1 0 0 8a4 4 0 0 0 0-8M7 6a3 3 0 1 1 6 0a3 3 0 0 1-6 0m7.865 10.797c-1.071.683-2.454 1.064-3.962 1.171a1.5 1.5 0 0 0-.342-.529l-.44-.44c1.685-.016 3.16-.379 4.206-1.046C15.377 15.283 16 14.31 16 13a1 1 0 0 0-1-1H8.744a4.5 4.5 0 0 0-.502-1H15a2 2 0 0 1 2 2c0 1.691-.833 2.966-2.135 3.797M4.5 17c.786 0 1.512-.26 2.096-.697l2.55 2.55a.5.5 0 1 0 .708-.707l-2.55-2.55A3.5 3.5 0 1 0 4.5 17m0-1a2.5 2.5 0 1 1 0-5a2.5 2.5 0 0 1 0 5" /></svg>

                {/* Input */}
                <input
                    type="text"
                    placeholder="Search Developers"
                    className="w-full h-[45px] text-gray-200 rounded-xl pl-12 pr-4 bg-black/90 border border-white/10 outline-none focus:border-green-400 transition-all"
                    required
                    value={username}
                    onChange={(e) => {
                        setUserName(e.target.value);
                    }}
                />
            </div></div>
    )
}

export default Search