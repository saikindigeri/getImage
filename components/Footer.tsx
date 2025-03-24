'use client';

import { bricolage_grotesque, inter } from '@/app/utils/font';
import React from 'react';

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

  return (
    <footer className={`${bricolage_grotesque} py-8 px-4 sm:px-6 relative overflow-hidden`}>
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Brand Section */}
          <div className="flex flex-col items-start">
            <h3 className="text-2xl font-semibold tracking-tight mb-3">
              Imagify
            </h3>
            <p className="text-sm leading-relaxed">
              Empowering creativity with cutting-edge AI image generation.
            </p>
          </div>

          {/* Navigation Links */}
          {footerLinks.map((section, index) => (
            <div key={index} className="flex flex-col">
              <h4 className={`${inter} text-lg font-medium mb-2`}>{section.title}</h4>
              <ul className="space-y-1">
                {section.links.map((link, idx) => (
                  <li key={idx}>
                    <a
                      href={link.href}
                      className={`${inter} text-sm  text-gray-400`}
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
        <hr className="my-6" />

        {/* Copyright and Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm">
          <p>© {currentYear} Imagify. All rights reserved.</p>
          <div className="mt-3 md:mt-0 flex space-x-4">
            <a href="#" >
              Terms
            </a>
            <a href="#" >
              Privacy
            </a>
            <a href="#" >
              Support
            </a>
          </div>
        </div>
      </div>

      {/* Subtle Background Accent (Empty) */}
      
    </footer>
  );
};

export default Footer;