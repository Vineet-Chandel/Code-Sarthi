import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
const RadioOption = ({ label, desc, selected, setSelected }) => {
    return (
        <div
            onClick={() => setSelected(label)}
            className="flex items-start gap-4 cursor-pointer hover:bg-zinc-800/40 p-2 rounded-lg transition"
        >
            <div
                className={`w-5 h-5 rounded-full border flex items-center justify-center ${selected === label
                    ? "border-cyan-500"
                    : "border-zinc-600"
                    }`}
            >
                {selected === label && (
                    <div className="w-2.5 h-2.5 bg-cyan-500 rounded-full"></div>
                )}
            </div>

            <div>
                <p className="text-gray-200">{label}</p>
                <p className="text-sm text-gray-400">{desc}</p>
            </div>
        </div>
    );
};


const Toggle = ({ enabled, setEnabled }) => {
    return (
        <div
            onClick={() => setEnabled(!enabled)}
            className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-all duration-300 shadow-inner ${enabled ? "bg-cyan-500" : "bg-gray-600"
                }`}
        >
            <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ${enabled ? "translate-x-6" : ""
                    }`}
            />
        </div>
    );
};

const ContentAndSocial = () => {
    const container = useRef();

    const [dmToggle, setDmToggle] = useState(true);
    const [requestToggle, setRequestToggle] = useState(true);

    const [everyone, setEveryone] = useState(true);
    const [friendOfFriends, setFriendOfFriends] = useState(true);
    const [serverMembers, setServerMembers] = useState(true);

    const [spamFilter, setSpamFilter] = useState("Filter from non-friends");
    const [ageCommand, setAgeCommand] = useState(false);
    const [ageServer, setAgeServer] = useState(false);

    useEffect(() => {
        gsap.from(container.current, {
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: "power3.out",
        });
    }, []);





    return (
        <div
            ref={container}
            className="w-full px-4 sm:px-6 lg:px-10 py-8 lg:py-10 text-gray-200 space-y-10"
        >
            {/* CONTENT */}
            <h1 className="text-2xl sm:text-2xl sm:text-3xl font-semibold tracking-tight tracking-tight mb-6">Content</h1>

            <div className="bg-zinc-900/70 backdrop-blur border border-zinc-800 hover:border-zinc-700 transition-all rounded-2xl p-5 sm:p-6 lg:p-8 space-y-6 shadow-sm">

                <div>
                    <h2 className="text-lg sm:text-xl font-semibold text-zinc-100 mb-2">
                        Sensitive content filters
                    </h2>
                    <p className="text-sm text-zinc-400 leading-relaxed">
                        Choose how you want to see image-based media detected by filters.
                    </p>
                </div>

                <div className="space-y-4">

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-zinc-800 pb-3">
                        <div>
                            <p className="font-medium">Direct messages from friends</p>
                        </div>
                        <select className="bg-zinc-800 border border-zinc-700 hover:border-zinc-600 text-sm px-3 py-1.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 transition">
                            <option>Show</option>
                            <option>Blur</option>
                            <option>Block</option>
                        </select>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-zinc-800/70 pb-4">
                        <div>
                            <p className="font-medium">Direct messages from others</p>
                        </div>
                        <select className="bg-zinc-800 border border-zinc-700 hover:border-zinc-600 text-sm px-3 py-1.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 transition">
                            <option>Show</option>
                            <option>Blur</option>
                            <option>Block</option>
                        </select>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                            <p className="font-medium">Messages in server channels</p>
                        </div>
                        <select className="bg-zinc-800 border border-zinc-700 hover:border-zinc-600 text-sm px-3 py-1.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 transition">
                            <option>Show</option>
                            <option>Blur</option>
                            <option>Block</option>
                        </select>
                    </div>

                </div>
            </div>
            <div

                className="max-w-full mx-auto px-6 py-12 text-gray-200"
            >
                {/* DIRECT MESSAGE SPAM */}
                <div className="mb-12">
                    <h2 className="text-2xl font-semibold mb-2">
                        Direct Message spam
                    </h2>

                    <p className="text-gray-400 mb-6">
                        Automatically send DMs that may contain spam into a
                        separate spam inbox.
                        <span className="text-cyan-400 ml-1 cursor-pointer">
                            Learn more
                        </span>
                    </p>

                    <div className="space-y-6">

                        <RadioOption
                            label="Filter all"
                            desc="All DMs will be filtered for spam"
                            selected={spamFilter}
                            setSelected={setSpamFilter}
                        />

                        <RadioOption
                            label="Filter from non-friends"
                            desc="DMs from non-friends will be filtered for spam"
                            selected={spamFilter}
                            setSelected={setSpamFilter}
                        />

                        <RadioOption
                            label="Do not filter"
                            desc="DMs will not be filtered for spam"
                            selected={spamFilter}
                            setSelected={setSpamFilter}
                        />

                    </div>
                </div>

                {/* AGE RESTRICTED COMMANDS */}
                <div className="border-t border-zinc-800 pt-10 space-y-10">

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="max-w-xl">
                            <h3 className="text-lg font-semibold">
                                Allow access to age-restricted commands from apps in
                                Direct Messages
                            </h3>

                            <p className="text-gray-400 text-sm mt-1">
                                This setting applies to all apps. Allows people 18+
                                to access commands marked as age-restricted in DMs
                            </p>
                        </div>

                        <Toggle enabled={ageCommand} setEnabled={setAgeCommand} />
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="max-w-xl">
                            <h3 className="text-lg font-semibold">
                                Allow access to age-restricted servers on iOS
                            </h3>

                            <p className="text-gray-400 text-sm mt-1">
                                After joining on desktop, view your servers for
                                people 18+ on iOS devices
                            </p>
                        </div>

                        <Toggle enabled={ageServer} setEnabled={setAgeServer} />
                    </div>

                </div>
            </div>
            <div className="border-t border-zinc-800 pt-12"></div>
            {/* SOCIAL PERMISSIONS */}
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight mt-12 mb-6">
                Social Permissions
            </h1>

            <div className="bg-zinc-900/70 backdrop-blur border border-zinc-800 hover:border-zinc-700 transition rounded-2xl p-5 sm:p-6 lg:p-8 space-y-8">

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div>
                        <p className="font-medium">Direct Messages</p>
                        <p className="text-sm text-gray-400">
                            Allow DMs from other server members
                        </p>
                    </div>

                    <Toggle enabled={dmToggle} setEnabled={setDmToggle} />
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div>
                        <p className="font-medium">Message requests</p>
                        <p className="text-sm text-gray-400">
                            Filter messages from people you may not know
                        </p>
                    </div>

                    <Toggle enabled={requestToggle} setEnabled={setRequestToggle} />
                </div>

            </div>
            <div className="border-t border-zinc-800 pt-12"></div>
            {/* FRIEND REQUESTS */}
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight mt-12 mb-6">
                Friend Requests
            </h1>

            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-6">

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <p>Everyone</p>
                    <Toggle enabled={everyone} setEnabled={setEveryone} />
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <p>Friend of friends</p>
                    <Toggle enabled={friendOfFriends} setEnabled={setFriendOfFriends} />
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <p>Server members</p>
                    <Toggle enabled={serverMembers} setEnabled={setServerMembers} />
                </div>

            </div>
        </div>
    );
};

export default ContentAndSocial;