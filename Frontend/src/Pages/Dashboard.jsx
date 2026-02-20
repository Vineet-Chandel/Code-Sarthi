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
                                    <b className="text-gray-500 font-semibold text-lg md:text-xl mb-2 md:mb-0 md:mr-3">
                                        About:
                                    </b>
                                    <p className="text-lg md:text-xl font-normal italic text-gray-300 break-words">
                                        {user.about}
                                    </p>
                                </div>
                            </div>

                            {/* College Information */}
                            <div className="w-full mt-2 p-4">
                                <div className="flex flex-col md:flex-row items-start">
                                    <p className="text-lg md:text-lg font-normal italic text-gray-300 break-words flex gap-2 items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 24 24">
                                            <path fill="white" d="M18 15h-2v2h2m0-6h-2v2h2m2 6h-8v-2h2v-2h-2v-2h2v-2h-2V9h8M10 7H8V5h2m0 6H8V9h2m0 6H8v-2h2m0 6H8v-2h2M6 7H4V5h2m0 6H4V9h2m0 6H4v-2h2m0 6H4v-2h2m6-10V3H2v18h20V7z" />
                                        </svg>
                                        {user.college}
                                    </p>
                                </div>
                            </div>

                            <div className="w-full mt-2 p-4">
                                <div className="flex flex-col md:flex-row items-start">
                                    <p className="text-lg md:text-lg font-normal italic text-gray-300 break-words flex gap-2 items-center">

                                        <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30" fill="#e3e3e3"><path d="M480-400ZM80-160v-400q0-33 23.5-56.5T160-640h120v-80q0-33 23.5-56.5T360-800h240q33 0 56.5 23.5T680-720v80h120q33 0 56.5 23.5T880-560v400H80Zm240-200v40h-80v-40h-80v120h640v-120h-80v40h-80v-40H320ZM160-560v120h80v-40h80v40h320v-40h80v40h80v-120H160Zm200-80h240v-80H360v80Z" /></svg>
                                        {user.profession}
                                    </p>
                                </div>
                            </div>


                            {/* Skills Section */}
                            <div className="w-full p-4">
                                <div className="flex flex-col md:flex-row items-start">
                                    <p className="text-lg md:text-lg font-normal italic text-gray-300 break-words flex gap-2 items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 32 32">
                                            <path fill="white" d="M30 30h-8V4h8zm-6-2h4V6h-4zm-4 2h-8V12h8zm-6-2h4V14h-4zm-4 2H2V18h8zm-6-2h4v-8H4z" />
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
