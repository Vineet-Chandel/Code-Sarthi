import React from 'react'
import { useNavigate } from 'react-router-dom'
const Landing = () => {
    const Navigate = useNavigate()
    return (
        <div className=' w-screen px-10 flex' >
            <link href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet" />
            <div className='flex rounded-t-xl bg-base-100'>
                <div className='w-[50%] mt-5   pl-10 pt-10 '>
                    <h1 style={{ fontFamily: "'Syne',sans-serif", fontSize: 'clamp(60px,6vw,80px)', fontWeight: 800, color: '#000000ff', lineHeight: 1.0, letterSpacing: '-0.03em', marginBottom: '16px' }}>
                        AI Resume<br /><span style={{ color: '#1a6cf6' }}>Builder & Analyser</span>
                    </h1>



                    <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '20px', maxWidth: '520px' }} className='bg-success text-success-content rounded-xl p-5'>
                        ''  Create a standout resume in minutes with our AI-powered builder.
                        Use professional templates, add optimized content in one click,
                        and apply with confidence from any device. Millions trust it—because it works. ''
                    </p>

                    <div className='flex gap-5 mt-10'>
                        <button className='text-center h-15 text-lg w-45 font-extrabold transition duration-200 hover:scale-110 bg-base-300 rounded-3xl hover:bg-secondary hover:text-secondary-content p-5  flex justify-center items-center '>
                            Import your resume
                        </button>
                        <button className='text-center h-15 text-lg w-45 font-extrabold transition duration-200 hover:scale-110 bg-base-300 rounded-3xl hover:bg-secondary hover:text-secondary-content p-5  flex justify-center items-center ' onClick={() => Navigate('/app/build-resume')}>
                            Create my resume
                        </button>
                    </div>
                    <div className='mb-20'>
                        <div className='text-start h-15 text-lg w-45 font-extrabold transition duration-200  rounded-3xl bg-primary p-5 text-primary-content flex  flex-col justify-cneter items-start  mt-10' >


                            <div className="flex items-center w-full gap-1 text-4xl"><svg xmlns="http://www.w3.org/2000/svg" width={40} height={40} viewBox="0 0 24 24"><g fill="none"><path d="m5.5 13l4.5 4.5l11-11L16.5 2z"></path><path stroke="#fff" strokeWidth={0.8} d="M10 17.5L5.5 13m4.5 4.5l-2.414 2.414a2 2 0 0 1-1.414.586H2.5v-3.672a2 2 0 0 1 .586-1.414L5.5 12.999m4.5 4.5l11-11L16.5 2l-11 11M5 3l.332.668L6 4l-.668.332L5 5l-.332-.668L4 4l.668-.332zm7.75 17l.25.5l.5.25l-.5.25l-.25.5l-.25-.5l-.5-.25l.5-.25zm6.75-6l.622 1.378L21.5 16l-1.378.622L19.5 18l-.622-1.378L17.5 16l1.378-.622z"></path></g></svg> <span className='ml-3'> Let AI to do your work</span></div>
                            <div className='flex justify-center w-full'><div className='text-start  text-md w-45 rounded-3xl bg-primary p-5 text-primary-content flex justify-start items-center ' >Describe your role in a few words, and we'll generate tailored content for your work experience section.</div></div>


                        </div>

                    </div>
                </div>

                <div className='w-[50%] mt-5  p-5'>
                    <img className='w-full h-full object-contain' src="https://res.cloudinary.com/dggoaxqxl/image/upload/q_auto/f_auto/v1777091782/Resume_Home_imatpu.webp" alt="ResumeHome.png" />
                    <div></div>
                </div>
            </div>


        </div >
    )
}

export default Landing