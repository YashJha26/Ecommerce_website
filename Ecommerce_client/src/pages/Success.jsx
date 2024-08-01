import React from 'react'
import { useLocation } from 'react-router-dom'
import Footer from '../components/Footer'

const Success = () => {
    const location=useLocation();
    console.log(location);
  return (
    <div>
      Success
      <Footer />
    </div>
  )
}

export default Success
