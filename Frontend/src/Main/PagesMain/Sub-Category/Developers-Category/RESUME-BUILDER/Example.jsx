import React from 'react'
import { Layout, Sparkles, Download, CheckCircle2 } from 'lucide-react'; // Optional: icon library
import CTAcreateResume from './CTAcreateResume';
import App from '@/App';
import { AppleCardsCarouselDemo } from './AppleCardsCarouselDemo';
const Example = () => {
    return (
        <div className='w-full  bg-gray-200  font-sans flex flex-col justify-center items-center py-5'>

            <div className='w-[95%] h-full  rounded-xl  mt-10'>

                <h2
                    className="text-black leading-[1.1]   font-poppins text-[30px] "

                >
                    <span className="text-black font-bold text-3xl md:text-4xl lg:text-5xl" >
                        Examples of resume created by Shastra Ai
                    </span>
                </h2>

                <AppleCardsCarouselDemo />

            </div>
            <div className='w-[95%] h-full bg-gray-200 rounded-xl '>
                {/* Header Section */}


                <h2
                    className="text-black leading-[1.1]  mb-3 ml-4 font-poppins text-[30px] "

                >
                    <span className="text-black font-bold text-3xl md:text-4xl lg:text-5xl font-poppins" >
                        Looking for CVs or cover letters,
                    </span>
                </h2>

                {/* Steps Grid */}
                <div className='w-full mx-auto grid grid-cols-1  lg:grid-cols-2 gap-8 px-4'>

                    {/* Step 1 */}
                    <div className='group bg-white p-2  rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300 flex flex-col'>
                        <div><img className='rounded-2xl' src="https://res.cloudinary.com/dggoaxqxl/image/upload/q_auto/f_auto/v1777512075/UConn_Brand_Resume_A4_5_vfdxri.png" alt="" /></div>
                    </div>

                    {/* Step 2 */}
                    <div className='group bg-white p-2  rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300 flex flex-col'>
                        <div><img className='rounded-2xl' src="https://res.cloudinary.com/dggoaxqxl/image/upload/q_auto/f_auto/v1777512076/UConn_Brand_Resume_A4_4_an0sai.png" alt="" /></div>
                    </div>


                </div>


            </div>
        </div>
    );
}

export default Example