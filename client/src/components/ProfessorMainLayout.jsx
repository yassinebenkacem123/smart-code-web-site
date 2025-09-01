import React from 'react'
import { Outlet } from 'react-router-dom'
import SideBar from './SideBar'
const ProfessorMainLayout = () => {
  return (
    <div className='flex  bg-gray-700/50 min-h-screen'>
        <SideBar
        role="enseignant"
        /> 
        <Outlet/>
    </div>
  )
}

export default ProfessorMainLayout