import React, { useState } from 'react'
import Sidebar from "./components/Sidebar"
import ChatBox from "./components/ChatBox"
import { Route, Routes, useLocation } from "react-router-dom"
import Credits from "./pages/Credits"
import Community from './pages/Community'
import "./assets/assets/prism.css"
import Loading from './pages/Loading'
import { useAppContext } from './context/AppContext'
import Login from './pages/Login'

const App = () => {

  const { user } = useAppContext();
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const { pathname } = useLocation();
  if (pathname === "/loading") return <Loading />

  return (
    <>
      {!isMenuVisible && <div onClick={() => setIsMenuVisible(true)} className='z-1 text-white cursor-pointer md:hidden absolute top-3 left-3'><i className="fa-solid fa-bars text-2xl"></i></div>}
      <div className='bg-[url("/background_image.png")] bg-cover bg-contain bg-center h-screen w-full'>
        {user ? (

          <div className='flex h-screen w-screen'>
            <Sidebar isMenuVisible={isMenuVisible} setIsMenuVisible={setIsMenuVisible} />
            <Routes>
              <Route path='/' element={<ChatBox />} />
              <Route path='/credits' element={<Credits />} />
              <Route path='/community' element={<Community />} />
            </Routes>
          </div>

        ) : (
          <div className='h-screen w-full flex justify-center items-center'>
            <Login />
          </div>
        )}
      </div>
    </>
  )
}

export default App
