import { useSelector } from "react-redux";
const Dashboard = () => {
    const user = useSelector(store => store.user);
    return (

        < div className="h-screen w-[90%]  justify-self-center p-5 flex justify-center items-center" >
            <div className="left w-full md:w-[40%] h-full flex flex-col justify-center items-center bg-gradient-to-tr from-gray-800 via-gray-900 to-black p-4 md:p-6 shadow-[inset_0_0_50px_rgba(0,0,0,0.5)] rounded-3xl">

                {/* Profile Picture */}
                <div className="profilePic border-[3px] border-gray-600 h-[200px] w-[200px] md:h-[300px] md:w-[300px] rounded-full overflow-hidden flex justify-center items-center">
                    <img
                        src={user.user.photoUrl || "/default-avatar.png"}
                        alt="Profile picture"
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* User Information */}
                <div className="flex flex-col justify-center items-center text-white w-full mt-6 md:mt-8">

                    {/* Full Name */}
                    <p className="text-3xl md:text-4xl lg:text-5xl font-bold text-center">
                        {user.user.FirstName} {user.user.MiddleName} {user.user.LastName}
                    </p>

                    {/* Username */}
                    <p className="mt-3 md:mt-4 text-xl md:text-2xl text-gray-300">
                        @{user.user.username}
                    </p>

                    {/* Edit Profile Button */}
                    <button className="group relative w-full max-w-md p-4 mt-4 rounded-xl text-lg font-medium bg-gray-800/40 border-[2px] border-gray-700/50 hover:bg-gray-800/60 transition-all duration-300 overflow-hidden">
                        Edit Profile
                        <div className="absolute inset-x-0 bottom-0 h-[2px] w-full bg-gradient-to-r from-transparent via-purple-500"></div>
                        <div className="absolute inset-x-0 bottom-0 h-[2px] w-[50%] mx-auto bg-gradient-to-r from-transparent via-cyan-500"></div>
                        <div className="absolute inset-x-0 bottom-0 h-[1px] w-[50%] mx-auto cursor-pointer group-hover:h-[4px] group-hover:blur-sm transition-all duration-300 bg-gradient-to-r from-transparent via-cyan-500"></div>
                    </button>

                    {/* About Section */}
                    <div className="border border-gray-700 rounded-xl w-full mt-3 md:mt-8 p-4 md:p-5 bg-gray-900/20">
                        <div className="flex flex-col md:flex-row items-start">
                            <b className="text-gray-500 font-semibold text-lg md:text-xl mb-2 md:mb-0 md:mr-3">
                                About:
                            </b>
                            <p className="text-lg md:text-xl font-normal italic text-gray-300 break-words">
                                {user.user.about}
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
                                {user.user.college}
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
                                {user.user.skills.join(", ")}
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
        </div >

    )
}
export default Dashboard;
