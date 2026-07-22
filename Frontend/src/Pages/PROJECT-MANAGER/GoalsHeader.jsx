import React, { useState } from 'react'

const GoalsHeader = () => {

    const data1 = [
        {
            id: 1,
            title: "All Goals"
        },
        {
            id: 2,
            title: "My Goals"
        },
        {
            id: 3,
            title: "Archived"
        }
    ]

    const [filter, setFilter] = useState(
        {
            id: 0,
        }
    )
    return (
        <div>

            <div className='' >
                <nav className='flex items-end justify-between'>

                    <div className='flex items-end gap-4'>
                        <div className='text-2xl font-poppins font-semibold'>
                            Goals
                        </div>
                        <ul className='flex items-end gap-4'>
                            {data1.map((items, idx) => (
                                <li onClick={() => {

                                    setFilter({
                                        id: items.id
                                    })
                                }} key={idx} className={`cursor-pointer font-poppins font-normal border border-[#3a3a3a] hover:border-[#5a5a5a] px-3 py-1 rounded-xl transition-all duration-300 ${filter.id === items.id ? " bg-white text-black " : "text-white"}`}>{items.title}</li>
                            ))}
                        </ul>
                    </div>
                    <div className='flex items-center gap-2 border border-[#3a3a3a] rounded-xl px-3 py-1'>

                        <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24">
                            <path fill="#fff" d="m19.485 20.154l-6.262-6.262q-.75.639-1.725.989t-1.96.35q-2.398 0-4.064-1.666Q3.808 11.898 3.808 9.5t1.666-4.064t4.064-1.667t4.065 1.667T15.269 9.5q0 1.042-.369 2.017t-.97 1.668l6.262 6.261zM9.539 14.23q1.99 0 3.36-1.37t1.37-3.361t-1.37-3.36t-3.36-1.37t-3.361 1.37t-1.37 3.36t1.37 3.36t3.36 1.37"></path>
                        </svg>
                        <input className=' bg-transparent border-none focus:outline-none h-[20px]' type="text" placeholder='Search' />

                    </div>
                </nav>
            </div>

        </div>
    )
}

export default GoalsHeader