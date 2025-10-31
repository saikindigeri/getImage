
/* eslint-disable */
'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {  Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { inter, instrument } from '@/app/utils/font';
import { ArrowDownTrayIcon, PhotoIcon } from '@heroicons/react/24/outline';

const HeroSection = () => {
  const [prompt, setPrompt] = useState('');
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateImage = async () => {
    if (!prompt.trim()) return;
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
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !loading && prompt.trim()) {
      e.preventDefault();
      handleGenerateImage();
    }
  };

  const handleDownload = () => {
    if (!imageSrc) return;
    const link = document.createElement('a');
    link.href = imageSrc;
    link.download = 'imagify-generated.png';
    link.click();
  };

  return (
    <section
      id="hero"
      className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-black flex items-center justify-center relative overflow-hidden"
    >
      {/* Animated Background Blob */}
      <motion.div
        className="absolute inset-0 -z-10"
        animate={{
          background: [
            'radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.15) 0%, transparent 50%)',
            'radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.15) 0%, transparent 50%)',
            'radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.15) 0%, transparent 50%)',
          ],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
      />

      <div className="max-w-7xl w-full grid md:grid-cols-2 gap-8 lg:gap-12 items-center">

        {/* Left: Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="space-y-4">
         
            <h1 className={`${inter} text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-white`}>
              Create stunning images with a{' '}
              <span className="bg-gradient-to-r from-red-600 via-purple-700 to-black dark:to-yellow-400 bg-clip-text text-transparent">
                simple prompt
              </span>
            </h1>
            <p className={`${inter} text-lg text-gray-600 dark:text-gray-400`}>
              Transform your ideas into beautiful, high-quality images in seconds. Our AI understands your vision and brings it to life with exceptional detail.
            </p>
          </div>

          {/* Input + CTA */}
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder="A futuristic city at sunset..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={loading}
              className="flex-1 px-5 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all disabled:opacity-75"
            />
            <button
              onClick={handleGenerateImage}
              disabled={loading || !prompt.trim()}
              className="px-6 py-3 bg-orange-600 text-white font-medium rounded-xl flex items-center justify-center gap-2 hover:bg-orange-700  disabled:cursor-not-allowed transition-all shadow-sm hover:shadow-md active:scale-95"
            >
              {loading ? (
                <>
                  <motion.div
                    className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  />
                  Generating...
                </>
              ) : (
                <>    <PhotoIcon className="w-5 h-5" />
                  Generate
                </>
              )}
            </button>
          </div>

          {/* Error */}
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm text-red-600 dark:text-red-400 flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              {error}
            </motion.p>
          )}
        </motion.div>

        {/* Right: Image / Placeholder */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center"
        >
          {imageSrc ? (
            <div className="relative group">
              <Image
                src={imageSrc}
                alt="Generated AI image"
                width={500}
                height={500}
                className="rounded-2xl shadow-xl object-cover w-full max-w-md h-auto"
                priority
              />
              <button
                onClick={handleDownload}
                className="absolute bottom-4 right-4 p-3 bg-white/90-600 dark:bg-gray-900/80 backdrop-blur-sm text-gray-900 dark:text-white rounded-xl shadow-lg hover:shadow-xl transition-all opacity-0 group-hover:opacity-100"
              >
                 <ArrowDownTrayIcon className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <div className="w-full max-w-md h-96 sm:h-[500px] rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-700 flex flex-col items-center justify-center text-center p-8 bg-gray-100 dark:bg-gray-900/50">
              <Sparkles className="w-12 h-12 text-orange-600 mb-4" />
              <h3 className={`${inter.className} text-xl font-semibold text-gray-700 dark:text-gray-200`}>
                Your Image Appears Here
              </h3>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Type a prompt and hit Generate to see the magic!
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;