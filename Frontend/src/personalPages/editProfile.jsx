import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from 'react';
import axios from 'axios';
import BASE_URL from "../Pages/auth/baseURL";

import { MdEdit } from "react-icons/md";
import Toast from '../Pages/CARRER-PROFILE-CREATION/2/Toast';
import { AnimatePresence } from "framer-motion";
import { addNewUser } from "@/utils/userSlice";

const EditProfile = () => {
    const dispatch = useDispatch();


    const [errorisOpen, errorsetIsOpen] = useState(false);
    const [editProfileIMG, editProfileIMGisOpen] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [hoveringImg, setHoveringImg] = useState(false);
    const user = useSelector(store => store.user.user.DATA);
    const [copied1, setCopied1] = useState(false);
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
    const [toasts, setToasts] = useState([]);
    const addToast = ({ type = "success", title, message }) => {
        const id = Date.now();
        setToasts((prev) => [...prev, { id, type, title, message }]);
    };

    const removeToast = (id) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    };




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
        if (Object.keys(updatedData).length === 0) {
            addToast({
                type: "error",
                title: "Oh Snap!",
                message: "Please Enter the enteries you want to change"
            });

            return;
        };
        try {


            const res = await axios.patch(

                `${BASE_URL}/profile/me/edit`,
                updatedData,
                { withCredentials: true }

            );



            dispatch(addNewUser(res.data.data))

            setFormData({
                firstName: '',
                middleName: '',
                lastName: '',
                gender: '',
                age: '',
                profession: '',
                college: '',
                about: '',
            })

            addToast({
                type: "success",
                title: "Success!",
                message: "Profile Updated Sucessfully"
            });

        } catch (err) {

            addToast({
                type: "error",
                title: "error!",
                message: err.response.data || err.message
            })
            errorsetIsOpen(true)
        };
    };

    const handleCopy = async (text) => {
        try {
            await navigator.clipboard.writeText(text);

        } catch (err) {
            console.error("Failed to copy", err);
        }
    };
    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));
    }
    const removeProfilePic = async () => {
        try {
            setUploading(true);
            const res = await axios.post(
                `${BASE_URL}/remove-profile-pic/upload`,
                {},
                {
                    withCredentials: true,
                }
            );

            dispatch(addNewUser(res.data.data));

            addToast({
                type: "success",
                title: "Removed!",
                message: "Profile photo removed successfully",
            });

            editProfileIMGisOpen(false);

        } catch (err) {

            addToast({
                type: "error",
                title: "Error",
                message:
                    err?.response?.data?.message || err.message,
            });

        } finally {
            setUploading(false)
        }
    };
    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();

        // ⭐ must match backend multer field
        formData.append("profilePic", file);

        try {
            setUploading(true);

            const responsePic = await axios.post(
                `${BASE_URL}/profile-pic/upload`,
                formData,
                { withCredentials: true }
            );

            addToast({
                type: "success",
                title: "Success!",
                message: "Profile Updated Sucessfully"
            });



            dispatch(addNewUser(responsePic.data.data))
            editProfileIMGisOpen(false);
        } catch (err) {
            addToast({
                type: "error",
                title: "error!",
                message: err.response.data || err.message
            })
        } finally {
            setUploading(false);
        }
    };




    return (
        <div className=" w-screen min-h-screen bg-bg-100 flex justify-center items-start px-3 sm:px-5 md:px-8 lg:px-10 py-3 overflow-y-auto">
            <ToastContainer toasts={toasts} removeToast={removeToast} />
            <div className=" w-full  max-w-[1600px] relative mx-auto p-3 sm:p-5 md:p-6 lg:p-4 sm:p-6 lg:p-8 rounded-[32px] bg-base-100  border-secondary border-[3px] flex flex-col gap-6">
                <div className="pointer-events-none absolute inset-0 rounded-[32px] bg-[radial-gradient`(circle_at_30%_20%,rgba(0,255,255,0.08),transparent_60%)]"></div>
                {/* ================= HEADER ================= */}
                <div className="w-full flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">

                    <div>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold     bg-gradient-to-b from-[#ffffff] to-accent bg-clip-text   text-transparent flex items-center gap-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                                <path fill="#ffffff" fillRule="evenodd" d="M10.826 4.503C8.622 3.378 6.706 3.151 5.76 4.1c-1.63 1.63.214 6.117 4.12 10.022c3.905 3.905 8.392 5.75 10.022 4.12c.948-.948.72-2.863-.404-5.067c-.203.035-.427.04-.667-.004c-.945-.17-2.435-.896-4.77-3.23S11 6.115 10.83 5.17a1.9 1.9 0 0 1-.004-.667m1.88 8.204a1 1 0 1 1-1.413-1.414a1 1 0 0 1 1.414 1.414M8.465 8.464A1 1 0 1 0 9.878 7.05a1 1 0 0 0-1.414 1.414m8.486 7.071a1 1 0 1 1-1.415-1.414a1 1 0 0 1 1.415 1.414" clipRule="evenodd"></path>
                                <path fill="#ffffff" d="M8.287 16.773a.75.75 0 0 0-1.06-1.06l-4.122 4.12a.75.75 0 0 0 1.061 1.061z"></path>
                                <path fill="#ffffff" d="M12.302 4.79a4.73 4.73 0 0 1 5.87.655l.384.383a4.73 4.73 0 0 1 .654 5.87a.4.4 0 0 1-.115-.004c-.496-.09-1.718-.56-3.974-2.815c-2.255-2.256-2.725-3.477-2.815-3.974a.4.4 0 0 1-.004-.115m-7.501 6.979a.75.75 0 0 0-1.16-.952l-2.22 2.707a.75.75 0 1 0 1.159.952zm8.486 7.534a.75.75 0 0 1-.104 1.055l-2.707 2.221a.75.75 0 0 1-.952-1.16l2.707-2.22a.75.75 0 0 1 1.056.103" opacity={0.5}></path>
                            </svg>
                            Edit Main Profile
                        </h1>
                        <p className="text-lg text-info mt-2">
                            Your profile is your first impression — make it unforgettable ✨
                        </p>
                    </div>


                </div>

                {/* ================= CONTENT ================= */}
                <div className="w-full flex flex-col lg:flex-row gap-3">

                    {/* ========== ProfilePreview Panel ========== */}
                    <div className="w-full xl:w-[30%] rounded-2xl p-6 bg-base-300 border border-secondary border-[2px] flex flex-col items-center">
                        {/* Avatar */}
                        <div className="relative w-[120px] h-[120px]
sm:w-[150px] sm:h-[150px]
md:w-[180px] md:h-[180px] rounded-2xl bg-gray-900 border border-gray-700 flex items-center justify-center " onClick={() => editProfileIMGisOpen(true)} onMouseEnter={() => setHoveringImg(true)} onMouseLeave={() => setHoveringImg(false)}>
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
                        <p className="text-3xl font-semibold text-white mt-5 tracking-wide text-center">
                            {user?.firstName || "First"} {user?.middleName || ""} {user?.lastName || "Last"}
                        </p>
                        {/* Username */}
                        <p className="text-base text-info mt-1 flex justify-center items-center gap-1">
                            @{user?.username || "username"} {user?.isVerified && < span className="text-blue-400" >
                                <svg xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" viewBox="0 0 24 24">
                                    <path fill="currentColor" fillRule="evenodd" d="M9.592 3.2a6 6 0 0 1-.495.399c-.298.2-.633.338-.985.408c-.153.03-.313.043-.632.068c-.801.064-1.202.096-1.536.214a2.71 2.71 0 0 0-1.655 1.655c-.118.334-.15.735-.214 1.536a6 6 0 0 1-.068.632c-.07.352-.208.687-.408.985c-.087.13-.191.252-.399.495c-.521.612-.782.918-.935 1.238c-.353.74-.353 1.6 0 2.34c.153.32.414.626.935 1.238c.208.243.312.365.399.495c.2.298.338.633.408.985c.03.153.043.313.068.632c.064.801.096 1.202.214 1.536a2.71 2.71 0 0 0 1.655 1.655c.334.118.735.15 1.536.214c.319.025.479.038.632.068c.352.07.687.209.985.408c.13.087.252.191.495.399c.612.521.918.782 1.238.935c.74.353 1.6.353 2.34 0c.32-.153.626-.414 1.238-.935c.243-.208.365-.312.495-.399c.298-.2.633-.338.985-.408c.153-.03.313-.043.632-.068c.801-.064 1.202-.096 1.536-.214a2.71 2.71 0 0 0 1.655-1.655c.118-.334.15-.735.214-1.536c.025-.319.038-.479.068-.632c.07-.352.209-.687.408-.985c.087-.13.191-.252.399-.495c.521-.612.782-.918.935-1.238c.353-.74.353-1.6 0-2.34c-.153-.32-.414-.626-.935-1.238a6 6 0 0 1-.399-.495a2.7 2.7 0 0 1-.408-.985a6 6 0 0 1-.068-.632c-.064-.801-.096-1.202-.214-1.536a2.71 2.71 0 0 0-1.655-1.655c-.334-.118-.735-.15-1.536-.214a6 6 0 0 1-.632-.068a2.7 2.7 0 0 1-.985-.408a6 6 0 0 1-.495-.399c-.612-.521-.918-.782-1.238-.935a2.71 2.71 0 0 0-2.34 0c-.32.153-.626.414-1.238.935m6.781 6.663a.814.814 0 0 0-1.15-1.15l-4.85 4.85l-1.596-1.595a.814.814 0 0 0-1.15 1.15l2.17 2.17a.814.814 0 0 0 1.15 0z" clipRule="evenodd"></path>
                                </svg>

                            </span>}
                        </p>
                        <p className="text-base text-info hover:text-white border px-5 py-3 mt-2 rounded-3xl bg-base-100 flex flex-wrap justify-center items-center gap-2
break-all text-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2m0 4l-8 5l-8-5V6l8 5l8-5z"></path>
                            </svg> {user?.gmail || "gmail"}


                            <span onClick={() => {
                                handleCopy(user.username); setCopied1(true); setCopied2(false); setTimeout(() => {

                                    setCopied1(false)
                                }, 5000);
                            }} className="cursor-copy">
                                {!copied1 ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="1.4em" height="1.4em" viewBox="0 0 24 24">
                                        <g fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}>
                                            <path d="M16 3H4v13"></path>
                                            <path d="M8 7h12v12a2 2 0 0 1-2 2h-8a2 2 0 0 1-2-2z"></path>
                                        </g>
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24">
                                        <path fill="#61ff3b" fillRule="evenodd" d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10m-1.177-7.86l-2.765-2.767L7 12.431l3.119 3.121a1 1 0 0 0 1.414 0l5.952-5.95l-1.062-1.062z"></path>
                                    </svg>
                                )}

                            </span>
                        </p>
                        {/* Divider */}
                        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent my-6"></div>

                        {/* Info Pills */}
                        <div className="w-full flex flex-col gap-3">

                            <div className="flex flex-col sm:flex-row
justify-between
items-start sm:items-center
 gap-3 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-gray-300">
                                <div className="flex justify-center items-center gap-2 text-white">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24"><g fill="none"><path fill="#ffffff" d="M21.087 3.87H2.913V23h18.174z" /><path fill="#ffffff" d="M19.89 3.87H2.914v16.978z" /><path stroke="#301a01ff" strokeLinecap="round" strokeLinejoin="round" d="M1 23h22M21.087 3.87H2.913V23h18.174zM1 3.87h22" strokeWidth="1" /><path fill="#301a01ff" stroke="#301a01ff" strokeLinecap="round" strokeLinejoin="round" d="M20.13 3.87V1.957A.956.956 0 0 0 19.174 1H4.826a.957.957 0 0 0-.956.957V3.87z" strokeWidth="1" /><path fill="#301a01ff" stroke="#301a01ff" strokeLinecap="round" strokeLinejoin="round" d="M10.565 23v-3.348a1.435 1.435 0 0 1 2.87 0V23z" strokeWidth="1" /><path stroke="#301a01ff" strokeLinecap="round" strokeLinejoin="round" d="M5.782 19.174h2.87m6.696 0h2.87M5.782 15.348h3.826m4.782 0h3.827M5.782 11.522h3.826m4.782 0h3.827M5.782 7.696h3.826m4.782 0h3.827" strokeWidth="1" /></g></svg>

                                    <span>{user?.college || "College Name"}</span></div>

                                <div className="flex justify-center items-center gap-2 text-white">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><g fill="none"><path fill="#ffffff" d="M17.754 14a2.25 2.25 0 0 1 2.249 2.249v.918a2.75 2.75 0 0 1-.513 1.6C17.945 20.93 15.42 22 12 22s-5.944-1.072-7.486-3.236a2.75 2.75 0 0 1-.51-1.596v-.92A2.25 2.25 0 0 1 6.251 14z" /><path fill="#ffffff" d="M17.754 14a2.25 2.25 0 0 1 2.249 2.249v.918a2.75 2.75 0 0 1-.513 1.6C17.945 20.93 15.42 22 12 22s-5.944-1.072-7.486-3.236a2.75 2.75 0 0 1-.51-1.596v-.92A2.25 2.25 0 0 1 6.251 14z" /><path fill="#ffffff" d="M12 2.005a5 5 0 1 1 0 10a5 5 0 0 1 0-10" /><defs><linearGradient id="SVGPusuadEO" x1="7.808" x2="10.394" y1="15.064" y2="23.319" gradientUnits="userSpaceOnUse"><stop offset=".125" stopColor="#00c6ff" /><stop offset="1" stopColor="#41d1dc" /></linearGradient><linearGradient id="SVG2f7L8cLU" x1="12.003" x2="15.623" y1="13.047" y2="26.573" gradientUnits="userSpaceOnUse"><stop stopColor="#5edadb" stopOpacity="0" /><stop offset="1" stopColor="#62f8ef" /></linearGradient><linearGradient id="SVG9AhnabtW" x1="9.379" x2="14.475" y1="3.334" y2="11.472" gradientUnits="userSpaceOnUse"><stop offset=".125" stopColor="#00c6ff" /><stop offset="1" stopColor="#41d1dc" /></linearGradient></defs></g></svg>

                                    <span>{user?.profession || "Profession"}</span></div>

                            </div>
                            <div className="flex flex-col sm:flex-row
justify-between
items-start sm:items-center
 gap-3 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-gray-300">
                                <div className="flex justify-center items-center gap-2 text-white">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><g fill="none"><path fill="#ffffff" d="M12.95 13.891a3.816 3.816 0 1 0 0-7.632a3.816 3.816 0 0 0 0 7.632" /><path fill="#4a2a05ff" d="M7.21 15.826a3.815 3.815 0 1 0 0-7.63a3.815 3.815 0 0 0 0 7.63" /><path stroke="#7a7a7a" strokeLinecap="round" strokeLinejoin="round" d="M9.61 14.146a5.26 5.26 0 1 1 3.826 1.18" strokeWidth="1" /><path stroke="#7a7a7a" strokeLinecap="round" strokeLinejoin="round" d="M10.578 7.952A5.26 5.26 0 1 1 6.74 6.76m10.043-.5L22.044 1m0 3.826V1h-3.826M6.74 17.26V23m-1.913-1.913h3.826" strokeWidth="1" /></g></svg>
                                    Gender :<span className="text-white">{user?.gender || "Gender"}</span></div>
                                <div className="flex justify-center items-center gap-2 text-white">
                                    <svg width="25" height="25" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M20 1C20 0.447715 20.4477 0 21 0C21.5523 0 22 0.447715 22 1V2H23C23.5523 2 24 2.44772 24 3C24 3.55228 23.5523 4 23 4H22V5C22 5.55228 21.5523 6 21 6C20.4477 6 20 5.55228 20 5V4H19C18.4477 4 18 3.55228 18 3C18 2.44772 18.4477 2 19 2H20V1Z" fill="#ff808c" />
                                        <path d="M21.1936 8.07463C21.7016 7.85776 22.297 8.09138 22.4668 8.6169C23.145 10.7148 23.1792 12.9766 22.5523 15.1064C21.8308 17.5572 20.2788 19.6804 18.1626 21.1117C16.0464 22.5429 13.498 23.193 10.9548 22.9502C8.41165 22.7075 6.03225 21.5871 4.22503 19.7814C2.4178 17.9757 1.29545 15.5972 1.05062 13.0542C0.805783 10.5112 1.45373 7.96227 2.88325 5.84491C4.31277 3.72755 6.43471 2.17379 8.88488 1.4503C11.0142 0.821568 13.2759 0.853957 15.3744 1.53036C15.9001 1.69979 16.1342 2.29501 15.9178 2.80311C15.7013 3.31122 15.1136 3.54496 14.5846 3.38623C12.9184 2.88626 11.1353 2.8783 9.4532 3.37498C7.45003 3.96647 5.71522 5.23677 4.5465 6.96784C3.37778 8.69891 2.84804 10.7828 3.04821 12.8619C3.24838 14.9409 4.16596 16.8855 5.64348 18.3618C7.121 19.8381 9.06631 20.754 11.1455 20.9525C13.2247 21.1509 15.3082 20.6195 17.0383 19.4493C18.7684 18.2792 20.0373 16.5433 20.6271 14.5397C21.1224 12.8572 21.113 11.074 20.6116 9.40826C20.4525 8.87941 20.6857 8.29149 21.1936 8.07463Z" fill="#ffffff" />
                                        <path d="M7.71054 9.14472L7.29441 9.35279C6.69971 9.65014 5.99999 9.21769 5.99999 8.55279C5.99999 8.214 6.1914 7.9043 6.49441 7.75279L7.78884 7.10557C7.9277 7.03615 8.08081 7 8.23605 7H8.99999C9.55227 7 9.99999 7.44772 9.99999 8V16C9.99999 16.5523 9.55227 17 8.99999 17C8.4477 17 7.99999 16.5523 7.99999 16V9.32361C7.99999 9.17493 7.84352 9.07823 7.71054 9.14472Z" fill="#ffffff" />
                                        <path fillRule="evenodd" clipRule="evenodd" d="M16 7C17.1046 7 18 7.89543 18 9V15C18 16.1046 17.1046 17 16 17H14C12.8954 17 12 16.1046 12 15V9C12 7.89543 12.8954 7 14 7H16ZM15 9C15.5523 9 16 9.44772 16 10V14C16 14.5523 15.5523 15 15 15C14.4477 15 14 14.5523 14 14V10C14 9.44772 14.4477 9 15 9Z" fill="#ffffff" />
                                    </svg> Age : <span className="text-white">{user?.age || "Age"}</span></div>
                            </div>

                            <div className="flex flex-col gap-1 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white">
                                <div className="flex gap-1 font-bold text-xl"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path fill="#ffffff" d="M12 21.577L9.423 19H5.615q-.69 0-1.153-.462T4 17.384V4.616q0-.691.463-1.153T5.616 3h12.769q.69 0 1.153.463T20 4.616v12.769q0 .69-.462 1.153T18.384 19h-3.807zm0-9.5q1.258 0 2.129-.871T15 9.077t-.871-2.129T12 6.077t-2.129.871T9 9.077t.871 2.129t2.129.871M5.423 18h13.154q.211-.133.288-.354t.135-.412q-1.35-1.325-3.138-2.087T12 14.385t-3.863.762T5 17.235q.058.19.134.411t.289.354" /></svg>  About : </div>
                                <span className="text-info">{user?.about}</span>
                            </div>
                            <div className="flex flex-col gap-1 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white">
                                <div className="flex gap-1 font-bold text-xl">
                                    <svg xmlns="http://www.w3.org/2000/svg" width={23} height={23} viewBox="0 0 384 512">
                                        <path fill="#ffffff" d="M290.7 311L95 269.7L86.8 309l195.7 41zm51-87L188.2 95.7l-25.5 30.8l153.5 128.3zm-31.2 39.7L129.2 179l-16.7 36.5L293.7 300zM262 32l-32 24l119.3 160.3l32-24zm20.5 328h-200v39.7h200zm39.7 80H42.7V320h-40v160h359.5V320h-40z"></path>
                                    </svg> Tech Stacks:</div>
                                <span className="text-info">{user?.skills}</span>
                            </div>
                            {/* <div className="flex flex-col gap-1 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-gray-300">
                                <div className="flex gap-1 font-bold text-xl"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24"><g fill="none" stroke="#5decff" stroke-miterlimit="10" strokeWidth="1"><path fill="#5decff" fill-opacity="0.16" d="M18.6 3H5.4A2.4 2.4 0 0 0 3 5.4v13.2A2.4 2.4 0 0 0 5.4 21h13.2a2.4 2.4 0 0 0 2.4-2.4V5.4A2.4 2.4 0 0 0 18.6 3Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M10 21V3m-7 7h18M5.4 3h13.2A2.4 2.4 0 0 1 21 5.4v13.2a2.4 2.4 0 0 1-2.4 2.4H5.4A2.4 2.4 0 0 1 3 18.6V5.4A2.4 2.4 0 0 1 5.4 3" /></g></svg>  Projects :</div>  this segment used when second segment start showing his AURA !!
                            </div> */}

                        </div>
                    </div>

                    {/* ========== RIGHT PANEL ========== */}
                    <div className={`w-full lg:w-[70%] rounded-3xl p-4 sm:p-6 lg:p-8 bg-base-300 border border-secondary border-[2px] flex-col gap-5 `}>


                        <div className="mb-3">
                            <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-semibold text-white">
                                Profile Information
                            </h2>

                            <p className="text-info">
                                Update your personal details below to update them in the main profile !!
                            </p>
                        </div>


                        {/* Inputs go here */}
                        <div className="mt-10 p-5 border border-dashed border-white/20 rounded-xl flex  justify-center text-gray-500 ">
                            <form action="" onSubmit={handleUpdate} className="flex flex-col gap-[20px] w-full mt-2">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-white">
                                    <div className="space-y-2 ">
                                        <label htmlFor="firstName" className="text-md ml-3 block">
                                            First Name
                                        </label>
                                        <div className={"flex items-center rounded-2xl px-4 py-3  transition-all duration-300  bg-base-100 border border-secondary border-[2px] focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 "}>
                                            <span className="mr-3">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2">
                                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                                    <circle cx="12" cy="7" r="4" />
                                                </svg>
                                            </span>
                                            <input
                                                id="firstName"
                                                type="text"
                                                placeholder={user?.firstName}
                                                className="w-full outline-none text-gray-200 bg-transparent placeholder-gray-500 text-base text-white"
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
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2">
                                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                                    <circle cx="12" cy="7" r="4" />
                                                </svg>
                                            </span>
                                            <input
                                                id="middleName"
                                                type="text"
                                                placeholder={user?.middleName}
                                                className="w-full outline-none text-gray-200 bg-transparent placeholder-gray-500 text-base text-white"
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
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2">
                                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                                    <circle cx="12" cy="7" r="4" />
                                                </svg>
                                            </span>
                                            <input
                                                id="lastName"
                                                type="text"
                                                placeholder={user?.lastName}
                                                className="w-full outline-none text-gray-200 bg-transparent placeholder-gray-500 text-base text-white"
                                                value={formData['lastName']}
                                                onChange={handleChange}

                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 text-white">
                                    <div className="space-y-2">
                                        <label htmlFor="gender" className="text-md ml-3 block">
                                            Gender
                                        </label>
                                        <div className={`flex items-center rounded-2xl px-4 py-3  transition-all duration-300  bg-base-100 border border-secondary border-[2px] focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 `}>
                                            <span className="mr-3">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2">
                                                    <circle cx="12" cy="12" r="10" />
                                                    <path d="M12 2v10M12 22v-10M2 12h10M22 12H12" />
                                                </svg>
                                            </span>
                                            <select
                                                id="gender"
                                                className="w-full outline-none text-gray-200 bg-transparent text-base appearance-none cursor-pointer text-white"
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
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2">
                                                    <circle cx="12" cy="12" r="10" />
                                                    <polyline points="12 6 12 12 16 14" />
                                                </svg>
                                            </span>
                                            <input
                                                id="age"
                                                type="number"
                                                min="10"
                                                max="100"
                                                placeholder={user?.age}
                                                className="w-full outline-none text-gray-200 bg-transparent placeholder-gray-500 text-base [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none text-white"
                                                value={formData?.age}
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
                                                        <path stroke="#ffffff" d="M33.333 8.333A2.083 2.083 0 0 0 31.25 6.25h-12.5a2.083 2.083 0 0 0-2.083 2.083v6.25h16.666zM43.75 41.667v-25a2.083 2.083 0 0 0-2.083-2.084H8.333a2.083 2.083 0 0 0-2.083 2.084v25a2.083 2.083 0 0 0 2.083 2.083h33.334a2.083 2.083 0 0 0 2.083-2.083" />
                                                        <path stroke="#ffffff" d="M22.917 29.167H18a8.33 8.33 0 0 1-7.583-5.042l-3.792-8.646a2.08 2.08 0 0 1 1.708-.896h33.334a2.08 2.08 0 0 1 1.708.896l-3.792 8.646A8.33 8.33 0 0 1 32 29.167h-4.917" />
                                                        <path stroke="#ffffff" d="M27.083 27.083h-4.166v4.167h4.166z" />
                                                    </g>
                                                </svg>
                                            </span>
                                            <input
                                                id="college"
                                                type="text"
                                                placeholder={user?.college}
                                                className="outline-none w-full  bg-transparent placeholder-gray-500 text-base text-white"
                                                value={formData?.college}
                                                onChange={handleChange}

                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className='flex flex-col lg:flex-row
justify-between
items-stretch
gap-4  w-full text-white'>

                                    <div className="space-y-2  w-full lg:w-[48.5%]">
                                        <label htmlFor="profession" className="text-md ml-3 block">
                                            Professionaly what you are !
                                        </label>
                                        <div className={`flex items-center rounded-2xl px-4 py-3  transition-all duration-300  bg-base-100 border border-secondary border-[2px]  `}>
                                            <span className="mr-3 ">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 50 50">
                                                    <g fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.4">
                                                        <path stroke="#ffffff" d="M33.333 8.333A2.083 2.083 0 0 0 31.25 6.25h-12.5a2.083 2.083 0 0 0-2.083 2.083v6.25h16.666zM43.75 41.667v-25a2.083 2.083 0 0 0-2.083-2.084H8.333a2.083 2.083 0 0 0-2.083 2.084v25a2.083 2.083 0 0 0 2.083 2.083h33.334a2.083 2.083 0 0 0 2.083-2.083" />
                                                        <path stroke="#ffffff" d="M22.917 29.167H18a8.33 8.33 0 0 1-7.583-5.042l-3.792-8.646a2.08 2.08 0 0 1 1.708-.896h33.334a2.08 2.08 0 0 1 1.708.896l-3.792 8.646A8.33 8.33 0 0 1 32 29.167h-4.917" />
                                                        <path stroke="#ffffff" d="M27.083 27.083h-4.166v4.167h4.166z" />
                                                    </g>
                                                </svg>
                                            </span>
                                            <input
                                                id="profession"
                                                type="text"
                                                placeholder={user?.profession}
                                                className="w-full outline-none text-gray-200 bg-transparent placeholder-gray-500 text-base text-white"
                                                value={formData?.profession}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                    {/* ABOUT EDITS */}
                                    <div className="space-y-2 w-full lg:w-[48.5%]">

                                        <div className="flex flex-col lg:flex-row
justify-between
items-stretch
gap-4">
                                            <label htmlFor="about" className="text-md ml-3 block">
                                                About                                        </label>

                                        </div>
                                        <div className={`flex items-center rounded-2xl px-4 py-3  transition-all duration-300  bg-base-100 border border-secondary border-[2px] focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 `}>
                                            <span className="mr-3">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 14 14">
                                                    <g fill="none">
                                                        <path stroke="#ffffff" d="M13.5 10.5v2a1 1 0 0 1-1 1h-2m0-13h2a1 1 0 0 1 1 1v2m-13 0v-2a1 1 0 0 1 1-1h2m0 13h-2a1 1 0 0 1-1-1v-2" />
                                                        <path fill="#ffffff" d="M7 6.5a2 2 0 1 0 0-4a2 2 0 0 0 0 4m3.803 4.5a3.994 3.994 0 0 0-7.606 0z" />
                                                    </g>
                                                </svg>
                                            </span>
                                            <textarea
                                                id="about"
                                                placeholder={user?.about}
                                                className="w-full outline-none text-white bg-transparent placeholder-gray-500 text-base "
                                                value={formData?.about}
                                                onChange={handleChange}

                                            />
                                        </div>

                                    </div>

                                </div>








                                <div className="w-[100%] flex justify-center">
                                    <button type="submit" className="group relative w-full sm:w-[70%] md:w-[50%] lg:w-[30%] py-3  mt-4 rounded-full text-xl font-bold bg-[#000] border-[2px] border-accent hover:border-secondary  transition-all duration-300 overflow-hidden text-white shadow-md hover:shadow-lg">
                                        Save Changes
                                        <div className="absolute inset-x-0 bottom-0 h-[2px] w-full bg-gradient-to-r from-transparent via-[#fff]/70 to-transparent"></div>
                                        <div className="absolute inset-x-0 bottom-0 h-[2px] w-[50%] mx-auto bg-gradient-to-r from-transparent via-accent to-transparent"></div>
                                        <div className="absolute inset-x-0 bottom-0 h-[1px] w-[50%] mx-auto cursor-pointer group-hover:h-[4px] transition-all duration-300 bg-gradient-to-r from-transparent via-[#ffffff] to-transparent"></div>
                                    </button>
                                </div>

                            </form>
                        </div>

                    </div>
                </div>
            </div >

            {
                editProfileIMG && (<div className=" z-10 fixed inset-0 bg-black/80  animate-fadeIn flex justify-center items-center " onClick={() => editProfileIMGisOpen(false)}>

                    {/* CARD */}
                    {/* MODAL CARD */}
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="
    relative  w-full max-w-[420px] mx-4
    overflow-hidden rounded-3xl
    border border-white/10
    bg-base-100

    shadow-[0_20px_80px_rgba(0,0,0,0.45)]
    animate-in fade-in zoom-in-95 duration-200
"
                    >

                        {/* TOP GLOW */}
                        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-white to-transparent opacity-80" />

                        {/* HEADER */}
                        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">

                            <div className="flex items-start sm:items-center gap-3 sm:gap-4">
                                {/* ICON */}
                                <div className="
            flex items-center justify-center
            w-12 h-12 rounded-2xl
            bg-base-100 border border-blue-400/20
        ">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 14 14">
                                        <g fill="none" fillRule="evenodd" clipRule="evenodd">
                                            <path
                                                fill="#fff"
                                                d="M1.573 1.573A.25.25 0 0 1 1.75 1.5h1.5a.75.75 0 0 0 0-1.5h-1.5A1.75 1.75 0 0 0 0 1.75v1.5a.75.75 0 0 0 1.5 0v-1.5a.25.25 0 0 1 .073-.177M14 10.75a.75.75 0 0 0-1.5 0v1.5a.25.25 0 0 1-.25.25h-1.5a.75.75 0 0 0 0 1.5h1.5A1.75 1.75 0 0 0 14 12.25zM.75 10a.75.75 0 0 1 .75.75v1.5a.25.25 0 0 0 .25.25h1.5a.75.75 0 0 1 0 1.5h-1.5A1.75 1.75 0 0 1 0 12.25v-1.5A.75.75 0 0 1 .75 10m10-10a.75.75 0 0 0 0 1.5h1.5a.25.25 0 0 1 .25.25v1.5a.75.75 0 0 0 1.5 0v-1.5A1.75 1.75 0 0 0 12.25 0z"
                                            />
                                            <path
                                                fill="#3b82f6"
                                                d="M9.208 4.46a2.21 2.21 0 1 1-4.421 0a2.21 2.21 0 0 1 4.421 0m-6.353 6.195a4.423 4.423 0 0 1 8.288 0c.112.299-.126.595-.446.595H3.301c-.32 0-.558-.296-.446-.595"
                                            />
                                        </g>
                                    </svg>
                                </div>

                                {/* TEXT */}
                                <div>
                                    <h2 className="text-xl font-semibold tracking-tight text-white">
                                        Change Profile Photo
                                    </h2>

                                    <p className="text-sm text-gray-400 mt-0.5">
                                        Upload a new avatar or remove the current one.
                                    </p>
                                </div>
                            </div>

                            {/* CLOSE */}
                            <button
                                onClick={() => editProfileIMGisOpen(false)}
                                className="
            flex items-center justify-center
            w-9 h-9 rounded-xl
            text-gray-400 hover:text-white
            hover:bg-white/10
            transition-all duration-200
        "
                            >
                                ✕
                            </button>
                        </div>

                        {/* BODY */}
                        <div className="p-6 space-y-4">

                            {/* PREVIEW */}
                            <div className="flex justify-center">
                                <div className="relative">
                                    <img
                                        src={user?.photoUrl?.url}
                                        alt="profile"
                                        className="
                    w-24 h-24 rounded-full
                    object-cover
                    border-4 border-white/10
                    shadow-xl
                "
                                    />


                                </div>
                            </div>

                            {/* UPLOAD */}
                            <label
                                className="
            group cursor-pointer
            flex items-center justify-center gap-3
            w-full py-3.5 rounded-2xl
            bg-base-300 hover:bg-white
            text-white font-medium
            transition-all duration-200
            shadow-lg hover:text-base-100
        "
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="group-hover:-translate-y-0.5 transition"
                                >
                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                    <polyline points="17 8 12 3 7 8" />
                                    <line x1="12" x2="12" y1="3" y2="15" />
                                </svg>

                                Upload New Photo

                                <input
                                    type="file"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                />
                            </label>

                            {/* REMOVE */}
                            <button
                                className="
            w-full py-3.5 rounded-2xl
            border border-red-500/20
            bg-red-500/5
            text-red-400 font-medium
            hover:bg-red-500/10
            hover:border-red-500/40
            transition-all duration-200
        "
                                onClick={() => { removeProfilePic(); }}
                            >
                                Remove Current Photo
                            </button>
                        </div>

                        {/* FOOTER */}
                        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-white/10 bg-white/[0.02]">

                            <button
                                onClick={() => editProfileIMGisOpen(false)}
                                className="
            px-5 py-2.5 rounded-xl
            text-sm font-medium text-gray-300
            hover:bg-white/10 hover:text-white
            transition-all
        "
                            >
                                Cancel
                            </button>

                            <button
                                className="
            px-5 py-2.5 rounded-xl
            bg-white text-black
            text-sm font-semibold
            hover:scale-[1.02]
            active:scale-[0.98]
            transition-all duration-200
        "
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>)
            }


            {
                uploading && (<div className="fixed inset-0 z-[999] flex items-center justify-center overflow-hidden bg-black/70  px-4">

                    {/* Animated Background Glow */}
                    <div className="absolute w-[500px] h-[500px] bg-black/20 blur-[120px] rounded-full animate-pulse" />

                    {/* MAIN CARD */}
                    <div
                        className="
                        relative
                        w-full max-w-[760px]
                        overflow-hidden
                        rounded-[36px]
                        border border-white/10
                        bg-base-200
                        shadow-[0_25px_80px_rgba(0,0,0,0.65)]

                        px-6 py-10 md:px-12 md:py-14
                        flex flex-col items-center text-center
                        animate-in fade-in zoom-in-95 duration-300
                    "
                    >

                        {/* TOP BORDER GLOW */}
                        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-white to-transparent opacity-80" />

                        {/* Floating Accent */}


                        {/* STATUS BADGE */}
                        <div className="
                        relative z-10
                        mb-6
                        flex items-center gap-2
                        rounded-full
                        border border-white
                        bg-cyan-400/10
                        px-4 py-1.5
                        text-sm font-medium text-white

                    ">
                            <div className="h-2 w-2 rounded-full bg-white animate-pulse" />
                            Secure Profile Synchronization
                        </div>

                        {/* IMAGE CONTAINER */}
                        <div className="relative z-10">

                            {/* Outer Glow */}


                            {/* Image */}
                            <div className="
                            relative
                            overflow-hidden
                            rounded-[32px]
                            border border-white/10
                            bg-white/5

                        ">
                                <img
                                    src="https://res.cloudinary.com/dggoaxqxl/image/upload/q_auto/f_auto/v1778989004/CS_Identity_Manager_amyjyi.webp"
                                    alt="NOVA Identity Manager"
                                    className="
                                    w-[120px] h-[120px]
sm:w-[160px] sm:h-[160px]
md:w-[220px] md:h-[220px]
                                    object-cover
                                    scale-[1.02]
                                "
                                />

                                {/* Shine Effect */}
                                <div className="
                                absolute inset-0
                                bg-gradient-to-tr from-transparent via-white/10 to-transparent
                            " />
                            </div>
                        </div>

                        {/* TITLE */}
                        <div className="relative z-10 mt-8">

                            <h1
                                className="
                                text-3xl
                                md:text-5xl
                                font-black
                                tracking-tight
                                leading-tight
                                text-white
                            "
                            >
                                NOVA is updating
                                <span className="block mt-1 bg-gradient-to-r from-base-100 via-white to-base-100 bg-clip-text text-transparent">
                                    your digital identity
                                </span>
                            </h1>

                            {/* Animated Loader */}
                            <div className="flex justify-center mt-6">

                                <div className="flex gap-2">

                                    <span className="w-3 h-3 rounded-full bg-white animate-bounce [animation-delay:-0.3s]" />
                                    <span className="w-3 h-3 rounded-full bg-white animate-bounce [animation-delay:-0.15s]" />
                                    <span className="w-3 h-3 rounded-full bg-white animate-bounce" />

                                </div>

                            </div>

                            {/* SUBTEXT */}
                            <p
                                className="
                                mt-6
                                max-w-[560px]
                                text-sm md:text-base
                                leading-relaxed
                                text-gray-400
                                font-medium
                            "
                            >
                                Please wait while NOVA securely synchronizes your profile,
                                optimizes your identity assets, and updates your personalized
                                experience across the platform.
                            </p>

                        </div>



                    </div>
                </div>)
            }

        </div >


    );
};

export default EditProfile;
