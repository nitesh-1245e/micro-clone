import React from 'react'
import Image from 'next/image'



const Loading = () => {
  return (
    <div className='h-full w-full flex flex-col gap-y-4  justify-center items-center  '  >
<Image src={'/images/logoipsum-289.svg'} alt='Logo' width={300} height={300} className='animate-pulse duration-700 ' />
    </div>
  )
}

export default Loading