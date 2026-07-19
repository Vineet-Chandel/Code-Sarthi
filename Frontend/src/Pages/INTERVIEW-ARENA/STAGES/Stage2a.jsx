import React from 'react'

const Stage2a = ({ rewrittingData }) => {
    return (
        <div className="w-full bg-white rounded-3xl p-6 text-black mt-4 shadow-sm">
            <h2 className="text-3xl font-extrabold mb-6">
                New Refined Summary
            </h2>

            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
                <h3 className="text-2xl font-bold mb-4">
                    {rewrittingData?.data1?.data?.summaryTitle}
                </h3>

                <div
                    className="leading-8 text-[16px] text-gray-700 break-words whitespace-pre-wrap"
                    dangerouslySetInnerHTML={{
                        __html: rewrittingData?.data1?.data?.summaryBody,
                    }}
                />
            </div>
        </div>
    )
}

export default Stage2a