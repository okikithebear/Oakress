import React from 'react'
import { assets } from '../assets/assets'

const Policy = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 textcenter py-20 text-xs sm:text-sm md:text-base text-gray-700'>

        <div>
            <img src={assets.exchange_icon} className='w-12 m-auto mb-5' alt='exchange'/>
            <p className='font-semibold'>Easy Exchange Policy</p>
        </div>
      
    </div>
  )
}

export default Policy
