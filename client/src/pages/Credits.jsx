import React, { useEffect, useState } from 'react'
import { dummyPlans } from '../assets/assets/assets';
import Loading from './Loading';

const Credits = () => {

  const[plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPlans = async ()=>{
    setPlans(dummyPlans);
    setLoading(false);
  }
  useEffect(()=>{
    fetchPlans();
  },[])

  if(loading) return <Loading/>
  return (
    <div className='h-screen w-full backdrop-blur-[5px] bg-[#0e112e7c] text-white overflow-y-scroll '>
      <h2 className='font-semibold text-2xl text-center my-4 2xl:mt-30'>Credits plans</h2>
      <div className='flex gap-10 justify-center flex-wrap p-4 2xl:mt-10 '>
        {plans.map((plan)=>(
          <div className='h-65 border border-2 backdrop-blur shadow-lg border-[#8077FE] p-4 w-60 rounded-md cursor-pointer  duration-300 ease-in-out hover:bg-[#8077FE] hover:scale-105' key={plan._id}>
              <div>
                <h2 className='font-bold'>{plan.name}</h2>
                <p><span className='text-2xl'>${plan.price}</span> / {plan.credits} credits</p>
                <ul className="list-disc pl-5 text-sm ">{
                  plan.features.map((feature, idx)=>(
                    <li className='mt-2' key={idx}>{feature}</li>
                  ))
                }</ul>
              </div>
              <button className='w-full p-2 border border-2 mt-4 bg-[#2C93FD] text-lg  rounded-lg cursor-pointer '>Buy Now</button>
          </div>
        ))}
      </div>
      {/* <div className='h-65 border border-2 border-[#8077FE] p-4 w-60 rounded-md cursor-pointer  duration-300 ease-in-out hover:bg-[#8077FE] hover:scale-105'>
        <h2 className='font-bold'>Basic</h2>
        <p><span className='text-2xl'>$10</span> / 100 credits</p>
        <ul className="list-disc pl-5 text-sm mt-3 mb-3">
          <li>100 text generation</li>
          <li>50 image generation</li>
          <li>Standard support</li>
          <li>Access to basic model</li>
        </ul>
        <button className='w-full p-2 border border-2  bg-[#2C93FD] text-lg mt-4 rounded-lg cursor-pointer'>Buy Now</button>
      </div>
      <div className='h-65 border border-2 border-[#8077FE] p-4 w-60 rounded-md cursor-pointer  duration-300 ease-in-out hover:bg-[#8077FE] hover:scale-105'>
        <h2 className='font-bold'>Pro</h2>
        <p><span className='text-2xl'>$20</span>/500 credits</p>
        <ul className="list-disc pl-5 text-sm mt-3 mb-3">
          <li>500 text generation</li>
          <li>20 image generation</li>
          <li>Priority support</li>
          <li>Access to pro model</li>
        </ul>
        <button className='w-full p-2 border border-2  bg-[#2C93FD] text-lg mt-4 rounded-lg cursor-pointer'>Buy Now</button>
      </div>
      <div className='h-65 border border-2 border-[#8077FE] p-4 w-60 rounded-md cursor-pointer  duration-300 ease-in-out hover:bg-[#8077FE] hover:scale-105'>
        <h2 className='font-bold'>Premium</h2>
        <p><span className='text-2xl'>$30</span>/1000 credits</p>
        <ul className="list-disc pl-5 text-sm mt-3 mb-3">
          <li>1000 text generation</li>
          <li>500 image generation</li>
          <li>24/7 VIP support</li>
          <li>Access to premium model</li>
        </ul>
        <button className='w-full p-2 border border-2  bg-[#2C93FD] text-lg mt-4 rounded-lg cursor-pointer'>Buy Now</button>
      </div> */}
    </div>
  )
}

export default Credits
