import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"

const Preloader = () => {
    useGSAP(() => {


        gsap.to(".preStair", {
            height: 0,
            duration: 1,
            stagger: 0.1,
            ease: "power4.in",
            delay: 3
        })

    })

    return (
        <div className="fixed inset-0 z-50 flex h-screen w-screen">
            <div className="preStair w-1/6 bg-black"></div>
            <div className="preStair w-1/6 bg-black"></div>
            <div className="preStair w-1/6 bg-black"></div>
            <div className="preStair w-1/6 bg-black"></div>
            <div className="preStair w-1/6 bg-black"></div>
            <div className="preStair w-1/6 bg-black"></div>
        </div>
    )
}

export default Preloader
