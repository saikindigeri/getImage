'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { WiLightning } from 'react-icons/wi';
import { PaintBrushIcon, ClockIcon } from '@heroicons/react/24/solid';
import { inter } from '@/app/utils/font';
import Image from 'next/image';

// Updated Features Data with vibrant descriptions
const features = [
  {
    icon: <WiLightning className="w-10 h-10 text-emerald-400" />,
    title: 'Lightning Fast',
    description: 'Generate visuals at blazing speed with our cutting-edge AI.',
    image: '/first.webp',
    gradient: 'from-emerald-500 to-teal-500',
  },
  {
    icon: <PaintBrushIcon className="w-10 h-10 text-rose-400" />,
    title: 'Creative Freedom',
    description: 'Transform your ideas into stunning art with limitless possibilities.',
    image: '/second.png',
    gradient: 'from-rose-500 to-pink-500',
  },
  {
    icon: <ClockIcon className="w-10 h-10 text-sky-400" />,
    title: 'Real-Time Results',
    description: 'See your vision come to life instantly as you create.',
    image: '/third.png',
    gradient: 'from-sky-500 to-blue-500',
  },
];

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.3, duration: 0.6, ease: 'easeOut' },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const Features = () => {
  return (
    <section
      id="features"
      className="py-20 px-4 sm:px-8   overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span
            className={`${inter} inline-flex items-center px-4 py-1.5 mb-4 text-sm font-medium text-emerald-600 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-900/30 rounded-full border border-emerald-200 dark:border-emerald-800`}
          >
            AI-Powered Innovation
          </span>
          <h1
            className={`${inter} text-3xl sm:text-4xl md:text-5xl font-bold bg-clip-text  text-black dark:text-white`}
          >
            Create Stunning Visuals
          </h1>
          <p
            className={`${inter} mt-4 text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto`}
          >
            Explore a world where your imagination is brought to life with AI-driven creativity, speed, and precision.
          </p>
          <motion.button
            className={`${inter} mt-8 px-6 py-2.5 text-base font-medium text-white bg-gradient-to-r from-violet-500 to-rose-500 rounded-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-opacity-50`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            Start Creating Now
          </motion.button>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative group bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              {/* Feature Image */}
              <div className="relative w-full h-40 sm:h-48">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  fill
                  className="object-cover  transition-transform duration-500"
                />
                <div
                  className={`absolute inset-0 opacity-0 group-hover:opacity-30 bg-gradient-to-t ${feature.gradient} transition-opacity duration-300`}
                ></div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center space-x-3">
                  {feature.icon}
                  <h3
                    className={`${inter} text-lg font-semibold text-gray-900 dark:text-white`}
                  >
                    {feature.title}
                  </h3>
                </div>
                <p
                  className={`${inter} mt-3 text-sm text-gray-500 dark:text-gray-400`}
                >
                  {feature.description}
                </p>
              </div>

              {/* Subtle Border Effect */}
              <div
                className={`absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-${feature.gradient.split(' ')[0].replace('from-', '')} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}
              ></div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;