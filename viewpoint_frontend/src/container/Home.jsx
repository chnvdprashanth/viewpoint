import React, { useState, useRef, useEffect } from 'react'
import { HiMenu } from 'react-icons/hi'
import { AiFillCloseCircle } from 'react-icons/ai'
import { Link, Route, Routes } from 'react-router-dom'
import { UserProfile, Sidemenu } from '../components' //directly getting them using one index file rather importing each component seperately.
import { userQuery } from '../utils/data'
import { client } from '../utils/client'
import { fetchUser } from '../utils/fetchUser'
import logo from '../assets/logo.png'
import Pins from './Pins'

const Home = () => {
  const [toggleSidemenu, settoggleSidemenu] = useState(false)
  const [user, setUser] = useState(null)
  const scrollRef = useRef(null)
  const userInfo = fetchUser()

  useEffect(() => {
    const query = userQuery(userInfo?.sub)
    client.fetch(query)
      .then((data) => {
        // console.log(data[0])
        setUser(data[0])
      })
  }, [])

  useEffect(() => {
    scrollRef.current.scrollTo(0, 0);
  }, [])

  return (
    <div className='flex bg-gray-50 md:flex-row flex-col h-screen transition-height duration-75 ease-out'>
      <div className="hidden md:flex h-screen flex-initial">
        <Sidemenu user={user && user} />
      </div>
      <div className="flex md:hidden flex-row">
        <div className="p-2 w-full flex flex-row justify-between items-center shadow-md">
          <HiMenu fontSize={25} className="cursor-pointer" onClick={() => settoggleSidemenu(true)} />
          <Link to='/'>
            <img src={logo} alt="logo" className='w-40' />
          </Link>
          <Link to={`user-profile/${user?._id}`}>
            <img src={user?.image} alt="logo" className='w-16 rounded-full' />
          </Link>
        </div>
        {toggleSidemenu &&
          (<div className="fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in">
            <div className="absolute w-full flex justify-end items-center p-2">
              <AiFillCloseCircle fontSize={30} className='cursor-pointer' onClick={() => { settoggleSidemenu(false) }} />
            </div>
            <Sidemenu user={user && user} closeToggle={settoggleSidemenu} />
          </div>
          )}
      </div>
      <div className="pb-2 flex-1 h-screen overflow-y-scroll" ref={scrollRef}>
        <Routes>
          <Route path='/user-profile/:userId' element={<UserProfile />} />
          <Route path='/*' element={<Pins user={user && user} />} />
        </Routes>
      </div>
    </div>
  )
}

export default Home