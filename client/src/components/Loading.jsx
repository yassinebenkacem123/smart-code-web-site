import React from 'react'

const Loading = ({children}) => {
  return (
    <div className="flex justify-center text-center w-full items-center h-screen bg-gradient-to-br from-[#0f172a] to-[#1e293b]">
      <div className="flex flex-col items-center gap-4">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-sky-500"></div>
        <p className="text-sky-300">{children}</p>
      </div>
    </div>
  )
}

export default Loading