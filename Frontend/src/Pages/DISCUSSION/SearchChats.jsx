import { AnimatePresence, motion, scale } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import SearchDrawer from './SearchDrawer';


const SearchChats = () => {
    const [showCreateTab, setShowCreateTab] = useState(false)
    const user = useSelector(state => state.user.user.DATA)
    const inputRef = useRef(null);
    const focusInput = () => {
        inputRef.current.focus();
    }
    const [typedWord, setTypedWord] = useState("");
    const [welcomeUser, setWelcomeUser] = useState(false);
    const [printingNameFinished, setPrintingNameFinished] = useState(false);
    useEffect(() => {
        if (!user) return;

        const name = user.firstName + " " + user.lastName;
        let idx = 0;
        setWelcomeUser(true);
        const namePrinter = setInterval(() => {
            if (idx > name.length - 1) {
                clearInterval(namePrinter);
                setPrintingNameFinished(true)
                return;
            }
            setTypedWord(prev => prev + name[idx++])

            return;
        }, 100);

        return () => clearInterval(namePrinter);
    }, [])

    useEffect(() => {
        setTimeout(() => {
            setWelcomeUser(false)
        }, 5500);
    }, [printingNameFinished])

    const [search, setSearch] = useState("");


    return (
        <div className='bg-white p-0.5  flex flex-col gap-1 rounded-2xl'>

            <SearchDrawer showCreateTab={showCreateTab} setShowCreateTab={setShowCreateTab} />
            <AnimatePresence>


                {welcomeUser && (
                    <motion.div
                        initial={{
                            opacity: 0,


                        }}
                        animate={{
                            opacity: 1,

                        }}
                        exit={{
                            opacity: 0,


                        }}
                        transition={{
                            duration: 0.4
                        }}
                        className="overflow-hidden rounded-2xl bg-black/30">  <div className='p-2 flex items-center justify-between'>


                            <p className='text-2xl text-black font-bold  flex items-center gap-1'>

                                <span>

                                    <motion.svg

                                        animate={{ rotateY: 360 }}
                                        transition={{ duration: 2, repeat: Infinity, repeatType: "spring" }}
                                        width="34" height="34" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M20 11C20 8.19108 20 6.78661 19.3259 5.77772C19.034 5.34096 18.659 4.96596 18.2223 4.67412C17.2134 4 15.8089 4 13 4H11C8.19108 4 6.78661 4 5.77772 4.67412C5.34096 4.96596 4.96596 5.34096 4.67412 5.77772C4 6.78661 4 8.19108 4 11C4 13.8089 4 15.2134 4.67412 16.2223C4.96596 16.659 5.34096 17.034 5.77772 17.3259C6.65907 17.9148 7.8423 17.9892 10 17.9986V18L11.1056 20.2111C11.4741 20.9482 12.5259 20.9482 12.8944 20.2111L14 18V17.9986C16.1577 17.9892 17.3409 17.9148 18.2223 17.3259C18.659 17.034 19.034 16.659 19.3259 16.2223C20 15.2134 20 13.8089 20 11ZM9 8C8.44772 8 8 8.44772 8 9C8 9.55228 8.44772 10 9 10H15C15.5523 10 16 9.55228 16 9C16 8.44772 15.5523 8 15 8H9ZM9 12C8.44772 12 8 12.4477 8 13C8 13.5523 8.44772 14 9 14H12C12.5523 14 13 13.5523 13 13C13 12.4477 12.5523 12 12 12H9Z" fill="#222222" />
                                    </motion.svg>

                                </span>


                                <span className='font-extralight' >Hello,
                                    <span className='font-extrabold'>{typedWord}
                                    </span>

                                </span>
                            </p>

                            <p className='text-black  text-md font-bold'>{new Date().toLocaleString("default", {
                                month: "long",
                            }) + " " + new Date().getDate() + ", " + new Date().getFullYear()}</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            <div
                onClick={focusInput}
                className="group w-full flex items-center gap-3 bg-base-100 border border-base-300 border-[2px] px-1 py-1 rounded-2xl  hover:border-info  transition-all duration-300 "
            >
                {/*  */}
                {/* LEFT ICON */}


                <span className=" bg-accent rounded-2xl p-2">    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 80 80">
                    <g fill="none">
                        <path fill="#fff" d="M65.368 67.848a2 2 0 0 0 2.828-2.829zm-9.634-15.29a2 2 0 0 0-2.828 2.828zm12.462 12.461L55.734 52.557l-2.828 2.829l12.462 12.462z"></path>
                        <path fill="#807c79ff" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M13.578 30.724a24.249 24.249 0 1 1 46.844 12.552a24.249 24.249 0 0 1-46.844-12.552"></path>
                    </g>
                </svg></span>



                <input
                    ref={inputRef}
                    type="text"
                    placeholder="Search conversations..."
                    className="flex-1 bg-transparent outline-none text-sm placeholder-accent text-white"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <div>
                    <div className="w-10 h-10 rounded-2xl bg-base-200 hover:bg-base-300  flex items-center justify-center " onClick={() => setShowCreateTab(prev => !prev)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 24 24"><path fill="#fff" fillRule="evenodd" d="M20.75 7a.75.75 0 0 1-.75.75H4a.75.75 0 0 1 0-1.5h16a.75.75 0 0 1 .75.75m0 5a.75.75 0 0 1-.75.75H4a.75.75 0 0 1 0-1.5h16a.75.75 0 0 1 .75.75m0 5a.75.75 0 0 1-.75.75H4a.75.75 0 0 1 0-1.5h16a.75.75 0 0 1 .75.75" clipRule="evenodd"></path></svg>
                    </div>

                </div>

            </div>
        </div >


    )
}

export default SearchChats