'use client';

import React, { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../app/context/ThemeContext';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { inter, instrument } from '@/app/utils/font';
import Link from 'next/link';

const navItems = [
  { name: 'Features', href: '#features' },
  { name: 'Testimonials', href: '#testimonials' },
  { name: 'Pricing', href: '#pricing' },
  { name: 'FAQ', href: '#faq' },
];

const Header = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <>
      <header
        className={`
          fixed top-0 left-0 right-0 z-50 flex items-center justify-between
          px-4 sm:px-6 lg:px-8 py-4 transition-all duration-300 border-b
          ${scrolled ? 'shadow-sm' : ''}
          ${isDarkMode ? 'bg-black text-white' : 'bg-white/90 text-gray-900'}
          backdrop-blur-md
        `}
      >
        {/* Logo */}
        <Link
          href="/"
          className={`${instrument} text-2xl font-bold tracking-tight hover:opacity-80 transition-opacity`}
        >
          GetImage
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`${inter} text-sm font-medium hover:text-orange-600 transition-colors`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Desktop Right: Theme + Auth */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
          >
            {isDarkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-gray-600" />}
          </button>

          <SignedOut>
            <SignInButton mode="modal">
              <button className="px-4 py-2 text-sm font-medium text-white bg-orange-600 rounded-lg hover:bg-orange-700 transition-colors">
                Log in
              </button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: 'w-9 h-9',
                },
              }}
            />
          </SignedIn>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 md:hidden" onClick={closeMenu} />
      )}

      {/* Mobile Menu Panel */}
      <div
        className={`
          fixed top-16 left-0 right-0 z-40 transition-transform duration-300 md:hidden
          ${mobileMenuOpen ? 'translate-y-0' : '-translate-y-full'}
          ${isDarkMode ? 'bg-gray-900' : 'bg-white'} shadow-lg
        `}
      >
        <nav className="flex flex-col p-6 space-y-4">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={closeMenu}
              className={`${inter} text-lg font-medium hover:text-orange-600 transition-colors`}
            >
              {item.name}
            </Link>
          ))}

          <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-800">
            <button
              onClick={toggleTheme}
              className="flex items-center gap-2 text-sm font-medium"
            >
              {isDarkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5" />}
              {isDarkMode ? 'Light' : 'Dark'}
            </button>

            <SignedOut>
              <SignInButton mode="modal">
                <button className="px-4 py-2 text-sm font-medium text-white bg-orange-600 rounded-lg hover:bg-orange-700 transition-colors">
                  Log in
                </button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: 'w-10 h-10',
                  },
                }}
              />
            </SignedIn>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Header;