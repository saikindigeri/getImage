'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { PhotoIcon, SparklesIcon, ArrowDownTrayIcon } from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';
import { Cover } from '@/components/ui/cover';
import { bricolage_grotesque } from '@/app/utils/font';

const HeroSection = () => {
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
        setPrompt('');
      } else {
        throw new Error(data.error || 'Failed to generate image');
      }
    } catch (err) {
      console.log(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !loading) {
      e.preventDefault(); // Prevent form submission or line break
      handleGenerateImage();
    }
  };
  const handleDownloadImage = () => {
    if (imageSrc) {
      const link = document.createElement('a');
      link.href = imageSrc;
      link.download = 'generated-image.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div
      id="hero"
      className="min-h-[100svh] pt-[80px] sm:pt-[100px] p-4 bg-gray-100 dark:bg-gray-900 transition-colors duration-300 flex items-start sm:items-center justify-center relative overflow-hidden"
    >
      {/* Background Effects */}
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
      </div>

      <div className="max-w-6xl w-full flex flex-col gap-8 relative z-10 md:flex-row">
        {/* Left Side: Content */}
        <div className="flex-1 flex flex-col justify-center space-y-6">
          <div className="space-y-4">
            <h1
              className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-purple-800 dark:via-white dark:to-white`}
            >
              Create stunning images with a{' '}
              <Cover className={`${bricolage_grotesque}`}>simple prompt</Cover>
            </h1>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300">
              Transform your ideas into beautiful, high-quality images in seconds. Our AI understands your vision and brings it to life with exceptional detail.
            </p>
          </div>

          {/* Input and Button */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative w-full sm:flex-1"
            >
              <input
                type="text"
                placeholder="Enter a prompt..."
                value={prompt}
                onKeyDown={handleKeyDown}
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
              className={`w-full sm:w-auto px-6 py-3 rounded-lg text-white flex items-center justify-center gap-2 transition-all duration-300 shadow-md ${
                loading
                  ? 'bg-purple-700 cursor-not-allowed opacity-75'
                  : 'bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 hover:from-indigo-700 hover:via-purple-600 hover:to-pink-600 active:scale-95 hover:shadow-lg'
              }`}
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin w-5 h-5 rotate-30"
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
                  <PhotoIcon className="w-5 h-5" />
                  Generate
                </>
              )}
            </motion.button>

            <svg
              className="rotate-190 hidden sm:block"
              width="147"
              height="55"
              viewBox="0 0 147 55"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M131.754 0.931711C127.39 4.42275 120.448 6.14141 109.008 6.59793C105.974 6.7322 103.208 6.96044 102.912 7.12157C101.932 7.60494 102.254 8.55829 104.309 11.2974C109.102 17.6216 113.6 21.0455 117.279 21.0723L118.447 21.0991L116.756 22.6701C115.816 23.5563 113.694 25.275 112.029 26.5505C99.1526 36.2046 82.2344 43.0792 63.0336 46.3957C58.3073 47.2148 45.2426 47.2148 40.0598 46.3957C28.593 44.5965 20.2682 41.8037 8.57311 35.8689C0.489964 31.7602 -0.517063 31.5723 1.47015 34.5934C4.04817 38.4738 6.94841 40.555 15.4478 44.6368C26.4043 49.8868 33.467 52.1291 44.4504 53.888C48.9754 54.64 63.0605 54.7071 67.5989 54.0223C81.6168 51.9411 96.7089 46.8791 112.096 39.1586C113.694 38.3395 115.064 37.695 115.131 37.695C115.225 37.695 116.111 38.8094 117.118 40.1119C120.502 44.5428 124.772 47.9935 126.504 47.7384C127.027 47.6713 128.397 45.3216 132.627 37.0505C138.467 25.6778 142.106 19.3133 144.885 15.7686C146.389 13.8082 146.577  HeroSection.jsx
13.4189 146.282 12.7072C145.047 9.4176 136.99 1.36138 133.862 0.260358C133.11 0.00524382 132.788 0.0992054 131.74 0.94511L131.754 0.931711Z"
                fill="currentColor"
              />
            </svg>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="relative p-4 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-lg shadow-md overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-transparent"
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              />
              <div className="relative z-10 flex items-center gap-3">
                <motion.span
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 1 }}
                  className="text-red-500 dark:text-red-400"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </motion.span>
                <motion.p
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  className="text-sm sm:text-base font-semibold text-gray-600 dark:text-blue-300 bg-clip-text bg-gradient-to-r from-red-600 to-pink-500 dark:from-blue-400 dark:to-purple-400"
                >
                  Oops! {error}
                </motion.p>
              </div>
              <motion.div
                className="absolute inset-0 border border-purple-500/50 rounded-lg"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              />
            </motion.div>
          )}
        </div>

        {/* Right Side: Image or Placeholder */}
        <div className="flex-1 flex items-center justify-center w-full">
          {imageSrc ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-md relative"
            >
              <Image
                width={400}
                height={500}
                src={imageSrc}
                alt="Generated"
                className="rounded-lg shadow-xl object-cover w-full h-auto"
              />
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.5 }}
                onClick={handleDownloadImage}
                className="absolute bottom-4 right-4 px-4 py-2 bg-gradient-to-r from-red-600 to-yellow-500 text-white rounded-lg font-semibold text-sm flex items-center gap-2 hover:from-yellow-600 hover:to-red-600 transition-all duration-300 shadow-md hover:shadow-lg active:scale-95"
              >
                <ArrowDownTrayIcon className="w-5 h-5" />
              </motion.button>
            </motion.div>
          ) : (
            <div className="w-full max-w-md h-[400px] sm:h-[500px] flex flex-col items-center justify-center border from-indigo-500/20 via-purple-500/20 to-pink-500/20 rounded-lg shadow-md backdrop-blur-sm text-center p-6">
              <SparklesIcon className="w-12 h-12 text-purple-600 dark:text-purple-500 mb-4" />
              <h3 className="text-lg sm:text-xl font-semibold text-gray-700 dark:text-gray-200">
                Your Image is Here
              </h3>
              <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mt-2">
                Enter a prompt and click Generate to see your creation come to life!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;