import { useSelector } from "react-redux";
const Study = () => {
    const user = useSelector((store) => store.user);
    return (
        // {user.user.FirstName}
        <div className="h-auto w-screen text-black ">
            <div className="bg-gradient-to-br from-[#d9d7f3] via-[#b9e3f6] to-[#6ec6e8] p-10 border rounded-b-[50px]">
                <div className="w-full flex flex-col justify-center items-center font-head font-extrabold text-[5rem]  leading-none">DEVELOPERS TOOLKIT</div>
                <p className="text-xl font-circular-web w-full flex flex-col justify-center items-center ">Smart toolkits designed to help you code faster, cleaner, and smarter.</p>
            </div>


            <div>
                <div className="flex flex-col gap-5 mt-10">
                    <div className="heading text-[2rem] font-extrabold font-head text-white w-full flex justify-center items-center">PROGRAMMING.dev</div>
                    <div className="flex w-full justify-center items-center gap-10 ">
                        <div className="bg-red-600/70 hover:bg-red-600 cursor-pointer w-1/6 h-[50px] rounded-xl border-transparent" >
                            <div className="butData text-white text-2xl font-circular-web flex justify-center items-center">DATA</div>
                        </div>
                        <div className="bg-blue-600/70 hover:bg-blue-600 cursor-pointer w-1/6 h-[50px] rounded-xl border-transparent">
                            <div className="butData text-white text-2xl font-circular-web flex justify-center items-center">DATA</div>
                        </div>
                        <div className="bg-green-600/70 hover:bg-green-600 cursor-pointer w-1/6 h-[50px] rounded-xl border-transparent">
                            <div className="butData text-white text-2xl font-circular-web flex justify-center items-center">DATA</div>
                        </div>
                        <div className="bg-yellow-600/70 hover:bg-yellow-600 cursor-pointer w-1/6 h-[50px] rounded-xl border-transparent">
                            <div className="butData text-white text-2xl font-circular-web flex justify-center items-center">DATA</div>
                        </div>
                    </div>


                </div>
            </div>



        </div>

    )
}
export default Study;