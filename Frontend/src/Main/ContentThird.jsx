import React, { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import BASE_URL from '../Pages/auth/baseURL';
import { Loader2 } from 'lucide-react';
import Toast from '../Pages/CARRER-PROFILE-CREATION/2/Toast';

const ContentThird = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isStartSubmitting, setIsStartSubmitting] = useState(false);
  const [toasts, setToasts] = useState([]);

  const addToast = ({ type = "success", title, message }) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, type, title, message }]);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    try {
      setIsStartSubmitting(true);
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(email)) {
        addToast({
          type: "error",
          title: "Invalid Email",
          message: "Please enter a valid email"
        });
        return;
      }

      const res = await axios.post(
        `${BASE_URL}/newsletter/subscribe`,
        { email },
        { withCredentials: true }
      );
      setSubmitted(true);
      setEmail("");
      addToast({ type: "success", title: "Success", message: res.data.message });
    } catch (error) {
      addToast({
        type: "error",
        title: "Error",
        message:
          error?.response?.data?.message ||
          error?.message ||
          "Something went wrong"
      });
    } finally {
      setIsStartSubmitting(false);
    }
  };

  return (
    <div className="w-full bg-[#000] min-h-[500px] flex items-center justify-center py-20 px-6 font-['Outfit',sans-serif] relative overflow-hidden">
      {/* Toasts */}
      <div className="fixed top-5 right-5 flex flex-col gap-3 z-50">
        <AnimatePresence>
          {toasts.map((t) => (
            <Toast
              key={t.id}
              {...t}
              onClose={() => removeToast(t.id)}
            />
          ))}
        </AnimatePresence>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className=" w-full flex flex-col items-center text-center"
      >
        <h2 className="text-[2.5rem] md:text-[4rem] lg:text-[4.5rem] font-black tracking-tight text-white uppercase leading-[1.1] mb-6" style={{ fontFamily: 'head, sans-serif' }}>
          JOIN OUR NEWSLETTER<br />AND STAY UP TO DATE
        </h2>

        <p className="text-lg md:text-[22px] text-white/70 font-medium mb-12">

        </p>

        <div className="w-full max-w-[800px] mb-8">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="w-full bg-[#111] border-[3px] border-[#333] flex flex-col sm:flex-row p-2 shadow-[6px_6px_0px_0px_#fff] hover:shadow-[8px_8px_0px_0px_#fff] transition-shadow duration-300">
              <input
                type="email"
                placeholder="Enter Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-6 py-4 sm:py-0 bg-transparent text-white text-xl outline-none placeholder:text-gray-500 font-medium min-w-0"
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isStartSubmitting}
                className="bg-[#fff] border-[3px] border-[#fff] text-black font-black uppercase tracking-wider px-10 py-4 flex items-center justify-center gap-2 hover:bg-[#d441a3] transition-colors whitespace-nowrap"
              >
                {isStartSubmitting ? (
                  <Loader2 className="animate-spin w-6 h-6" />
                ) : (
                  <span className="text-lg">Subscribe</span>
                )}
              </motion.button>
            </form>
          ) : (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-full bg-[#111] border-[3px] border-[#333] p-6 flex items-center justify-center gap-4 shadow-[6px_6px_0px_0px_#fff]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24">
                <path fill="#fff" d="M22 5.5H9c-1.1 0-2 .9-2 2v9a2 2 0 0 0 2 2h13c1.11 0 2-.89 2-2v-9a2 2 0 0 0-2-2m0 3.67l-6.5 3.33L9 9.17V7.5l6.5 3.31L22 7.5zM5 16.5c0 .17.03.33.05.5H1c-.552 0-1-.45-1-1s.448-1 1-1h4zM3 7h2.05c-.02.17-.05.33-.05.5V9H3c-.55 0-1-.45-1-1s.45-1 1-1m-2 5c0-.55.45-1 1-1h3v2H2c-.55 0-1-.45-1-1"></path>
              </svg>
              <span className="text-white font-black text-2xl uppercase tracking-wide">Thanks for subscribing!</span>
            </motion.div>
          )}
        </div>

        <p className="text-white/80 text-[18px] font-medium mt-4">
          Join 1000+ People Reading Our Newsletter
        </p>
      </motion.div>
    </div>
  );
};

export default ContentThird;