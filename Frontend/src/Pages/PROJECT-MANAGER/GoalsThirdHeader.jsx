import React from 'react'

const GoalsThirdHeader = ({ count }) => {
    return (
        <div>
            <div className='flex items-center gap-4 mt-4'>
                <div className='text-xl font-poppins font-semibold text-white'>
                    {count} Goal{count !== 1 ? 's' : ''}
                </div>
            </div>
        </div>
    )
}

export default GoalsThirdHeader