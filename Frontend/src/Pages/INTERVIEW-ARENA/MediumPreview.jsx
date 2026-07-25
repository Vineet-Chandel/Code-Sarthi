import React from 'react'
import Preview from '../CARRER-PROFILE-CREATION/2/08_PREVIEW/Preview'
import { useNavigate } from 'react-router-dom'

const ShortPreview = () => {
    const navigate = useNavigate();
    return (
        <div>
            <div className="
                            relative
                            scrollbar-none overflow-y-auto
                            ease-in-out
                            max-h-[600px]
  ">




                <Preview />
            </div>
        </div>
    )
}

export default ShortPreview