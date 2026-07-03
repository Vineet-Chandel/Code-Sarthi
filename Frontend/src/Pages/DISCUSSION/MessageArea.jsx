import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react'
import MsgClickedTab from './MsgClickedTab';
import { useRef } from "react";


const dummyConversation = [
    { sender: "user1", text: "Hey! 👋 Ready to start building the new feature?" },
    {
        sender: "user1",
        text: "I’m going to send a few ideas very quickly."
    },
    { sender: "user1", text: "1" },
    { sender: "user1", text: "2" },
    { sender: "user1", text: "3" },
    { sender: "user1", text: "4" },
    { sender: "user1", text: "5" },

    {
        sender: "user2",
        text: "Awesome 😄 Let’s do this!"
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
        text: `// Plan: Build a simple chat component with React + Tailwind\nfunction ChatBox() {\n  const [messages, setMessages] = React.useState([]);\n\n  return (\n    <div className=\"flex flex-col gap-2 p-4\">\n      {messages.map(m => <Message key={m.id} data={m} />)}\n    </div>\n  );\n}`
    },

    {
        sender: "user2",
        text: `// Nice start! Maybe add a typing indicator component:\nfunction TypingIndicator() {\n  return (\n    <div className=\"text-sm text-gray-500\">User is typing...</div>\n  );\n}`
    },

    {
        sender: "user1",
        text: `SELECT *\nFROM chat_messages\nWHERE room_id = :roomId\nORDER BY created_at ASC;\n-- We’ll use this to load initial messages.`
    },

    {
        sender: "user2",
        text: "# Chat Feature Plan\n## Overview\n- React frontend\n- Express backend\n- WebSocket for real-time\n\n## Steps\n- 1. Setup repo\n- 2. Implement DB schema\n- 3. Build WebSocket handler\n- 4. Connect React client"
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
        sender: "user1",
        text: "Let’s start with the backend WebSocket handler:\n\n```js\nconst WebSocket = require('ws');\n\nconst wss = new WebSocket.Server({ port: 8080 });\n\nwss.on('connection', (ws) => {\n  ws.on('message', (msg) => {\n    const data = JSON.parse(msg);\n    // broadcast to all clients\n    wss.clients.forEach(client => {\n      if (client !== ws && client.readyState === WebSocket.OPEN) {\n        client.send(msg);\n      }\n    });\n  });\n});\n```"
    },

    {
        sender: "user2",
        text: "Great! I’ll add a React client that connects to this:\n\n```js\n// ChatClient.jsx\nimport { useEffect, useRef } from 'react';\n\nexport function ChatClient() {\n  const wsRef = useRef(null);\n\n  useEffect(() => {\n    const ws = new WebSocket('ws://localhost:8080');\n    wsRef.current = ws;\n\n    ws.onmessage = (event) => {\n      const data = JSON.parse(event.data);\n      console.log('Received:', data);\n    };\n\n    return () => ws.close();\n  }, []);\n\n  const sendMessage = () => {\n    if (wsRef.current?.readyState === WebSocket.OPEN) {\n      wsRef.current.send(JSON.stringify({ type: 'message', content: 'Hello from React!' }));\n    }\n  };\n\n  return <button onClick={sendMessage}>Send</button>;\n}\n```"
    },

    {
        sender: "user1",
        text: "Perfect! Now let’s integrate this with our Express server so we can serve React from the same app:\n\n```js\n// server.js\nimport express from 'express';\nimport { createServer } from 'http';\nimport { WebSocketServer } from 'ws';\nimport path from 'path';\n\nconst app = express();\nconst httpServer = createServer(app);\nconst wss = new WebSocketServer({ server: httpServer });\n\napp.use(express.static(path.resolve('./dist')));\n\nwss.on('connection', (ws) => {\n  ws.on('message', (msg) => {\n    const data = JSON.parse(msg);\n    wss.clients.forEach(client => {\n      if (client.readyState === WebSocket.OPEN) {\n        client.send(msg);\n      }\n    });\n  });\n});\n\nhttpServer.listen(3000, () => console.log('Server running on :3000'));\n```"
    },

    {
        sender: "user2",
        text: "Awesome synergy! I’ll also add a simple message store in memory so we can persist messages briefly:\n\n```js\nconst messageStore = [];\n\nwss.on('connection', (ws) => {\n  ws.on('message', (msg) => {\n    const data = JSON.parse(msg);\n    messageStore.push(data);\n    wss.clients.forEach(client => {\n      if (client.readyState === WebSocket.OPEN) {\n        client.send(msg);\n      }\n    });\n  });\n});\n\napp.get('/messages', (_, res) => {\n  res.json(messageStore);\n});\n```"
    },

    {
        sender: "user1",
        text: "Let’s now make the React side fetch initial messages and append new ones:\n\n```js\n// ChatBox.jsx\nimport { useEffect, useState, useRef } from 'react';\n\nexport function ChatBox() {\n  const [messages, setMessages] = useState([]);\n  const wsRef = useRef(null);\n\n  useEffect(() => {\n    // Load initial messages\n    fetch('/messages')\n      .then(r => r.json())\n      .then(setMessages);\n\n    const ws = new WebSocket('ws://localhost:3000');\n    wsRef.current = ws;\n\n    ws.onmessage = (event) => {\n      const data = JSON.parse(event.data);\n      setMessages(prev => [...prev, data]);\n    };\n\n    return () => ws.close();\  );\n\n  const send = (text) => {\n    if (wsRef.current?.readyState === WebSocket.OPEN) {\n      wsRef.current.send(JSON.stringify({ type: 'message', content: text }));\n    }\n  };\n\n  return (\n    <div className=\"flex flex-col gap-2 p-4\">\n      {messages.map(m => <div>{m.content}</div>)}\n      <input onKeyDown={e => e.key === 'Enter' && send(e.target.value)} />\n    </div>\n  );\n}\n```"
    },

    {
        sender: "user2",
        text: "Looks great! A few small improvements:\n- Add a unique ID to each message\n- Debounce re-sends if needed\n- Show user nicknames\n\nI’ll add a tiny helper:\n\n```js\nfunction makeMessage(content, user = 'user1') {\n  return { id: crypto.randomUUID(), content, user, createdAt: Date.now() };\n}\n```"
    },

    {
        sender: "user1",
        text: "Nice! Let’s wire that into the server so each message gets an ID:\n\n```js\nwss.on('connection', (ws) => {\n  ws.on('message', (msg) => {\n    const data = JSON.parse(msg);\n    const enriched = makeMessage(data.content, data.user || 'user1');\n    messageStore.push(enriched);\n    wss.clients.forEach(client => {\n      if (client.readyState === WebSocket.OPEN) {\n        client.send(JSON.stringify(enriched));\n      }\n    });\n  });\n});\n```"
    },

    {
        sender: "user2",
        text: "Perfect collaboration! Now the UI can show usernames and timestamps:\n\n```js\n{messages.map(m => (\n  <div key={m.id} className=\"flex gap-2\">\n    <span className=\"text-xs text-gray-500\">{m.user}</span>\n    <span>{m.content}</span>\n    <span className=\"text-xs text-gray-400\">{new Date(m.createdAt).toLocaleTimeString()}</span>\n  </div>\n))}\n```"
    },

    {
        sender: "user1",
        text: "This is moving so smoothly 🚀 I’ll add a simple CSS animation for new messages with Tailwind + a tiny custom class:\n\n```css\n/* styles.css */\n@keyframes slideIn {\n  from { opacity: 0; transform: translateY(4px); }\n  to { opacity: 1; transform: translateY(0); }\n}\n\n.new-message {\n  animation: slideIn 0.2s ease-out;\n}\n```"
    },

    {
        sender: "user2",
        text: "Great idea! I’ll apply it conditionally:\n\n```js\n{messages.map(m => (\n  <div\n    key={m.id}\n    className={`flex gap-2 new-message`}\n  >\n    <span className=\"text-xs text-gray-500\">{m.user}</span>\n    <span>{m.content}</span>\n    <span className=\"text-xs text-gray-400\">{new Date(m.createdAt).toLocaleTimeString()}</span>\n  </div>\n))}\n```"
    },

    {
        sender: "user1",
        text: "Done ✅"
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
    const [messageTab, setMessageTab] = useState({
        isOpen: false,
        idx: null,
        x: 0,
        y: 0,
        setMsg: ""
    });
    const chatRef = useRef(null);

    useEffect(() => {
        const chat = chatRef.current;

        if (!chat) return;

        const handleScroll = () => {
            setMessageTab(prev => ({
                ...prev,
                isOpen: false,
            }));
        };
        chat.scrollTop = chat.scrollHeight;
        chat.addEventListener("scroll", handleScroll);

        return () => {
            chat.removeEventListener("scroll", handleScroll);
        };

    }, []);


    return (
        <div className='relative z-10 text-white  h-full w-full flex flex-col justify-end items-end '>
            {/* Top */}


            {messageTab.isOpen && (
                <div
                    className="fixed z-50"
                    style={{
                        left: messageTab.x,
                        top: messageTab.y,
                    }}
                >
                    <MsgClickedTab msg={messageTab.setMsg} />
                </div>
            )}
            <div className="pointer-events-none absolute top-0 left-0 right-0 h-20 z-20 bg-gradient-to-b from-black/30 via-black/10 to-transparent dark:from-black/60 dark:via-black/20" />




            <div
                ref={chatRef}
                onClick={() => setMessageTab(prev => ({
                    ...prev,
                    isOpen: false,
                }))}

                className='h-full w-full overflow-y-scroll'>

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
                                    onContextMenu={(e) => {
                                        e.preventDefault();


                                        setMessageTab({
                                            isOpen: true,
                                            idx: idx,
                                            x: e.clientX,
                                            y: e.clientY,
                                            setMsg: items.text
                                        });
                                    }}
                                    className='w-full flex items-center justify-start  mt-1 relative'>


                                    <div

                                        className={`max-w-[45%] break-words [overflow-wrap:anywhere] whitespace-pre-wrap overflow-hidden [overflow-wrap:anywhere] flex  font-poppins  ${items.text.length > 40 ? "flex-col items-start gap-2" : "items-end gap-3 flex-row "} min-w-[10%] bg-white/20 py-3 px-5   ${isSingle ? SingleClassName : isFirst ? FirstClassName : isMiddle ? MiddleClassName : isLast ? LastClassName : ""}`}>

                                        {displayText.replace(/\t/g, "    ")}

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
                                                <path d="M18 15L12 9L6 15" stroke="#aeacacff" strokeWidth="2" />
                                            </svg>}
                                        </div>}
                                    </div>


                                </div>
                            ) : (

                                <div
                                    onContextMenu={(e) => {
                                        e.preventDefault();


                                        setMessageTab({
                                            isOpen: true,
                                            idx: idx,
                                            x: e.clientX,
                                            y: e.clientY,
                                            setMsg: items.text
                                        });
                                    }}
                                    className='w-full flex items-center justify-end  mt-1 relative'>

                                    <div

                                        className={`max-w-[45%] break-words [overflow-wrap:anywhere] whitespace-pre-wrap overflow-hidden [overflow-wrap:anywhere] flex  font-poppins   ${items.text.length > 40 ? "flex-col items-start gap-2" : "justify-end gap-3 flex-col items-end"} bg-white text-black py-3 px-5    ${isSingle ? singleClass : isFirst ? firstClass : isMiddle ? middleClass : isLast ? lastClass : ""}`}>


                                        {displayText.replace(/\t/g, "    ")}

                                        <span className="text-xs font-mono text-gray-700"><span>12:51 AM</span>

                                            {true ? (<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                                                <path fill="#fff" d="M.41 13.41L6 19l1.41-1.42L1.83 12m20.41-6.42L11.66 16.17L7.5 12l-1.43 1.41L11.66 19l12-12M18 7l-1.41-1.42l-6.35 6.35l1.42 1.41z"></path>
                                            </svg>) : (false ? (<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16">
                                                <polyline fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} points="2.75 8.75 6.25 12.25 13.25 4.75"></polyline>
                                            </svg>) : (false ? (<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                                                <path fill="currentColor" d="M12.713 16.713Q13 16.425 13 16t-.288-.712T12 15t-.712.288T11 16t.288.713T12 17t.713-.288m0-4Q13 12.425 13 12V8q0-.425-.288-.712T12 7t-.712.288T11 8v4q0 .425.288.713T12 13t.713-.288M12 22q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"></path>
                                            </svg>) : (<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16">
                                                <path fill="currentColor" d="M8 9.5a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3"></path>
                                            </svg>)))}
                                            <span></span> </span>

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
                                                <path d="M18 15L12 9L6 15" stroke="#7f7c7cff" strokeWidth="2" />
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