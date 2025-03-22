'use client'

import React, { useContext } from 'react'
import { ThemeContext } from '../context/ThemeContext'
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs';

const Header = () => {
    const {isDarkMode,toggleTheme}=useContext(ThemeContext);

  return (
    <header className={`${isDarkMode?'bg-gray-300 text-black':'bg-black text-white'} rounded-sm flex justify-evenly m-4 bg-gray-90 backdrop:blur-3xl`}>
        <h1  className='p-2'>Logo</h1>
        <ul className='flex justify-evenly  '>
            <li className='p-2 '>Home</li>
            <li  className='p-2'>Blogs</li>
            <li  className='p-2'>Write</li>
            
            <button onClick={toggleTheme}>Toggle</button>
        </ul>

        <SignedOut>
              <SignInButton />
              <SignUpButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
    </header>
  )
}

export default Header