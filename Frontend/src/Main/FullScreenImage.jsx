import React from 'react';

const MainCTAbutton2 = ({ ClassName = "" }) => {
    return (


        <div onClick={() => navigate("/login")} className={`mt-3 flex items-center justify-between cursor-pointer text-black  font-bold ${ClassName}`}>

            <span className="text-white relative -right-[1px]" >
                <svg height="40" viewBox="0 0 15 40" width="15" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlnsXlink="http://www.w3.org/1999/xlink" transform="matrix(-1,0,0,1,0,0)">
                    <path d="M0 .5h11A3.5 3.5 0 0 1 14.5 4v20.523a5.5 5.5 0 0 1-1.416 3.684l-8.547 9.477A5.5 5.5 0 0 1 .453 39.5H0" data-stroke="true"
                        fill="#fff"
                    ></path>
                </svg>
            </span>
            <button className="bg-white text-black  px-4 py-[7.5px] ">Open CodeSarthi !</button>
            <span className="text-white relative -left-[1px]">
                <svg height="40" viewBox="0 0 15 40" width="15" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M0 .5h11A3.5 3.5 0 0 1 14.5 4v20.523a5.5 5.5 0 0 1-1.416 3.684l-8.547 9.477A5.5 5.5 0 0 1 .453 39.5H0"
                        fill="#fff"
                    />
                </svg>
            </span>
        </div>
    )
}
const SectionTitle = () => (
    <div className="flex flex-col items-start text-left">



        <svg className='mb-10 sm:mr-5 w-15 h-15' width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="54.6875" y="8.19531" width="6.02621" height="6.02621" rx="3.0131" transform="rotate(180 54.6875 8.19531)" fill="white" />
            <rect x="16.8105" y="17.6641" width="6.02621" height="6.02621" rx="3.0131" transform="rotate(180 16.8105 17.6641)" fill="white" />
            <rect x="45.2188" y="17.6641" width="6.02621" height="6.02621" rx="3.0131" transform="rotate(180 45.2188 17.6641)" fill="white" />
            <rect x="54.6875" y="17.6641" width="6.02621" height="6.02621" rx="3.0131" transform="rotate(180 54.6875 17.6641)" fill="white" />
            <rect x="7.33984" y="27.1328" width="6.02621" height="6.02621" rx="3.0131" transform="rotate(180 7.33984 27.1328)" fill="white" />
            <rect x="15.9492" y="26.2734" width="4.30443" height="4.30444" rx="2.15222" transform="rotate(180 15.9492 26.2734)" fill="white" />
            <rect x="26.2793" y="27.1328" width="6.02621" height="6.02621" rx="3.0131" transform="rotate(180 26.2793 27.1328)" fill="white" />
            <rect x="35.75" y="27.1328" width="6.02621" height="6.02621" rx="3.0131" transform="rotate(180 35.75 27.1328)" fill="white" />
            <rect x="44.3574" y="26.2734" width="4.30443" height="4.30444" rx="2.15222" transform="rotate(180 44.3574 26.2734)" fill="white" />
            <rect x="53.8281" y="26.2734" width="4.30443" height="4.30444" rx="2.15222" transform="rotate(180 53.8281 26.2734)" fill="white" />
            <rect x="6.47852" y="35.7422" width="4.30443" height="4.30444" rx="2.15222" transform="rotate(180 6.47852 35.7422)" fill="white" />
            <rect x="15.9492" y="35.7422" width="4.30443" height="4.30444" rx="2.15222" transform="rotate(180 15.9492 35.7422)" fill="white" />
            <rect x="25.418" y="35.7422" width="4.30443" height="4.30444" rx="2.15222" transform="rotate(180 25.418 35.7422)" fill="white" />
            <rect x="34.8887" y="35.7422" width="4.30443" height="4.30444" rx="2.15222" transform="rotate(180 34.8887 35.7422)" fill="white" />
            <rect x="44.3574" y="35.7422" width="4.30443" height="4.30444" rx="2.15222" transform="rotate(180 44.3574 35.7422)" fill="white" />
            <rect x="53.3984" y="35.3125" width="3.44355" height="3.44355" rx="1.72177" transform="rotate(180 53.3984 35.3125)" fill="white" />
            <rect x="5.61719" y="44.3516" width="2.58266" height="2.58266" rx="1.29133" transform="rotate(180 5.61719 44.3516)" fill="white" />
            <rect x="15.0879" y="44.3516" width="2.58266" height="2.58266" rx="1.29133" transform="rotate(180 15.0879 44.3516)" fill="white" />
            <rect x="24.5566" y="44.3516" width="2.58266" height="2.58266" rx="1.29133" transform="rotate(180 24.5566 44.3516)" fill="white" />
            <rect x="34.0273" y="44.3516" width="2.58266" height="2.58266" rx="1.29133" transform="rotate(180 34.0273 44.3516)" fill="white" />
            <rect x="43.498" y="44.3516" width="2.58266" height="2.58266" rx="1.29133" transform="rotate(180 43.498 44.3516)" fill="white" />
            <rect x="52.9668" y="44.3516" width="2.58266" height="2.58266" rx="1.29133" transform="rotate(180 52.9668 44.3516)" fill="white" />
            <rect x="5.1875" y="53.3906" width="1.72177" height="1.72177" rx="0.860887" transform="rotate(180 5.1875 53.3906)" fill="white" />
            <rect x="14.6562" y="53.3906" width="1.72177" height="1.72177" rx="0.860887" transform="rotate(180 14.6562 53.3906)" fill="white" />
            <rect x="24.1289" y="53.3906" width="1.72177" height="1.72177" rx="0.860887" transform="rotate(180 24.1289 53.3906)" fill="white" />
            <rect x="33.5977" y="53.3906" width="1.72177" height="1.72177" rx="0.860887" transform="rotate(180 33.5977 53.3906)" fill="white" />
            <rect x="43.0664" y="53.3906" width="1.72177" height="1.72177" rx="0.860887" transform="rotate(180 43.0664 53.3906)" fill="white" />
            <rect x="52.5371" y="53.3906" width="1.72177" height="1.72177" rx="0.860887" transform="rotate(180 52.5371 53.3906)" fill="white" />
        </svg>
        <h2 className="w-[95%] text-[34px] font-white leading-[1.15] tracking-tight text-white md:text-[48px] lg:text-[62px]">
            Effectivity your workflow
            <br />
            better with good collaboration
        </h2>
        <p className="mt-6 w-[75%] text-lg leading-relaxed text-gray-500 mb-6">
            Boost your team's productivity with powerful collaboration tools. Our platform allows your team to work
            together in real time, share insights effortlessly, and streamline communication.
        </p>

        <MainCTAbutton2 />
    </div>
);
const FullScreenImage = () => {
    return (
        <div className="w-full">

            <section className="relative overflow-hidden bg-black">


                <div className="relative mx-auto max-w-[1500px] px-5 py-16 md:px-8 md:py-24">
                    <SectionTitle />

                </div>
            </section>
            <img
                src="https://res.cloudinary.com/dj0ivep44/image/upload/v1786706535/ChatGPT_Image_Aug_14_2026_04_48_33_PM_ak5hnw.png"
                alt="Full Screen"
                className="w-full h-full object-cover"
            />
        </div>
    );
};

export default FullScreenImage;
