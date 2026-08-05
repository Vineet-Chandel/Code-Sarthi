import React from 'react';

const AssignmentBadge = ({ source }) => {
    if (!source || source === 'unassigned') return null;

    return (
        <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#000000] border border-white/[0.08] text-[10px] text-zinc-300 font-semibold whitespace-nowrap shadow-sm">
            {source === 'self_claimed' ? (
                <>
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" /></svg>
                    Self-claimed
                </>
            ) : (
                <>
                    <svg className="w-3 h-3 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    Assigned by Leader
                </>
            )}
        </span>
    );
};

export default AssignmentBadge;
