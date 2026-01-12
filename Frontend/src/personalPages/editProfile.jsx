import React from "react";
import { useSelector } from "react-redux";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from "../Pages/auth/baseURL";

const EditProfile = () => {

    const [newError, setNewError] = useState(false);
    const [errorisOpen, errorsetIsOpen] = useState(false);
    const [showPanel, setShowPanel] = useState(false);
    const [showSkillModalPanel, setShowSkillModalPanel] = useState(false);




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
        about: '',

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

            <div className="w-full max-w-9xl p-4 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 flex flex-col gap-4">

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


                </div>

                {/* ================= CONTENT ================= */}
                <div className="w-full flex flex-col lg:flex-row gap-3">

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

                        {/* Username */}
                        <p className="text-base text-gray-400 mt-1">
                            @{user?.username || "username"}
                        </p>




                        {/* Divider */}
                        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent my-6"></div>

                        {/* Info Pills */}
                        <div className="w-full flex flex-col gap-3">

                            <div className="flex justify-evenly items-center gap-3 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-gray-300">
                                <div className="flex justify-center items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24"><g fill="none"><path fill="#66e1ff" d="M21.087 3.87H2.913V23h18.174z" /><path fill="#c2f3ff" d="M19.89 3.87H2.914v16.978z" /><path stroke="#7a7a7a" stroke-linecap="round" stroke-linejoin="round" d="M1 23h22M21.087 3.87H2.913V23h18.174zM1 3.87h22" stroke-width="1" /><path fill="#b2b2b2" stroke="#7a7a7a" stroke-linecap="round" stroke-linejoin="round" d="M20.13 3.87V1.957A.956.956 0 0 0 19.174 1H4.826a.957.957 0 0 0-.956.957V3.87z" stroke-width="1" /><path fill="#fff" stroke="#7a7a7a" stroke-linecap="round" stroke-linejoin="round" d="M10.565 23v-3.348a1.435 1.435 0 0 1 2.87 0V23z" stroke-width="1" /><path stroke="#7a7a7a" stroke-linecap="round" stroke-linejoin="round" d="M5.782 19.174h2.87m6.696 0h2.87M5.782 15.348h3.826m4.782 0h3.827M5.782 11.522h3.826m4.782 0h3.827M5.782 7.696h3.826m4.782 0h3.827" stroke-width="1" /></g></svg> <span>{user?.college || "College Name"}</span></div>
                                <div className="flex justify-center items-center gap-2">  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><g fill="none"><path fill="url(#SVGPusuadEO)" d="M17.754 14a2.25 2.25 0 0 1 2.249 2.249v.918a2.75 2.75 0 0 1-.513 1.6C17.945 20.93 15.42 22 12 22s-5.944-1.072-7.486-3.236a2.75 2.75 0 0 1-.51-1.596v-.92A2.25 2.25 0 0 1 6.251 14z" /><path fill="url(#SVG2f7L8cLU)" d="M17.754 14a2.25 2.25 0 0 1 2.249 2.249v.918a2.75 2.75 0 0 1-.513 1.6C17.945 20.93 15.42 22 12 22s-5.944-1.072-7.486-3.236a2.75 2.75 0 0 1-.51-1.596v-.92A2.25 2.25 0 0 1 6.251 14z" /><path fill="url(#SVG9AhnabtW)" d="M12 2.005a5 5 0 1 1 0 10a5 5 0 0 1 0-10" /><defs><linearGradient id="SVGPusuadEO" x1="7.808" x2="10.394" y1="15.064" y2="23.319" gradientUnits="userSpaceOnUse"><stop offset=".125" stop-color="#00c6ff" /><stop offset="1" stop-color="#41d1dc" /></linearGradient><linearGradient id="SVG2f7L8cLU" x1="12.003" x2="15.623" y1="13.047" y2="26.573" gradientUnits="userSpaceOnUse"><stop stop-color="#5edadb" stop-opacity="0" /><stop offset="1" stop-color="#62f8ef" /></linearGradient><linearGradient id="SVG9AhnabtW" x1="9.379" x2="14.475" y1="3.334" y2="11.472" gradientUnits="userSpaceOnUse"><stop offset=".125" stop-color="#00c6ff" /><stop offset="1" stop-color="#41d1dc" /></linearGradient></defs></g></svg>  <span>{user?.profession || "Profession"}</span></div>
                            </div>
                            <div className="flex justify-evenly items-center gap-3 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-gray-300">
                                <div className="flex justify-center items-center gap-2">  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><g fill="none"><path fill="#ff808c" d="M12.95 13.891a3.816 3.816 0 1 0 0-7.632a3.816 3.816 0 0 0 0 7.632" /><path fill="#66e1ff" d="M7.21 15.826a3.815 3.815 0 1 0 0-7.63a3.815 3.815 0 0 0 0 7.63" /><path stroke="#7a7a7a" stroke-linecap="round" stroke-linejoin="round" d="M9.61 14.146a5.26 5.26 0 1 1 3.826 1.18" stroke-width="1" /><path stroke="#7a7a7a" stroke-linecap="round" stroke-linejoin="round" d="M10.578 7.952A5.26 5.26 0 1 1 6.74 6.76m10.043-.5L22.044 1m0 3.826V1h-3.826M6.74 17.26V23m-1.913-1.913h3.826" stroke-width="1" /></g></svg> <span>{user?.gender || "Gender"}</span></div>
                                <div className="flex justify-center items-center gap-2">  <svg width="25" height="25" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M20 1C20 0.447715 20.4477 0 21 0C21.5523 0 22 0.447715 22 1V2H23C23.5523 2 24 2.44772 24 3C24 3.55228 23.5523 4 23 4H22V5C22 5.55228 21.5523 6 21 6C20.4477 6 20 5.55228 20 5V4H19C18.4477 4 18 3.55228 18 3C18 2.44772 18.4477 2 19 2H20V1Z" fill="#ff808c" />
                                    <path d="M21.1936 8.07463C21.7016 7.85776 22.297 8.09138 22.4668 8.6169C23.145 10.7148 23.1792 12.9766 22.5523 15.1064C21.8308 17.5572 20.2788 19.6804 18.1626 21.1117C16.0464 22.5429 13.498 23.193 10.9548 22.9502C8.41165 22.7075 6.03225 21.5871 4.22503 19.7814C2.4178 17.9757 1.29545 15.5972 1.05062 13.0542C0.805783 10.5112 1.45373 7.96227 2.88325 5.84491C4.31277 3.72755 6.43471 2.17379 8.88488 1.4503C11.0142 0.821568 13.2759 0.853957 15.3744 1.53036C15.9001 1.69979 16.1342 2.29501 15.9178 2.80311C15.7013 3.31122 15.1136 3.54496 14.5846 3.38623C12.9184 2.88626 11.1353 2.8783 9.4532 3.37498C7.45003 3.96647 5.71522 5.23677 4.5465 6.96784C3.37778 8.69891 2.84804 10.7828 3.04821 12.8619C3.24838 14.9409 4.16596 16.8855 5.64348 18.3618C7.121 19.8381 9.06631 20.754 11.1455 20.9525C13.2247 21.1509 15.3082 20.6195 17.0383 19.4493C18.7684 18.2792 20.0373 16.5433 20.6271 14.5397C21.1224 12.8572 21.113 11.074 20.6116 9.40826C20.4525 8.87941 20.6857 8.29149 21.1936 8.07463Z" fill="#66e1ff" />
                                    <path d="M7.71054 9.14472L7.29441 9.35279C6.69971 9.65014 5.99999 9.21769 5.99999 8.55279C5.99999 8.214 6.1914 7.9043 6.49441 7.75279L7.78884 7.10557C7.9277 7.03615 8.08081 7 8.23605 7H8.99999C9.55227 7 9.99999 7.44772 9.99999 8V16C9.99999 16.5523 9.55227 17 8.99999 17C8.4477 17 7.99999 16.5523 7.99999 16V9.32361C7.99999 9.17493 7.84352 9.07823 7.71054 9.14472Z" fill="#66e1ff" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M16 7C17.1046 7 18 7.89543 18 9V15C18 16.1046 17.1046 17 16 17H14C12.8954 17 12 16.1046 12 15V9C12 7.89543 12.8954 7 14 7H16ZM15 9C15.5523 9 16 9.44772 16 10V14C16 14.5523 15.5523 15 15 15C14.4477 15 14 14.5523 14 14V10C14 9.44772 14.4477 9 15 9Z" fill="#66e1ff" />
                                </svg> Age : <span>{user?.age || "Age"}</span></div>
                            </div>

                            <div className="flex flex-col gap-1 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-gray-300">
                                <div className="flex gap-1 font-bold text-xl"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path fill="#5decff" d="M12 21.577L9.423 19H5.615q-.69 0-1.153-.462T4 17.384V4.616q0-.691.463-1.153T5.616 3h12.769q.69 0 1.153.463T20 4.616v12.769q0 .69-.462 1.153T18.384 19h-3.807zm0-9.5q1.258 0 2.129-.871T15 9.077t-.871-2.129T12 6.077t-2.129.871T9 9.077t.871 2.129t2.129.871M5.423 18h13.154q.211-.133.288-.354t.135-.412q-1.35-1.325-3.138-2.087T12 14.385t-3.863.762T5 17.235q.058.19.134.411t.289.354" /></svg>  About :</div>  {user.about}
                            </div>
                            <div className="flex flex-col gap-1 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-gray-300">
                                <div className="flex gap-1 font-bold text-xl"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 28 28"><path fill="#5decff" d="M13 20.5c0 2.098.862 3.995 2.25 5.357q-1.077.142-2.25.143c-5.79 0-10-2.567-10-6.285V19a3 3 0 0 1 3-3h8.5a7.47 7.47 0 0 0-1.5 4.5M13 2a6 6 0 1 1 0 12a6 6 0 0 1 0-12m14 18.5a6.5 6.5 0 1 1-13 0a6.5 6.5 0 0 1 13 0m-5.786-3.96a.742.742 0 0 0-1.428 0l-.716 2.298h-2.318c-.727 0-1.03.97-.441 1.416l1.875 1.42l-.716 2.298c-.225.721.567 1.32 1.155.875l1.875-1.42l1.875 1.42c.588.446 1.38-.154 1.155-.875l-.716-2.298l1.875-1.42c.588-.445.286-1.416-.441-1.416H21.93z" /></svg> Tech Stacks:</div>  {user.skills.join(" , ")}
                            </div>
                            <div className="flex flex-col gap-1 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-gray-300">
                                <div className="flex gap-1 font-bold text-xl"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24"><g fill="none" stroke="#5decff" stroke-miterlimit="10" stroke-width="1"><path fill="#5decff" fill-opacity="0.16" d="M18.6 3H5.4A2.4 2.4 0 0 0 3 5.4v13.2A2.4 2.4 0 0 0 5.4 21h13.2a2.4 2.4 0 0 0 2.4-2.4V5.4A2.4 2.4 0 0 0 18.6 3Z" /><path stroke-linecap="round" stroke-linejoin="round" d="M10 21V3m-7 7h18M5.4 3h13.2A2.4 2.4 0 0 1 21 5.4v13.2a2.4 2.4 0 0 1-2.4 2.4H5.4A2.4 2.4 0 0 1 3 18.6V5.4A2.4 2.4 0 0 1 5.4 3" /></g></svg>  Projects :</div>  this segment used when second segment start showing his AURA !!
                            </div>

                        </div>
                    </div>

                    {/* ========== RIGHT PANEL ========== */}
                    <div className={`w-full lg:w-[70%] rounded-3xl p-8 bg-black/30 border border-white/10 ${showPanel ? 'hidden' : 'flex'} flex-col gap-1 `}>

                        <div className="flex w-full justify-between mb-6">
                            <button className="group relative w-[48%] max-w-md p-4 mt-4 rounded-xl text-xl font-bold bg-gray-800/40 border-[2px] border-gray-700/50 hover:bg-gray-800/60 transition-all duration-300 overflow-hidden text-white" onClick={() => setShowPanel(false)}>
                                Profile Edits
                                <div className="absolute inset-x-0 bottom-0 h-[2px] w-full bg-gradient-to-r from-transparent via-indigo-500"></div>
                                <div className="absolute inset-x-0 bottom-0 h-[2px] w-[50%] mx-auto bg-gradient-to-r from-transparent via-violet-500"></div>
                                <div className="absolute inset-x-0 bottom-0 h-[1px] w-[50%] mx-auto cursor-pointer group-hover:h-[4px] group-hover:blur-sm transition-all duration-300 bg-gradient-to-r from-transparent via-purple-400"></div>
                            </button>
                            <button className="group relative w-[48%] max-w-md p-4 mt-4 rounded-xl text-xl font-bold bg-gray-800/40 border-[2px] border-gray-700/50 hover:bg-gray-800/60 transition-all duration-300 overflow-hidden text-white" onClick={() => setShowPanel(true)}>
                                Skils and Project Edits
                                <div className="absolute inset-x-0 bottom-0 h-[2px] w-full bg-gradient-to-r from-transparent via-indigo-500"></div>
                                <div className="absolute inset-x-0 bottom-0 h-[2px] w-[50%] mx-auto bg-gradient-to-r from-transparent via-violet-500"></div>
                                <div className="absolute inset-x-0 bottom-0 h-[1px] w-[50%] mx-auto cursor-pointer group-hover:h-[4px] group-hover:blur-sm transition-all duration-300 bg-gradient-to-r from-transparent via-purple-400"></div>
                            </button>
                        </div>
                        <div className="mb-3">
                            <h2 className="text-2xl font-semibold text-white">
                                Profile Information
                            </h2>

                            <p className="text-gray-400">
                                Update your personal details below only fill that feilds which u want to edit !!
                            </p>
                        </div>


                        {/* Inputs go here */}
                        <div className="h-full p-5 border border-dashed border-white/20 rounded-xl flex  justify-center text-gray-500">
                            <form action="" onSubmit={handleUpdate} className="flex flex-col gap-2 w-full mt-2">
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

                    <div className={`w-full lg:w-[70%] rounded-3xl p-8 bg-black/30 border border-white/10 ${showPanel ? 'flex' : 'hidden'} flex-col gap-6 `}>
                        <div className="flex w-full justify-between mb-6">
                            <button className="group relative w-[48%] max-w-md p-4 mt-4 rounded-xl text-xl font-bold bg-gray-800/40 border-[2px] border-gray-700/50 hover:bg-gray-800/60 transition-all duration-300 overflow-hidden text-white" onClick={() => setShowPanel(false)}>
                                Profile Edits+
                                <div className="absolute inset-x-0 bottom-0 h-[2px] w-full bg-gradient-to-r from-transparent via-indigo-500"></div>
                                <div className="absolute inset-x-0 bottom-0 h-[2px] w-[50%] mx-auto bg-gradient-to-r from-transparent via-violet-500"></div>
                                <div className="absolute inset-x-0 bottom-0 h-[1px] w-[50%] mx-auto cursor-pointer group-hover:h-[4px] group-hover:blur-sm transition-all duration-300 bg-gradient-to-r from-transparent via-purple-400"></div>
                            </button>
                            <button className="group relative w-[48%] max-w-md p-4 mt-4 rounded-xl text-xl font-bold bg-gray-800/40 border-[2px] border-gray-700/50 hover:bg-gray-800/60 transition-all duration-300 overflow-hidden text-white" onClick={() => setShowPanel(true)}>
                                Skils and Project Edits
                                <div className="absolute inset-x-0 bottom-0 h-[2px] w-full bg-gradient-to-r from-transparent via-indigo-500"></div>
                                <div className="absolute inset-x-0 bottom-0 h-[2px] w-[50%] mx-auto bg-gradient-to-r from-transparent via-violet-500"></div>
                                <div className="absolute inset-x-0 bottom-0 h-[1px] w-[50%] mx-auto cursor-pointer group-hover:h-[4px] group-hover:blur-sm transition-all duration-300 bg-gradient-to-r from-transparent via-purple-400"></div>
                            </button>
                        </div>
                        <div className="mb-3">
                            <h2 className="text-4xl font-semibold text-white mb-5">
                                Skills & Project Information
                            </h2>

                            <div className="h-full p-5 border border-dashed border-white/20 rounded-xl flex   text-gray-500 flex-col ">

                                <div className="flex justify-between pr-3 pl-3">
                                    <h2 className="text-3xl font-semibold text-white mb-3">
                                        Tech Stacks
                                    </h2>
                                    <div onClick={() => setShowSkillModalPanel(true)} className=" border h-[35px] w-[35px] rounded-full flex justify-center items-center border-transparent hover:bg-slate-800"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path fill="#fff" fill-rule="evenodd" d="M11.25 11.25V3.5h1.5v7.75h7.75v1.5h-7.75v7.75h-1.5v-7.75H3.5v-1.5z" /></svg></div>

                                </div>


                                <div className="w-full max-w-9xl p-4 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 flex flex-col gap-4 text-white">
                                    {user.skills.map((item, i) => (
                                        <div key={i}>#{i + 1} {item} </div>
                                    ))}
                                </div>



                            </div>

                        </div>
                    </div>
                </div>
            </div >
            <div className={`fixed inset-0 bg-black/60 z-50 items-center justify-center ${showSkillModalPanel ? "flex" : "hidden"}`}>


                <div className="w-[70%] max-w-9xl p-4 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 flex flex-col  text-white">
                    <div className="flex justify-between mb-5">
                        <div>
                            <h2 className="text-3xl font-semibold text-white ">
                                Add tech stacks
                            </h2>
                            <h2 className="text-lg pl-1 text-gray-400 ">
                                That you've mastered & let the world see what you're capable of
                            </h2>
                        </div>

                        <div onClick={() => setShowSkillModalPanel(false)} className=" border h-[40px] w-[40px] rounded-full flex justify-center items-center border-transparent hover:bg-slate-800"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 48 48"><path fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.2" d="m8 8l32 32M8 40L40 8" /></svg></div>
                    </div>
                    <div className="space-y-2 ">
                        <label htmlFor="skill" className="text-md ml-3 block">
                            Tech Stacks <span className="text-orange-700 ml-1">*</span>
                        </label>
                        <div className={"flex items-center rounded-2xl px-4 py-3 border border-gray-600 transition-all duration-300  bg-black/50"}>
                            <span className="mr-3">
                                <svg xmlns="http://www.w3.org/2000/svg" width="35" height="30" viewBox="0 0 512 512"><path fill="#00e8f4" d="M119.1 25v.1c-25 3.2-47.1 32-47.1 68.8c0 20.4 7.1 38.4 17.5 50.9L99.7 157L84 159.9c-13.7 2.6-23.8 9.9-32.2 21.5c-8.5 11.5-14.9 27.5-19.4 45.8c-8.2 33.6-9.9 74.7-10.1 110.5h44l11.9 158.4h96.3L185 337.7h41.9c0-36.2-.3-77.8-7.8-111.7c-4-18.5-10.2-34.4-18.7-45.9c-8.6-11.4-19.2-18.7-34.5-21l-16-2.5L160 144c10-12.5 16.7-30.2 16.7-50.1c0-39.2-24.8-68.8-52.4-68.8c-2.9 0-4.7-.1-5.2-.1M440 33c-17.2 0-31 13.77-31 31s13.8 31 31 31s31-13.77 31-31s-13.8-31-31-31M311 55v48H208v18h103v158h-55v18h55v110H208v18h103v32h80.8c-.5-2.9-.8-5.9-.8-9s.3-6.1.8-9H329V297h62.8c-.5-2.9-.8-5.9-.8-9s.3-6.1.8-9H329V73h62.8c-.5-2.92-.8-5.93-.8-9s.3-6.08.8-9zm129 202c-17.2 0-31 13.8-31 31s13.8 31 31 31s31-13.8 31-31s-13.8-31-31-31m0 160c-17.2 0-31 13.8-31 31s13.8 31 31 31s31-13.8 31-31s-13.8-31-31-31" /></svg>
                            </span>
                            <input
                                id="skill"
                                type="text"
                                placeholder="Skill (ex : React JS)"
                                className="w-full outline-none text-gray-200 bg-transparent placeholder-gray-500 text-base"
                                value={formData['FirstName']}
                                onChange={handleChange}

                            />
                        </div>
                    </div>
                </div>

            </div>


        </div >
    );
};

export default EditProfile;
