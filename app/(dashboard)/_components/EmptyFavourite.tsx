import Image from 'next/image'
import React from 'react'

const EmptyFavourite = () => {
  return (
    <div className='h-full  flex flex-col items-center justify-center  ' >
    <Image src={'/images/saly-28.png'} alt='empty'  height={140} width={140}  />    
        <h2 className=' text-2xl font-semibold mt-6  ' >
No  favourites boards 
        </h2>
        <p className='text-muted-foreground text-sm  mt-2  ' >
      Try favourite boards 
        </p>
    </div>
  )
}

export default EmptyFavourite