import React from 'react'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { Link } from 'react-router-dom';
const Logo = () => {
  return (
    <Link to="/" className="flex items-center">
        <div className="flex flex-col ">
          <div className="flex relative left-12 top-2 items-center">
            <MdKeyboardArrowLeft className="relative left-1" size={20} />
            <p className="text-[20px] font-cherry-swash">Code</p>
            <MdKeyboardArrowRight className="relative right-1" size={20} />
          </div>
          <h1 className="text-primary font-kavoon text-2xl">SMART</h1>
        </div>
    </Link>
  )
}
export default Logo