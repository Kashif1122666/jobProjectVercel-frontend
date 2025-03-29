import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { data } from 'react-router-dom'
import { Label } from '@radix-ui/react-label'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'


const FilterCards = () => {
  const [selectedValue,setSelectedValue] = useState('');
  const dispatch = useDispatch();
    const changeHandler = (value) =>{
        setSelectedValue(value);
      
    }
    const filterData = [
        {
             filterType:"Location",
             array:["Karachi","Lahore","Islamabad","Quetta","Peshawar"]
        },
        {
             filterType:"Industry",
             array:["Frontend Developer","Backend Developer","FullStack Developer"]
        },
        {
             filterType:"Salary",
             array:["0-40K","42-1Lakh","1-2Lakh","1Lakh-5Lakh"]
        },
    ];
    useEffect(()=>{
         dispatch(setSearchedQuery(selectedValue))
    },[selectedValue]);
  return (
    <div className='w-full bg-white p-3 rounded-md'>
        <h1 className='font-bold text-lg'>Filter jobs</h1>
        <hr  className='mt-3'/>
        <RadioGroup value={selectedValue} onValueChange={changeHandler}>
         {
            filterData.map((item,index)=>(
                 <div key={index}>
                    <h1 className='font-bold text-lg'>{item.filterType}</h1>
                {
                       item.array.map((item,idx)=>{
                        const itemId = `id${index}-${idx}`
                        return (
                            <div key={idx} className='flex items-center space-x-2 my-2'>
                            <RadioGroupItem value={item} id={itemId}  />
                            <Label htmlFor={itemId}>{item}</Label>
                            </div>
                        )

                       })
                }
                 </div>
            ))
         }
        </RadioGroup>
    </div>
  )
}

export default FilterCards