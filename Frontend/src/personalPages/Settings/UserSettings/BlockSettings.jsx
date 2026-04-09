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
                <p className="text-secondary text-2xl flex gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 24 24"><path fill="#9f2d00" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4s-4 1.79-4 4s1.79 4 4 4m0 2c-2.67 0-8 1.34-8 4v1c0 .55.45 1 1 1h14c.55 0 1-.45 1-1v-1c0-2.66-5.33-4-8-4"></path></svg>
                    No blocked users
                </p>
            )}

            {blockedUsers.map((item) => (
                <div
                    key={item.blockId}
                    className="group flex items-center justify-between p-3 bg-base-100 border border-accent hover:bg-base-300 border-[2px] rounded-lg"

                >
                    <span className=" text-lg text-secondary flex gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 24 24"><path fill="#9f2d00" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4s-4 1.79-4 4s1.79 4 4 4m0 2c-2.67 0-8 1.34-8 4v1c0 .55.45 1 1 1h14c.55 0 1-.45 1-1v-1c0-2.66-5.33-4-8-4"></path></svg> {item.firstName} {item.middleName} {item.lastName}
                    </span>

                    <button
                        className="text-xs text-accent group-hover:bg-base-100 px-4 py-2 rounded-xl border border-accent group-hover:border-[2px] group-hover:border-secondary "
                        onClick={() => handleUnblock(item.blockId)}
                    >
                        UNBLOCK
                    </button>
                </div>
            ))}

        </div>
    );
};

export default BlockSettings;