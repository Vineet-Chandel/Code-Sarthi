import { AnimatePresence, motion, scale } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import SearchDrawer from './SearchDrawer';


const SearchChats = ({ loading, setLoading }) => {
    const [showCreateTab, setShowCreateTab] = useState(false)
    const user = useSelector(state => state.user.user.DATA)
    const inputRef = useRef(null);
    const focusInput = () => {
        inputRef.current.focus();
    }



    const [search, setSearch] = useState("");


    return (
        <div className='flex gap-3'>


            <div className="ml-3 flex items-center justify-center " onClick={() => setShowCreateTab(prev => !prev)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="1.6em" height="1.6em" viewBox="0 0 24 24"><path fill="#edebebff" fillRule="evenodd" d="M20.75 7a.75.75 0 0 1-.75.75H4a.75.75 0 0 1 0-1.5h16a.75.75 0 0 1 .75.75m0 5a.75.75 0 0 1-.75.75H4a.75.75 0 0 1 0-1.5h16a.75.75 0 0 1 .75.75m0 5a.75.75 0 0 1-.75.75H4a.75.75 0 0 1 0-1.5h16a.75.75 0 0 1 .75.75" clipRule="evenodd"></path></svg>
            </div>

            <div
                onClick={focusInput}
                className="h-[50px] group w-full flex items-center gap-3  border border-base-300 border px-1 py-1 rounded-full  bg-[#2c2c2c]  transition-all duration-300 "
            >
                <SearchDrawer showCreateTab={showCreateTab} setShowCreateTab={setShowCreateTab} />
                {/* LEFT ICON */}
                <span className=" ml-2.5">


                    {loading ? (<svg xmlns="http://www.w3.org/2000/svg" width="1.7em" height="1.7em" viewBox="0 0 24 24">
                        <g fill="none" stroke="#abaaaaff" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}>
                            <path strokeDasharray={32} d="M12 21c-4.97 0 -9 -4.03 -9 -9c0 -4.97 4.03 -9 9 -9">
                                <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.6s" values="32;0"></animate>
                            </path>
                            <path strokeDasharray="2 4" strokeDashoffset={6} d="M12 3c4.97 0 9 4.03 9 9c0 4.97 -4.03 9 -9 9" opacity={0}>
                                <set fill="freeze" attributeName="opacity" begin="0.45s" to={1}></set>
                                <animateTransform fill="freeze" attributeName="transform" begin="0.45s" dur="0.6s" type="rotate" values="-180 12 12;0 12 12"></animateTransform>
                                <animate attributeName="stroke-dashoffset" begin="0.85s" dur="0.6s" repeatCount="indefinite" to={0}></animate>
                            </path>
                            <path strokeDasharray={10} strokeDashoffset={10} d="M12 8v7.5">
                                <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.85s" dur="0.2s" to={0}></animate>
                            </path>
                            <path strokeDasharray={8} strokeDashoffset={8} d="M12 15.5l3.5 -3.5M12 15.5l-3.5 -3.5">
                                <animate fill="freeze" attributeName="stroke-dashoffset" begin="1.05s" dur="0.2s" to={0}></animate>
                            </path>
                        </g>
                    </svg>) : (<svg xmlns="http://www.w3.org/2000/svg" width="1.7em" height="1.7em" viewBox="0 0 24 24">
                        <path fill="#abaaaaff" d="M9.539 15.23q-2.398 0-4.065-1.666Q3.808 11.899 3.808 9.5t1.666-4.065T9.539 3.77t4.064 1.666T15.269 9.5q0 1.042-.369 2.017t-.97 1.668l5.909 5.907q.14.14.15.345q.009.203-.15.363q-.16.16-.354.16t-.354-.16l-5.908-5.908q-.75.639-1.725.989t-1.96.35m0-1q1.99 0 3.361-1.37q1.37-1.37 1.37-3.361T12.9 6.14T9.54 4.77q-1.991 0-3.361 1.37T4.808 9.5t1.37 3.36t3.36 1.37"></path>
                    </svg>)
                    }


                </span>



                <input
                    ref={inputRef}
                    type="text"
                    placeholder="Search"
                    className="flex-1 bg-transparent outline-none text-lg placeholder-[#abaaaaff] text-white"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />



            </div >
        </div>




    )
}

export default SearchChats