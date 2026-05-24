import React from 'react'
import { Layout, Sparkles, Download, CheckCircle2 } from 'lucide-react'; // Optional: icon library
import CTAcreateResume from './CTAcreateResume';
import App from '@/App';
import { AppleCardsCarouselDemo } from '../AppleCardsCarouselDemo';
const Example = () => {
    return (
        <div className='w-full  bg-base-100  font-sans flex flex-col justify-center items-center'>

            <div className='w-[95%] h-full bg-base-100 rounded-xl '>
                {/* Header Section */}
                <div className="max-w-4xl mx-auto text-center ">
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight text-info mb-4">
                        Find Inspiration in <span className="text-white underline underline-offset-8"> Real-World Examples </span> .
                    </h1>
                    <p className="text-lg text-info">Browse 100+ popular resume examples covering all types of jobs, industries, and levels of experience. Every example has been reviewed and approved by a Certified Professional Resume Writer (CPRW). </p>
                </div>

                <AppleCardsCarouselDemo />

            </div>
            <div className='w-[95%] h-full bg-base-100 rounded-xl '>
                {/* Header Section */}
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight text-info mb-4">
                        Looking for  <span className="text-white underline underline-offset-8"> CVs </span> or <span className="text-white underline underline-offset-8"> cover letters? </span>
                    </h1>
                    <p className="text-lg text-info">Explore our extensive collection of CV and cover letter examples to find your perfect fit for any industry or job level.</p>
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
                    <CTAcreateResume />

                </div>
            </div>
        </div>
    );
}

export default Example