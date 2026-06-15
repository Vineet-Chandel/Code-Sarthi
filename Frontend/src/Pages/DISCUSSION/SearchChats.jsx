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

        <div
            onClick={focusInput}
            className="group w-full flex items-center gap-3 bg-base-100 border border-base-300 border px-1 py-1 rounded-full    transition-all duration-300 "
        >
            <SearchDrawer showCreateTab={showCreateTab} setShowCreateTab={setShowCreateTab} />
            {/* LEFT ICON */}
            <span className=" bg-accent rounded-full p-1.5">


                {loading ? (<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                    <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}>
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
                </svg>) : (<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 80 80">
                    <g fill="none">
                        <path fill="#fff" d="M65.368 67.848a2 2 0 0 0 2.828-2.829zm-9.634-15.29a2 2 0 0 0-2.828 2.828zm12.462 12.461L55.734 52.557l-2.828 2.829l12.462 12.462z"></path>
                        <path fill="#807c79ff" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M13.578 30.724a24.249 24.249 0 1 1 46.844 12.552a24.249 24.249 0 0 1-46.844-12.552"></path>
                    </g>
                </svg>)
                }


            </span>



            <input
                ref={inputRef}
                type="text"
                placeholder="Search conversations..."
                className="flex-1 bg-transparent outline-none text-sm placeholder-accent text-white"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <div>
                <div className="w-9 h-9 rounded-2xl bg-base-200 hover:bg-base-300  flex items-center justify-center " onClick={() => setShowCreateTab(prev => !prev)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="#fff" fillRule="evenodd" d="M20.75 7a.75.75 0 0 1-.75.75H4a.75.75 0 0 1 0-1.5h16a.75.75 0 0 1 .75.75m0 5a.75.75 0 0 1-.75.75H4a.75.75 0 0 1 0-1.5h16a.75.75 0 0 1 .75.75m0 5a.75.75 0 0 1-.75.75H4a.75.75 0 0 1 0-1.5h16a.75.75 0 0 1 .75.75" clipRule="evenodd"></path></svg>
                </div>

            </div>

        </div >



    )
}

export default SearchChats