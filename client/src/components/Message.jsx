import React, { useEffect } from 'react'
import { assets } from '../assets/assets/assets'
import moment from 'moment'
import MarkDown from "react-markdown"
import Prism from "prismjs"

const Message = ({message}) => {

  useEffect(()=>{
    Prism.highlightAll();
  },[message.content])

  return (
    <div >
      {
        message.role === "user"?(
          <div className='flex items-start justify-end gap-2 my-4'>
            <div className='flex p-2 flex-col gap-1 px-2 bg-[#2C93FD]/70 rounded-md max-w-2xl'>
              <p className='text-white-900 max-sm:text-xs'>{message.content}</p>
              <span className='text-xs'>{moment(message.timestamp).toNow()}</span>
            </div>
            <img src={assets.user_icon} alt="" />
          </div>
        ):(
          <div className='inline-flex flex-col gap-2 p-2 m-2 max-w-2xl bg-[#8077FE]/60 rounded-md'>
            {
              message.isImage?(
                <img className='w-full max-w-md' src={message.content} alt=''/>
              ):
              (
                <div className='text-sm max-sm:text-xs reset-tw'>
                  <MarkDown>{message.content}</MarkDown>                 
                </div>
              )
            }
            <span className='text-xs'>{moment(message.timestamp).toNow()}</span>
          </div>
        )
      }
    </div>
  )
}

export default Message
