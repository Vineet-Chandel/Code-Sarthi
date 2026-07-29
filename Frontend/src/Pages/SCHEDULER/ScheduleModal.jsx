import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BASE_URL from '../../Pages/auth/baseURL';

const ScheduleModal = ({ isOpen, onClose, scheduleToEdit, initialDate, goals, onScheduleAdded, onScheduleUpdated, onScheduleDeleted }) => {
    
    // Format date for datetime-local input (YYYY-MM-DDTHH:mm)
    const formatDateTimeLocal = (dateObj) => {
        if (!dateObj) return '';
        const tzoffset = (new Date()).getTimezoneOffset() * 60000;
        return (new Date(dateObj.getTime() - tzoffset)).toISOString().slice(0, 16);
    };

    const getInitialStart = () => {
        if (scheduleToEdit) return formatDateTimeLocal(new Date(scheduleToEdit.startTime));
        const d = initialDate ? new Date(initialDate) : new Date();
        d.setHours(9, 0, 0, 0); // Default to 9:00 AM
        return formatDateTimeLocal(d);
    };

    const getInitialEnd = () => {
        if (scheduleToEdit) return formatDateTimeLocal(new Date(scheduleToEdit.endTime));
        const d = initialDate ? new Date(initialDate) : new Date();
        d.setHours(10, 0, 0, 0); // Default to 10:00 AM
        return formatDateTimeLocal(d);
    };

    const [formData, setFormData] = useState({
        goal: scheduleToEdit?.goal?._id || scheduleToEdit?.goal || '',
        title: scheduleToEdit?.title || '',
        startTime: getInitialStart(),
        endTime: getInitialEnd(),
        status: scheduleToEdit?.status || 'Scheduled',
        notes: scheduleToEdit?.notes || ''
    });

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // If they select a goal but haven't typed a title, auto-fill title
        if (formData.goal && !formData.title && !scheduleToEdit) {
            const selectedGoal = goals.find(g => g._id === formData.goal);
            if (selectedGoal) {
                setFormData(prev => ({ ...prev, title: selectedGoal.name }));
            }
        }
    }, [formData.goal]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (scheduleToEdit) {
                const res = await axios.patch(`${BASE_URL}/api/schedules/${scheduleToEdit._id}`, formData, { withCredentials: true });
                onScheduleUpdated(res.data);
            } else {
                const res = await axios.post(`${BASE_URL}/api/schedules`, formData, { withCredentials: true });
                onScheduleAdded(res.data);
            }
            onClose();
        } catch (error) {
            console.error("Failed to save schedule", error);
            alert("Failed to save schedule. Please check the inputs.");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this schedule?")) return;
        setLoading(true);
        try {
            await axios.delete(`${BASE_URL}/api/schedules/${scheduleToEdit._id}`, { withCredentials: true });
            onScheduleDeleted(scheduleToEdit._id);
            onClose();
        } catch (error) {
            console.error("Failed to delete schedule", error);
            alert("Failed to delete schedule.");
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 font-poppins">
            <div className="bg-[#121212] border border-[#2a2a2a] rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300 flex flex-col max-h-[90vh]">
                <div className="p-5 border-b border-[#2a2a2a] flex justify-between items-center bg-[#1a1a1a] shrink-0">
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        {scheduleToEdit ? (
                            <><svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg> Edit Schedule</>
                        ) : (
                            <><svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg> New Schedule</>
                        )}
                    </h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors bg-[#2a2a2a] hover:bg-[#333] p-1.5 rounded-lg">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                </div>
                
                <form onSubmit={handleSubmit} className="p-6 space-y-5 overflow-y-auto custom-scrollbar flex-1">
                    
                    {/* Goal Selection */}
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1.5">Linked Goal *</label>
                        <select 
                            required 
                            disabled={!!scheduleToEdit} // Usually don't change goal after scheduling
                            value={formData.goal} 
                            onChange={e => setFormData({ ...formData, goal: e.target.value })} 
                            className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 transition-colors disabled:opacity-50"
                        >
                            <option value="" disabled>Select a goal...</option>
                            {goals.map(g => (
                                <option key={g._id} value={g._id}>{g.name}</option>
                            ))}
                        </select>
                    </div>

                    {/* Title */}
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1.5">Title / Event Name *</label>
                        <input 
                            required 
                            type="text" 
                            value={formData.title} 
                            onChange={e => setFormData({ ...formData, title: e.target.value })} 
                            className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 transition-colors" 
                            placeholder="e.g. Design System Mockup session" 
                        />
                    </div>

                    {/* Dates */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1.5">Start Time *</label>
                            <input 
                                required 
                                type="datetime-local" 
                                value={formData.startTime} 
                                onChange={e => setFormData({ ...formData, startTime: e.target.value })} 
                                className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 transition-colors [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert" 
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1.5">End Time *</label>
                            <input 
                                required 
                                type="datetime-local" 
                                value={formData.endTime} 
                                onChange={e => setFormData({ ...formData, endTime: e.target.value })} 
                                className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 transition-colors [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert" 
                            />
                        </div>
                    </div>

                    {/* Status Toggle (only if editing) */}
                    {scheduleToEdit && (
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Tracking Status</label>
                            <div className="flex gap-2">
                                {['Scheduled', 'Completed', 'Missed'].map(s => (
                                    <button
                                        key={s}
                                        type="button"
                                        onClick={() => setFormData({ ...formData, status: s })}
                                        className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all duration-200 border ${
                                            formData.status === s 
                                            ? (s === 'Completed' ? 'bg-green-600/20 border-green-500 text-green-400' : s === 'Missed' ? 'bg-red-600/20 border-red-500 text-red-400' : 'bg-blue-600/20 border-blue-500 text-blue-400')
                                            : 'bg-[#1a1a1a] border-[#333] text-gray-400 hover:bg-[#222]'
                                        }`}
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Notes */}
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1.5">Notes (Optional)</label>
                        <textarea 
                            rows="2" 
                            value={formData.notes} 
                            onChange={e => setFormData({ ...formData, notes: e.target.value })} 
                            className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 transition-colors resize-none custom-scrollbar" 
                            placeholder="Any notes about this session..."
                        ></textarea>
                    </div>

                </form>

                <div className="p-5 border-t border-[#2a2a2a] flex justify-between items-center bg-[#1a1a1a] shrink-0">
                    {scheduleToEdit ? (
                        <button type="button" onClick={handleDelete} disabled={loading} className="px-4 py-2 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors border border-transparent hover:border-red-500/20">
                            Delete
                        </button>
                    ) : (
                        <div></div>
                    )}
                    <div className="flex gap-3">
                        <button type="button" onClick={onClose} disabled={loading} className="px-5 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-[#2a2a2a] transition-colors">
                            Cancel
                        </button>
                        <button type="submit" disabled={loading} onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 rounded-xl text-sm font-medium transition-colors shadow-lg shadow-blue-500/20 flex items-center gap-2 disabled:opacity-50">
                            {loading && <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>}
                            {scheduleToEdit ? 'Save Changes' : 'Schedule'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ScheduleModal;
