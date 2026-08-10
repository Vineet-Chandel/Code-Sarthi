import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import BASE_URL from "../Pages/auth/baseURL";
import { Pencil, Copy, Check, Sparkles, User, Building2, Briefcase, Code2, FileText, Calendar, Loader2 } from "lucide-react";
import Toast from "../Pages/CARRER-PROFILE-CREATION/2/Toast";
import { AnimatePresence } from "framer-motion";
import { addNewUser } from "@/utils/userSlice";

function parseFlatSkills(input) {
    if (!input || typeof input !== "string") return [];
    return input
        .split(',')
        .map(s => s.trim())
        .filter(Boolean)
        .map(name => ({ name, category: null }));
}

function parseCategorizedSkills(rows) {
    if (!Array.isArray(rows)) return [];
    return rows.flatMap(row => {
        let category = (row.category || "").trim().toLowerCase() || null;
        if (category === "uncategorized") category = null;
        return (row.skillsInput || "")
            .split(',')
            .map(s => s.trim())
            .filter(Boolean)
            .map(name => ({ name, category }));
    });
}

function toFlatString(skills) {
    if (!Array.isArray(skills)) return "";
    return skills.map(s => (s?.name || s)).join(', ');
}

function toCategorizedRows(skills) {
    if (!Array.isArray(skills)) return [];
    const grouped = {};
    for (const s of skills) {
        const name = s?.name || s;
        if (!name || typeof name !== "string") continue;
        const key = s?.category || 'Uncategorized';
        if (!grouped[key]) grouped[key] = [];
        grouped[key].push(name.trim());
    }
    return Object.entries(grouped).map(([category, names]) => ({
        id: Math.random().toString(36).substring(2, 9),
        category,
        skillsInput: names.join(', ')
    }));
}

function normalizeSkillsArray(skills) {
    if (!Array.isArray(skills)) return [];
    return skills.map(s => {
        if (typeof s === 'string') {
            if (s === "No skills added yet") return null;
            return { name: s, category: null };
        }
        if (s && typeof s === 'object' && s.name) {
            return {
                name: String(s.name).trim(),
                category: s.category ? String(s.category).trim().toLowerCase() : null
            };
        }
        return null;
    }).filter(Boolean);
}

function deduplicateSkills(skills) {
    if (!Array.isArray(skills)) return [];
    const seen = new Map();
    skills.forEach(s => {
        if (!s || !s.name) return;
        const cleanName = String(s.name).trim();
        if (!cleanName || cleanName.toLowerCase() === "no skills added yet") return;
        const cleanCat = s.category && s.category !== "uncategorized" ? String(s.category).trim().toLowerCase() : null;
        seen.set(cleanName.toLowerCase(), { name: cleanName, category: cleanCat });
    });
    return Array.from(seen.values());
}

const EditProfile = () => {
    const dispatch = useDispatch();
    const user = useSelector(store => store.user.user?.DATA || store.user.user);

    const [editProfileIMG, editProfileIMGisOpen] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [hoveringImg, setHoveringImg] = useState(false);
    const [copiedEmail, setCopiedEmail] = useState(false);

    const [skillInputMode, setSkillInputMode] = useState("simple");
    const [flatSkillsInput, setFlatSkillsInput] = useState("");
    const [categorizedRows, setCategorizedRows] = useState([]);

    const [formData, setFormData] = useState({
        firstName: '',
        middleName: '',
        lastName: '',
        gender: '',
        age: '',
        profession: '',
        college: '',
        about: '',
        skills: []
    });

    // Populate existing user data into form with fallback migration to structured objects
    useEffect(() => {
        if (user) {
            const normalized = normalizeSkillsArray(user.skills || []);
            setFormData({
                firstName: user.firstName || '',
                middleName: user.middleName || '',
                lastName: user.lastName || '',
                gender: user.gender || '',
                age: user.age || '',
                profession: user.profession || '',
                college: user.college || '',
                about: user.about || '',
                skills: normalized
            });
            setFlatSkillsInput(toFlatString(normalized));
            const initRows = toCategorizedRows(normalized);
            if (initRows.length === 0) {
                initRows.push({ id: Math.random().toString(36).substring(2, 9), category: "frontend", skillsInput: "" });
            }
            setCategorizedRows(initRows);
        }
    }, [user]);

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
        const id = Date.now() + Math.random();
        setToasts((prev) => [...prev, { id, type, title, message }]);
    };

    const removeToast = (id) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    };

    const handleSwitchSkillMode = (newMode) => {
        if (newMode === skillInputMode) return;
        const currentSkills = formData.skills || [];
        if (newMode === "simple") {
            setFlatSkillsInput(toFlatString(currentSkills));
        } else if (newMode === "categorized") {
            const rows = toCategorizedRows(currentSkills);
            if (rows.length === 0) {
                rows.push({ id: Math.random().toString(36).substring(2, 9), category: "frontend", skillsInput: "" });
            }
            setCategorizedRows(rows);
        }
        setSkillInputMode(newMode);
    };

    const handleFlatSkillsChange = (e) => {
        const val = e.target.value;
        setFlatSkillsInput(val);
        setFormData(prev => ({
            ...prev,
            skills: parseFlatSkills(val)
        }));
    };

    const handleRowChange = (index, field, value) => {
        const updatedRows = [...categorizedRows];
        updatedRows[index] = { ...updatedRows[index], [field]: value };
        setCategorizedRows(updatedRows);
        setFormData(prev => ({
            ...prev,
            skills: parseCategorizedSkills(updatedRows)
        }));
    };

    const handleAddCategoryRow = () => {
        setCategorizedRows(prev => [...prev, { id: Math.random().toString(36).substring(2, 9), category: "", skillsInput: "" }]);
    };

    const handleRemoveCategoryRow = (index) => {
        const updatedRows = categorizedRows.filter((_, idx) => idx !== index);
        setCategorizedRows(updatedRows);
        setFormData(prev => ({
            ...prev,
            skills: parseCategorizedSkills(updatedRows)
        }));
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        const updatedData = {};

        Object.keys(formData).forEach((key) => {
            let val = formData[key];
            if (key === 'skills') {
                const finalSkills = deduplicateSkills(formData.skills || []);
                const orig = normalizeSkillsArray(user?.skills || []);
                if (JSON.stringify(finalSkills) !== JSON.stringify(orig)) {
                    updatedData[key] = finalSkills;
                }
            } else if (key === 'age') {
                if (val !== '' && Number(val) !== Number(user?.age)) {
                    updatedData[key] = Number(val);
                }
            } else if (typeof val === 'string' && val !== (user?.[key] || '')) {
                updatedData[key] = val.trim();
            }
        });

        if (Object.keys(updatedData).length === 0) {
            addToast({
                type: "error",
                title: "No Changes",
                message: "You haven't modified any details yet."
            });
            return;
        }

        try {
            setSaving(true);
            const res = await axios.patch(
                `${BASE_URL}/profile/me/edit`,
                updatedData,
                { withCredentials: true }
            );

            dispatch(addNewUser(res.data.data));

            addToast({
                type: "success",
                title: "Success!",
                message: "Profile updated successfully ✨"
            });
        } catch (err) {
            addToast({
                type: "error",
                title: "Error",
                message: err?.response?.data || err.message || "Failed to update profile"
            });
        } finally {
            setSaving(false);
        }
    };

    const handleCopyEmail = async (text) => {
        try {
            await navigator.clipboard.writeText(text || '');
            setCopiedEmail(true);
            setTimeout(() => setCopiedEmail(false), 3500);
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
    };

    const removeProfilePic = async () => {
        try {
            setUploading(true);
            const res = await axios.post(
                `${BASE_URL}/remove-profile-pic/upload`,
                {},
                { withCredentials: true }
            );

            dispatch(addNewUser(res.data.data));

            addToast({
                type: "success",
                title: "Removed!",
                message: "Profile photo reset to default",
            });

            editProfileIMGisOpen(false);
        } catch (err) {
            addToast({
                type: "error",
                title: "Error",
                message: err?.response?.data?.message || err.message || "Could not remove photo",
            });
        } finally {
            setUploading(false);
        }
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const uploadForm = new FormData();
        uploadForm.append("profilePic", file);

        try {
            setUploading(true);
            const responsePic = await axios.post(
                `${BASE_URL}/profile-pic/upload`,
                uploadForm,
                { withCredentials: true }
            );

            dispatch(addNewUser(responsePic.data.data));
            editProfileIMGisOpen(false);

            addToast({
                type: "success",
                title: "Uploaded!",
                message: "Profile photo updated successfully"
            });
        } catch (err) {
            addToast({
                type: "error",
                title: "Upload Failed",
                message: err?.response?.data?.message || err.message || "Failed to upload photo"
            });
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="w-screen min-h-screen bg-bg-100 flex justify-center items-start px-3 sm:px-6 md:px-10 py-6 overflow-y-auto bg-black">
            <ToastContainer toasts={toasts} removeToast={removeToast} />

            <div className="w-full  relative mx-auto p-5 sm:p-8 md:p-10 rounded-[36px] bg-black shadow-[0_20px_80px_rgba(0,0,0,0.8)] flex flex-col gap-8 overflow-hidden">

                {/* Ambient Background Gradients */}
                
                
                <div className="pointer-events-none absolute inset-0 rounded-[36px] bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.02),transparent_70%)]" />

                {/* ================= HERO HEADER ================= */}
                <div className="w-full flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 pb-6 border-b border-white/10 z-10">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-3">
                            <Sparkles className="text-white w-4 h-4" />
                            <span className="text-xs font-semibold uppercase tracking-wider text-cyan-300">Identity Hub</span>
                        </div>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black bg-gradient-to-r from-white via-gray-100 to-cyan-400 bg-clip-text text-transparent tracking-tight">
                            Edit Main Profile
                        </h1>
                        <p className="text-base sm:text-lg text-gray-400 mt-2 max-w-2xl font-normal leading-relaxed">
                            Your developer identity is your primary impression on CodeSarthi. Craft your bio, refine your tech stack, and make it unforgettable.
                        </p>
                    </div>
                </div>

                {/* ================= MAIN CONTENT GRID ================= */}
                <div className="w-full grid grid-cols-1 xl:grid-cols-12 gap-8 z-10">

                    {/* ========== LEFT: DEVELOPER IDENTITY PREVIEW ========== */}
                    <div className="xl:col-span-4 rounded-[32px] p-6 sm:p-8 bg-[#0a0a0a] flex flex-col items-center shadow-2xl relative overflow-hidden self-start">
                        <div className="hidden" />

                        {/* Interactive Avatar Card */}
                        <div
                            className="relative group w-[150px] h-[150px] sm:w-[170px] sm:h-[170px] rounded-3xl p-1.5 bg-[#111111] cursor-pointer transition-all duration-300 shadow-xl hover:shadow-2xl"
                            onClick={() => editProfileIMGisOpen(true)}
                            onMouseEnter={() => setHoveringImg(true)}
                            onMouseLeave={() => setHoveringImg(false)}
                        >
                            <div className="relative w-full h-full rounded-[22px] overflow-hidden bg-base-300">
                                <img
                                    src={user?.photoUrl?.url || "https://geographyandyou.com/images/user-profile.png"}
                                    alt="Profile avatar"
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className={`absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col gap-1 justify-center items-center transition-all duration-300 ${hoveringImg ? "opacity-100" : "opacity-0"}`}>
                                    <Pencil className="text-white w-8 h-8 drop-shadow-md" />
                                    <span className="text-[11px] font-semibold tracking-wider uppercase text-white mt-1">Change Photo</span>
                                </div>
                            </div>
                            <div className="absolute -bottom-2 -right-2 bg-base-100 border border-white/20 rounded-full p-2 text-white shadow-lg group-hover:bg-white group-hover:text-black transition-colors duration-300">
                                <Pencil className="w-4 h-4" />
                            </div>
                        </div>

                        {/* Name & Username */}
                        <div className="text-center mt-6">
                            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center justify-center gap-2">
                                {user?.firstName || "User"} {user?.middleName ? `${user.middleName} ` : ""}{user?.lastName || ""}
                            </h2>
                            <p className="text-sm font-medium text-gray-400 mt-1 flex justify-center items-center gap-1.5">
                                @{user?.username || "username"}
                                {user?.isVerified && (
                                    <span className="text-white" title="Verified Member">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                                            <path fill="currentColor" fillRule="evenodd" d="M9.592 3.2a6 6 0 0 1-.495.399c-.298.2-.633.338-.985.408c-.153.03-.313.043-.632.068c-.801.064-1.202.096-1.536.214a2.71 2.71 0 0 0-1.655 1.655c-.118.334-.15.735-.214 1.536a6 6 0 0 1-.068.632c-.07.352-.208.687-.408.985c-.087.13-.191.252-.399.495c-.521.612-.782.918-.935 1.238c-.353.74-.353 1.6 0 2.34c.153.32.414.626.935 1.238c.208.243.312.365.399.495c.2.298.338.633.408.985c.03.153.043.313.068.632c.064.801.096 1.202.214 1.536a2.71 2.71 0 0 0 1.655 1.655c.334.118.735.15 1.536.214c.319.025.479.038.632.068c.352.07.687.209.985.408c.13.087.252.191.495.399c.612.521.918.782 1.238.935c.74.353 1.6.353 2.34 0c.32-.153.626-.414 1.238-.935c.243-.208.365-.312.495-.399c.298-.2.633-.338.985-.408c.153-.03.313-.043.632-.068c.801-.064 1.202-.096 1.536-.214a2.71 2.71 0 0 0 1.655-1.655c.118-.334.15-.735.214-1.536c.025-.319.038-.479.068-.632c.07-.352.209-.687.408-.985c.087-.13.191-.252.399-.495c.521-.612.782-.918.935-1.238c.353-.74.353-1.6 0-2.34c-.153-.32-.414-.626-.935-1.238a6 6 0 0 1-.399-.495a2.7 2.7 0 0 1-.408-.985a6 6 0 0 1-.068-.632c-.064-.801-.096-1.202-.214-1.536a2.71 2.71 0 0 0-1.655-1.655c-.334-.118-.735-.15-1.536-.214a6 6 0 0 1-.632-.068a2.7 2.7 0 0 1-.985-.408a6 6 0 0 1-.495-.399c-.612-.521-.918-.782-1.238-.935a2.71 2.71 0 0 0-2.34 0c-.32.153-.626.414-1.238.935" clipRule="evenodd" />
                                        </svg>
                                    </span>
                                )}
                            </p>
                        </div>

                        {/* Email Copy Badge */}
                        <div className="w-full mt-5 px-4 py-2.5 rounded-2xl bg-[#0a0a0a] flex items-center justify-between gap-3 text-sm transition-colors hover:border-white/15">
                            <span className="text-gray-300 font-medium truncate flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" className="text-gray-400 shrink-0">
                                    <path fill="currentColor" d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2m0 4l-8 5l-8-5V6l8 5l8-5z" />
                                </svg>
                                {user?.gmail || "no-email@codesarthi.in"}
                            </span>
                            <button
                                onClick={() => handleCopyEmail(user?.gmail)}
                                title="Copy Email"
                                className="p-1.5 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-all duration-200 shrink-0"
                            >
                                {copiedEmail ? <Check className="w-4 h-4 text-emerald-400 animate-in zoom-in-50" /> : <Copy className="w-4 h-4" />}
                            </button>
                        </div>

                        {/* Divider */}
                        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-6" />

                        {/* Attribute Cards */}
                        <div className="w-full flex flex-col gap-3">

                            {/* Institution / College */}
                            <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-[#0a0a0a]  transition-colors">
                                <div className="p-2.5 rounded-xl  text-white">
                                    <Building2 className="w-6 h-6" />
                                </div>
                                <div className="flex flex-col min-w-0">
                                    <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Institution / Organization</span>
                                    <span className="text-sm font-semibold text-white truncate">{user?.college || "Not specified"}</span>
                                </div>
                            </div>

                            {/* Profession */}
                            <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-[#0a0a0a]  transition-colors">
                                <div className="p-2.5 rounded-xl text-white">
                                    <Briefcase className="w-6 h-6" />
                                </div>
                                <div className="flex flex-col min-w-0">
                                    <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Professional Title</span>
                                    <span className="text-sm font-semibold text-white truncate">{user?.profession || "Developer"}</span>
                                </div>
                            </div>

                            {/* Demographics */}
                            <div className="grid grid-cols-2 gap-3">
                                <div className="p-3.5 rounded-2xl bg-[#0a0a0a] flex flex-col">
                                    <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Gender</span>
                                    <span className="text-sm font-semibold text-white capitalize mt-1">{user?.gender || "Unspecified"}</span>
                                </div>
                                <div className="p-3.5 rounded-2xl bg-[#0a0a0a] flex flex-col">
                                    <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Age</span>
                                    <span className="text-sm font-semibold text-white mt-1">{user?.age ? `${user.age} yrs` : "N/A"}</span>
                                </div>
                            </div>

                            {/* About Bio */}
                            <div className="p-4 rounded-2xl bg-[#0a0a0a] space-y-2">
                                <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                                    <FileText className="w-3.5 h-3.5 text-white" /> Bio & About
                                </span>
                                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed break-words">
                                    {user?.about || "Complete your profile to share your journey and background here!"}
                                </p>
                            </div>

                            {/* Tech Stack Chips */}
                            <div className="p-4 rounded-2xl bg-[#0a0a0a] space-y-3">
                                <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                                    <Code2 className="w-3.5 h-3.5 text-white" /> Primary Tech Stack
                                </span>
                                <div className="flex flex-wrap gap-2">
                                    {Array.isArray(user?.skills) && user.skills.length > 0 ? (
                                        user.skills.map((skill, index) => {
                                            const sName = skill?.name || skill;
                                            const sCat = skill?.category && skill.category !== "uncategorized" ? skill.category : null;
                                            if (sName === "No skills added yet") return null;
                                            return (
                                                <span key={index} className="px-3 py-1 text-xs font-semibold rounded-xl bg-white text-black shadow-sm transition-transform duration-200 hover:scale-105 inline-flex items-center gap-1">
                                                    <span>{sName}</span>
                                                    {sCat && (
                                                        <span className="text-[9px] font-mono uppercase tracking-tighter text-gray-600 ml-0.5">
                                                            [{sCat}]
                                                        </span>
                                                    )}
                                                </span>
                                            );
                                        })
                                    ) : (
                                        <span className="text-xs text-gray-500 italic">No technologies added yet. Add some in the form!</span>
                                    )}
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* ========== RIGHT: EDIT PROFILE FORM ========== */}
                    <div className="xl:col-span-8 rounded-[32px] p-6 sm:p-10 bg-[#0a0a0a] shadow-xl flex flex-col justify-between relative overflow-hidden">

                        <div>
                            <div className="mb-8 border-b border-white/10 pb-5">
                                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
                                    Profile Settings
                                </h2>
                                <p className="text-sm sm:text-base text-gray-400 mt-1">
                                    Update your personal identity, background details, and showcased technical proficiencies.
                                </p>
                            </div>

                            <form onSubmit={handleUpdate} className="space-y-8">

                                {/* SECTION 1: PERSONAL IDENTITY */}
                                <div className="space-y-4">
                                    <h3 className="text-sm font-semibold text-white uppercase tracking-wider flex items-center gap-2">
                                        <User className="w-4 h-4" /> 1. Personal Identity
                                    </h3>

                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                                        <div className="space-y-1.5">
                                            <label htmlFor="firstName" className="text-xs font-semibold text-gray-300 ml-1">First Name</label>
                                            <input
                                                id="firstName"
                                                type="text"
                                                placeholder="e.g. Vineet"
                                                className="w-full rounded-2xl bg-black px-4 py-3 text-white placeholder-gray-600 text-sm transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-white/30"
                                                value={formData.firstName}
                                                onChange={handleChange}
                                            />
                                        </div>

                                        <div className="space-y-1.5">
                                            <label htmlFor="middleName" className="text-xs font-semibold text-gray-300 ml-1">Middle Name (Optional)</label>
                                            <input
                                                id="middleName"
                                                type="text"
                                                placeholder="Middle Name"
                                                className="w-full rounded-2xl bg-black px-4 py-3 text-white placeholder-gray-600 text-sm transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-white/30"
                                                value={formData.middleName}
                                                onChange={handleChange}
                                            />
                                        </div>

                                        <div className="space-y-1.5">
                                            <label htmlFor="lastName" className="text-xs font-semibold text-gray-300 ml-1">Last Name</label>
                                            <input
                                                id="lastName"
                                                type="text"
                                                placeholder="e.g. Chandel"
                                                className="w-full rounded-2xl bg-black px-4 py-3 text-white placeholder-gray-600 text-sm transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-white/30"
                                                value={formData.lastName}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
                                        <div className="space-y-1.5">
                                            <label htmlFor="gender" className="text-xs font-semibold text-gray-300 ml-1">Gender Identity</label>
                                            <div className="relative">
                                                <select
                                                    id="gender"
                                                    className="w-full rounded-2xl bg-black px-4 py-3 text-white text-sm appearance-none cursor-pointer transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-white/30"
                                                    value={formData.gender}
                                                    onChange={handleChange}
                                                >
                                                    <option value="" disabled className="text-gray-500">Select Gender</option>
                                                    <option value="male" className="bg-gray-900 text-white">Male</option>
                                                    <option value="female" className="bg-gray-900 text-white">Female</option>
                                                    <option value="other" className="bg-gray-900 text-white">Other</option>
                                                </select>
                                                <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center px-2 text-gray-400">
                                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-1.5">
                                            <label htmlFor="age" className="text-xs font-semibold text-gray-300 ml-1">Age</label>
                                            <input
                                                id="age"
                                                type="number"
                                                min="10"
                                                max="100"
                                                placeholder="e.g. 21"
                                                className="w-full rounded-2xl bg-black px-4 py-3 text-white placeholder-gray-600 text-sm transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-white/30 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                                value={formData.age}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* SECTION 2: PROFESSIONAL & ACADEMICS */}
                                <div className="space-y-4 pt-4 border-t border-white/10">
                                    <h3 className="text-sm font-semibold text-white uppercase tracking-wider flex items-center gap-2">
                                        <Briefcase className="w-4 h-4" /> 2. Academic & Professional Background
                                    </h3>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                        <div className="space-y-1.5">
                                            <label htmlFor="college" className="text-xs font-semibold text-gray-300 ml-1">University / Company Name</label>
                                            <input
                                                id="college"
                                                type="text"
                                                placeholder="e.g. IIT Kanpur / Google"
                                                className="w-full rounded-2xl bg-black px-4 py-3 text-white placeholder-gray-600 text-sm transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-white/30"
                                                value={formData.college}
                                                onChange={handleChange}
                                            />
                                        </div>

                                        <div className="space-y-1.5">
                                            <label htmlFor="profession" className="text-xs font-semibold text-gray-300 ml-1">Professional Headline</label>
                                            <input
                                                id="profession"
                                                type="text"
                                                placeholder="e.g. Full-Stack Engineer / AI Researcher"
                                                className="w-full rounded-2xl bg-black px-4 py-3 text-white placeholder-gray-600 text-sm transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-white/30"
                                                value={formData.profession}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* SECTION 3: BIO & TECH STACK */}
                                <div className="space-y-6 pt-4 border-t border-white/10">
                                    <div>
                                        <h3 className="text-sm font-semibold text-white uppercase tracking-wider flex items-center gap-2">
                                            <Code2 className="w-4 h-4" /> 3. Bio & Tech Stack Studio
                                        </h3>
                                        <p className="text-xs text-gray-400 mt-1">
                                            Manage your technical proficiencies using either a simple flat list or a structured category-by-category view. Both modes stay entirely in sync!
                                        </p>

                                        {/* Segmented Mode Toggle Control */}
                                        <div className="inline-flex rounded-xl bg-black p-1 mt-4 mb-1">
                                            <button
                                                type="button"
                                                onClick={() => handleSwitchSkillMode("simple")}
                                                className={`px-5 py-2 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer ${
                                                    skillInputMode === "simple"
                                                        ? "bg-[#2b2b2b] text-white shadow-sm"
                                                        : "text-gray-400 hover:text-gray-200"
                                                }`}
                                            >
                                                Simple list
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => handleSwitchSkillMode("categorized")}
                                                className={`px-5 py-2 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer ${
                                                    skillInputMode === "categorized"
                                                        ? "bg-[#2b2b2b] text-white shadow-sm"
                                                        : "text-gray-400 hover:text-gray-200"
                                                }`}
                                            >
                                                By category
                                            </button>
                                        </div>
                                    </div>

                                    {/* MODE A: SIMPLE LIST */}
                                    {skillInputMode === "simple" ? (
                                        <div className="space-y-4">
                                            <div className="p-4 rounded-2xl bg-black space-y-2.5">
                                                <div className="flex justify-between items-center text-xs text-gray-300 font-semibold">
                                                    <span>Active Tech Stack ({formData.skills?.length || 0} configured)</span>
                                                    {formData.skills?.length > 0 && (
                                                        <button
                                                            type="button"
                                                            onClick={() => { setFlatSkillsInput(""); setFormData(prev => ({ ...prev, skills: [] })); }}
                                                            className="text-[11px] text-red-400 hover:text-red-300 underline transition-colors cursor-pointer"
                                                        >
                                                            Clear All
                                                        </button>
                                                    )}
                                                </div>
                                                
                                                <div className="flex flex-wrap gap-2 items-center min-h-[36px]">
                                                    {formData.skills && formData.skills.length > 0 ? (
                                                        formData.skills.map((s, idx) => (
                                                            <span 
                                                                key={idx} 
                                                                className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-xl bg-white text-black shadow-sm transition-all"
                                                            >
                                                                <span>{s?.name || s}</span>
                                                                {s?.category && s.category !== "uncategorized" && (
                                                                    <span className="text-[9px] font-mono text-gray-400 uppercase tracking-tight ml-0.5">
                                                                        [{s.category}]
                                                                    </span>
                                                                )}
                                                            </span>
                                                        ))
                                                    ) : (
                                                        <span className="text-xs text-gray-500 italic py-1">
                                                            No skills configured yet. Type below to populate your stack!
                                                        </span>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="space-y-1.5">
                                                <label htmlFor="flat-skills-input" className="text-xs font-bold text-gray-300 ml-1 flex items-center justify-between">
                                                    <span>Flat Comma-Separated List</span>
                                                    <span className="text-gray-500 font-normal text-[11px]">(Separate with commas, e.g. react, nextjs, nodejs, css)</span>
                                                </label>
                                                <input
                                                    id="flat-skills-input"
                                                    type="text"
                                                    placeholder="e.g. react, nextjs, nodejs, css"
                                                    className="w-full rounded-2xl bg-black px-4 py-3 text-white placeholder-gray-600 text-sm transition-all duration-200 focus:outline-none focus:border-white/40 focus:ring-2 focus:ring-white/5"
                                                    value={flatSkillsInput}
                                                    onChange={handleFlatSkillsChange}
                                                />
                                                <p className="text-[11px] text-gray-500 ml-1 italic">
                                                    New entries here are uncategorized by default and sync smoothly with the categorized mode.
                                                </p>
                                            </div>
                                        </div>
                                    ) : (
                                        /* MODE B: CATEGORIZED ENTRY */
                                        <div className="space-y-4">
                                            <div className="space-y-3">
                                                {categorizedRows.map((row, index) => (
                                                    <div key={row.id || index} className="p-4 rounded-2xl bg-black space-y-3">
                                                        <div className="flex items-center justify-between gap-3">
                                                            <div className="w-[200px] sm:w-[260px]">
                                                                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                                                                    Category Name
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    placeholder="e.g. frontend, backend, database"
                                                                    value={row.category}
                                                                    onChange={(e) => handleRowChange(index, "category", e.target.value)}
                                                                    className="w-full rounded-xl bg-[#0a0a0a] px-3 py-1.5 text-white text-xs uppercase tracking-wider font-semibold placeholder:normal-case placeholder:font-normal placeholder-gray-600 focus:outline-none focus:border-white/40"
                                                                />
                                                            </div>
                                                            {categorizedRows.length > 1 && (
                                                                <button
                                                                    type="button"
                                                                    onClick={() => handleRemoveCategoryRow(index)}
                                                                    className="text-gray-400 hover:text-red-400 text-xs px-2.5 py-1.5 rounded-lg border border-white/5 hover:border-red-400/30 transition-colors cursor-pointer self-end mb-0.5"
                                                                    title="Remove category row"
                                                                >
                                                                    ✕ Remove
                                                                </button>
                                                            )}
                                                        </div>
                                                        <div>
                                                            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                                                                Skills (comma-separated)
                                                            </label>
                                                            <input
                                                                type="text"
                                                                placeholder="e.g. react, tailwind, nextjs"
                                                                value={row.skillsInput}
                                                                onChange={(e) => handleRowChange(index, "skillsInput", e.target.value)}
                                                                className="w-full rounded-xl bg-[#0a0a0a] px-3.5 py-2.5 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-white/40"
                                                            />
                                                        </div>
                                                        {/* Live chips preview for this category row */}
                                                        <div className="flex flex-wrap gap-1.5 pt-0.5">
                                                            {row.skillsInput
                                                                .split(",")
                                                                .map(s => s.trim())
                                                                .filter(Boolean)
                                                                .map((sName, sIdx) => (
                                                                    <span
                                                                        key={sIdx}
                                                                        className="inline-flex items-center px-2.5 py-0.5 rounded-lg bg-white text-black text-gray-300 text-[11px] font-medium"
                                                                    >
                                                                        {sName}
                                                                    </span>
                                                                ))}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pt-1">
                                                <button
                                                    type="button"
                                                    onClick={handleAddCategoryRow}
                                                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-black hover:bg-[#2a2a2a] text-white text-xs font-semibold transition-all cursor-pointer shadow-sm"
                                                >
                                                    <span>+ Add Category</span>
                                                </button>
                                                <span className="text-[11px] text-gray-500 italic">
                                                    Unlabeled category names default to "Uncategorized".
                                                </span>
                                            </div>
                                        </div>
                                    )}

                                    {/* ABOUT BIO TEXTAREA */}
                                    <div className="space-y-1.5 pt-2">
                                        <label htmlFor="about" className="text-xs font-semibold text-gray-300 ml-1">About Me & Professional Bio</label>
                                        <textarea
                                            id="about"
                                            rows={4}
                                            placeholder="Tell the community about your passions, achievements, and technical goals..."
                                            className="w-full rounded-2xl bg-black px-4 py-3 text-white placeholder-gray-600 text-sm leading-relaxed resize-y transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-white/30"
                                            value={formData.about}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                {/* SUBMIT BUTTON */}
                                <div className="pt-6 border-t border-white/10 flex justify-end">
                                    <button
                                        type="submit"
                                        disabled={saving}
                                        className="relative inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-2xl font-bold text-sm sm:text-base text-black bg-white shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none cursor-pointer overflow-hidden"
                                    >
                                        {saving ? (
                                            <>
                                                <Loader2 className="w-5 h-5 animate-spin text-black" />
                                                <span>Synchronizing Changes...</span>
                                            </>
                                        ) : (
                                            <>
                                                <Sparkles className="w-5 h-5 text-black" />
                                                <span>Save Profile Changes</span>
                                            </>
                                        )}
                                    </button>
                                </div>

                            </form>
                        </div>

                    </div>
                </div>
            </div>

            {/* ================= PROFILE PHOTO MODAL ================= */}
            {editProfileIMG && (
                <div
                    className="z-50 fixed inset-0 bg-black/80 backdrop-blur-sm animate-fadeIn flex justify-center items-center p-4"
                    onClick={() => editProfileIMGisOpen(false)}
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="relative w-full max-w-[440px] overflow-hidden rounded-3xl border border-white/15 bg-base-100 shadow-[0_25px_90px_rgba(0,0,0,0.7)] animate-in fade-in zoom-in-95 duration-200"
                    >
                        <div className="absolute inset-x-0 top-0 h-[2px] hidden opacity-80" />

                        {/* HEADER */}
                        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
                            <div className="flex items-center gap-3.5">
                                <div className="flex items-center justify-center w-11 h-11 rounded-2xl bg-[#0a0a0a] text-white">
                                    <Sparkles className="w-5 h-5" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold tracking-tight text-white">
                                        Update Profile Avatar
                                    </h2>
                                    <p className="text-xs text-gray-400">
                                        Upload a crisp photo or reset to default
                                    </p>
                                </div>
                            </div>

                            <button
                                onClick={() => editProfileIMGisOpen(false)}
                                className="w-8 h-8 rounded-xl flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all"
                            >
                                ✕
                            </button>
                        </div>

                        {/* BODY */}
                        <div className="p-6 space-y-5">
                            <div className="flex justify-center">
                                <div className="relative p-1.5 rounded-full bg-[#0a0a0a] shadow-2xl">
                                    <img
                                        src={user?.photoUrl?.url || "https://geographyandyou.com/images/user-profile.png"}
                                        alt="Current avatar preview"
                                        className="w-28 h-28 rounded-full object-cover border-4 border-base-100 shadow-inner"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2.5">
                                <label className="group cursor-pointer flex items-center justify-center gap-2.5 w-full py-3.5 rounded-2xl bg-white text-black font-bold text-sm shadow-lg hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all duration-200">
                                    <Sparkles className="w-4 h-4" />
                                    <span>Upload New Avatar</span>
                                    <input
                                        type="file"
                                        className="hidden"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                    />
                                </label>

                                <button
                                    className="w-full py-3.5 rounded-2xl border border-red-500/25 bg-red-500/5 text-red-400 font-semibold text-sm hover:bg-red-500/10 hover:border-red-500/40 transition-all duration-200"
                                    onClick={removeProfilePic}
                                >
                                    Remove & Reset to Default
                                </button>
                            </div>
                        </div>

                        {/* FOOTER */}
                        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-white/10 bg-white/[0.02]">
                            <button
                                onClick={() => editProfileIMGisOpen(false)}
                                className="px-5 py-2 rounded-xl text-sm font-medium text-gray-400 hover:bg-white/5 hover:text-white transition-all"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ================= UPLOADING LOADER MODAL ================= */}
            {uploading && (
                <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/80 backdrop-blur-md px-4 animate-in fade-in duration-200">
                    <div className="absolute w-[450px] h-[450px] bg-white/5 blur-[120px] rounded-full animate-pulse" />

                    <div className="relative w-full max-w-[640px] overflow-hidden rounded-[36px] border border-white/15 bg-base-200 shadow-[0_25px_80px_rgba(0,0,0,0.7)] p-8 sm:p-12 flex flex-col items-center text-center">
                        <div className="absolute inset-x-0 top-0 h-[2px] hidden opacity-90" />

                        <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white text-black px-4 py-1.5 text-xs font-semibold">
                            <span className="h-2 w-2 rounded-full bg-black animate-ping" />
                            Secure Cloud Synchronization
                        </div>

                        <div className="relative my-2">
                            <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/5 shadow-2xl">
                                <img
                                    src="https://res.cloudinary.com/dggoaxqxl/image/upload/q_auto/f_auto/v1778989004/CS_Identity_Manager_amyjyi.webp"
                                    alt="NOVA Identity Manager"
                                    className="w-[140px] h-[140px] sm:w-[180px] sm:h-[180px] object-cover scale-[1.02]"
                                />
                                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent" />
                            </div>
                        </div>

                        <h3 className="text-2xl sm:text-3xl font-black text-white mt-6 tracking-tight">
                            NOVA is upgrading <span className="text-white">your digital avatar</span>
                        </h3>

                        <div className="flex justify-center mt-5 gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-white animate-bounce [animation-delay:-0.3s]" />
                            <span className="w-2.5 h-2.5 rounded-full bg-white animate-bounce [animation-delay:-0.15s]" />
                            <span className="w-2.5 h-2.5 rounded-full bg-white animate-bounce" />
                        </div>

                        <p className="mt-5 max-w-[480px] text-xs sm:text-sm text-gray-400 leading-relaxed">
                            Please wait while we process, crop, and securely synchronize your avatar across all CodeSarthi developer services.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EditProfile;
