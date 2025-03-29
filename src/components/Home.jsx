import React, { useEffect } from 'react'
import Navbar from './ui/shared/Navbar.jsx'
import HeroSection from './HeroSection.jsx'
import CategoryCarousel from './CategoryCarousel.jsx'
import LatestJobs from './LatestJobs.jsx'
import Footer from './Footer.jsx'
import useGetAllJobs from '@/hooks/useGetAllJobs.jsx'
import { useSelector } from 'react-redux'
import store from '@/redux/store.js'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  useGetAllJobs();
  const {user} = useSelector(store=> store.auth);
  const navigate = useNavigate();
  useEffect(()=>{
    if(user?.role === "recruiter"){
          navigate('/admin/companies');
    }
  },[]);
  return (
    <div className="overflow-x-hidden">
        <Navbar/>
        <div className="px-4 sm:px-6 lg:px-8">
        <HeroSection/>
        <CategoryCarousel/>
        <LatestJobs/>
        </div>
        <Footer/>
    </div>
  )
}

export default Home