import { useState, useRef, useEffect } from "react";
import { Smile } from "lucide-react";


export default function EmojiPicker() {

    const [message, setMessage] = useState("");
    const pickerRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(e) {
            if (pickerRef.current && !pickerRef.current.contains(e.target)) {
                setShowPicker(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleEmojiClick = (emoji) => {
        setMessage((prev) => prev + emoji);
    };

    return (
        <div className="w-full max-w-md mx-auto p-4">
            <div className="flex items-center border rounded-2xl px-3 py-2 shadow-sm">


                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message"
                    className="flex-1 outline-none px-2"
                />
            </div>

            {showPicker && (
                <div
                    ref={pickerRef}
                    className="mt-2 bg-white border rounded-2xl shadow-lg p-3 grid grid-cols-8 gap-2 max-h-64 overflow-y-auto"
                >
                    {smileys_people.map((emoji, index) => (
                        <button
                            key={index}
                            onClick={() => handleEmojiClick(emoji)}
                            className="text-xl hover:bg-gray-100 rounded-lg p-1"
                        >
                            {emoji}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
