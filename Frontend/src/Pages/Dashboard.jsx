import { useSelector } from "react-redux";
const Dashboard = () => {
    let icon;
    const user = useSelector(store => store.user.user.DATA);

    if (user.isVerified) {
        icon = <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24"><path fill="#44f53d" fill-rule="evenodd" d="M13.11 13.5a1.71 1.71 0 0 0-2.22 0a1.7 1.7 0 0 1-.973.403a1.71 1.71 0 0 0-1.569 1.569c-.028.359-.17.7-.403.973a1.71 1.71 0 0 0 0 2.219a1.7 1.7 0 0 1 .403.973a1.71 1.71 0 0 0 1.57 1.57c.358.028.699.169.973.402a1.71 1.71 0 0 0 2.218 0a1.7 1.7 0 0 1 .973-.403a1.71 1.71 0 0 0 1.57-1.569c.028-.358.169-.7.402-.973a1.71 1.71 0 0 0 0-2.219a1.7 1.7 0 0 1-.403-.973a1.71 1.71 0 0 0-1.569-1.569a1.7 1.7 0 0 1-.973-.403m.902 3.603a.75.75 0 1 0-1.024-1.097l-1.63 1.523l-.346-.323a.75.75 0 0 0-1.024 1.097l.857.8a.75.75 0 0 0 1.024 0z" clip-rule="evenodd" /><path fill="#44f53d" d="M2 12V8c0-2.828 0-4.243.879-5.121C3.757 2 5.172 2 8 2h8c2.828 0 4.243 0 5.121.879C22 3.757 22 5.172 22 8v4c0 2.828 0 4.243-.879 5.121c-.835.836-2.156.877-4.717.879a1.71 1.71 0 0 0-.35-1.555a1.7 1.7 0 0 1-.403-.973a1.71 1.71 0 0 0-1.569-1.569a1.7 1.7 0 0 1-.973-.403a1.71 1.71 0 0 0-2.219 0a1.7 1.7 0 0 1-.973.403a1.71 1.71 0 0 0-1.569 1.569c-.028.359-.17.7-.403.973A1.71 1.71 0 0 0 7.595 18c-2.56-.002-3.88-.043-4.716-.879C2 16.243 2 14.828 2 12" opacity="0.3" /><path fill="#44f53d" d="M8.25 6A.75.75 0 0 1 9 5.25h6a.75.75 0 0 1 0 1.5H9A.75.75 0 0 1 8.25 6M7 8.75a.75.75 0 0 0 0 1.5h10a.75.75 0 0 0 0-1.5z" /></svg>
    } else {
        icon = <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24"><path fill="#f53d5a" d="M14.5 2.5c0 1.5-1.5 6-1.5 6h-2S9.5 4 9.5 2.5a2.5 2.5 0 0 1 5 0M12 10c-1.1 0-2 .9-2 2s.9 2 2 2s2-.9 2-2s-.9-2-2-2m4.08-4.89c.18-.75.33-1.47.39-2.06A10 10 0 0 1 22 12c0 5.52-4.48 10-10 10S2 17.52 2 12c0-3.92 2.25-7.31 5.53-8.95c.07.59.21 1.32.39 2.06A8.03 8.03 0 0 0 4 12c0 4.42 3.58 8 8 8s8-3.58 8-8c0-2.93-1.58-5.49-3.92-6.89M18 12c0 3.31-2.69 6-6 6s-6-2.69-6-6c0-2 .98-3.77 2.48-4.86c.23.81.65 2.07.65 2.07C8.43 9.93 8 10.92 8 12c0 2.21 1.79 4 4 4s4-1.79 4-4c0-1.08-.43-2.07-1.13-2.79c0 0 .41-1.22.65-2.07A6 6 0 0 1 18 12" /></svg>
    }
    return (
        <div className="bg-black h-[2000px]">

            < div className="m-[30px] w-[90%] rounded-2xl justify-self-center  flex flex-col justify-center items-start bg-gray-700/30 pb-10 pt-10 pl-5 " >

                <div className="px-[30px] w-full ">
                    <div className="left w-full md:w-[40%] h-full flex flex-col justify-center items-center bg-gradient-to-tr from-gray-800 via-gray-900 to-black p-4 md:p-6 shadow-[inset_0_0_50px_rgba(0,0,0,0.5)] rounded-3xl">

                        {/* Profile Picture */}
                        <div className="profilePic border-[3px] border-gray-600 h-[300px] w-[300px] md:h-[300px] md:w-[300px] rounded-full overflow-hidden flex justify-center items-center">
                            <img
                                src={user.photoUrl.url || "/default-avatar.png"}
                                alt="Profile picture"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* User Information */}
                        <div className="flex flex-col justify-center items-center text-white w-full mt-6 md:mt-8">

                            {/* Full Name */}
                            <p className="text-3xl md:text-4xl lg:text-5xl font-bold text-center">
                                {user.firstName} {user.middleName} {user.lastName}
                            </p>

                            {/* Username */}
                            <p className="mt-3 md:mt-4 text-xl md:text-2xl text-gray-500 flex w-full justify-center items-center gap-3">
                                <div>@{user.username}</div>
                                <div>{icon}</div>


                            </p>



                            {/* About Section */}
                            <div className="border border-gray-700 rounded-xl w-full mt-3 md:mt-8 p-4 md:p-5 bg-gray-900/20">
                                <div className="flex flex-col md:flex-row items-start">
                                    <b className="text-gray-200 font-semibold text-xl md:text-xl mb-2 md:mb-0 md:mr-3 flex items-center gap-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 20 20">
                                            <g fill="none">
                                                <path fill="url(#SVGhuPoCeZb)" d="M5.5 3.006a1.5 1.5 0 0 0-1.5 1.5v12a1.5 1.5 0 0 0 1.5 1.5h5.57L16 13.429V4.506a1.5 1.5 0 0 0-1.5-1.5z" />
                                                <path fill="url(#SVGAzzTLe9F)" fill-opacity="0.9" d="M6 8.506a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5" />
                                                <path fill="url(#SVGAzzTLe9F)" fill-opacity="0.9" d="M6 14.506a.5.5 0 0 1 .5-.5h7a.5.5 0 1 1 0 1h-7a.5.5 0 0 1-.5-.5" />
                                                <path fill="url(#SVGAzzTLe9F)" fill-opacity="0.9" d="M6.5 11.006a.5.5 0 1 0 0 1h3a.5.5 0 0 0 0-1z" />
                                                <path fill="url(#SVGLWBaMdtp)" fill-opacity="0.3" d="M5.5 3A1.5 1.5 0 0 0 4 4.5v12A1.5 1.5 0 0 0 5.5 18h5.57L16 13.423V4.5A1.5 1.5 0 0 0 14.5 3z" />
                                                <path fill="url(#SVG9ICPddTx)" fill-opacity="0.4" d="M5.5 3A1.5 1.5 0 0 0 4 4.5v12A1.5 1.5 0 0 0 5.5 18h5.57L16 13.423V4.5A1.5 1.5 0 0 0 14.5 3z" />
                                                <path fill="url(#SVGiX2QVb5r)" d="M7 3.5A1.5 1.5 0 0 0 8.5 5h3a1.5 1.5 0 0 0 0-3h-3A1.5 1.5 0 0 0 7 3.5" />
                                                <path fill="url(#SVG7OVUGb4A)" d="M14.352 12h2.64v2.646l-3.371 3.376a2.2 2.2 0 0 1-1.02.578l-1.496.375a.89.89 0 0 1-1.078-1.079l.375-1.498a2.2 2.2 0 0 1 .577-1.021z" />
                                                <path fill="url(#SVGwOxhZdgd)" d="M13.485 18.143a2.2 2.2 0 0 1-.884.453l-1.496.375a.89.89 0 0 1-1.078-1.079l.374-1.498c.08-.318.229-.613.436-.864a3.5 3.5 0 0 0 2.648 2.613" />
                                                <path fill="url(#SVGDVKQLbRW)" d="m14.54 11.82l1.27-1.272a1.869 1.869 0 1 1 2.643 2.644l-1.174 1.175z" />
                                                <path fill="url(#SVGTJpfpQeq)" d="M18.002 13.647A3.5 3.5 0 0 1 15.344 11l-.999 1a3.5 3.5 0 0 0 2.658 2.647z" />
                                                <defs>
                                                    <linearGradient id="SVGhuPoCeZb" x1="4" x2="16" y1="4.506" y2="18.006" gradientUnits="userSpaceOnUse">
                                                        <stop stop-color="#36dff1" />
                                                        <stop offset="1" stop-color="#0094f0" />
                                                    </linearGradient>
                                                    <linearGradient id="SVGAzzTLe9F" x1="11" x2="6" y1="15.006" y2="8.006" gradientUnits="userSpaceOnUse">
                                                        <stop stop-color="#9deaff" />
                                                        <stop offset="1" stop-color="#fff" />
                                                    </linearGradient>
                                                    <linearGradient id="SVGiX2QVb5r" x1="10" x2="10" y1="5" y2="2" gradientUnits="userSpaceOnUse">
                                                        <stop stop-color="#fab500" />
                                                        <stop offset="1" stop-color="#ffe06b" />
                                                    </linearGradient>
                                                    <linearGradient id="SVG7OVUGb4A" x1="11.855" x2="15.286" y1="13.718" y2="17.149" gradientUnits="userSpaceOnUse">
                                                        <stop stop-color="#ffa43d" />
                                                        <stop offset="1" stop-color="#fb5937" />
                                                    </linearGradient>
                                                    <linearGradient id="SVGwOxhZdgd" x1="9.501" x2="12.001" y1="16.496" y2="18.993" gradientUnits="userSpaceOnUse">
                                                        <stop offset=".255" stop-color="#ffd394" />
                                                        <stop offset="1" stop-color="#ff921f" />
                                                    </linearGradient>
                                                    <linearGradient id="SVGDVKQLbRW" x1="18.067" x2="16.455" y1="10.909" y2="12.456" gradientUnits="userSpaceOnUse">
                                                        <stop stop-color="#7bfffd" />
                                                        <stop offset="1" stop-color="#dd3ce2" />
                                                    </linearGradient>
                                                    <linearGradient id="SVGTJpfpQeq" x1="16.236" x2="13.655" y1="13.496" y2="12.364" gradientUnits="userSpaceOnUse">
                                                        <stop stop-color="#ff921f" />
                                                        <stop offset="1" stop-color="#ffe994" />
                                                    </linearGradient>
                                                    <radialGradient id="SVGLWBaMdtp" cx="0" cy="0" r="1" gradientTransform="matrix(5.5 0 0 4.88692 9.5 2.5)" gradientUnits="userSpaceOnUse">
                                                        <stop stop-color="#0a1852" />
                                                        <stop offset="1" stop-color="#0a1852" stop-opacity="0" />
                                                    </radialGradient>
                                                    <radialGradient id="SVG9ICPddTx" cx="0" cy="0" r="1" gradientTransform="rotate(133.958 4.124 9.918)scale(8.10361 3.02694)" gradientUnits="userSpaceOnUse">
                                                        <stop stop-color="#0a1852" />
                                                        <stop offset="1" stop-color="#0a1852" stop-opacity="0" />
                                                    </radialGradient>
                                                </defs>
                                            </g>
                                        </svg>  About :
                                        <br />

                                        {user.about}
                                    </b>



                                </div>
                            </div>

                            {/* College Information */}
                            <div className="w-full mt-2 p-4">
                                <div className="flex flex-col md:flex-row items-start">
                                    <p className="text-lg md:text-lg font-normal italic text-gray-300 break-words flex gap-2 items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 16 16">
                                            <g fill="none">
                                                <path fill="#70777d" d="M7 2h1v2.5H7z" />
                                                <path fill="#f83f54" d="M7 1.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5z" />
                                                <path fill="url(#SVGMKtmPesi)" d="M4 8a4 4 0 1 1 8 0v1.5H4z" />
                                                <path fill="url(#SVGRO2l2cNB)" d="M4 8a4 4 0 1 1 8 0v1.5H4z" />
                                                <path fill="url(#SVGDUmvvcQu)" d="M1 10.5A1.5 1.5 0 0 1 2.5 9h11a1.5 1.5 0 0 1 1.5 1.5v4a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5z" />
                                                <path fill="url(#SVGjP3uhbrO)" fill-opacity="0.6" d="M1 10.5A1.5 1.5 0 0 1 2.5 9h11a1.5 1.5 0 0 1 1.5 1.5v4a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5z" />
                                                <path fill="#55595e" d="M6.5 12a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v3h-3z" />
                                                <path fill="#63686e" d="M4.5 11a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0v-1a.5.5 0 0 1 .5-.5m7.5.5a.5.5 0 0 0-1 0v1a.5.5 0 0 0 1 0z" />
                                                <path fill="#ca6407" d="M9.5 6a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0v-1a.5.5 0 0 1 .5-.5m-3 0a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0v-1a.5.5 0 0 1 .5-.5" />
                                                <defs>
                                                    <radialGradient id="SVGRO2l2cNB" cx="0" cy="0" r="1" gradientTransform="matrix(0 2.96154 -4.26938 0 10.8 4.846)" gradientUnits="userSpaceOnUse">
                                                        <stop stop-color="#ffd638" />
                                                        <stop offset="1" stop-color="#ffd638" stop-opacity="0" />
                                                    </radialGradient>
                                                    <radialGradient id="SVGjP3uhbrO" cx="0" cy="0" r="1" gradientTransform="rotate(97.272 3.1 10.719)scale(3.45637 7.92075)" gradientUnits="userSpaceOnUse">
                                                        <stop stop-color="#ffb357" />
                                                        <stop offset="1" stop-color="#ffb357" stop-opacity="0" />
                                                    </radialGradient>
                                                    <linearGradient id="SVGMKtmPesi" x1="8" x2="8" y1="4" y2="9.5" gradientUnits="userSpaceOnUse">
                                                        <stop stop-color="#ffc205" />
                                                        <stop offset=".735" stop-color="#ffa43d" />
                                                        <stop offset="1" stop-color="#e67505" />
                                                    </linearGradient>
                                                    <linearGradient id="SVGDUmvvcQu" x1="6.469" x2="12.675" y1="9" y2="15.664" gradientUnits="userSpaceOnUse">
                                                        <stop stop-color="#aab3bd" />
                                                        <stop offset="1" stop-color="#889096" />
                                                    </linearGradient>
                                                </defs>
                                            </g>
                                        </svg>
                                        {user.college}
                                    </p>
                                </div>
                            </div>

                            <div className="w-full mt-2 p-4">
                                <div className="flex flex-col md:flex-row items-start">
                                    <p className="text-lg md:text-lg font-normal italic text-gray-300 break-words flex gap-2 items-center">

                                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 48 48">
                                            <g fill="none">
                                                <path fill="url(#SVGeLOiQdMz)" fill-rule="evenodd" d="M27.75 4A4.25 4.25 0 0 1 32 8.25V12h.634L24.5 16.696L15.914 12H16V8.25A4.25 4.25 0 0 1 20.25 4zm-7.5 2.5a1.75 1.75 0 0 0-1.75 1.75V12h11V8.25a1.75 1.75 0 0 0-1.75-1.75z" clip-rule="evenodd" />
                                                <path fill="url(#SVGXWs6Guhh)" d="M6 21h36v12.75A6.25 6.25 0 0 1 35.75 40h-23.5A6.25 6.25 0 0 1 6 33.75z" />
                                                <path fill="url(#SVGwViHxdDk)" d="M6 21h36v12.75A6.25 6.25 0 0 1 35.75 40h-23.5A6.25 6.25 0 0 1 6 33.75z" />
                                                <path fill="url(#SVG6TxjacXC)" d="M6 18.25A6.25 6.25 0 0 1 12.25 12h23.5A6.25 6.25 0 0 1 42 18.25v6A3.75 3.75 0 0 1 38.25 28H9.75A3.75 3.75 0 0 1 6 24.25z" />
                                                <path fill="url(#SVGbV5SAcED)" d="M26 23h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2" />
                                                <defs>
                                                    <linearGradient id="SVGeLOiQdMz" x1="15.155" x2="19.673" y1="5.27" y2="18.701" gradientUnits="userSpaceOnUse">
                                                        <stop stop-color="#0094f0" />
                                                        <stop offset="1" stop-color="#163697" />
                                                    </linearGradient>
                                                    <linearGradient id="SVGXWs6Guhh" x1="7.286" x2="18.023" y1="24.563" y2="59.247" gradientUnits="userSpaceOnUse">
                                                        <stop stop-color="#0fafff" />
                                                        <stop offset="1" stop-color="#cc23d1" />
                                                    </linearGradient>
                                                    <linearGradient id="SVG6TxjacXC" x1="9.6" x2="27.246" y1="12.664" y2="32.749" gradientUnits="userSpaceOnUse">
                                                        <stop stop-color="#80f1e6" />
                                                        <stop offset=".552" stop-color="#40c4f5" />
                                                        <stop offset="1" stop-color="#00a2fa" />
                                                    </linearGradient>
                                                    <linearGradient id="SVGbV5SAcED" x1="24" x2="24" y1="23" y2="31" gradientUnits="userSpaceOnUse">
                                                        <stop stop-color="#b8f5ff" />
                                                        <stop offset=".844" stop-color="#7cecff" />
                                                    </linearGradient>
                                                    <radialGradient id="SVGwViHxdDk" cx="0" cy="0" r="1" gradientTransform="matrix(0 19 -40.1275 0 24 21)" gradientUnits="userSpaceOnUse">
                                                        <stop offset=".337" stop-color="#194694" />
                                                        <stop offset=".747" stop-color="#367af2" stop-opacity="0" />
                                                    </radialGradient>
                                                </defs>
                                            </g>
                                        </svg>
                                        {user.profession}
                                    </p>
                                </div>
                            </div>


                            {/* Skills Section */}
                            <div className="w-full p-4">
                                <div className="flex flex-col md:flex-row items-start">
                                    <p className="text-lg md:text-lg font-normal italic text-gray-300 break-words flex gap-2 items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 28 28">
                                            <g fill="none">
                                                <path fill="url(#SVGErK8BdUl)" d="M6.75 3A3.75 3.75 0 0 0 3 6.75v14.5A3.75 3.75 0 0 0 6.75 25h14.5A3.75 3.75 0 0 0 25 21.25V6.75A3.75 3.75 0 0 0 21.25 3z" />
                                                <path fill="url(#SVGuDFfpbRD)" d="M6 9a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2zm0 6.75a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 0 1.5h-5.5a.75.75 0 0 1-.75-.75m.75 3a.75.75 0 0 0 0 1.5h5.5a.75.75 0 0 0 0-1.5zm8.75-2.5c0-.966.784-1.75 1.75-1.75h3c.966 0 1.75.784 1.75 1.75v3A1.75 1.75 0 0 1 20.25 21h-3a1.75 1.75 0 0 1-1.75-1.75z" />
                                                <defs>
                                                    <linearGradient id="SVGErK8BdUl" x1="10.857" x2="19.286" y1="3" y2="23.814" gradientUnits="userSpaceOnUse">
                                                        <stop stop-color="#b3e0ff" />
                                                        <stop offset="1" stop-color="#8cd0ff" />
                                                    </linearGradient>
                                                    <linearGradient id="SVGuDFfpbRD" x1="6" x2="24.628" y1="7" y2="14.235" gradientUnits="userSpaceOnUse">
                                                        <stop stop-color="#0094f0" />
                                                        <stop offset="1" stop-color="#2764e7" />
                                                    </linearGradient>
                                                </defs>
                                            </g>
                                        </svg>
                                        {user.skills.join(", ")}
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="right w-[50%] h-[100%] ">
                        <div className="dataNum">

                            <div className="numProject"></div>
                            <div className="numConnections"></div>
                            <div className="editProfile"></div>
                        </div>
                        <div className="projects"></div>
                        <div className="notifications">
                            <div className="incomingRequest"></div>
                            <div className="reminders"></div>
                            <div className="deadlineAlerts"></div>
                        </div>


                    </div>



                </div>

            </div >
        </div>


    )
}
export default Dashboard;
