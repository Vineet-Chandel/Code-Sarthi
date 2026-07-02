import { useState, useEffect, useRef, useCallback, forwardRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Video, MessageSquare, Check, Lock, Zap } from "lucide-react";
import Nav from "./Nav";

/* ---------------------------------- */
/* Button                             */
/* ---------------------------------- */

function Button({ children, onClick, type = "button", variant = "dark", className = "", disabled = false }) {
    const base =
        "relative flex items-center justify-center font-bold rounded-[24px] overflow-hidden transition-colors duration-300 outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B00] focus-visible:ring-offset-2 focus-visible:ring-offset-black";

    const variants = {
        dark: "bg-[#1C1C1C] border border-[#2E2E2E] text-white hover:bg-[#242424]",
        accent: "bg-[#FF6B00] text-white hover:bg-[#ff7e1f]",
    };

    return (
        <button disabled={disabled}
            type={type} onClick={onClick} className={`${base} ${variants[variant]} ${className}`}>
            {children}
            {variant === "dark" && (
                <span
                    aria-hidden="true"
                    className="absolute bottom-0 right-0 w-[38px] h-[38px] bg-[#FF6B00] translate-x-1/2 translate-y-1/2 rotate-45"
                />
            )}
        </button>
    );
}

/* ---------------------------------- */
/* Form fields                        */
/* ---------------------------------- */

function Field({ label, error, children, htmlFor }) {
    return (
        <div className="flex flex-col gap-2 text-left">
            <label htmlFor={htmlFor} className="text-sm font-medium text-white/80">
                {label}
            </label>
            {children}
            {error && (
                <span className="text-xs text-red-500" role="alert">
                    {error}
                </span>
            )}
        </div>
    );
}

const fieldBase =
    "w-full bg-[#181818] text-white placeholder-white/30 rounded-xl px-4 py-3 text-sm outline-none border transition-colors duration-200 focus:border-[#FF6B00]";

const TextInput = forwardRef(function TextInput({ error, className = "", ...props }, ref) {
    return (
        <input
            ref={ref}
            {...props}
            className={`${fieldBase} ${error ? "border-red-500" : "border-[#2A2A2A]"} ${className}`}
        />
    );
});

function TextArea({ error, className = "", ...props }) {
    return (
        <textarea
            {...props}
            rows={4}
            className={`${fieldBase} resize-none ${error ? "border-red-500" : "border-[#2A2A2A]"} ${className}`}
        />
    );
}

function Select({ error, className = "", children, ...props }) {
    return (
        <select
            {...props}
            className={`${fieldBase} appearance-none cursor-pointer ${error ? "border-red-500" : "border-[#2A2A2A]"} ${className}`}
        >
            {children}
        </select>
    );
}

/* ---------------------------------- */
/* Floating decorative icons          */
/* ---------------------------------- */

const CARDS = [
    { id: "calendar", Icon: Calendar, bg: "bg-white", iconColor: "text-[#FF6B00]", position: "top-[15%] left-[6%] md:left-[7%]", rotate: -8, duration: 6 },
    { id: "video", Icon: Video, bg: "bg-[#1C1C1C]", iconColor: "text-white", position: "top-[46%] left-[10%] md:left-[12%]", rotate: -6, duration: 7 },
    { id: "chat", Icon: MessageSquare, bg: "bg-[#3B5BFF]", iconColor: "text-white", position: "bottom-[10%] left-[14%] md:left-[16%]", rotate: 6, duration: 5.5 },
    { id: "check", Icon: Check, bg: "bg-[#4CAF6D]", iconColor: "text-white", position: "top-[15%] right-[6%] md:right-[7%]", rotate: 8, duration: 6.5 },
    { id: "lock", Icon: Lock, bg: "bg-white", iconColor: "text-[#1C1C1C]", position: "top-[46%] right-[8%] md:right-[10%]", rotate: -6, duration: 8 },
    { id: "zap", Icon: Zap, bg: "bg-[#F2C230]", iconColor: "text-[#1C1C1C]", position: "bottom-[10%] right-[10%] md:right-[13%]", rotate: 6, duration: 5 },
];

function FloatingIcons() {
    return (
        <div aria-hidden="true" className="pointer-events-none">
            {CARDS.map(({ id, Icon, bg, iconColor, position, rotate, duration }) => (
                <motion.div
                    key={id}
                    className={`hidden sm:flex absolute ${position} w-[70px] h-[70px] rounded-xl ${bg} items-center justify-center shadow-[0_12px_30px_rgba(0,0,0,0.45)]`}
                    style={{ rotate }}
                    animate={{ y: [-10, 10, -10] }}
                    transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
                >
                    <Icon className={iconColor} size={28} strokeWidth={2} />
                </motion.div>
            ))}
        </div>
    );
}

/* ---------------------------------- */
/* Booking modal                      */
/* ---------------------------------- */

const emptyForm = { name: "", email: "", topic: "", date: "", time: "", mode: "Google Meet", description: "" };

function validate(values) {
    const errors = {};
    if (!values.name.trim()) errors.name = "Name is required";
    if (!values.email.trim()) errors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errors.email = "Enter a valid email";
    if (!values.topic.trim()) errors.topic = "Topic is required";
    if (!values.date) errors.date = "Preferred date is required";
    if (!values.time) errors.time = "Preferred time is required";
    if (!values.description.trim()) errors.description = "Please describe your problem";
    return errors;
}

function BookingModal({ open, onClose }) {
    const [values, setValues] = useState(emptyForm);
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const dialogRef = useRef(null);
    const firstFieldRef = useRef(null);

    const resetAndClose = useCallback(() => {
        onClose();
        setTimeout(() => {
            setValues(emptyForm);
            setErrors({});
            setSubmitted(false);
        }, 250);
    }, [onClose]);

    useEffect(() => {
        if (!open) return;
        const handleKey = (e) => e.key === "Escape" && resetAndClose();
        document.addEventListener("keydown", handleKey);
        return () => document.removeEventListener("keydown", handleKey);
    }, [open, resetAndClose]);

    useEffect(() => {
        if (!open) return;
        const previouslyFocused = document.activeElement;
        firstFieldRef.current?.focus();

        const handleTab = (e) => {
            if (e.key !== "Tab" || !dialogRef.current) return;
            const focusable = dialogRef.current.querySelectorAll(
                'input, select, textarea, button, [href], [tabindex]:not([tabindex="-1"])'
            );
            if (focusable.length === 0) return;
            const first = focusable[0];
            const last = focusable[focusable.length - 1];
            if (e.shiftKey && document.activeElement === first) {
                e.preventDefault();
                last.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault();
                first.focus();
            }
        };

        document.addEventListener("keydown", handleTab);
        document.body.style.overflow = "hidden";
        return () => {
            document.removeEventListener("keydown", handleTab);
            document.body.style.overflow = "";
            previouslyFocused?.focus?.();
        };
    }, [open]);

    const handleChange = (field) => (e) => {
        setValues((prev) => ({ ...prev, [field]: e.target.value }));
        setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const nextErrors = validate(values);
        setErrors(nextErrors);
        if (Object.keys(nextErrors).length === 0) setSubmitted(true);
    };

    const portalTarget = typeof document !== "undefined" ? document.body : null;
    if (!portalTarget) return null;

    return createPortal(
        <AnimatePresence>
            {open && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                >
                    <motion.div
                        className="absolute inset-0 bg-black/75 "
                        onClick={resetAndClose}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                    />

                    <motion.div
                        ref={dialogRef}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="booking-modal-title"
                        className="relative w-full max-w-[650px] max-h-[90vh] overflow-y-auto bg-[#111111] border border-[#252525] rounded-[28px] p-6 sm:p-10"
                        initial={{ opacity: 0, scale: 0.92 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.92 }}
                        transition={{ duration: 0.25 }}
                    >
                        <button
                            onClick={resetAndClose}
                            aria-label="Close dialog"
                            className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors duration-200"
                        >
                            <X size={22} />
                        </button>

                        <h2 id="booking-modal-title" className="text-2xl sm:text-3xl font-extrabold text-white mb-8 flex">
                            Book a Session

                            <span className="text-xs text-orange-500 border border-orange-500 px-7 rounded-full bg-orange-500/10 py-1 flex items-center justify-center mx-auto inline-block gap-2"> <svg xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" viewBox="0 0 24 24">
                                <g fill="none" stroke="currentColor" strokeWidth={1.5}>
                                    <path d="M2 16c0-2.828 0-4.243.879-5.121C3.757 10 5.172 10 8 10h8c2.828 0 4.243 0 5.121.879C22 11.757 22 13.172 22 16s0 4.243-.879 5.121C20.243 22 18.828 22 16 22H8c-2.828 0-4.243 0-5.121-.879C2 20.243 2 18.828 2 16Z"></path>
                                    <path strokeLinecap="round" d="M6 10V8a6 6 0 1 1 12 0v2" opacity={0.5}></path>
                                </g>
                            </svg> Coming Soon</span>
                        </h2>

                        {submitted ? (
                            <div className="py-10 text-center">
                                <p className="text-white text-lg font-semibold mb-2">
                                    Booking request submitted successfully.
                                </p>
                                <p className="text-[#8B8B8B] text-sm mb-8">We'll contact you shortly.</p>
                                <Button variant="accent" onClick={resetAndClose} className="w-full h-[56px]">
                                    Done
                                </Button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
                                <Field label="Name" htmlFor="name" error={errors.name}>
                                    <TextInput
                                        id="name"
                                        ref={firstFieldRef}
                                        value={values.name}
                                        onChange={handleChange("name")}
                                        placeholder="Your full name"
                                        error={errors.name}
                                    />
                                </Field>

                                <Field label="Email" htmlFor="email" error={errors.email}>
                                    <TextInput
                                        id="email"
                                        type="email"
                                        value={values.email}
                                        onChange={handleChange("email")}
                                        placeholder="you@example.com"
                                        error={errors.email}
                                    />
                                </Field>

                                <Field label="Problem / Topic" htmlFor="topic" error={errors.topic}>
                                    <TextInput
                                        id="topic"
                                        value={values.topic}
                                        onChange={handleChange("topic")}
                                        placeholder="e.g. Career guidance, system design"
                                        error={errors.topic}
                                    />
                                </Field>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <Field label="Preferred Date" htmlFor="date" error={errors.date}>
                                        <TextInput id="date" type="date" value={values.date} onChange={handleChange("date")} error={errors.date} />
                                    </Field>
                                    <Field label="Preferred Time" htmlFor="time" error={errors.time}>
                                        <TextInput id="time" type="time" value={values.time} onChange={handleChange("time")} error={errors.time} />
                                    </Field>
                                </div>

                                <Field label="Meeting Mode" htmlFor="mode">
                                    <Select id="mode" value={values.mode} onChange={handleChange("mode")}>
                                        <option>Google Meet</option>
                                        <option>Zoom</option>
                                        <option>Discord</option>
                                    </Select>
                                </Field>

                                <Field label="Describe your problem" htmlFor="description" error={errors.description}>
                                    <TextArea
                                        id="description"
                                        value={values.description}
                                        onChange={handleChange("description")}
                                        placeholder="Tell me what you'd like to solve in this session..."
                                        error={errors.description}
                                    />
                                </Field>

                                <Button disabled={true} type="submit" variant="accent" className="w-full h-[58px] mt-2">
                                    Book Session
                                </Button>
                            </form>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>,
        portalTarget
    );
}

/* ---------------------------------- */
/* Main export — single component     */
/* ---------------------------------- */

export default function SessionHero() {
    const [open, setOpen] = useState(false);

    return (
        <section className="relative w-full h-screen bg-black overflow-hidden pt-5">
            <Nav />
            <FloatingIcons />

            <div className="relative z-10 flex flex-col items-center justify-center h-full px-6">
                <div className="flex flex-col items-center text-center gap-8 max-w-[650px]">
                    <h1 className="font-extrabold text-white leading-[1.05] tracking-tight text-[42px] sm:text-[58px] lg:text-[72px]">
                        A session that feels <span className="text-[#FF6B00]">effortless</span>
                    </h1>

                    <p className="text-[#8B8B8B] text-base sm:text-lg leading-[1.8] max-w-[620px]">
                        One focused hour where we solve <span className="text-white">your</span> exact problem ·
                        guidance, software engineering consult or anything you want · how to start,
                        where to start .
                    </p>

                    <Button variant="dark" onClick={() => setOpen(true)} className="w-full sm:w-[430px] h-[78px] text-lg">
                        Book a Session With Me
                    </Button>

                    <div className="flex flex-col items-center gap-2 -mt-2">
                        <span className="text-[#8B8B8B] text-sm">Weekends only · Sat &amp; Sun · 12–9 PM IST</span>
                        <span className="text-[#8B8B8B] text-sm">
                            Facing any issue while booking? Just mail me:{" "}
                            <a href="mailto:codesarthi.help@gmail.com" className="text-[#FF6B00] hover:underline">
                                codesarthi.help@gmail.com
                            </a>
                        </span>
                    </div>
                </div>
            </div>

            <BookingModal open={open} onClose={() => setOpen(false)} />
        </section>
    );
}