import React from 'react'
import { FiArrowRight } from "react-icons/fi"
import { useNavigate } from 'react-router-dom'

const HomeBanner = () => {
  const navigate = useNavigate()

  return (
    <div className="home-hero px-4 lg:px-24 flex items-center justify-center"
         style={{
           backgroundImage: `url('https://cdn.pixabay.com/photo/2024/07/01/17/11/woman-8865733_1280.png')`,
           backgroundSize: 'cover',
           minHeight: '50vh'
         }}
    >
      <div className="flex w-full flex-col md:flex-row justify-between items-center gap-12 py-4 mt-0 mb-0 ">

        {/* Left Side */}
        <div className="hero-text md:w-1/2 space-y-3 h-full">
          <h2 className="hero-title">Welcome to the</h2>
          <h2 className="hero-title">official site of</h2>
          <span className="hero-brand">Fit Flex</span>
          <p className="hero-copy">
            We're your one-stop destination for all things fitness. From booking sessions
            to purchasing products and accessing tailored workouts, we've got you covered. 
            Join us and experience the convenience of having everything you need for your fitness journey in one place!
          </p>
        </div>

         
        

      </div>
    </div>
  )
}

export default HomeBanner
