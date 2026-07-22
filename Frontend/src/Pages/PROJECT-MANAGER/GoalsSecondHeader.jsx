import React, { useState } from 'react'

const GoalsSecondHeader = () => {

    const data1 = [
        {
            id: 1,
            title: "Filter By Tag"
        },
        {
            id: 2,
            title: "Status"
        },
        {
            id: 3,
            title: "Owner"
        },
        {
            id: 4,
            title: "Reporting Time"
        },
        {
            id: 5,
            title: "Target Time"
        },
        {
            id: 6,
            title: "Following"
        },
        {
            id: 7,
            title: "Stared"
        },
        {
            id: 8,
            title: "Status"
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


                <div className='flex items-center gap-4'>

                    <ul className='flex items-center gap-4'>
                        {data1.map((items, idx) => (
                            <li onClick={() => {

                                setFilter({
                                    id: items.id
                                })
                            }} key={idx} className={`cursor-pointer font-poppins font-normal border border-[#3a3a3a] hover:border-[#5a5a5a] px-3 py-1 rounded-xl transition-all duration-300 ${filter.id === items.id ? " bg-white text-black " : "text-white"}`}>{items.title}</li>
                        ))}
                    </ul>
                </div>


            </div>

        </div>
    )
}

export default GoalsSecondHeader