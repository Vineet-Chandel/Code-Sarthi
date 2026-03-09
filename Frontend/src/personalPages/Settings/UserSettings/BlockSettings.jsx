import React, { useEffect } from "react";
import { addBlockedUsers, clearBlockedUser } from "../../../utils/blockedSlice";
import { BASE_URL } from "../../../Pages/auth/baseURL";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";

const BlockSettings = () => {

    const dispatch = useDispatch();

    const blockedUsers = useSelector(
        (store) => store.blockedUsers?.users || []
    );

    const fetchBlockedUsers = async () => {
        try {
            const res = await axios.get(
                `${BASE_URL}/user/blocked`,
                { withCredentials: true }
            );

            dispatch(addBlockedUsers(res.data.data));

        } catch (err) {
            console.error(err?.response?.data || err.message);
        }
    };

    useEffect(() => {
        fetchBlockedUsers();
    }, []);

    const handleUnblock = async (blockId) => {
        try {

            await axios.delete(
                `${BASE_URL}/user/blocked/${blockId}`,
                { withCredentials: true }
            );

            dispatch(clearBlockedUser(blockId));

        } catch (err) {
            console.error(err?.response?.data || err.message);
        }
    };

    return (
        <div className="space-y-2">

            {blockedUsers.length === 0 && (
                <p className="text-gray-400 text-sm">
                    No blocked users
                </p>
            )}

            {blockedUsers.map((item) => (
                <motion.div
                    key={item.blockId}
                    className="flex items-center justify-between p-3 bg-black/20 border border-red-500/20 rounded-lg"
                    whileHover={{ scale: 1.02, borderColor: "rgba(255,0,0,0.5)" }}
                >
                    <span className="font-mono text-sm">
                        {item.firstName} {item.middleName} {item.lastName}
                    </span>

                    <button
                        className="text-xs text-red-400 hover:text-red-300"
                        onClick={() => handleUnblock(item.blockId)}
                    >
                        UNBLOCK
                    </button>
                </motion.div>
            ))}

        </div>
    );
};

export default BlockSettings;