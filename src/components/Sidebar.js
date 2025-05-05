import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.webp';

// icons
import { MdMenuOpen } from "react-icons/md";
import { MdLibraryAdd } from "react-icons/md";
import { FaSignOutAlt } from "react-icons/fa";
import { MdOutlineDashboard } from "react-icons/md";
import { FaUbuntu } from 'react-icons/fa';

const menuItems = [
  {
    icons: <MdOutlineDashboard size={30} />,
    label: 'Dashboard',
    path: '/'
  },
  {
    icons: <MdLibraryAdd size={30} />,
    label: 'Add',
    path: '/add-record'
  },
  {
    icons: <FaUbuntu size={30} />,
    label: 'Admin',
    path: '/admin'
  }
]

export default function Sidebar({ onLogout }) {

  const [open, setOpen] = useState(false)
  const navigate = useNavigate();

  return (
    <nav className={`shadow-md h-screen sm:p-0 md:p2 flex flex-col duration-500 bg-blue-600 text-white ${open ? 'w-60' : 'w-10'}`}>

      {/* Header */}
      <div className=' px-1 py-2 h-20 flex justify-between items-center'>
        <img src={logo} alt="Logo" className={`${open ? 'w-20 bg-white p-2' : 'w-0'} rounded-md`} />
        <div><MdMenuOpen size={34} className={` duration-500 cursor-pointer  ${!open && ' rotate-180'}`} onClick={() => setOpen(!open)} /></div>
      </div>

      {/* Body */}

      <ul className='flex-1'>
        {
          menuItems.map((item, index) => {
            return (
              <li key={index}
              className='px-1 py-2 my-2 hover:bg-blue-800 rounded-md duration-300 cursor-pointer flex gap-2 items-center relative group'
              onClick={() => navigate(item.path)}
              >
                <div>{item.icons}</div>
                <p className={`${!open && 'w-0 translate-x-24'} duration-500 overflow-hidden`}>{item.label}</p>
                <p className={`${open && 'hidden'} absolute left-32 shadow-md rounded-md
                 w-0 p-0 text-black bg-white duration-100 overflow-hidden group-hover:w-fit group-hover:p-2 group-hover:left-16
                `}>{item.label}</p>
              </li>
            )
          })
        }
      </ul>
      {/* Footer with Logout */}
      <div className='flex items-center gap-2 px-1 py-4 mt-auto hover:bg-blue-800 rounded-md cursor-pointer' onClick={onLogout}>
        <div><FaSignOutAlt size={30} /> </div>
        <p className={`${!open && 'w-0 translate-x-24'} duration-500 overflow-hidden`}>Logout</p>
        <p className={`${open && 'hidden'} absolute left-32 shadow-md rounded-md
                 w-0 p-0 text-black bg-white duration-100 overflow-hidden group-hover:w-fit group-hover:p-2 group-hover:left-16`}>Logout</p>
      </div>


    </nav>
  )
}
