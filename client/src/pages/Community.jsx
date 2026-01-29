import React, { useEffect, useState } from 'react'
import { dummyPublishedImages } from '../assets/assets/assets';
import Loading from './Loading';
import "./Community.css"

const Community = () => {

  const [images, setImages] = useState([]);
  const[loading, setLoading] = useState(true);

  const fetchImages = async ()=>{
    setImages(dummyPublishedImages);
    setLoading(false);
  }
  useEffect(()=>{
    fetchImages();
  },[])

  if(loading) return <Loading/>

  return (
    <div className='backdrop-blur bg-[#0e112e7c] text-white p-2 md:px-4 xl:px-14 2xl:px-20 mx-auto overflow-y-scroll h-screen w-full'>
      <h2 className='mb-6 text-xl text-center'>Community Images</h2>
      {images.length > 0?(
        <div className='flex flex-wrap gap-5 max-sm:justify-center'>{images.map((item,idx)=>(
          <a className='relative ' key={idx} href={item.imageUrl} target='_blank'>
            <img className='hoverImg rounded-lg w-full h-35 md:h-50 2xl:h-62 object-cover' src={item.imageUrl} alt="" />
            <p className='absolute p-1 rounded-lg backdrop-blur bottom-0 right-0 text-xs bg-black/40'>created by {item.userName}</p>
          </a>
        ))}</div>
      ):(
        <div>
          <p className='text-center'>No images in community</p>
        </div>
      )}
      
    </div>
  )
}

export default Community
