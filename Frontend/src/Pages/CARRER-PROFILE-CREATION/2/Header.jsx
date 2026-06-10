import React from 'react'



const Header = ({ index }) => {
    const Data = [

        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 20 20">
                    <path fill="#fff" d="M6 2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zM5 4a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1zm2 0a1 1 0 0 0 0 2h6a1 1 0 1 0 0-2z"></path>
                </svg>
            ),
            mainLine1: "Let’s begin with your",
            mainLine2: "HEADER",
            subLine:
                "Make a powerful first impression with clear contact details, a professional title, and an identity recruiters instantly recognize."
        },

        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24">
                    <path fill="currentColor" fillRule="evenodd" d="M12 16a7 7 0 1 0 0-14a7 7 0 0 0 0 14m0-10c-.284 0-.474.34-.854 1.023l-.098.176c-.108.194-.162.29-.246.354c-.085.064-.19.088-.4.135l-.19.044c-.738.167-1.107.25-1.195.532s.164.577.667 1.165l.13.152c.143.167.215.25.247.354s.021.215 0 .438l-.02.203c-.076.785-.114 1.178.115 1.352c.23.174.576.015 1.267-.303l.178-.082c.197-.09.295-.135.399-.135s.202.045.399.135l.178.082c.691.319 1.037.477 1.267.303s.191-.567.115-1.352l-.02-.203c-.021-.223-.032-.334 0-.438s.104-.187.247-.354l.13-.152c.503-.588.755-.882.667-1.165c-.088-.282-.457-.365-1.195-.532l-.19-.044c-.21-.047-.315-.07-.4-.135c-.084-.064-.138-.16-.246-.354l-.098-.176C12.474 6.34 12.284 6 12 6" clipRule="evenodd"></path>
                    <path fill="currentColor" d="M6.714 17.323L7.351 15L8 13h8l.649 2l.637 2.323c.628 2.292.942 3.438.523 4.065c-.147.22-.344.396-.573.513c-.652.332-1.66-.193-3.675-1.243c-.67-.35-1.006-.524-1.362-.562a2 2 0 0 0-.398 0c-.356.038-.691.213-1.362.562c-2.015 1.05-3.023 1.575-3.675 1.243a1.5 1.5 0 0 1-.573-.513c-.42-.627-.105-1.773.523-4.065" opacity={0.5}></path>
                </svg>
            ),
            mainLine1: "Showcase your",
            mainLine2: "EXPERIENCE",
            subLine:
                "Highlight your achievements, responsibilities, and impact. Start with your most recent role and demonstrate your growth."
        },

        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24">
                    <path fill="currentColor" fillRule="evenodd" d="M6.271 2.112c-.81.106-1.238.301-1.544.6c-.305.3-.504.72-.613 1.513C4.002 5.042 4 6.124 4 7.675v8.57a4.2 4.2 0 0 1 1.299-.593c.528-.139 1.144-.139 2.047-.138H20V7.676c0-1.552-.002-2.634-.114-3.451c-.109-.793-.308-1.213-.613-1.513c-.306-.299-.734-.494-1.544-.6c-.834-.11-1.938-.112-3.522-.112H9.793c-1.584 0-2.688.002-3.522.112m.488 4.483c0-.448.37-.811.827-.811h8.828a.82.82 0 0 1 .827.81a.82.82 0 0 1-.827.811H7.586a.82.82 0 0 1-.827-.81m.827 2.973a.82.82 0 0 0-.827.81c0 .448.37.811.827.811h5.517a.82.82 0 0 0 .828-.81a.82.82 0 0 0-.828-.811z" clipRule="evenodd"></path>
                    <path fill="currentColor" d="M8.69 17.135H7.473c-1.079 0-1.456.007-1.746.083a2.46 2.46 0 0 0-1.697 1.538q.023.571.084 1.019c.109.793.308 1.213.613 1.513c.306.299.734.494 1.544.6c.834.11 1.938.112 3.522.112h4.414c1.584 0 2.688-.002 3.522-.111c.81-.107 1.238-.302 1.544-.601c.305-.3.504-.72.613-1.513c.092-.666.11-1.51.113-2.64h-6.896v3.007c0 .298 0 .447-.104.507c-.105.06-.248-.007-.534-.14l-1.371-.638c-.097-.045-.145-.067-.197-.067s-.101.022-.198.067l-1.37.638c-.287.133-.43.2-.535.14c-.104-.06-.104-.21-.104-.507z"></path>
                </svg>
            ),
            mainLine1: "Tell employers about your",
            mainLine2: "EDUCATION",
            subLine:
                "Add your academic journey, certifications, and training programs to reflect your dedication, knowledge, and future ambitions."
        },

        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24">
                    <path fill="currentColor" fillRule="evenodd" d="M1.25 21a.75.75 0 0 1 .75-.75h20a.75.75 0 0 1 0 1.5H2a.75.75 0 0 1-.75-.75" clipRule="evenodd"></path>
                    <path fill="currentColor" d="M7.5 17c-.935 0-1.402 0-1.75-.201a1.5 1.5 0 0 1-.549-.549C5 15.902 5 15.435 5 14.5v-9c0-.935 0-1.402.201-1.75a1.5 1.5 0 0 1 .549-.549C6.098 3 6.565 3 7.5 3s1.402 0 1.75.201a1.5 1.5 0 0 1 .549.549C10 4.098 10 4.565 10 5.5v9c0 .935 0 1.402-.201 1.75a1.5 1.5 0 0 1-.549.549C8.902 17 8.435 17 7.5 17m9 0c-.935 0-1.402 0-1.75-.201a1.5 1.5 0 0 1-.549-.549C14 15.902 14 15.435 14 14.5v-6c0-.935 0-1.402.201-1.75a1.5 1.5 0 0 1 .549-.549C15.098 6 15.565 6 16.5 6s1.402 0 1.75.201a1.5 1.5 0 0 1 .549.549C19 7.098 19 7.565 19 8.5v6c0 .935 0 1.402-.201 1.75a1.5 1.5 0 0 1-.549.549c-.348.201-.815.201-1.75.201"></path>
                </svg>
            ),
            mainLine1: "Highlight your strongest",
            mainLine2: "SKILLS",
            subLine:
                "Choose skills that match your target role and prove your expertise. The right skills can instantly grab a recruiter’s attention."
        },

        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24">
                    <path fill="currentColor" fillRule="evenodd" d="M2 12c0-3.771 0-5.657 1.172-6.828S6.229 4 10 4h4c3.771 0 5.657 0 6.828 1.172S22 8.229 22 12s0 5.657-1.172 6.828S17.771 20 14 20h-4c-3.771 0-5.657 0-6.828-1.172S2 15.771 2 12m4 3.25a.75.75 0 0 0 0 1.5h4a.75.75 0 0 0 0-1.5zM7.75 13a.75.75 0 0 0-.75-.75H6a.75.75 0 0 0 0 1.5h1a.75.75 0 0 0 .75-.75m3.75-.75a.75.75 0 0 1 0 1.5h-2a.75.75 0 0 1 0-1.5zm7.25.75a.75.75 0 0 0-.75-.75h-4a.75.75 0 0 0 0 1.5h4a.75.75 0 0 0 .75-.75m-6.25 2.25a.75.75 0 0 0 0 1.5H14a.75.75 0 0 0 0-1.5zm3.25.75a.75.75 0 0 1 .75-.75H18a.75.75 0 0 1 0 1.5h-1.5a.75.75 0 0 1-.75-.75" clipRule="evenodd"></path>
                </svg>
            ),
            mainLine1: "Create a compelling",
            mainLine2: "SUMMARY",
            subLine:
                "Craft a confident introduction that captures your strengths, career goals, and personality — then refine it with AI for maximum impact."
        },

        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24">
                    <path d="M0 0h24v24H0z" fill="none" />
                    <path fill="#fff" d="M19 4h-4.18a2.988 2.988 0 0 0-5.64 0H5a2.006 2.006 0 0 0-2 2v14a2.006 2.006 0 0 0 2 2h14a2.006 2.006 0 0 0 2-2V6a2.006 2.006 0 0 0-2-2m-7 0a1 1 0 1 1-1 1a1.003 1.003 0 0 1 1-1m-2 5l2.79 2.794l2.52-2.52L14 8h4v4l-1.276-1.311l-3.932 3.935L10 11.83l-2.586 2.584L6 13Zm9 10H5v-2h14Z" />
                </svg>

            ),

            mainLine1: "Showcase your",
            mainLine2: "PROJECTS",

            subLine:
                "Highlight the projects that demonstrate your skills, creativity, and problem-solving abilities — and enhance them with AI-powered suggestions for maximum impact."
        },

        {
            icon: (<svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24">
                <path fill="#fff" d="M22 5a1 1 0 0 1-1 1h-8a1 1 0 0 1 0-2h8a1 1 0 0 1 1 1m-3 4a1 1 0 0 1-1 1h-5a1 1 0 0 1 0-2h5a1 1 0 0 1 1 1m3 6a1 1 0 0 1-1 1h-8a1 1 0 0 1 0-2h8a1 1 0 0 1 1 1m-3 4a1 1 0 0 1-1 1h-5a1 1 0 0 1 0-2h5a1 1 0 0 1 1 1M8 3a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2l.001-4.051l.004-.051A1.996 1.996 0 0 1 4 3zm0 10a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2l.001-4.051l.004-.051A1.996 1.996 0 0 1 4 13z"></path>
            </svg>

            ),

            mainLine1: "Select (optional)",
            mainLine2: "details to add",

            subLine:
                "Pick anything you’d like to highlight that’s not already on your resume."
        }
    ];


    return (
        <div className="mb-7">
            <h1 className="text-3xl md:text-4xl font-light  tracking-tight text-white mb-2 leading-tight flex items-center gap-1">



                {Data[index].icon}


                <span className='text-info'>
                    {Data[index].mainLine1}  {" "}
                    <span className="text-4xl md:text-5xl text-secondary-content font-bold">{Data[index].mainLine2}</span>.
                </span>

            </h1>
            <p className="text-sm text-info leading-relaxed max-w-xl">
                {Data[index].subLine}
            </p>
        </div>
    )
}

export default Header