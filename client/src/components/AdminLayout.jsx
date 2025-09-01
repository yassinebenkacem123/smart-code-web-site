import React from 'react'
import { Outlet } from 'react-router-dom'
import SideBar from './SideBar'
const AdminLayout = () => {
  return (
    <div className='flex  bg-gray-700/50 h-screen'>
    <SideBar
      role="admin"
    /> 
    <Outlet/>
    </div>
  )
}

export default AdminLayout