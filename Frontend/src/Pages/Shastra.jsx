import { useState, useRef, useCallback } from "react";



const useLongPress = (callback, ms = 500) => {
    const [isHolding, setIsHolding] = useState(false);
    const timeoutRef = useRef(null);

    const start = useCallback((event) => {
        // Prevent default behavior to stop accidental scrolling/zooming on mobile
        if (event.cancelable) event.preventDefault();

        setIsHolding(true);
        timeoutRef.current = setTimeout(() => {
            callback(event);
        }, ms);
    }, [callback, ms]);

    const stop = useCallback(() => {
        setIsHolding(false);
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    }, []);

    return {
        onPointerDown: start,
        onPointerUp: stop,
        onPointerLeave: stop, // Stops the action if user drags cursor away
        className: isHolding ? "holding" : "" // Optional: utility to help with styling
    };
};
const Shastra = () => {

    const handleLongPress = () => {
        alert("Action triggered! You held the button for over 500ms.");
    };

    // Instantiate hook with custom action and time window
    const longPressEvents = useLongPress(handleLongPress, 600);
    return (
        <div className="flex justify-center items-center h-screen bg-neutral-950">
            <button
                {...longPressEvents}
                className="px-6 py-3 bg-white text-black font-medium rounded-lg select-none 
                           active:scale-95 transition-transform duration-150 cursor-pointer"
            >
                Press & Hold Me
            </button>
        </div>
    )
}

export default Shastra