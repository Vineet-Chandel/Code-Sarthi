import React from 'react'
import Landing from './Landing'
import FirstBlock from './FirstBlock'
import SecondBlock from './SecondBlock'
import ThirdBlock from './ThirdBlock'
const MockInterview = () => {
    return (
        <div className='bg-gray-200'>
            <Landing />
            <SecondBlock />
            <FirstBlock />
            <ThirdBlock />
        </div>
    )
}

export default MockInterview