'use client';

import React, {  } from 'react';

import HeroSection from '@/components/HeroSection';
import Features from '@/components/Features';
import Pricing from '@/components/Pricing';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import Faq from '@/components/Faq';
import Testimonials from '@/components/Testimonials';

 const ImageGenerator = () => {

  return (
   <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300 relative overflow-hidden">
          <div className="absolute inset-0 z-0">
        <motion.div
          className="absolute w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 rounded-full blur-3xl"
          animate={{
            x: ['-20%', '20%'],
            y: ['-20%', '20%'],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute w-[250px] h-[250px] sm:w-[400px] sm:h-[400px] bg-gradient-to-r from-blue-500/20 via-cyan-500/20 to-teal-500/20 rounded-full blur-3xl top-1/2 left-3/4"
          animate={{
            x: ['20%', '-20%'],
            y: ['-10%', '10%'],
            scale: [1.1, 1.3, 1.1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
   <HeroSection/>
   <Features/>
   <Pricing/>
   <Testimonials/>
   <Faq/>

   <Footer/>
   </div>
  );
};

export default ImageGenerator;