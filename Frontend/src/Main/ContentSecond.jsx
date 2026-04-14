import React from "react";

const cards = [
    {
        title: "ASTRA",
        subtitle: "(The Verification Guardian)",
        quote: "“Trust is verified in silence”",
        img: "../img/cs-verification-manager.png",
    },
    {
        title: "NOVA",
        subtitle: "(The Identity Guardian)",
        quote: "“Your digital identity, reconstructed”",
        img: "../img/cs-identity-manager.png",
    },
    {
        title: "ORION",
        subtitle: "(The Community & AI Guardian)",
        quote: "“Every developer is a signal”",
        img: "../img/cs-community-ai-manager.png",
    },
    {
        title: "ZENITH",
        subtitle: "(The Help and Support center Guardian)",
        quote: "“No noise. Only solutions”",
        img: "/img/cs-help-support.png",
    },
];

const ContentSecond = () => {
    return (
        <div
            className="
        w-full px-10 flex flex-col justify-center items-center
    
        max-lg:px-6 max-sm:px-4 gap-10
      "
        >
            <div className=" HEAD1 text-5xl font-extrabold font-head text-center text-white
                 max-xl:text-4xl 
                max-lg:text-3xl 
                max-md:text-2xl 
                max-sm:text-xl  ">
                MEET WITH OUR GAURDIANS
            </div>
            <div
                className="
          w-full max-w-[1600px]
          grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4
          gap-6 max-xl:gap-4
        "
            >
                {cards.map((card, index) => (
                    <div
                        key={index}
                        className="group rounded-[70px] bg-gray-800/80
            flex flex-col items-center p-4 min-h-[420px]
            border border-white/5
            transition-all duration-500
            hover:-translate-y-3 
            max-sm:rounded-[40px]"
                    >
                        <img
                            src={card.img}
                            className="rounded-[60px] h-[320px] w-full object-cover 
              transition-transform duration-500 group-hover:scale-[1.03]"
                            alt={card.title}
                        />

                        <div className="text-white text-white font-head font-extrabold text-center text-5xl mt-6 tracking-wide">
                            {card.title}
                        </div>

                        <div className="text-sm text-white text-neutral-400 text-center mt-1">
                            {card.subtitle}
                        </div>

                        <div className="text-lg  text-center text-gray-400 mt-4 leading-snug">
                            {card.quote}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ContentSecond;