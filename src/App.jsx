import React, { useEffect, useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Skills from './components/skill';
import Project from './components/Project';
import Education from './components/Education';
import SpeechWords from './components/Speech';
import Footer from './components/Footer';

const App = () => {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    // Create random stars
    const newStars = Array.from({ length: 100 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3,
      opacity: Math.random(),
      animationDuration: `${5 + Math.random() * 10}s`,
      animationDelay: `${Math.random() * 5}s`
    }));
    setStars(newStars);
  }, []);

  return (
    <div className='bg-[#050414] min-h-screen overflow-hidden'>
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]">
      </div>

      {/* Animated stars */}
      {stars.map(star => (
        <div
          key={star.id}
          className="absolute rounded-full bg-white animate-pulse"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            animationDuration: star.animationDuration,
            animationDelay: star.animationDelay,
          }}
        />
      ))}

      <div className='relative pt-20'>
        <Header />
        <Hero />
        <Skills />
        <Project />
        <Education />
        <SpeechWords />
        <Footer />
      </div>
    </div>
  )
}

export default App