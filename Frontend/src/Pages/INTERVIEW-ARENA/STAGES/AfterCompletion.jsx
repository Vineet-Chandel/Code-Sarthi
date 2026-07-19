import React from 'react'

const AfterCompletion = () => {
    return (
        <div className='w-full h-screen'>
            <div className='h-full flex justify-between gap-10 items-center bg-[#09090B]'>

                <div className='w-full h-full flex justify-center items-center bg-red-500/30'>
                    <p>Left</p>
                </div>


                <div className='w-full h-full bg-blue-500/30 flex justify-center items-center'>
                    <p>Right</p>
                </div>

            </div>
        </div>
    )
}

export default AfterCompletion