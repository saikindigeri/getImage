'use client';

import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline'; // Icons for theme toggle

const Header = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 py-3 px-6 flex items-center justify-between
        ${isDarkMode ? 'bg-gray-900/80 text-white' : 'bg-white/80 text-gray-900'}
        backdrop-blur-lg border-b border-gray-200/50 dark:border-gray-700/50 shadow-sm transition-all duration-300`}
    >
      {/* Logo */}
      <h1 className="text-xl font-semibold tracking-tight hover:text-blue-500 transition-colors duration-200">
        Logo
      </h1>

      {/* Navigation */}
      <ul className="flex items-center space-x-8">
      <li className="text-sm font-medium hover:text-blue-500 transition-colors duration-200 cursor-pointer">
          Features
        </li>
        <li className="text-sm font-medium hover:text-blue-500 transition-colors duration-200 cursor-pointer">
          Gallery
        </li>
        <li className="text-sm font-medium hover:text-blue-500 transition-colors duration-200 cursor-pointer">
          Pricing
        </li>
        <li className="text-sm font-medium hover:text-blue-500 transition-colors duration-200 cursor-pointer">
          FAQ
        </li>
      </ul>

      {/* Right Section: Theme Toggle + Auth */}
      <div className="flex items-center space-x-4">
        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full  transition-all duration-200"
          aria-label="Toggle theme"
        >
          {isDarkMode ? (
            <SunIcon className="w-5 h-5 text-yellow-400" />
          ) : (
            <MoonIcon className="w-5 h-5 text-gray-600" />
          )}
        </button>

        {/* Authentication */}
        <SignedOut>
          <SignInButton mode="modal">
            <button className="px-4 py-1.5 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-all duration-200 active:scale-95">
              Sign In
            </button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton
            appearance={{
              elements: {
                userButtonAvatarBox: 'w-8 h-8',
                userButtonTrigger: 'hover:opacity-80 transition-opacity',
              },
            }}
          />
        </SignedIn>
      </div>
    </header>
  );
};

export default Header;