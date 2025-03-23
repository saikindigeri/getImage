'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { PhotoIcon, SparklesIcon } from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';
import { bricolage_grotesque } from './utils/font'; // Assuming this is set up
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
    <div className="min-h-screen p-6 bg-gray-100 dark:bg-gray-900 transition-colors duration-300 flex items-center justify-center">
      <div className="max-w-6xl w-full flex flex-col md:flex-row gap-8">
        {/* Left Side: Content */}
        <div className="flex-1 flex flex-col justify-center space-y-6">
          {/* Heading */}
          <div className="space-y-4">
            <h1
              className={`text-3xl md:text-4xl lg:text-5xl font-semibold bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white ${bricolage_grotesque}`}
            >
              Create stunning images with a <Cover>simple prompt</Cover>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Transform your ideas into beautiful, high-quality images in seconds. Our AI understands your vision and brings it to life with exceptional detail.
            </p>
          </div>

          {/* Input and Button */}
          <div className="flex items-center gap-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative flex-1"
            >
              <input
                type="text"
                placeholder="Enter a prompt..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              />
            </motion.div>
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              onClick={handleGenerateImage}
              disabled={loading}
              className={`px-6 py-3 rounded-lg font-semibold text-white flex items-center gap-2 transition-all duration-300 shadow-md ${
                loading
                  ? 'bg-blue-400 cursor-not-allowed opacity-75'
                  : 'bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 hover:from-indigo-700 hover:via-purple-600 hover:to-pink-600 active:scale-95 hover:shadow-lg'
              }`}
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin w-5 h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8h8a8 8 0 01-16 0z" />
                  </svg>
                  Generating...
                </>
              ) : (
                <>
                  <PhotoIcon className="w-5 h-5" />
                  Generate
                </>
              )}
            </motion.button>
          </div>

          {/* Error Message */}
          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="text-red-500 font-medium"
            >
              {error}
            </motion.p>
          )}
        </div>

        {/* Right Side: Image or Placeholder */}
        <div className="flex-1 flex items-center justify-center">
          {imageSrc ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-md"
            >
              <Image
                width={400}
                height={500}
                src={imageSrc}
                alt="Generated"
                className="rounded-lg shadow-xl object-cover w-full h-auto"
              />
            </motion.div>
          ) : (
            <div className="w-full max-w-md h-[500px] flex flex-col items-center justify-center bg-white/80 dark:bg-gray-800/80 rounded-lg shadow-md backdrop-blur-sm text-center p-6">
              <SparklesIcon className="w-12 h-12 text-gray-400 dark:text-gray-500 mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200">
                Your Image is Here
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mt-2">
                Enter a prompt and click "Generate" to see your creation come to life!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageGenerator;