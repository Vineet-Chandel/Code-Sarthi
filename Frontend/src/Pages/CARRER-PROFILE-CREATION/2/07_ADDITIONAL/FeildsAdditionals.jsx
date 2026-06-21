import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import axios from "axios";
import BASE_URL from '../../../auth/baseURL';

import Toast from '../Toast';
import { AnimatePresence, motion } from "framer-motion";
import ProgressMeter from '../ProgressMeter';
import Header from '../Header';
import Step from '../Step';
import Preview from '../Preview';
import { useDispatch, useSelector } from 'react-redux';
import { setRes } from '@/utils/resStore';


// ─── reusable field ───────────────────────────────────────────────────────────
const ToastContainer = ({ toasts, removeToast }) => {
    return (
        <div className="fixed bottom-5 right-5 flex flex-col gap-3 z-50">
            <AnimatePresence>
                {toasts.map((t) => (
                    <Toast
                        key={t.id}
                        {...t}
                        onClose={() => removeToast(t.id)}
                    />
                ))}
            </AnimatePresence>
        </div>
    );
};



const statusOptions = [
    "Beginner",
    "Elementary",
    "Intermediate",
    "Upper Intermediate",
    "Advanced",
    "Proficient",
    "Native"
];


const FieldsAdditionals = ({ data }) => {
    const location = useLocation();
    let resumeData = location.state?.resumeData || {};

    const resData = useSelector((state) => state.res);
    const user = useSelector(store => store.user?.user?.DATA || {});
    const dispatch = useDispatch();
    const getResumeIfExist = async () => {
        try {
            setGlobalProfileLoading(true)
            const res = await axios.get(`${BASE_URL}/build-resume/get-resume`, {
                withCredentials: true,
            })

            if (res.data.success === true) {
                dispatch(setRes(res.data.data));
            }
        } catch (err) {
            console.log(err);
        } finally {
            setGlobalProfileLoading(false)
        }
    }
    useEffect(() => {
        if (!resData?.certifications?.certifications || !resData?.languages?.languages || !resData?.achievements?.achievements) {
            getResumeIfExist();
            return;
        }
    }, [resData?.certifications?.certifications, resData?.languages?.languages, resData?.achievements?.achievements]);

    useEffect(() => {
        if (!resData?.languages?.languages) {
            setlanguages(resData.languages?.length > 0 ? resData.languages.map(item => ({
                id: crypto.randomUUID(),
                ...item
            })) :
                data?.length > 0 ? data :
                    [{
                        langCategory: "",
                        status: "",
                    }]);

        }
        if (!resData?.achievements?.achievements) {
            setAchievements(resData?.achievements?.length > 0 ? resData.achievements.map(item => ({
                id: crypto.randomUUID(),
                achievement: item
            }))
                :
                data?.length > 0 ? data :
                    [{
                        achievement: "",
                    }]);
        }

        if (!resData?.certifications?.certifications) {
            setCertifications(resData.certifications?.length > 0 ? resData.certifications.map(item => ({
                id: crypto.randomUUID(),
                ...item
            })) :
                data?.length > 0 ? data :
                    [{
                        about: "",
                        link: ""
                    }]);
        }

    }, [resData.languages, resData.achievements, resData.certifications, user]);






    const saveLanguage = async () => {
        try {
            setGlobalProfileLoading(true)
            const formattedLanguages = languages.map(({ langCategory, status }) => ({
                langCategory,
                status
            }));

            if (
                JSON.stringify(resData?.languages || []) ===
                JSON.stringify(formattedLanguages)
            ) {
                addToast({
                    type: "warning",
                    title: "already Saved",
                    message: "no changes found"
                });
                return;
            }

            const payload = {
                languages: languages.map(({ langCategory, status }) => ({
                    langCategory,
                    status
                }))
            };
            const res = await axios.post(`${BASE_URL}/build-resume/languages-info-save`,
                payload, { withCredentials: true })

            dispatch(setRes({
                ...resData,
                languages: formattedLanguages
            }));
            addToast({
                type: "success",
                title: "Saved",
                message: "Information Updated Successfully"
            });
        } catch (err) {
            addToast({
                type: "error",
                title: "Error",
                message: err.message
            });
        } finally {
            setGlobalProfileLoading(false)
        }

    }
    const saveCertifications = async () => {
        try {
            setGlobalProfileLoading(true)

            if (
                JSON.stringify(resData?.certifications || []) ===
                JSON.stringify(certifications)
            ) {
                addToast({
                    type: "warning",
                    title: "already Saved",
                    message: "no changes found"
                });
                return;
            }

            const payload = {
                certificates: certifications
            };
            const res = await axios.post(
                `${BASE_URL}/build-resume/certifications-info-save`,
                payload,
                { withCredentials: true }
            );

            dispatch(setRes({
                ...resData,
                certifications: certifications
            }));
            addToast({
                type: "success",
                title: "Saved",
                message: "Information Updated Successfully"
            });
        } catch (err) {
            addToast({
                type: "error",
                title: "Error",
                message: err.message
            });
        } finally {
            setGlobalProfileLoading(false)
        }

    }
    const saveAchievements = async () => {
        try {
            setGlobalProfileLoading(true)
            const formattedAchievements = achievements
                .map(item => item.achievement.trim())
                .filter(Boolean);

            if (
                JSON.stringify(resData?.achievements || []) ===
                JSON.stringify(formattedAchievements)
            ) {
                addToast({
                    type: "warning",
                    title: "already Saved",
                    message: "no changes found"
                });
                return;
            }

            const payload = {
                achievements: achievements
                    .map(item => item.achievement.trim())
                    .filter(Boolean)
            };

            console.log("ACHIEVEMENT PAYLOAD:", payload);
            const res = await axios.post(`${BASE_URL}/build-resume/achievements-info-save`,
                payload, { withCredentials: true })

            dispatch(setRes({
                ...resData,
                achievements: formattedAchievements
            }));
            addToast({
                type: "success",
                title: "Saved",
                message: "Information Updated Successfully"
            });
        } catch (err) {
            addToast({
                type: "error",
                title: "Error",
                message: err.message
            });
        } finally {
            setGlobalProfileLoading(false)
        }

    }




    const [activeTab, setActiveTab] = useState("preview"); // preview | tips | score
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const Navigate = useNavigate();
    const [toasts, setToasts] = useState([]);
    const addToast = ({ type = "success", title, message }) => {
        const id = Date.now();
        setToasts((prev) => [...prev, { id, type, title, message }]);
    };

    const removeToast = (id) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    };






    const [languages, setlanguages] = useState(

        resData?.languages?.length > 0
            ? resData.languages
            : resumeData?.languages?.length > 0
                ? resumeData.languages.map((s) => ({
                    id: crypto.randomUUID(),
                    langCategory: s.langCategory,
                    status: s.status || "",
                }))
                : [
                    {
                        id: crypto.randomUUID(),
                        langCategory: "",
                        status: "",
                    },
                ]
    );
    resumeData = {
        ...resumeData,
        languages: languages.map((s) => ({
            langCategory: s.langCategory,
            status: s.status,
        })),
    }

    const [achievements, setAchievements] = useState(
        resumeData?.achievements?.length > 0
            ? resumeData.achievements.map((s) => ({
                id: crypto.randomUUID(),
                achievement: s,
            }))
            : [
                {
                    id: crypto.randomUUID(),
                    achievement: "",
                },
            ]
    );


    resumeData = {
        ...resumeData,
        achievements: achievements
            .map((a) => a.achievement?.trim())
            .filter(Boolean),
    };

    const [certifications, setCertifications] = useState(
        resumeData?.certifications?.length > 0
            ? resumeData.certifications.map((s) => ({
                id: crypto.randomUUID(),
                about: s.about,
                link: s.link || "",
            }))
            : [
                {
                    id: crypto.randomUUID(),
                    about: "",
                    link: "",
                },
            ]
    );
    resumeData = {
        ...resumeData,
        certifications: certifications.map((s) => ({
            about: s.about,
            link: s.link || "",
        })),
    }





    const handleChange2 = (index, id, value) => {
        setlanguages(prev =>
            prev.map((exp, i) =>
                i === index ? { ...exp, [id]: value } : exp
            )
        );
    };
    const handleChange3 = (index, id, value) => {
        setAchievements(prev =>
            prev.map((exp, i) =>
                i === index ? { ...exp, [id]: value } : exp
            )
        );
    };
    const handleChange4 = (index, id, value) => {
        setCertifications(prev =>
            prev.map((exp, i) =>
                i === index ? { ...exp, [id]: value } : exp
            )
        );
    };
    const addlanguages = () => {
        setlanguages(prev => [
            ...prev,
            {
                id: crypto.randomUUID(),
                langCategory: "",
                status: "",
            }
        ]);
    };


    const addAchievements = () => {
        setAchievements(prev => [
            ...prev,
            {
                id: crypto.randomUUID(),
                achievement: ""
            }
        ]);
    };

    const addCertifications = () => {
        setCertifications(prev => [
            ...prev,
            {
                id: crypto.randomUUID(),
                about: "",
                link: "",
            }
        ]);
    };

    const [enhancerWorking, setEnhancerWorking] = useState("false");

    const enhancer = async (bullet, index, bulletIndex) => {
        try {
            setEnhancerWorking(`${index}`);
            const response = await axios.post(
                `${BASE_URL}/improve-pointer`,
                { bullet }
            );

            const improvedBullet = response.data.data.bullet;

            if (!improvedBullet) {
                addToast({
                    type: "error",
                    title: "Enhancement Failed",
                    message: "Could not improve bullet point."
                });
                return;
            }

            setAchievements(prev =>
                prev.map((exp, i) =>
                    i === index
                        ? {
                            ...exp,
                            achievement: improvedBullet
                        }
                        : exp
                )
            );
            return response.data.data.bullet;
        } catch (err) {
            console.error(err);
            return null;
        } finally {
            setEnhancerWorking(null);
        }
    };

    const [globalProfileLoading, setGlobalProfileLoading] = useState(false);
    return (
        <div className="min-h-[calc(100vh-4rem)] w-screen flex items-start justify-center p-4 md:p-6 bg-base-100">
            {globalProfileLoading && <div className='fixed bg-black/80 h-screen w-screen z-50 inset-0 flex items-center justify-center'>
                <motion.svg
                    animate={{
                        scale: [2, 1, 1, 1, 2, 2, 1, 1, 1, 2],
                        rotate: [0, 0, 0, 0, 180, 180, 0, 0, 0, 0],
                    }}
                    transition={{
                        duration: 2,
                        ease: "easeInOut",
                        times: [0, 0.2, 0.5, 0.8, 1],
                        repeat: Infinity,
                        repeatDelay: 1,
                    }}
                    width="100" height="100" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.1056 3.44721L5.78885 6.10557C5.00831 6.49585 4.61803 6.69098 4.61803 7C4.61803 7.30902 5.00831 7.50415 5.78885 7.89443L11.1056 10.5528C11.5445 10.7722 11.7639 10.882 12 10.882C12.2361 10.882 12.4555 10.7722 12.8944 10.5528L18.2111 7.89443C18.9917 7.50415 19.382 7.30902 19.382 7C19.382 6.69098 18.9917 6.49585 18.2111 6.10557L12.8944 3.44721C12.4555 3.22776 12.2361 3.11803 12 3.11803C11.7639 3.11803 11.5445 3.22776 11.1056 3.44721Z" fill="#fff" />
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M7.02217 10.4893C7.62603 10.8135 8.33716 11.169 9.15554 11.5782L10.2113 12.1061C11.0891 12.545 11.528 12.7644 12.0001 12.7644C12.4723 12.7644 12.9112 12.545 13.789 12.1061L14.8447 11.5782C15.6631 11.169 16.3742 10.8135 16.9781 10.4893L18.2113 11.1059C18.9918 11.4961 19.3821 11.6913 19.3821 12.0003C19.3821 12.3093 18.9918 12.5044 18.2113 12.8947L12.8946 15.5531C12.4557 15.7725 12.2362 15.8822 12.0001 15.8822C11.7641 15.8822 11.5446 15.7725 11.1057 15.5531L11.1057 15.5531L5.78898 12.8947C5.00844 12.5044 4.61816 12.3093 4.61816 12.0003C4.61816 11.6913 5.00844 11.4961 5.78898 11.1059L7.02217 10.4893Z" fill="#fff" />
                    <path




                        fill-rule="evenodd" clip-rule="evenodd" d="M7.02169 15.4893C7.62567 15.8135 8.33696 16.1692 9.15557 16.5785L10.2113 17.1063C11.0891 17.5452 11.528 17.7647 12.0001 17.7647C12.4723 17.7647 12.9112 17.5452 13.789 17.1063L14.8447 16.5785C15.6633 16.1692 16.3746 15.8135 16.9786 15.4893L18.2113 16.1056C18.9918 16.4959 19.3821 16.691 19.3821 17C19.3821 17.3091 18.9918 17.5042 18.2113 17.8945L12.8946 20.5528C12.4557 20.7723 12.2362 20.882 12.0001 20.882C11.7641 20.882 11.5446 20.7723 11.1057 20.5528L11.1057 20.5528L5.78898 17.8945C5.00844 17.5042 4.61816 17.3091 4.61816 17C4.61816 16.691 5.00844 16.4959 5.78898 16.1056L7.02169 15.4893Z" fill="#fff" />
                </motion.svg>
            </div>}
            <ToastContainer toasts={toasts} removeToast={removeToast} />
            <div className="w-full bg-base-100 rounded-3xl  overflow-hidden border border-accent" >

                {/* ── top bar ── */}
                <div className="flex flex-col min-[480px]:flex-row items-center justify-around min-[480px]:justify-center gap-5 min-[480px]:gap-3 bg-base-200 px-2 py-3.5 border-b border-accent sm:px-5">
                    {/* Step Counter */}
                    <span className="w-full flex justify-center min-[480px]:justify-start min-[480px]:w-1/5">
                        <Step index={6} />
                    </span>

                    {/* Progress Meter Container */}
                    <span className="flex min-[480px]:w-[70%] justify-center  w-full min-[480px]:justify-end sm:w-3/5 ">
                        <ProgressMeter index={6} resumeData={resumeData} />
                    </span>

                    {/* Sidebar Toggle Button Container */}
                    <span className="hidden w-1/5 justify-end sm:flex">
                        <button
                            onClick={() => setSidebarOpen((p) => !p)}
                            className={`
        flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition-all duration-200 justify-self-end sm:text-base
        ${sidebarOpen
                                    ? "bg-secondary-content text-base-100 border-secondary"
                                    : "bg-base-100 text-secondary-content border-secondary"
                                }
      `}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="1.4em" height="1.4em" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M12 2c4.714 0 7.071 0 8.535 1.464c1.08 1.08 1.364 2.647 1.439 5.286L22 9.5H2.026v-.75c.075-2.64.358-4.205 1.438-5.286C4.93 2 7.286 2 12 2" opacity={0.5}></path>
                                <path fill="currentColor" d="M13 6a1 1 0 1 1-2 0a1 1 0 0 1 2 0m-3 0a1 1 0 1 1-2 0a1 1 0 0 1 2 0M7 6a1 1 0 1 1-2 0a1 1 0 0 1 2 0"></path>
                                <path fill="currentColor" d="M2 12c0 4.714 0 7.071 1.464 8.535c1.01 1.01 2.446 1.324 4.786 1.421L9 22V9.5H2.026l-.023.75Q2 11.066 2 12" opacity={0.7}></path>
                                <path fill="currentColor" d="M22 12c0 4.714 0 7.071-1.465 8.535C19.072 22 16.714 22 12 22c-.819 0-2.316 0-3-.008V9.5h13l-.003.75Q22 11.066 22 12"></path>
                            </svg>
                            {sidebarOpen ? "Hide" : "Preview"}
                        </button>
                    </span>
                </div>


                {/* ── body ── */}
                <div className={`grid transition-all duration-500 ${sidebarOpen ? "lg:grid-cols-[1fr_500px]" : "grid-cols-1"}`}>


                    {/* ── LEFT: form ── */}
                    <div className=" border border-gray-700 ">
                        <div className='pt-5 pl-3'>      <Header index={6} /></div>


                        <h1 className="
  p-3 sm:p-5
  text-2xl sm:text-3xl md:text-4xl lg:text-5xl
  text-secondary-content
  font-bold
  flex flex-col sm:flex-row
  gap-3
  items-start sm:items-center
">
                            <span className='flex items-center gap-1'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="1.25em" height="1em" viewBox="0 0 640 512">
                                    <path fill="#fff" d="M0 128c0-35.3 28.7-64 64-64h512c35.3 0 64 28.7 64 64v256c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64zm320 0v256h256V128zm-141.7 47.9c-3.2-7.2-10.4-11.9-18.3-11.9s-15.1 4.7-18.3 11.9l-64 144c-4.5 10.1.1 21.9 10.2 26.4s21.9-.1 26.4-10.2l8.9-20.1h73.6l8.9 20.1c4.5 10.1 16.3 14.6 26.4 10.2s14.6-16.3 10.2-26.4zM160 233.2l19 42.8h-38zM448 164c11 0 20 9 20 20v4h60c11 0 20 9 20 20s-9 20-20 20h-2l-1.6 4.5c-8.9 24.4-22.4 46.6-39.6 65.4c.9.6 1.8 1.1 2.7 1.6l18.9 11.3c9.5 5.7 12.5 18 6.9 27.4s-18 12.5-27.4 6.9L467 333.8c-4.5-2.7-8.8-5.5-13.1-8.5c-10.6 7.5-21.9 14-34 19.4l-3.6 1.6c-10.1 4.5-21.9-.1-26.4-10.2s.1-21.9 10.2-26.4l3.6-1.6c6.4-2.9 12.6-6.1 18.5-9.8L410 286.1c-7.8-7.8-7.8-20.5 0-28.3s20.5-7.8 28.3 0l14.6 14.6l.5.5c12.4-13.1 22.5-28.3 29.8-45l-35.2.1h-72c-11 0-20-9-20-20s9-20 20-20h52v-4c0-11 9-20 20-20"></path>
                                </svg> Languages
                            </span>
                            <button className="bg-base-100  px-10 py-2.5 rounded-xl text-info font-bold border-2 border-secondary hover:text-secondary-content hover:border-secondary-content active:scale-95 transition-all duration-200" onClick={saveLanguage}>
                                Save
                            </button>



                            <button
                                onClick={addlanguages}
                                className="

rounded-xl sm:rounded-2xl
  w-full sm:w-auto
  ml-0 sm:ml-6 lg:ml-10
  mt-3 sm:mt-0
  px-4 sm:px-5
  py-2.5 sm:py-3
  text-sm sm:text-base lg:text-lg
  bg-accent

"
                            >
                                + Add Language
                            </button>
                        </h1>
                        {/* Languages */}
                        {languages.length !== 0 && (
                            <div className=' p-3 min-[650px]:p-6 md:p-10'>
                                <div className="space-y-5 mt-8">
                                    {languages.map((language, index) => (
                                        <div
                                            key={language.id}
                                            className="
  bg-base-300
  rounded-2xl sm:rounded-3xl
  shadow-inner
  p-3 sm:p-5 md:p-7
  mb-4 sm:mb-6
"
                                        >
                                            <div className="flex items-center justify-between mb-4">
                                                <h3 className="text-lg font-bold text-white">Language #{index + 1}</h3>
                                                <button
                                                    onClick={() => {
                                                        const newLang = [...languages];
                                                        newLang.splice(index, 1);
                                                        setlanguages(newLang);
                                                    }}
                                                    className="text-accent hover:text-secondary transition-colors cursor-pointer"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24">
                                                        <path fill="#ffffff" d="M3 6.524c0-.395.327-.714.73-.714h4.788c.006-.842.098-1.995.932-2.793A3.68 3.68 0 0 1 12 2a3.68 3.68 0 0 1 2.55 1.017c.834.798.926 1.951.932 2.793h4.788c.403 0 .73.32.73.714a.72.72 0 0 1-.73.714H3.73A.72.72 0 0 1 3 6.524M11.607 22h.787c2.707 0 4.06 0 4.94-.863s.971-2.28 1.151-5.111l.26-4.08c.098-1.537.146-2.306-.295-2.792c-.442-.487-1.187-.487-2.679-.487H8.23c-1.491 0-2.237 0-2.679.487c-.441.486-.392 1.255-.295 2.791l.26 4.08c.18 2.833.27 4.249 1.15 5.112S8.9 22 11.607 22"></path>
                                                    </svg>
                                                </button>
                                            </div>
                                            {/* Category Input */}
                                            <div className="flex justify-between items-start gap-2 flex-col ">
                                                <label
                                                    htmlFor="languages-category"
                                                    className="text-[13px] font-semibold uppercase tracking-widest text-info group-focus-within:text-white transition-colors ml-0.5"
                                                >
                                                    languages Category
                                                </label>

                                                <input
                                                    id='languages-category'
                                                    type="text"
                                                    placeholder="Language"
                                                    value={language.langCategory}
                                                    onChange={(e) =>

                                                        handleChange2(index, "langCategory", e.target.value)
                                                    }
                                                    className="w-full  bg-base-100 border border-accent rounded-xl px-3 sm:px-4
py-2.5 sm:py-3
text-sm sm:text-base text-white outline-none
                 focus:border-info  focus:ring-info focus:bg-secondary
                 transition-all duration-200 font-medium placeholder:text-accent focus:placeholder:text-gray-400"

                                                />

                                            </div>

                                            {/* languages Chips */}
                                            <div className="flex flex-col gap-2 mt-4 mb-3">
                                                <label
                                                    htmlFor="languages-category"
                                                    className="text-[13px] font-semibold uppercase tracking-widest text-info group-focus-within:text-white transition-colors ml-0.5"
                                                >
                                                    Add Status
                                                </label>
                                                <div
                                                    className="
    grid
    grid-cols-1
    min-[450px]:grid-cols-2
    sm:grid-cols-3
    md:grid-cols-4
    lg:grid-cols-5
    xl:grid-cols-6
    gap-3
  "
                                                >

                                                </div>

                                            </div>

                                            {/* Add language */}
                                            <div className="flex items-center w-full justify-between gap-10 ">
                                                <select
                                                    value={language.status}
                                                    onChange={(e) =>
                                                        handleChange2(index, "status", e.target.value)
                                                    }
                                                    className="w-full bg-base-100 border border-accent rounded-xl px-3 sm:px-4
py-2.5 sm:py-3
text-sm sm:text-base text-white outline-none
  focus:border-info focus:ring-info focus:bg-secondary"
                                                >
                                                    <option value="">Select Status</option>

                                                    {statusOptions.map((status, index) => (
                                                        <option key={index} value={status}>
                                                            {status}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                    ))}
                                </div>



                            </div>
                        )}
                        <div className="relative mt-10  mb-10  flex items-center justify-center w-full">
                            <span className="h-[2px] w-[60px] sm:w-[100px] md:w-[150px] bg-info"></span>

                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="mx-2 text-info"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    fill="currentColor"
                                    d="m12 12.708l-5.246 5.246q-.14.14-.344.15t-.364-.15t-.16-.354t.16-.354L11.292 12L6.046 6.754q-.14-.14-.15-.344t.15-.364t.354-.16t.354.16L12 11.292l5.246-5.246q.14-.14.345-.15q.203-.01.363.15t.16.354t-.16.354L12.708 12l5.246 5.246q.14.14.15.345q.01.203-.15.363t-.354.16t-.354-.16z"
                                />
                            </svg>

                            <span className="h-[2px] w-[60px] sm:w-[100px] md:w-[150px] bg-info"></span>
                        </div>
                        <h1 className="
  p-3 sm:p-5
  text-2xl sm:text-3xl md:text-4xl lg:text-5xl
  text-secondary-content
  font-bold
  flex flex-col sm:flex-row
  gap-3
  items-start sm:items-center
">
                            <span className='flex items-center gap-1'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                                    <path fill="#fff" d="M11.992 14.65a2.65 2.65 0 0 1-1.87-4.53a.753.753 0 1 1 1.06 1.07a1.13 1.13 0 0 0-.34.81a1.14 1.14 0 0 0 2 .81a.76.76 0 0 1 1.07 0a.77.77 0 0 1 0 1.07a2.67 2.67 0 0 1-1.92.77"></path>
                                    <path fill="#fff" d="M22.242 12a10.25 10.25 0 0 1-10.25 10.25a10.25 10.25 0 0 1 0-20.5a.75.75 0 0 1 .75.75v3.8a.76.76 0 0 1-.75.75a4.86 4.86 0 0 0-2.75.83a4.93 4.93 0 0 0-2.11 5.08a5 5 0 0 0 9.81-1a.74.74 0 0 1 .75-.75h3.8a.75.75 0 0 1 .75.79"></path>
                                    <path fill="#fff" d="M21.882 6.13a1.06 1.06 0 0 1-.23.53l-2.17 2.17a2.6 2.6 0 0 1-1.11.66a2.5 2.5 0 0 1-.76.11a3 3 0 0 1-.53 0l-1.33-.26l-2.28 2.29a.8.8 0 0 1-.53.22a.75.75 0 0 1-.53-.22a.74.74 0 0 1 0-1.06l2.29-2.3l-.27-1.32a2.76 2.76 0 0 1 .06-1.28a2.6 2.6 0 0 1 .66-1.11l2.15-2.15a1 1 0 0 1 .53-.25a.9.9 0 0 1 .54.09a1 1 0 0 1 .4.37a1 1 0 0 1 .12.58l-.32 2.26l2.25-.31a.94.94 0 0 1 .93.51a1 1 0 0 1 .13.47"></path>
                                </svg>
                                Achievements
                            </span>



                            <button className="bg-base-100  px-10 py-2.5 rounded-xl text-info font-bold border-2 border-secondary hover:text-secondary-content hover:border-secondary-content active:scale-95 transition-all duration-200" onClick={saveAchievements}>
                                Save
                            </button>
                            <button
                                onClick={addAchievements}
                                className="

rounded-xl sm:rounded-2xl
  w-full sm:w-auto
  ml-0 sm:ml-6 lg:ml-10
  mt-3 sm:mt-0
  px-4 sm:px-5
  py-2.5 sm:py-3
  text-sm sm:text-base lg:text-lg
  bg-accent

"
                            >
                                + Add Achievement
                            </button>
                        </h1>
                        {/* Recognition */}
                        {achievements.length !== 0 && (
                            <div className='p-3 min-[650px]:p-6 md:p-10'>


                                <div className="space-y-5 mt-8">
                                    {achievements.map((achievement, index) => (
                                        <div
                                            key={achievement.id}
                                            className="
  bg-base-300
  rounded-2xl sm:rounded-3xl
  shadow-inner
  p-3 sm:p-5 md:p-7
  mb-4 sm:mb-6
"
                                        >
                                            <div className="flex items-center justify-between mb-4">
                                                <h3 className="text-lg font-bold text-white">Achievements #{index + 1}</h3>
                                                <button
                                                    onClick={() => {
                                                        const newAchievements = [...achievements];
                                                        newAchievements.splice(index, 1);
                                                        setAchievements(newAchievements);
                                                    }}
                                                    className="text-accent hover:text-secondary transition-colors cursor-pointer"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24">
                                                        <path fill="#ffffff" d="M3 6.524c0-.395.327-.714.73-.714h4.788c.006-.842.098-1.995.932-2.793A3.68 3.68 0 0 1 12 2a3.68 3.68 0 0 1 2.55 1.017c.834.798.926 1.951.932 2.793h4.788c.403 0 .73.32.73.714a.72.72 0 0 1-.73.714H3.73A.72.72 0 0 1 3 6.524M11.607 22h.787c2.707 0 4.06 0 4.94-.863s.971-2.28 1.151-5.111l.26-4.08c.098-1.537.146-2.306-.295-2.792c-.442-.487-1.187-.487-2.679-.487H8.23c-1.491 0-2.237 0-2.679.487c-.441.486-.392 1.255-.295 2.791l.26 4.08c.18 2.833.27 4.249 1.15 5.112S8.9 22 11.607 22"></path>
                                                    </svg>
                                                </button>
                                            </div>
                                            {/* Category Input */}
                                            <div className="flex justify-between items-start gap-2 flex-col ">
                                                <label
                                                    htmlFor="languages-category"
                                                    className="text-[13px] font-semibold uppercase tracking-widest text-info group-focus-within:text-white transition-colors ml-0.5"
                                                >
                                                    Achievement
                                                </label>

                                                <input
                                                    id='achievement-category'
                                                    type="text"
                                                    placeholder="Achievement"
                                                    value={achievement.achievement}
                                                    onChange={(e) =>

                                                        handleChange3(index, "achievement", e.target.value)
                                                    }
                                                    className="w-full  bg-base-100 border border-accent rounded-xl px-3 sm:px-4
py-2.5 sm:py-3
text-sm sm:text-base text-white outline-none
                 focus:border-info  focus:ring-info focus:bg-secondary
                 transition-all duration-200 font-medium placeholder:text-accent focus:placeholder:text-gray-400"

                                                />
                                                <button className="
w-full sm:w-fit
bg-base-100
border border-secondary
px-3 py-2
rounded-xl
mt-3
flex justify-center items-center
gap-2
text-xs sm:text-sm
hover:scale-105
transition-all
duration-300
group
" onClick={() => {


                                                        if (achievements[index].achievement === '') {

                                                            addToast({
                                                                type: "error",
                                                                title: "Oh Snap!",
                                                                message: "Please fill 5 to 10 words"
                                                            });
                                                            return;
                                                        }
                                                        enhancer(achievements[index].achievement, index, index)
                                                    }} >

                                                    <div className='flex justify-center items-center gap-2  p-2 rounded-xl bg-secondary group-hover:text-base-100 transition-all duration-300 ease-in-out'>
                                                        <h1 className="text-xl font-bold text-secondary-content leading-tight text-center  transition-all duration-300 ease-in-out">Shastra</h1>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                                                            <path fill="#ffffff" d="M16.4 21h-2.154l-2-5H5.754l-2 5H1.6L8 5h2zm4.6-9v9h-2v-9zM6.554 14h4.892L9 7.885zM19.529 2.32a.507.507 0 0 1 .942 0l.253.61a4.37 4.37 0 0 0 2.25 2.327l.717.32a.53.53 0 0 1 0 .962l-.758.338a4.36 4.36 0 0 0-2.22 2.25l-.246.566a.506.506 0 0 1-.934 0l-.247-.565a4.36 4.36 0 0 0-2.219-2.251l-.76-.338a.53.53 0 0 1 0-.963l.718-.32a4.37 4.37 0 0 0 2.251-2.325z"></path>
                                                        </svg>
                                                        {enhancerWorking === `${index}` && < span className="loading loading-spinner">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                                                                <path fill="#ee5252" d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z">
                                                                    <animateTransform attributeName="transform" dur="0.75s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"></animateTransform>
                                                                </path>
                                                            </svg></span>}

                                                    </div>
                                                    Improve the Point
                                                </button>
                                            </div>


                                        </div>
                                    ))}
                                </div>



                            </div>
                        )}
                        <div className="relative mt-10  mb-10  flex items-center justify-center w-full">
                            <span className="h-[2px] w-[60px] sm:w-[100px] md:w-[150px] bg-info"></span>

                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="mx-2 text-info"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    fill="currentColor"
                                    d="m12 12.708l-5.246 5.246q-.14.14-.344.15t-.364-.15t-.16-.354t.16-.354L11.292 12L6.046 6.754q-.14-.14-.15-.344t.15-.364t.354-.16t.354.16L12 11.292l5.246-5.246q.14-.14.345-.15q.203-.01.363.15t.16.354t-.16.354L12.708 12l5.246 5.246q.14.14.15.345q.01.203-.15.363t-.354.16t-.354-.16z"
                                />
                            </svg>

                            <span className="h-[2px] w-[60px] sm:w-[100px] md:w-[150px] bg-info"></span>
                        </div>
                        <h1 className="
  p-3 sm:p-5
  text-2xl sm:text-3xl md:text-4xl lg:text-5xl
  text-secondary-content
  font-bold
  flex flex-col sm:flex-row
  gap-3
  items-start sm:items-center
">
                            <span className='flex items-center gap-1'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                                    <path fill="#fff" d="M15.15 18.68a.3.3 0 0 0 0 .21a.25.25 0 0 0 .2.09a.25.25 0 0 0 .18-.08l4-4.18a1.83 1.83 0 0 0-.25-2.57a3 3 0 0 0-2.42-.61a.24.24 0 0 0-.21.19ZM7.3 11.75a.24.24 0 0 0-.21-.2a3.1 3.1 0 0 0-2.42.59a1.85 1.85 0 0 0-.22 2.62l3.92 4.14a.25.25 0 0 0 .18.08a.25.25 0 0 0 .19-.09a.23.23 0 0 0 .05-.21Zm1.95 8.75a6.23 6.23 0 0 0-3.95 1.79a1 1 0 0 0-.22 1.09A1 1 0 0 0 6 24h12a1 1 0 0 0 .92-.61a1 1 0 0 0-.2-1.08a6 6 0 0 0-4-1.81c-.44-.03-4.98-.03-5.47 0M9 3a3 3 0 1 0 6 0a3 3 0 1 0-6 0m6.77 6a.51.51 0 0 0-.16-.49a.5.5 0 0 0-.51-.08a8.33 8.33 0 0 1-6.21 0a.5.5 0 0 0-.51.09a.48.48 0 0 0-.15.48l2.17 9.79a.26.26 0 0 0 .24.19h2.71a.26.26 0 0 0 .25-.19Z"></path>
                                </svg>
                                Certifications
                            </span>


                            <button className="bg-base-100  px-10 py-2.5 rounded-xl text-info font-bold border-2 border-secondary hover:text-secondary-content hover:border-secondary-content active:scale-95 transition-all duration-200" onClick={saveCertifications}>
                                Save
                            </button>

                            <button
                                onClick={addCertifications}
                                className="

rounded-xl sm:rounded-2xl
  w-full sm:w-auto
  ml-0 sm:ml-6 lg:ml-10
  mt-3 sm:mt-0
  px-4 sm:px-5
  py-2.5 sm:py-3
  text-sm sm:text-base lg:text-lg
  bg-accent

"
                            >
                                + Add Certificate
                            </button>
                        </h1>
                        {certifications.length !== 0 && (
                            <div className=' p-3 min-[650px]:p-6 md:p-10'>
                                <div className="space-y-5 mt-8">
                                    {certifications.map((certification, index) => (
                                        <div
                                            key={certification.id}
                                            className="
  bg-base-300
  rounded-2xl sm:rounded-3xl
  shadow-inner
  p-3 sm:p-5 md:p-7
  mb-4 sm:mb-6
"
                                        >
                                            <div className="flex items-center justify-between mb-4">
                                                <h3 className="text-lg font-bold text-white">Certificate #{index + 1}</h3>
                                                <button
                                                    onClick={() => {
                                                        const newCertificate = [...certifications];
                                                        newCertificate.splice(index, 1);
                                                        setCertifications(newCertificate);
                                                    }}
                                                    className="text-accent hover:text-secondary transition-colors cursor-pointer"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24">
                                                        <path fill="#ffffff" d="M3 6.524c0-.395.327-.714.73-.714h4.788c.006-.842.098-1.995.932-2.793A3.68 3.68 0 0 1 12 2a3.68 3.68 0 0 1 2.55 1.017c.834.798.926 1.951.932 2.793h4.788c.403 0 .73.32.73.714a.72.72 0 0 1-.73.714H3.73A.72.72 0 0 1 3 6.524M11.607 22h.787c2.707 0 4.06 0 4.94-.863s.971-2.28 1.151-5.111l.26-4.08c.098-1.537.146-2.306-.295-2.792c-.442-.487-1.187-.487-2.679-.487H8.23c-1.491 0-2.237 0-2.679.487c-.441.486-.392 1.255-.295 2.791l.26 4.08c.18 2.833.27 4.249 1.15 5.112S8.9 22 11.607 22"></path>
                                                    </svg>
                                                </button>
                                            </div>
                                            {/* Category Input */}
                                            <div className="flex justify-between items-start gap-2 flex-col ">
                                                <label
                                                    htmlFor="languages-category"
                                                    className="text-[13px] font-semibold uppercase tracking-widest text-info group-focus-within:text-white transition-colors ml-0.5"
                                                >
                                                    Certificate Title
                                                </label>

                                                <input
                                                    id={`certification-about-${index}`}
                                                    type="text"
                                                    placeholder="Certificate Name"
                                                    value={certification.about}
                                                    onChange={(e) =>

                                                        handleChange4(index, "about", e.target.value)
                                                    }
                                                    className="w-full  bg-base-100 border border-accent rounded-xl px-3 sm:px-4
py-2.5 sm:py-3
text-sm sm:text-base text-white outline-none
                 focus:border-info  focus:ring-info focus:bg-secondary 
                 transition-all duration-200 font-medium placeholder:text-accent focus:placeholder:text-gray-400"

                                                />

                                            </div>

                                            {/* languages Chips */}
                                            <div className="flex flex-col gap-2 mt-4 mb-3">
                                                <label
                                                    htmlFor="languages-category"
                                                    className="text-[13px] font-semibold uppercase tracking-widest text-info group-focus-within:text-white transition-colors ml-0.5"
                                                >
                                                    Add Link
                                                </label>
                                                <div
                                                    className="
    grid
    grid-cols-1
    min-[450px]:grid-cols-2
    sm:grid-cols-3
    md:grid-cols-4
    lg:grid-cols-5
    xl:grid-cols-6
    gap-3
  "
                                                >

                                                </div>

                                            </div>

                                            {/* Add language */}
                                            <div className="flex items-center w-full justify-between gap-10 ">
                                                <input
                                                    value={certification.link}
                                                    onChange={(e) =>
                                                        handleChange4(index, "link", e.target.value)
                                                    }
                                                    placeholder='Add Url'
                                                    className="w-full bg-base-100 border border-accent rounded-xl px-3 sm:px-4
py-2.5 sm:py-3
text-sm sm:text-base text-white outline-none
  focus:border-info focus:ring-info focus:bg-secondary"
                                                >



                                                </input>
                                            </div>
                                        </div>
                                    ))}
                                </div>



                            </div>
                        )}
                        <div className="relative mt-10  mb-10  flex items-center justify-center w-full">
                            <span className="h-[2px] w-[60px] sm:w-[100px] md:w-[150px] bg-info"></span>

                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="mx-2 text-info"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    fill="currentColor"
                                    d="m12 12.708l-5.246 5.246q-.14.14-.344.15t-.364-.15t-.16-.354t.16-.354L11.292 12L6.046 6.754q-.14-.14-.15-.344t.15-.364t.354-.16t.354.16L12 11.292l5.246-5.246q.14-.14.345-.15q.203-.01.363.15t.16.354t-.16.354L12.708 12l5.246 5.246q.14.14.15.345q.01.203-.15.363t-.354.16t-.354-.16z"
                                />
                            </svg>

                            <span className="h-[2px] w-[60px] sm:w-[100px] md:w-[150px] bg-info"></span>
                        </div>
                    </div>



                    {/* ── RIGHT: sidebar ── */}
                    {sidebarOpen && (
                        <Preview resumeData={resumeData} activeTab={activeTab} setActiveTab={setActiveTab} />
                    )}
                </div>


                {/* ── footer ── */}

                <div className="flex  items-center gap-3 justify-end px-6 md:px-10 py-4 bg-base-200 border-t border-slate-700">

                    <div onClick={() => {
                        Navigate("/app/build-resume/intro-preview-page", {
                            state: { resumeData: resumeData }
                        });
                    }} className={` flex items-center justify-between cursor-pointer text-black  font-bold `}>

                        <span className="text-white">
                            <svg height="40" viewBox="0 0 15 40" width="15" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" transform="matrix(-1,0,0,1,0,0)">
                                <path d="M0 .5h11A3.5 3.5 0 0 1 14.5 4v20.523a5.5 5.5 0 0 1-1.416 3.684l-8.547 9.477A5.5 5.5 0 0 1 .453 39.5H0" data-stroke="true"
                                    fill="#fff"
                                ></path>
                            </svg>
                        </span>
                        <button className="bg-white flex px-4 py-[7.5px] "><p className='font-extrabold'>Next:</p>  Finalise Your Details </button>
                        <span className="text-white">
                            <svg height="40" viewBox="0 0 15 40" width="15" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M0 .5h11A3.5 3.5 0 0 1 14.5 4v20.523a5.5 5.5 0 0 1-1.416 3.684l-8.547 9.477A5.5 5.5 0 0 1 .453 39.5H0"
                                    fill="#fff"
                                />
                            </svg>
                        </span>
                    </div>
                </div>
            </div >
        </div >
    )
}

export default FieldsAdditionals;

