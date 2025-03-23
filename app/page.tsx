'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { PhotoIcon, SparklesIcon } from '@heroicons/react/24/solid'; // Icons
import { motion } from 'framer-motion'; // Optional animations
import { bricolage_grotesque } from './utils/font';
import { Cover } from '@/components/ui/cover';
import { HoverBorderGradient } from '@/components/ui/hover-border-gradient';

const ImageGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [imageSrc, setImageSrc] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGenerateImage = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      const data = await response.json();
      if (response.ok) {
        setImageSrc(data.imageUrl);
      } else {
        throw new Error(data.error || 'Failed to generate image');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 transition-colors duration-300">
      {/* Heading */}

     <div className='flex flex-col items-start'>
     <h1 className="text-3xl flex flex-col items-start md:text-3xl lg:text-4xl font-semibold max-w-7xl mx-auto text-center mt-6 relative z-20 py-6 bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white">
        Create stunning images with a <br />  <Cover>simple  prompt</Cover>
      </h1>
      <h1 className='flex flex-col items-start'>
      Transform your ideas into beautiful, high-quality images in seconds. <br/> Our AI understands your vision and brings it to life <br /> with exceptional detail.
      </h1>
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold  mb-6 flex items-start"
      >
        <SparklesIcon className={`w-8 h-8 mr-2 text-yellow-400 ${bricolage_grotesque}`} />
        Get Image
      </motion.h1>

     <div className='flex'>
     <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="relative w-full max-w-md mr-3"
      >
        <input
          type="text"
          placeholder="Enter a prompt..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="w-full mr-3 px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
        />
      </motion.div>

      <button className="h-12 px-6 rounded-lg text-white bg-blue-600 hover:bg-blue-700">
                  Generate
                </button>
     </div>
     </div>

      {/* Input */}
     
     
      {/* Button */}
     
     <div>


      {/* Image Display */}
      {imageSrc && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mt-8"
        >
          <Image
            width={300}
            height={400}
            src={imageSrc}
            alt="Generated"
            className="rounded-lg shadow-xl object-cover"
          />
        </motion.div>
      )}

      {/* Error Message */}
      {error && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="mt-4 text-red-500 font-medium"
        >
          {error}
        </motion.p>
      )}

</div>

    </div>
  );
};

export default ImageGenerator;