import React from 'react'

const Footer = () => {
    return (
        <div
            className="
    min-h-screen
    w-full
    flex flex-col
    bg-black
    overflow-hidden
    bg-gradient-to-r from-blue-500/20 to-purple-500/20
  "
        >
            {/* TOP HALF */}
            <div
                className="
      flex-1
      border-b border-gray-800
      flex items-end justify-center
      pb-12
      max-sm:pb-6
    "
            />

            {/* BOTTOM HALF */}
            <div
                className="
      flex-1
      text-white
      flex justify-center items-center
      font-Logo-font font-extrabold
      relative group
      leading-[0.85]
    "
            >
                {/* Glow effect */}
                <div
                    className="
        absolute inset-0
        bg-white/10
        blur-3xl
        group-hover:blur-[120px]
        transition-all duration-500
      "
                />

                {/* MAIN TEXT */}
                <div
                    className="
        relative z-10
        flex
        text-[5rem]
        sm:text-[7rem]
        md:text-[10rem]
        lg:text-[14rem]
        xl:text-[18rem]
        2xl:text-[22rem]
        tracking-[0.05em]
        max-sm:tracking-[0.02em]
      "
                >
                    {/* CODE */}
                    <div className="flex">
                        {["C", "o", "d", "e"].map((char, i) => (
                            <span
                                key={i}
                                className="
              transition-opacity duration-300
              hover:opacity-50
              max-sm:hover:opacity-100
            "
                            >
                                {char}
                            </span>
                        ))}
                    </div>

                    {/* SARTHI */}
                    <div className="flex ml-6 max-sm:ml-3">
                        {["S", "a", "r", "t", "h", "i"].map((char, i) => (
                            <span
                                key={i}
                                className="
              transition-opacity duration-300
              hover:opacity-50
              max-sm:hover:opacity-100
            "
                            >
                                {char}
                            </span>
                        ))}
                    </div>
                </div>

                {/* SCROLL HINT */}
                <div
                    className="
        absolute
        bottom-4 right-4
        text-gray-500
        text-[10px]
        tracking-[0.4em]
        rotate-90
        origin-bottom-right
        hidden sm:block
      "
                >
                    SCROLL
                </div>
            </div>
        </div>

    )
}

export default Footer