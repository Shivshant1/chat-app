import React from 'react'
import Searchinput from './Searchinput'
import Conversations from './Conversations'
import LogoutBtn from './LogoutBtn'

const Sidebar = () => {
  return (
    <div className='border-r border-slate-500 p-4 flex flex-col'>
        <Searchinput />
        <div className='divider px-3'></div>
        <Conversations/>
        <LogoutBtn/>
    </div>
  )
}

export default Sidebar