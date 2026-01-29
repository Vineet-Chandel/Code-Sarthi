import React from 'react'

const Htmlw = () => {
    return (

        <div className='h-auto w-screen text-black bg-gradient-to-r from-green-300 via-emerald-300 to-teal-300'>
            <div className="bg-gradient-to-br from-[#d9d7f3] via-[#b9e3f6] to-[#6ec6e8] p-10 border border-l-black border-r-black border-b-black rounded-b-[50px]">
                <div className="w-full flex flex-col justify-center items-center font-head font-extrabold text-[5rem] leading-none">
                    DEVELOPERS TOOLKIT
                </div>
                <p className="text-xl font-circular-web w-full flex flex-col justify-center items-center">
                    Welcome to the smart sheets designed to help you code faster, smarter, and boost your productivity..
                </p>
            </div>

            <div>
                <div className="grid grid-cols-5 grid-rows-5 gap-4">
                    <div className="col-span-3 row-span-3  bg-neutral rounded-3xl text-white p-10 m-10  flex flex-col">
                        <pre>
                            <code>
                                <div className='text-blue-800'> &lt;!DOCTYPE html&gt;</div>
                                <div className='inline-flex'>&lt;<p className='text-orange-500'>html </p> <p className='text-blue-800'>lang</p>="<p className='text-green-500'>en</p>"&gt;</div>
                            </code>
                        </pre>




                        {/* <head>
                                <meta charset="UTF-8" />
                                <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                                <title>HTML5 Boilerplate</title>
                            </head>
                            <body>
                                <h1>Hello world, hello CheatSheets.zip!</h1>
                            </body>
                        </html> */}



                    </div>
                    <div className="col-span-2 row-span-3 col-start-4 bg-neutral rounded-3xl">3</div>
                </div>
            </div>
        </div>

    )
}

export default Htmlw