import { motion } from 'framer-motion';
import React, { useState } from 'react'


const dummyConversation = [
    { sender: "user1", text: "Hi 👋" },

    {
        sender: "user1",
        text: "I'm going to send multiple messages very quickly."
    },
    { sender: "user1", text: "1" },
    { sender: "user1", text: "2" },
    { sender: "user1", text: "3" },
    { sender: "user1", text: "4" },
    { sender: "user1", text: "5" },

    {
        sender: "user2",
        text: "Nice 😂"
    },

    {
        sender: "user2",
        text: "This is a paragraph.\n\nIt contains blank lines.\n\nThe spacing should remain exactly the same after rendering."
    },

    {
        sender: "user1",
        text: "Line 1\nLine 2\n\n\nLine 5\n\n\n\nLine 9"
    },

    {
        sender: "user2",
        text: "          Leading spaces should not disappear."
    },

    {
        sender: "user1",
        text: "Trailing spaces should remain.          "
    },

    {
        sender: "user2",
        text: "Tabs\t\t\tshould\talso\twork."
    },

    {
        sender: "user1",
        text: "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"
    },

    {
        sender: "user2",
        text: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
    },

    {
        sender: "user1",
        text: "111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111"
    },

    {
        sender: "user2",
        text: "______________________________________________________________"
    },

    {
        sender: "user1",
        text: "..........................................................................................................................................................."
    },

    {
        sender: "user2",
        text: "---------------------------------------------------------------------------------------------------------------"
    },

    {
        sender: "user1",
        text: "https://www.this-is-an-extremely-long-domain-name-for-testing-chat-ui-wrapping-example.com/some/really/really/really/really/really/really/really/really/long/path/index.html?user=vineet&id=93847298374982374982374982374&token=abcdefghijklmnopqrstuvwxyz"
    },

    {
        sender: "user2",
        text: "user@example.com\nadmin@example.com\nsupport@example.com"
    },

    {
        sender: "user1",
        text: "😀😃😄😁😆😅😂🤣😊😇🙂🙃😉😍🥰😘😗😙😚🤪😜🤨🧐🤓😎🥳🤯🤖👻☠️👽🤡🎃👾"
    },

    {
        sender: "user2",
        text: "❤️🧡💛💚💙💜🖤🤍🤎💔❤️‍🔥❤️‍🩹💖💗💘💝💞💕💓💟"
    },

    {
        sender: "user1",
        text: "🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀"
    },

    {
        sender: "user2",
        text: "🍔🍟🍕🌮🌯🥗🍣🍱🍛🍜🍩🍪🍫🍰☕🍺🥤🥭🍉🍇🍓🍒🥝🥥"
    },

    {
        sender: "user1",
        text: `function sendMessage(socket) {
    if (!socket) return;

    socket.send(JSON.stringify({
        type: "message",
        content: "Hello World"
    }));
}`
    },

    {
        sender: "user2",
        text: `<div class="chat">
    <p>Hello World</p>
</div>`
    },

    {
        sender: "user1",
        text: `SELECT *
FROM users
WHERE online = true
ORDER BY lastSeen DESC;`
    },

    {
        sender: "user2",
        text: "# Heading\n## Heading 2\n### Heading 3\n- Item 1\n- Item 2\n- Item 3"
    },

    {
        sender: "user1",
        text: "नमस्ते! यह हिन्दी भाषा का परीक्षण संदेश है।"
    },

    {
        sender: "user2",
        text: "こんにちは！日本語でも表示を確認します。"
    },

    {
        sender: "user1",
        text: "你好！这是中文测试消息。"
    },

    {
        sender: "user2",
        text: "안녕하세요. 한국어 메시지 테스트입니다."
    },

    {
        sender: "user1",
        text: "مرحبًا، هذه رسالة باللغة العربية لاختبار اتجاه النص."
    },

    {
        sender: "user2",
        text: "עברית צריכה להיות מוצגת בצורה תקינה."
    },

    {
        sender: "user1",
        text: "English العربية हिन्दी 中文 日本語 한국어 😀🚀❤️"
    },

    {
        sender: "user2",
        text: "@vineet can you review this?"
    },

    {
        sender: "user1",
        text: "#general #backend #frontend #design"
    },

    {
        sender: "user2",
        text: "$1234567890.99 + ₹987654321 + €2000 + ¥100000"
    },

    {
        sender: "user1",
        text: "2026-07-01T18:34:59.123Z"
    },

    {
        sender: "user2",
        text: "████████████████████████████████████████████████████████████"
    },

    {
        sender: "user1",
        text: "□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□"
    },

    {
        sender: "user2",
        text: "◉◎●○◌◍◐◑◒◓◔◕"
    },

    {
        sender: "user1",
        text: "╔════════════════════════════╗\n║      CHAT UI TESTING       ║\n╚════════════════════════════╝"
    },

    {
        sender: "user2",
        text: "💬".repeat(250)
    },

    {
        sender: "user1",
        text: "This is an intentionally massive paragraph. ".repeat(80)
    },
    {
        sender: "user2",
        text: "This is an intentionally massive paragraph. ".repeat(80)
    },


    {
        sender: "user2",
        text: "Done ✅"
    }
];

const MessageArea = () => {

    const [readMore, setReadMore] = useState({
        idx: null,
        isOpen: false,
    });


    return (
        <div className='relative z-10 text-white  h-full w-full flex flex-col justify-end items-end '>

            <div className='h-full w-full overflow-y-scroll'>
                {dummyConversation.map((items, idx) => {

                    const expanded = readMore.idx === idx && readMore.isOpen;

                    const displayText =
                        items.text.length > 500
                            ? expanded
                                ? items.text
                                : items.text.slice(0, 500) + "..."
                            : items.text;



                    const prev = dummyConversation[idx - 1];
                    const next = dummyConversation[idx + 1];

                    const isSameAsPrev = prev?.sender === items.sender;
                    const isSameAsNext = next?.sender === items.sender;

                    const isSingle = !isSameAsPrev && !isSameAsNext;
                    const isFirst = !isSameAsPrev && isSameAsNext;
                    const isMiddle = isSameAsPrev && isSameAsNext;
                    const isLast = isSameAsPrev && !isSameAsNext;


                    const SingleClassName = "  rounded-t-xl rounded-r-xl"
                    const FirstClassName = "rounded-t-xl rounded-r-xl rounded-bl-xl";
                    const MiddleClassName = "rounded-xl ";

                    const LastClassName = "rounded-r-xl rounded-tl-md rounded-bl-xl";



                    const singleClass =
                        "rounded-t-xl rounded-l-xl";

                    const firstClass =
                        "rounded-t-xl rounded-l-xl rounded-br-md";

                    const middleClass =
                        "rounded-l-xl rounded-r-md";

                    const lastClass =
                        "rounded-l-xl rounded-tr-md rounded-br-xl";

                    return (

                        <div key={idx} >
                            {items.sender === "user1" ? (
                                <div

                                    className='w-full flex items-center justify-start  mt-1'>
                                    <div className={`max-w-[45%] break-all whitespace-pre-wrap overflow-hidden [overflow-wrap:anywhere] flex  font-poppins  ${items.text.length > 40 ? "flex-col items-start gap-2" : "items-end gap-3 flex-row "} min-w-[10%] bg-white/20 py-3 px-5   ${isSingle ? SingleClassName : isFirst ? FirstClassName : isMiddle ? MiddleClassName : isLast ? LastClassName : ""}`}>

                                        {displayText}

                                        <span className="text-xs font-mono text-gray-400">12:51 AM</span>


                                        {items.text.length > 500 && < div onClick={() => {
                                            if (readMore.idx === idx) {
                                                setReadMore({
                                                    idx: null,
                                                    isOpen: false,
                                                });
                                            } else {
                                                setReadMore({
                                                    idx,
                                                    isOpen: true,
                                                });
                                            }
                                        }} className='w-full flex items-center justify-center '>


                                            {<svg className={`cursor-pointer hover:bg-white/20 p-1 rounded-full transition-all duration-300 ${readMore.idx === idx && readMore.isOpen ? "" : "rotate-180"
                                                }`} width="35" height="35" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M18 15L12 9L6 15" stroke="#aeacacff" stroke-width="2" />
                                            </svg>}
                                        </div>}
                                    </div>
                                </div>
                            ) : (

                                <div className='w-full flex items-center justify-end  mt-1'>
                                    <div className={`max-w-[45%] break-all whitespace-pre-wrap overflow-hidden   [word-break:break-word] min-w-[10%] flex   font-poppins ${items.text.length > 40 ? "flex-col items-end gap-2" : "items-center gap-3 flex-row"} bg-white text-black py-3 px-5    ${isSingle ? singleClass : isFirst ? firstClass : isMiddle ? middleClass : isLast ? lastClass : ""}`}>


                                        {displayText}

                                        <span className="text-xs font-mono text-gray-700">12:51 AM</span>

                                        {items.text.length > 500 && < div onClick={() => {
                                            if (readMore.idx === idx) {
                                                setReadMore({
                                                    idx: null,
                                                    isOpen: false,
                                                });
                                            } else {
                                                setReadMore({
                                                    idx,
                                                    isOpen: true,
                                                });
                                            }
                                        }} className='w-full flex items-center justify-center '>


                                            {<svg className={`cursor-pointer hover:bg-black/10 p-1 rounded-full transition-all duration-300 ${readMore.idx === idx && readMore.isOpen ? "" : "rotate-180"
                                                }`} width="35" height="35" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M18 15L12 9L6 15" stroke="#7f7c7cff" stroke-width="2" />
                                            </svg>}
                                        </div>}
                                    </div>

                                </div>
                            )}


                        </div>

                    )
                })}
            </div>



        </div >
    )
}

export default MessageArea