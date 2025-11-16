import React from 'react'
import { Link } from 'react-router-dom'

const NavBuilderBlock = ({isPreview, setIsPreview, exportLandingPage, user, profileImg }) => {
  return (
<nav className="flex items-center justify-between px-6 py-3 bg-white shadow-md sticky top-0 z-50 border-b border-pink-100">
  {/* Left Section — Logo / App Name */}
  <div className="flex items-center space-x-2">
<img src="/logoNav.png"
        style={{
          width : "8rem",
          height : "3.5rem"
        }} 
        alt=""
         />
  </div>

  {/* Middle Section — Navigation Links */}
  <div className="hidden md:flex items-center space-x-6">
    <Link to="/">
      <button className="text-gray-600 hover:text-pink-500 transition">
      Home
    </button>
    </Link>
    <Link to="/projects">
      <button className="text-gray-600 hover:text-pink-500 transition">
      My Projects
    </button>
    </Link>
    <Link to="/">
      <button className="text-gray-600 hover:text-pink-500 transition">
      Templates
    </button>
    </Link>
  </div>
         <div>
    </div>

  {/* Right Section — Actions */}
  <div className="flex items-center space-x-3">
    {/* Export Button (only visible in preview mode) */}
    {isPreview && (
      <button
        onClick={exportLandingPage}
        className="bg-pink-400  text-white px-4 py-2 rounded-md hover:bg-pink-600 transition"
      >
        Export
      </button>
    )}

    {/* Preview Toggle */}
    <button
      onClick={() => setIsPreview(!isPreview)}
      className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-800 transition"
    >
      {isPreview ? "Exit Preview" : "Preview"}
    </button>

    <div className="relative">
         {/* Conditional Auth */}
         {user && (
           <div className="relative flex items-center space-x-2">
            <Link
              to="/profile"
              className="flex items-center space-x-2 bg-gray-100 px-3 py-2 rounded-full hover:bg-gray-200 transition"
            >
              <img
                src={profileImg || "/default-avatar.png"} // fallback if no image
                alt="User"
                className="w-6 h-6 rounded-full"
              />
              <span className="hidden md:inline text-sm text-gray-700">{user.name}</span>
            </Link>
          </div>
         )}
    </div>
  </div>
      </nav>
  )
}

export default NavBuilderBlock