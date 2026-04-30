import React from 'react'
import { Layout, Sparkles, Download, CheckCircle2 } from 'lucide-react'; // Optional: icon library
const Example = () => {
    return (
        <div className='w-full  bg-base-200  font-sans flex flex-col justify-center items-center'>

            <div className='w-[95%] h-full bg-base-100 rounded-xl '>
                {/* Header Section */}
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900 mb-4">
                        Find Inspiration in <span className="text-blue-600"> Real-World Examples.</span>
                    </h1>
                    <p className="text-lg text-slate-600">Browse 100+ popular resume examples covering all types of jobs, industries, and levels of experience. Every example has been reviewed and approved by a Certified Professional Resume Writer (CPRW).</p>
                </div>

                {/* Steps Grid */}
                <div className='max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-4'>

                    {/* Step 1 */}
                    <div className='group bg-white p-2  rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300 flex flex-col'>
                        <div><img className='rounded-2xl' src="https://res.cloudinary.com/dggoaxqxl/image/upload/q_auto/f_auto/v1777484000/UConn_Brand_Resume_A4_1_xaft3e.png" alt="" /></div>
                    </div>

                    {/* Step 2 */}
                    <div className='group bg-white p-2  rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300 flex flex-col'>
                        <div><img className='rounded-2xl' src="https://res.cloudinary.com/dggoaxqxl/image/upload/q_auto/f_auto/v1777483999/UConn_Brand_Resume_A4_lswehm.png" alt="" /></div>
                    </div>

                    {/* Step 3 */}
                    <div className='group bg-white p-2  rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300 flex flex-col'>
                        <div><img className='rounded-2xl' src="https://res.cloudinary.com/dggoaxqxl/image/upload/q_auto/f_auto/v1777483998/UConn_Brand_Resume_A4_2_cyqug5.png" alt="" /></div>
                    </div>
                    <div className='group bg-white p-2  rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300 flex flex-col'>
                        <div><img className='rounded-2xl' src="https://res.cloudinary.com/dggoaxqxl/image/upload/q_auto/f_auto/v1777484416/UConn_Brand_Resume_A4_3_kty9d2.png" alt="" /></div>
                    </div>
                </div>

                {/* CTA Section */}
                <div className='mt-20 flex flex-col items-center gap-6 mb-20'>
                    <button className='px-10 py-5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xl rounded-full transition-all hover:-translate-y-1 active:scale-95'>
                        Create my resume now
                    </button>

                </div>
            </div>
            <div className='w-[95%] h-full bg-base-100 rounded-xl '>
                {/* Header Section */}
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900 mb-4">
                        Looking for  <span className="text-blue-600"> CVs or cover letters?.</span>
                    </h1>
                    <p className="text-lg text-slate-600">Explore our extensive collection of CV and cover letter examples to find your perfect fit for any industry or job level.</p>
                </div>

                {/* Steps Grid */}
                <div className='max-w-7xl mx-auto grid grid-cols-1  lg:grid-cols-2 gap-8 px-4'>

                    {/* Step 1 */}
                    <div className='group bg-white p-2  rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300 flex flex-col'>
                        <div><img className='rounded-2xl' src="https://res.cloudinary.com/dggoaxqxl/image/upload/q_auto/f_auto/v1777512075/UConn_Brand_Resume_A4_5_vfdxri.png" alt="" /></div>
                    </div>

                    {/* Step 2 */}
                    <div className='group bg-white p-2  rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300 flex flex-col'>
                        <div><img className='rounded-2xl' src="https://res.cloudinary.com/dggoaxqxl/image/upload/q_auto/f_auto/v1777512076/UConn_Brand_Resume_A4_4_an0sai.png" alt="" /></div>
                    </div>


                </div>

                {/* CTA Section */}
                <div className='mt-20 flex flex-col items-center gap-6 mb-20'>
                    <button className='px-10 py-5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xl rounded-full transition-all hover:-translate-y-1 active:scale-95'>
                        Create my resume now
                    </button>

                </div>
            </div>
        </div>
    );
}

export default Example