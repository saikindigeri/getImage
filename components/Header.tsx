/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import React, { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../app/context/ThemeContext';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';
import { SunIcon, MoonIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'; // Added hamburger and close icons
import { bricolage_grotesque } from '@/app/utils/font';

const Header = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for mobile menu toggle

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 py-3 px-6 flex items-center justify-between
        ${isDarkMode ? 'bg-gray-900/80 text-white' : 'bg-white/80 text-gray-900'}
        backdrop-blur-sm shadow-sm transition-all duration-300`}
    >
      {/* Logo */}
      <a
        href="#hero"
        className={`${bricolage_grotesque} text-xl font-semibold tracking-wide hover:text-blue-500 transition-colors duration-200`}
      >
        GetImage
      </a>

      {/* Hamburger Menu Button (Visible on Mobile) */}
      <button
        onClick={toggleMenu}
        className="md:hidden p-2 rounded-md focus:outline-none"
        aria-label="Toggle menu"
      >
        {isMenuOpen ? (
          <XMarkIcon className="w-6 h-6" />
        ) : (
          <Bars3Icon className="w-6 h-6" />
        )}
      </button>

      {/* Navigation (Hidden on Mobile, Visible on Larger Screens) */}
      <ul
        className={`hidden md:flex items-center space-x-8 tracking-wide`}
      >
        <li>
          <a
            href="#features"
            className="text-sm font-medium hover:text-blue-500 transition-colors duration-200 cursor-pointer"
          >
            Features
          </a>
        </li>
        <li>
          <a
            href="#testimonials"
            className="text-sm font-medium hover:text-blue-500 transition-colors duration-200 cursor-pointer"
          >
            Testimonials
          </a>
        </li>
        <li>
          <a
            href="#pricing"
            className="text-sm font-medium hover:text-blue-500 transition-colors duration-200 cursor-pointer"
          >
            Pricing
          </a>
        </li>
        <li>
          <a
            href="#FAQ"
            className="text-sm font-medium hover:text-blue-500 transition-colors duration-200 cursor-pointer"
          >
            FAQ
          </a>
        </li>
      </ul>

      {/* Mobile Menu (Visible when toggled on mobile) */}
      <div
        className={`${
          isMenuOpen ? 'flex' : 'hidden'
        } md:hidden absolute top-14 left-0 w-full bg-white dark:bg-gray-900 flex-col items-center space-y-4 py-4 shadow-md`}
      >
        <a
          href="#features"
          onClick={toggleMenu}
          className="text-sm font-medium hover:text-blue-500 transition-colors duration-200 cursor-pointer"
        >
          Features
        </a>
        <a
          href="#testimonials"
          onClick={toggleMenu}
          className="text-sm font-medium hover:text-blue-500 transition-colors duration-200 cursor-pointer"
        >
          Testimonials
        </a>
        <a
          href="#pricing"
          onClick={toggleMenu}
          className="text-sm font-medium hover:text-blue-500 transition-colors duration-200 cursor-pointer"
        >
          Pricing
        </a>
        <a
          href="#FAQ"
          onClick={toggleMenu}
          className="text-sm font-medium hover:text-blue-500 transition-colors duration-200 cursor-pointer"
        >
          FAQ
        </a>
      </div>

      {/* Right Section: Theme Toggle + Auth (Always Visible) */}
      <div className="hidden md:flex items-center space-x-4">
        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full transition-all duration-200"
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

      {/* Theme Toggle + Auth for Mobile (Visible below menu when toggled) */}
      <div
        className={`${
          isMenuOpen ? 'flex' : 'hidden'
        } md:hidden absolute top-60 left-0 w-full bg-white dark:bg-gray-900 justify-center space-x-4 py-4 shadow-md`}
      >
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full transition-all duration-200"
          aria-label="Toggle theme"
        >
          {isDarkMode ? (
            <SunIcon className="w-5 h-5 text-yellow-400" />
          ) : (
            <MoonIcon className="w-5 h-5 text-gray-600" />
          )}
        </button>
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