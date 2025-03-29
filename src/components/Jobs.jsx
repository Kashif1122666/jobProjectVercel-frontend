import React, { useEffect, useState } from 'react'
import Navbar from './ui/shared/Navbar';
import FilterCards from './FilterCards';
import Job from './Job';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion' 
const Jobs = () => {
    // const jobArray = [1,2,3,4,5,6,7,8];  // dummy
    const {allJobs,searchedQuery} = useSelector(store=>store.job);
    const [filterJobs,setFilterJobs] = useState(allJobs);
    

    useEffect(()=>{
          if(searchedQuery){
                 const filteredJobs = allJobs.filter((job) => {
                    return job.title.toLowerCase().includes(searchedQuery.toLowerCase()) || 
                    job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.location.toLowerCase().includes(searchedQuery.toLowerCase()) 
                    job.salary.includes(searchedQuery)
                 })
                 setFilterJobs(filteredJobs)
          }else{
            setFilterJobs(allJobs)
          }
    },[allJobs,searchedQuery]);
  return (
    <div>
        <Navbar/>
        <div className='max-w-7xl mx-auto mt-5'>
        <div className='flex gap-5'>
            <div className='w-20%'>
        <FilterCards/>
            </div>
        {
            filterJobs.length <= 0 ? (<span>No job yet</span>) :(
            <div className='flex-1 h-[88vh] overflow-y-auto pb-5'>
                <div className='grid  grid-cols-3 gap-4'>
                {filterJobs.map((job)=> (
                    <motion.div key={job?._id}
                         initial={{opacity:0,x:100}}
                         animate={{opacity:1,x:0}}
                         exit={{opacity:0,x:-100}}
                         transition={{duration:0.9}}
                    >
                        <Job job={job} />
                    </motion.div>
                ))}
                </div>
            </div>
            )
        }
        </div>
        </div>
    </div>
  )
}

export default Jobs;