import React from "react";

const Htmlw = () => {
    return (
        <div className="w-screen bg-gradient-to-r from-green-300 via-emerald-300 to-teal-300">


            <div className="bg-gradient-to-br from-[#d9d7f3] via-[#b9e3f6] to-[#6ec6e8] p-10 border border-l-black border-r-black border-b-black rounded-b-[50px]">
                <div className="w-full flex justify-center items-center font-head font-extrabold text-[5rem] leading-none">
                    <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 32 32"><path fill="#e65100" d="m4 4l2 22l10 2l10-2l2-22Zm19.72 7H11.28l.29 3h11.86l-.802 9.335L15.99 25l-6.635-1.646L8.93 19h3.02l.19 2l3.86.77l3.84-.77l.29-4H8.84L8 8h16Z" /></svg> HTML TOOLKIT
                </div>
                <p className="text-xl font-circular-web text-center">
                    This HTML quick reference cheat sheet lists the common HTML and HTML5 tags in readable layout.
                </p>
            </div>
            {/* first */}
            <div className="w-full flex justify-center items-center font-head font-extrabold text-[3rem] mt-5 mb-5 leading-none ">
                BASIC HTML STRUCTURE
            </div>
            <div className="w-full flex gap-5 p-5 font-circular-web text-lg  " >
                <div className=" bg-black p-5  rounded-3xl w-2/3 text-white flex flex-col gap-5 justify-center">
                    <div className='h-[40px] w-1/4 font-bold text-sm relative bottom-3 border-transparent p-1 px-5 bg-gradient-to-r from-red-300 via-rose-300 to-pink-300
 text-black rounded-3xl flex justify-center items-center inline-flex gap-3 px-3 py-1'  >
                        <svg className='rotate-45' width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_0_3844)">
                                <path d="M12.6286 1.04921L0.4829 5.52396C0.290486 5.59619 0.168389 5.78988 0.190123 5.99572C0.211219 6.2022 0.369753 6.36713 0.574952 6.39589L6.95147 7.30682L7.8624 13.6833C7.89116 13.8885 8.05673 14.0477 8.26193 14.0688C8.40128 14.0841 8.53553 14.033 8.6295 13.939C8.67488 13.8937 8.71068 13.8387 8.73369 13.776L13.2084 1.63029C13.2698 1.46408 13.2289 1.2787 13.1042 1.15405C12.9796 1.02939 12.7942 0.988481 12.6286 1.04921Z" fill="#010101" />
                            </g>
                            <defs>
                                <clipPath id="clip0_0_3844">
                                    <rect width="14" height="14" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>
                        Hello.html
                    </div>
                    <div className="bg-stone-900 p-5 rounded-3xl font-mono ">
                        {/* DOCTYPE */}
                        <span className="text-sky-400"><p className="text-white inline-flex">&lt;</p>!doctype</span>{" "}
                        <span className="text-sky-400">html</span>
                        <span className="text-sky-400"><p className="text-white inline-flex">&gt;</p></span>
                        <br />

                        {/* html */}
                        <span className="text-orange-400"><p className="text-white inline-flex">&lt;</p>html</span>{" "}
                        <span className="text-emerald-400">lang</span>
                        <span className="text-white">=</span>
                        <span className="text-amber-300">"en"</span>
                        <span className="text-orange-400"><p className="text-white inline-flex">&gt;</p></span>
                        <br />

                        <span className="pl-4 text-orange-400"><p className="text-white inline-flex">&lt;</p>head<p className="text-white inline-flex">&gt;</p></span>
                        <br />

                        <span className="pl-8 text-orange-400"><p className="text-white inline-flex">&lt;</p>meta</span>{" "}
                        <span className="text-emerald-400">charset</span>
                        <span className="text-white">=</span>
                        <span className="text-amber-300">"UTF-8"</span>{" "}
                        <span className="text-orange-400">/<p className="text-white inline-flex">&gt;</p></span>
                        <br />

                        <span className="pl-8 text-orange-400"><p className="text-white inline-flex">&lt;</p>meta</span>{" "}
                        <span className="text-emerald-400">http-equiv</span>
                        <span className="text-white">=</span>
                        <span className="text-amber-300">"X-UA-Compatible"</span>{" "}
                        <span className="text-emerald-400">content</span>
                        <span className="text-white">=</span>
                        <span className="text-amber-300">"IE=edge"</span>{" "}
                        <span className="text-orange-400">/<p className="text-white inline-flex">&gt;</p></span>
                        <br />

                        <span className="pl-8 text-orange-400"><p className="text-white inline-flex">&lt;</p>meta</span>{" "}
                        <span className="text-emerald-400">name</span>
                        <span className="text-white">=</span>
                        <span className="text-amber-300">"viewport"</span>{" "}
                        <span className="text-emerald-400">content</span>
                        <span className="text-white">=</span>
                        <span className="text-amber-300">
                            "width=device-width, initial-scale=1.0"
                        </span>{" "}
                        <span className="text-orange-400">/<p className="text-white inline-flex">&gt;</p></span>
                        <br />

                        <span className="pl-8 text-orange-400"><p className="text-white inline-flex">&lt;</p>title<p className="text-white inline-flex">&gt;</p></span>
                        <span className="text-white">HTML5 Boilerplate</span>
                        <span className="text-orange-400"><p className="text-white inline-flex">&lt;</p>/title<p className="text-white inline-flex">&gt;</p></span>
                        <br />

                        <span className="pl-4 text-orange-400"><p className="text-white inline-flex">&lt;</p>/head<p className="text-white inline-flex">&gt;</p></span>
                        <br />

                        <span className="pl-4 text-orange-400"><p className="text-white inline-flex">&lt;</p>body<p className="text-white inline-flex">&gt;</p></span>
                        <br />

                        <span className="pl-8 text-orange-400"><p className="text-white inline-flex">&lt;</p>h1<p className="text-white inline-flex">&gt;</p></span>
                        <span className="text-white">
                            Toolkit for CodeSarthi Developers!!
                        </span>
                        <span className="text-orange-400"><p className="text-white inline-flex">&lt;</p>/h1<p className="text-white inline-flex">&gt;</p></span>
                        <br />

                        <span className="pl-4 text-orange-400"><p className="text-white inline-flex">&lt;</p>/body<p className="text-white inline-flex">&gt;</p></span>
                        <br />

                        <span className="text-orange-400"><p className="text-white inline-flex">&lt;</p>/html<p className="text-white inline-flex">&gt;</p></span>
                    </div>
                </div>
                <div className=" bg-black p-5 rounded-3xl w-1/3 flex flex-col justify-center gap-10 text-white">

                    <div className="">
                        <div className='h-[40px] w-1/3  font-bold text-sm relative bottom-3 border-transparent p-1 px-5 bg-gradient-to-r from-red-300 via-rose-300 to-pink-300
 text-black rounded-3xl flex justify-center items-center inline-flex gap-3 px-3 py-1'  >
                            <svg className='rotate-45' width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_0_3844)">
                                    <path d="M12.6286 1.04921L0.4829 5.52396C0.290486 5.59619 0.168389 5.78988 0.190123 5.99572C0.211219 6.2022 0.369753 6.36713 0.574952 6.39589L6.95147 7.30682L7.8624 13.6833C7.89116 13.8885 8.05673 14.0477 8.26193 14.0688C8.40128 14.0841 8.53553 14.033 8.6295 13.939C8.67488 13.8937 8.71068 13.8387 8.73369 13.776L13.2084 1.63029C13.2698 1.46408 13.2289 1.2787 13.1042 1.15405C12.9796 1.02939 12.7942 0.988481 12.6286 1.04921Z" fill="#010101" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_0_3844">
                                        <rect width="14" height="14" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>
                            Comment
                        </div>
                        <div className="bg-stone-900 p-5 rounded-3xl font-mono ">
                            <div className="inline-flex">
                                <span className="text-gray-500">&lt;!--</span>{" "}
                                <p className="text-gray-500">this is a comment{" "}</p>
                                <span className="text-gray-500">--&gt;</span>
                            </div>

                            <br />
                            <br />
                            <br />

                            {/* Multi-line comment */}
                            <div >
                                <span className="text-gray-500">&lt;!--</span>
                            </div>

                            <div className="pl-12  text-gray-500">
                                Or you can comment out a
                            </div>
                            <div className="pl-12  text-gray-500">
                                large number of lines.
                            </div>

                            <div>
                                <span className="text-gray-500 ">--&gt;</span>
                            </div>
                        </div>
                    </div>

                    <div className="">
                        <div className='h-[40px] w-1/3  font-bold text-sm relative bottom-3 border-transparent p-1 px-5 bg-gradient-to-r from-red-300 via-rose-300 to-pink-300
 text-black rounded-3xl flex justify-center items-center inline-flex gap-3 px-3 py-1'  >
                            <svg className='rotate-45' width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_0_3844)">
                                    <path d="M12.6286 1.04921L0.4829 5.52396C0.290486 5.59619 0.168389 5.78988 0.190123 5.99572C0.211219 6.2022 0.369753 6.36713 0.574952 6.39589L6.95147 7.30682L7.8624 13.6833C7.89116 13.8885 8.05673 14.0477 8.26193 14.0688C8.40128 14.0841 8.53553 14.033 8.6295 13.939C8.67488 13.8937 8.71068 13.8387 8.73369 13.776L13.2084 1.63029C13.2698 1.46408 13.2289 1.2787 13.1042 1.15405C12.9796 1.02939 12.7942 0.988481 12.6286 1.04921Z" fill="#010101" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_0_3844">
                                        <rect width="14" height="14" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>
                            Paragraph
                        </div>
                        <div className="bg-stone-900 p-5 rounded-3xl font-mono ">
                            {/* Line 1 */}
                            <div>
                                <span className="text-orange-400"><p className="text-white inline-flex">&lt;</p>p<p className="text-white inline-flex">&gt;</p></span>
                                <span className="text-gray-200">
                                    I'm from CodeSarthi Toolkit.
                                </span>
                                <span className="text-orange-400"><p className="text-white inline-flex">&lt;</p>/p<p className="text-white inline-flex">&gt;</p></span>
                            </div>

                            {/* Line 2 */}
                            <div>
                                <span className="text-orange-400"><p className="text-white inline-flex">&lt;</p>p<p className="text-white inline-flex">&gt;</p></span>
                                <span className="text-gray-200">
                                    Share quick reference sheet.
                                </span>
                                <span className="text-orange-400"><p className="text-white inline-flex">&lt;</p>/p<p className="text-white inline-flex">&gt;</p></span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            {/* second */}
            <div className="w-full flex gap-5 p-5 font-circular-web text-lg  " >
                <div className=" bg-black p-5 flex flex-col justify-center rounded-3xl w-1/2 text-white">
                    <div>
                        <div className='h-[40px] w-1/3  font-bold text-sm relative mb-5 border-transparent p-1 px-5 bg-gradient-to-r from-red-300 via-rose-300 to-pink-300
 text-black rounded-3xl flex justify-center items-center inline-flex gap-3 px-3 py-1'  >
                            <svg className='rotate-45' width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_0_3844)">
                                    <path d="M12.6286 1.04921L0.4829 5.52396C0.290486 5.59619 0.168389 5.78988 0.190123 5.99572C0.211219 6.2022 0.369753 6.36713 0.574952 6.39589L6.95147 7.30682L7.8624 13.6833C7.89116 13.8885 8.05673 14.0477 8.26193 14.0688C8.40128 14.0841 8.53553 14.033 8.6295 13.939C8.67488 13.8937 8.71068 13.8387 8.73369 13.776L13.2084 1.63029C13.2698 1.46408 13.2289 1.2787 13.1042 1.15405C12.9796 1.02939 12.7942 0.988481 12.6286 1.04921Z" fill="#010101" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_0_3844">
                                        <rect width="14" height="14" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>
                            HTML Links ( Anchor Tag )
                        </div>
                        <div className="bg-stone-900 p-5 rounded-3xl font-mono mb-5">
                            <div>
                                <span className="text-orange-400">&lt;a</span>{" "}
                                <span className="text-emerald-400">href</span>
                                <span className="text-white">=</span>
                                <span className="text-amber-300">
                                    "https://CodeSarthi.com"
                                </span>
                                <span className="text-orange-400">&gt;</span>
                                <span className="text-sky-300">Toolkits</span>
                                <span className="text-orange-400">&lt;/a&gt;</span>
                            </div>

                            <div>
                                <span className="text-orange-400">&lt;a</span>{" "}
                                <span className="text-emerald-400">href</span>
                                <span className="text-white">=</span>
                                <span className="text-amber-300">
                                    "mailto:vinay@abc.com"
                                </span>
                                <span className="text-orange-400">&gt;</span>
                                <span className="text-sky-300">Email</span>
                                <span className="text-orange-400">&lt;/a&gt;</span>
                            </div>

                            <div>
                                <span className="text-orange-400">&lt;a</span>{" "}
                                <span className="text-emerald-400">href</span>
                                <span className="text-white">=</span>
                                <span className="text-amber-300">
                                    "tel:+12345678"
                                </span>
                                <span className="text-orange-400">&gt;</span>
                                <span className="text-sky-300">Call</span>
                                <span className="text-orange-400">&lt;/a&gt;</span>
                            </div>

                            <div>
                                <span className="text-orange-400">&lt;a</span>{" "}
                                <span className="text-emerald-400">href</span>
                                <span className="text-white">=</span>
                                <span className="text-amber-300">
                                    "sms:+12345678&amp;body=ha%20ha"
                                </span>
                                <span className="text-orange-400">&gt;</span>
                                <span className="text-sky-300">Msg</span>
                                <span className="text-orange-400">&lt;/a&gt;</span>
                            </div>
                        </div>
                    </div>
                    <hr className="border-t-2 border-gray-500" />
                    <div>
                        <div className='h-[40px] w-1/3  font-bold text-sm relative  border-transparent mt-5  p-1 px-5 bg-gradient-to-r from-blue-300 via-sky-300 to-cyan-300
 text-black rounded-3xl flex justify-center items-center inline-flex gap-3 px-3 py-1 cursor-pointer'  >
                            <svg className='rotate-45' width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_0_3844)">
                                    <path d="M12.6286 1.04921L0.4829 5.52396C0.290486 5.59619 0.168389 5.78988 0.190123 5.99572C0.211219 6.2022 0.369753 6.36713 0.574952 6.39589L6.95147 7.30682L7.8624 13.6833C7.89116 13.8885 8.05673 14.0477 8.26193 14.0688C8.40128 14.0841 8.53553 14.033 8.6295 13.939C8.67488 13.8937 8.71068 13.8387 8.73369 13.776L13.2084 1.63029C13.2698 1.46408 13.2289 1.2787 13.1042 1.15405C12.9796 1.02939 12.7942 0.988481 12.6286 1.04921Z" fill="#010101" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_0_3844">
                                        <rect width="14" height="14" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>
                            <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/a#attributes" className="w-full" target="_blank"  >
                                See : MDN Reference
                            </a>
                        </div>
                        <div className="bg-stone-900 p-5 rounded-3xl font-mono mt-5">
                            <ul className="flex justify-around mb-2 mt-2">
                                <li className="w-1/2">1. href</li>
                                <li className="w-1/2">The URL that the hyperlink points to</li>
                            </ul>

                            <hr className="border-t-2 border-gray-500" />

                            <ul className="flex justify-around mb-2 mt-2">
                                <li className="w-1/2">2. rel</li>
                                <li className="w-1/2">Relationship of the linked URL</li>
                            </ul>

                            <hr className="border-t-2 border-gray-500" />

                            <ul className="flex justify-around mb-2 mt-2">
                                <li className="w-1/2">3. target</li>
                                <li className="w-1/2">Link target location:
                                    _self, _blank, _top, _parent</li>
                            </ul>

                            <hr className="border-t-2 border-gray-500" />
                        </div>
                    </div>
                </div>

                <div className=" bg-black p-5 rounded-3xl w-1/2 flex flex-col justify-between  text-white">
                    <div className="mb-5">
                        <div className='h-[40px] w-1/3  font-bold text-sm relative mb-5 border-transparent p-1 px-5 bg-gradient-to-r from-red-300 via-rose-300 to-pink-300
 text-black rounded-3xl flex justify-center items-center inline-flex gap-3 px-3 py-1'  >
                            <svg className='rotate-45' width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_0_3844)">
                                    <path d="M12.6286 1.04921L0.4829 5.52396C0.290486 5.59619 0.168389 5.78988 0.190123 5.99572C0.211219 6.2022 0.369753 6.36713 0.574952 6.39589L6.95147 7.30682L7.8624 13.6833C7.89116 13.8885 8.05673 14.0477 8.26193 14.0688C8.40128 14.0841 8.53553 14.033 8.6295 13.939C8.67488 13.8937 8.71068 13.8387 8.73369 13.776L13.2084 1.63029C13.2698 1.46408 13.2289 1.2787 13.1042 1.15405C12.9796 1.02939 12.7942 0.988481 12.6286 1.04921Z" fill="#010101" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_0_3844">
                                        <rect width="14" height="14" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>
                            HTML Image Tag
                        </div>
                        <div className="bg-stone-900 p-5 rounded-3xl font-mono ">
                            <div>
                                <span className="text-orange-400"><p className="text-white inline-flex">&lt;</p>img</span>
                            </div>

                            <div className="pl-8">
                                <span className="text-emerald-400">loading</span>
                                <span className="text-white">=</span>
                                <span className="text-amber-300">"lazy"</span>
                            </div>

                            <div className="pl-8">
                                <span className="text-emerald-400">src</span>
                                <span className="text-white">=</span>
                                <span className="text-amber-300">
                                    "https://xxx.png"
                                </span>
                            </div>

                            <div className="pl-8">
                                <span className="text-emerald-400">alt</span>
                                <span className="text-white">=</span>
                                <span className="text-amber-300">
                                    "Describe image here"
                                </span>
                            </div>

                            <div className="pl-8">
                                <span className="text-emerald-400">width</span>
                                <span className="text-white">=</span>
                                <span className="text-amber-300">"400"</span>
                            </div>

                            <div className="pl-8">
                                <span className="text-emerald-400">height</span>
                                <span className="text-white">=</span>
                                <span className="text-amber-300">"400"</span>
                            </div>

                            <div>
                                <span className="text-orange-400">/<p className="text-white inline-flex">&gt;</p></span>
                            </div>

                        </div>
                    </div>
                    <hr className="border-t-2 border-gray-500" />
                    <div>
                        <div className='h-[40px] w-1/3  font-bold text-sm relative  border-transparent mt-5  p-1 px-5 bg-gradient-to-r from-blue-300 via-sky-300 to-cyan-300
 text-black rounded-3xl flex justify-center items-center inline-flex gap-3 px-3 py-1 cursor-pointer'  >
                            <svg className='rotate-45' width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_0_3844)">
                                    <path d="M12.6286 1.04921L0.4829 5.52396C0.290486 5.59619 0.168389 5.78988 0.190123 5.99572C0.211219 6.2022 0.369753 6.36713 0.574952 6.39589L6.95147 7.30682L7.8624 13.6833C7.89116 13.8885 8.05673 14.0477 8.26193 14.0688C8.40128 14.0841 8.53553 14.033 8.6295 13.939C8.67488 13.8937 8.71068 13.8387 8.73369 13.776L13.2084 1.63029C13.2698 1.46408 13.2289 1.2787 13.1042 1.15405C12.9796 1.02939 12.7942 0.988481 12.6286 1.04921Z" fill="#010101" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_0_3844">
                                        <rect width="14" height="14" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>
                            <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/img" className="w-full" target="_blank"  >
                                See : MDN Reference
                            </a>
                        </div>
                        <div className="bg-stone-900 p-5 rounded-3xl font-mono mt-5">
                            <ul className="flex justify-around mb-2 mt-2">
                                <li className="w-1/2">1. src</li>
                                <li className="w-1/2">Required, Image location (URL | Path)</li>
                            </ul>
                            <hr className="border-t-2 border-gray-500" />
                            <ul className="flex justify-around mb-2 mt-2">
                                <li className="w-1/2">2. alt</li>
                                <li className="w-1/2">Describe of the image</li>
                            </ul>
                            <hr className="border-t-2 border-gray-500" />
                            <ul className="flex justify-around mb-2 mt-2">
                                <li className="w-1/2">3. width</li>
                                <li className="w-1/2">Width of the image</li>
                            </ul>
                            <hr className="border-t-2 border-gray-500" />
                            <ul className="flex justify-around mb-2 mt-2">
                                <li className="w-1/2">4. height</li>
                                <li className="w-1/2">	Height of the image</li>
                            </ul>
                            <hr className="border-t-2 border-gray-500" />
                            <ul className="flex justify-around mb-2 mt-2">
                                <li className="w-1/2">5. loading</li>
                                <li className="w-1/2">How the browser should load</li>
                            </ul>
                            <hr className="border-t-2 border-gray-500" />
                        </div>
                    </div>
                </div>
            </div>
            {/* third */}
            <div className="w-full flex gap-5 p-5 font-circular-web text-lg  " >
                <div className=" bg-black p-10  rounded-3xl w-1/2 text-white flex flex-col justify-center ">
                    <div>
                        <div className='h-[40px] w-1/3  font-bold text-sm relative mb-5 border-transparent p-1 px-5 bg-gradient-to-r from-red-300 via-rose-300 to-pink-300
 text-black rounded-3xl flex justify-center items-center inline-flex gap-3 px-3 py-1'  >
                            <svg className='rotate-45' width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_0_3844)">
                                    <path d="M12.6286 1.04921L0.4829 5.52396C0.290486 5.59619 0.168389 5.78988 0.190123 5.99572C0.211219 6.2022 0.369753 6.36713 0.574952 6.39589L6.95147 7.30682L7.8624 13.6833C7.89116 13.8885 8.05673 14.0477 8.26193 14.0688C8.40128 14.0841 8.53553 14.033 8.6295 13.939C8.67488 13.8937 8.71068 13.8387 8.73369 13.776L13.2084 1.63029C13.2698 1.46408 13.2289 1.2787 13.1042 1.15405C12.9796 1.02939 12.7942 0.988481 12.6286 1.04921Z" fill="#010101" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_0_3844">
                                        <rect width="14" height="14" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>
                            Text Formatting Tags
                        </div>
                        <div className="bg-stone-900 p-5 rounded-3xl font-mono mb-5">
                            <div>
                                <span className="text-orange-400"> <p className="text-white inline-flex ">&lt;</p>b<p className="text-white inline-flex ">&gt;</p> </span>
                                <span className="text-gray-200">Bold Text</span>
                                <span className="text-orange-400"> <p className="text-white inline-flex ">&lt;</p>/b<p className="text-white inline-flex ">&gt;</p> </span>
                            </div>

                            <div>
                                <span className="text-orange-400"> <p className="text-white inline-flex ">&lt;</p>strong<p className="text-white inline-flex ">&gt;</p> </span>
                                <span className="text-gray-200">This text is important</span>
                                <span className="text-orange-400"> <p className="text-white inline-flex ">&lt;</p>/strong<p className="text-white inline-flex ">&gt;</p> </span>
                            </div>

                            <div>
                                <span className="text-orange-400"> <p className="text-white inline-flex ">&lt;</p>i<p className="text-white inline-flex ">&gt;</p></span>
                                <span className="text-gray-200">Italic Text</span>
                                <span className="text-orange-400"> <p className="text-white inline-flex ">&lt;</p>/i<p className="text-white inline-flex ">&gt;</p></span>
                            </div>

                            <div>
                                <span className="text-orange-400"> <p className="text-white inline-flex ">&lt;</p>em<p className="text-white inline-flex ">&gt;</p></span>
                                <span className="text-gray-200">This text is emphasized</span>
                                <span className="text-orange-400"> <p className="text-white inline-flex ">&lt;</p>/em<p className="text-white inline-flex ">&gt;</p></span>
                            </div>

                            <div>
                                <span className="text-orange-400"> <p className="text-white inline-flex ">&lt;</p>u<p className="text-white inline-flex ">&gt;</p></span>
                                <span className="text-gray-200">Underline Text</span>
                                <span className="text-orange-400"> <p className="text-white inline-flex ">&lt;</p>/u<p className="text-white inline-flex ">&gt;</p></span>
                            </div>

                            <div>
                                <span className="text-orange-400"> <p className="text-white inline-flex ">&lt;</p>pre<p className="text-white inline-flex ">&gt;</p></span>
                                <span className="text-gray-200">Pre-formatted Text</span>
                                <span className="text-orange-400"> <p className="text-white inline-flex ">&lt;</p>/pre<p className="text-white inline-flex ">&gt;</p></span>
                            </div>

                            <div>
                                <span className="text-orange-400"> <p className="text-white inline-flex ">&lt;</p>code<p className="text-white inline-flex ">&gt;</p></span>
                                <span className="text-sky-300">Source code</span>
                                <span className="text-orange-400"> <p className="text-white inline-flex ">&lt;</p>/code<p className="text-white inline-flex ">&gt;</p></span>
                            </div>

                            <div>
                                <span className="text-orange-400"> <p className="text-white inline-flex ">&lt;</p>del<p className="text-white inline-flex ">&gt;</p></span>
                                <span className="text-gray-200">Deleted text</span>
                                <span className="text-orange-400"> <p className="text-white inline-flex ">&lt;</p>/del<p className="text-white inline-flex ">&gt;</p></span>
                            </div>

                            <div>
                                <span className="text-orange-400"> <p className="text-white inline-flex ">&lt;</p>mark<p className="text-white inline-flex ">&gt;</p></span>
                                <span className="text-yellow-300">
                                    Highlighted text (HTML5)
                                </span>
                                <span className="text-orange-400"> <p className="text-white inline-flex ">&lt;</p>/mark<p className="text-white inline-flex ">&gt;</p></span>
                            </div>

                            <div>
                                <span className="text-orange-400"> <p className="text-white inline-flex ">&lt;</p>ins<p className="text-white inline-flex ">&gt;</p></span>
                                <span className="text-gray-200">Inserted text</span>
                                <span className="text-orange-400"> <p className="text-white inline-flex ">&lt;</p>/ins<p className="text-white inline-flex ">&gt;</p></span>
                            </div>

                            <div>
                                <span className="text-orange-400"> <p className="text-white inline-flex ">&lt;</p>sup<p className="text-white inline-flex ">&gt;</p></span>
                                <span className="text-gray-200">
                                    Makes text superscripted
                                </span>
                                <span className="text-orange-400"> <p className="text-white inline-flex ">&lt;</p>/sup<p className="text-white inline-flex ">&gt;</p></span>
                            </div>

                            <div>
                                <span className="text-orange-400"> <p className="text-white inline-flex ">&lt;</p>sub<p className="text-white inline-flex ">&gt;</p></span>
                                <span className="text-gray-200">
                                    Makes text subscripted
                                </span>
                                <span className="text-orange-400"> <p className="text-white inline-flex ">&lt;</p>/sub<p className="text-white inline-flex ">&gt;</p></span>
                            </div>

                            <div>
                                <span className="text-orange-400"> <p className="text-white inline-flex ">&lt;</p>small<p className="text-white inline-flex ">&gt;</p></span>
                                <span className="text-gray-400">
                                    Makes text smaller
                                </span>
                                <span className="text-orange-400"> <p className="text-white inline-flex ">&lt;</p>/small<p className="text-white inline-flex ">&gt;</p></span>
                            </div>

                            <div>
                                <span className="text-orange-400"> <p className="text-white inline-flex ">&lt;</p>kbd<p className="text-white inline-flex ">&gt;</p></span>
                                <span className="text-purple-300">Ctrl</span>
                                <span className="text-orange-400"> <p className="text-white inline-flex ">&lt;</p>/kbd<p className="text-white inline-flex ">&gt;</p></span>
                            </div>

                            <div>
                                <span className="text-orange-400"> <p className="text-white inline-flex ">&lt;</p>blockquote<p className="text-white inline-flex ">&gt;</p></span>
                                <span className="text-gray-200">
                                    Text Block Quote
                                </span>
                                <span className="text-orange-400"> <p className="text-white inline-flex ">&lt;</p>/blockquote<p className="text-white inline-flex ">&gt;</p></span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className=" bg-black p-5 rounded-3xl w-1/2 flex flex-col justify-between gap-5 text-white">
                    <div>
                        <div className='h-[40px] w-1/4  font-bold text-sm relative mb-5 border-transparent p-1 px-5 bg-gradient-to-r from-red-300 via-rose-300 to-pink-300
 text-black rounded-3xl flex justify-center items-center inline-flex gap-3 px-3 py-1'  >
                            <svg className='rotate-45' width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_0_3844)">
                                    <path d="M12.6286 1.04921L0.4829 5.52396C0.290486 5.59619 0.168389 5.78988 0.190123 5.99572C0.211219 6.2022 0.369753 6.36713 0.574952 6.39589L6.95147 7.30682L7.8624 13.6833C7.89116 13.8885 8.05673 14.0477 8.26193 14.0688C8.40128 14.0841 8.53553 14.033 8.6295 13.939C8.67488 13.8937 8.71068 13.8387 8.73369 13.776L13.2084 1.63029C13.2698 1.46408 13.2289 1.2787 13.1042 1.15405C12.9796 1.02939 12.7942 0.988481 12.6286 1.04921Z" fill="#010101" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_0_3844">
                                        <rect width="14" height="14" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>
                            Heading Tags
                        </div>
                        <div className="bg-stone-900 p-5 rounded-3xl font-mono ">
                            <div>
                                <span className="text-orange-400"><p className="text-white inline-flex">&lt;</p>h1<p className="text-white inline-flex">&gt;</p></span>
                                <span className="text-gray-200">This is Heading 1</span>
                                <span className="text-orange-400"><p className="text-white inline-flex">&lt;</p>/h1<p className="text-white inline-flex">&gt;</p></span>
                            </div>

                            <div>
                                <span className="text-orange-400"><p className="text-white inline-flex">&lt;</p>h2<p className="text-white inline-flex">&gt;</p></span>
                                <span className="text-gray-200">This is Heading 2</span>
                                <span className="text-orange-400"><p className="text-white inline-flex">&lt;</p>/h2<p className="text-white inline-flex">&gt;</p></span>
                            </div>

                            <div>
                                <span className="text-orange-400"><p className="text-white inline-flex">&lt;</p>h3<p className="text-white inline-flex">&gt;</p></span>
                                <span className="text-gray-200">This is Heading 3</span>
                                <span className="text-orange-400"><p className="text-white inline-flex">&lt;</p>/h3<p className="text-white inline-flex">&gt;</p></span>
                            </div>

                            <div>
                                <span className="text-orange-400"><p className="text-white inline-flex">&lt;</p>h4<p className="text-white inline-flex">&gt;</p></span>
                                <span className="text-gray-200">This is Heading 4</span>
                                <span className="text-orange-400"><p className="text-white inline-flex">&lt;</p>/h4<p className="text-white inline-flex">&gt;</p></span>
                            </div>

                            <div>
                                <span className="text-orange-400"><p className="text-white inline-flex">&lt;</p>h5<p className="text-white inline-flex">&gt;</p></span>
                                <span className="text-gray-200">This is Heading 5</span>
                                <span className="text-orange-400"><p className="text-white inline-flex">&lt;</p>/h5<p className="text-white inline-flex">&gt;</p></span>
                            </div>

                            <div>
                                <span className="text-orange-400"><p className="text-white inline-flex">&lt;</p>h6<p className="text-white inline-flex">&gt;</p></span>
                                <span className="text-gray-200">This is Heading 6</span>
                                <span className="text-orange-400"><p className="text-white inline-flex">&lt;</p>/h6<p className="text-white inline-flex">&gt;</p></span>
                            </div>
                        </div>

                    </div>
                    <hr className="border-t-2 border-gray-500" />
                    <div>
                        <div className='h-[40px] w-1/4  font-bold text-sm relative mb-5 border-transparent p-1 px-5 bg-gradient-to-r from-red-300 via-rose-300 to-pink-300
 text-black rounded-3xl flex justify-center items-center inline-flex gap-3 px-3 py-1'  >
                            <svg className='rotate-45' width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_0_3844)">
                                    <path d="M12.6286 1.04921L0.4829 5.52396C0.290486 5.59619 0.168389 5.78988 0.190123 5.99572C0.211219 6.2022 0.369753 6.36713 0.574952 6.39589L6.95147 7.30682L7.8624 13.6833C7.89116 13.8885 8.05673 14.0477 8.26193 14.0688C8.40128 14.0841 8.53553 14.033 8.6295 13.939C8.67488 13.8937 8.71068 13.8387 8.73369 13.776L13.2084 1.63029C13.2698 1.46408 13.2289 1.2787 13.1042 1.15405C12.9796 1.02939 12.7942 0.988481 12.6286 1.04921Z" fill="#010101" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_0_3844">
                                        <rect width="14" height="14" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>
                            Section Division
                        </div>
                        <div className="bg-stone-900 p-5 rounded-3xl font-mono ">
                            <ul className="flex justify-around mb-2 mt-2">
                                <li className="w-1/2 text-orange-400"><p className="text-white inline-flex">1. &lt;</p>div<p className="text-white inline-flex">&gt; &lt;</p>/div<p className="text-white inline-flex">&gt;</p></li>
                                <li className="w-1/2">Division or Section of Page Content</li>
                            </ul>

                            <hr className="border-t-2 border-gray-500" />

                            <ul className="flex justify-around mb-2 mt-2">
                                <li className="w-1/2 text-orange-400"><p className="text-white inline-flex">2. &lt;</p>span<p className="text-white inline-flex">&gt; &lt;</p>/span<p className="text-white inline-flex">&gt;</p></li>
                                <li className="w-1/2">Section of text within other content</li>
                            </ul>

                            <hr className="border-t-2 border-gray-500" />
                            <ul className="flex justify-around mb-2 mt-2">
                                <li className="w-1/2 text-orange-400"><p className="text-white inline-flex">3. &lt;</p>p<p className="text-white inline-flex">&gt; &lt;</p>/p<p className="text-white inline-flex">&gt;</p></li>
                                <li className="w-1/2">Paragraph of text</li>
                            </ul>

                            <hr className="border-t-2 border-gray-500" />
                            <ul className="flex justify-around mb-2 mt-2">
                                <li className="w-1/2 text-orange-400"><p className="text-white inline-flex">4. &lt;</p>br<p className="text-white inline-flex">&gt; &lt;</p>/br<p className="text-white inline-flex">&gt;</p></li>
                                <li className="w-1/2">Line break</li>
                            </ul>

                            <hr className="border-t-2 border-gray-500" />
                            <ul className="flex justify-around mb-2 mt-2">
                                <li className="w-1/2 text-orange-400"><p className="text-white inline-flex">5. &lt;</p>hr<p className="text-white inline-flex">&gt; &lt;</p>/hr<p className="text-white inline-flex">&gt;</p></li>
                                <li className="w-1/2">Basic Horizontal Line</li>
                            </ul>

                            <hr className="border-t-2 border-gray-500" />


                        </div>
                    </div>
                </div>
            </div>
            {/* fourth */}
            <div className="w-full flex gap-5 p-5 font-circular-web text-lg  " >
                <div className=" bg-black p-10  rounded-3xl w-1/2 text-white">
                    <div>
                        <div className='h-[40px] w-1/2  font-bold text-sm relative mb-5 border-transparent p-1 px-5 bg-gradient-to-r from-red-300 via-rose-300 to-pink-300
 text-black rounded-3xl flex justify-center items-center inline-flex gap-3 px-3 py-1'  >
                            <svg className='rotate-45' width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_0_3844)">
                                    <path d="M12.6286 1.04921L0.4829 5.52396C0.290486 5.59619 0.168389 5.78988 0.190123 5.99572C0.211219 6.2022 0.369753 6.36713 0.574952 6.39589L6.95147 7.30682L7.8624 13.6833C7.89116 13.8885 8.05673 14.0477 8.26193 14.0688C8.40128 14.0841 8.53553 14.033 8.6295 13.939C8.67488 13.8937 8.71068 13.8387 8.73369 13.776L13.2084 1.63029C13.2698 1.46408 13.2289 1.2787 13.1042 1.15405C12.9796 1.02939 12.7942 0.988481 12.6286 1.04921Z" fill="#010101" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_0_3844">
                                        <rect width="14" height="14" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>
                            <p className="font-extrabold">INTERNAL</p><p className="font-extralight">JavaScript and Stylesheet</p>
                        </div>
                        <div className="bg-stone-900 p-5 rounded-3xl font-mono mb-5">
                            {/* opening tag */}
                            <div>
                                <span className="text-orange-400"><p className="text-white inline-flex">&lt;</p>script</span>{" "}
                                <span className="text-emerald-400">type</span>
                                <span className="text-white">=</span>
                                <span className="text-amber-300">"text/javascript"</span>
                                <span className="text-orange-400"><p className="text-white inline-flex">&gt;</p></span>
                            </div>

                            {/* JS code */}
                            <div className="pl-8">
                                <span className="text-purple-400">let</span>{" "}
                                <span className="text-sky-300">text</span>{" "}
                                <span className="text-white">=</span>{" "}
                                <span className="text-amber-300">'Hello CodeSarhiians'</span>
                                <span className="text-white">;</span>
                            </div>

                            <div className="pl-8">
                                <span className="text-sky-300">alert</span>
                                <span className="text-white">(</span>
                                <span className="text-sky-300">text</span>
                                <span className="text-white">);</span>
                            </div>

                            {/* closing tag */}
                            <div>
                                <span className="text-orange-400"><p className="text-white inline-flex">&lt;</p>/script<p className="text-white inline-flex">&gt;</p></span>
                            </div>
                        </div>
                        <hr className="border-t-2 border-gray-500" />
                        <div className="bg-stone-900 p-5 rounded-3xl font-mono mb-5 mt-5">
                            {/* opening tag */}
                            <div>
                                <span className="text-orange-400"><p className="text-white inline-flex">&lt;</p>style</span>{" "}
                                <span className="text-emerald-400">type</span>
                                <span className="text-white">=</span>
                                <span className="text-amber-300">"text/css"</span>
                                <span className="text-orange-400"><p className="text-white inline-flex">&gt;</p></span>
                            </div>

                            {/* CSS code */}
                            <div className="pl-8">
                                <span className="text-sky-300">h1</span>{" "}
                                <span className="text-white"><p className="text-white inline-flex">&#12</p>3;</span>
                            </div>

                            <div className="pl-12">
                                <span className="text-emerald-400">color</span>
                                <span className="text-white">:</span>{" "}
                                <span className="text-purple-400">purple</span>
                                <span className="text-white">;</span>
                            </div>

                            <div className="pl-8">
                                <span className="text-white"><p className="text-white inline-flex">&#12</p>5;</span>
                            </div>

                            {/* closing tag */}
                            <div>
                                <span className="text-orange-400"><p className="text-white inline-flex">&lt;</p>/style<p className="text-white inline-flex">&gt;</p></span>
                            </div>

                        </div>
                    </div>
                    <div>
                        <div className='h-[40px] w-1/2  font-bold text-sm relative mb-5 border-transparent p-1 px-5 bg-gradient-to-r from-red-300 via-rose-300 to-pink-300
 text-black rounded-3xl flex justify-center items-center inline-flex gap-3 px-3 py-1'  >
                            <svg className='rotate-45' width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_0_3844)">
                                    <path d="M12.6286 1.04921L0.4829 5.52396C0.290486 5.59619 0.168389 5.78988 0.190123 5.99572C0.211219 6.2022 0.369753 6.36713 0.574952 6.39589L6.95147 7.30682L7.8624 13.6833C7.89116 13.8885 8.05673 14.0477 8.26193 14.0688C8.40128 14.0841 8.53553 14.033 8.6295 13.939C8.67488 13.8937 8.71068 13.8387 8.73369 13.776L13.2084 1.63029C13.2698 1.46408 13.2289 1.2787 13.1042 1.15405C12.9796 1.02939 12.7942 0.988481 12.6286 1.04921Z" fill="#010101" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_0_3844">
                                        <rect width="14" height="14" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>
                            <p className="font-extrabold">EXTERNAL</p><p className="font-extralight">JavaScript and Stylesheet</p>
                        </div>
                        <div className="bg-stone-900 p-5 rounded-3xl font-mono  mb-5">
                            <div>
                                <span className="text-orange-400"><p className="text-white inline-flex">&lt;</p>body<p className="text-white inline-flex">&gt;</p></span>
                            </div>

                            <div className="pl-8 text-gray-500">
                                ...
                            </div>

                            <div className="pl-8">
                                <span className="text-orange-400"><p className="text-white inline-flex">&lt;</p>script</span>{" "}
                                <span className="text-emerald-400">src</span>
                                <span className="text-white">=</span>
                                <span className="text-amber-300">"app.js"</span>
                                <span className="text-orange-400"><p className="text-white inline-flex">&gt;</p></span>
                                <span className="text-orange-400"><p className="text-white inline-flex">&lt;</p>/script<p className="text-white inline-flex">&gt;</p></span>
                            </div>

                            <div>
                                <span className="text-orange-400"><p className="text-white inline-flex">&lt;</p>/body<p className="text-white inline-flex">&gt;</p></span>
                            </div>

                        </div>
                        <hr className="border-t-2 border-gray-500" />
                        <div className="bg-stone-900 p-5 rounded-3xl font-mono mb-5 mt-5">

                            <div>
                                <span className="text-orange-400"><p className="text-white inline-flex">&lt;</p>head<p className="text-white inline-flex">&gt;</p></span>
                            </div>

                            <div className="pl-8 text-gray-500">
                                ...
                            </div>

                            <div className="pl-8">
                                <span className="text-orange-400"><p className="text-white inline-flex">&lt;</p>link</span>{" "}
                                <span className="text-emerald-400">rel</span>
                                <span className="text-white">=</span>
                                <span className="text-amber-300">"stylesheet"</span>{" "}
                                <span className="text-emerald-400">href</span>
                                <span className="text-white">=</span>
                                <span className="text-amber-300">"style.css"</span>{" "}
                                <span className="text-orange-400">/<p className="text-white inline-flex">&gt;</p></span>
                            </div>

                            <div>
                                <span className="text-orange-400"><p className="text-white inline-flex">&lt;</p>/head<p className="text-white inline-flex">&gt;</p></span>
                            </div>



                        </div>
                    </div>
                </div>

                <div className=" bg-black p-5 rounded-3xl w-1/2 flex flex-col justify-center gap-5 text-white">
                    <div>

                        <div className="w-full flex justify-between items-center mb-5 ">
                            <div className='h-[40px]   font-bold text-sm relative border-transparent p-1 px-5 bg-gradient-to-r from-red-300 via-rose-300 to-pink-300
 text-black rounded-3xl flex justify-center items-center inline-flex gap-3 px-3 py-1'  >
                                <svg className='rotate-45' width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clip-path="url(#clip0_0_3844)">
                                        <path d="M12.6286 1.04921L0.4829 5.52396C0.290486 5.59619 0.168389 5.78988 0.190123 5.99572C0.211219 6.2022 0.369753 6.36713 0.574952 6.39589L6.95147 7.30682L7.8624 13.6833C7.89116 13.8885 8.05673 14.0477 8.26193 14.0688C8.40128 14.0841 8.53553 14.033 8.6295 13.939C8.67488 13.8937 8.71068 13.8387 8.73369 13.776L13.2084 1.63029C13.2698 1.46408 13.2289 1.2787 13.1042 1.15405C12.9796 1.02939 12.7942 0.988481 12.6286 1.04921Z" fill="#010101" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_0_3844">
                                            <rect width="14" height="14" fill="white" />
                                        </clipPath>
                                    </defs>
                                </svg>
                                Inline Frame ( with preview )
                            </div>



                            <div className='h-[40px] w-1/3  font-bold text-sm relative  border-transparent  p-1 px-5 bg-gradient-to-r from-blue-300 via-sky-300 to-cyan-300
 text-black rounded-3xl flex justify-center items-center inline-flex gap-3 px-3 py-1 cursor-pointer'  >
                                <svg className='rotate-45' width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clip-path="url(#clip0_0_3844)">
                                        <path d="M12.6286 1.04921L0.4829 5.52396C0.290486 5.59619 0.168389 5.78988 0.190123 5.99572C0.211219 6.2022 0.369753 6.36713 0.574952 6.39589L6.95147 7.30682L7.8624 13.6833C7.89116 13.8885 8.05673 14.0477 8.26193 14.0688C8.40128 14.0841 8.53553 14.033 8.6295 13.939C8.67488 13.8937 8.71068 13.8387 8.73369 13.776L13.2084 1.63029C13.2698 1.46408 13.2289 1.2787 13.1042 1.15405C12.9796 1.02939 12.7942 0.988481 12.6286 1.04921Z" fill="#010101" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_0_3844">
                                            <rect width="14" height="14" fill="white" />
                                        </clipPath>
                                    </defs>
                                </svg>
                                <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/iframe" className="w-full" target="_blank"  >
                                    See : MDN Reference
                                </a>
                            </div>
                        </div>

                        <div className="bg-stone-900 p-5 rounded-3xl font-mono ">
                            <div>
                                <span className="text-orange-400"><p className="text-white inline-flex">&lt;</p>iframe</span>
                            </div>

                            <div className="pl-8">
                                <span className="text-emerald-400">title</span>
                                <span className="text-white">=</span>
                                <span className="text-amber-300">"New York"</span>
                            </div>

                            <div className="pl-8">
                                <span className="text-emerald-400">width</span>
                                <span className="text-white">=</span>
                                <span className="text-amber-300">"342"</span>
                            </div>

                            <div className="pl-8">
                                <span className="text-emerald-400">height</span>
                                <span className="text-white">=</span>
                                <span className="text-amber-300">"306"</span>
                            </div>

                            <div className="pl-8">
                                <span className="text-emerald-400">id</span>
                                <span className="text-white">=</span>
                                <span className="text-amber-300">"gmap_canvas"</span>
                            </div>

                            <div className="pl-8">
                                <span className="text-emerald-400">src</span>
                                <span className="text-white">=</span>
                                <span className="text-amber-300 break-all">
                                    "https://maps.google.com/maps?q=2880%20Broadway,%20New%20York&t=&z=13&ie=UTF8&iwloc=&output=embed"
                                </span>
                            </div>

                            <div className="pl-8">
                                <span className="text-emerald-400">scrolling</span>
                                <span className="text-white">=</span>
                                <span className="text-amber-300">"no"</span>
                            </div>

                            <div>
                                <span className="text-orange-400">&gt;</span>
                            </div>

                            <div className="pl-8 text-gray-500">{/* iframe content (empty) */}</div>

                            <div>
                                <span className="text-orange-400"><p className="text-white inline-flex">&lt;</p>/iframe <p className="text-white inline-flex">&gt;</p></span>
                            </div>
                        </div>

                        <iframe
                            title="New York"
                            className="w-full h-[500px] mt-5 rounded-3xl border-2 border-gray-500"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d107760.06358267844!2d80.3612485463019!3d26.440255788773385!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399c4770b127c46f%3A0x1778302a9fbe7b41!2sKanpur%2C%20Uttar%20Pradesh!5e1!3m2!1sen!2sin!4v1769776040630!5m2!1sen!2sin"
                        >
                        </iframe>

                    </div>
                    <div>


                    </div>



                </div>
            </div>
            {/* fifth */}
            <div className="w-full flex justify-center items-center font-head font-extrabold text-[3rem] mt-5 mb-5 leading-none">
                HTML 5 TAGS
            </div>
            <div className="w-full flex gap-5 p-5 font-circular-web text-lg  " >
                <div className=" bg-black p-5  rounded-3xl w-1/3 text-white">

                    <div>
                        <div className='h-[40px] w-1/3  font-bold text-sm relative mb-5 border-transparent p-1 px-5 bg-gradient-to-r from-red-300 via-rose-300 to-pink-300
 text-black rounded-3xl flex justify-center items-center inline-flex gap-3 px-3 py-1'  >
                            <svg className='rotate-45' width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_0_3844)">
                                    <path d="M12.6286 1.04921L0.4829 5.52396C0.290486 5.59619 0.168389 5.78988 0.190123 5.99572C0.211219 6.2022 0.369753 6.36713 0.574952 6.39589L6.95147 7.30682L7.8624 13.6833C7.89116 13.8885 8.05673 14.0477 8.26193 14.0688C8.40128 14.0841 8.53553 14.033 8.6295 13.939C8.67488 13.8937 8.71068 13.8387 8.73369 13.776L13.2084 1.63029C13.2698 1.46408 13.2289 1.2787 13.1042 1.15405C12.9796 1.02939 12.7942 0.988481 12.6286 1.04921Z" fill="#010101" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_0_3844">
                                        <rect width="14" height="14" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>
                            Document
                        </div>
                        <div className="bg-stone-900 p-5 rounded-3xl font-mono ">
                            <div>
                                <span className="text-orange-400">&lt;body&gt;</span>
                            </div>

                            <div className="pl-4">
                                <span className="text-orange-400">&lt;header&gt;</span>
                            </div>

                            <div className="pl-8">
                                <span className="text-orange-400">&lt;nav&gt;</span>
                                <span className="text-gray-500">...</span>
                                <span className="text-orange-400">&lt;/nav&gt;</span>
                            </div>

                            <div className="pl-4">
                                <span className="text-orange-400">&lt;/header&gt;</span>
                            </div>

                            <div className="pl-4">
                                <span className="text-orange-400">&lt;main&gt;</span>
                            </div>

                            <div className="pl-8">
                                <span className="text-orange-400">&lt;h1&gt;</span>
                                <span className="text-gray-200">CodeSarthi</span>
                                <span className="text-orange-400">&lt;/h1&gt;</span>
                            </div>

                            <div className="pl-4">
                                <span className="text-orange-400">&lt;/main&gt;</span>
                            </div>

                            <div className="pl-4">
                                <span className="text-orange-400">&lt;footer&gt;</span>
                            </div>

                            <div className="pl-8">
                                <span className="text-orange-400">&lt;p&gt;</span>
                                <span className="text-gray-200">TEAM AXONIC</span>
                                <span className="text-orange-400">&lt;/p&gt;</span>
                            </div>

                            <div className="pl-4">
                                <span className="text-orange-400">&lt;/footer&gt;</span>
                            </div>

                            <div>
                                <span className="text-orange-400">&lt;/body&gt;</span>
                            </div>
                        </div>
                        <hr className="border-t-2 border-gray-500 mt-5" />
                    </div>

                    <div className="mt-5">
                        <div className='h-[40px] w-1/2  font-bold text-sm relative mb-5 border-transparent p-1 px-5 bg-gradient-to-r from-red-300 via-rose-300 to-pink-300
 text-black rounded-3xl flex justify-center items-center inline-flex gap-3 px-3 py-1'  >
                            <svg className='rotate-45' width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_0_3844)">
                                    <path d="M12.6286 1.04921L0.4829 5.52396C0.290486 5.59619 0.168389 5.78988 0.190123 5.99572C0.211219 6.2022 0.369753 6.36713 0.574952 6.39589L6.95147 7.30682L7.8624 13.6833C7.89116 13.8885 8.05673 14.0477 8.26193 14.0688C8.40128 14.0841 8.53553 14.033 8.6295 13.939C8.67488 13.8937 8.71068 13.8387 8.73369 13.776L13.2084 1.63029C13.2698 1.46408 13.2289 1.2787 13.1042 1.15405C12.9796 1.02939 12.7942 0.988481 12.6286 1.04921Z" fill="#010101" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_0_3844">
                                        <rect width="14" height="14" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>
                            Header Navigation
                        </div>
                        <div className="bg-stone-900 p-5 rounded-3xl font-mono ">
                            <div>
                                <span className="text-orange-400">&lt;header&gt;</span>
                            </div>

                            <div className="pl-4">
                                <span className="text-orange-400">&lt;nav&gt;</span>
                            </div>

                            <div className="pl-8">
                                <span className="text-orange-400">&lt;ul&gt;</span>
                            </div>

                            <div className="pl-12">
                                <span className="text-orange-400">&lt;li&gt;</span>
                                <span className="text-orange-400">&lt;a</span>{" "}
                                <span className="text-emerald-400">href</span>
                                <span className="text-white">=</span>
                                <span className="text-amber-300">"#"</span>
                                <span className="text-orange-400">&gt;</span>
                                <span className="text-sky-300">Edit Page</span>
                                <span className="text-orange-400">&lt;/a&gt;</span>
                                <span className="text-orange-400">&lt;/li&gt;</span>
                            </div>

                            <div className="pl-12">
                                <span className="text-orange-400">&lt;li&gt;</span>
                                <span className="text-orange-400">&lt;a</span>{" "}
                                <span className="text-emerald-400">href</span>
                                <span className="text-white">=</span>
                                <span className="text-amber-300">"#"</span>
                                <span className="text-orange-400">&gt;</span>
                                <span className="text-sky-300">Twitter</span>
                                <span className="text-orange-400">&lt;/a&gt;</span>
                                <span className="text-orange-400">&lt;/li&gt;</span>
                            </div>

                            <div className="pl-12">
                                <span className="text-orange-400">&lt;li&gt;</span>
                                <span className="text-orange-400">&lt;a</span>{" "}
                                <span className="text-emerald-400">href</span>
                                <span className="text-white">=</span>
                                <span className="text-amber-300">"#"</span>
                                <span className="text-orange-400">&gt;</span>
                                <span className="text-sky-300">Facebook</span>
                                <span className="text-orange-400">&lt;/a&gt;</span>
                                <span className="text-orange-400">&lt;/li&gt;</span>
                            </div>

                            <div className="pl-8">
                                <span className="text-orange-400">&lt;/ul&gt;</span>
                            </div>

                            <div className="pl-4">
                                <span className="text-orange-400">&lt;/nav&gt;</span>
                            </div>

                            <div>
                                <span className="text-orange-400">&lt;/header&gt;</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className=" bg-black p-5 rounded-3xl w-1/3 flex flex-col justify-center gap-5 text-white">
                    <div>
                        <div className='h-[40px] w-1/3  font-bold text-sm relative mb-5 border-transparent p-1 px-5 bg-gradient-to-r from-red-300 via-rose-300 to-pink-300
 text-black rounded-3xl flex justify-center items-center inline-flex gap-3 px-3 py-1'  >
                            <svg className='rotate-45' width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_0_3844)">
                                    <path d="M12.6286 1.04921L0.4829 5.52396C0.290486 5.59619 0.168389 5.78988 0.190123 5.99572C0.211219 6.2022 0.369753 6.36713 0.574952 6.39589L6.95147 7.30682L7.8624 13.6833C7.89116 13.8885 8.05673 14.0477 8.26193 14.0688C8.40128 14.0841 8.53553 14.033 8.6295 13.939C8.67488 13.8937 8.71068 13.8387 8.73369 13.776L13.2084 1.63029C13.2698 1.46408 13.2289 1.2787 13.1042 1.15405C12.9796 1.02939 12.7942 0.988481 12.6286 1.04921Z" fill="#010101" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_0_3844">
                                        <rect width="14" height="14" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>
                            HTML5 MARK
                        </div>
                        <div className="bg-stone-900 p-5 rounded-3xl font-mono">
                            {/* opening video tag */}

                            <div>
                                <span className="text-orange-400">&lt;p&gt;</span>
                                <span className="text-gray-200">I Love </span>
                                <span className="text-orange-400">&lt;mark&gt;</span>
                                <span className="text-yellow-300">CodeSarthi</span>
                                <span className="text-orange-400">&lt;/mark&gt;</span>
                                <span className="text-orange-400">&lt;/p&gt;</span>
                            </div>
                        </div>
                        <p className="mt-5 justify-self-center">I Love <mark>CodeSarthi</mark></p>
                        <hr className="border-t-2 border-gray-500 mt-5" />
                    </div>
                    <div>
                        <div className='h-[40px] w-1/2  font-bold text-sm relative mb-5 border-transparent p-1 px-5 bg-gradient-to-r from-red-300 via-rose-300 to-pink-300
 text-black rounded-3xl flex justify-center items-center inline-flex gap-3 px-3 py-1'  >
                            <svg className='rotate-45' width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_0_3844)">
                                    <path d="M12.6286 1.04921L0.4829 5.52396C0.290486 5.59619 0.168389 5.78988 0.190123 5.99572C0.211219 6.2022 0.369753 6.36713 0.574952 6.39589L6.95147 7.30682L7.8624 13.6833C7.89116 13.8885 8.05673 14.0477 8.26193 14.0688C8.40128 14.0841 8.53553 14.033 8.6295 13.939C8.67488 13.8937 8.71068 13.8387 8.73369 13.776L13.2084 1.63029C13.2698 1.46408 13.2289 1.2787 13.1042 1.15405C12.9796 1.02939 12.7942 0.988481 12.6286 1.04921Z" fill="#010101" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_0_3844">
                                        <rect width="14" height="14" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>
                            HTML5 PROGRESS
                        </div>
                        <div className="bg-stone-900 p-5 rounded-3xl font-mono">

                            <div>
                                <span className="text-orange-400">&lt;progress</span>{" "}
                                <span className="text-emerald-400">value</span>
                                <span className="text-white">=</span>
                                <span className="text-amber-300">"50"</span>{" "}
                                <span className="text-emerald-400">max</span>
                                <span className="text-white">=</span>
                                <span className="text-amber-300">"100"</span>
                                <span className="text-orange-400">&gt;</span>
                                <span className="text-orange-400">&lt;/progress&gt;</span>
                            </div>
                        </div>
                        <progress value="50" max="100" className="w-full mt-5 rounded-xl border overflow-hidden "></progress>
                        <hr className="border-t-2 border-gray-500 mt-5" />
                    </div>
                    <div>
                        <div className='h-[40px] w-1/3  font-bold text-sm relative mb-5 border-transparent p-1 px-5 bg-gradient-to-r from-red-300 via-rose-300 to-pink-300
 text-black rounded-3xl flex justify-center items-center inline-flex gap-3 px-3 py-1'  >
                            <svg className='rotate-45' width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_0_3844)">
                                    <path d="M12.6286 1.04921L0.4829 5.52396C0.290486 5.59619 0.168389 5.78988 0.190123 5.99572C0.211219 6.2022 0.369753 6.36713 0.574952 6.39589L6.95147 7.30682L7.8624 13.6833C7.89116 13.8885 8.05673 14.0477 8.26193 14.0688C8.40128 14.0841 8.53553 14.033 8.6295 13.939C8.67488 13.8937 8.71068 13.8387 8.73369 13.776L13.2084 1.63029C13.2698 1.46408 13.2289 1.2787 13.1042 1.15405C12.9796 1.02939 12.7942 0.988481 12.6286 1.04921Z" fill="#010101" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_0_3844">
                                        <rect width="14" height="14" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>
                            HTML5 AUDIO
                        </div>
                        <div className="bg-stone-900 p-5 rounded-3xl font-mono  mb-5">
                            {/* opening audio tag */}
                            <div>
                                <span className="text-orange-400">&lt;audio</span>{" "}
                                <span className="text-emerald-400">controls</span>{" "}
                                <span className="text-emerald-400">src</span>
                                <span className="text-white">=</span>
                                <span className="text-amber-300 break-all">
                                    "sample.mp3"
                                </span>
                                <span className="text-orange-400">&gt;</span>
                            </div>

                            {/* fallback text */}
                            <div className="pl-8 text-gray-400">
                                Your browser does not support the audio element.
                            </div>

                            {/* closing audio tag */}
                            <div>
                                <span className="text-orange-400">&lt;/audio&gt;</span>
                            </div>
                        </div>

                        <audio
                            controls
                            src={"/audio/toolkit.mp3"}
                            className="w-full"
                        >
                            Your browser does not support the audio element.
                        </audio>
                    </div>
                </div>
                <div className=" bg-black p-5 rounded-3xl w-1/3 flex flex-col justify-center gap-5 text-white">
                    <div>
                        <div className='h-[40px] w-1/3  font-bold text-sm relative mb-5 border-transparent p-1 px-5 bg-gradient-to-r from-red-300 via-rose-300 to-pink-300
 text-black rounded-3xl flex justify-center items-center inline-flex gap-3 px-3 py-1'  >
                            <svg className='rotate-45' width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_0_3844)">
                                    <path d="M12.6286 1.04921L0.4829 5.52396C0.290486 5.59619 0.168389 5.78988 0.190123 5.99572C0.211219 6.2022 0.369753 6.36713 0.574952 6.39589L6.95147 7.30682L7.8624 13.6833C7.89116 13.8885 8.05673 14.0477 8.26193 14.0688C8.40128 14.0841 8.53553 14.033 8.6295 13.939C8.67488 13.8937 8.71068 13.8387 8.73369 13.776L13.2084 1.63029C13.2698 1.46408 13.2289 1.2787 13.1042 1.15405C12.9796 1.02939 12.7942 0.988481 12.6286 1.04921Z" fill="#010101" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_0_3844">
                                        <rect width="14" height="14" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>
                            HTML5 VIDEO
                        </div>
                        <div className="bg-stone-900 p-5 rounded-3xl font-mono ">
                            {/* opening video tag */}
                            <div>
                                <span className="text-orange-400">&lt;video</span>{" "}
                                <span className="text-emerald-400">controls</span>
                                <span className="text-white">=</span>
                                <span className="text-amber-300">""</span>{" "}
                                <span className="text-emerald-400">width</span>
                                <span className="text-white">=</span>
                                <span className="text-amber-300">"100%"</span>
                                <span className="text-orange-400">&gt;</span>
                            </div>

                            {/* source tag */}
                            <div className="pl-8">
                                <span className="text-orange-400">&lt;source</span>
                            </div>

                            <div className="pl-12">
                                <span className="text-emerald-400">src</span>
                                <span className="text-white">=</span>
                                <span className="text-amber-300 break-all">
                                    "sample.mp4"
                                </span>
                            </div>

                            <div className="pl-12">
                                <span className="text-emerald-400">type</span>
                                <span className="text-white">=</span>
                                <span className="text-amber-300">"video/mp4"</span>
                            </div>

                            <div className="pl-8">
                                <span className="text-orange-400">/&gt;</span>
                            </div>

                            {/* fallback text */}
                            <div className="pl-8 text-gray-400">
                                Sorry, your browser doesn&apos;t support embedded videos.
                            </div>

                            {/* closing video tag */}
                            <div>
                                <span className="text-orange-400">&lt;/video&gt;</span>
                            </div>
                        </div>
                        <video
                            src={"/videos/feature-2.mp4"}
                            autoPlay
                            loop
                            muted
                            playsInline
                            preload="auto"
                            className="  rounded-3xl object-cover h-[400px] w-full mt-5  "
                        />
                    </div>
                </div>
            </div>
            {/* sixth */}
            <div className="w-full flex gap-5 p-5 font-circular-web text-lg  " >
                <div className=" bg-black p-10 flex gap-5 rounded-3xl w-full text-white">
                    <div className="bg-stone-900 p-5 w-1/3 rounded-3xl font-mono ">

                        <ul className="flex justify-around mb-2 mt-2">
                            <li className="w-1/2">1. article</li>
                            <li className="w-1/2">Content that’s independent</li>
                        </ul>

                        <hr className="border-t-2 border-gray-500" />
                        <ul className="flex justify-around mb-2 mt-2">
                            <li className="w-1/2">2. aside</li>
                            <li className="w-1/2">Secondary content</li>
                        </ul>

                        <hr className="border-t-2 border-gray-500" />
                        <ul className="flex justify-around mb-2 mt-2">
                            <li className="w-1/2">3. audio</li>
                            <li className="w-1/2">Embeds a sound, or an audio stream</li>
                        </ul>

                        <hr className="border-t-2 border-gray-500" />
                        <ul className="flex justify-around mb-2 mt-2">
                            <li className="w-1/2">4. bdi</li>
                            <li className="w-1/2">Draw graphics via JavaScript</li>
                        </ul>

                        <hr className="border-t-2 border-gray-500" />
                        <ul className="flex justify-around mb-2 mt-2">
                            <li className="w-1/2">5. canvas</li>
                            <li className="w-1/2">Draw graphics via JavaScript</li>
                        </ul>

                        <hr className="border-t-2 border-gray-500" />
                        <ul className="flex justify-around mb-2 mt-2">
                            <li className="w-1/2">6. data</li>
                            <li className="w-1/2">Machine readable content</li>
                        </ul>

                        <hr className="border-t-2 border-gray-500" />
                        <ul className="flex justify-around mb-2 mt-2">
                            <li className="w-1/2">7. datalist</li>
                            <li className="w-1/2">A set of pre-defined options</li>
                        </ul>

                        <hr className="border-t-2 border-gray-500" />
                        <ul className="flex justify-around mb-2 mt-2">
                            <li className="w-1/2">8. details</li>
                            <li className="w-1/2">Additional information</li>
                        </ul>

                        <hr className="border-t-2 border-gray-500" />
                        <ul className="flex justify-around mb-2 mt-2">
                            <li className="w-1/2">9. dialog</li>
                            <li className="w-1/2">A dialog box or sub-window</li>
                        </ul>

                        <hr className="border-t-2 border-gray-500" />
                        <ul className="flex justify-around mb-2 mt-2">
                            <li className="w-1/2">10. embed</li>
                            <li className="w-1/2">Embeds external application</li>
                        </ul>

                        <hr className="border-t-2 border-gray-500" />
                        <ul className="flex justify-around mb-2 mt-2">
                            <li className="w-1/2">11. figcaption</li>
                            <li className="w-1/2">A caption or legend for a figure</li>
                        </ul>



                    </div>
                    <hr className="h-full border-l-2 border-gray-500" />

                    <div className="bg-stone-900 p-5 w-1/3 rounded-3xl font-mono ">

                        <ul className="flex justify-around mb-2 mt-2">
                            <li className="w-1/2">12. figure</li>
                            <li className="w-1/2">A figure illustrated</li>
                        </ul>

                        <hr className="border-t-2 border-gray-500" />
                        <ul className="flex justify-around mb-2 mt-2">
                            <li className="w-1/2">13. footer</li>
                            <li className="w-1/2">Footer or least important</li>
                        </ul>

                        <hr className="border-t-2 border-gray-500" />
                        <ul className="flex justify-around mb-2 mt-2">
                            <li className="w-1/2">14. header</li>
                            <li className="w-1/2">Masthead or important information</li>
                        </ul>

                        <hr className="border-t-2 border-gray-500" />
                        <ul className="flex justify-around mb-2 mt-2">
                            <li className="w-1/2">15. main</li>
                            <li className="w-1/2">The main content of the document</li>
                        </ul>

                        <hr className="border-t-2 border-gray-500" />
                        <ul className="flex justify-around mb-2 mt-2">
                            <li className="w-1/2">16. mark</li>
                            <li className="w-1/2">Text highlighted</li>
                        </ul>

                        <hr className="border-t-2 border-gray-500" />
                        <ul className="flex justify-around mb-2 mt-2">
                            <li className="w-1/2">17. meter</li>
                            <li className="w-1/2">A scalar value within a known range</li>
                        </ul>

                        <hr className="border-t-2 border-gray-500" />
                        <ul className="flex justify-around mb-2 mt-2">
                            <li className="w-1/2">18. nav</li>
                            <li className="w-1/2">A section of navigation links</li>
                        </ul>

                        <hr className="border-t-2 border-gray-500" />
                        <ul className="flex justify-around mb-2 mt-2">
                            <li className="w-1/2">19. output</li>
                            <li className="w-1/2">The result of a calculation</li>
                        </ul>

                        <hr className="border-t-2 border-gray-500" />
                        <ul className="flex justify-around mb-2 mt-2">
                            <li className="w-1/2">20. picture</li>
                            <li className="w-1/2">A container for multiple image sources</li>
                        </ul>

                        <hr className="border-t-2 border-gray-500" />
                        <ul className="flex justify-around mb-2 mt-2">
                            <li className="w-1/2">21. progress</li>
                            <li className="w-1/2">The completion progress of a task</li>
                        </ul>

                        <hr className="border-t-2 border-gray-500" />
                        <ul className="flex justify-around mb-2 mt-2">
                            <li className="w-1/2">22. rp</li>
                            <li className="w-1/2">Provides fall-back parenthesis</li>
                        </ul>



                    </div>
                    <hr className="h-full border-l-2 border-gray-500" />

                    <div className="bg-stone-900 p-5 w-1/3 rounded-3xl font-mono ">

                        <ul className="flex justify-around mb-2 mt-2">
                            <li className="w-1/2">23. rt</li>
                            <li className="w-1/2">Defines the pronunciation of character</li>
                        </ul>

                        <hr className="border-t-2 border-gray-500" />
                        <ul className="flex justify-around mb-2 mt-2">
                            <li className="w-1/2">24. ruby</li>
                            <li className="w-1/2">Represents a ruby annotation</li>
                        </ul>

                        <hr className="border-t-2 border-gray-500" />
                        <ul className="flex justify-around mb-2 mt-2">
                            <li className="w-1/2">25. section</li>
                            <li className="w-1/2">A group in a series of related content</li>
                        </ul>

                        <hr className="border-t-2 border-gray-500" />
                        <ul className="flex justify-around mb-2 mt-2">
                            <li className="w-1/2">26. source</li>
                            <li className="w-1/2">Resources for the media elements</li>
                        </ul>

                        <hr className="border-t-2 border-gray-500" />
                        <ul className="flex justify-around mb-2 mt-2">
                            <li className="w-1/2">27. summary</li>
                            <li className="w-1/2">A summary for the &lt; details &gt; element</li>
                        </ul>

                        <hr className="border-t-2 border-gray-500" />
                        <ul className="flex justify-around mb-2 mt-2">
                            <li className="w-1/2">28. template</li>
                            <li className="w-1/2">Defines the fragments of HTML</li>
                        </ul>

                        <hr className="border-t-2 border-gray-500" />
                        <ul className="flex justify-around mb-2 mt-2">
                            <li className="w-1/2">29. time</li>
                            <li className="w-1/2">A time or date</li>
                        </ul>

                        <hr className="border-t-2 border-gray-500" />
                        <ul className="flex justify-around mb-2 mt-2">
                            <li className="w-1/2">30. track</li>
                            <li className="w-1/2">Text tracks for the media elements</li>
                        </ul>

                        <hr className="border-t-2 border-gray-500" />
                        <ul className="flex justify-around mb-2 mt-2">
                            <li className="w-1/2">31. video</li>
                            <li className="w-1/2">Embeds video</li>
                        </ul>

                        <hr className="border-t-2 border-gray-500" />
                        <ul className="flex justify-around mb-2 mt-2">
                            <li className="w-1/2">32. wbr</li>
                            <li className="w-1/2">A line break opportunity</li>
                        </ul>





                    </div>
                </div>

            </div>

            {/* seventh */}
            <div className="w-full flex justify-center items-center font-head font-extrabold text-[3rem] mt-5 mb-5 leading-none">
                HTML TABLES
            </div>
            <div className="w-full flex gap-5 p-5 font-circular-web text-lg  " >
                <div className=" bg-black p-10  rounded-3xl w-1/3 text-white">
                    <div className="bg-stone-900 p-5 rounded-3xl font-mono  mb-5">
                        <div>
                            <span className="text-orange-400">&lt;table&gt;</span>
                        </div>

                        <div className="pl-4">
                            <span className="text-orange-400">&lt;thead&gt;</span>
                        </div>

                        <div className="pl-8">
                            <span className="text-orange-400">&lt;tr&gt;</span>
                        </div>

                        <div className="pl-12">
                            <span className="text-orange-400">&lt;td&gt;</span>
                            <span className="text-gray-200">name</span>
                            <span className="text-orange-400">&lt;/td&gt;</span>

                            <span className="ml-4 text-orange-400">&lt;td&gt;</span>
                            <span className="text-gray-200">age</span>
                            <span className="text-orange-400">&lt;/td&gt;</span>
                        </div>

                        <div className="pl-8">
                            <span className="text-orange-400">&lt;/tr&gt;</span>
                        </div>

                        <div className="pl-4">
                            <span className="text-orange-400">&lt;/thead&gt;</span>
                        </div>

                        <div className="pl-4">
                            <span className="text-orange-400">&lt;tbody&gt;</span>
                        </div>

                        <div className="pl-8">
                            <span className="text-orange-400">&lt;tr&gt;</span>
                        </div>

                        <div className="pl-12">
                            <span className="text-orange-400">&lt;td&gt;</span>
                            <span className="text-gray-200">Roberta</span>
                            <span className="text-orange-400">&lt;/td&gt;</span>

                            <span className="ml-4 text-orange-400">&lt;td&gt;</span>
                            <span className="text-gray-200">39</span>
                            <span className="text-orange-400">&lt;/td&gt;</span>
                        </div>

                        <div className="pl-8">
                            <span className="text-orange-400">&lt;/tr&gt;</span>
                        </div>

                        <div className="pl-8">
                            <span className="text-orange-400">&lt;tr&gt;</span>
                        </div>

                        <div className="pl-12">
                            <span className="text-orange-400">&lt;td&gt;</span>
                            <span className="text-gray-200">Oliver</span>
                            <span className="text-orange-400">&lt;/td&gt;</span>

                            <span className="ml-4 text-orange-400">&lt;td&gt;</span>
                            <span className="text-gray-200">25</span>
                            <span className="text-orange-400">&lt;/td&gt;</span>
                        </div>

                        <div className="pl-8">
                            <span className="text-orange-400">&lt;/tr&gt;</span>
                        </div>

                        <div className="pl-4">
                            <span className="text-orange-400">&lt;/tbody&gt;</span>
                        </div>

                        <div>
                            <span className="text-orange-400">&lt;/table&gt;</span>
                        </div>

                    </div>
                </div>
                <div className=" bg-black p-5 rounded-3xl w-1/3 flex flex-col justify-between gap-5 text-white">
                    <div className="bg-stone-900 p-5 rounded-3xl font-mono  ">

                        <ul className="flex justify-around mb-2 mt-2">
                            <li className="w-1/2 text-orange-400"><p className="text-white inline-flex">1. &lt;</p>table<p className="text-white inline-flex">&gt;</p></li>
                            <li className="w-1/2">Defines a table</li>
                        </ul>

                        <hr className="border-t-2 border-gray-500" />
                        <ul className="flex justify-around mb-2 mt-2">
                            <li className="w-1/2 text-orange-400"><p className="text-white inline-flex">2. &lt;</p>th<p className="text-white inline-flex">&gt;</p></li>
                            <li className="w-1/2">Defines a header cell in a table</li>
                        </ul>

                        <hr className="border-t-2 border-gray-500" />
                        <ul className="flex justify-around mb-2 mt-2">
                            <li className="w-1/2 text-orange-400"><p className="text-white inline-flex">3. &lt;</p>tr<p className="text-white inline-flex">&gt;</p></li>
                            <li className="w-1/2">Defines a row in a table</li>
                        </ul>
                        <hr className="border-t-2 border-gray-500" />
                        <ul className="flex justify-around mb-2 mt-2">
                            <li className="w-1/2 text-orange-400"><p className="text-white inline-flex">4. &lt;</p>td<p className="text-white inline-flex">&gt;</p></li>
                            <li className="w-1/2">Defines a cell in a table</li>
                        </ul>

                        <hr className="border-t-2 border-gray-500" />
                        <ul className="flex justify-around mb-2 mt-2">
                            <li className="w-1/2 text-orange-400"><p className="text-white inline-flex">5. &lt;</p>caption<p className="text-white inline-flex">&gt;</p></li>
                            <li className="w-1/2">Defines a table caption</li>
                        </ul>

                        <hr className="border-t-2 border-gray-500" />
                        <ul className="flex justify-around mb-2 mt-2">
                            <li className="w-1/2 text-orange-400"><p className="text-white inline-flex">6. &lt;</p>colgroup<p className="text-white inline-flex">&gt;</p></li>
                            <li className="w-1/2">Defines a group of columns</li>
                        </ul>

                        <hr className="border-t-2 border-gray-500" />
                        <ul className="flex justify-around mb-2 mt-2">
                            <li className="w-1/2 text-orange-400"><p className="text-white inline-flex">7. &lt;</p>col<p className="text-white inline-flex">&gt;</p></li>
                            <li className="w-1/2">Defines a column within a table</li>
                        </ul>

                        <hr className="border-t-2 border-gray-500" />
                        <ul className="flex justify-around mb-2 mt-2">
                            <li className="w-1/2 text-orange-400"><p className="text-white inline-flex">8. &lt;</p>thead<p className="text-white inline-flex">&gt;</p></li>
                            <li className="w-1/2">Groups the header content</li>
                        </ul>

                        <hr className="border-t-2 border-gray-500" />
                        <ul className="flex justify-around mb-2 mt-2">
                            <li className="w-1/2 text-orange-400"><p className="text-white inline-flex">9. &lt;</p>tbody<p className="text-white inline-flex">&gt;</p></li>
                            <li className="w-1/2">Groups the body content</li>
                        </ul>

                        <hr className="border-t-2 border-gray-500" />
                        <ul className="flex justify-around mb-2 mt-2">
                            <li className="w-1/2 text-orange-400"><p className="text-white inline-flex">10. &lt;</p>tfoot<p className="text-white inline-flex">&gt;</p></li>
                            <li className="w-1/2">Groups the footer content
                            </li>
                        </ul>
                    </div>
                </div>
                <div className=" bg-black p-5 rounded-3xl w-1/3 flex flex-col justify-between gap-5 text-white">
                    <div className="bg-stone-900 p-5 rounded-3xl font-mono  ">

                        <ul className="flex justify-around mb-2 mt-2">
                            <li className="w-1/2 text-orange-400"><p className="text-white inline-flex">1.</p> colspan</li>
                            <li className="w-1/2">Number of columns a cell should span</li>
                        </ul>

                        <hr className="border-t-2 border-gray-500" />
                        <ul className="flex justify-around mb-2 mt-2">
                            <li className="w-1/2 text-orange-400"><p className="text-white inline-flex">2.</p> headers</li>
                            <li className="w-1/2">One or more header cells a cell is related to</li>
                        </ul>

                        <hr className="border-t-2 border-gray-500" />
                        <ul className="flex justify-around mb-2 mt-2">
                            <li className="w-1/2 text-orange-400"><p className="text-white inline-flex">3.</p> rowspan</li>
                            <li className="w-1/2">Number of rows a cell should span</li>
                        </ul>


                    </div>
                    <div className="bg-stone-900 p-5 rounded-3xl font-mono  ">

                        <ul className="flex justify-around mb-2 mt-2">
                            <li className="w-1/2 text-orange-400"><p className="text-white inline-flex">1.</p> headers</li>
                            <li className="w-1/2">Number of columns a cell should span</li>
                        </ul>

                        <hr className="border-t-2 border-gray-500" />
                        <ul className="flex justify-around mb-2 mt-2">
                            <li className="w-1/2 text-orange-400"><p className="text-white inline-flex">2.</p> colspan</li>
                            <li className="w-1/2">One or more header cells a cell is related to</li>
                        </ul>

                        <hr className="border-t-2 border-gray-500" />
                        <ul className="flex justify-around mb-2 mt-2">
                            <li className="w-1/2 text-orange-400"><p className="text-white inline-flex">3.</p> rowspan</li>
                            <li className="w-1/2">Number of rows a cell should span</li>
                        </ul>
                        <hr className="border-t-2 border-gray-500" />
                        <ul className="flex justify-around mb-2 mt-2">
                            <li className="w-1/2 text-orange-400"><p className="text-white inline-flex">4.</p> abbr</li>
                            <li className="w-1/2">Description of the cell's content</li>
                        </ul>

                        <hr className="border-t-2 border-gray-500" />
                        <ul className="flex justify-around mb-2 mt-2">
                            <li className="w-1/2 text-orange-400"><p className="text-white inline-flex">5.</p> scope</li>
                            <li className="w-1/2">The header element relates to</li>
                        </ul>


                    </div>
                </div>
            </div>


            <div className="w-full flex gap-5 p-5 font-circular-web text-lg  " >
                <div className=" bg-black p-10  rounded-3xl w-1/3 text-white">

                    <div className="bg-stone-900 p-5 rounded-3xl font-mono ">
                        <div>
                            <span className="text-orange-400">&lt;ul&gt;</span>
                        </div>

                        <div className="pl-4">
                            <span className="text-orange-400">&lt;li&gt;</span>
                            <span className="text-gray-200">I&apos;m an item</span>
                            <span className="text-orange-400">&lt;/li&gt;</span>
                        </div>

                        <div className="pl-4">
                            <span className="text-orange-400">&lt;li&gt;</span>
                            <span className="text-gray-200">I&apos;m another item</span>
                            <span className="text-orange-400">&lt;/li&gt;</span>
                        </div>

                        <div className="pl-4">
                            <span className="text-orange-400">&lt;li&gt;</span>
                            <span className="text-gray-200">I&apos;m another item</span>
                            <span className="text-orange-400">&lt;/li&gt;</span>
                        </div>

                        <div>
                            <span className="text-orange-400">&lt;/ul&gt;</span>
                        </div>
                    </div>

                </div>
                <div className=" bg-black p-5 rounded-3xl w-1/3 flex flex-col justify-between gap-5 text-white">
                    <div className="bg-stone-900 p-5 rounded-3xl font-mono mt-5">
                        <div>
                            <span className="text-orange-400">&lt;ol&gt;</span>
                        </div>

                        <div className="pl-4">
                            <span className="text-orange-400">&lt;li&gt;</span>
                            <span className="text-gray-200">I&apos;m the first item</span>
                            <span className="text-orange-400">&lt;/li&gt;</span>
                        </div>

                        <div className="pl-4">
                            <span className="text-orange-400">&lt;li&gt;</span>
                            <span className="text-gray-200">I&apos;m the second item</span>
                            <span className="text-orange-400">&lt;/li&gt;</span>
                        </div>

                        <div className="pl-4">
                            <span className="text-orange-400">&lt;li&gt;</span>
                            <span className="text-gray-200">I&apos;m the third item</span>
                            <span className="text-orange-400">&lt;/li&gt;</span>
                        </div>

                        <div>
                            <span className="text-orange-400">&lt;/ol&gt;</span>
                        </div>
                    </div>


                </div>
                <div className=" bg-black p-5 rounded-3xl w-1/3 flex flex-col justify-between gap-5 text-white">
                    <div className="bg-stone-900 p-5 rounded-3xl font-mono mt-5">
                        <div>
                            <span className="text-orange-400">&lt;dl&gt;</span>
                        </div>

                        <div className="pl-4">
                            <span className="text-orange-400">&lt;dt&gt;</span>
                            <span className="text-gray-200">A Term</span>
                            <span className="text-orange-400">&lt;/dt&gt;</span>
                        </div>

                        <div className="pl-8">
                            <span className="text-orange-400">&lt;dd&gt;</span>
                            <span className="text-gray-400">Definition of a term</span>
                            <span className="text-orange-400">&lt;/dd&gt;</span>
                        </div>

                        <div className="pl-4">
                            <span className="text-orange-400">&lt;dt&gt;</span>
                            <span className="text-gray-200">Another Term</span>
                            <span className="text-orange-400">&lt;/dt&gt;</span>
                        </div>

                        <div className="pl-8">
                            <span className="text-orange-400">&lt;dd&gt;</span>
                            <span className="text-gray-400">Definition of another term</span>
                            <span className="text-orange-400">&lt;/dd&gt;</span>
                        </div>

                        <div>
                            <span className="text-orange-400">&lt;/dl&gt;</span>
                        </div>
                    </div>


                </div>
            </div>
            <div className="w-full flex justify-center items-center font-head font-extrabold text-[3rem] mt-5 mb-5 leading-none">
                HTML FORMS
            </div>
            <div className="w-full flex gap-5 p-5 font-circular-web text-lg  " >
                <div className=" bg-black p-10  rounded-3xl w-1/3 text-white">
                    <div className="bg-stone-900 p-5 rounded-3xl font-mono ">
                        {/* opening form */}
                        <div>
                            <span className="text-orange-400">&lt;form</span>{" "}
                            <span className="text-emerald-400">method</span>
                            <span className="text-white">=</span>
                            <span className="text-amber-300">"POST"</span>{" "}
                            <span className="text-emerald-400">action</span>
                            <span className="text-white">=</span>
                            <span className="text-amber-300">"api/login"</span>
                            <span className="text-orange-400">&gt;</span>
                        </div>

                        {/* email */}
                        <div className="pl-4">
                            <span className="text-orange-400">&lt;label</span>{" "}
                            <span className="text-emerald-400">for</span>
                            <span className="text-white">=</span>
                            <span className="text-amber-300">"mail"</span>
                            <span className="text-orange-400">&gt;</span>
                            <span className="text-gray-200">Email: </span>
                            <span className="text-orange-400">&lt;/label&gt;</span>
                        </div>

                        <div className="pl-4">
                            <span className="text-orange-400">&lt;input</span>{" "}
                            <span className="text-emerald-400">type</span>
                            <span className="text-white">=</span>
                            <span className="text-amber-300">"email"</span>{" "}
                            <span className="text-emerald-400">id</span>
                            <span className="text-white">=</span>
                            <span className="text-amber-300">"mail"</span>{" "}
                            <span className="text-emerald-400">name</span>
                            <span className="text-white">=</span>
                            <span className="text-amber-300">"mail"</span>{" "}
                            <span className="text-orange-400">/&gt;</span>
                        </div>

                        <div className="pl-4">
                            <span className="text-orange-400">&lt;br /&gt;</span>
                        </div>

                        {/* password */}
                        <div className="pl-4">
                            <span className="text-orange-400">&lt;label</span>{" "}
                            <span className="text-emerald-400">for</span>
                            <span className="text-white">=</span>
                            <span className="text-amber-300">"pw"</span>
                            <span className="text-orange-400">&gt;</span>
                            <span className="text-gray-200">Password: </span>
                            <span className="text-orange-400">&lt;/label&gt;</span>
                        </div>

                        <div className="pl-4">
                            <span className="text-orange-400">&lt;input</span>{" "}
                            <span className="text-emerald-400">type</span>
                            <span className="text-white">=</span>
                            <span className="text-amber-300">"password"</span>{" "}
                            <span className="text-emerald-400">id</span>
                            <span className="text-white">=</span>
                            <span className="text-amber-300">"pw"</span>{" "}
                            <span className="text-emerald-400">name</span>
                            <span className="text-white">=</span>
                            <span className="text-amber-300">"pw"</span>{" "}
                            <span className="text-orange-400">/&gt;</span>
                        </div>

                        <div className="pl-4">
                            <span className="text-orange-400">&lt;br /&gt;</span>
                        </div>

                        {/* submit */}
                        <div className="pl-4">
                            <span className="text-orange-400">&lt;input</span>{" "}
                            <span className="text-emerald-400">type</span>
                            <span className="text-white">=</span>
                            <span className="text-amber-300">"submit"</span>{" "}
                            <span className="text-emerald-400">value</span>
                            <span className="text-white">=</span>
                            <span className="text-amber-300">"Login"</span>{" "}
                            <span className="text-orange-400">/&gt;</span>
                        </div>

                        <div className="pl-4">
                            <span className="text-orange-400">&lt;br /&gt;</span>
                        </div>

                        {/* checkbox */}
                        <div className="pl-4">
                            <span className="text-orange-400">&lt;input</span>{" "}
                            <span className="text-emerald-400">type</span>
                            <span className="text-white">=</span>
                            <span className="text-amber-300">"checkbox"</span>{" "}
                            <span className="text-emerald-400">id</span>
                            <span className="text-white">=</span>
                            <span className="text-amber-300">"ck"</span>{" "}
                            <span className="text-emerald-400">name</span>
                            <span className="text-white">=</span>
                            <span className="text-amber-300">"ck"</span>{" "}
                            <span className="text-orange-400">/&gt;</span>
                        </div>

                        <div className="pl-4">
                            <span className="text-orange-400">&lt;label</span>{" "}
                            <span className="text-emerald-400">for</span>
                            <span className="text-white">=</span>
                            <span className="text-amber-300">"ck"</span>
                            <span className="text-orange-400">&gt;</span>
                            <span className="text-gray-200">Remember me</span>
                            <span className="text-orange-400">&lt;/label&gt;</span>
                        </div>

                        {/* closing form */}
                        <div>
                            <span className="text-orange-400">&lt;/form&gt;</span>
                        </div>
                    </div>
                </div>
                <div className=" bg-black p-5 rounded-3xl w-1/3 flex flex-col justify-between gap-5 text-white">
                    <div className="bg-stone-900 p-5 rounded-3xl font-mono mt-5">
                        {/* Nested label */}
                        <div className="text-gray-500">
                            &lt;!-- Nested label --&gt;
                        </div>

                        <div>
                            <span className="text-orange-400">&lt;label&gt;</span>
                        </div>

                        <div className="pl-4">
                            <span className="text-gray-200">Click me</span>
                        </div>

                        <div className="pl-4">
                            <span className="text-orange-400">&lt;input</span>{" "}
                            <span className="text-emerald-400">type</span>
                            <span className="text-white">=</span>
                            <span className="text-amber-300">"text"</span>{" "}
                            <span className="text-emerald-400">id</span>
                            <span className="text-white">=</span>
                            <span className="text-amber-300">"user"</span>{" "}
                            <span className="text-emerald-400">name</span>
                            <span className="text-white">=</span>
                            <span className="text-amber-300">"name"</span>{" "}
                            <span className="text-orange-400">/&gt;</span>
                        </div>

                        <div>
                            <span className="text-orange-400">&lt;/label&gt;</span>
                        </div>

                        <br />

                        {/* For attribute label */}
                        <div className="text-gray-500">
                            &lt;!-- 'for' attribute --&gt;
                        </div>

                        <div>
                            <span className="text-orange-400">&lt;label</span>{" "}
                            <span className="text-emerald-400">for</span>
                            <span className="text-white">=</span>
                            <span className="text-amber-300">"user"</span>
                            <span className="text-orange-400">&gt;</span>
                            <span className="text-gray-200">Click me</span>
                            <span className="text-orange-400">&lt;/label&gt;</span>
                        </div>

                        <div>
                            <span className="text-orange-400">&lt;input</span>{" "}
                            <span className="text-emerald-400">id</span>
                            <span className="text-white">=</span>
                            <span className="text-amber-300">"user"</span>{" "}
                            <span className="text-emerald-400">type</span>
                            <span className="text-white">=</span>
                            <span className="text-amber-300">"text"</span>{" "}
                            <span className="text-emerald-400">name</span>
                            <span className="text-white">=</span>
                            <span className="text-amber-300">"name"</span>{" "}
                            <span className="text-orange-400">/&gt;</span>
                        </div>

                    </div>
                    <div className="bg-stone-900 p-5 rounded-3xl font-mono mt-5">

                        <div>
                            <span className="text-orange-400">&lt;input</span>{" "}
                            <span className="text-emerald-400">type</span>
                            <span className="text-white">=</span>
                            <span className="text-amber-300">"radio"</span>{" "}
                            <span className="text-emerald-400">name</span>
                            <span className="text-white">=</span>
                            <span className="text-amber-300">"gender"</span>{" "}
                            <span className="text-emerald-400">id</span>
                            <span className="text-white">=</span>
                            <span className="text-amber-300">"m"</span>{" "}
                            <span className="text-orange-400">/&gt;</span>
                        </div>

                        <div>
                            <span className="text-orange-400">&lt;label</span>{" "}
                            <span className="text-emerald-400">for</span>
                            <span className="text-white">=</span>
                            <span className="text-amber-300">"m"</span>
                            <span className="text-orange-400">&gt;</span>
                            <span className="text-gray-200">Male</span>
                            <span className="text-orange-400">&lt;/label&gt;</span>
                        </div>

                        <br />

                        <div>
                            <span className="text-orange-400">&lt;input</span>{" "}
                            <span className="text-emerald-400">type</span>
                            <span className="text-white">=</span>
                            <span className="text-amber-300">"radio"</span>{" "}
                            <span className="text-emerald-400">name</span>
                            <span className="text-white">=</span>
                            <span className="text-amber-300">"gender"</span>{" "}
                            <span className="text-emerald-400">id</span>
                            <span className="text-white">=</span>
                            <span className="text-amber-300">"f"</span>{" "}
                            <span className="text-orange-400">/&gt;</span>
                        </div>

                        <div>
                            <span className="text-orange-400">&lt;label</span>{" "}
                            <span className="text-emerald-400">for</span>
                            <span className="text-white">=</span>
                            <span className="text-amber-300">"f"</span>
                            <span className="text-orange-400">&gt;</span>
                            <span className="text-gray-200">Female</span>
                            <span className="text-orange-400">&lt;/label&gt;</span>
                        </div>

                    </div>
                </div>
                <div className=" bg-black p-5 rounded-3xl w-1/3 flex flex-col justify-between gap-5 text-white">
                    <div className="bg-stone-900 p-5 rounded-3xl font-mono mt-5">
                        <div>
                            <span className="text-orange-400">&lt;label</span>{" "}
                            <span className="text-emerald-400">for</span>
                            <span className="text-white">=</span>
                            <span className="text-amber-300">"Name"</span>
                            <span className="text-orange-400">&gt;</span>
                            <span className="text-gray-200">Name:</span>
                            <span className="text-orange-400">&lt;/label&gt;</span>{" "}
                            <span className="text-orange-400">&lt;input</span>{" "}
                            <span className="text-emerald-400">type</span>
                            <span className="text-white">=</span>
                            <span className="text-amber-300">"text"</span>{" "}
                            <span className="text-emerald-400">name</span>
                            <span className="text-white">=</span>
                            <span className="text-amber-300">"Name"</span>{" "}
                            <span className="text-emerald-400">id</span>
                            <span className="text-white">=</span>
                            <span className="text-amber-300">""</span>{" "}
                            <span className="text-orange-400">/&gt;</span>
                        </div>
                    </div>
                    <div className="bg-stone-900 p-5 rounded-3xl font-mono mt-5">

                        <div>
                            <span className="text-orange-400">&lt;textarea</span>{" "}
                            <span className="text-emerald-400">rows</span>
                            <span className="text-white">=</span>
                            <span className="text-amber-300">"2"</span>{" "}
                            <span className="text-emerald-400">cols</span>
                            <span className="text-white">=</span>
                            <span className="text-amber-300">"30"</span>{" "}
                            <span className="text-emerald-400">name</span>
                            <span className="text-white">=</span>
                            <span className="text-amber-300">"address"</span>{" "}
                            <span className="text-emerald-400">id</span>
                            <span className="text-white">=</span>
                            <span className="text-amber-300">"address"</span>
                            <span className="text-orange-400">&gt;</span>
                        </div>

                        {/* textarea content (empty) */}
                        <div className="pl-4 text-gray-500"></div>

                        <div>
                            <span className="text-orange-400">&lt;/textarea&gt;</span>
                        </div>

                    </div>
                    <div className="bg-stone-900 p-5 rounded-3xl font-mono mt-5">

                        <div>
                            <span className="text-orange-400">&lt;input</span>{" "}
                            <span className="text-emerald-400">type</span>
                            <span className="text-white">=</span>
                            <span className="text-amber-300">"checkbox"</span>{" "}
                            <span className="text-emerald-400">name</span>
                            <span className="text-white">=</span>
                            <span className="text-amber-300">"s"</span>{" "}
                            <span className="text-emerald-400">id</span>
                            <span className="text-white">=</span>
                            <span className="text-amber-300">"soc"</span>{" "}
                            <span className="text-orange-400">/&gt;</span>
                        </div>

                        <div>
                            <span className="text-orange-400">&lt;label</span>{" "}
                            <span className="text-emerald-400">for</span>
                            <span className="text-white">=</span>
                            <span className="text-amber-300">"soc"</span>
                            <span className="text-orange-400">&gt;</span>
                            <span className="text-gray-200">Soccer</span>
                            <span className="text-orange-400">&lt;/label&gt;</span>
                        </div>

                        <br />

                        <div>
                            <span className="text-orange-400">&lt;input</span>{" "}
                            <span className="text-emerald-400">type</span>
                            <span className="text-white">=</span>
                            <span className="text-amber-300">"checkbox"</span>{" "}
                            <span className="text-emerald-400">name</span>
                            <span className="text-white">=</span>
                            <span className="text-amber-300">"s"</span>{" "}
                            <span className="text-emerald-400">id</span>
                            <span className="text-white">=</span>
                            <span className="text-amber-300">"bas"</span>{" "}
                            <span className="text-orange-400">/&gt;</span>
                        </div>

                        <div>
                            <span className="text-orange-400">&lt;label</span>{" "}
                            <span className="text-emerald-400">for</span>
                            <span className="text-white">=</span>
                            <span className="text-amber-300">"bas"</span>
                            <span className="text-orange-400">&gt;</span>
                            <span className="text-gray-200">Baseball</span>
                            <span className="text-orange-400">&lt;/label&gt;</span>
                        </div>

                    </div>
                </div>
            </div>
            <div className="w-full flex gap-5 p-5 font-circular-web text-lg  " >
                <div className=" bg-black p-10  rounded-3xl w-1/3 text-white">
                    <div className="bg-stone-900 p-5 rounded-3xl font-mono ">
                        {/* label */}
                        <div>
                            <span className="text-orange-400">&lt;label</span>{" "}
                            <span className="text-emerald-400">for</span>
                            <span className="text-white">=</span>
                            <span className="text-amber-300">"city"</span>
                            <span className="text-orange-400">&gt;</span>
                            <span className="text-gray-200">City:</span>
                            <span className="text-orange-400">&lt;/label&gt;</span>
                        </div>

                        {/* select */}
                        <div>
                            <span className="text-orange-400">&lt;select</span>{" "}
                            <span className="text-emerald-400">name</span>
                            <span className="text-white">=</span>
                            <span className="text-amber-300">"city"</span>{" "}
                            <span className="text-emerald-400">id</span>
                            <span className="text-white">=</span>
                            <span className="text-amber-300">"city"</span>
                            <span className="text-orange-400">&gt;</span>
                        </div>

                        {/* options */}
                        <div className="pl-4">
                            <span className="text-orange-400">&lt;option</span>{" "}
                            <span className="text-emerald-400">value</span>
                            <span className="text-white">=</span>
                            <span className="text-amber-300">"1"</span>
                            <span className="text-orange-400">&gt;</span>
                            <span className="text-gray-200">Sydney</span>
                            <span className="text-orange-400">&lt;/option&gt;</span>
                        </div>

                        <div className="pl-4">
                            <span className="text-orange-400">&lt;option</span>{" "}
                            <span className="text-emerald-400">value</span>
                            <span className="text-white">=</span>
                            <span className="text-amber-300">"2"</span>
                            <span className="text-orange-400">&gt;</span>
                            <span className="text-gray-200">Melbourne</span>
                            <span className="text-orange-400">&lt;/option&gt;</span>
                        </div>

                        <div className="pl-4">
                            <span className="text-orange-400">&lt;option</span>{" "}
                            <span className="text-emerald-400">value</span>
                            <span className="text-white">=</span>
                            <span className="text-amber-300">"3"</span>
                            <span className="text-orange-400">&gt;</span>
                            <span className="text-gray-200">Cromwell</span>
                            <span className="text-orange-400">&lt;/option&gt;</span>
                        </div>

                        <div>
                            <span className="text-orange-400">&lt;/select&gt;</span>
                        </div>
                    </div>
                </div>
                <div className=" bg-black p-5 rounded-3xl w-1/3 flex flex-col justify-between gap-5 text-white">
                    <div className="bg-stone-900 p-5 rounded-3xl font-mono mt-5">
                        <div>
                            <span className="text-orange-400">&lt;fieldset&gt;</span>
                        </div>

                        <div className="pl-4">
                            <span className="text-orange-400">&lt;legend&gt;</span>
                            <span className="text-gray-200">Your favorite monster</span>
                            <span className="text-orange-400">&lt;/legend&gt;</span>
                        </div>

                        <div className="pl-4">
                            <span className="text-orange-400">&lt;input</span>{" "}
                            <span className="text-emerald-400">type</span>
                            <span className="text-white">=</span>
                            <span className="text-amber-300">"radio"</span>{" "}
                            <span className="text-emerald-400">id</span>
                            <span className="text-white">=</span>
                            <span className="text-amber-300">"kra"</span>{" "}
                            <span className="text-emerald-400">name</span>
                            <span className="text-white">=</span>
                            <span className="text-amber-300">"m"</span>{" "}
                            <span className="text-orange-400">/&gt;</span>
                        </div>

                        <div className="pl-4">
                            <span className="text-orange-400">&lt;label</span>{" "}
                            <span className="text-emerald-400">for</span>
                            <span className="text-white">=</span>
                            <span className="text-amber-300">"kra"</span>
                            <span className="text-orange-400">&gt;</span>
                            <span className="text-gray-200">Kraken</span>
                            <span className="text-orange-400">&lt;/label&gt;</span>
                            <span className="text-orange-400 ml-2">&lt;br /&gt;</span>
                        </div>

                        <div className="pl-4">
                            <span className="text-orange-400">&lt;input</span>{" "}
                            <span className="text-emerald-400">type</span>
                            <span className="text-white">=</span>
                            <span className="text-amber-300">"radio"</span>{" "}
                            <span className="text-emerald-400">id</span>
                            <span className="text-white">=</span>
                            <span className="text-amber-300">"sas"</span>{" "}
                            <span className="text-emerald-400">name</span>
                            <span className="text-white">=</span>
                            <span className="text-amber-300">"m"</span>{" "}
                            <span className="text-orange-400">/&gt;</span>
                        </div>

                        <div className="pl-4">
                            <span className="text-orange-400">&lt;label</span>{" "}
                            <span className="text-emerald-400">for</span>
                            <span className="text-white">=</span>
                            <span className="text-amber-300">"sas"</span>
                            <span className="text-orange-400">&gt;</span>
                            <span className="text-gray-200">Sasquatch</span>
                            <span className="text-orange-400">&lt;/label&gt;</span>
                        </div>

                        <div>
                            <span className="text-orange-400">&lt;/fieldset&gt;</span>
                        </div>
                    </div>
                    <div className="bg-stone-900 p-5 rounded-3xl font-mono mt-5">

                        {/* label */}
                        <div>
                            <span className="text-orange-400">&lt;label</span>{" "}
                            <span className="text-emerald-400">for</span>
                            <span className="text-white">=</span>
                            <span className="text-amber-300">"b"</span>
                            <span className="text-orange-400">&gt;</span>
                            <span className="text-gray-200">Choose a browser: </span>
                            <span className="text-orange-400">&lt;/label&gt;</span>
                        </div>

                        {/* input */}
                        <div>
                            <span className="text-orange-400">&lt;input</span>{" "}
                            <span className="text-emerald-400">list</span>
                            <span className="text-white">=</span>
                            <span className="text-amber-300">"list"</span>{" "}
                            <span className="text-emerald-400">id</span>
                            <span className="text-white">=</span>
                            <span className="text-amber-300">"b"</span>{" "}
                            <span className="text-emerald-400">name</span>
                            <span className="text-white">=</span>
                            <span className="text-amber-300">"browser"</span>{" "}
                            <span className="text-orange-400">/&gt;</span>
                        </div>

                        {/* datalist */}
                        <div>
                            <span className="text-orange-400">&lt;datalist</span>{" "}
                            <span className="text-emerald-400">id</span>
                            <span className="text-white">=</span>
                            <span className="text-amber-300">"list"</span>
                            <span className="text-orange-400">&gt;</span>
                        </div>

                        <div className="pl-4">
                            <span className="text-orange-400">&lt;option</span>{" "}
                            <span className="text-emerald-400">value</span>
                            <span className="text-white">=</span>
                            <span className="text-amber-300">"Chrome"</span>
                            <span className="text-orange-400">&gt;&lt;/option&gt;</span>
                        </div>

                        <div className="pl-4">
                            <span className="text-orange-400">&lt;option</span>{" "}
                            <span className="text-emerald-400">value</span>
                            <span className="text-white">=</span>
                            <span className="text-amber-300">"Firefox"</span>
                            <span className="text-orange-400">&gt;&lt;/option&gt;</span>
                        </div>

                        <div className="pl-4">
                            <span className="text-orange-400">&lt;option</span>{" "}
                            <span className="text-emerald-400">value</span>
                            <span className="text-white">=</span>
                            <span className="text-amber-300">"Internet Explorer"</span>
                            <span className="text-orange-400">&gt;&lt;/option&gt;</span>
                        </div>

                        <div className="pl-4">
                            <span className="text-orange-400">&lt;option</span>{" "}
                            <span className="text-emerald-400">value</span>
                            <span className="text-white">=</span>
                            <span className="text-amber-300">"Opera"</span>
                            <span className="text-orange-400">&gt;&lt;/option&gt;</span>
                        </div>

                        <div className="pl-4">
                            <span className="text-orange-400">&lt;option</span>{" "}
                            <span className="text-emerald-400">value</span>
                            <span className="text-white">=</span>
                            <span className="text-amber-300">"Safari"</span>
                            <span className="text-orange-400">&gt;&lt;/option&gt;</span>
                        </div>

                        <div className="pl-4">
                            <span className="text-orange-400">&lt;option</span>{" "}
                            <span className="text-emerald-400">value</span>
                            <span className="text-white">=</span>
                            <span className="text-amber-300">"Microsoft Edge"</span>
                            <span className="text-orange-400">&gt;&lt;/option&gt;</span>
                        </div>

                        <div>
                            <span className="text-orange-400">&lt;/datalist&gt;</span>
                        </div>

                    </div>
                </div>
                <div className=" bg-black p-5 rounded-3xl w-1/3 flex flex-col justify-between gap-5 text-white">
                    <div className="bg-stone-900 p-5 rounded-3xl font-mono mt-5">
                        {/* opening form */}
                        <div>
                            <span className="text-orange-400">&lt;form</span>{" "}
                            <span className="text-emerald-400">action</span>
                            <span className="text-white">=</span>
                            <span className="text-amber-300">"register.php"</span>{" "}
                            <span className="text-emerald-400">method</span>
                            <span className="text-white">=</span>
                            <span className="text-amber-300">"post"</span>
                            <span className="text-orange-400">&gt;</span>
                        </div>

                        {/* name field */}
                        <div className="pl-4">
                            <span className="text-orange-400">&lt;label</span>{" "}
                            <span className="text-emerald-400">for</span>
                            <span className="text-white">=</span>
                            <span className="text-amber-300">"foo"</span>
                            <span className="text-orange-400">&gt;</span>
                            <span className="text-gray-200">Name:</span>
                            <span className="text-orange-400">&lt;/label&gt;</span>
                        </div>

                        <div className="pl-4">
                            <span className="text-orange-400">&lt;input</span>{" "}
                            <span className="text-emerald-400">type</span>
                            <span className="text-white">=</span>
                            <span className="text-amber-300">"text"</span>{" "}
                            <span className="text-emerald-400">name</span>
                            <span className="text-white">=</span>
                            <span className="text-amber-300">"name"</span>{" "}
                            <span className="text-emerald-400">id</span>
                            <span className="text-white">=</span>
                            <span className="text-amber-300">"foo"</span>{" "}
                            <span className="text-orange-400">/&gt;</span>
                        </div>

                        {/* submit */}
                        <div className="pl-4">
                            <span className="text-orange-400">&lt;input</span>{" "}
                            <span className="text-emerald-400">type</span>
                            <span className="text-white">=</span>
                            <span className="text-amber-300">"submit"</span>{" "}
                            <span className="text-emerald-400">value</span>
                            <span className="text-white">=</span>
                            <span className="text-amber-300">"Submit"</span>{" "}
                            <span className="text-orange-400">/&gt;</span>
                        </div>

                        {/* reset */}
                        <div className="pl-4">
                            <span className="text-orange-400">&lt;input</span>{" "}
                            <span className="text-emerald-400">type</span>
                            <span className="text-white">=</span>
                            <span className="text-amber-300">"reset"</span>{" "}
                            <span className="text-emerald-400">value</span>
                            <span className="text-white">=</span>
                            <span className="text-amber-300">"Reset"</span>{" "}
                            <span className="text-orange-400">/&gt;</span>
                        </div>

                        {/* closing form */}
                        <div>
                            <span className="text-orange-400">&lt;/form&gt;</span>
                        </div>

                    </div>
                    <div className="bg-stone-900 p-5 rounded-3xl font-mono mt-5">

                        <ul className="flex justify-around mb-2 mt-2">
                            <li className="w-1/2 text-orange-400">name</li>
                            <li className="w-1/2">	Name of form for scripting</li>
                        </ul>

                        <hr className="border-t-2 border-gray-500" />
                        <ul className="flex justify-around mb-2 mt-2">
                            <li className="w-1/2 text-orange-400">action</li>
                            <li className="w-1/2">URL of form script</li>
                        </ul>

                        <hr className="border-t-2 border-gray-500" />
                        <ul className="flex justify-around mb-2 mt-2">
                            <li className="w-1/2 text-orange-400">method</li>
                            <li className="w-1/2">HTTP method, POST / GET (default)</li>
                        </ul>

                        <hr className="border-t-2 border-gray-500" />
                        <ul className="flex justify-around mb-2 mt-2">
                            <li className="w-1/2 text-orange-400">enctype</li>
                            <li className="w-1/2">Media type, See enctype</li>
                        </ul>

                        <hr className="border-t-2 border-gray-500" />
                        <ul className="flex justify-around mb-2 mt-2">
                            <li className="w-1/2 text-orange-400">onsubmit</li>
                            <li className="w-1/2">Runs when the form was submit</li>
                        </ul>

                        <hr className="border-t-2 border-gray-500" />
                        <ul className="flex justify-around mb-2 mt-2">
                            <li className="w-1/2 text-orange-400">onreset</li>
                            <li className="w-1/2">Runs when the form was reset</li>
                        </ul>

                        <hr className="border-t-2 border-gray-500" />

                    </div>

                </div>
            </div>

            <div className="w-full flex justify-center items-center font-head font-extrabold text-[3rem] mt-5 mb-5 leading-none">
                HTML INPUT ATTRIBUTES
            </div>
            <div className="w-full flex gap-5 p-5 font-circular-web text-lg  " >


                <div className=" bg-black p-5 rounded-3xl w-1/2 flex flex-col justify-between gap-5 text-white">
                    <div className="bg-stone-900 p-5 rounded-3xl font-mono ">
                        <div>
                            <span className="text-orange-400">&lt;input</span>{" "}
                            <span className="text-emerald-400">type</span>
                            <span className="text-white">=</span>
                            <span className="text-amber-300">"text"</span>{" "}
                            <span className="text-emerald-400">name</span>
                            <span className="text-white">=</span>
                            <span className="text-amber-300">"?"</span>{" "}
                            <span className="text-emerald-400">value</span>
                            <span className="text-white">=</span>
                            <span className="text-amber-300">"?"</span>{" "}
                            <span className="text-emerald-400">minlength</span>
                            <span className="text-white">=</span>
                            <span className="text-amber-300">"6"</span>{" "}
                            <span className="text-emerald-400">required</span>
                            <span className="text-orange-400">/&gt;</span>
                        </div>

                    </div>

                    <div className="bg-stone-900 p-5 rounded-3xl font-mono mt-5">
                        <ul className="flex justify-around mb-2 mt-2">
                            <li className="w-1/2">1. type="…"</li>
                            <li className="w-1/2">The type of data that is being input</li>
                        </ul>
                        <hr className="border-t-2 border-gray-500" />
                        <ul className="flex justify-around mb-2 mt-2">
                            <li className="w-1/2">2. value="…"</li>
                            <li className="w-1/2">Default value</li>
                        </ul>
                        <hr className="border-t-2 border-gray-500" />
                        <ul className="flex justify-around mb-2 mt-2">
                            <li className="w-1/2">3. name="…"</li>
                            <li className="w-1/2">Used to describe this data in the HTTP request</li>
                        </ul>
                        <hr className="border-t-2 border-gray-500" />
                        <ul className="flex justify-around mb-2 mt-2">
                            <li className="w-1/2">4. id="…"</li>
                            <li className="w-1/2">Unique identifier that other HTML elements</li>
                        </ul>
                        <hr className="border-t-2 border-gray-500" />
                        <ul className="flex justify-around mb-2 mt-2">
                            <li className="w-1/2">5. readonly</li>
                            <li className="w-1/2">Stops the user from modifying</li>
                        </ul>
                        <hr className="border-t-2 border-gray-500" />
                        <ul className="flex justify-around mb-2 mt-2">
                            <li className="w-1/2">6. disabled</li>
                            <li className="w-1/2">Stops any interaction</li>
                        </ul>
                        <hr className="border-t-2 border-gray-500" />
                        <ul className="flex justify-around mb-2 mt-2">
                            <li className="w-1/2">7. checked</li>
                            <li className="w-1/2">The radio or checkbox select or not</li>
                        </ul>
                        <hr className="border-t-2 border-gray-500" />
                        <ul className="flex justify-around mb-2 mt-2">
                            <li className="w-1/2">8. required</li>
                            <li className="w-1/2">	Being compulsory, See required</li>
                        </ul>
                        <hr className="border-t-2 border-gray-500" />
                        <ul className="flex justify-around mb-2 mt-2">
                            <li className="w-1/2">9. placeholder="…"</li>
                            <li className="w-1/2">Adds a temporary, See ::placeholder</li>
                        </ul>
                        <hr className="border-t-2 border-gray-500" />
                        <ul className="flex justify-around mb-2 mt-2">
                            <li className="w-1/2">10. autocomplete="off"</li>
                            <li className="w-1/2">Disable auto completion</li>
                        </ul>
                        <hr className="border-t-2 border-gray-500" />
                        <ul className="flex justify-around mb-2 mt-2">
                            <li className="w-1/2">11. autocapitalize="none"</li>
                            <li className="w-1/2">Disable auto capitalization</li>
                        </ul>
                        <hr className="border-t-2 border-gray-500" />
                        <ul className="flex justify-around mb-2 mt-2">
                            <li className="w-1/2">12. inputmode="…"</li>
                            <li className="w-1/2">Display a specific keyboard, See inputmode</li>
                        </ul>
                        <hr className="border-t-2 border-gray-500" />
                        <ul className="flex justify-around mb-2 mt-2">
                            <li className="w-1/2">13. list="…"</li>
                            <li className="w-1/2">The id of an associated datalist</li>
                        </ul>

                        <hr className="border-t-2 border-gray-500" />
                        <ul className="flex justify-around mb-2 mt-2">
                            <li className="w-1/2">14. maxlength="…"</li>
                            <li className="w-1/2">Maximum number of characters</li>
                        </ul>
                        <hr className="border-t-2 border-gray-500" />
                        <ul className="flex justify-around mb-2 mt-2">
                            <li className="w-1/2">14. minlength="…"</li>
                            <li className="w-1/2">Minimum number of characters</li>
                        </ul>
                        <hr className="border-t-2 border-gray-500" />
                        <ul className="flex justify-around mb-2 mt-2">
                            <li className="w-1/2">14. min="…"</li>
                            <li className="w-1/2">Minimum numerical value on range & number</li>
                        </ul>
                        <hr className="border-t-2 border-gray-500" />
                        <ul className="flex justify-around mb-2 mt-2">
                            <li className="w-1/2">14. max="…"</li>
                            <li className="w-1/2">Maximum numerical value on range & number</li>
                        </ul>
                        <hr className="border-t-2 border-gray-500" />
                        <ul className="flex justify-around mb-2 mt-2">
                            <li className="w-1/2">14. step="…"</li>
                            <li className="w-1/2">How the number will increment in range & number</li>
                        </ul>
                        <hr className="border-t-2 border-gray-500" />
                        <ul className="flex justify-around mb-2 mt-2">
                            <li className="w-1/2">14. pattern="…"</li>
                            <li className="w-1/2">Specifies a Regular expression, See pattern</li>
                        </ul>
                        <hr className="border-t-2 border-gray-500" />
                        <ul className="flex justify-around mb-2 mt-2">
                            <li className="w-1/2">14. autofocus</li>
                            <li className="w-1/2">Be focused</li>
                        </ul>
                        <hr className="border-t-2 border-gray-500" />
                        <ul className="flex justify-around mb-2 mt-2">
                            <li className="w-1/2">14. spellcheck</li>
                            <li className="w-1/2">Perform spell checking</li>
                        </ul>
                        <hr className="border-t-2 border-gray-500" />
                        <ul className="flex justify-around mb-2 mt-2">
                            <li className="w-1/2">14. multiple</li>
                            <li className="w-1/2">Whether to allow multiple values</li>
                        </ul>
                        <hr className="border-t-2 border-gray-500" />
                        <ul className="flex justify-around mb-2 mt-2">
                            <li className="w-1/2">14. accept=""</li>
                            <li className="w-1/2">	Expected file type in file upload controls</li>
                        </ul>
                        <hr className="border-t-2 border-gray-500" />

                    </div>
                </div>

                <div className=" bg-black p-10  rounded-3xl w-1/2 text-white">

                    <div className="bg-stone-900 p-5 rounded-3xl font-mono mt-5">








                        <ul className="flex justify-around mb-2 mt-2">
                            <li className="w-1/2">1. type="checkbox"</li>
                            <li className="w-1/2">The type of data that is being input</li>
                        </ul>
                        <hr className="border-t-2 border-gray-500" />
                        <ul className="flex justify-around mb-2 mt-2">
                            <li className="w-1/2">2. type="radio"	</li>
                            <li className="w-1/2">Default value</li>
                        </ul>
                        <hr className="border-t-2 border-gray-500" />
                        <ul className="flex justify-around mb-2 mt-2">
                            <li className="w-1/2">3. type="file"	No file chosen</li>
                            <li className="w-1/2">Used to describe this data in the HTTP request</li>
                        </ul>
                        <hr className="border-t-2 border-gray-500" />
                        <ul className="flex justify-around mb-2 mt-2">
                            <li className="w-1/2">4. type="hidden"	</li>
                            <li className="w-1/2">Unique identifier that other HTML elements</li>
                        </ul>
                        <hr className="border-t-2 border-gray-500" />
                        <ul className="flex justify-around mb-2 mt-2">
                            <li className="w-1/2">5.  type="text"</li>
                            <li className="w-1/2">Stops the user from modifying</li>
                        </ul>
                        <hr className="border-t-2 border-gray-500" />
                        <ul className="flex justify-around mb-2 mt-2">
                            <li className="w-1/2">6.    type="password"</li>
                            <li className="w-1/2">Stops any interaction</li>
                        </ul>
                        <hr className="border-t-2 border-gray-500" />
                        <ul className="flex justify-around mb-2 mt-2">
                            <li className="w-1/2">7.   type="image"	Submit</li>
                            <li className="w-1/2">The radio or checkbox select or not</li>
                        </ul>
                        <hr className="border-t-2 border-gray-500" />
                        <ul className="flex justify-around mb-2 mt-2">
                            <li className="w-1/2">8.   type="reset"</li>
                            <li className="w-1/2">	Being compulsory, See required</li>
                        </ul>
                        <hr className="border-t-2 border-gray-500" />
                        <ul className="flex justify-around mb-2 mt-2">
                            <li className="w-1/2">9.  type="button"</li>
                            <li className="w-1/2">Adds a temporary, See ::placeholder</li>
                        </ul>
                        <hr className="border-t-2 border-gray-500" />
                        <ul className="flex justify-around mb-2 mt-2">
                            <li className="w-1/2">10.  type="submit"</li>
                            <li className="w-1/2">Disable auto completion</li>
                        </ul>












                        <hr className="border-t-2 border-gray-500" />
                        <ul className="flex justify-around mb-2 mt-2">
                            <li className="w-1/2">11.type="color"</li>
                            <li className="w-1/2">Disable auto capitalization</li>
                        </ul>
                        <hr className="border-t-2 border-gray-500" />
                        <ul className="flex justify-around mb-2 mt-2">
                            <li className="w-1/2">12. type="date"	</li>
                            <li className="w-1/2">Display a specific keyboard, See inputmode</li>
                        </ul>
                        <hr className="border-t-2 border-gray-500" />
                        <ul className="flex justify-around mb-2 mt-2">
                            <li className="w-1/2">13. type="time"</li>
                            <li className="w-1/2">The id of an associated datalist</li>
                        </ul>

                        <hr className="border-t-2 border-gray-500" />
                        <ul className="flex justify-around mb-2 mt-2">
                            <li className="w-1/2">14.       type="month"	</li>
                            <li className="w-1/2">Maximum number of characters</li>
                        </ul>
                        <hr className="border-t-2 border-gray-500" />
                        <ul className="flex justify-around mb-2 mt-2">
                            <li className="w-1/2">14.  type="datetime-local"</li>
                            <li className="w-1/2">Minimum number of characters</li>
                        </ul>
                        <hr className="border-t-2 border-gray-500" />
                        <ul className="flex justify-around mb-2 mt-2">
                            <li className="w-1/2">14.  type="week"</li>
                            <li className="w-1/2">Minimum numerical value on range & number</li>
                        </ul>
                        <hr className="border-t-2 border-gray-500" />
                        <ul className="flex justify-around mb-2 mt-2">
                            <li className="w-1/2">14.       type="email"</li>
                            <li className="w-1/2">Maximum numerical value on range & number</li>
                        </ul>
                        <hr className="border-t-2 border-gray-500" />
                        <ul className="flex justify-around mb-2 mt-2">
                            <li className="w-1/2">14. type="tel"</li>
                            <li className="w-1/2">How the number will increment in range & number</li>
                        </ul>
                        <hr className="border-t-2 border-gray-500" />
                        <ul className="flex justify-around mb-2 mt-2">
                            <li className="w-1/2">14.type="url"</li>
                            <li className="w-1/2">Specifies a Regular expression, See pattern</li>
                        </ul>
                        <hr className="border-t-2 border-gray-500" />
                        <ul className="flex justify-around mb-2 mt-2">
                            <li className="w-1/2">14.     type="number"</li>
                            <li className="w-1/2">Be focused</li>
                        </ul>
                        <hr className="border-t-2 border-gray-500" />
                        <ul className="flex justify-around mb-2 mt-2">
                            <li className="w-1/2">14.  type="search"</li>
                            <li className="w-1/2">Perform spell checking</li>
                        </ul>
                        <hr className="border-t-2 border-gray-500" />
                        <ul className="flex justify-around mb-2 mt-2">
                            <li className="w-1/2">14.    type="range"</li>
                            <li className="w-1/2">Whether to allow multiple values</li>
                        </ul>


                    </div>

                </div>
            </div>


        </div >
    );
};

export default Htmlw;
