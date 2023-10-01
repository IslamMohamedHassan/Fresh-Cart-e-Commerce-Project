import React, { useContext } from 'react'
import Nav from '../Navbar/Nav'
import Footer from '../Footer/Footer'
import { Outlet } from 'react-router-dom'

import { projectContext } from '../../context/Context'

export default function Layout() {

   const {isLogin}= useContext(projectContext);
  return (
    <>
    <div className='d-flex flex-column vh-100 justify-content-between'>
      <Nav isLogin = {isLogin} />
      <Outlet/>
      <Footer/>
    </div>
    </>
  )
}
