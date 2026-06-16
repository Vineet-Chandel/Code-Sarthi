
import React, { useState } from 'react'
import SearchChats from './SearchChats'
import SearchDrawer from './SearchDrawer'
import AllChats from './AllChats'
import ChatArea from './ChatArea'

const Collab = () => {
  const [loading, setLoading] = useState(false);
  const [selectedChatUser, setSelectedChatUser] = useState({
    idx: null,
    info: null

  });

  return (
    <div className='h-[calc(100vh-65px)] w-screen bg-base-200 flex gap-1 justify-center items-center p-1 '>

      <div className=' h-full w-[30vw] bg-black rounded-2xl p-2'>
        <div>

          <SearchChats loading={loading} setLoading={setLoading} />
        </div>

        <AllChats loading={loading} setLoading={setLoading} selectedChatUser={selectedChatUser} setSelectedChatUser={setSelectedChatUser} />

      </div>
      <div className=' h-full w-[70vw] bg-black rounded-2xl  bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)]
    bg-[size:40px_40px]  flex justify-center items-center flex-col'>


        {selectedChatUser?.info === null && (<><svg className='w-[400px] h-[400px]  ' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="4" y="6" width="16" height="12" rx="2" fill="#7E869E" fillOpacity="0.25" stroke="#fffefeff" strokeWidth="1.2" />
          <path d="M11.1056 12.5528L4 9V16C4 17.1046 4.89543 18 6 18H18C19.1046 18 20 17.1046 20 16V9L12.8944 12.5528C12.3314 12.8343 11.6686 12.8343 11.1056 12.5528Z" fill="#fff" />
        </svg>
          <h1 className='text-2xl font-extrabold font-poppins relative text-center -top-[80px] text-info'>
            Discuss solutions <br /> Not distractions
          </h1>

        </>)}


        {selectedChatUser?.info !== null && <ChatArea selectedChatUser={selectedChatUser} setSelectedChatUser={setSelectedChatUser} />}

      </div>

    </div >
  )
}

export default Collab