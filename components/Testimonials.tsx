'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { inter } from '@/app/utils/font';
import Image from 'next/image';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

const testimonials = [
  {
    name: 'Sai Kumar',
    role: 'Freelance Designer',
    feedback:
      'This platform has transformed the way I create visuals for my clients. The AI-generated images are stunning, and the real-time results save me hours of work!',
    image: '/saikumar.png',
  },
  {
    name: 'Deva',
    role: 'Startup Founder',
    feedback:
      'As a startup founder, I needed quick and professional designs. This tool delivered beyond my expectations with its speed and creative options.',
    image: '/deva.png',
  },
  {
    name: 'Ram',
    role: 'Marketing Manager',
    feedback:
      'The intuitive controls and powerful editing tools make this platform a game-changer for our marketing campaigns. Highly recommend it!',
    image: '/ram.png',
  },
  {
    name: 'Ravi',
    role: 'Content Creator',
    feedback:
      'I love how easy it is to generate high-quality images from simple prompts. It’s perfect for my content creation needs!',
    image: '/bhairav.png',
  },
  {
    name: 'Charan',
    role: 'Graphic Artist',
    feedback:
      'The creative freedom this platform offers is unmatched. I can turn my ideas into beautiful visuals in seconds. Amazing tool!',
    image: '/charan.png',
  },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section id="testimonials" className="py-12 mb-20 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto relative">
        {/* Section Heading */}
        <h2
          className={`${inter} text-3xl sm:text-4xl font-bold text-center mb-10`}
        >
          What Our Users Say
        </h2>

        {/* Testimonial Card with Animation */}
        <div className="flex justify-center items-center relative">
          {/* Navigation Buttons - Adjusted for Mobile */}
          <motion.button
            onClick={handlePrev}
            className="absolute left-0 sm:left-[-48px] top-1/2 transform -translate-y-1/2 p-2 sm:p-3 z-10"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
            aria-label="Previous testimonial"
          >
            <ChevronLeftIcon className="w-6 h-6 text-gray-600 dark:text-gray-300" />
          </motion.button>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-3xl p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center text-center bg-white dark:bg-gray-800"
            >
              {/* User Image */}
              <div className="relative w-20 h-20 mb-4">
                <Image
                  src={currentTestimonial.image}
                  alt={currentTestimonial.name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-full border-2 border-purple-300"
                />
              </div>

              {/* User Name and Role */}
              <h3
                className={`${inter} text-lg font-semibold text-gray-900 dark:text-white mb-1`}
              >
                {currentTestimonial.name}
              </h3>
              <p
                className={`${inter} text-sm text-gray-500 dark:text-gray-400 mb-3`}
              >
                {currentTestimonial.role}
              </p>

              {/* Feedback */}
              <p
                className={`${inter} text-sm text-gray-600 dark:text-gray-300 italic`}
              >
                &quot;{currentTestimonial.feedback}&quot;
              </p>
            </motion.div>
          </AnimatePresence>

          <motion.button
            onClick={handleNext}
            className="absolute right-0 sm:right-[-48px] top-1/2 transform -translate-y-1/2 p-2 sm:p-3 z-10"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
            aria-label="Next testimonial"
          >
            <ChevronRightIcon className="w-6 h-6 text-gray-600 dark:text-gray-300" />
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;