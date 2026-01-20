import React, { useState, useEffect } from 'react';

const AboutUs = () => {
    // Team members data
    const teamMembers = [
        { id: 1, name: "Alex Johnson", role: "Frontend Developer", description: "Crafting intuitive user interfaces" },
        { id: 2, name: "Samantha Lee", role: "Backend Engineer", description: "Building robust server architecture" },
        { id: 3, name: "Raj Patel", role: "AI Specialist", description: "Implementing intelligent algorithms" },
        { id: 4, name: "Maya Chen", role: "UI/UX Designer", description: "Designing seamless user experiences" },
        { id: 5, name: "David Kim", role: "DevOps Engineer", description: "Ensuring smooth deployments" },
        { id: 6, name: "Priya Sharma", role: "Product Manager", description: "Driving product vision and strategy" },
    ];

    // Feature cards data
    const features = [
        {
            id: 1,
            title: "Interaction Segment",
            icon: "💬",
            gradient: "from-blue-500 to-cyan-400",
            hoverColor: "blue",
            points: [
                "Personal chats & Groups",
                "Community & AI Agent",
                "Video, messages, images, GitHub files",
                "Calls and meetings (meet)"
            ],
            outcome: "Increases developer engagement, makes meetings more interactive, and enables collaboration anytime, anywhere.",
            expanded: false
        },
        {
            id: 2,
            title: "Smart Scheduler & Team Tracker",
            icon: "📊",
            gradient: "from-purple-500 to-pink-500",
            hoverColor: "purple",
            points: [
                "Create projects and invite team members",
                "Personal & shared workspaces",
                "Tasks, time tracking, and project progress",
                "Leader dashboard with productivity insights"
            ],
            outcome: "Removes need for separate project manager and enables transparent team collaboration.",
            expanded: false
        },
        {
            id: 3,
            title: "AI Portfolio Generator",
            icon: "🤖",
            gradient: "from-orange-500 to-yellow-500",
            hoverColor: "orange",
            points: [
                "Collects user info, skills, projects & achievements",
                "AI analyzes skills and experience",
                "Organizes data into professional structure",
                "Generates multiple resume templates"
            ],
            outcome: "Auto-generated resumes and portfolios tailored for recruiters and job roles.",
            expanded: false
        }
    ];

    const [activeFeature, setActiveFeature] = useState(null);
    const [activeTeamMember, setActiveTeamMember] = useState(null);





    // Handle team member click with animation
    const handleTeamMemberClick = (id) => {
        setActiveTeamMember(id);

        // Add haptic feedback if available
        if (navigator.vibrate) {
            navigator.vibrate([20, 10, 20]);
        }

        // Reset active team member after 3 seconds
        setTimeout(() => {
            setActiveTeamMember(null);
        }, 3000);
    };


    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white p-4 md:p-8 overflow-hidden relative">

            {/* Interactive background elements */}
            <div
                className="fixed inset-0 pointer-events-none transition-all duration-1000 "

            />

            {/* Floating particles */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                {[...Array(15)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 bg-blue-400 rounded-full animate-float"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${i * 0.5}s`,
                            opacity: 0.6
                        }}
                    />
                ))}
            </div>

            {/* Hero Section */}
            <section className="max-w-7xl mx-auto mb-16 relative">
                <div className="text-center py-12 md:py-20">
                    <div className="relative inline-block group">
                        <h1 className="text-5xl md:text-9xl font-extrabold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-6 animate-gradient-x">
                            " CodeSaarthi "
                        </h1>
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg blur-2xl opacity-30 group-hover:opacity-70 transition duration-1000"></div>
                    </div>

                    <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-6">
                        Your AI-powered companion for collaboration, productivity, and career growth.
                    </p>

                    {/* Interactive stats counter */}
                    <div className="flex justify-center gap-8 mb-10">
                        {[
                            { label: "Active Users", value: "10K+", color: "text-blue-400" },
                            { label: "Projects", value: "5K+", color: "text-purple-400" },
                            { label: "Teams", value: "2K+", color: "text-pink-400" }
                        ].map((stat, index) => (
                            <div
                                key={index}
                                className="text-center transform transition-all duration-500 hover:scale-110 cursor-pointer"
                                onMouseEnter={() => setActiveFeature(index)}
                                onMouseLeave={() => setActiveFeature(null)}
                            >
                                <div className={`text-3xl font-bold ${stat.color} drop-shadow-lg`}>
                                    {stat.value}
                                </div>
                                <div className="text-gray-400 text-sm">{stat.label}</div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-10 relative">
                        <button className={`
                            bg-gradient-to-r from-blue-600 to-purple-600 
                            hover:from-blue-700 hover:to-purple-700 
                            text-white font-bold py-4 px-10 
                            rounded-full transition-all duration-300 
                            transform hover:scale-105 hover:shadow-2xl 
                            hover:shadow-purple-500/30 active:scale-95
                            border-2 border-transparent hover:border-blue-400
                        `}
                            onClick={() => {
                                window.scrollTo({ top: document.getElementById('features').offsetTop - 100, behavior: 'smooth' });
                            }}
                        >
                            <span className="flex items-center justify-center gap-2">
                                Explore Platform
                                <span className="animate-bounce">🚀</span>
                            </span>
                        </button>
                    </div>
                </div>
            </section>

            {/* Core Features Section */}
            <section id="features" className="max-w-7xl mx-auto mb-20">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 animate-fade-in-up">
                    Our <span className="text-transparent bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text">Core Features</span>
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {features.map((feature) => (
                        <div
                            key={feature.id}
                            className={`
                                bg-gray-800/30 backdrop-blur-lg border border-gray-700 
                                rounded-2xl p-6 md:p-8 transition-all duration-500 
                                hover:shadow-2xl cursor-pointer transform
                                ${activeFeature === feature.id ? 'scale-[1.02]' : ''}
                                hover:scale-[1.02]
                                hover:border-${feature.hoverColor}-500/50
                                hover:shadow-${feature.hoverColor}-900/20
                                relative overflow-hidden group
                            `}
                            onClick={() => toggleFeature(feature.id)}
                            onMouseEnter={() => setActiveFeature(feature.id)}
                            onMouseLeave={() => setActiveFeature(null)}
                        >
                            {/* Hover glow effect */}
                            <div className={`absolute inset-0 bg-gradient-to-r from-${feature.hoverColor}-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>

                            <div className="flex items-center mb-6 relative z-10">
                                <div className={`
                                    w-12 h-12 rounded-full bg-gradient-to-r ${feature.gradient} 
                                    flex items-center justify-center mr-4 
                                    transform transition-all duration-300 
                                    group-hover:rotate-12 group-hover:scale-110
                                    shadow-lg
                                `}>
                                    <span className="text-2xl">{feature.icon}</span>
                                </div>
                                <h3 className="text-2xl font-bold">{feature.title}</h3>
                            </div>

                            <ul className="space-y-3 mb-6 relative z-10">
                                {feature.points.map((point, index) => (
                                    <li
                                        key={index}
                                        className="flex items-center transition-all duration-300 hover:translate-x-2 hover:text-white"
                                    >
                                        <span className="text-green-400 mr-2 animate-pulse">✓</span>
                                        {point}
                                    </li>
                                ))}
                            </ul>

                            <div className={`
                                bg-gray-900/50 rounded-xl p-4 border border-gray-700 
                                transition-all duration-500 relative z-10
                                ${activeFeature === feature.id ? 'border-blue-500/50 shadow-inner shadow-blue-500/20' : ''}
                            `}>
                                <div className="flex items-center justify-between mb-2">
                                    <h4 className="text-lg font-semibold text-blue-300">Outcome</h4>
                                    <span className="text-xs text-gray-400">
                                        {activeFeature === feature.id ? 'Click to collapse ▲' : 'Click to expand ▼'}
                                    </span>
                                </div>
                                <p className={`text-gray-300 transition-all duration-500 ${activeFeature === feature.id ? 'opacity-100' : 'opacity-80'}`}>
                                    {feature.outcome}
                                </p>
                            </div>

                            {/* Expandable content */}
                            <div className={`
                                mt-4 overflow-hidden transition-all duration-700
                                ${activeFeature === feature.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
                            `}>
                                <div className="pt-4 border-t border-gray-700/50">
                                    <h5 className="font-semibold text-blue-300 mb-2">Benefits:</h5>
                                    <ul className="space-y-2 text-gray-300">
                                        <li className="flex items-center">
                                            <div className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-ping"></div>
                                            Increases productivity by 40%
                                        </li>
                                        <li className="flex items-center">
                                            <div className="w-2 h-2 bg-purple-500 rounded-full mr-2 animate-ping" style={{ animationDelay: '0.2s' }}></div>
                                            Reduces project completion time
                                        </li>
                                        <li className="flex items-center">
                                            <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-ping" style={{ animationDelay: '0.4s' }}></div>
                                            Enhances team collaboration
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Fourth Segment (Coming Soon) Card */}
                    <div className="bg-gray-800/20 backdrop-blur-lg border border-gray-700 rounded-2xl p-6 md:p-8 relative overflow-hidden group hover:scale-[1.02] transition-all duration-500 cursor-not-allowed">
                        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 via-black/80 to-gray-900/80 backdrop-blur-sm group-hover:backdrop-blur-0 transition-all duration-700"></div>
                        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center py-8">
                            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-gray-700 to-gray-800 flex items-center justify-center mx-auto mb-6 border border-gray-600 group-hover:border-blue-500/30 transition-all duration-500 group-hover:rotate-180">
                                <span className="text-3xl group-hover:scale-125 transition-transform duration-500">🚀</span>
                            </div>
                            <h3 className="text-2xl font-bold mb-4 text-gray-400 group-hover:text-white transition-colors duration-500">
                                Fourth Segment
                            </h3>
                            <p className="text-xl text-gray-500 group-hover:text-gray-300 transition-colors duration-500">
                                Coming Soon
                            </p>
                            <div className="mt-6 px-6 py-3 bg-gray-900/70 rounded-full border border-gray-700 group-hover:border-blue-500/50 transition-all duration-500 group-hover:shadow-lg group-hover:shadow-blue-500/20">
                                <span className="text-gray-400 group-hover:text-blue-300 transition-colors duration-500">
                                    Under Development
                                </span>
                            </div>
                            <div className="mt-6 text-sm text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                We're working on something amazing!
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="max-w-7xl mx-auto mb-20">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 animate-fade-in-up">
                    Meet <span className="text-transparent bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text">Our Team</span>
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {teamMembers.map((member) => (
                        <div
                            key={member.id}
                            className={`
                                bg-gradient-to-br from-gray-800/40 to-gray-900/40 
                                backdrop-blur-lg border border-gray-700 
                                rounded-2xl p-6 transition-all duration-500 
                                hover:scale-105 hover:shadow-2xl 
                                hover:shadow-blue-900/20 
                                hover:border-blue-500/50 
                                cursor-pointer relative overflow-hidden
                                ${activeTeamMember === member.id ? 'ring-2 ring-blue-500 ring-opacity-50 scale-105' : ''}
                            `}
                            onClick={() => handleTeamMemberClick(member.id)}
                            onMouseEnter={() => setActiveFeature(member.id)}
                            onMouseLeave={() => setActiveFeature(null)}
                        >
                            {/* Glow effect on hover */}
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                            <div className="flex flex-col items-center text-center relative z-10">
                                {/* Avatar Placeholder with animation */}
                                <div className={`
                                    w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 
                                    flex items-center justify-center mb-6 
                                    transition-all duration-500 
                                    hover:from-blue-400 hover:to-purple-500 
                                    hover:scale-110 hover:rotate-12
                                    shadow-lg group-hover:shadow-blue-500/30
                                    ${activeTeamMember === member.id ? 'animate-pulse' : ''}
                                `}>
                                    <span className="text-3xl font-bold">
                                        {member.name.split(' ').map(n => n[0]).join('')}
                                    </span>
                                </div>

                                <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                                <div className={`
                                    px-4 py-1 bg-gradient-to-r from-blue-900/40 to-purple-900/40 
                                    rounded-full border border-blue-700/30 mb-4 
                                    transition-all duration-300
                                    hover:from-blue-700/40 hover:to-purple-700/40
                                    hover:border-blue-500/50
                                `}>
                                    <span className="text-blue-300 font-medium">{member.role}</span>
                                </div>
                                <p className="text-gray-400">{member.description}</p>

                                {/* Social Links with hover effects */}
                                <div className="flex space-x-4 mt-6">
                                    {[
                                        { icon: "in", color: "bg-blue-600/20 hover:bg-blue-600/40" },
                                        { icon: "gh", color: "bg-gray-800/50 hover:bg-gray-700/60" },
                                        { icon: "tw", color: "bg-sky-500/20 hover:bg-sky-500/40" }
                                    ].map((social, index) => (
                                        <div
                                            key={index}
                                            className={`
                                                w-10 h-10 rounded-full flex items-center justify-center 
                                                cursor-pointer transition-all duration-300 
                                                transform hover:scale-125 hover:-translate-y-1
                                                ${social.color} border border-gray-700/50 hover:border-blue-500/30
                                                shadow-md hover:shadow-lg
                                            `}
                                        >
                                            <span className="text-sm font-bold">{social.icon}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Bio popup on click */}
                                {activeTeamMember === member.id && (
                                    <div className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 w-48 p-4 bg-gray-900/95 backdrop-blur-md rounded-xl border border-blue-500/30 shadow-2xl animate-slide-up z-50">
                                        <div className="text-sm">
                                            <div className="font-semibold text-blue-300 mb-1">Expertise:</div>
                                            <div className="text-gray-300">
                                                Specializes in creating efficient and scalable solutions
                                            </div>
                                        </div>
                                        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-gray-900"></div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Team stats */}
                <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
                    {[
                        { label: "Total Experience", value: "50+", unit: "Years" },
                        { label: "Projects", value: "200+", unit: "Completed" },
                        { label: "Technologies", value: "30+", unit: "Mastered" },
                        { label: "Awards", value: "15+", unit: "Won" }
                    ].map((stat, index) => (
                        <div
                            key={index}
                            className="text-center p-4 bg-gray-800/30 rounded-xl border border-gray-700 hover:border-blue-500/30 transition-all duration-300 hover:scale-105 cursor-pointer"
                        >
                            <div className="text-3xl font-bold text-blue-400">{stat.value}</div>
                            <div className="text-gray-400 text-sm">{stat.label}</div>
                            <div className="text-gray-500 text-xs">{stat.unit}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Footer */}
            <footer className="max-w-7xl mx-auto pt-8 border-t border-gray-800 text-center">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-6 md:mb-0">
                        <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300 inline-block cursor-pointer">
                            CodeSaarthi
                        </h2>
                        <p className="text-gray-500 mt-2">Empowering developers worldwide</p>
                    </div>

                    <div className="flex space-x-6">
                        {['Privacy Policy', 'Terms of Service', 'Contact Us'].map((item, index) => (
                            <a
                                key={index}
                                href="#"
                                className="text-gray-400 hover:text-blue-400 transition-all duration-300 hover:scale-105 hover:underline"
                                onClick={(e) => {
                                    e.preventDefault();
                                    // Add haptic feedback
                                    if (navigator.vibrate) navigator.vibrate(10);
                                }}
                            >
                                {item}
                            </a>
                        ))}
                    </div>
                </div>

                <div className="mt-8 text-gray-600">
                    <p>© {new Date().getFullYear()} CodeSaarthi. All rights reserved.</p>
                </div>

                {/* Back to top button */}
                <button
                    className="fixed bottom-8 right-8 w-12 h-12 bg-gray-800/50 backdrop-blur-md rounded-full flex items-center justify-center border border-gray-700 hover:border-blue-500/50 hover:bg-gray-800/80 transition-all duration-300 hover:scale-110 shadow-lg z-50"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                    ↑
                </button>
            </footer>


        </div>
    );
};

export default AboutUs;