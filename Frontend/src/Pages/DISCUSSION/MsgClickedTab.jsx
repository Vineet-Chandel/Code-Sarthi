import { motion } from "framer-motion";
import React, { useState } from "react";
import axios from "axios";
import BASE_URL from "../auth/baseURL";
import { useDispatch, useSelector } from "react-redux";
import { updateMessage, removeMessage } from "../../utils/messageSlice";
import { useTeamChat } from './TeamChatContext';

const MsgClickedTab = ({ setForwardTabOpen, forwardTabOpen, senderId, msg, setMessageTab, messageTab, setReplyHandeler, replyHandeler, selectedChatUser, addToast }) => {

    const dispatch = useDispatch();
    const user = useSelector(state => state.user?.user?.DATA);
    const msgObject = messageTab?.setMsg;
    const { activeTeamId, activeConversationId, teamWorkspace } = useTeamChat();

    const [isCopied, setIsCopied] = useState({
        isCopied: false,
        idx: null
    })

    const buttons = [
        {
            title: "Reply",
            icon: (<svg xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" viewBox="0 0 24 24">
                <path fill="#fff" d="M10 9V7.41c0-.89-1.08-1.34-1.71-.71L3.7 11.29a.996.996 0 0 0 0 1.41l4.59 4.59c.63.63 1.71.19 1.71-.7V14.9c5 0 8.5 1.6 11 5.1c-1-5-4-10-11-11"></path>
            </svg>),
            show: true
        },
        {
            title: "Copy Text",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" viewBox="0 0 24 24">
                    <g fill="none" stroke="#fff" strokeWidth={1.5}>
                        <path d="M6 11c0-2.828 0-4.243.879-5.121C7.757 5 9.172 5 12 5h3c2.828 0 4.243 0 5.121.879C21 6.757 21 8.172 21 11v5c0 2.828 0 4.243-.879 5.121C19.243 22 17.828 22 15 22h-3c-2.828 0-4.243 0-5.121-.879C6 20.243 6 18.828 6 16z"></path>
                        <path d="M6 19a3 3 0 0 1-3-3v-6c0-3.771 0-5.657 1.172-6.828S7.229 2 11 2h4a3 3 0 0 1 3 3"></path>
                    </g>
                </svg>
            ),
            show: true
        },
        {
            title: "Forward",
            icon: (<svg xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" viewBox="0 0 24 24">
                <path fill="#fff" d="m16 17l-1.425-1.4l4.6-4.6l-4.6-4.6L16 5l6 6zM2 19v-4q0-2.075 1.463-3.537T7 10h6.175l-3.6-3.6L11 5l6 6l-6 6l-1.425-1.4l3.6-3.6H7q-1.25 0-2.125.875T4 15v4z"></path>
            </svg>),
            show: true
        },
        {
            title: "Save",
            icon: (<svg xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></svg>),
            show: true
        },
        {
            title: "Edit",
            icon: (<svg xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" viewBox="0 0 24 24">
                <path fill="#fff" d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75zM20.71 7.04a.996.996 0 0 0 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83l3.75 3.75z"></path>
            </svg>),
            show: String(senderId) === String(user?._id)
        },
        {
            title: "Delete",
            icon: (<svg xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" viewBox="0 0 24 24">
                <path fill="#fff" d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6zM19 4h-3.5l-1-1h-5l-1 1H5v2h14z"></path>
            </svg>),
            show: String(senderId) === String(user?._id)
        }
    ];

    const activeButtons = buttons.filter(b => b.show);

    const handleCopy = async (text, idx) => {
        try {
            setIsCopied({
                isCopied: true,
                idx: idx
            });
            await navigator.clipboard.writeText(text);

        } catch (err) {
            addToast && addToast({
                type: "error",
                title: "Error",
                message: err?.message || "Something went wrong"
            });
        }
    };

    const handleEdit = async () => {
        const newContent = prompt("Edit message:", msgObject?.content);
        if (newContent !== null && newContent.trim() !== "" && newContent !== msgObject?.content) {
            try {
                const res = await axios.put(BASE_URL + "/api/messages/" + msgObject._id, {
                    content: newContent
                }, { withCredentials: true });
                if (res.data.success) {
                    dispatch(updateMessage({
                        conversation_id: msgObject.conversation_id,
                        _id: msgObject._id,
                        content: newContent
                    }));
                }
            } catch (err) {
                console.error("Failed to edit message", err);
            }
        }
        setMessageTab(prev => ({ ...prev, isOpen: false, idx: null }));
    };

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this message?")) {
            try {
                const res = await axios.delete(BASE_URL + "/api/messages/" + msgObject._id, {
                    withCredentials: true
                });
                if (res.data.success) {
                    dispatch(removeMessage({
                        conversation_id: msgObject.conversation_id,
                        _id: msgObject._id
                    }));
                }
            } catch (err) {
                console.error("Failed to delete message", err);
            }
        }
        setMessageTab(prev => ({ ...prev, isOpen: false, idx: null }));
    };

    const handleSave = async () => {
        try {
            let sourceText = "";
            if (activeTeamId && teamWorkspace) {
                if (activeConversationId === teamWorkspace.generalConversationId) {
                    sourceText = `Saved from: ${teamWorkspace.team.name} / general-chat`;
                } else {
                    let issueName = "issue-thread";
                    let projectName = "Project";
                    for (const proj of teamWorkspace.projects) {
                        const issue = proj.issues?.find(i => i.conversationId === activeConversationId);
                        if (issue) {
                            issueName = issue.title;
                            projectName = proj.name;
                            break;
                        }
                    }
                    sourceText = `Saved from: ${teamWorkspace.team.name} / ${projectName} / ${issueName}`;
                }
            } else if (selectedChatUser) {
                const chatName = selectedChatUser.info?.name || (selectedChatUser.info?.firstName ? selectedChatUser.info.firstName + " " + selectedChatUser.info.lastName : "Chat");
                sourceText = `Saved from: Chat with ${chatName}`;
            }

            const fullContent = `${msgObject.content}\n\n— *${sourceText}*`;

            const savedChatRes = await axios.get(BASE_URL + "/api/saved-messages", { withCredentials: true });
            const savedConvoId = savedChatRes.data.data._id;

            await axios.post(BASE_URL + "/api/send-message", {
                conversationId: savedConvoId,
                content: fullContent,
                messageType: "text"
            }, { withCredentials: true });

            if (addToast) addToast({ type: "success", title: "Saved", message: "Message saved to your Saved Messages" });
        } catch (err) {
            console.error("Failed to save message", err);
            if (addToast) addToast({ type: "error", title: "Error", message: "Failed to save message" });
        }
        setMessageTab(prev => ({ ...prev, isOpen: false, idx: null }));
    };

    return (
        <motion.div
            animate={{
                opacity: [0, 1],
                scale: 1
            }}
            transition={{ duration: 0.3 }}
            className=" z-50 p-2 w-[170px] rounded-3xl bg-[#212121] backdrop-blur-xl  shadow-xl overflow-hidden">
            {activeButtons.map((item, idx) => (
                <React.Fragment key={idx}>
                    <button
                        onClick={() => {
                            if (item.title === "Reply") {
                                setReplyHandeler({
                                    isOpen: true,
                                    senderId: senderId,
                                    name: selectedChatUser?.info?.firstName + " " + selectedChatUser?.info?.lastName || "Unknown",
                                    msg: msg
                                })
                                setMessageTab(prev => ({ ...prev, isOpen: false, idx: null }));
                            }
                            if (item.title === "Copy Text") {
                                handleCopy(msg, idx);
                                setMessageTab(prev => ({ ...prev, isOpen: false, idx: null }));
                            }
                            if (item.title === "Forward") {
                                setForwardTabOpen(true)
                                setMessageTab(prev => ({ ...prev, isOpen: false, idx: null }));
                            }
                            if (item.title === "Save") {
                                handleSave();
                            }
                            if (item.title === "Edit") {
                                handleEdit();
                            }
                            if (item.title === "Delete") {
                                handleDelete();
                            }
                        }}
                        className="relative z-30 flex items-center gap-2 w-full rounded-3xl px-3 py-2 text-white hover:bg-white/20 transition-all duration-200  "
                    >
                        <span className="text-sm ">
                            {item.icon}
                        </span>
                        <span className="text-sm font-medium">{item.title}</span>
                    </button>
                    {idx < activeButtons.length - 1 && (
                        <div className="w-full h-[1px] bg-white/20 my-1" ></div>
                    )}
                </React.Fragment>
            ))
            }
        </motion.div >
    );
};

export default MsgClickedTab;