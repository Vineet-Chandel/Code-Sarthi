import React from 'react'

const Stage2d = ({ rewrittingData }) => {
    return (
        <div className="w-full bg-white rounded-3xl p-6 text-black mt-4 shadow-sm">
            <h2 className="text-3xl font-extrabold mb-6">
                Refined Skills
            </h2>

            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 space-y-4">
                {rewrittingData?.data4?.data?.skills?.map((category, index) => (
                    <div
                        key={index}
                        className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-4"
                    >
                        <h3 className="font-bold text-lg">
                            {category.skillCategory}
                        </h3>

                        <p className="text-gray-700 leading-7">
                            {category.skills.join(" • ")}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Stage2d