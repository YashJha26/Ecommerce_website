import React from 'react'
import Navbar from '../components/navbar'
import Announcement from '../components/Announcement'
import Slider from '../components/Slider'
import Catagories from '../components/Catagories'
import Products from '../components/Products'
import NewLetter from '../components/NewLetter'
import Footer from '../components/Footer'
const Home = () => {
  localStorage.clear();
  return (
    <div>
      <Announcement />
      <Navbar />
      <Slider />
      <Catagories />
      <Products />
      <NewLetter />
      <Footer />
    </div>
  )
}

export default Home
