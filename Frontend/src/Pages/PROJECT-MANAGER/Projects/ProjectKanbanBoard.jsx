import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import BASE_URL from '../../auth/baseURL';

const KanbanColumn = ({ title, priority, issues, colorClass, teamId, onRefresh }) => {
    return (
        <div className="flex flex-col bg-[#0a0a0a] rounded-2xl border border-white/[0.05] shadow-lg flex-1 min-w-[250px]">
            <div className={`p-4 border-b border-white/[0.05] flex justify-between items-center ${colorClass}`}>
                <h3 className="font-bold text-white tracking-tight">{title}</h3>
                <span className="text-xs font-mono font-black bg-black px-2 py-0.5 rounded-full shadow-inner">{issues.length}</span>
            </div>
            <div className="p-3 space-y-3 overflow-y-auto flex-1 max-h-[70vh] custom-scrollbar">
                {issues.length > 0 ? issues.map((issue) => (
                    <KanbanCard key={issue._id} issue={issue} teamId={teamId} onRefresh={onRefresh} />
                )) : (
                    <div className="text-center py-8 text-zinc-600 text-xs font-semibold">No issues here</div>
                )}
            </div>
        </div>
    );
};

const KanbanCard = ({ issue, teamId, onRefresh }) => {
    const [claiming, setClaiming] = useState(false);

    const getStatusColor = (status) => {
        switch ((status || '').toLowerCase()) {
            case 'open': return 'bg-[#000000] text-zinc-300 border-white/[0.08]';
            case 'in_progress': return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
            case 'done': return 'bg-white/[0.08] text-white border-white/[0.12]';
            default: return 'bg-[#000000] text-zinc-400 border-white/[0.06]';
        }
    };

    const getTypeIcon = (type) => {
        switch ((type || '').toLowerCase()) {
            case 'feature': return <span className="text-emerald-400 font-sans">Feature</span>;
            case 'problem': return <span className="text-rose-400 font-sans">Problem</span>;
            default: return <span className="text-blue-400 font-sans">Task</span>;
        }
    };

    const handleClaim = async (e) => {
        e.stopPropagation();
        if (claiming || !teamId) return;
        
        setClaiming(true);
        try {
            await axios.post(`${BASE_URL}/teams/${teamId}/issues/${issue._id}/claim`, {}, { withCredentials: true });
            if (onRefresh) onRefresh();
        } catch (error) {
            console.error("Failed to claim issue:", error);
        } finally {
            setClaiming(false);
        }
    };

    return (
        <motion.div 
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#000000] border border-white/[0.08] rounded-xl p-4 shadow-sm hover:border-white/[0.2] transition-colors group relative"
        >
            {claiming && (
                <div className="absolute inset-0 bg-black/60 rounded-xl flex items-center justify-center z-10 backdrop-blur-[1px]">
                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                </div>
            )}
            <div className="flex justify-between items-start mb-2">
                <span className="text-[10px] font-extrabold uppercase tracking-wider">{getTypeIcon(issue.type)}</span>
                <span className={`text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded border ${getStatusColor(issue.status)}`}>
                    {(issue.status || 'open').replace('_', ' ')}
                </span>
            </div>
            <h4 className="text-sm font-bold text-white mb-3 line-clamp-2 leading-tight group-hover:text-zinc-200 transition-colors">
                {issue.title}
            </h4>
            
            {/* Assignee Footer */}
            <div className="flex items-center justify-between mt-auto pt-3 border-t border-white/[0.05]">
                {issue.assignedTo ? (
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-zinc-800 flex items-center justify-center overflow-hidden border border-white/10 shrink-0">
                            {issue.assignedTo.photoUrl?.url && issue.assignedTo.photoUrl.url !== "https://geographyandyou.com/images/user-profile.png" ? (
                                <img src={issue.assignedTo.photoUrl.url} alt={issue.assignedTo.firstName} className="w-full h-full object-cover" />
                            ) : (
                                <span className="text-[9px] font-bold text-white">
                                    {issue.assignedTo.firstName?.charAt(0)}{issue.assignedTo.lastName?.charAt(0)}
                                </span>
                            )}
                        </div>
                        <span className="text-xs font-semibold text-zinc-300 truncate max-w-[120px]">
                            {issue.assignedTo.firstName} {issue.assignedTo.lastName}
                        </span>
                    </div>
                ) : (
                    <button 
                        onClick={handleClaim}
                        disabled={claiming}
                        className="text-[10px] font-bold text-black bg-white hover:bg-zinc-200 px-3 py-1 rounded-md transition-all shadow-md active:scale-95"
                    >
                        Claim Issue
                    </button>
                )}
                
                {issue.links?.length > 0 && (
                    <span className="text-[10px] text-zinc-500 flex items-center gap-1">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
                        {issue.links.length}
                    </span>
                )}
            </div>
        </motion.div>
    );
};

const ProjectKanbanBoard = ({ issues, teamId, onRefresh }) => {
    const columns = useMemo(() => {
        const cols = {
            low: [],
            medium: [],
            high: [],
            urgent: []
        };
        
        issues.forEach(issue => {
            const p = (issue.priority || 'medium').toLowerCase();
            if (cols[p]) {
                cols[p].push(issue);
            } else {
                cols.medium.push(issue);
            }
        });
        
        // Sort each column: claimed first (has assignedTo), unclaimed last
        const sortByClaimed = (a, b) => {
            if (a.assignedTo && !b.assignedTo) return -1;
            if (!a.assignedTo && b.assignedTo) return 1;
            return 0; // Maintain original order if both are claimed or both unclaimed
        };

        cols.low.sort(sortByClaimed);
        cols.medium.sort(sortByClaimed);
        cols.high.sort(sortByClaimed);
        cols.urgent.sort(sortByClaimed);
        
        return cols;
    }, [issues]);

    return (
        <div className="flex gap-4 overflow-x-auto pb-4 pt-2 snap-x custom-scrollbar w-full">
            <KanbanColumn title="Low Priority" priority="low" issues={columns.low} colorClass="border-t-2 border-t-[#A7A0F8] bg-gradient-to-b from-[#A7A0F8]/5 to-transparent" teamId={teamId} onRefresh={onRefresh} />
            <KanbanColumn title="Medium Priority" priority="medium" issues={columns.medium} colorClass="border-t-2 border-t-[#534AB7] bg-gradient-to-b from-[#534AB7]/5 to-transparent" teamId={teamId} onRefresh={onRefresh} />
            <KanbanColumn title="High Priority" priority="high" issues={columns.high} colorClass="border-t-2 border-t-emerald-500 bg-gradient-to-b from-emerald-500/5 to-transparent" teamId={teamId} onRefresh={onRefresh} />
            <KanbanColumn title="Urgent" priority="urgent" issues={columns.urgent} colorClass="border-t-2 border-t-[#D9A441] bg-gradient-to-b from-[#D9A441]/5 to-transparent" teamId={teamId} onRefresh={onRefresh} />
        </div>
    );
};

export default ProjectKanbanBoard;
