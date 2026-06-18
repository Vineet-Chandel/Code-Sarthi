import React from 'react'
import Preview from '../CARRER-PROFILE-CREATION/2/08_PREVIEW/Preview'
import { useNavigate } from 'react-router-dom'

const ShortPreview = () => {
    const navigate = useNavigate();
    return (
        <div>
            <div className="
                            relative
                            overflow-y-scroll
                            cursor-pointer
                            group
                            transition-all
                            duration-500
                            ease-in-out
                            max-h-[400px]

                        bg-base-100
                        border
                        border-base-300
                        rounded-3xl
                        p-3
                        shadow-xl
  ">

                <div className="flex justify-between items-center mb-5">
                    <div></div>
                    <span onClick={() => navigate('/app/build-resume/preview-content')} className="cursor-pointer mr-2">


                        <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 48 48">
                            <path fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="m6 6l10 9.9m-10 26L16 32m26 9.9L32.1 32m9.8-26L32 15.9M33 6h9v9m0 18v9h-9m-18 0H6v-9m0-18V6h9"></path>
                        </svg>

                    </span>

                </div>


                <Preview />
            </div>
        </div>
    )
}

export default ShortPreview