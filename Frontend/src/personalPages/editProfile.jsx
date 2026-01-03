import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const EditProfile = () => {
    const user = useSelector((store) => store.user);
    const [profile, setProfile] = useState({
        firstName: `${user.user.FirstName}`,
        middleName: `${user.user.MiddleName}`,
        lastName: `${user.user.LastName}`,
        username: `${user.user.username}`,
        email: `${user.user.Gmail}`,
        about: `${user.user.about}`,
        website: "null",
        skills: `${user.user.skills.join(', ')}`,
        avatar: `${user.user.photoURL}`,
        banner: `${user.user.bannerURL}`,
        notifications: true,
        publicProfile: true
    });

    const [previewAvatar, setPreviewAvatar] = useState(`${user.user.photoURL}`);
    const [previewBanner, setPreviewBanner] = useState(`${user.user.bannerURL}`);
    const [activeTab, setActiveTab] = useState('basic');
    const [isSaving, setIsSaving] = useState(false);

    const tabs = [
        { id: 'basic', label: 'Credentials', icon: <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><g fill="none"><path fill="#0f0f0f" d="M4 18a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2" opacity="0.16" /><path stroke="#ffffff" stroke-linejoin="round" stroke-width="1.5" d="M4 18a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z" /><circle cx="12" cy="7" r="3" stroke="#ffffff" stroke-width="1.5" /></g></svg> },
        { id: 'social', label: 'Social Links', icon: <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path fill="#ffffff" d="M17.5 5.999a1.1 1.1 0 0 1 .777 1.878L16.557 9.6l.307.308c.585.584.906 1.362.906 2.192s-.321 1.607-.906 2.191l-4.172 4.172c-.584.584-1.361.906-2.191.906s-1.607-.322-2.191-.906L8 18.154l-1.723 1.723c-.215.215-.495.322-.777.322s-.562-.107-.777-.322a1.1 1.1 0 0 1 0-1.557l1.72-1.72l-.308-.309c-.583-.584-.905-1.361-.905-2.191s.321-1.608.905-2.192l4.173-4.173c.584-.584 1.387-.875 2.191-.875s1.607.291 2.191.875l.31.308l1.723-1.723c.215-.215.495-.321.777-.321m0-2c-.828 0-1.605.321-2.191.908l-.492.491a5.2 5.2 0 0 0-2.316-.539c-1.363 0-2.677.533-3.605 1.461l-4.172 4.173A5.06 5.06 0 0 0 3.23 14.1c0 .822.192 1.616.558 2.327l-.479.48A3.08 3.08 0 0 0 2.4 19.1c0 .827.322 1.605.908 2.191c.584.586 1.363.908 2.191.908s1.605-.322 2.191-.908l.48-.48a5.1 5.1 0 0 0 2.328.559a5.06 5.06 0 0 0 3.605-1.492l4.172-4.172a5.06 5.06 0 0 0 1.492-3.605c0-.824-.192-1.617-.558-2.328l.479-.48A3.08 3.08 0 0 0 20.6 7.1c0-.828-.322-1.606-.908-2.192a3.07 3.07 0 0 0-2.192-.909m-6.1 7.169c.017.535.233 1.036.613 1.416c.381.38.881.598 1.416.614l-1.832 1.831a2.1 2.1 0 0 0-.613-1.415A2.1 2.1 0 0 0 9.568 13zm1.1-2.139a.9.9 0 0 0-.637.262l-4.172 4.172a.9.9 0 0 0-.26.637c0 .24.092.467.26.635l.309.308l.723-.723c.215-.215.495-.321.777-.321s.562.106.777.321a1.1 1.1 0 0 1 0 1.557l-.72.723l.308.308c.168.168.401.253.636.253s.468-.084.637-.253l4.172-4.173a.9.9 0 0 0 .26-.635a.9.9 0 0 0-.26-.637l-.31-.309l-.723.723c-.215.215-.495.322-.777.322s-.562-.107-.777-.322a1.1 1.1 0 0 1 0-1.557l.72-.72l-.307-.309a.9.9 0 0 0-.636-.262" /></svg> },
        { id: 'skills', label: 'Tech Stacks', icon: <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 512 512"><path fill="#ffffff" d="M20.22 21.75v65.5l92 70.625l-60.126 58.094l235.656 157.5l-83.844-5.845l93.25 76.53l-77.562 5.47l113.5 40.656l-4.625-69.03h-21.783c0-37.79-.747-91.963 32.5-100c-5.097-7.648-8.187-17.65-8.187-28.625c0-23.993 14.784-43.47 33-43.47s32.97 19.475 32.97 43.47c0 11.247-3.24 21.472-8.564 29.188c30.514 8.638 32.875 61.79 32.875 99.437h-22.967l-5.25 69.813l91.906-59.594l-49.064 4.374l57.594-105.53l-60.156 16.905l57.5-92.814l-68.53 28.813l54.217-102.345l-72.655 43.063l18.53-123.407l-51.717 115.94l-71.125-144.032l23 165.062l-66.25-52.5l42.468 85.75l-120.436-76.97l73.594-54.655L123.188 21.75H20.218z" /></svg> },
        { id: 'appearance', label: 'Appearance', icon: <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 20 20"><g fill="#ffffff"><g opacity="0.2"><path d="M10.59 5.939c3.8 1.018 6.105 4.772 5.135 8.395c-1.094 4.08-6.298 7.344-8.882 4.56c-.823-.886-1.035-1.86-.89-3.16c.025-.225.046-.372.113-.794c.162-1.032.16-1.44-.054-1.788c-.207-.336-.578-.423-1.678-.436l-.108-.002c-1.548-.022-2.3-.28-2.682-1.363c-1.27-3.589 4.779-6.556 9.046-5.412" /><path fill-rule="evenodd" d="M13.843 4.43c-.512-.02-.982-.338-1.306-.946c-.557-1.048-.679-2.567.111-2.987s1.98.53 2.538 1.579c.3.565.322 1.096.107 1.518a1 1 0 0 1 .448.454l4.093 8.4a.652.652 0 0 1-1.149.611l-4.708-8.07a1 1 0 0 1-.134-.559" clip-rule="evenodd" /></g><path fill-rule="evenodd" d="M14.725 13.334c.97-3.623-1.336-7.377-5.135-8.395C5.323 3.795-.725 6.762.544 10.35c.383 1.084 1.134 1.341 2.682 1.363l.108.002c1.1.013 1.471.1 1.678.436c.214.348.216.756.054 1.788c-.067.422-.088.569-.113.794c-.145 1.3.067 2.274.89 3.16c2.584 2.784 7.788-.48 8.882-4.56M1.486 10.017c-.908-2.57 4.217-5.084 7.845-4.112c3.277.878 5.252 4.093 4.428 7.17c-.924 3.446-5.287 6.182-7.183 4.14c-.594-.64-.745-1.333-.63-2.37c.024-.205.044-.344.108-.75c.2-1.275.197-1.836-.19-2.467c-.465-.756-1.059-.894-2.517-.912l-.107-.002c-1.159-.016-1.562-.154-1.754-.697" clip-rule="evenodd" /><path d="M4.75 9.5a1.25 1.25 0 1 1 0-2.5a1.25 1.25 0 0 1 0 2.5m4 0a1.25 1.25 0 1 1 0-2.5a1.25 1.25 0 0 1 0 2.5m2.5 3a1.25 1.25 0 1 1 0-2.5a1.25 1.25 0 0 1 0 2.5M9.75 16a1.25 1.25 0 1 1 0-2.5a1.25 1.25 0 0 1 0 2.5m3.62-12.395a1 1 0 0 1 1.371.443l4.093 8.4a.652.652 0 0 1-1.149.611l-4.708-8.07a1 1 0 0 1 .394-1.384" /><path fill-rule="evenodd" d="M11.538 3.484c.486.915 1.305 1.171 2.097.75c.791-.42 1.038-1.243.551-2.158C13.63 1.028 12.438.078 11.648.497s-.668 1.939-.11 2.987m.882-.47a3.2 3.2 0 0 1-.32-1.137a2 2 0 0 1 .018-.496l.018.009c.05.024.205.096.403.254c.302.241.602.596.764.901c.229.43.164.646-.138.807c-.3.16-.516.092-.745-.337" clip-rule="evenodd" /><path d="M1.15 1.878a.514.514 0 0 1 .728-.727l16.971 16.971a.514.514 0 0 1-.727.727z" /></g></svg> },
        { id: 'preferences', label: 'Preferences', icon: <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path fill="#ffffff" d="m9.25 22l-.4-3.2q-.325-.125-.612-.3t-.563-.375L4.7 19.375l-2.75-4.75l2.575-1.95Q4.5 12.5 4.5 12.338v-.675q0-.163.025-.338L1.95 9.375l2.75-4.75l2.975 1.25q.275-.2.575-.375t.6-.3l.4-3.2h5.5l.4 3.2q.325.125.613.3t.562.375l2.975-1.25l2.75 4.75l-2.575 1.95q.025.175.025.338v.674q0 .163-.05.338l2.575 1.95l-2.75 4.75l-2.95-1.25q-.275.2-.575.375t-.6.3l-.4 3.2zM11 20h1.975l.35-2.65q.775-.2 1.438-.587t1.212-.938l2.475 1.025l.975-1.7l-2.15-1.625q.125-.35.175-.737T17.5 12t-.05-.787t-.175-.738l2.15-1.625l-.975-1.7l-2.475 1.05q-.55-.575-1.212-.962t-1.438-.588L13 4h-1.975l-.35 2.65q-.775.2-1.437.588t-1.213.937L5.55 7.15l-.975 1.7l2.15 1.6q-.125.375-.175.75t-.05.8q0 .4.05.775t.175.75l-2.15 1.625l.975 1.7l2.475-1.05q.55.575 1.213.963t1.437.587zm1.05-4.5q1.45 0 2.475-1.025T15.55 12t-1.025-2.475T12.05 8.5q-1.475 0-2.488 1.025T8.55 12t1.013 2.475T12.05 15.5M12 12" /></svg> }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-950 p-4 md:p-8">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                                Edit Profile
                            </h1>
                            <p className="text-gray-400 mt-2">Customize your developer identity</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <button

                                disabled={isSaving}
                                className="relative group bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl font-medium hover:from-blue-500 hover:to-blue-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSaving ? (
                                    <span className="flex items-center gap-2">
                                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                        Saving...
                                    </span>
                                ) : 'Save Changes'}
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl"></div>
                            </button>
                            <button className="px-4 py-3 text-gray-400 hover:text-white transition-colors border border-gray-700/50 rounded-xl hover:border-gray-600">
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Left Sidebar - Profile Preview */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-8">
                            {/* Profile Preview Card */}
                            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/70 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-6 shadow-2xl">
                                <div className="relative mb-6">
                                    {/* Banner */}
                                    <div className="h-32 rounded-xl bg-gradient-to-r from-blue-900/30 to-purple-900/30 border border-gray-700/50 overflow-hidden mb-4">
                                        {previewBanner ? (
                                            <img src={user.user.bannerURL} alt="Banner" className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <span className="text-gray-500">Banner Preview</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Avatar */}
                                    <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
                                        <div className="relative w-24 h-24 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 border-4 border-gray-900 overflow-hidden shadow-xl">

                                            {user?.user?.photoURL ? (
                                                <img
                                                    src={user.user.photoURL}
                                                    alt="Avatar"
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500/10 to-purple-500/10">
                                                    <span className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                                                        {user?.user?.FirstName?.[0] || "?"}
                                                        {user?.user?.LastName?.[0] || ""}
                                                    </span>
                                                </div>
                                            )}

                                            <div className="absolute inset-0 border-2 border-blue-500/20 rounded-2xl"></div>
                                        </div>
                                    </div>

                                </div>

                                {/* Preview Info */}
                                <div className="mt-12 text-center">
                                    <h2 className="text-xl font-bold text-white">
                                        {user.user.FirstName || 'First'} {user.user.MiddleName || ''} {user.user.LastName || 'Last'}
                                    </h2>
                                    <p className="text-gray-400 text-sm mt-1">@{user.user.username || 'username'}</p>
                                    <p className="text-gray-500 text-sm mt-2">{user.user.title || 'Developer'}</p>

                                    <div className="mt-4">
                                        <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            {user.user.location || 'Location not set'}
                                        </div>
                                    </div>

                                    {/* Stats Preview */}
                                    <div className="grid grid-cols-3 gap-3 mt-6">
                                        <div className="text-center p-3 bg-gray-800/30 rounded-lg">
                                            <div className="text-lg font-bold text-blue-400">{user.user.skills.length}</div>
                                            <div className="text-xs text-gray-400">Skills</div>
                                        </div>
                                        <div className="text-center p-3 bg-gray-800/30 rounded-lg">
                                            <div className="text-lg font-bold text-purple-400">{0 || "null"}</div>
                                            <div className="text-xs text-gray-400">Projects</div>
                                        </div>
                                        <div className="text-center p-3 bg-gray-800/30 rounded-lg">
                                            <div className="text-lg font-bold text-amber-400">{0 || "null"}</div>
                                            <div className="text-xs text-gray-400">Connection</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Upload Buttons */}
                            <div className="mt-6 space-y-4">
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Profile Image</label>
                                    <label className="relative group cursor-pointer">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                        />
                                        <div className="px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl hover:border-blue-500/50 transition-colors text-center">
                                            <span className="text-gray-300 group-hover:text-blue-300">Upload Image</span>
                                        </div>
                                    </label>
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Cover Banner</label>
                                    <label className="relative group cursor-pointer">
                                        <input
                                            type="file"
                                            accept="image/*"

                                            className="hidden"
                                        />
                                        <div className="px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl hover:border-purple-500/50 transition-colors text-center">
                                            <span className="text-gray-300 group-hover:text-purple-300">Upload Banner</span>
                                        </div>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Content - Forms */}
                    <div className="lg:col-span-3">
                        {/* Tabs */}
                        <div className="flex overflow-x-auto space-x-1 mb-8 pb-2 border-b border-gray-800">
                            {tabs.map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center gap-2 px-4 py-3 rounded-t-lg transition-all whitespace-nowrap ${activeTab === tab.id
                                        ? 'bg-gray-800/50 border-t border-x border-gray-700/50 text-white'
                                        : 'text-gray-400 hover:text-gray-300 hover:bg-gray-800/30'
                                        }`}
                                >
                                    <span>{tab.icon}</span>
                                    {tab.label}
                                </button>
                            ))}
                        </div>

                        {/* Tab Content */}
                        <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/70 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-6 shadow-2xl">
                            {/* Basic Info Tab */}
                            {activeTab === 'basic' && (
                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm text-gray-400 mb-2">
                                                <span className="flex items-center gap-2">
                                                    First Name
                                                </span>
                                            </label>
                                            <input
                                                type="text"
                                                name="firstName"
                                                className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all"
                                                placeholder="Enter first name"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm text-gray-400 mb-2">
                                                <span className="flex items-center gap-2">
                                                    Middle Name

                                                </span>
                                            </label>
                                            <input
                                                type="text"
                                                name="lastName"
                                                className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all"
                                                placeholder="Enter last name"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm text-gray-400 mb-2">
                                                <span className="flex items-center gap-2">
                                                    Last Name

                                                </span>
                                            </label>
                                            <input
                                                type="text"
                                                name="lastName"
                                                className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all"
                                                placeholder="Enter last name"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm text-gray-400 mb-2">Professional Title</label>
                                        <input
                                            type="text"
                                            name="title"
                                            value={profile.title}

                                            className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all"
                                            placeholder="e.g., Senior Frontend Developer"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm text-gray-400 mb-2">Location</label>
                                        <div className="relative">
                                            <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            <input
                                                type="text"
                                                name="location"
                                                value={profile.location}

                                                className="w-full pl-12 pr-4 py-3 bg-gray-900/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all"
                                                placeholder="City, Country"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm text-gray-400 mb-2">Bio / About</label>
                                        <textarea
                                            name="bio"
                                            value={profile.bio}

                                            rows="4"
                                            className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all resize-none"
                                            placeholder="Tell us about yourself, your experience, and your passions..."
                                        />
                                        <div className="text-right text-xs text-gray-500 mt-1">
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Social Links Tab */}
                            {activeTab === 'social' && (
                                <div className="space-y-6">
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm text-gray-400 mb-2">GitHub</label>
                                            <div className="relative">
                                                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">
                                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                                                    </svg>
                                                </span>
                                                <input
                                                    type="url"
                                                    name="github"
                                                    value={profile.github}

                                                    className="w-full pl-12 pr-4 py-3 bg-gray-900/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all"
                                                    placeholder="https://github.com/username"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm text-gray-400 mb-2">LinkedIn</label>
                                            <div className="relative">
                                                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-400">
                                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                        <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                                                    </svg>
                                                </span>
                                                <input
                                                    type="url"
                                                    name="linkedin"
                                                    value={profile.linkedin}

                                                    className="w-full pl-12 pr-4 py-3 bg-gray-900/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all"
                                                    placeholder="https://linkedin.com/in/username"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm text-gray-400 mb-2">Twitter/X</label>
                                            <div className="relative">
                                                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-300">
                                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                                    </svg>
                                                </span>
                                                <input
                                                    type="url"
                                                    name="twitter"
                                                    value={profile.twitter}

                                                    className="w-full pl-12 pr-4 py-3 bg-gray-900/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all"
                                                    placeholder="https://twitter.com/username"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm text-gray-400 mb-2">Personal Website</label>
                                            <div className="relative">
                                                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-400">
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                                                    </svg>
                                                </span>
                                                <input
                                                    type="url"
                                                    name="website"
                                                    value={profile.website}

                                                    className="w-full pl-12 pr-4 py-3 bg-gray-900/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all"
                                                    placeholder="https://yourwebsite.com"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Skills & Tech Tab */}
                            {activeTab === 'skills' && (
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-2">Add Skills</label>
                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                value={profile.newSkill}
                                                onChange={(e) => setProfile(prev => ({ ...prev, newSkill: e.target.value }))}

                                                className="flex-1 px-4 py-3 bg-gray-900/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all"
                                                placeholder="e.g., React, Node.js, TypeScript"
                                            />
                                            <button

                                                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-medium hover:from-blue-500 hover:to-blue-600 transition-all"
                                            >
                                                Add
                                            </button>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm text-gray-400 mb-2">Your Skills ({profile.skills.length})</label>
                                        <div className="flex flex-wrap gap-2 min-h-[60px] p-3 bg-gray-900/30 rounded-xl border border-gray-700/50">
                                            {profile.skills.length > 0 ? (
                                                profile.skills.map((skill, index) => (
                                                    <div
                                                        key={index}
                                                        className="group relative px-3 py-2 bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg border border-gray-700/50 hover:border-blue-500/50 transition-all"
                                                    >
                                                        <span className="text-gray-300 group-hover:text-blue-300">{skill}</span>
                                                        <button

                                                            className="ml-2 text-gray-500 hover:text-red-400 transition-colors"
                                                        >
                                                            ×
                                                        </button>
                                                    </div>
                                                ))
                                            ) : (
                                                <span className="text-gray-500">No skills added yet</span>
                                            )}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm text-gray-400 mb-2">Skill Level</label>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            {['Beginner', 'Intermediate', 'Advanced'].map(level => (
                                                <label key={level} className="relative">
                                                    <input
                                                        type="radio"
                                                        name="skillLevel"
                                                        className="peer hidden"
                                                    />
                                                    <div className="p-4 bg-gray-900/50 border border-gray-700/50 rounded-xl cursor-pointer hover:border-blue-500/50 peer-checked:border-blue-500 peer-checked:bg-blue-500/10 transition-all">
                                                        <div className="text-center">
                                                            <div className="text-white font-medium">{level}</div>
                                                            <div className="text-xs text-gray-400 mt-1">1-2 years experience</div>
                                                        </div>
                                                    </div>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Preferences Tab */}
                            {activeTab === 'preferences' && (
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-lg font-semibold text-white mb-4">Privacy Settings</h3>
                                        <div className="space-y-4">
                                            <label className="flex items-center justify-between p-4 bg-gray-900/30 rounded-xl border border-gray-700/50 hover:border-gray-600/50 transition-colors cursor-pointer">
                                                <div>
                                                    <div className="text-white font-medium">Public Profile</div>
                                                    <div className="text-sm text-gray-400 mt-1">Allow anyone to view your profile</div>
                                                </div>
                                                <div className="relative">
                                                    <input
                                                        type="checkbox"
                                                        name="publicProfile"
                                                        checked={profile.publicProfile}

                                                        className="sr-only"
                                                    />
                                                    <div className={`w-12 h-6 rounded-full transition-colors ${profile.publicProfile ? 'bg-blue-500' : 'bg-gray-700'}`}>
                                                        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${profile.publicProfile ? 'transform translate-x-7' : 'transform translate-x-1'}`}></div>
                                                    </div>
                                                </div>
                                            </label>

                                            <label className="flex items-center justify-between p-4 bg-gray-900/30 rounded-xl border border-gray-700/50 hover:border-gray-600/50 transition-colors cursor-pointer">
                                                <div>
                                                    <div className="text-white font-medium">Email Notifications</div>
                                                    <div className="text-sm text-gray-400 mt-1">Receive updates about your activity</div>
                                                </div>
                                                <div className="relative">
                                                    <input
                                                        type="checkbox"
                                                        name="notifications"
                                                        checked={profile.notifications}

                                                        className="sr-only"
                                                    />
                                                    <div className={`w-12 h-6 rounded-full transition-colors ${profile.notifications ? 'bg-blue-500' : 'bg-gray-700'}`}>
                                                        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${profile.notifications ? 'transform translate-x-7' : 'transform translate-x-1'}`}></div>
                                                    </div>
                                                </div>
                                            </label>
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-semibold text-white mb-4">Account Settings</h3>
                                        <div className="space-y-4">
                                            <button className="w-full text-left p-4 bg-gray-900/30 rounded-xl border border-gray-700/50 hover:border-red-500/50 text-red-400 hover:text-red-300 transition-colors">
                                                <div className="font-medium">Delete Account</div>
                                                <div className="text-sm opacity-75 mt-1">Permanently remove your account and all data</div>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditProfile;