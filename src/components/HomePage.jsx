import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { Link } from 'react-router-dom'

const HomePage = () => {
  return (
    <div className='font-sans bg-blue-50 min-h-screen flex flex-col '>
      <header className="flex-1 flex flex-col items-center justify-center text-center px-6 bg-gradient-to-b from-blue-50 to-pink-50">
        <h2 className="text-5xl font-extrabold text-blue-700 mb-4">
          Build Stunning Landing Pages
        </h2>
        <p className="text-lg text-gray-600 max-w-xl mb-6">
          A simple drag-and-drop tool to create landing pages with ease. No code, no stress.
        </p>
        <Link to="/builder">
          <button className="bg-pink-400 text-white px-6 py-3 rounded-lg text-lg hover:bg-pink-500 transition">
            Start Building
          </button>
        </Link>
      </header>


      <section id="features" className="py-16 px-8 bg-white">
        <h3 className="text-3xl font-bold text-center text-blue-700 mb-12">Features</h3>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-pink-100 p-6 rounded-xl shadow hover:shadow-lg transition">
            <h4 className="text-xl font-semibold text-blue-700 mb-2">Drag & Drop</h4>
            <p className="text-gray-600">Move elements freely and design your page visually.</p>
          </div>
          <div className="bg-blue-100 p-6 rounded-xl shadow hover:shadow-lg transition">
            <h4 className="text-xl font-semibold text-blue-700 mb-2">Customizable</h4>
            <p className="text-gray-600">Choose your colors, fonts, and layouts easily.</p>
          </div>
          <div className="bg-pink-100 p-6 rounded-xl shadow hover:shadow-lg transition">
            <h4 className="text-xl font-semibold text-blue-700 mb-2">Save & Export</h4>
            <p className="text-gray-600">Save your projects and export them as clean code.</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage