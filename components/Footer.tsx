'use client';

import { bricolage_grotesque, inter } from '@/app/utils/font';
import React from 'react';
import { motion } from 'framer-motion';
import { FaTwitter, FaInstagram } from 'react-icons/fa'; // Importing Twitter and Instagram icons from react-icons
import Link from 'next/link';

// Footer Links Data
const footerLinks = [
  {
    title: 'Company',
    links: [
      { name: 'About Us', href: '#' },
      { name: 'Careers', href: '#' },
      { name: 'Contact', href: '#' },
    ],
  },
  {
    title: 'Product',
    links: [
      { name: 'Features', href: '#features' },
      { name: 'Pricing', href: '#pricing' },
      { name: 'Documentation', href: '#' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { name: 'Terms of Service', href: '#' },
      { name: 'Privacy Policy', href: '#' },
      { name: 'Cookie Policy', href: '#' },
    ],
  },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const twitterHandle = '@Devaa_Sai'; 

  return (
    <footer className={`${bricolage_grotesque} py-8 px-4 sm:px-6 relative overflow-hidden bg-gray-100 dark:bg-gray-900`}>
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Brand Section */}
          <div className="flex flex-col items-start">
            <h3 className="text-2xl font-semibold tracking-tight mb-3 text-gray-900 dark:text-white">
              Imagify
            </h3>
            <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
              Empowering creativity with cutting-edge AI image generation.
            </p>
          </div>

          {/* Navigation Links */}
          {footerLinks.map((section, index) => (
            <div key={index} className="flex flex-col">
              <h4 className={`${inter} text-lg font-medium mb-2 text-gray-900 dark:text-white`}>{section.title}</h4>
              <ul className="space-y-1">
                {section.links.map((link, idx) => (
                  <li key={idx}>
                    <a
                      href={link.href}
                      className={`${inter} text-sm text-gray-400 hover:text-purple-500 dark:hover:text-purple-400 transition-colors duration-200`}
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <hr className="my-6 border-gray-200 dark:border-gray-700" />

        {/* Copyright, Social Icons, and Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-600 dark:text-gray-300 gap-4 md:gap-0">
          {/* Left Section: Copyright and Imagify */}
          <div className="flex items-center space-x-2">
            <p>© {currentYear}</p>
            <Link
              href="#hero"
              className=" hover:underline font-medium"
            >
              Imagify
            </Link>
            <p>All rights reserved.</p>
          </div>

          {/* Right Section: Twitter Username, Social Icons, and Links */}
          <div className="flex flex-col md:flex-row items-center space-y-3 md:space-y-0 md:space-x-6">
            {/* Twitter Username */}
            <p className="flex items-center space-x-2">
              <span>Follow us on</span>
             
            </p>

            {/* Social Icons */}
            <div className="flex items-center space-x-4">
              <motion.a
                href={`https://twitter.com/${twitterHandle.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: 5 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="text-gray-400 hover:text-purple-500 dark:hover:text-purple-400"
              >
                <FaTwitter className="w-5 h-5" />
                <span className="sr-only">Twitter</span>
              </motion.a>

              <motion.a
                href="https://instagram.com/sai.kindigeri" // Replace with your Instagram handle
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: 5 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="text-gray-400 hover:text-purple-500 dark:hover:text-purple-400"
              >
                <FaInstagram className="w-5 h-5" />
                <span className="sr-only">Instagram</span>
              </motion.a>
            </div>

            {/* Footer Links */}
            <div className="flex items-center space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-purple-500 dark:hover:text-purple-400 transition-colors duration-200"
              >
                Terms
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-purple-500 dark:hover:text-purple-400 transition-colors duration-200"
              >
                Privacy
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-purple-500 dark:hover:text-purple-400 transition-colors duration-200"
              >
                Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;