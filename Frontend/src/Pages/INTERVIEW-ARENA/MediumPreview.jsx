import React from 'react'
import Preview from '../CARRER-PROFILE-CREATION/2/08_PREVIEW/Preview'
import { useNavigate } from 'react-router-dom'

const ShortPreview = ({ username, viewedUser }) => {
    const navigate = useNavigate();
    return (
        <div>
            <div className="
                            relative
                            scrollbar-none overflow-y-auto
                            ease-in-out
                            max-h-[600px]
                            bg-[#0a0a0a] border border-[#212121] rounded-3xl p-4 sm:p-6 shadow-2xl text-white
  ">




                <Preview username={username} viewedUser={viewedUser} />
            </div>
        </div>
    )
}

export default ShortPreview