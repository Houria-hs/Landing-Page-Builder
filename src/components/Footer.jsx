import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-pink-100 py-6 text-center text-blue-700">
        © {new Date().getFullYear()} LandingBuilder. All rights reserved.
    </footer>
  )
}

export default Footer