import { useState } from 'react';
import axios from 'axios';
import BASE_URL from '../../auth/baseURL';
import { motion } from 'framer-motion';

const JoinTeamForm = ({ onSuccess }) => {
    const [code, setCode] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleJoin = async (e) => {
        e.preventDefault();
        if (!code.trim()) return;

        setLoading(true);
        setError(null);
        try {
            const res = await axios.post(`${BASE_URL}/teams/join`, { code: code.trim() }, { withCredentials: true });
            onSuccess(res.data.team);
            setCode('');
        } catch (err) {
            setError(err.response?.data?.message || err.response?.data?.error || 'Failed to join team');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleJoin} className="relative w-full max-w-md">
            <div className="relative flex items-center">
                <input
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="Enter invite code"
                    className="w-full bg-[#0a0a0a] rounded-xl pl-5 pr-24 py-3.5 text-white placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-white transition-all shadow-2xl"
                />
                <button
                    type="submit"
                    disabled={loading || !code.trim()}
                    className="absolute right-1.5 bg-white hover:bg-zinc-200 text-black text-sm font-black py-2 px-5 rounded-lg transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? 'Joining...' : 'Join'}
                </button>
            </div>
            {error && (
                <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute top-full mt-2 left-0 text-red-400 text-xs font-medium bg-red-400/10 px-3 py-1.5 rounded border border-red-400/20"
                >
                    {error}
                </motion.div>
            )}
        </form>
    );
};

export default JoinTeamForm;
