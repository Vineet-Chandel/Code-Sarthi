import React from "react";
import { useSelector } from "react-redux";
import { useState, useEffect } from 'react';
import axios from 'axios';
import BASE_URL from "../Pages/auth/baseURL";

import { MdEdit } from "react-icons/md";


const EditProfile = () => {

    const [newError, setNewError] = useState(false);
    const [errorisOpen, errorsetIsOpen] = useState(false);
    const [editProfileIMG, editProfileIMGisOpen] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [hoveringImg, setHoveringImg] = useState(false);
    const user = useSelector(store => store.user.user.DATA);
    const [formData, setFormData] = useState({
        firstName: '',
        middleName: '',
        lastName: '',
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
        if (Object.keys(updatedData).length === 0) return;
        try {


            const res = await axios.patch(

                `${BASE_URL}/profile/me/edit`,
                updatedData,
                { withCredentials: true }

            );

            // ✅ reload AFTER success
            window.location.reload();
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
    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();

        // ⭐ must match backend multer field
        formData.append("profilePic", file);

        try {
            setUploading(true);

            await axios.post(
                `${BASE_URL}/profile-pic/upload`,
                formData,
                { withCredentials: true }
            );

            window.location.reload();
            editProfileIMGisOpen(false);
        } catch (err) {
            console.log(err);
        } finally {
            setUploading(false);
        }
    };
    return (
        <div className=" w-screen min-h-screen bg-bg-100 flex justify-center items-start px-10 py-3 overflow-y-auto">

            <div className=" w-full  max-w-[1600px] relative mx-auto p-6 md:p-8 rounded-[32px] bg-base-100 border border-secondary border-[3px] flex flex-col gap-6">
                <div className="pointer-events-none absolute inset-0 rounded-[32px] bg-[radial-gradient`(circle_at_30%_20%,rgba(0,255,255,0.08),transparent_60%)]"></div>
                {/* ================= HEADER ================= */}
                <div className="w-full flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">

                    <div>
                        <h1 className="text-5xl font-extrabold     bg-gradient-to-b from-[#5a2c01ff] to-accent bg-clip-text  bg-clip-text text-transparent flex items-center gap-3">
                            Edit Main Profile <svg xmlns="http://www.w3.org/2000/svg" width={50} height={50} viewBox="0 0 32 32">
                                <g fill="none">
                                    <path fill="url(#SVGo93bJbVN)" d="M4.356 20.729L19.69 5.396l6.914 6.914L11.27 27.643l-5.579-1.336z"></path>
                                    <path fill="url(#SVGIWCkBdHO)" d="m4.357 20.73l.497-.5s.275 2.396 2.397 4.518s4.517 2.397 4.517 2.397l-.497.498a3.7 3.7 0 0 1-1.841 1.002l-6.22 1.333a1 1 0 0 1-1.188-1.187l1.333-6.221a3.7 3.7 0 0 1 1.002-1.84"></path>
                                    <path fill="url(#SVGeBihyeOm)" d="M21.65 3.434a4.89 4.89 0 0 1 6.915 6.914l-3.73 3.73l-6.914-6.915z"></path>
                                    <path fill="url(#SVGipvmcbPb)" d="m24.32 14.593l2.83-2.83s-2.398-.278-4.517-2.397c-2.12-2.12-2.397-4.518-2.397-4.518l-2.83 2.83s.276 2.4 2.396 4.519s4.518 2.396 4.518 2.396"></path>
                                    <defs>
                                        <linearGradient id="SVGo93bJbVN" x1={17.289} x2={20.469} y1={11.417} y2={19.854} gradientUnits="userSpaceOnUse">
                                            <stop stopColor="#ffa43d"></stop>
                                            <stop offset={1} stopColor="#fb5937"></stop>
                                        </linearGradient>
                                        <linearGradient id="SVGIWCkBdHO" x1={0.094} x2={7.473} y1={23.098} y2={30.333} gradientUnits="userSpaceOnUse">
                                            <stop offset={0.255} stopColor="#ffd394"></stop>
                                            <stop offset={1} stopColor="#ff921f"></stop>
                                        </linearGradient>
                                        <linearGradient id="SVGeBihyeOm" x1={27.449} x2={23.03} y1={4.494} y2={8.717} gradientUnits="userSpaceOnUse">
                                            <stop stopColor="#f97dbd"></stop>
                                            <stop offset={1} stopColor="#dd3ce2"></stop>
                                        </linearGradient>
                                        <linearGradient id="SVGipvmcbPb" x1={22.46} x2={15.56} y1={11.523} y2={8.595} gradientUnits="userSpaceOnUse">
                                            <stop stopColor="#ff921f"></stop>
                                            <stop offset={1} stopColor="#ffe994"></stop>
                                        </linearGradient>
                                    </defs>
                                </g>
                            </svg>
                        </h1>
                        <p className="text-lg text-accent mt-2">
                            Your profile is your first impression — make it unforgettable ✨
                        </p>
                    </div>


                </div>

                {/* ================= CONTENT ================= */}
                <div className="w-full flex flex-col lg:flex-row gap-3">

                    {/* ========== ProfilePreview Panel ========== */}
                    <div className="w-full lg:w-[30%] rounded-2xl p-6 bg-base-300 border border-secondary border-[2px] flex flex-col items-center">
                        {/* Avatar */}
                        <div className="relative w-[180px] h-[180px] rounded-2xl bg-gray-900 border border-gray-700 flex items-center justify-center " onClick={() => editProfileIMGisOpen(true)} onMouseEnter={() => setHoveringImg(true)} onMouseLeave={() => setHoveringImg(false)}>
                            <div className="absolute inset-0 rounded-2xl "></div>
                            <span className="relative text-5xl rounded-2xl font-bold text-cyan-400 ">
                                <div
                                    className={`absolute inset-0 rounded-2xl bg-black/60 flex justify-center items-center transition-all duration-300 ease-out ${hoveringImg ? "opacity-100 scale-100" : "opacity-0 scale-95"}
`}
                                >
                                    <MdEdit className="text-white" size={35} />
                                </div>

                                <img src={user?.photoUrl?.url} className="h-full rounded-2xl w-full object-cover transition-transform duration-500 group-hover:scale-110 border border-secondary border-[2px]" alt="" />
                            </span>
                        </div>
                        {/* Name */}
                        <p className="text-3xl font-semibold text-accent mt-5 tracking-wide text-center">
                            {user?.firstName || "First"} {user?.middleName || ""} {user?.lastName || "Last"}
                        </p>
                        {/* Username */}
                        <p className="text-base text-gray-800 mt-1">
                            @{user?.username || "username"}
                        </p>
                        {/* Divider */}
                        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent my-6"></div>

                        {/* Info Pills */}
                        <div className="w-full flex flex-col gap-3">

                            <div className="flex justify-evenly items-center gap-3 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-gray-300">
                                <div className="flex justify-center items-center gap-2 text-accent">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24"><g fill="none"><path fill="#ff8904" d="M21.087 3.87H2.913V23h18.174z" /><path fill="#ff8904" d="M19.89 3.87H2.914v16.978z" /><path stroke="#301a01ff" stroke-linecap="round" stroke-linejoin="round" d="M1 23h22M21.087 3.87H2.913V23h18.174zM1 3.87h22" stroke-width="1" /><path fill="#301a01ff" stroke="#301a01ff" stroke-linecap="round" stroke-linejoin="round" d="M20.13 3.87V1.957A.956.956 0 0 0 19.174 1H4.826a.957.957 0 0 0-.956.957V3.87z" stroke-width="1" /><path fill="#301a01ff" stroke="#301a01ff" stroke-linecap="round" stroke-linejoin="round" d="M10.565 23v-3.348a1.435 1.435 0 0 1 2.87 0V23z" stroke-width="1" /><path stroke="#301a01ff" stroke-linecap="round" stroke-linejoin="round" d="M5.782 19.174h2.87m6.696 0h2.87M5.782 15.348h3.826m4.782 0h3.827M5.782 11.522h3.826m4.782 0h3.827M5.782 7.696h3.826m4.782 0h3.827" stroke-width="1" /></g></svg>

                                    <span>{user?.college || "College Name"}</span></div>

                                <div className="flex justify-center items-center gap-2 text-accent">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><g fill="none"><path fill="#5b3305ff" d="M17.754 14a2.25 2.25 0 0 1 2.249 2.249v.918a2.75 2.75 0 0 1-.513 1.6C17.945 20.93 15.42 22 12 22s-5.944-1.072-7.486-3.236a2.75 2.75 0 0 1-.51-1.596v-.92A2.25 2.25 0 0 1 6.251 14z" /><path fill="#ff8904" d="M17.754 14a2.25 2.25 0 0 1 2.249 2.249v.918a2.75 2.75 0 0 1-.513 1.6C17.945 20.93 15.42 22 12 22s-5.944-1.072-7.486-3.236a2.75 2.75 0 0 1-.51-1.596v-.92A2.25 2.25 0 0 1 6.251 14z" /><path fill="#ff8904" d="M12 2.005a5 5 0 1 1 0 10a5 5 0 0 1 0-10" /><defs><linearGradient id="SVGPusuadEO" x1="7.808" x2="10.394" y1="15.064" y2="23.319" gradientUnits="userSpaceOnUse"><stop offset=".125" stop-color="#00c6ff" /><stop offset="1" stop-color="#41d1dc" /></linearGradient><linearGradient id="SVG2f7L8cLU" x1="12.003" x2="15.623" y1="13.047" y2="26.573" gradientUnits="userSpaceOnUse"><stop stop-color="#5edadb" stop-opacity="0" /><stop offset="1" stop-color="#62f8ef" /></linearGradient><linearGradient id="SVG9AhnabtW" x1="9.379" x2="14.475" y1="3.334" y2="11.472" gradientUnits="userSpaceOnUse"><stop offset=".125" stop-color="#00c6ff" /><stop offset="1" stop-color="#41d1dc" /></linearGradient></defs></g></svg>

                                    <span>{user?.profession || "Profession"}</span></div>

                            </div>
                            <div className="flex justify-evenly items-center gap-3 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-gray-300">
                                <div className="flex justify-center items-center gap-2 text-secondary">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><g fill="none"><path fill="#5a2c01ff" d="M12.95 13.891a3.816 3.816 0 1 0 0-7.632a3.816 3.816 0 0 0 0 7.632" /><path fill="#4a2a05ff" d="M7.21 15.826a3.815 3.815 0 1 0 0-7.63a3.815 3.815 0 0 0 0 7.63" /><path stroke="#7a7a7a" stroke-linecap="round" stroke-linejoin="round" d="M9.61 14.146a5.26 5.26 0 1 1 3.826 1.18" stroke-width="1" /><path stroke="#7a7a7a" stroke-linecap="round" stroke-linejoin="round" d="M10.578 7.952A5.26 5.26 0 1 1 6.74 6.76m10.043-.5L22.044 1m0 3.826V1h-3.826M6.74 17.26V23m-1.913-1.913h3.826" stroke-width="1" /></g></svg>
                                    Gender :<span className="text-accent">{user?.gender || "Gender"}</span></div>
                                <div className="flex justify-center items-center gap-2 text-secondary">
                                    <svg width="25" height="25" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M20 1C20 0.447715 20.4477 0 21 0C21.5523 0 22 0.447715 22 1V2H23C23.5523 2 24 2.44772 24 3C24 3.55228 23.5523 4 23 4H22V5C22 5.55228 21.5523 6 21 6C20.4477 6 20 5.55228 20 5V4H19C18.4477 4 18 3.55228 18 3C18 2.44772 18.4477 2 19 2H20V1Z" fill="#ff808c" />
                                        <path d="M21.1936 8.07463C21.7016 7.85776 22.297 8.09138 22.4668 8.6169C23.145 10.7148 23.1792 12.9766 22.5523 15.1064C21.8308 17.5572 20.2788 19.6804 18.1626 21.1117C16.0464 22.5429 13.498 23.193 10.9548 22.9502C8.41165 22.7075 6.03225 21.5871 4.22503 19.7814C2.4178 17.9757 1.29545 15.5972 1.05062 13.0542C0.805783 10.5112 1.45373 7.96227 2.88325 5.84491C4.31277 3.72755 6.43471 2.17379 8.88488 1.4503C11.0142 0.821568 13.2759 0.853957 15.3744 1.53036C15.9001 1.69979 16.1342 2.29501 15.9178 2.80311C15.7013 3.31122 15.1136 3.54496 14.5846 3.38623C12.9184 2.88626 11.1353 2.8783 9.4532 3.37498C7.45003 3.96647 5.71522 5.23677 4.5465 6.96784C3.37778 8.69891 2.84804 10.7828 3.04821 12.8619C3.24838 14.9409 4.16596 16.8855 5.64348 18.3618C7.121 19.8381 9.06631 20.754 11.1455 20.9525C13.2247 21.1509 15.3082 20.6195 17.0383 19.4493C18.7684 18.2792 20.0373 16.5433 20.6271 14.5397C21.1224 12.8572 21.113 11.074 20.6116 9.40826C20.4525 8.87941 20.6857 8.29149 21.1936 8.07463Z" fill="#5a2c01ff" />
                                        <path d="M7.71054 9.14472L7.29441 9.35279C6.69971 9.65014 5.99999 9.21769 5.99999 8.55279C5.99999 8.214 6.1914 7.9043 6.49441 7.75279L7.78884 7.10557C7.9277 7.03615 8.08081 7 8.23605 7H8.99999C9.55227 7 9.99999 7.44772 9.99999 8V16C9.99999 16.5523 9.55227 17 8.99999 17C8.4477 17 7.99999 16.5523 7.99999 16V9.32361C7.99999 9.17493 7.84352 9.07823 7.71054 9.14472Z" fill="#5a2c01ff" />
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M16 7C17.1046 7 18 7.89543 18 9V15C18 16.1046 17.1046 17 16 17H14C12.8954 17 12 16.1046 12 15V9C12 7.89543 12.8954 7 14 7H16ZM15 9C15.5523 9 16 9.44772 16 10V14C16 14.5523 15.5523 15 15 15C14.4477 15 14 14.5523 14 14V10C14 9.44772 14.4477 9 15 9Z" fill="#5a2c01ff" />
                                    </svg> Age : <span className="text-accent">{user?.age || "Age"}</span></div>
                            </div>

                            <div className="flex flex-col gap-1 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-secondary">
                                <div className="flex gap-1 font-bold text-xl"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path fill="#5a2c01ff" d="M12 21.577L9.423 19H5.615q-.69 0-1.153-.462T4 17.384V4.616q0-.691.463-1.153T5.616 3h12.769q.69 0 1.153.463T20 4.616v12.769q0 .69-.462 1.153T18.384 19h-3.807zm0-9.5q1.258 0 2.129-.871T15 9.077t-.871-2.129T12 6.077t-2.129.871T9 9.077t.871 2.129t2.129.871M5.423 18h13.154q.211-.133.288-.354t.135-.412q-1.35-1.325-3.138-2.087T12 14.385t-3.863.762T5 17.235q.058.19.134.411t.289.354" /></svg>  About : </div>
                                <span className="text-accent">{user.about}</span>
                            </div>
                            <div className="flex flex-col gap-1 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-secondary">
                                <div className="flex gap-1 font-bold text-xl">
                                    <svg xmlns="http://www.w3.org/2000/svg" width={23} height={23} viewBox="0 0 384 512">
                                        <path fill="#5a2c01ff" d="M290.7 311L95 269.7L86.8 309l195.7 41zm51-87L188.2 95.7l-25.5 30.8l153.5 128.3zm-31.2 39.7L129.2 179l-16.7 36.5L293.7 300zM262 32l-32 24l119.3 160.3l32-24zm20.5 328h-200v39.7h200zm39.7 80H42.7V320h-40v160h359.5V320h-40z"></path>
                                    </svg> Tech Stacks:</div>
                                <span className="text-accent">{user.skills}</span>
                            </div>
                            {/* <div className="flex flex-col gap-1 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-gray-300">
                                <div className="flex gap-1 font-bold text-xl"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24"><g fill="none" stroke="#5decff" stroke-miterlimit="10" stroke-width="1"><path fill="#5decff" fill-opacity="0.16" d="M18.6 3H5.4A2.4 2.4 0 0 0 3 5.4v13.2A2.4 2.4 0 0 0 5.4 21h13.2a2.4 2.4 0 0 0 2.4-2.4V5.4A2.4 2.4 0 0 0 18.6 3Z" /><path stroke-linecap="round" stroke-linejoin="round" d="M10 21V3m-7 7h18M5.4 3h13.2A2.4 2.4 0 0 1 21 5.4v13.2a2.4 2.4 0 0 1-2.4 2.4H5.4A2.4 2.4 0 0 1 3 18.6V5.4A2.4 2.4 0 0 1 5.4 3" /></g></svg>  Projects :</div>  this segment used when second segment start showing his AURA !!
                            </div> */}

                        </div>
                    </div>

                    {/* ========== RIGHT PANEL ========== */}
                    <div className={`w-full lg:w-[70%] rounded-3xl p-8 bg-base-300 border border-secondary border-[2px] flex-col gap-5 `}>


                        <div className="mb-3">
                            <h2 className="text-6xl font-semibold text-secondary">
                                Profile Information
                            </h2>

                            <p className="text-accent">
                                Update your personal details below to update them in the main profile !!
                            </p>
                        </div>


                        {/* Inputs go here */}
                        <div className="mt-10 p-5 border border-dashed border-white/20 rounded-xl flex  justify-center text-gray-500 ">
                            <form action="" onSubmit={handleUpdate} className="flex flex-col gap-[20px] w-full mt-2">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-secondary">
                                    <div className="space-y-2 ">
                                        <label htmlFor="firstName" className="text-md ml-3 block">
                                            First Name
                                        </label>
                                        <div className={"flex items-center rounded-2xl px-4 py-3  transition-all duration-300  bg-base-100 border border-secondary border-[2px] focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 "}>
                                            <span className="mr-3">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffa43d" strokeWidth="2">
                                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                                    <circle cx="12" cy="7" r="4" />
                                                </svg>
                                            </span>
                                            <input
                                                id="firstName"
                                                type="text"
                                                placeholder={user.firstName}
                                                className="w-full outline-none text-gray-200 bg-transparent placeholder-gray-500 text-base text-secondary"
                                                value={formData['firstName']}
                                                onChange={handleChange}

                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="middleName" className="text-md ml-3 block">
                                            Middle Name
                                        </label>
                                        <div className={"flex items-center rounded-2xl px-4 py-3  transition-all duration-300  bg-base-100 border border-secondary border-[2px] focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 "}>
                                            <span className="mr-3">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffa43d" strokeWidth="2">
                                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                                    <circle cx="12" cy="7" r="4" />
                                                </svg>
                                            </span>
                                            <input
                                                id="middleName"
                                                type="text"
                                                placeholder={user.middleName}
                                                className="w-full outline-none text-gray-200 bg-transparent placeholder-gray-500 text-base text-secondary"
                                                value={formData['middleName']}
                                                onChange={handleChange}
                                                required={false}
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="lastName" className="text-md ml-3 block">
                                            Last Name
                                        </label>
                                        <div className={"flex items-center rounded-2xl px-4 py-3  transition-all duration-300  bg-base-100 border border-secondary border-[2px] focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 "}>
                                            <span className="mr-3">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffa43d" strokeWidth="2">
                                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                                    <circle cx="12" cy="7" r="4" />
                                                </svg>
                                            </span>
                                            <input
                                                id="lastName"
                                                type="text"
                                                placeholder={user.lastName}
                                                className="w-full outline-none text-gray-200 bg-transparent placeholder-gray-500 text-base text-secondary"
                                                value={formData['lastName']}
                                                onChange={handleChange}

                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-3 gap-4 text-secondary">
                                    <div className="space-y-2">
                                        <label htmlFor="gender" className="text-md ml-3 block">
                                            Gender
                                        </label>
                                        <div className={`flex items-center rounded-2xl px-4 py-3  transition-all duration-300  bg-base-100 border border-secondary border-[2px] focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 `}>
                                            <span className="mr-3">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffa43d" strokeWidth="2">
                                                    <circle cx="12" cy="12" r="10" />
                                                    <path d="M12 2v10M12 22v-10M2 12h10M22 12H12" />
                                                </svg>
                                            </span>
                                            <select
                                                id="gender"
                                                className="w-full outline-none text-gray-200 bg-transparent text-base appearance-none cursor-pointer text-secondary"
                                                value={formData.gender}
                                                onChange={handleChange}

                                            >
                                                <option value="" disabled hidden className="text-gray-500"></option>
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
                                        <div className={`flex items-center rounded-2xl px-4 py-3  transition-all duration-300  bg-base-100 border border-secondary border-[2px] focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 `}>
                                            <span className="mr-3">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffa43d" strokeWidth="2">
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
                                                className="w-full outline-none text-gray-200 bg-transparent placeholder-gray-500 text-base [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none text-secondary"
                                                value={formData.age}
                                                onChange={handleChange}

                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2 ">
                                        <label htmlFor="college" className="text-md ml-3 block ">
                                            College or Company
                                        </label>
                                        <div className={`flex items-center rounded-2xl px-4 py-3  transition-all duration-300  bg-base-100 border border-secondary border-[2px] focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 `}>
                                            <span className="mr-3">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 50 50">
                                                    <g fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.4">
                                                        <path stroke="#ffa43d" d="M33.333 8.333A2.083 2.083 0 0 0 31.25 6.25h-12.5a2.083 2.083 0 0 0-2.083 2.083v6.25h16.666zM43.75 41.667v-25a2.083 2.083 0 0 0-2.083-2.084H8.333a2.083 2.083 0 0 0-2.083 2.084v25a2.083 2.083 0 0 0 2.083 2.083h33.334a2.083 2.083 0 0 0 2.083-2.083" />
                                                        <path stroke="#714009ff" d="M22.917 29.167H18a8.33 8.33 0 0 1-7.583-5.042l-3.792-8.646a2.08 2.08 0 0 1 1.708-.896h33.334a2.08 2.08 0 0 1 1.708.896l-3.792 8.646A8.33 8.33 0 0 1 32 29.167h-4.917" />
                                                        <path stroke="#ffa43d" d="M27.083 27.083h-4.166v4.167h4.166z" />
                                                    </g>
                                                </svg>
                                            </span>
                                            <input
                                                id="college"
                                                type="text"
                                                placeholder={user.college}
                                                className="outline-none w-full text-gray-200 bg-transparent placeholder-gray-500 text-base text-secondary"
                                                value={formData.college}
                                                onChange={handleChange}

                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className='flex justify-between items-center  w-full text-secondary'>

                                    <div className="space-y-2  w-[48.5%]">
                                        <label htmlFor="profession" className="text-md ml-3 block">
                                            Professionaly what you are !
                                        </label>
                                        <div className={`flex items-center rounded-2xl px-4 py-3  transition-all duration-300  bg-base-100 border border-secondary border-[2px]  `}>
                                            <span className="mr-3 ">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 50 50">
                                                    <g fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.4">
                                                        <path stroke="#ffa43d" d="M33.333 8.333A2.083 2.083 0 0 0 31.25 6.25h-12.5a2.083 2.083 0 0 0-2.083 2.083v6.25h16.666zM43.75 41.667v-25a2.083 2.083 0 0 0-2.083-2.084H8.333a2.083 2.083 0 0 0-2.083 2.084v25a2.083 2.083 0 0 0 2.083 2.083h33.334a2.083 2.083 0 0 0 2.083-2.083" />
                                                        <path stroke="#593103ff" d="M22.917 29.167H18a8.33 8.33 0 0 1-7.583-5.042l-3.792-8.646a2.08 2.08 0 0 1 1.708-.896h33.334a2.08 2.08 0 0 1 1.708.896l-3.792 8.646A8.33 8.33 0 0 1 32 29.167h-4.917" />
                                                        <path stroke="#ffa43d" d="M27.083 27.083h-4.166v4.167h4.166z" />
                                                    </g>
                                                </svg>
                                            </span>
                                            <input
                                                id="profession"
                                                type="text"
                                                placeholder={user.profession}
                                                className="w-full outline-none text-gray-200 bg-transparent placeholder-gray-500 text-base text-secondary"
                                                value={formData.profession}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                    {/* ABOUT EDITS */}
                                    <div className="space-y-2 w-[48%]">

                                        <div className="flex justify-between items-center">
                                            <label htmlFor="about" className="text-md ml-3 block">
                                                About                                        </label>

                                        </div>
                                        <div className={`flex items-center rounded-2xl px-4 py-3  transition-all duration-300  bg-base-100 border border-secondary border-[2px] focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 `}>
                                            <span className="mr-3">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 14 14">
                                                    <g fill="none">
                                                        <path stroke="#ffa43d" d="M13.5 10.5v2a1 1 0 0 1-1 1h-2m0-13h2a1 1 0 0 1 1 1v2m-13 0v-2a1 1 0 0 1 1-1h2m0 13h-2a1 1 0 0 1-1-1v-2" />
                                                        <path fill="#583002ff" d="M7 6.5a2 2 0 1 0 0-4a2 2 0 0 0 0 4m3.803 4.5a3.994 3.994 0 0 0-7.606 0z" />
                                                    </g>
                                                </svg>
                                            </span>
                                            <textarea
                                                id="about"
                                                placeholder={user.about}
                                                className="w-full outline-none text-gray-200 bg-transparent placeholder-gray-500 text-base text-secondary"
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
                                <div className="w-[100%] flex justify-center">
                                    <button type="submit" className="group relative w-[30%] py-3  mt-4 rounded-xl text-xl font-bold bg-[#370a0020] border-[2px] border-accent hover:border-secondary hover:bg-[#370a0040] transition-all duration-300 overflow-hidden text-secondary shadow-md hover:shadow-lg">
                                        Save Your Changes
                                        <div className="absolute inset-x-0 bottom-0 h-[2px] w-full bg-gradient-to-r from-transparent via-[#9f2d00]/70 to-transparent"></div>
                                        <div className="absolute inset-x-0 bottom-0 h-[2px] w-[50%] mx-auto bg-gradient-to-r from-transparent via-accent to-transparent"></div>
                                        <div className="absolute inset-x-0 bottom-0 h-[1px] w-[50%] mx-auto cursor-pointer group-hover:h-[4px] transition-all duration-300 bg-gradient-to-r from-transparent via-[#ffa43d] to-transparent"></div>
                                    </button>
                                </div>

                            </form>
                        </div>

                    </div>
                </div>
            </div >

            {editProfileIMG && (<div className=" z-10 fixed inset-0 bg-black/80  animate-fadeIn flex justify-center items-center " onClick={() => editProfileIMGisOpen(false)}>

                {/* CARD */}
                <div className="w-[380px] rounded-2xl overflow-hidden bg-black/60  border border-white/10  " onClick={(e) => e.stopPropagation()} >

                    {/* HEADER */}
                    <div className="flex items-center justify-center gap-3 px-6 py-4 border-b border-white/10">
                        <h2 className="text-xl font-semibold text-white">
                            Change Profile Photo
                        </h2>

                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 14 14">
                            <g fill="none" fill-rule="evenodd" clip-rule="evenodd">
                                <path fill="#fff" d="M1.573 1.573A.25.25 0 0 1 1.75 1.5h1.5a.75.75 0 0 0 0-1.5h-1.5A1.75 1.75 0 0 0 0 1.75v1.5a.75.75 0 0 0 1.5 0v-1.5a.25.25 0 0 1 .073-.177M14 10.75a.75.75 0 0 0-1.5 0v1.5a.25.25 0 0 1-.25.25h-1.5a.75.75 0 0 0 0 1.5h1.5A1.75 1.75 0 0 0 14 12.25zM.75 10a.75.75 0 0 1 .75.75v1.5a.25.25 0 0 0 .25.25h1.5a.75.75 0 0 1 0 1.5h-1.5A1.75 1.75 0 0 1 0 12.25v-1.5A.75.75 0 0 1 .75 10m10-10a.75.75 0 0 0 0 1.5h1.5a.25.25 0 0 1 .25.25v1.5a.75.75 0 0 0 1.5 0v-1.5A1.75 1.75 0 0 0 12.25 0z" />
                                <path fill="#2859c5" d="M9.208 4.46a2.21 2.21 0 1 1-4.421 0a2.21 2.21 0 0 1 4.421 0m-6.353 6.195a4.423 4.423 0 0 1 8.288 0c.112.299-.126.595-.446.595H3.301c-.32 0-.558-.296-.446-.595" />
                            </g>
                        </svg>
                    </div>

                    {/* BODY */}
                    <div className="flex flex-col gap-3 p-5">

                        {/* Upload Button */}
                        <label className="cursor-pointer w-full text-center py-3 rounded-xl 
      bg-white/5 hover:bg-white/10 border border-white/10 transition text-gray-200">

                            Upload New Photo
                            <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                        </label>

                        {/* Remove */}
                        <button className="w-full py-3 rounded-xl text-red-400 
      hover:bg-red-500/10 border border-transparent transition">
                            Remove Current Photo
                        </button>

                    </div>

                    {/* FOOTER */}
                    <div className="border-t border-white/10">
                        <button className="w-full py-3 text-gray-400 hover:text-white transition" onClick={() => editProfileIMGisOpen(false)}>
                            Cancel
                        </button>
                    </div>

                </div>
            </div>)}


            {uploading && (<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 ">

                <div className="
relative
animate-novaEnter
w-[90%] max-w-[700px]
bg-gradient-to-br from-cyan-100/90 to-white/70
border border-white/40
rounded-[40px]
p-12
flex flex-col items-center text-center
">

                    {/* Glow background */}
                    <div className="absolute inset-0 rounded-[40px] bg-cyan-300/20 z-10"></div>

                    {/* Image */}
                    <img
                        src="/img/cs-identity-manager.png"
                        alt=""
                        className=" w-[180px] rounded-[30px]  border border-black/10 " />

                    {/* Title */}
                    <h1
                        className="
        text-black
        font-head
        font-extrabold
        text-4xl md:text-5xl
        mt-8
        tracking-wide
        leading-tight
      "
                    >
                        NOVA is updating your identity

                        <span className="inline-flex ml-4 align-middle">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="45"
                                height="45"
                                viewBox="0 0 24 24"
                            >
                                <circle cx="12" cy="12" r="3" fill="#000" />
                                <g>
                                    <circle cx="4" cy="12" r="3" fill="#000" />
                                    <circle cx="20" cy="12" r="3" fill="#000" />
                                    <animateTransform
                                        attributeName="transform"
                                        calcMode="spline"
                                        dur="1s"
                                        keySplines=".36,.6,.31,1;.36,.6,.31,1"
                                        repeatCount="indefinite"
                                        type="rotate"
                                        values="0 12 12;180 12 12;360 12 12"
                                    />
                                </g>
                            </svg>
                        </span>
                    </h1>

                    {/* Subtext */}
                    <p className="mt-4 text-black/60 font-medium tracking-wide">
                        Please wait while NOVA securely synchronizes your profile
                    </p>

                </div>
            </div>)}

        </div>


    );
};

export default EditProfile;
