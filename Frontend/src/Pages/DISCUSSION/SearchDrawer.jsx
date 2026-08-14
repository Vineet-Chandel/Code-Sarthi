import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const SearchDrawer = ({ showCreateTab, setShowCreateTab, handleOpenSavedMessages }) => {
    const navigate = useNavigate();


    return (
        <AnimatePresence>
            {showCreateTab && (
                <div className='absolute inset-0 w-full bg-black/30 h-[calc(100vh-65px)]' onClick={() => setShowCreateTab(false)}>
                    <motion.div
                        initial={{ x: -300 }}
                        animate={{ x: 0 }}
                        exit={{ x: -300 }}
                        transition={{ type: "easeOut", duration: 0.1 }}
                        className="absolute top-40 left-3 -translate-x-1/2  bg-white py-4 pr-4 rounded-xl shadow-xl z-50 w-50"
                    >
                        <p className='text-xs pl-3 font-semibold text-gray-700'>Intelligence</p>
                        <h1 
                            onClick={() => {
                                setShowCreateTab(false);
                                navigate('/app/shastraAI');
                            }}
                            className="text-sm p-1 cursor-pointer hover:bg-gray-300 px-3 rounded-md mb-3 font-semibold text-gray-800 flex items-center gap-1"
                        >

                            <span><svg xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" viewBox="0 0 24 24">
                                <path fill="#000" d="M16.4 21h-2.154l-2-5H5.754l-2 5H1.6L8 5h2zm4.6-9v9h-2v-9zM6.554 14h4.892L9 7.885zM19.529 2.32a.507.507 0 0 1 .942 0l.253.61a4.37 4.37 0 0 0 2.25 2.327l.717.32a.53.53 0 0 1 0 .962l-.758.338a4.36 4.36 0 0 0-2.22 2.25l-.246.566a.506.506 0 0 1-.934 0l-.247-.565a4.36 4.36 0 0 0-2.219-2.251l-.76-.338a.53.53 0 0 1 0-.963l.718-.32a4.37 4.37 0 0 0 2.251-2.325z"></path>
                            </svg></span>  Shastra Ai

                        </h1>
                        <p className='text-xs pl-3 font-semibold text-gray-700'>Actions</p>
                        <h1 
                            onClick={() => {
                                setShowCreateTab(false);
                                navigate('/app/teams');
                            }}
                            className="text-sm cursor-pointer hover:bg-gray-300 p-1 px-3 rounded-md font-semibold text-gray-800 flex items-center gap-1"
                        >

                            <span>

                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="12" cy="9" r="4" fill="#33363F" />
                                    <circle cx="17" cy="9" r="3" fill="#33363F" />
                                    <circle cx="7" cy="9" r="3" fill="#33363F" />
                                    <path fillRule="evenodd" clipRule="evenodd" d="M17.5685 18H19.895C20.4867 18 20.9403 17.4901 20.7966 16.9162C20.4284 15.4458 19.448 13 17 13C16.114 13 15.4201 13.3205 14.8781 13.7991C16.3858 14.7773 17.1654 16.4902 17.5685 18Z" fill="#33363F" />
                                    <path fillRule="evenodd" clipRule="evenodd" d="M9.12197 13.7991C8.57989 13.3205 7.88609 13 7 13C4.55208 13 3.57166 15.4458 3.20343 16.9162C3.05971 17.4901 3.51335 18 4.10498 18H6.43155C6.83464 16.4902 7.61422 14.7773 9.12197 13.7991Z" fill="#33363F" />
                                    <path d="M12 14C15.7087 14 16.6665 17.301 16.9139 19.0061C16.9932 19.5526 16.5523 20 16 20H8C7.44772 20 7.00684 19.5526 7.08614 19.0061C7.33351 17.301 8.29134 14 12 14Z" fill="#33363F" />
                                </svg>

                            </span>  Create Team

                        </h1>
                        <h1 
                            className="text-sm cursor-pointer hover:bg-gray-300 p-1 px-3 rounded-md mb-3 font-semibold text-gray-800 flex items-center gap-1"
                            onClick={() => {
                                handleOpenSavedMessages();
                                setShowCreateTab(false);
                            }}
                        >

                            <span>
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15 5.70501L15 9L15 21L12 20L9 21L6 20L3 21L3 6.48612C3 5.09488 3 4.39927 3.33103 3.89795C3.4798 3.67265 3.67264 3.4798 3.89794 3.33103C4.39926 3.00001 5.09488 3.00001 6.48611 3.00001L15.0995 3.00001C15.9684 3.00001 16.3096 4.12695 15.5866 4.60893C15.2201 4.85325 15 5.26456 15 5.70501Z" fill="#2A4157" fillOpacity="0.24" />
                                    <path d="M15 9L20.1429 9C20.477 9 20.644 9 20.766 8.92336C20.8296 8.8834 20.8834 8.82962 20.9234 8.76602C21 8.64405 21 8.47698 21 8.14286L21 6.00001C21 4.34315 19.6569 3.00001 18 3.00001L7 3.00001C5.11438 3.00001 4.17157 3.00001 3.58579 3.58579C3 4.17158 3 5.11439 3 7.00001L3 21L6 20L9 21L12 20L15 21L15 9ZM18 3.00001C16.3431 3.00001 15 4.34315 15 6.00001L15 9" stroke="#222222" strokeWidth="1.2" />
                                    <path d="M7 7L11 7" stroke="#222222" strokeWidth="1.2" strokeLinecap="round" />
                                    <path d="M8 11H7" stroke="#222222" strokeWidth="1.2" strokeLinecap="round" />
                                    <path d="M7 15L10 15" stroke="#222222" strokeWidth="1.2" strokeLinecap="round" />
                                </svg>
                            </span> Saved Messages

                        </h1>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    )
}

export default SearchDrawer