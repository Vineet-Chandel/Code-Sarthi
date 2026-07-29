import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const SchedulerAnalytics = ({ analytics }) => {
    
    // Formatting data for the bar chart
    const barData = analytics.map(item => ({
        name: item._id?.name || 'Unknown',
        "Scheduled (hrs)": parseFloat((item.totalHours || 0).toFixed(1)),
        "Completed (hrs)": parseFloat((item.completedHours || 0).toFixed(1)),
        "Missed Sessions": item.totalMissed || 0,
        "Total Sessions": item.totalScheduled || 0,
        "Completed Sessions": item.totalCompleted || 0
    }));

    // Formatting data for the pie chart (Time Distribution across goals)
    const pieData = analytics.map(item => ({
        name: item._id?.name || 'Unknown',
        value: parseFloat((item.totalHours || 0).toFixed(1))
    })).filter(item => item.value > 0);

    const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#10b981', '#f59e0b', '#6366f1', '#14b8a6'];

    // Overall stats
    const totalScheduledHours = barData.reduce((acc, curr) => acc + curr["Scheduled (hrs)"], 0);
    const totalCompletedHours = barData.reduce((acc, curr) => acc + curr["Completed (hrs)"], 0);
    const totalSessions = barData.reduce((acc, curr) => acc + curr["Total Sessions"], 0);
    const completedSessions = barData.reduce((acc, curr) => acc + curr["Completed Sessions"], 0);
    
    const completionRate = totalSessions > 0 ? Math.round((completedSessions / totalSessions) * 100) : 0;

    if (analytics.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-gray-500 font-poppins">
                <svg className="w-16 h-16 mb-4 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
                <p>No analytics available. Start scheduling goals to see insights!</p>
            </div>
        );
    }

    return (
        <div className="w-full flex flex-col gap-6 font-poppins">
            
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-[#121212] border border-[#2a2a2a] rounded-2xl p-6">
                    <p className="text-gray-400 text-sm mb-1">Total Scheduled Time</p>
                    <h3 className="text-3xl font-bold text-white">{totalScheduledHours.toFixed(1)} <span className="text-lg text-gray-500 font-normal">hrs</span></h3>
                </div>
                <div className="bg-[#121212] border border-[#2a2a2a] rounded-2xl p-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-green-500/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
                    <p className="text-gray-400 text-sm mb-1 relative z-10">Completed Time</p>
                    <h3 className="text-3xl font-bold text-green-400 relative z-10">{totalCompletedHours.toFixed(1)} <span className="text-lg text-green-500/50 font-normal">hrs</span></h3>
                </div>
                <div className="bg-[#121212] border border-[#2a2a2a] rounded-2xl p-6">
                    <p className="text-gray-400 text-sm mb-1">Total Sessions</p>
                    <h3 className="text-3xl font-bold text-white">{totalSessions}</h3>
                </div>
                <div className="bg-[#121212] border border-[#2a2a2a] rounded-2xl p-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
                    <p className="text-gray-400 text-sm mb-1 relative z-10">Session Success Rate</p>
                    <h3 className="text-3xl font-bold text-blue-400 relative z-10">{completionRate}%</h3>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Bar Chart: Scheduled vs Completed */}
                <div className="lg:col-span-2 bg-[#121212] border border-[#2a2a2a] rounded-2xl p-6 min-h-[400px]">
                    <h3 className="text-lg font-bold text-white mb-6">Tracking by Goal</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart
                            data={barData}
                            margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                            <XAxis dataKey="name" stroke="#666" tick={{fill: '#888', fontSize: 12}} axisLine={{stroke: '#333'}} tickLine={false} />
                            <YAxis stroke="#666" tick={{fill: '#888', fontSize: 12}} axisLine={{stroke: '#333'}} tickLine={false} />
                            <Tooltip 
                                contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '8px', color: '#fff' }}
                                itemStyle={{ color: '#e5e7eb' }}
                            />
                            <Legend wrapperStyle={{ paddingTop: '20px' }} />
                            <Bar dataKey="Scheduled (hrs)" fill="#333" radius={[4, 4, 0, 0]} />
                            <Bar dataKey="Completed (hrs)" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Pie Chart: Time Distribution */}
                <div className="bg-[#121212] border border-[#2a2a2a] rounded-2xl p-6 min-h-[400px] flex flex-col">
                    <h3 className="text-lg font-bold text-white mb-2">Time Distribution</h3>
                    <p className="text-sm text-gray-500 mb-6">Total scheduled hours per goal</p>
                    <div className="flex-1 min-h-0">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={90}
                                    paddingAngle={5}
                                    dataKey="value"
                                    stroke="none"
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip 
                                    contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '8px', color: '#fff' }}
                                    itemStyle={{ color: '#e5e7eb' }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    {/* Custom Legend for Pie */}
                    <div className="mt-4 flex flex-wrap gap-2 justify-center">
                        {pieData.map((entry, idx) => (
                            <div key={idx} className="flex items-center gap-1.5 text-xs text-gray-400">
                                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }}></span>
                                {entry.name}
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default SchedulerAnalytics;
