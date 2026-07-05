
import React, { useEffect, useState } from 'react'
import SearchChats from './SearchChats'
import SearchDrawer from './SearchDrawer'
import AllChats from './AllChats'
import ChatArea from './ChatArea'
import axios from 'axios'
import BASE_URL from '../auth/baseURL'
import { useDispatch, useSelector } from 'react-redux';
import { addMessage, setConversationMessages } from "../../utils/messageSlice"
import Toast from '../CARRER-PROFILE-CREATION/2/Toast'
import { motion, AnimatePresence } from 'framer-motion'
import { useOutletContext } from 'react-router-dom'

const Collab = () => {
  const {
    selectedChatUser,
    setSelectedChatUser,
  } = useOutletContext();
  const allMessages = useSelector(state => state.messages)
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);




  const messages = async (id) => {
    try {
      const res = await axios.post(`${BASE_URL}/get-message/${id}`, {}, {
        withCredentials: true
      });

      dispatch(setConversationMessages(res.data))


    } catch (err) {
      addToast({
        type: "error",
        title: "Error",
        message:
          err?.response?.data?.message ||
          err?.message ||
          "Something went wrong"
      });
    }
  }


  useEffect(() => {
    const messagesPeek = allMessages?.messages?.[selectedChatUser?.convoId];
    if (selectedChatUser?.info?._id && !messagesPeek) {
      messages(selectedChatUser?.convoId)
    }

  }, [selectedChatUser])


  const [toasts, setToasts] = useState([]);
  const ToastContainer = ({ toasts, removeToast }) => {
    return (
      <div className="fixed top-4 left-4 right-4 md:top-auto md:left-auto md:bottom-5 md:right-5 flex flex-col gap-3 w-auto md:w-[440px] max-w-full z-[9999] pointer-events-none">
        <AnimatePresence mode="popLayout">
          {toasts.map((toast) => (
            <Toast
              key={toast.id}
              {...toast}
              onClose={() => removeToast(toast.id)}
            />
          ))}
        </AnimatePresence>
      </div>
    );
  };
  const addToast = ({ type = "success", title, message }) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, type, title, message }]);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };











  return (
    <div className='h-[calc(100vh-54px)] w-screen bg-black flex gap-1 justify-center items-center p-2 md:p-4'>


      <ToastContainer toasts={toasts} removeToast={removeToast} />
      <div className={`    ${selectedChatUser?.info ? "hidden md:block" : "block"} h-full w-full  sm:relative md:w-[340px] lg:w-[380px] xl:w-[420px]  bg-[#212121] rounded-3xl pl-2 pr-1 p-3`}>

        <div className='h-[53px] '>
          <SearchChats loading={loading} setLoading={setLoading} />
        </div>



        <div className='h-[calc(100%-53px)]'>
          <AllChats loading={loading} setLoading={setLoading} selectedChatUser={selectedChatUser} setSelectedChatUser={setSelectedChatUser} addToast={addToast} />
        </div>






      </div>
      <div className={`  ${selectedChatUser?.info
        ? "flex"
        : "hidden md:flex"
        }    flex-1 h-full   sm:relative bg-black rounded-2xl  bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)]
    bg-[size:40px_40px]  flex justify-center items-center flex-col`}>


        {selectedChatUser?.info === null && (<><svg className='w-[400px] h-[400px]  ' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="4" y="6" width="16" height="12" rx="2" fill="#7E869E" fillOpacity="0.25" stroke="#fffefeff" strokeWidth="1.2" />
          <path d="M11.1056 12.5528L4 9V16C4 17.1046 4.89543 18 6 18H18C19.1046 18 20 17.1046 20 16V9L12.8944 12.5528C12.3314 12.8343 11.6686 12.8343 11.1056 12.5528Z" fill="#fff" />
        </svg>
          <h1 className='text-2xl font-extrabold font-poppins relative text-center -top-[80px] text-info'>
            Discuss solutions <br /> Not distractions
          </h1>

        </>)}


        {selectedChatUser?.info !== null && <ChatArea setSelectedChatUser={setSelectedChatUser} selectedChatUser={selectedChatUser} addToast={addToast} />}

      </div>

    </div >
  )
}

export default Collab