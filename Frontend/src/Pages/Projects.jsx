import { useSelector } from "react-redux";
const Projects = () => {
    const user = useSelector((store) => store.user);
    return (

        <div className=" w-screen flex flex-col items-center justify-center py-20">


            <div className="h-[174px] w-[438px] bg-[#F64B3C] rounded-[35px] flex items-center justify-between mb-[100px]">
                <div className="w-[150px]">
                    <div className="relative top-[-30px] left-[25px] animate-bounce ">
                        <svg width="78" height="78" viewBox="0 0 78 78" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M47.8055 67.6794C48.1344 67.4706 48.4933 67.3124 48.8664 67.2006C63.0117 62.9621 73.3199 49.8448 73.3199 34.32C73.3199 15.3656 57.9543 0 38.9999 0C20.0455 0 4.67993 15.3656 4.67993 34.32C4.67993 47.8227 12.4777 59.5042 23.8158 65.1068C23.8286 65.1132 23.8233 65.1326 23.8091 65.1315C23.7999 65.1308 23.793 65.1396 23.7957 65.1483L26.9037 74.9903C27.6946 77.4949 30.6437 78.5705 32.8614 77.1631L47.8055 67.6794Z" fill="#C81912" />
                            <path d="M48.8134 27.6379C49.6418 26.8095 49.6418 25.4664 48.8134 24.638L48.362 24.1865C47.5336 23.3581 46.1904 23.3581 45.362 24.1865L39 30.5486L32.6379 24.1865C31.8095 23.3581 30.4664 23.3581 29.638 24.1865L29.1865 24.638C28.3581 25.4664 28.3581 26.8095 29.1865 27.6379L35.5486 34L29.1865 40.362C28.3581 41.1904 28.3581 42.5336 29.1865 43.362L29.638 43.8134C30.4664 44.6419 31.8095 44.6419 32.6379 43.8134L39 37.4514L45.362 43.8134C46.1904 44.6418 47.5336 44.6419 48.362 43.8134L48.8134 43.362C49.6419 42.5336 49.6418 41.1904 48.8134 40.362L42.4514 34L48.8134 27.6379Z" fill="white" />
                        </svg>

                    </div>
                    <div className="rounded-bl-[35px] overflow-hidden relative bottom-[4px]">
                        <svg width="150" height="105" className="rounded-bl-[35px]" viewBox="0 0 93 87" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="33.9429" cy="36.8292" r="6.82918" fill="#C81912" />
                            <circle cx="79" cy="27" r="13" fill="#C81912" />
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M32.5511 49.4389C32.4191 48.7782 31.9357 48.2428 31.2918 48.0442C30.5686 47.8212 29.7827 48.0647 29.3124 48.6576L26.6097 52.0648C24.7585 54.3984 21.7904 55.5017 18.8235 55.2372C11.5519 54.5888 4.04597 55.1701 -3.42021 57.1407C-37.9518 66.255 -58.5567 101.637 -49.4425 136.169C-40.3282 170.7 -4.9463 191.305 29.5853 182.191C64.1169 173.077 84.7218 137.695 75.6076 103.163C70.3813 83.3617 56.5177 68.1397 39.13 60.4748C36.2342 59.1983 34.0008 56.6968 33.3809 53.5935L32.5511 49.4389Z" fill="#C81912" />
                            <circle cx="21.5475" cy="4.5476" r="3.49096" transform="rotate(-22.0902 21.5475 4.5476)" fill="#C81912" />
                        </svg>
                    </div>
                </div>
                <div className="w-[244px] h-[85px] flex flex-col gap-1">
                    <div className="w-full h-[48px] font-poppins font-medium text-[38px] tracking-[-0.035em] [text-shadow:0px_4px_4px_rgba(0,0,0,0.25)]">
                        Oh snap!
                    </div>
                    <div className="w-full h-[36px] font-poppins font-extralight text-[14px] tracking-[0.02em]">Change a few things up and try submitting again.</div>
                </div>
                <div className="h-full flex pr-6 justify-start py-6 justify-self-end "><svg className="hover:rotate-180 transition-transform duration-300" xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24">
                    <path d="M0 0h24v24H0z" fill="none" />
                    <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M20 20L4 4m16 0L4 20" />
                </svg>
                </div>
            </div>
            <div className="h-[174px] w-[438px] bg-[#03A65A] rounded-[35px] flex items-center justify-between mb-[100px]">
                <div className="w-[150px]">
                    <div className="relative top-[-30px] left-[25px] animate-bounce">

                        <svg width="78" height="78" viewBox="0 0 78 78" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M39.0002 68.64C57.9546 68.64 73.3202 53.2744 73.3202 34.32C73.3202 15.3656 57.9546 0 39.0002 0C20.0458 0 4.68018 15.3656 4.68018 34.32C4.68018 44.9926 9.55174 54.5274 17.1925 60.822C17.2047 60.832 17.1939 60.8515 17.1789 60.8464C17.1698 60.8433 17.1602 60.8501 17.1602 60.8598V71.5042C17.1602 74.4834 20.3004 76.4171 22.9607 75.076L34.9722 69.0212C35.6356 68.6867 36.3788 68.5494 37.1207 68.5894C37.743 68.623 38.3696 68.64 39.0002 68.64Z" fill="#004440" />
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M50.3012 24.3464C51.3603 25.1585 51.5625 26.6745 50.7531 27.7357L38.7428 43.4829C38.3193 44.0382 37.6774 44.3832 36.9817 44.4295C36.2861 44.4758 35.6044 44.2189 35.1114 43.7246L27.4884 36.0815C26.5456 35.1363 26.5456 33.6064 27.4884 32.6612C28.4346 31.7124 29.9715 31.7124 30.9177 32.6612L36.5784 38.3368L46.9033 24.7994C47.7155 23.7344 49.2382 23.5314 50.3012 24.3464Z" fill="white" />
                        </svg>


                    </div>
                    <div className="rounded-bl-[35px] overflow-hidden relative bottom-[4px]">
                        <svg width="150" height="105" className="rounded-bl-[35px]" viewBox="0 0 93 87" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="20.6075" cy="9.29547" r="9.29547" fill="#005E38" />
                            <circle cx="80.0986" cy="47.7167" r="3.71819" fill="#005E38" />
                            <path d="M79.4438 11.0253C82.4971 18.5483 78.8737 27.1221 71.3507 30.1754C70.5208 30.5122 69.6781 30.7678 68.8315 30.9458C64.1204 31.9366 58.8591 33.2841 56.3382 37.3855C53.3951 42.1741 55.0036 48.3927 59.3496 51.9571C68.015 59.0642 75.0268 68.4315 79.3829 79.6187C92.9059 114.348 75.7149 153.464 40.9856 166.987C6.25636 180.51 -32.8599 163.319 -46.3829 128.59C-59.9059 93.8607 -42.7149 54.7445 -7.98562 41.2214C7.18342 35.3148 23.1894 35.2678 37.5341 39.9824C42.7299 41.69 48.6536 40.072 51.5174 35.4125L52.5823 33.68C54.694 30.2441 53.7172 25.8191 52.2006 22.0823C49.1473 14.5592 52.7707 5.98544 60.2937 2.93215C67.8167 -0.121136 76.3906 3.5023 79.4438 11.0253Z" fill="#005E38" />
                        </svg>
                    </div>
                </div>
                <div className="w-[244px] h-[85px] flex flex-col gap-1">
                    <div className="w-full h-[48px] font-poppins font-medium text-[38px] tracking-[-0.035em] [text-shadow:0px_4px_4px_rgba(0,0,0,0.25)]">
                        Oh snap!
                    </div>
                    <div className="w-full h-[36px] font-poppins font-extralight text-[14px] tracking-[0.02em]">Change a few things up and try submitting again.</div>
                </div>
                <div className="h-full flex pr-6 justify-start py-6 justify-self-end "><svg className="hover:rotate-180 transition-transform duration-300" xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24">
                    <path d="M0 0h24v24H0z" fill="none" />
                    <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M20 20L4 4m16 0L4 20" />
                </svg>
                </div>
            </div>
            <div className="h-[174px] w-[438px] bg-[#F88F01] rounded-[35px] flex items-center justify-between mb-[100px]">
                <div className="w-[150px]">
                    <div className="relative top-[-30px] left-[25px] animate-bounce">


                        <svg width="78" height="78" viewBox="0 0 78 78" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M39.0002 68.64C57.9546 68.64 73.3202 53.2744 73.3202 34.32C73.3202 15.3656 57.9546 0 39.0002 0C20.0458 0 4.68018 15.3656 4.68018 34.32C4.68018 43.2429 8.08537 51.3705 13.6671 57.4741C14.3864 58.2607 14.8202 59.2749 14.8202 60.3408V73.1872C14.8202 76.1365 17.9032 78.0717 20.5592 76.7894L37.4155 68.6519C37.4252 68.6472 37.425 68.6332 37.4151 68.6288C37.4023 68.623 37.4069 68.6037 37.421 68.6043C37.9444 68.628 38.4709 68.64 39.0002 68.64Z" fill="#CC561E" />
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M35.8696 36.5652C35.8696 38.222 37.2128 39.5652 38.8696 39.5652H39.1305C40.7874 39.5652 42.1305 38.222 42.1305 36.5652L42.1305 23.0869C42.1305 21.4301 40.7874 20.0869 39.1305 20.0869H38.8696C37.2128 20.0869 35.8696 21.4301 35.8696 23.0869V36.5652ZM39.0001 47.913C40.729 47.913 42.1305 46.5115 42.1305 44.7826C42.1305 43.0537 40.729 41.6521 39.0001 41.6521C37.2712 41.6521 35.8696 43.0537 35.8696 44.7826C35.8696 46.5115 37.2712 47.913 39.0001 47.913Z" fill="white" />
                        </svg>



                    </div>
                    <div className="rounded-bl-[35px] overflow-hidden relative bottom-[4px]">
                        <svg width="150" height="105" className="rounded-bl-[35px]" viewBox="0 0 93 87" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="20.6075" cy="9.29547" r="9.29547" fill="#CC561E" />
                            <circle cx="80.0986" cy="47.7167" r="3.71819" fill="#CC561E" />
                            <path d="M79.4438 11.0253C82.4971 18.5483 78.8737 27.1221 71.3507 30.1754C70.5208 30.5122 69.6781 30.7678 68.8315 30.9458C64.1204 31.9366 58.8591 33.2841 56.3382 37.3855C53.3951 42.1741 55.0036 48.3927 59.3496 51.9571C68.015 59.0642 75.0268 68.4315 79.3829 79.6187C92.9059 114.348 75.7149 153.464 40.9856 166.987C6.25636 180.51 -32.8599 163.319 -46.3829 128.59C-59.9059 93.8607 -42.7149 54.7445 -7.98562 41.2214C7.18342 35.3148 23.1894 35.2678 37.5341 39.9824C42.7299 41.69 48.6536 40.072 51.5174 35.4125L52.5823 33.68C54.694 30.2441 53.7172 25.8191 52.2006 22.0823C49.1473 14.5592 52.7707 5.98544 60.2937 2.93215C67.8167 -0.121136 76.3906 3.5023 79.4438 11.0253Z" fill="#CC561E" />
                        </svg>
                    </div>
                </div>
                <div className="w-[244px] h-[85px] flex flex-col gap-1">
                    <div className="w-full h-[48px] font-poppins font-medium text-[38px] tracking-[-0.035em] [text-shadow:0px_4px_4px_rgba(0,0,0,0.25)]">
                        Oh snap!
                    </div>
                    <div className="w-full h-[36px] font-poppins font-extralight text-[14px] tracking-[0.02em]">Change a few things up and try submitting again.</div>
                </div>
                <div className="h-full flex pr-6 justify-start py-6 justify-self-end "><svg className="hover:rotate-180 transition-transform duration-300" xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24">
                    <path d="M0 0h24v24H0z" fill="none" />
                    <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M20 20L4 4m16 0L4 20" />
                </svg>
                </div>


            </div>
            <div className="h-[174px] w-[438px] bg-[#739BE5] rounded-[35px] flex items-center justify-between mb-[100px]">
                <div className="w-[150px]">
                    <div className="relative top-[-30px] left-[25px] animate-bounce">




                        <svg width="78" height="78" viewBox="0 0 78 78" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M45.5712 68.4064C46.0379 68.0508 46.5792 67.8055 47.1494 67.6667C62.1699 64.0087 73.3202 50.4665 73.3202 34.32C73.3202 15.3656 57.9546 0 39.0002 0C20.0458 0 4.68018 15.3656 4.68018 34.32C4.68018 47.018 11.5762 58.1053 21.8274 64.0412C22.5606 64.4658 23.1681 65.0833 23.5396 65.8447L28.2814 75.5654C29.3879 77.8339 32.293 78.5231 34.3006 76.9935L45.5712 68.4064Z" fill="#6155A6" />
                            <ellipse cx="38.8215" cy="46.8696" rx="2.43478" ry="2.43478" fill="white" />
                            <path d="M43.6304 20.4316C41.8412 19.5492 39.8304 19.2173 37.8525 19.4777C35.8745 19.7381 34.0182 20.5791 32.5183 21.8945C31.5445 22.7486 30.7493 23.7776 30.1699 24.9218C29.6493 25.9501 30.3284 27.1095 31.4417 27.4078L32.1136 27.5878C33.2269 27.8861 34.3448 27.1813 35.0532 26.272C35.2544 26.0137 35.4805 25.7737 35.729 25.5557C36.5048 24.8753 37.465 24.4403 38.4881 24.3056C39.5111 24.1709 40.5512 24.3426 41.4767 24.799C42.4022 25.2554 43.1715 25.976 43.6875 26.8696C44.2034 27.7633 44.4428 28.7899 44.3753 29.8196C44.3078 30.8492 43.9365 31.8358 43.3083 32.6545C42.6801 33.4731 41.8233 34.0871 40.8462 34.4188C40.0433 34.6957 39.8273 34.6957 38.9998 34.6957L38.3042 34.6957C37.1516 34.6957 36.2172 35.6301 36.2172 36.7827V40.2609C36.2172 41.4135 37.1516 42.3479 38.3042 42.3479H38.9999C40.1524 42.3479 41.0868 41.4135 41.0868 40.2609C41.0868 39.7503 41.4568 39.3184 41.9473 39.1763C42.0974 39.1329 42.2518 39.0841 42.4114 39.03C44.3006 38.3887 45.9571 37.2016 47.1716 35.6189C48.3861 34.0361 49.104 32.1288 49.2344 30.138C49.3649 28.1473 48.9021 26.1626 47.9046 24.4348C46.9071 22.7071 45.4197 21.314 43.6304 20.4316Z" fill="white" />
                        </svg>




                    </div>
                    <div className="rounded-bl-[35px] overflow-hidden relative bottom-[4px]">
                        <svg width="150" height="105" className="rounded-bl-[35px]" viewBox="0 0 93 87" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="20.6075" cy="9.29547" r="9.29547" fill="#6155A6" />
                            <circle cx="80.0986" cy="47.7167" r="3.71819" fill="#6155A6" />
                            <path d="M79.4438 11.0253C82.4971 18.5483 78.8737 27.1221 71.3507 30.1754C70.5208 30.5122 69.6781 30.7678 68.8315 30.9458C64.1204 31.9366 58.8591 33.2841 56.3382 37.3855C53.3951 42.1741 55.0036 48.3927 59.3496 51.9571C68.015 59.0642 75.0268 68.4315 79.3829 79.6187C92.9059 114.348 75.7149 153.464 40.9856 166.987C6.25636 180.51 -32.8599 163.319 -46.3829 128.59C-59.9059 93.8607 -42.7149 54.7445 -7.98562 41.2214C7.18342 35.3148 23.1894 35.2678 37.5341 39.9824C42.7299 41.69 48.6536 40.072 51.5174 35.4125L52.5823 33.68C54.694 30.2441 53.7172 25.8191 52.2006 22.0823C49.1473 14.5592 52.7707 5.98544 60.2937 2.93215C67.8167 -0.121136 76.3906 3.5023 79.4438 11.0253Z" fill="#6155A6" />
                        </svg>
                    </div>
                </div>
                <div className="w-[244px] h-[85px] flex flex-col gap-1">
                    <div className="w-full h-[48px] font-poppins font-medium text-[38px] tracking-[-0.035em] [text-shadow:0px_4px_4px_rgba(0,0,0,0.25)]">
                        Oh snap!
                    </div>
                    <div className="w-full h-[36px] font-poppins font-extralight text-[14px] tracking-[0.02em]">Change a few things up and try submitting again.</div>
                </div>
                <div className="h-full flex pr-6 justify-start py-6 justify-self-end "><svg className="hover:rotate-180 transition-transform duration-300" xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24">
                    <path d="M0 0h24v24H0z" fill="none" />
                    <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M20 20L4 4m16 0L4 20" />
                </svg>
                </div>


            </div>
        </div>

    )
}
export default Projects;