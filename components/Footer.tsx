'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { inter } from '@/app/utils/font';
import { Twitter, Instagram } from 'lucide-react';
import Link from 'next/link';

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
  const twitterHandle = 'Devaa_Sai';

  return (
    <footer className="bg-gray-50 dark:bg-black py-12 px-4 sm:px-6 lg:px-8 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto">

        {/* Main Footer */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="space-y-3">
            <Link href="/" className="text-2xl font-bold text-gray-900 dark:text-white">
              GetImage
            </Link>
            <p className={`${inter.className} text-sm text-gray-600 dark:text-gray-400`}>
              Empowering creativity with cutting-edge AI image generation.
            </p>
          </div>

          {/* Links */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className={`${inter.className} text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-3`}>
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className={`${inter.className} text-sm text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-500 transition-colors`}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <hr className="border-gray-200 dark:border-gray-800" />

        {/* Bottom Bar */}
        <div className="mt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600 dark:text-gray-400 gap-4">
          {/* Copyright */}
          <p className={`${inter.className}`}>
            © {currentYear} GetImage. All rights reserved.
          </p>

          {/* Social + Links */}
          <div className="flex items-center gap-6">
            {/* Twitter */}
            <a
              href={`https://twitter.com/${twitterHandle}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-gray-600 dark:text-gray-400 hover:text-orange-600 transition-colors"
            >
              <Twitter className="w-4 h-4" />
              <span className={`${inter.className}`}>@{twitterHandle}</span>
            </a>

            {/* Instagram */}
            <motion.a
              href="https://instagram.com/sai.kindigeri"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              className="text-gray-600 dark:text-gray-400 hover:text-orange-600 transition-colors"
            >
              <Instagram className="w-5 h-5" />
              <span className="sr-only">Instagram</span>
            </motion.a>

            {/* Quick Links */}
            <div className="hidden sm:flex items-center gap-4">
              <Link href="#" className="hover:text-orange-600 transition-colors">
                Terms
              </Link>
              <Link href="#" className="hover:text-orange-600 transition-colors">
                Privacy
              </Link>
              <Link href="#" className="hover:text-orange-600 transition-colors">
                Support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;