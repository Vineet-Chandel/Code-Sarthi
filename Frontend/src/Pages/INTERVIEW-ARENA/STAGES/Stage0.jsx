import React from "react";
import { motion } from "framer-motion";
import {
    CheckCircle,
    AlertTriangle,
    XCircle,
} from "lucide-react";

const Stage1 = ({ auditData }) => {
    return (
        <div className="mt-7 px-2 grid grid-cols-2  gap-2">



            <div className="w-full  bg-white px-3 py-3 rounded-3xl">

                <span className=" text-black  text-md">
                    <p className="flex text-xl mb-1 items-center justify-start gap-2 font-extrabold">
                        <svg xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" viewBox="0 0 512 512">
                            <path fill="#000" fillRule="evenodd" d="m384 85.334l85.333 85.333v256H42.666l-.001-232.67c10.098 15.352 24.215 33.107 42.667 48.165L85.333 384h341.333V181.334L373.333 128l-39.736.002c-5.44-10.653-14.584-26.49-27.734-42.668zM384 320v21.334H128V320zm0-64v21.334H256v-20.371q.811-.477 1.615-.963zM181.333 42.667C278.4 42.667 320 149.334 320 149.334S278.4 256 181.333 256S42.666 149.334 42.666 149.334s41.6-106.667 138.667-106.667m0 26.667c-61.29 0-97.067 57.066-108.299 80c11.232 22.933 47.008 80 108.3 80c61.29 0 97.066-57.067 108.298-80c-11.232-22.934-47.008-80-108.299-80m0 33.333c26.804 0 48.533 20.893 48.533 46.667c0 25.773-21.729 46.666-48.533 46.666S132.8 175.107 132.8 149.334c0-25.774 21.729-46.667 48.533-46.667m0 26.667c-11.487 0-20.8 8.954-20.8 20s9.313 20 20.8 20s20.8-8.955 20.8-20s-9.312-20-20.8-20"></path>
                        </svg>

                        Audit Summary :</p>

                    {auditData?.data?.data?.auditSummary}

                </span>



            </div>

            <div className="w-full bg-white/10 rounded-3xl flex">
                <div className="w-1/2 text-black bg-white px-3 py-3 rounded-3xl">
                    <p className="flex text-xl mb-1 items-center justify-start gap-2 font-extrabold">
                        <svg xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" viewBox="0 0 24 24">
                            <path fill="#000" d="M7.375 21.025q-.9-.025-1.713-.462t-1.537-1.288q-1-1.2-1.562-2.862T2 13q0-2.075.788-3.9t2.137-3.175T8.1 3.788T12 3t3.9.8t3.175 2.175T21.213 9.2T22 13.175q0 1.925-.625 3.6T19.6 19.6q-.7.7-1.475 1.063t-1.575.362q-.45 0-.9-.112t-.9-.338l-1.4-.7q-.3-.15-.638-.225T12 19.575t-.712.075t-.638.225l-1.4.7q-.475.25-.937.363t-.938.087m6.038-6.612Q14 13.825 14 13q0-.2-.038-.4t-.112-.4l1.25-1.675q.25.325.438.687t.312.788h2.05q-.375-2.2-2.037-3.6T12 7T8.125 8.413T6.1 12h2.05q.35-1.35 1.425-2.175T12 9q.425 0 .8.075t.725.225l-1.275 1.725q-.05 0-.125-.013T12 11q-.825 0-1.412.588T10 13t.588 1.413T12 15t1.413-.587"></path>
                        </svg>

                        Audit Score :</p>



                    <div className="h-[200px] w-[200px] ml-2 mt-3 border border-l-black border-b-black border-transparent flex justify-around items-end">
                        <div className="h-full flex flex-col justify-end">

                            <span className="text-center ">{auditData?.data?.data?.overallHealthScore?.score || 0}</span>
                            <motion.div
                                initial={{ height: 0 }}
                                animate={{ height: `${auditData?.data?.data?.overallHealthScore?.score || 0}%` }}
                                transition={{ duration: 1, ease: "easeInOut", type: "spring" }}
                                // style={{
                                //     height: `${auditData?.data?.data?.overallHealthScore?.score || 0}%`
                                // }}
                                className="bg-black  flex items-center justify-center " ><span className="rotate-[270deg]  text-white font-extrabold">    SCORE</span>
                            </motion.div>

                        </div>
                        <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: `100%` }}
                            transition={{ duration: 1, ease: "easeInOut", type: "spring" }}

                            className=" flex flex-col justify-end">

                            <span className="text-center ">100</span>
                            <div className="bg-black  h-full font-extrabold flex items-center justify-center text-white px-3"><span className="rotate-[270deg]">IDEAL</span> </div>

                        </motion.div>

                    </div>



                </div>

                <div className="h-full flex px-4  flex-col items-start  justify-start py-5">
                    <p className="flex text-xl mb-1  items-center justify-start gap-2 font-extrabold">
                        Verdict : <span className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center">
                            {auditData?.data?.data?.overallHealthScore?.score >= 60 && <CheckCircle />}
                            {auditData?.data?.data?.overallHealthScore?.score < 60 && auditData?.data?.data?.overallHealthScore?.score >= 30 && <AlertTriangle />}
                            {auditData?.data?.data?.overallHealthScore?.score < 30 && auditData?.data?.data?.overallHealthScore?.score >= 0 && <XCircle />}
                        </span>

                    </p>
                    <p> {auditData?.data?.data?.overallHealthScore?.verdict}</p>

                </div>

            </div>
            <div className="w-full bg-white p-5 rounded-3xl">
                <h2 className="flex items-center gap-2 text-2xl font-bold mb-5 text-black">
                    {/* Your SVG */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" viewBox="0 0 24 24"> <g fill="none"> <path d="m12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036q-.016-.004-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.016-.018m.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01z"></path> <path fill="currentColor" d="M2.5 5A1.5 1.5 0 0 1 4 3.5h16a1.5 1.5 0 0 1 0 3H4A1.5 1.5 0 0 1 2.5 5M4 10.5a1.5 1.5 0 0 0 0 3h6a1.5 1.5 0 0 0 0-3zM2.5 19A1.5 1.5 0 0 1 4 17.5h1a1.5 1.5 0 0 1 0 3H4A1.5 1.5 0 0 1 2.5 19m10 0a1.5 1.5 0 0 1 1.5-1.5h1a1.5 1.5 0 0 1 0 3h-1a1.5 1.5 0 0 1-1.5-1.5M9 17.5a1.5 1.5 0 0 0 0 3h1a1.5 1.5 0 0 0 0-3zm8.5 1.5a1.5 1.5 0 0 1 1.5-1.5h1a1.5 1.5 0 0 1 0 3h-1a1.5 1.5 0 0 1-1.5-1.5m.446-10.323a1 1 0 0 0-1.892 0l-.13.378a3 3 0 0 1-1.869 1.87l-.378.129a1 1 0 0 0 0 1.892l.378.13a3 3 0 0 1 1.87 1.869l.129.378a1 1 0 0 0 1.892 0l.13-.378a3 3 0 0 1 1.869-1.87l.378-.129a1 1 0 0 0 0-1.892l-.378-.13a3 3 0 0 1-1.87-1.869z"></path> </g> </svg>
                    Content Issues
                </h2>

                <div className="space-y-5">
                    {auditData?.data?.data?.contentIssues?.map((issue, idx) => {
                        const severity = {
                            critical: {
                                bg: "bg-red-50",
                                badge: "bg-red-600 text-white",
                                border: "border-red-300",
                            },
                            warning: {
                                bg: "bg-yellow-50",
                                badge: "bg-yellow-500 text-black",
                                border: "border-yellow-300",
                            },
                            HIGH: {
                                bg: "bg-orange-50",
                                badge: "bg-orange-500 text-white",
                                border: "border-orange-300",
                            },
                            low: {
                                bg: "bg-green-50",
                                badge: "bg-green-500 text-white",
                                border: "border-green-300",
                            },
                        };

                        const style = severity[issue.severity] || severity.low;

                        return (
                            <div
                                key={idx}
                                className={`${style.bg} ${style.border} text-black border rounded-2xl p-5`}
                            >
                                {/* Header */}
                                <div className="flex justify-between items-center flex-wrap gap-3 mb-4">
                                    <div className="flex gap-2 flex-wrap">
                                        <span className="px-3 py-1 bg-white rounded-full border text-sm font-semibold flex items-center gap-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512">
                                                <path fill="#000" d="M496 152a56 56 0 0 0-56-56H220.11a23.9 23.9 0 0 1-13.31-4L179 73.41A55.77 55.77 0 0 0 147.89 64H72a56 56 0 0 0-56 56v48a8 8 0 0 0 8 8h464a8 8 0 0 0 8-8ZM16 392a56 56 0 0 0 56 56h368a56 56 0 0 0 56-56V216a8 8 0 0 0-8-8H24a8 8 0 0 0-8 8Z"></path>
                                            </svg> {issue.section}
                                        </span>

                                        <span className="px-3 py-1 bg-white rounded-full border text-sm flex items-center gap-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                                                <path fill="#000" d="M20 5H8.47c-.59 0-1.15.26-1.54.72l-4.7 5.64c-.31.37-.31.91 0 1.28l4.7 5.64c.38.46.94.72 1.54.72H20c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2"></path>
                                            </svg> {issue.field}
                                        </span>
                                    </div>

                                    <span
                                        className={`px-3 py-1 rounded-full text-sm font-bold uppercase ${style.badge}`}
                                    >
                                        {issue.severity}
                                    </span>
                                </div>

                                {/* Issue */}
                                <div className="mb-4">
                                    <p className="font-semibold text-gray-700 mb-1">
                                        Issue
                                    </p>

                                    <div className="bg-white rounded-lg p-3 border">
                                        {issue.issue}
                                    </div>
                                </div>

                                {/* Flagged Text */}
                                <div className="mb-4">
                                    <p className="font-semibold text-gray-700 mb-1">
                                        Flagged Text
                                    </p>

                                    <div className="bg-red-100 border border-red-300 rounded-lg p-3 text-red-700 font-medium italic">
                                        "{issue.flaggedText}"
                                    </div>
                                </div>

                                {/* Fix */}
                                <div>
                                    <p className="font-semibold text-gray-700 mb-1">
                                        Suggested Fix
                                    </p>

                                    <div className="bg-green-100 border border-green-300 rounded-lg p-3 text-green-700">
                                        {issue.fix}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className="w-full  bg-white px-3 py-3 rounded-3xl">

                <span className=" text-black  text-md">
                    <p className="flex text-xl mb-1 items-center justify-start gap-2 font-extrabold">
                        <svg xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" viewBox="0 0 16 16">
                            <path fill="currentColor" d="M6 1v3H1V1zM1 0a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1zm14 12v3h-5v-3zm-5-1a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1zM6 8v7H1V8zM1 7a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1zm14-6v7h-5V1zm-5-1a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1z"></path>
                        </svg>

                        Skill Gap Analysis :</p>

                    {auditData?.data?.data?.skillGapAnalysis && (
                        <div className="space-y-6">

                            {/* Coverage */}
                            <div className="bg-white p-4 rounded-xl ">
                                <h2 className="text-xl font-bold mb-2">Skill Coverage</h2>

                                <div className="w-full bg-gray-300 rounded-full h-4">
                                    <div
                                        className="bg-black h-4 rounded-full"
                                        style={{
                                            width: `${auditData?.data?.data?.skillGapAnalysis.skillCoveragePercent}%`,
                                        }}
                                    />
                                </div>

                                <p className="mt-2 font-semibold">
                                    {auditData?.data?.data?.skillGapAnalysis.skillCoveragePercent}%
                                </p>
                            </div>

                            {/* Required Skills */}
                            <div className="bg-white p-4 rounded-xl shadow">
                                <h2 className="text-lg font-bold mb-3">
                                    Required Skills
                                </h2>

                                <div className="flex flex-wrap gap-2">
                                    {auditData?.data?.data?.skillGapAnalysis?.roleRequiresSkills.map((skill, idx) => (
                                        <span
                                            key={idx}
                                            className="px-3 py-1 bg-black/10 border border-black/40  rounded-full"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Candidate Skills */}
                            <div className="bg-white p-4 rounded-xl shadow">
                                <h2 className="text-lg font-bold mb-3">
                                    Your Skills
                                </h2>

                                <div className="flex flex-wrap gap-2">
                                    {auditData?.data?.data?.skillGapAnalysis?.candidateHasSkills.map((skill, idx) => (
                                        <span
                                            key={idx}
                                            className="px-3 py-1 bg-black/10 border border-black/40  rounded-full"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Matched Skills */}
                            <div className="bg-white p-4 rounded-xl shadow">
                                <h2 className="flex items-center gap-2 text-lg font-bold mb-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" viewBox="0 0 24 24">
                                        <path fill="currentColor" d="m3 19l5.5-7L3 4.98h12.462L21 12l-.183.214q-.663-.326-1.369-.491T18 11.558q-2.708 0-4.613 1.867T11.442 18q0 .256.017.506t.072.494zm15 3.289q-1.748 0-2.96-1.213t-1.213-2.96t1.213-2.961T18 13.942t2.96 1.213t1.213 2.96t-1.213 2.961T18 22.288m-.629-2.461l2.84-2.796l-.626-.627l-2.214 2.182l-.955-.975l-.627.633z"></path>
                                    </svg>   Matched Skills
                                </h2>

                                <div className="flex flex-wrap gap-2">
                                    {auditData?.data?.data?.skillGapAnalysis?.matchedSkills.map((skill, idx) => (
                                        <span
                                            key={idx}
                                            className="px-3 py-1 bg-black/10 border border-black/40  rounded-full"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Missing Skills */}
                            <div className="bg-white p-4 rounded-xl shadow">
                                <h2 className="flex items-center gap-2 text-lg font-bold mb-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" viewBox="0 0 16 16">
                                        <path fill="#000" fillRule="evenodd" d="m7.493.015l-.386.04c-1.873.187-3.76 1.153-5.036 2.579C.66 4.211-.057 6.168.009 8.253c.115 3.601 2.59 6.65 6.101 7.518a8.03 8.03 0 0 0 6.117-.98a8 8 0 0 0 3.544-4.904c.172-.701.212-1.058.212-1.887s-.04-1.186-.212-1.887C14.979 2.878 12.315.498 9 .064C8.716.027 7.683-.006 7.493.015m1.36 1.548a6.3 6.3 0 0 1 1.987.597c.698.34 1.18.686 1.747 1.253A6 6 0 0 1 13.84 5.16c.445.915.646 1.798.646 2.84a6.2 6.2 0 0 1-.66 2.867c-.172.351-.519.914-.681 1.105l-.055.065l-4.563-4.564L3.963 2.91l.065-.055c.191-.162.754-.509 1.105-.681a6.44 6.44 0 0 1 3.72-.611M7.48 8.534l4.56 4.561l-.067.053a7.7 7.7 0 0 1-1.106.68a6.8 6.8 0 0 1-1.987.616c-.424.065-1.336.065-1.76 0c-1.948-.296-3.592-1.359-4.627-2.993a7.5 7.5 0 0 1-.634-1.332a6.6 6.6 0 0 1-.189-3.584a6.8 6.8 0 0 1 1.096-2.388c.07-.095.133-.173.141-.173s2.065 2.052 4.573 4.56"></path>
                                    </svg> Missing Critical Skills
                                </h2>

                                <div className="space-y-3">
                                    {auditData?.data?.data?.skillGapAnalysis?.missingCriticalSkills.map((item, idx) => (
                                        <div
                                            key={idx}
                                            className="border border-red-300 rounded-lg p-3"
                                        >
                                            <p>
                                                <strong>Skill:</strong> {item.skill}
                                            </p>

                                            <p>
                                                <strong>Importance:</strong>{" "}
                                                <span className="text-red-600 font-semibold">
                                                    {item.importance}
                                                </span>
                                            </p>

                                            <p>
                                                <strong>Reason:</strong> {item.reason}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Irrelevant Skills */}
                            <div className="bg-white p-4 rounded-xl shadow">
                                <h2 className="text-lg font-bold mb-3">
                                    Irrelevant Skills
                                </h2>

                                <div className="space-y-3">
                                    {auditData?.data?.data?.skillGapAnalysis?.irrelevantSkills.map((item, idx) => (
                                        <div
                                            key={idx}
                                            className="border border-yellow-300 rounded-lg p-3"
                                        >
                                            <p>
                                                <strong>Skill:</strong> {item.skill}
                                            </p>

                                            <p>
                                                <strong>Suggestion:</strong> {item.suggestion}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>
                    )}

                </span>



            </div>
            <div className="flex flex-col gap-2">
                <div className="w-full  bg-white px-3 py-3 rounded-3xl">

                    <span className=" text-black  text-md">
                        <p className="flex text-xl mb-1 items-center justify-start gap-2 font-extrabold">
                            <svg xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M9 18h5.5q.425 0 .788-.213t.512-.587l2.1-4.9q.05-.125.075-.25T18 11.8V11q0-.425-.288-.713T17 10h-4.6l.6-3.4q.05-.25-.025-.475t-.25-.4L12 5l-4.6 5q-.2.2-.3.45T7 11v5q0 .825.588 1.413T9 18m3 4q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"></path>
                            </svg>

                            Growth Recommendations :</p>

                        {auditData?.data?.data?.growthRecommendations?.map((bullet, idx) => {


                            return (
                                <div
                                    key={idx}
                                    className="mb-3  rounded-2xl"

                                >
                                    {/* Header */}
                                    <div className="flex flex-wrap gap-4 mb-3 px-3 py-2 bg-black/20 text-black rounded-2xl border border-gray-100">
                                        <div className="flex gap-1">
                                            <span className="font-semibold">Priorty:</span>
                                            <span>{bullet?.priority}</span>
                                        </div>
                                        <div className="flex gap-1">
                                            <span className="font-semibold">SECTION:</span>
                                            <span>{bullet?.category}</span>
                                        </div>

                                        <div className="flex gap-1">
                                            <span className="font-semibold">Title:</span>
                                            <span>{bullet?.title}</span>
                                        </div>
                                    </div>

                                    {/* Body */}
                                    <div className="flex flex-col gap-2 px-3 text-black">
                                        <div className="flex gap-1">
                                            <span className="font-semibold">Why:</span>
                                            <span>{bullet?.why}</span>
                                        </div>

                                        <div className="flex gap-1">
                                            <span className="font-semibold">How:</span>
                                            <span>{bullet?.howTo}</span>
                                        </div>

                                        <div className="flex gap-1">
                                            <span className="font-semibold">Time Needed:</span>
                                            <span>{bullet?.timeToAchieve}</span>
                                        </div>
                                        <div className="flex gap-1">
                                            <span className="font-semibold">Impact:</span>
                                            <span>{bullet?.estimatedImpact}</span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}

                    </span>
                </div>
                <div className="w-full  bg-blue-300 px-3 py-3 rounded-3xl">

                    <span className=" text-black  text-md">
                        <p className="flex text-xl mb-1 items-center justify-start gap-2 font-extrabold">
                            <svg xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" viewBox="0 0 24 24">
                                <path fill="#000" d="m12 8l3 5.2l3-2.7l-.7 3.5H6.7L6 10.5l3 2.7zm0-4l-3.5 6L3 5l2 11h14l2-11l-5.5 5zm7 14H5v1c0 .6.4 1 1 1h12c.6 0 1-.4 1-1z"></path>
                            </svg>

                            Quick Wins :</p>

                        {auditData?.data?.data?.quickWins.map((bullets, idx) => {
                            return (
                                <p key={idx}>

                                    {bullets}
                                </p>
                            )
                        })}

                    </span>
                </div>





            </div>

            <div className="w-full  bg-white px-3 py-3 rounded-3xl">

                <span className=" text-black  text-md">
                    <p className="flex text-xl mb-1 items-center justify-start gap-2 font-extrabold">
                        <svg xmlns="http://www.w3.org/2000/svg" width="1.1em" height="1.1em" viewBox="0 0 14 14">
                            <path fill="currentColor" fillRule="evenodd" d="M5.763 2.263A1.75 1.75 0 0 1 8.75 3.5h-3.5c0-.464.184-.91.513-1.237M3.75 3.5a3.25 3.25 0 0 1 6.5 0h1.25A2.5 2.5 0 0 1 14 6v5.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 0 11.5V6a2.5 2.5 0 0 1 2.5-2.5zm2.915 3.067A.875.875 0 1 1 7 8.25a.625.625 0 0 0-.625.625v1a.625.625 0 1 0 1.25 0v-.469a2.125 2.125 0 1 0-2.75-2.031a.625.625 0 1 0 1.25 0a.875.875 0 0 1 .54-.808m.337 6.308a.75.75 0 1 1 0-1.5a.75.75 0 0 1 0 1.5" clipRule="evenodd"></path>
                        </svg>

                        Missing Fields :</p>

                    {auditData?.data?.data?.missingFields?.map((bullet, idx) => {


                        return (
                            <div
                                key={idx}
                                className="mb-3  rounded-2xl"

                            >
                                {/* Header */}
                                <div className="flex flex-wrap gap-4 mb-3 px-3 py-2 bg-black/20 text-black rounded-2xl border border-gray-100">
                                    <div className="flex gap-1">
                                        <span className="font-semibold">Section:</span>
                                        <span>{bullet?.section}</span>
                                    </div>
                                    <div className="flex gap-1">
                                        <span className="font-semibold">Field:</span>
                                        <span>{bullet?.field}</span>
                                    </div>


                                </div>

                                {/* Body */}
                                <div className="flex flex-col gap-2 px-3 text-black">
                                    <div className="flex gap-1">
                                        <span className="font-semibold">Importance:</span>
                                        <span>{bullet?.importance}</span>
                                    </div>

                                    <div className="flex gap-1">
                                        <span className="font-semibold">Why It Matters:</span>
                                        <span>{bullet?.whyItMatters}</span>
                                    </div>



                                </div>
                            </div>
                        );
                    })}

                </span>
            </div>
            <div className="w-full  bg-white px-3 py-3 rounded-3xl">

                <span className=" text-black  text-md">
                    <p className="flex text-xl mb-1 items-center justify-start gap-2 font-extrabold">
                        <svg xmlns="http://www.w3.org/2000/svg" width="1.1em" height="1.1em" viewBox="0 0 14 14">
                            <path fill="currentColor" fillRule="evenodd" d="M5.763 2.263A1.75 1.75 0 0 1 8.75 3.5h-3.5c0-.464.184-.91.513-1.237M3.75 3.5a3.25 3.25 0 0 1 6.5 0h1.25A2.5 2.5 0 0 1 14 6v5.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 0 11.5V6a2.5 2.5 0 0 1 2.5-2.5zm2.915 3.067A.875.875 0 1 1 7 8.25a.625.625 0 0 0-.625.625v1a.625.625 0 1 0 1.25 0v-.469a2.125 2.125 0 1 0-2.75-2.031a.625.625 0 1 0 1.25 0a.875.875 0 0 1 .54-.808m.337 6.308a.75.75 0 1 1 0-1.5a.75.75 0 0 1 0 1.5" clipRule="evenodd"></path>
                        </svg>

                        Data Inconsistencies :</p>

                    {auditData?.data?.data?.dataInconsistencies?.map((bullet, idx) => {


                        return (
                            <div
                                key={idx}
                                className="mb-3  rounded-2xl"

                            >
                                {/* Header */}
                                <div className="flex flex-wrap gap-4 mb-3 px-3 py-2 bg-black/20 text-black rounded-2xl border border-gray-100">
                                    <div className="flex gap-1">
                                        <span className="font-semibold">Section:</span>
                                        <span>{bullet?.section}</span>
                                    </div>
                                    <div className="flex gap-1">
                                        <span className="font-semibold">Field:</span>
                                        <span>{bullet?.field}</span>
                                    </div>


                                </div>

                                {/* Body */}
                                <div className="flex flex-col gap-2 px-3 text-black">
                                    <div className="flex gap-1">
                                        <span className="font-semibold">Description:</span>
                                        <span>{bullet?.description}</span>
                                    </div>

                                    <div className="flex gap-1">
                                        <span className="font-semibold">Flagged Value:</span>
                                        <span>{bullet?.flaggedValue}</span>
                                    </div>
                                    <div className="flex gap-1">
                                        <span className="font-semibold">Suggested Fix:</span>
                                        <span>{bullet?.suggestedFix}</span>
                                    </div>



                                </div>
                            </div>
                        );
                    })}

                </span>
            </div>
        </div>
    )
}

export default Stage1