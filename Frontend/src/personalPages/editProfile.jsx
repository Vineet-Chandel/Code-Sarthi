import React from "react";
import { useSelector } from "react-redux";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from "../Pages/auth/baseURL";

const EditProfile = () => {

    const [newError, setNewError] = useState(false);
    const [errorisOpen, errorsetIsOpen] = useState(false);
    const [showPanel, setShowPanel] = useState(false);



    const { user } = useSelector(store => store.user || {});
    const [formData, setFormData] = useState({
        FirstName: '',
        MiddleName: '',
        LastName: '',
        username: '',
        gender: '',
        age: '',
        profession: '',
        college: '',
        about: ''
    });

    const handleUpdate = async (e) => {
        e.preventDefault();

        const updatedData = {};

        Object.keys(formData).forEach((key) => {
            if (
                formData[key]?.trim() !== '' &&
                formData[key] !== user?.[key]
            ) {
                updatedData[key] = formData[key];
            }
        });


        try {
            const res = await axios.patch(
                `${BASE_URL}/profile/edit`,
                updatedData,
                { withCredentials: true }
            );


        } catch (err) {
            setNewError(err.response.data || err.message);
            errorsetIsOpen(true)
        };
    };


    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));
    }


    return (
        <div className="min-h-screen w-full bg-black flex justify-center p-6 overflow-y-auto">

            <div className="w-full max-w-9xl p-6 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 flex flex-col gap-12">

                {/* ================= HEADER ================= */}
                <div className="w-full flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">

                    <div>
                        <h1 className="text-5xl font-extrabold bg-[linear-gradient(135deg,#00c6ff,#0072ff)] bg-clip-text text-transparent flex items-center gap-3">
                            Edit Profile <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 32 32"><g fill="none"><path fill="url(#SVGKCH4Jk8K)" d="M25.125 18.056v4.166l-8.095 7.75q-.51.027-1.03.028c-3.198 0-6.14-.823-8.315-2.207C5.523 26.417 4 24.393 4 22v-.5A3.5 3.5 0 0 1 7.5 18h17q.32.001.625.056" /><path fill="url(#SVGcp1ycBLD)" d="M25.125 18.056v4.166l-8.095 7.75q-.51.027-1.03.028c-3.198 0-6.14-.823-8.315-2.207C5.523 26.417 4 24.393 4 22v-.5A3.5 3.5 0 0 1 7.5 18h17q.32.001.625.056" /><path fill="url(#SVGoCl5vdmK)" fill-opacity="0.75" d="M25.125 18.056v4.166l-8.095 7.75q-.51.027-1.03.028c-3.198 0-6.14-.823-8.315-2.207C5.523 26.417 4 24.393 4 22v-.5A3.5 3.5 0 0 1 7.5 18h17q.32.001.625.056" /><path fill="url(#SVGTVs4bdKw)" fill-opacity="0.75" d="M25.125 18.056v4.166l-8.095 7.75q-.51.027-1.03.028c-3.198 0-6.14-.823-8.315-2.207C5.523 26.417 4 24.393 4 22v-.5A3.5 3.5 0 0 1 7.5 18h17q.32.001.625.056" /><path fill="url(#SVGUxDSsduC)" d="M16 16a7 7 0 1 0 0-14a7 7 0 0 0 0 14" /><path fill="url(#SVGXETk5dzY)" d="m21.539 29.469l7.61-7.543v-4.074h-4.073l-7.567 7.64l.308 3.695z" /><path fill="url(#SVG0UyewtcI)" d="m21.539 29.47l.223-.223s-1.726-.661-2.535-1.47c-.809-.81-1.47-2.534-1.47-2.534l-.248.249a2.66 2.66 0 0 0-.686 1.206l-.79 3.051a1 1 0 0 0 1.217 1.22l3.02-.778a2.8 2.8 0 0 0 1.269-.722" /><path fill="url(#SVGVV4hJcjm)" d="m27.937 23.14l2.211-2.214a2.88 2.88 0 0 0 .072-4.017a2.88 2.88 0 0 0-4.144-.057l-2.238 2.241z" /><path fill="url(#SVGb0sU2cqf)" d="M25.094 17.838a5.43 5.43 0 0 0 4.106 4.038l-1.55 1.551a5.43 5.43 0 0 1-4.106-4.04z" /><defs><linearGradient id="SVGKCH4Jk8K" x1="9.707" x2="13.584" y1="19.595" y2="31.977" gradientUnits="userSpaceOnUse"><stop offset=".125" stop-color="#00c6ff" /><stop offset="1" stop-color="#41d1dc" /></linearGradient><linearGradient id="SVGcp1ycBLD" x1="16" x2="21.429" y1="16.571" y2="36.857" gradientUnits="userSpaceOnUse"><stop stop-color="#5edadb" stop-opacity="0" /><stop offset="1" stop-color="#62f8ef" /></linearGradient><linearGradient id="SVGUxDSsduC" x1="12.329" x2="19.464" y1="3.861" y2="15.254" gradientUnits="userSpaceOnUse"><stop offset=".125" stop-color="#00c6ff" /><stop offset="1" stop-color="#41d1dc" /></linearGradient><linearGradient id="SVGXETk5dzY" x1="20.861" x2="27.044" y1="19.948" y2="26.149" gradientUnits="userSpaceOnUse"><stop stop-color="#ffa43d" /><stop offset="1" stop-color="#fb5937" /></linearGradient><linearGradient id="SVG0UyewtcI" x1="15.174" x2="19.325" y1="26.847" y2="30.975" gradientUnits="userSpaceOnUse"><stop offset=".255" stop-color="#ffd394" /><stop offset="1" stop-color="#ff921f" /></linearGradient><linearGradient id="SVGVV4hJcjm" x1="29.502" x2="26.869" y1="17.485" y2="19.969" gradientUnits="userSpaceOnUse"><stop stop-color="#7bfffd" /><stop offset="1" stop-color="#dd3ce2" /></linearGradient><linearGradient id="SVGb0sU2cqf" x1="26.469" x2="22.489" y1="21.664" y2="19.902" gradientUnits="userSpaceOnUse"><stop stop-color="#ff921f" /><stop offset="1" stop-color="#ffe994" /></linearGradient><radialGradient id="SVGoCl5vdmK" cx="0" cy="0" r="1" gradientTransform="rotate(-59.267 40.498 -1.073)scale(18.9466 9.80314)" gradientUnits="userSpaceOnUse"><stop stop-color="#0a1852" stop-opacity="0.75" /><stop offset="1" stop-color="#0a1852" stop-opacity="0" /></radialGradient><radialGradient id="SVGTVs4bdKw" cx="0" cy="0" r="1" gradientTransform="matrix(0 -5.5 7.25 0 26 21.5)" gradientUnits="userSpaceOnUse"><stop stop-color="#0a1852" stop-opacity="0.75" /><stop offset="1" stop-color="#0a1852" stop-opacity="0" /></radialGradient></defs></g></svg>
                        </h1>
                        <p className="text-lg text-gray-400 mt-2">
                            Your profile is your first impression — make it unforgettable ✨
                        </p>
                    </div>
                    <button className="group relative w-full max-w-md p-4 mt-4 rounded-xl text-lg font-medium bg-gray-800/40 border-[2px] border-gray-700/50 hover:bg-gray-800/60 transition-all duration-300 overflow-hidden">
                        Profile Edits
                        <div className="absolute inset-x-0 bottom-0 h-[2px] w-full bg-gradient-to-r from-transparent via-indigo-500"></div>
                        <div className="absolute inset-x-0 bottom-0 h-[2px] w-[50%] mx-auto bg-gradient-to-r from-transparent via-violet-500"></div>
                        <div className="absolute inset-x-0 bottom-0 h-[1px] w-[50%] mx-auto cursor-pointer group-hover:h-[4px] group-hover:blur-sm transition-all duration-300 bg-gradient-to-r from-transparent via-purple-400"></div>
                    </button>
                    <button className="group relative w-full max-w-md p-4 mt-4 rounded-xl text-lg font-medium bg-gray-800/40 border-[2px] border-gray-700/50 hover:bg-gray-800/60 transition-all duration-300 overflow-hidden">
                        Skils and Project Edits
                        <div className="absolute inset-x-0 bottom-0 h-[2px] w-full bg-gradient-to-r from-transparent via-indigo-500"></div>
                        <div className="absolute inset-x-0 bottom-0 h-[2px] w-[50%] mx-auto bg-gradient-to-r from-transparent via-violet-500"></div>
                        <div className="absolute inset-x-0 bottom-0 h-[1px] w-[50%] mx-auto cursor-pointer group-hover:h-[4px] group-hover:blur-sm transition-all duration-300 bg-gradient-to-r from-transparent via-purple-400"></div>
                    </button>

                </div>

                {/* ================= CONTENT ================= */}
                <div className="w-full flex flex-col lg:flex-row gap-10">

                    {/* ========== LEFT PANEL ========== */}
                    <div className="w-full lg:w-[30%] rounded-3xl p-6 bg-black/30 border border-white/10 flex flex-col items-center">

                        {/* Avatar */}
                        <div className="relative w-[180px] h-[180px] rounded-2xl bg-gray-900 border border-gray-700 flex items-center justify-center">
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-400/20 to-blue-600/20 blur-xl"></div>
                            <span className="relative text-5xl font-bold text-cyan-400">
                                {user?.FirstName?.[0] || "U"}
                            </span>
                        </div>

                        {/* Name */}
                        <p className="text-3xl font-semibold text-white mt-5 tracking-wide text-center">
                            {user?.FirstName || "First"} {user?.MiddleName || ""} {user?.LastName || "Last"}
                        </p>
                        <div className="flex gap-4 mt-2">
                            {/* Username */}
                            <p className="text-base text-gray-400 mt-1">
                                @{user?.username || "username"}
                            </p>
                            {/* Username */}
                            <div className="text-base text-gray-400 mt-1 flex gap-1 font-bold">
                                Age : <p className="font-normal">{user.age}</p>
                            </div>
                        </div>


                        {/* Divider */}
                        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent my-6"></div>

                        {/* Info Pills */}
                        <div className="w-full flex flex-col gap-3">

                            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-gray-300">
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24"><g fill="none"><path fill="#66e1ff" d="M21.087 3.87H2.913V23h18.174z" /><path fill="#c2f3ff" d="M19.89 3.87H2.914v16.978z" /><path stroke="#7a7a7a" stroke-linecap="round" stroke-linejoin="round" d="M1 23h22M21.087 3.87H2.913V23h18.174zM1 3.87h22" stroke-width="1" /><path fill="#b2b2b2" stroke="#7a7a7a" stroke-linecap="round" stroke-linejoin="round" d="M20.13 3.87V1.957A.956.956 0 0 0 19.174 1H4.826a.957.957 0 0 0-.956.957V3.87z" stroke-width="1" /><path fill="#fff" stroke="#7a7a7a" stroke-linecap="round" stroke-linejoin="round" d="M10.565 23v-3.348a1.435 1.435 0 0 1 2.87 0V23z" stroke-width="1" /><path stroke="#7a7a7a" stroke-linecap="round" stroke-linejoin="round" d="M5.782 19.174h2.87m6.696 0h2.87M5.782 15.348h3.826m4.782 0h3.827M5.782 11.522h3.826m4.782 0h3.827M5.782 7.696h3.826m4.782 0h3.827" stroke-width="1" /></g></svg> <span>{user?.college || "College Name"}</span>
                            </div>

                            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-gray-300">
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><g fill="none"><path fill="url(#SVGPusuadEO)" d="M17.754 14a2.25 2.25 0 0 1 2.249 2.249v.918a2.75 2.75 0 0 1-.513 1.6C17.945 20.93 15.42 22 12 22s-5.944-1.072-7.486-3.236a2.75 2.75 0 0 1-.51-1.596v-.92A2.25 2.25 0 0 1 6.251 14z" /><path fill="url(#SVG2f7L8cLU)" d="M17.754 14a2.25 2.25 0 0 1 2.249 2.249v.918a2.75 2.75 0 0 1-.513 1.6C17.945 20.93 15.42 22 12 22s-5.944-1.072-7.486-3.236a2.75 2.75 0 0 1-.51-1.596v-.92A2.25 2.25 0 0 1 6.251 14z" /><path fill="url(#SVG9AhnabtW)" d="M12 2.005a5 5 0 1 1 0 10a5 5 0 0 1 0-10" /><defs><linearGradient id="SVGPusuadEO" x1="7.808" x2="10.394" y1="15.064" y2="23.319" gradientUnits="userSpaceOnUse"><stop offset=".125" stop-color="#00c6ff" /><stop offset="1" stop-color="#41d1dc" /></linearGradient><linearGradient id="SVG2f7L8cLU" x1="12.003" x2="15.623" y1="13.047" y2="26.573" gradientUnits="userSpaceOnUse"><stop stop-color="#5edadb" stop-opacity="0" /><stop offset="1" stop-color="#62f8ef" /></linearGradient><linearGradient id="SVG9AhnabtW" x1="9.379" x2="14.475" y1="3.334" y2="11.472" gradientUnits="userSpaceOnUse"><stop offset=".125" stop-color="#00c6ff" /><stop offset="1" stop-color="#41d1dc" /></linearGradient></defs></g></svg>  <span>{user?.profession || "Profession"}</span>
                            </div>

                            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-gray-300">
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><g fill="none"><path fill="#ff808c" d="M12.95 13.891a3.816 3.816 0 1 0 0-7.632a3.816 3.816 0 0 0 0 7.632" /><path fill="#66e1ff" d="M7.21 15.826a3.815 3.815 0 1 0 0-7.63a3.815 3.815 0 0 0 0 7.63" /><path stroke="#7a7a7a" stroke-linecap="round" stroke-linejoin="round" d="M9.61 14.146a5.26 5.26 0 1 1 3.826 1.18" stroke-width="1" /><path stroke="#7a7a7a" stroke-linecap="round" stroke-linejoin="round" d="M10.578 7.952A5.26 5.26 0 1 1 6.74 6.76m10.043-.5L22.044 1m0 3.826V1h-3.826M6.74 17.26V23m-1.913-1.913h3.826" stroke-width="1" /></g></svg> <span>{user?.gender || "Gender"}</span>
                            </div>
                            <div className="flex flex-col gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-gray-300">
                                <div className="flex gap-1 font-bold text-xl"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24"><defs><mask id="SVGbM9xrexz"><path fill="#fff" d="M5 6c0 -2 2 0 6.5 0c4.5 0 7.5 -2 7.5 0l0 1c0 1.5 -2 2 -6.5 2c-4.5 0 -7.5 0 -7.5 -2l0 -1Z" /><path d="M4 4h16v5h-16Z"><animate fill="freeze" attributeName="d" begin="0.2s" dur="0.2s" to="M4 4h0v5h0Z" /></path></mask><mask id="SVG7b0ZLcJT"><path fill="#fff" fill-opacity="0.3" d="M10.13 18.15c-0.09 -0.86 -0.72 -6.17 -0.72 -6.17c0 0 1.94 0.33 3.1 -0.25c1.16 -0.57 2.48 -0.73 2.48 -0.73c0 0 -0.58 6.96 -0.63 7.46c-0.05 0.5 -0.9 0.84 -1.4 0.84l-1.72 0c-0.5 0 -1.02 -0.3 -1.11 -1.15Z" /><path d="M8 10h8v10h-8Z"><animate fill="freeze" attributeName="d" begin="0.5s" dur="0.2s" to="M8 10h8v0h-8Z" /></path></mask></defs><g fill="none" stroke="#ffffff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"><path stroke-dasharray="32" d="M7.5 10.5c0 0 0.83 6.93 1 8.5c0.17 1.57 1.5 2 2.5 2l2 0c1.5 0 2.88 -1.14 3 -2c0.13 -0.86 1 -12 1 -12"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.2s" values="32;0" /></path><path stroke-dasharray="14" stroke-dashoffset="14" d="M8 4c1.1 -0.57 2 -1 4 -1c2 0 4.5 0.5 4.5 3"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.4s" dur="0.1s" to="0" /></path></g><g fill="#ffffff"><path d="M0 0h24v24H0z" mask="url(#SVGbM9xrexz)" /><path d="M0 0h24v24H0z" mask="url(#SVG7b0ZLcJT)" /></g></svg>  About :</div>  {user.about}
                            </div>

                        </div>
                    </div>

                    {/* ========== RIGHT PANEL ========== */}
                    <div className={`w-full lg:w-[70%] rounded-3xl p-8 bg-black/30 border border-white/10 ${showPanel ? 'hidden' : 'flex'} flex-col gap-6 `}>

                        <h2 className="text-2xl font-semibold text-white">
                            Profile Information
                        </h2>

                        <p className="text-gray-400">
                            Update your personal details below only fill that feilds which u want to edit !!
                        </p>

                        {/* Inputs go here */}
                        <div className="h-full p-5 border border-dashed border-white/20 rounded-xl flex items-center justify-center text-gray-500">
                            <form action="" onSubmit={handleUpdate} className="flex flex-col gap-3">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="space-y-2 ">
                                        <label htmlFor="FirstName" className="text-md ml-3 block">
                                            First Name
                                        </label>
                                        <div className={"flex items-center rounded-2xl px-4 py-3 border border-gray-600 transition-all duration-300  bg-black/50"}>
                                            <span className="mr-3">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8fbffa" strokeWidth="2">
                                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                                    <circle cx="12" cy="7" r="4" />
                                                </svg>
                                            </span>
                                            <input
                                                id="FirstName"
                                                type="text"
                                                placeholder={user.FirstName}
                                                className="w-full outline-none text-gray-200 bg-transparent placeholder-gray-500 text-base"
                                                value={formData['FirstName']}
                                                onChange={handleChange}

                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="FirstName" className="text-md ml-3 block">
                                            Middle Name
                                        </label>
                                        <div className={"flex items-center rounded-2xl px-4 py-3 border border-gray-600 transition-all duration-300  bg-black/50"}>
                                            <span className="mr-3">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8fbffa" strokeWidth="2">
                                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                                    <circle cx="12" cy="7" r="4" />
                                                </svg>
                                            </span>
                                            <input
                                                id="MiddleName"
                                                type="text"
                                                placeholder={user.MiddleName}
                                                className="w-full outline-none text-gray-200 bg-transparent placeholder-gray-500 text-base"
                                                value={formData['MiddleName']}
                                                onChange={handleChange}
                                                required={false}
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="FirstName" className="text-md ml-3 block">
                                            Last Name
                                        </label>
                                        <div className={"flex items-center rounded-2xl px-4 py-3 border border-gray-600 transition-all duration-300  bg-black/50"}>
                                            <span className="mr-3">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8fbffa" strokeWidth="2">
                                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                                    <circle cx="12" cy="7" r="4" />
                                                </svg>
                                            </span>
                                            <input
                                                id="LastName"
                                                type="text"
                                                placeholder={user.LastName}
                                                className="w-full outline-none text-gray-200 bg-transparent placeholder-gray-500 text-base"
                                                value={formData['LastName']}
                                                onChange={handleChange}

                                            />
                                        </div>
                                    </div>
                                </div>




                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label htmlFor="gender" className="text-md ml-3 block">
                                            Gender
                                        </label>
                                        <div className={`flex items-center rounded-2xl px-4 py-3 border border-gray-600 transition-all duration-300  bg-black/50`}>
                                            <span className="mr-3">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8fbffa" strokeWidth="2">
                                                    <circle cx="12" cy="12" r="10" />
                                                    <path d="M12 2v10M12 22v-10M2 12h10M22 12H12" />
                                                </svg>
                                            </span>
                                            <select
                                                id="gender"
                                                className="w-full outline-none text-gray-200 bg-transparent text-base appearance-none cursor-pointer"
                                                value={formData.gender}
                                                onChange={handleChange}

                                            >
                                                <option value="" disabled hidden className="text-gray-500">{user.gender}</option>
                                                <option value="male" className="bg-gray-900 text-white">Male</option>
                                                <option value="female" className="bg-gray-900 text-white">Female</option>
                                                <option value="other" className="bg-gray-900 text-white">Other</option>

                                            </select>
                                            <svg className="ml-2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="age" className="text-md ml-3 block">
                                            Age
                                        </label>
                                        <div className={`flex items-center rounded-2xl px-4 py-3 border border-gray-600 transition-all duration-300  bg-black/50`}>
                                            <span className="mr-3">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8fbffa" strokeWidth="2">
                                                    <circle cx="12" cy="12" r="10" />
                                                    <polyline points="12 6 12 12 16 14" />
                                                </svg>
                                            </span>
                                            <input
                                                id="age"
                                                type="number"
                                                min="10"
                                                max="100"
                                                placeholder={user.age}
                                                className="w-full outline-none text-gray-200 bg-transparent placeholder-gray-500 text-base [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                                value={formData.age}
                                                onChange={handleChange}

                                            />
                                        </div>
                                    </div>
                                </div>


                                <div className='flex justify-between items-center w-full'>
                                    <div className="space-y-2 w-[48.5%]">
                                        <label htmlFor="college" className="text-md ml-3 block ">
                                            College or Company
                                        </label>
                                        <div className={`flex items-center rounded-2xl px-4 py-3 border border-gray-600 transition-all duration-300  bg-black/50`}>
                                            <span className="mr-3">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 50 50">
                                                    <g fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.4">
                                                        <path stroke="#306cfe" d="M33.333 8.333A2.083 2.083 0 0 0 31.25 6.25h-12.5a2.083 2.083 0 0 0-2.083 2.083v6.25h16.666zM43.75 41.667v-25a2.083 2.083 0 0 0-2.083-2.084H8.333a2.083 2.083 0 0 0-2.083 2.084v25a2.083 2.083 0 0 0 2.083 2.083h33.334a2.083 2.083 0 0 0 2.083-2.083" />
                                                        <path stroke="#344054" d="M22.917 29.167H18a8.33 8.33 0 0 1-7.583-5.042l-3.792-8.646a2.08 2.08 0 0 1 1.708-.896h33.334a2.08 2.08 0 0 1 1.708.896l-3.792 8.646A8.33 8.33 0 0 1 32 29.167h-4.917" />
                                                        <path stroke="#306cfe" d="M27.083 27.083h-4.166v4.167h4.166z" />
                                                    </g>
                                                </svg>
                                            </span>
                                            <input
                                                id="college"
                                                type="text"
                                                placeholder={user.college}
                                                className="outline-none w-full text-gray-200 bg-transparent placeholder-gray-500 text-base"
                                                value={formData.college}
                                                onChange={handleChange}

                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2  w-[48.5%]">
                                        <label htmlFor="profession" className="text-md ml-3 block">
                                            Professionaly what you are !
                                        </label>
                                        <div className={`flex items-center rounded-2xl px-4 py-3 border border-gray-600 transition-all duration-300  bg-black/50`}>
                                            <span className="mr-3">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 50 50">
                                                    <g fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.4">
                                                        <path stroke="#306cfe" d="M33.333 8.333A2.083 2.083 0 0 0 31.25 6.25h-12.5a2.083 2.083 0 0 0-2.083 2.083v6.25h16.666zM43.75 41.667v-25a2.083 2.083 0 0 0-2.083-2.084H8.333a2.083 2.083 0 0 0-2.083 2.084v25a2.083 2.083 0 0 0 2.083 2.083h33.334a2.083 2.083 0 0 0 2.083-2.083" />
                                                        <path stroke="#344054" d="M22.917 29.167H18a8.33 8.33 0 0 1-7.583-5.042l-3.792-8.646a2.08 2.08 0 0 1 1.708-.896h33.334a2.08 2.08 0 0 1 1.708.896l-3.792 8.646A8.33 8.33 0 0 1 32 29.167h-4.917" />
                                                        <path stroke="#306cfe" d="M27.083 27.083h-4.166v4.167h4.166z" />
                                                    </g>
                                                </svg>
                                            </span>
                                            <input
                                                id="profession"
                                                type="text"
                                                placeholder={user.profession}
                                                className="w-full outline-none text-gray-200 bg-transparent placeholder-gray-500 text-base"
                                                value={formData.profession}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-between">
                                    <div className="space-y-2 w-[48%]">
                                        <div className="flex justify-between items-center">
                                            <label htmlFor="username" className="text-md ml-3 block">
                                                Username
                                            </label>

                                        </div>
                                        <div className={`flex items-center rounded-2xl px-4 py-3 border border-gray-600 transition-all duration-300  bg-black/50`}>
                                            <span className="mr-3">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 14 14">
                                                    <g fill="none">
                                                        <path stroke="#4147d5" d="M13.5 10.5v2a1 1 0 0 1-1 1h-2m0-13h2a1 1 0 0 1 1 1v2m-13 0v-2a1 1 0 0 1 1-1h2m0 13h-2a1 1 0 0 1-1-1v-2" />
                                                        <path fill="#d7e0ff" d="M7 6.5a2 2 0 1 0 0-4a2 2 0 0 0 0 4m3.803 4.5a3.994 3.994 0 0 0-7.606 0z" />
                                                    </g>
                                                </svg>
                                            </span>
                                            <input
                                                id="username"
                                                type="text"
                                                placeholder={user.username}
                                                className="w-full outline-none text-gray-200 bg-transparent placeholder-gray-500 text-base"
                                                value={formData.username}
                                                onChange={handleChange}

                                            />
                                        </div>

                                    </div>

                                    <div className="space-y-2 w-[48%]">


                                        <div className="flex justify-between items-center">
                                            <label htmlFor="about" className="text-md ml-3 block">
                                                About                                        </label>

                                        </div>
                                        <div className={`flex items-center rounded-2xl px-4 py-3 border border-gray-600 transition-all duration-300  bg-black/50`}>
                                            <span className="mr-3">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 14 14">
                                                    <g fill="none">
                                                        <path stroke="#4147d5" d="M13.5 10.5v2a1 1 0 0 1-1 1h-2m0-13h2a1 1 0 0 1 1 1v2m-13 0v-2a1 1 0 0 1 1-1h2m0 13h-2a1 1 0 0 1-1-1v-2" />
                                                        <path fill="#d7e0ff" d="M7 6.5a2 2 0 1 0 0-4a2 2 0 0 0 0 4m3.803 4.5a3.994 3.994 0 0 0-7.606 0z" />
                                                    </g>
                                                </svg>
                                            </span>
                                            <textarea
                                                id="about"
                                                placeholder={user.about}
                                                className="w-full outline-none text-gray-200 bg-transparent placeholder-gray-500 text-base"
                                                value={formData.about}
                                                onChange={handleChange}

                                            />
                                        </div>

                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className={`${errorisOpen ? "block" : "hidden "} flex items-center rounded-2xl px-4 py-3 border border-red-600 bg-red/50  transition-all duration-30 `} >
                                        <span className="mr-3">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#FF6F6F" d="M12 20c-4.41 0-8-3.59-8-8s3.59-8 8-8s8 3.59 8 8s-3.59 8-8 8m0-18C6.47 2 2 6.47 2 12s4.47 10 10 10s10-4.47 10-10S17.53 2 12 2m2.59 6L12 10.59L9.41 8L8 9.41L10.59 12L8 14.59L9.41 16L12 13.41L14.59 16L16 14.59L13.41 12L16 9.41z" /></svg>
                                        </span>
                                        <div className="text-red-500 ml-2">
                                            {newError}
                                        </div>
                                    </div>
                                </div>
                                <button type="submit" className="group relative  w-[100%] p-4 mt-4 rounded-xl text-xl font-medium bg-gray-800/40 border-[2px] border-gray-700/50 hover:bg-gray-800/60 transition-all duration-300 overflow-hidden text-white">
                                    Save Your Changes
                                    <div className="absolute inset-x-0 bottom-0 h-[2px] w-full bg-gradient-to-r from-transparent via-blue-500"></div>
                                    <div className="absolute inset-x-0 bottom-0 h-[2px] w-[50%] mx-auto bg-gradient-to-r from-transparent via-cyan-400"></div>
                                    <div className="absolute inset-x-0 bottom-0 h-[1px] w-[50%] mx-auto cursor-pointer group-hover:h-[4px] group-hover:blur-sm transition-all duration-300 bg-gradient-to-r from-transparent via-sky-400"></div>
                                </button>
                            </form>
                        </div>

                    </div>

                    <div className={`w-full lg:w-[70%] rounded-3xl p-8 bg-black/30 border border-white/10 ${showPanel ? 'flex' : 'hidden'} flex-col gap-6 `}></div>
                </div>
            </div>
        </div >
    );
};

export default EditProfile;
