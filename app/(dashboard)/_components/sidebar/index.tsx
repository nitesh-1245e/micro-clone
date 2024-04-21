import React from 'react'
import NewButton from './NewButton'
import List from './List'

const Sidebar = () => {
  return (
    <aside  className=' text-white fixed z-[1] left-0 bg-blue-900 flex flex-col   gap-y-4 p-3 h-full w-[60px]  ' >
        <List/>
    <NewButton/>
        </aside>
  )
}

export default Sidebar