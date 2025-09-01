import React from 'react'
import HeroSection from '../components/HeroSection'
import BentoGrid from '../components/BentoGrid'
import Footer from '../components/Footer'
import CallToAction from '../components/CallToAction'
const Home = () => {
  return (
    <div className='px-15'>
      <HeroSection />
      <BentoGrid />
      <CallToAction />
    </div>
       
  )
}

export default Home