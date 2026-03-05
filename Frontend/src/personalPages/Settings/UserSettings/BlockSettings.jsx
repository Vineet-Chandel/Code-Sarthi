import React from 'react'
import { addBlockedUsers, clearBlockedUser } from "../../../utils/blockedSlice";
import { BASE_URL } from "../../../Pages/auth/baseURL";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";



const BlockSettings = () => {
    const user = useSelector(store => store.user);
    const blockedUsers = useSelector(
        store => store.blockedUsers?.users || []
    );

    const dispatch = useDispatch();
    const blockedPeoples = async () => {
        try {
            const res = await axios.get(
                `${BASE_URL}/user/blocked`,
                { withCredentials: true }
            )
            dispatch(addBlockedUsers(res.data.data));

        } catch (err) {
            console.error(err?.message || err);
        }
    }
    useEffect(() => {
        blockedPeoples();
    }, []);
    const HandleUnblock = async (blockId) => {
        try {
            const res = await axios.delete(
                `${BASE_URL}/user/blocked/${blockId}`,
                { withCredentials: true }
            )
            dispatch(clearBlockedUser(blockId));
        } catch (err) {
            console.error(err?.message || err);
        }
    }
    return (<div className="space-y-2">
        {blockedUsers.map((item) => (
            <motion.div
                key={item.connectionId}
                className="flex items-center justify-between p-3 bg-black/20 border border-red-500/20 rounded-lg"
                whileHover={{ scale: 1.02, borderColor: 'rgba(255,0,0,0.5)' }}
            >
                <span className="font-mono text-sm">{item.firstName} {item.middleName} {item.lastName}</span>
                <button className="text-xs text-red-400 hover:text-red-300" onClick={() => HandleUnblock(item.blockId)}>UNBLOCK</button>
            </motion.div>
        ))}
    </div>)
}

export default BlockSettings