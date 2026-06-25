import React, { useCallback, useRef, useState } from "react";
import {

    MoreVertical,
    Smile,
    Paperclip,


} from "lucide-react";



function ThreeDotTab() {



    const items = [
        {
            label: "Call",
            icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.7071 13.7071L20.3552 16.3552C20.7113 16.7113 20.7113 17.2887 20.3552 17.6448C18.43 19.57 15.3821 19.7866 13.204 18.153L11.6286 16.9714C9.88504 15.6638 8.33622 14.115 7.02857 12.3714L5.84701 10.796C4.21341 8.61788 4.43001 5.56999 6.35523 3.64477C6.71133 3.28867 7.28867 3.28867 7.64477 3.64477L10.2929 6.29289C10.6834 6.68342 10.6834 7.31658 10.2929 7.70711L9.27175 8.72825C9.10946 8.89054 9.06923 9.13846 9.17187 9.34373C10.3585 11.7171 12.2829 13.6415 14.6563 14.8281C14.8615 14.9308 15.1095 14.8905 15.2717 14.7283L16.2929 13.7071C16.6834 13.3166 17.3166 13.3166 17.7071 13.7071Z" fill="#7E869E" fill-opacity="0.25" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M20.3552 17.6448C20.7113 17.2887 20.7113 16.7113 20.3552 16.3552L17.7071 13.7071C17.707 13.707 17.707 13.707 17.7069 13.7069C17.3164 13.3166 16.6834 13.3166 16.2929 13.7071L15.5 14.5L19.4048 18.4048C19.743 18.1914 20.0621 17.9379 20.3552 17.6448ZM5.59518 4.59517L9.5 8.49999L10.2929 7.7071C10.6834 7.31657 10.6834 6.68341 10.2929 6.29288L7.64477 3.64476C7.28867 3.28866 6.71133 3.28866 6.35523 3.64476C6.06211 3.93788 5.80859 4.25703 5.59518 4.59517Z" fill="#222222" />
            </svg>

        },
        {
            label: "Video call",
            icon: <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                <g fill="#fff">
                    <path d="M20.117 7.625a1 1 0 0 0-.564.1L15 10v4l4.553 2.275A1 1 0 0 0 21 15.383V8.617a1 1 0 0 0-.883-.992"></path>
                    <path d="M5 5C3.355 5 2 6.355 2 8v8c0 1.645 1.355 3 3 3h8c1.645 0 3-1.355 3-3V8c0-1.645-1.355-3-3-3z"></path>
                </g>
            </svg>
        },
        {
            label: "Select Messages",
            icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="9" fill="#7E869E" fill-opacity="0.25" stroke="#222222" stroke-width="1.2" />
                <path d="M8 12L11 15L16 9" stroke="#222222" stroke-width="1.2" />
            </svg>
        },
        {
            label: "Block User",
            icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="24" height="24" fill="white" />
                <circle cx="12" cy="12" r="8.5" fill="#2A4157" fill-opacity="0.24" stroke="#222222" />
                <path d="M9.0001 14.9997L15.0001 8.99966" stroke="#222222" stroke-width="1.2" />
                <path d="M15 15L9 9" stroke="#222222" stroke-width="1.2" />
            </svg>

        },
        {
            label: "Delete Chat",
            icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 9.3C4 9.15858 4 9.08787 4.04393 9.04393C4.08787 9 4.15858 9 4.3 9H19.7C19.8414 9 19.9121 9 19.9561 9.04393C20 9.08787 20 9.15858 20 9.3V15C20 16.8856 20 17.8284 19.4142 18.4142C18.8284 19 17.8856 19 16 19H8C6.11438 19 5.17157 19 4.58579 18.4142C4 17.8284 4 16.8856 4 15V9.3Z" fill="#7E869E" fill-opacity="0.25" />
                <path d="M2 7C2 5.89543 2.89543 5 4 5H20C21.1046 5 22 5.89543 22 7C22 7.55228 21.5523 8 21 8H3C2.44772 8 2 7.55228 2 7Z" fill="#7E869E" fill-opacity="0.25" />
                <rect x="9" y="12" width="6" height="1" rx="0.5" fill="#222222" />
            </svg>

        },
    ]


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
                        <h1 className="text-sm p-1 cursor-pointer hover:bg-gray-300 px-3 rounded-md mb-3 font-semibold text-gray-800 flex items-center gap-1">

                            <span><svg xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" viewBox="0 0 24 24">
                                <path fill="#000" d="M16.4 21h-2.154l-2-5H5.754l-2 5H1.6L8 5h2zm4.6-9v9h-2v-9zM6.554 14h4.892L9 7.885zM19.529 2.32a.507.507 0 0 1 .942 0l.253.61a4.37 4.37 0 0 0 2.25 2.327l.717.32a.53.53 0 0 1 0 .962l-.758.338a4.36 4.36 0 0 0-2.22 2.25l-.246.566a.506.506 0 0 1-.934 0l-.247-.565a4.36 4.36 0 0 0-2.219-2.251l-.76-.338a.53.53 0 0 1 0-.963l.718-.32a4.37 4.37 0 0 0 2.251-2.325z"></path>
                            </svg></span>  Shastra Ai

                        </h1>
                        <p className='text-xs pl-3 font-semibold text-gray-700'>Actions</p>
                        <h1 className="text-sm cursor-pointer hover:bg-gray-300 p-1 px-3 rounded-md font-semibold text-gray-800 flex items-center gap-1">

                            <span>

                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="12" cy="9" r="4" fill="#33363F" />
                                    <circle cx="17" cy="9" r="3" fill="#33363F" />
                                    <circle cx="7" cy="9" r="3" fill="#33363F" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M17.5685 18H19.895C20.4867 18 20.9403 17.4901 20.7966 16.9162C20.4284 15.4458 19.448 13 17 13C16.114 13 15.4201 13.3205 14.8781 13.7991C16.3858 14.7773 17.1654 16.4902 17.5685 18Z" fill="#33363F" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M9.12197 13.7991C8.57989 13.3205 7.88609 13 7 13C4.55208 13 3.57166 15.4458 3.20343 16.9162C3.05971 17.4901 3.51335 18 4.10498 18H6.43155C6.83464 16.4902 7.61422 14.7773 9.12197 13.7991Z" fill="#33363F" />
                                    <path d="M12 14C15.7087 14 16.6665 17.301 16.9139 19.0061C16.9932 19.5526 16.5523 20 16 20H8C7.44772 20 7.00684 19.5526 7.08614 19.0061C7.33351 17.301 8.29134 14 12 14Z" fill="#33363F" />
                                </svg>

                            </span>  Create Team

                        </h1>
                        <h1 className="text-sm cursor-pointer hover:bg-gray-300 p-1 px-3 rounded-md mb-3 font-semibold text-gray-800 flex items-center gap-1">

                            <span>
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15 5.70501L15 9L15 21L12 20L9 21L6 20L3 21L3 6.48612C3 5.09488 3 4.39927 3.33103 3.89795C3.4798 3.67265 3.67264 3.4798 3.89794 3.33103C4.39926 3.00001 5.09488 3.00001 6.48611 3.00001L15.0995 3.00001C15.9684 3.00001 16.3096 4.12695 15.5866 4.60893C15.2201 4.85325 15 5.26456 15 5.70501Z" fill="#2A4157" fill-opacity="0.24" />
                                    <path d="M15 9L20.1429 9C20.477 9 20.644 9 20.766 8.92336C20.8296 8.8834 20.8834 8.82962 20.9234 8.76602C21 8.64405 21 8.47698 21 8.14286L21 6.00001C21 4.34315 19.6569 3.00001 18 3.00001L7 3.00001C5.11438 3.00001 4.17157 3.00001 3.58579 3.58579C3 4.17158 3 5.11439 3 7.00001L3 21L6 20L9 21L12 20L15 21L15 9ZM18 3.00001C16.3431 3.00001 15 4.34315 15 6.00001L15 9" stroke="#222222" stroke-width="1.2" />
                                    <path d="M7 7L11 7" stroke="#222222" stroke-width="1.2" stroke-linecap="round" />
                                    <path d="M8 11H7" stroke="#222222" stroke-width="1.2" stroke-linecap="round" />
                                    <path d="M7 15L10 15" stroke="#222222" stroke-width="1.2" stroke-linecap="round" />
                                </svg>
                            </span> Saved Messages

                        </h1>

                        <h1 className="text-sm cursor-pointer hover:bg-gray-300 p-1 px-3 rounded-md font-semibold text-gray-800 flex items-center gap-1">

                            <span>
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M14.1361 3.36144C14.0928 2.92777 14.0711 2.71093 13.9838 2.54161C13.8728 2.32656 13.6877 2.15902 13.4627 2.07005C13.2855 2 13.0676 2 12.6318 2H11.3681C10.9324 2 10.7145 2 10.5374 2.07001C10.3123 2.15898 10.1271 2.32658 10.0162 2.5417C9.9289 2.71098 9.90722 2.92776 9.86387 3.36131C9.78181 4.18195 9.74077 4.59227 9.56907 4.81742C9.35113 5.10319 8.99661 5.25003 8.64044 5.20207C8.35982 5.16427 8.04061 4.9031 7.4022 4.38076C7.06481 4.10472 6.89612 3.9667 6.71463 3.90872C6.48414 3.8351 6.23478 3.84753 6.01277 3.94373C5.83795 4.01947 5.68385 4.17357 5.37565 4.48177L4.48233 5.37509C4.17403 5.68339 4.01988 5.83754 3.94413 6.01243C3.848 6.23438 3.83557 6.48364 3.90914 6.71405C3.96711 6.89561 4.10516 7.06435 4.38128 7.40182C4.90385 8.04052 5.16514 8.35987 5.20287 8.64066C5.2507 8.99664 5.10395 9.35092 4.81842 9.56881C4.59319 9.74068 4.18264 9.78173 3.36155 9.86384C2.92777 9.90722 2.71088 9.92891 2.54152 10.0163C2.32654 10.1272 2.15905 10.3123 2.07008 10.5372C2 10.7144 2 10.9324 2 11.3683V12.6318C2 13.0676 2 13.2855 2.07005 13.4627C2.15902 13.6877 2.32656 13.8728 2.54161 13.9838C2.71093 14.0711 2.92776 14.0928 3.36143 14.1361C4.1823 14.2182 4.59273 14.2593 4.81792 14.4311C5.10357 14.649 5.25037 15.0034 5.20247 15.3594C5.16471 15.6402 4.90351 15.9594 4.3811 16.5979C4.10511 16.9352 3.96711 17.1039 3.90913 17.2854C3.8355 17.5159 3.84794 17.7652 3.94414 17.9873C4.01988 18.1621 4.17398 18.3162 4.48217 18.6243L5.37561 19.5178C5.6838 19.826 5.8379 19.9801 6.01272 20.0558C6.23474 20.152 6.4841 20.1645 6.71458 20.0908C6.89607 20.0329 7.06474 19.8949 7.40208 19.6189C8.04059 19.0964 8.35985 18.8352 8.64057 18.7975C8.99663 18.7496 9.35101 18.8964 9.56892 19.182C9.74072 19.4072 9.78176 19.8176 9.86385 20.6385C9.90722 21.0722 9.92891 21.2891 10.0162 21.4584C10.1272 21.6734 10.3123 21.841 10.5373 21.9299C10.7145 22 10.9324 22 11.3682 22H12.6316C13.0676 22 13.2856 22 13.4628 21.9299C13.6877 21.8409 13.8728 21.6735 13.9837 21.4585C14.0711 21.2891 14.0928 21.0722 14.1362 20.6383C14.2183 19.8173 14.2593 19.4068 14.4311 19.1816C14.649 18.896 15.0034 18.7492 15.3595 18.7971C15.6402 18.8348 15.9594 19.096 16.5979 19.6184C16.9352 19.8944 17.1039 20.0324 17.2854 20.0904C17.5159 20.164 17.7652 20.1516 17.9873 20.0554C18.1621 19.9796 18.3162 19.8255 18.6243 19.5174L19.5179 18.6238C19.826 18.3157 19.98 18.1617 20.0558 17.9869C20.152 17.7648 20.1645 17.5154 20.0908 17.2848C20.0328 17.1034 19.8949 16.9348 19.619 16.5976C19.0968 15.9593 18.8357 15.6402 18.7979 15.3596C18.7499 15.0034 18.8967 14.6489 19.1825 14.4309C19.4077 14.2592 19.818 14.2182 20.6386 14.1361C21.0722 14.0928 21.289 14.0711 21.4583 13.9838C21.6734 13.8729 21.841 13.6877 21.93 13.4626C22 13.2855 22 13.0676 22 12.6319V11.3682C22 10.9324 22 10.7145 21.9299 10.5373C21.841 10.3123 21.6734 10.1272 21.4584 10.0162C21.2891 9.92891 21.0722 9.90722 20.6385 9.86385C19.8176 9.78176 19.4072 9.74072 19.182 9.56893C18.8964 9.35102 18.7496 8.99662 18.7975 8.64056C18.8352 8.35984 19.0964 8.0406 19.6188 7.4021C19.8948 7.06478 20.0328 6.89612 20.0908 6.71464C20.1644 6.48415 20.152 6.23478 20.0558 6.01275C19.98 5.83794 19.8259 5.68385 19.5178 5.37567L18.6243 4.4822C18.3161 4.17402 18.162 4.01994 17.9872 3.94419C17.7652 3.84798 17.5158 3.83555 17.2853 3.90918C17.1038 3.96716 16.9352 4.10515 16.5979 4.38113C15.9594 4.90352 15.6402 5.16472 15.3595 5.20248C15.0034 5.25038 14.649 5.10358 14.4311 4.81793C14.2593 4.59274 14.2182 4.1823 14.1361 3.36144Z" fill="#7E869E" fill-opacity="0.75" />
                                    <circle cx="12" cy="12" r="3" fill="#222222" />
                                </svg>
                            </span>  Settings

                        </h1>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    )
}



function ProfileTab() {



    const items = [
        {
            label: "Delete Connection"

        },

    ]
}
const useLongPress = (callback, ms = 500) => {
    const [isHolding, setIsHolding] = useState(false);
    const timeoutRef = useRef(null);

    const start = useCallback((event) => {
        // Prevent default behavior to stop accidental scrolling/zooming on mobile
        if (event.cancelable) event.preventDefault();

        setIsHolding(true);
        timeoutRef.current = setTimeout(() => {
            callback(event);
        }, ms);
    }, [callback, ms]);

    const stop = useCallback(() => {
        setIsHolding(false);
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    }, []);

    return {
        onPointerDown: start,
        onPointerUp: stop,
        onPointerLeave: stop, // Stops the action if user drags cursor away
        className: isHolding ? "holding" : "" // Optional: utility to help with styling
    };
};

const ChatArea = ({ selectedChatUser }) => {



    const handleLongPress = () => {
        console.log(switcher)
    };

    // Instantiate hook with custom action and time window
    const longPressEvents = useLongPress(handleLongPress, 600);

    const [switcher, setSwitcher] = useState("mic")
    return (
        <div className="flex h-full w-full flex-col overflow-hidden rounded-2xl  bg-transparent ">



            {/* Messages */}

            <div className="flex-1 overflow-y-auto p-6">
                {/* Messages here */}
            </div>

            {/* Input */}
            <div className="w-full flex items-center px-4 ">

                <div className="bg-white/10 p-2.5 rounded-full cursor-pointer">
                    <Paperclip />
                </div>

                <div className="border-t border-white/10 p-4 w-full">

                    <div className="flex items-center gap-3 rounded-2xl bg-white/10 p-2.5">




                        <input
                            placeholder="Write a message..."
                            className="flex-1 bg-transparent outline-none"
                        />
                        <div >
                            <Smile />
                        </div>


                    </div>




                </div>
                <div
                    {...longPressEvents}
                    onClick={() => {
                        if (switcher === "mic") {
                            setSwitcher("vnote");
                            return;
                        }
                        setSwitcher("mic")
                    }}
                    className="bg-white/10 p-2.5 rounded-full cursor-pointer">
                    {switcher === "mic" ? <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24">
                        <path fill="#fff" fillRule="evenodd" d="M12 2C9.769 2 8 3.757 8 5.828v6.344C8 14.242 9.769 16 12 16s4-1.758 4-3.828V5.828C16 3.758 14.231 2 12 2" clipRule="evenodd"></path>
                        <path fill="#fff" d="M13 20.945V23a1 1 0 1 1-2 0v-2.055A9 9 0 0 1 3 12a1 1 0 1 1 2 0a7 7 0 1 0 14 0a1 1 0 1 1 2 0a9 9 0 0 1-8 8.945"></path>
                    </svg>
                        :
                        <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24">
                            <g fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}>
                                <circle cx={12} cy={12} r={4}></circle>
                                <rect width={20} height={20} x={2} y={2} rx={5}></rect>
                            </g>
                        </svg>
                    }

                </div>
            </div>


        </div>
    );
};

export default ChatArea;