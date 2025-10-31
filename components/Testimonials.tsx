'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { inter } from '@/app/utils/font';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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
  const [index, setIndex] = useState(0);

  const handlePrev = () => {
    setIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-black">
      <div className="max-w-4xl mx-auto text-center">

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
        
          className={`${inter} text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-12`}
        >
          Loved by Creators
        </motion.h2>

        {/* Testimonial Card */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-sm border border-gray-200 dark:border-gray-800"
            >
              <div className="flex flex-col items-center">
                {/* Avatar */}
                <div className="relative w-20 h-20 mb-5 rounded-full overflow-hidden ring-4 ring-orange-500/20">
                  <Image
                    src={testimonials[index].image}
                    alt={testimonials[index].name}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </div>

                {/* Name & Role */}
                <h3 className={`${inter} text-xl font-semibold text-gray-900 dark:text-white`}>
                  {testimonials[index].name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {testimonials[index].role}
                </p>

                {/* Feedback */}
                <p className={`${inter.className} text-base text-gray-700 dark:text-gray-300 italic leading-relaxed max-w-2xl`}>
                  &ldquo;{testimonials[index].feedback}&rdquo;
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons - Hidden on mobile */}
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === index
                  ? 'w-8 bg-orange-600'
                  : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400'
              }`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;