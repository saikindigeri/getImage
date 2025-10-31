'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Palette, Clock } from 'lucide-react';
import { inter } from '@/app/utils/font';
import Image from 'next/image';
import { cn } from '@/lib/utils';

const features = [
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Generate visuals at blazing speed with our cutting-edge AI.',
    image: '/first.png',
  },
  {
    icon: Palette,
    title: 'Creative Freedom',
    description: 'Transform your ideas into stunning art with limitless possibilities.',
    image: '/second.png',
  },
  {
    icon: Clock,
    title: 'Real-Time Results',
    description: 'See your vision come to life instantly as you create.',
    image: '/third.png',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Features = () => {
  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-white dark:bg-black">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}

          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-3 py-1 text-xs font-medium tracking-wider text-orange-600 uppercase bg-orange-100 dark:bg-orange-900 rounded-full mb-4">
            AI-Powered Innovation
          </span>

          <h1 className={cn("text-3xl sm:text-5xl  font-bold text-gray-900 dark:text-white", inter)}>
            Create Stunning Visuals
          </h1>

          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Explore a world where your imagination is brought to life with AI-driven creativity, speed, and precision.
          </p>

          <motion.button
            className="mt-8 px-6 py-3 text-base font-medium text-white bg-black dark:bg-white dark:text-black rounded-lg shadow-sm hover:bg-orange-700 hover:shadow-md transition-all duration-200"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            Start Creating Now
          </motion.button>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"

        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.article
                key={index}
                variants={itemVariants}
                className="group relative bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-800"
              >
                {/* Image */}
                <div className="relative h-96 overflow-hidden">
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Content */}
                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-3">
                    <Icon className="w-6 h-6 text-orange-600" />
                    <h3 className={cn("text-xl font-semibold text-gray-900 dark:text-white", inter)}>
                      {feature.title}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;