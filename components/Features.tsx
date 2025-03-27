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
    icon: <WiLightning className="w-12 h-12 text-green-400 drop-shadow-glow" />,
    title: 'Lightning Fast',
    description: 'Unleash visuals at warp speed with our turbo-charged AI engine.',
    image: '/first.webp',
    gradient: 'from-green-500 to-teal-500',
  },
  {
    icon: <PaintBrushIcon className="w-12 h-12 text-purple-500 drop-shadow-glow" />,
    title: 'Creative Freedom',
    description: 'Shape your wildest dreams into breathtaking art with infinite possibilities.',
    image: '/second.png',
    gradient: 'from-purple-600 to-indigo-600',
  },
  {
    icon: <ClockIcon className="w-12 h-12 text-pink-500 drop-shadow-glow" />,
    title: 'Real-Time Results',
    description: 'Witness your imagination ignite instantly as you craft your vision.',
    image: '/third.png',
    gradient: 'from-pink-500 to-rose-500',
  },
];

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.2, duration: 0.8, ease: 'easeOut' },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
};

const Features = () => {
  return (
    <section
      id="features"
      className="py-16 px-4 sm:px-6 mb-20 bg-gradient-to-b  overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <motion.div
          className="flex flex-col items-center text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span
            className={`${inter} inline-block text-sm px-4 py-1 mb-4 bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 rounded-full border border-indigo-300 dark:border-indigo-700 shadow-md`}
          >
            AI-Powered Brilliance
          </span>
          <h1
            className={`${inter} text-4xl sm:text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-700 via-indigo-600 to-red-500 dark:from-purple-400 dark:via-red-400 dark:to-green-400`}
          >
            Unleash Epic Visuals
          </h1>
          <p
            className={`${inter} mt-4 text-lg  max-w-2xl`}
          >
            Dive into a universe where your ideas explode into stunning, AI-crafted masterpieces with unparalleled speed and creativity.
          </p>
          <motion.button
            className={`${inter} mt-6 px-8 py-3 text-lg font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full shadow-lg hover:shadow-xl`}
            whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(99, 102, 241, 0.5)' }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            Ignite Your Creativity
          </motion.button>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative group p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden transform hover:-translate-y-2 transition-all duration-300"
            >
              {/* Gradient Overlay on Hover */}
              <div
                className={`absolute inset-0 opacity-0 group-hover:opacity-20 bg-gradient-to-br ${feature.gradient} transition-opacity duration-300`}
              ></div>

              {/* Feature Image */}
              <div className="relative w-full h-48 mb-4">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Icon */}
              <div className="relative z-10 mb-4">{feature.icon}</div>

              {/* Title and Description */}
              <h3
                className={`${inter} text-xl font-semibold text-gray-900 dark:text-white relative z-10`}
              >
                {feature.title}
              </h3>
              <p
                className={`${inter} mt-2 text-sm text-gray-600 dark:text-gray-300 relative z-10`}
              >
                {feature.description}
              </p>

              {/* Glow Effect */}
              <motion.div
                className="absolute -inset-4 bg-gradient-to-r opacity-0 group-hover:opacity-40 blur-xl pointer-events-none"
                style={{ background: `linear-gradient(to right, ${feature.gradient.split(' ')[0]}, ${feature.gradient.split(' ')[2]})` }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </motion.div>    </div>
      </section>

  );
};

export default Features;