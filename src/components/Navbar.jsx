import React from 'react'
import { getProfile } from "../services/authService";
import { Link } from "react-router-dom";
import { useState , useEffect } from 'react';

const Navbar = ({profileImg }) => {


  
  // user 
    const [user, setUser] = useState(null);
  
    useEffect(() => {
      const fetchUser = async () => {
        const user = await getProfile();
        setUser(user);
      };
      fetchUser();
    }, []);
  
    // logout
    const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
      <nav className="flex justify-between items-center px-8 py-4 bg-pink-100 shadow">
        {/* <h1 className="text-2xl font-bold text-blue-900">NovaBuild</h1> */}
        <img src="/logoNav.png"
        style={{
          width : "8rem",
          height : "3.5rem"
        }} 
        alt=""
         />
        <div className="space-x-6">
          {/* Conditional Auth */}
        {!user ? (
          <>
          <a href="#features" className="text-blue-900 hover:text-blue-800">Features</a>
          <a href="#about" className="text-blue-900 hover:text-blue-700">About</a>
            <Link to="/register">
              <button className="bg-pink-400 text-white px-3 py-2 rounded-lg text-lg shadow hover:bg-pink-500 transition">
                Sign Up
              </button>
            </Link>
            <Link to="/login">
              <button className="  bg-pink-400 text-white px-3 py-2 rounded-lg text-lg shadow hover:bg-pink-500 transition">
                Sign In
              </button>
            </Link>
          </>
        ) : (
          <div className="relative flex items-center space-x-2">
            <button
              onClick={handleLogout}
              className="bg-red-900 text-white px-3 py-2 rounded hover:bg-red-800 transition"
            >
              Logout
            </button>
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
        )}

          
        </div>
      </nav>
  )
}

export default Navbar