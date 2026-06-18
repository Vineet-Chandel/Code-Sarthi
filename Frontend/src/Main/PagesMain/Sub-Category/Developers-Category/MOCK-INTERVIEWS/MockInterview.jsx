import React from 'react'
import Landing from './Landing'
import FirstBlock from './FirstBlock'
import SecondBlock from './SecondBlock'
const MockInterview = () => {
    return (
        <div className='bg-gray-200'>
            <Landing />
            <SecondBlock />
            <FirstBlock />
        </div>
    )
}

export default MockInterview