'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { PhotoIcon, SparklesIcon } from '@heroicons/react/24/solid'; // Icons
import { motion } from 'framer-motion'; // Optional animations
import { bricolage_grotesque } from './utils/font';
import { Cover } from '@/components/ui/cover';

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

      <h1 className="text-4xl md:text-4xl lg:text-6xl font-semibold max-w-7xl mx-auto text-center mt-6 relative z-20 py-6 bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white">
        Build amazing Images <br /> at <Cover>warp speed</Cover>
      </h1>
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold  mb-6 flex items-center"
      >
        <SparklesIcon className={`w-8 h-8 mr-2 text-yellow-400 ${bricolage_grotesque}`} />
        Get Image
      </motion.h1>

      {/* Input */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="relative w-full max-w-md "
      >
        <input
          type="text"
          placeholder="Enter a prompt..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="w-full h-[100px] px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
        />
      </motion.div>

      {/* Button */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        onClick={handleGenerateImage}
        disabled={loading}
        className={`mt-6 px-6 py-3 rounded-lg font-semibold text-white flex items-center justify-center transition-all duration-300 ${
          loading
            ? 'bg-blue-400 cursor-not-allowed'
            : 'bg-gradient-to-r from-indigo-600 via-purple-500 to-red-400 hover:bg-blue-700 active:scale-95'
        }`}
      >
        {loading ? (
          <>
            <svg
              className="animate-spin w-5 h-5 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8h8a8 8 0 01-16 0z"
              />
            </svg>
            Generating...
          </>
        ) : (
          <>
            <PhotoIcon className={`w-5 h-5  tracking-tight  mr-2 ${bricolage_grotesque}`} />
           <p className={`${bricolage_grotesque} tracking-tight `}> Generate Image</p>
          </>
        )}
      </motion.button>

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
  );
};

export default ImageGenerator;