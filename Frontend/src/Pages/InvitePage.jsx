import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import BASE_URL from './auth/baseURL';

const InvitePage = () => {
    const { code } = useParams();
    const navigate = useNavigate();
    const [inviteData, setInviteData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [accepting, setAccepting] = useState(false);

    useEffect(() => {
        const fetchInviteDetails = async () => {
            try {
                setLoading(true);
                const res = await axios.get(`${BASE_URL}/api/teams/invite/${code}`, {
                    withCredentials: true
                });
                
                if (res.data.success) {
                    setInviteData(res.data.team);
                } else {
                    setError('Invalid or expired invite code.');
                }
            } catch (err) {
                setError(err.response?.data?.error || 'Failed to load invite details.');
            } finally {
                setLoading(false);
            }
        };

        if (code) {
            fetchInviteDetails();
        }
    }, [code]);

    const handleAcceptInvite = async () => {
        try {
            setAccepting(true);
            const res = await axios.post(`${BASE_URL}/api/teams/join`, {
                code
            }, {
                withCredentials: true
            });

            if (res.data.success) {
                // Navigate to discussions/teams page after joining
                navigate('/app/discussions'); 
            }
        } catch (err) {
            if (err.response?.status === 401) {
                navigate('/login', { state: { returnTo: `/invite/${code}` } });
            } else {
                alert(err.response?.data?.error || 'Failed to join team.');
                setAccepting(false);
            }
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#000000] flex items-center justify-center font-poppins">
                <div className="w-8 h-8 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-[#000000] flex flex-col items-center justify-center font-poppins text-white p-4">
                <div className="bg-[#0a0a0a] border border-white/10 p-8 rounded-2xl max-w-md w-full text-center flex flex-col items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 mb-2">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                    </div>
                    <h2 className="text-xl font-bold">Invite Invalid</h2>
                    <p className="text-sm text-zinc-400">{error}</p>
                    <button 
                        onClick={() => navigate('/app/discussions')}
                        className="mt-4 w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold py-3 rounded-xl transition-all"
                    >
                        Return to App
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#000000] flex items-center justify-center font-poppins p-4">
            <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl max-w-[440px] w-full p-8 flex flex-col items-center text-center shadow-2xl relative overflow-hidden">
                
                {/* Background ambient glow based on logo colors or just subtle white */}
                <div className="absolute -top-20 -left-20 w-60 h-60 bg-white/5 rounded-full blur-[80px] pointer-events-none"></div>
                <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-white/5 rounded-full blur-[80px] pointer-events-none"></div>

                <div className="relative z-10 flex flex-col items-center w-full">
                    {/* Inviter Info */}
                    {inviteData?.ownerId && (
                        <div className="flex flex-col items-center mb-6">
                            <div className="w-12 h-12 rounded-full overflow-hidden border border-white/10 mb-3 shadow-lg">
                                {inviteData.ownerId.photoUrl?.url ? (
                                    <img src={inviteData.ownerId.photoUrl.url} alt="Inviter" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full bg-zinc-900 flex items-center justify-center text-zinc-500 font-bold">
                                        {inviteData.ownerId.firstName?.[0]}
                                    </div>
                                )}
                            </div>
                            <p className="text-zinc-400 text-sm">
                                <span className="text-white font-medium">{inviteData.ownerId.firstName} {inviteData.ownerId.lastName}</span> invited you to join
                            </p>
                        </div>
                    )}

                    {/* Team Info */}
                    <div className="w-24 h-24 rounded-2xl bg-zinc-950 border border-white/10 flex items-center justify-center mb-4 overflow-hidden shadow-xl">
                        {inviteData?.logo ? (
                            <img src={inviteData.logo} alt="Team Logo" className="w-full h-full object-cover" />
                        ) : (
                            <span className="text-4xl font-black text-white">{inviteData?.name?.[0]?.toUpperCase()}</span>
                        )}
                    </div>
                    
                    <h1 className="text-3xl font-extrabold text-white mb-2 tracking-tight">{inviteData?.name}</h1>
                    
                    {inviteData?.description && (
                        <p className="text-zinc-500 text-sm mb-8 leading-relaxed max-w-[90%]">
                            {inviteData.description}
                        </p>
                    )}

                    {/* Accept Button */}
                    <button
                        onClick={handleAcceptInvite}
                        disabled={accepting}
                        className="w-full bg-white text-black hover:bg-zinc-200 active:scale-[0.98] font-bold py-3.5 rounded-xl transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] flex items-center justify-center gap-2"
                    >
                        {accepting ? (
                            <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin"></div>
                        ) : (
                            'Accept Invite'
                        )}
                    </button>
                    
                    <button 
                        onClick={() => navigate('/app/discussions')}
                        className="mt-4 text-xs font-medium text-zinc-500 hover:text-zinc-300 transition-colors"
                    >
                        No thanks, take me back
                    </button>
                </div>
            </div>
        </div>
    );
};

export default InvitePage;
