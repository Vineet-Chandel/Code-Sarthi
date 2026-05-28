import React from 'react'

const Step = ({ index }) => {
    return (
        <span
            className="
                inline-flex items-center gap-1 sm:gap-2
                text-[9px] sm:text-[10px] md:text-xs
                font-bold uppercase tracking-[2px] sm:tracking-widest
                px-2 py-1
                sm:px-3 sm:py-1.5
                rounded-full
                bg-base-100
                text-secondary-content
                border border-slate-700
                whitespace-nowrap
            "
        >
            <span
                className="
                    flex items-center justify-center
                    w-4 h-4
                    sm:w-5 sm:h-5
                    md:w-6 md:h-6
                    shrink-0
                "
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full"
                    viewBox="0 0 24 24"
                    fill="none"
                >
                    <path d="M0 0h24v24H0z" fill="none" />

                    <path
                        fill="currentColor"
                        fillRule="evenodd"
                        d="M5.675 8.594C3.432 9.359 2 10.523 2 11.827c0 1.207 1.23 2.296 3.195 3.058l-1.338 2.23a.75.75 0 0 0 1.286.771l1.5-2.5l.017-.03c1.347.356 2.91.58 4.59.633V19a.75.75 0 0 0 1.5 0v-3.01c1.68-.052 3.243-.278 4.59-.633l.017.03l1.5 2.5a.75.75 0 1 0 1.286-.771l-1.338-2.23C20.77 14.123 22 13.035 22 11.826c0-1.303-1.432-2.467-3.675-3.232c-.124.29-.331.584-.668.818C16.869 9.96 15.3 10.5 12 10.5s-4.868-.54-5.657-1.088a1.9 1.9 0 0 1-.668-.818M13 13a1 1 0 1 1-2 0a1 1 0 0 1 2 0m-6 0a1 1 0 1 0 0-2a1 1 0 0 0 0 2m11-1a1 1 0 1 1-2 0a1 1 0 0 1 2 0"
                        clipRule="evenodd"
                    />

                    <path
                        fill="currentColor"
                        d="M7.055 8.005A4.73 4.73 0 0 1 11.73 4h.542a4.73 4.73 0 0 1 4.674 4.005a.43.43 0 0 1-.145.175c-.414.288-1.61.82-4.8.82s-4.386-.532-4.8-.82a.43.43 0 0 1-.145-.175"
                        opacity=".5"
                    />
                </svg>
            </span>

            <span className="truncate">
                Step {index + 1} of 8
            </span>
        </span>
    )
}

export default Step