import React, { useEffect, useRef, useState } from 'react'
import { useAppContext } from '../context/AppContext'
import { assets } from '../assets/assets/assets';
import "./chatBox.css"
import Message from './Message';

const ChatBox = () => {
  const { selectedChats } = useAppContext();
  const containerRef = useRef(null);

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const [prompt, setPrompt] = useState("");
  const [mode, setMode] = useState("text");
  const [isPublished, setIsPublished] = useState(false);


  const handleSubmit = (e) => {
    e.preventDefault();
  }

  useEffect(() => {

    if (selectedChats) {
      setMessages(selectedChats.messages);
    }
  }, [selectedChats])

  useEffect(()=>{
    if(containerRef.current){
      containerRef.current.scrollTo({
        top:containerRef.current.scrollHeight,
        behavior:"smooth"
      })
    }
  },[messages])

  return (
    <div className='text-white backdrop-blur-[5px] bg-[#0e112e7c] w-full flex flex-col h-screen px-8 '>
      <div ref={containerRef} className='mb-2 flex-1 overflow-y-auto'>
        {messages.length === 0 && (
          <div className='chat-logo '>
            <img src={assets.logo_full} alt="" className='xl:w-120 md:w-70 ' />
            <p className=' text-3xl xl:text-[60px] md:text-3xl ' >Ask me anything</p>
          </div>
        )}
        {messages.map((message, index) => <Message key={index} message={message} />)}

        {/* loading three dots */}
        {loading && (
          <div className="m-4">
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></span>
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-150"></span>
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-300"></span>
            </div>
          </div>
        )}
        <br /><br />
      </div>
      {/* promtt input box */}
      <div className='sticky  bottom-0 w-full pb-4 flex flex-col gap-2'>
        {mode === "image" && (
          <label className='inline-flex text-xs items-center gap-2 m-auto'>
            <p>Publish generated image to community</p>
            <input type="checkbox" className='cursor-pointer' checked={isPublished} onChange={(e) => setIsPublished(e.target.checked)} />
          </label>
        )}
        <form className=' w-full  max-w-2xl mx-auto rounded-full p-1 flex items-center gap-2 bg-[#8077FE]'>
          <select className='text-sm rounded-lg outline-none' onChange={(e) => setMode(e.target.value)} value={mode}>
            <option className='text-black' value="text">Text</option>
            <option className='text-black' value="image">Image</option>
          </select>
          <input className='max-sm:text-sm min-w-0 outline-none flex-1  text-white' onChange={(e) => setPrompt(e.target.value)} value={prompt} type="text" placeholder='Enter your prompt here...' required />
          <button className='flex-shrink-0 bg-blue-600 mr-2 cursor-pointer rounded-full px-3 py-2 ' disabled={loading}>{loading ? <i className="fa-solid fa-x"></i> : <i className="fa-solid fa-paper-plane text-black-200"></i>}</button>
        </form>
      </div>

    </div>
  )
}

export default ChatBox
