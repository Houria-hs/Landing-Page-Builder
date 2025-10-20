import React from 'react'

const Navbar = () => {
  return (
      <nav className="flex justify-between items-center px-8 py-4 bg-pink-100 shadow">
        <h1 className="text-2xl font-bold text-blue-900">LandingBuilder</h1>
        <div className="space-x-6">
          <a href="#features" className="text-blue-900 hover:text-blue-800">Features</a>
          <a href="#about" className="text-blue-900 hover:text-blue-700">About</a>
          <button className="bg-pink-400 text-white px-4 py-2 rounded-lg hover:bg-pink-500 transition">
            Get Started
          </button>
        </div>
      </nav>
  )
}

export default Navbar