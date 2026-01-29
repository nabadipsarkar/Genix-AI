import React, { useState } from 'react'
import "./Sidebar.css"
import { useAppContext } from '../context/AppContext'
import { assets } from '../assets/assets/assets';
import moment from "moment";

const Sidebar = ({isMenuVisible, setIsMenuVisible}) => {

  const { user, chats, setSelectedChats,navigate } = useAppContext();
  const [search, setSearch] = useState("");

  return (
    <div className={`text-white relative z-[1] h-screen w-[max(20%,300px)] p-[25px] backdrop-blur-[5px] bg-[#0e112e7c] trabsition-all duration-500 max-md:absolute left-0 border-r border-gray ${!isMenuVisible && "max-md:-translate-x-full"}`}>
      <img src={assets.logo_full} alt="" />
      <button className='new-chat-btn'>
        <span>+</span> New Chat
      </button>

      <div className='search-input'>
        <i className="fa-solid fa-magnifying-glass"></i>
        <input onChange={(e) => setSearch(e.target.value)} value={search} type="text" placeholder='Search chats' />
      </div>
      {chats.length > 0 && <h2>Recent Chats</h2>}
      <div className='recent-chats'>
        {
          chats.filter((chat) =>
            chat.messages[0] ? 
            chat.messages[0]?.content.toLowerCase().includes(search.toLowerCase()) : 
            chat.name.toLowerCase().includes(search.toLowerCase())
          ).map((chat) => (
            <div onClick={()=>{navigate("/");setSelectedChats(chat); setIsMenuVisible(false)}} className='chats border bg-gray p-2 display flex cursor-pointer justify-between items-center rounded-md mt-4' key={chat._id}>
              <div >
                <p>
                  {chat.messages.length > 0 ? chat.messages[0].content.slice(0, 32) : chat.name}
                </p>
                <p className='text-xs'>{moment(chat.updatedAt).fromNow()}</p>
              </div>
              <i className="fa-solid fa-trash delete "></i>
            </div>
          ))
        }
      </div>

      <div className="buttom-section">
        <div onClick={()=>{navigate("/community"); setIsMenuVisible(false)}} className='section'>
          <i className="fa-regular fa-image"></i>
          <p>Community Images</p>
        </div>
        <div onClick={()=>{navigate("/credits"); setIsMenuVisible(false)}} className='section'>
          <i className="fa-regular fa-gem"></i>
          <div>
            <p>Credis : {user?.credits}</p>
            <p className='text-xs'>purches credits to use Ai </p>
          </div>

        </div>
        <div className='section profile'>
          <div className='flex  '>
            <i className="fa-regular fa-user"></i>
            <p className='ml-2'>{user?user.name:"login your account"}</p>
          </div>
          {user && <i className="fa-solid fa-arrow-right-from-bracket logout"></i>}
          
        </div>
      </div>
      <div onClick={()=>setIsMenuVisible(false)} className='md:hidden absolute top-3 right-3 cursor-pointer'>
        <i className="fa-solid fa-x"></i>
      </div>
      
    </div>
  )
}

export default Sidebar
