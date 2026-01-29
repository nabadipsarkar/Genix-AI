import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Loading = () => {
  const navigate = useNavigate();

  useEffect(()=>{
    const timeout = setTimeout(()=>{
      navigate("/");
    },8000)
    return ()=> clearTimeout(timeout);
  },[])

  return (
    <div className='h-screen w-full flex  items-center justify-center bg-gradient-to-b from-[#8077FE] to-[#2C93FD] backdrop-opacity-60 text-white'>
      <div className='h-20 w-20 rounded-full  border-5 border-t-transparent animate-spin'></div>
    </div>
  )
}

export default Loading
