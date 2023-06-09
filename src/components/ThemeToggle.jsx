import React from 'react'
import {HiSun, HiMoon} from 'react-icons/hi'
import { ThemeContext } from '../context/ThemeContext'
import { useContext } from 'react'

const ThemeToggle = () => {

    const {theme, setTheme} = useContext(ThemeContext)


  return (
    <div>
        {theme==='dark' ? (
            <div className='flex items-center cursor-pointer' onClick={()=>setTheme(theme==='dark'?'light':'dark')}><HiSun className='text-primary text-2xl mr-2'/> Light</div>
        ):(
            <div className='flex items-center cursor-pointer' onClick={()=>setTheme(theme==='dark'?'light':'dark')}><HiMoon className='text-primary text-2xl mr-2'/> Dark</div>
        )}
    </div>
  )
}

export default ThemeToggle