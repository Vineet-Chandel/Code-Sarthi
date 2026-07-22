import React from 'react'
import GoalsHeader from './GoalsHeader'
import GoalsSecondHeader from './GoalsSecondHeader'
import GoalsThirdHeader from './GoalsThirdHeader'
import ShowingGoals from './ShowingGoals'

const Goal = () => {
    return (
        <div className='bg-[#000] h-full px-5 py-10 flex flex-col'>

            <GoalsHeader />
            <div className='w-full h-[1px] bg-[#3a3a3a] my-3'></div>
            <GoalsSecondHeader />
            <div className='w-full h-[1px] bg-[#3a3a3a] my-3'></div>
            <GoalsThirdHeader />
            <ShowingGoals />

        </div>
    )
}

export default Goal