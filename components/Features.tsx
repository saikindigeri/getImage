'use client';

import React from 'react';
import { BoltIcon, PaintBrushIcon, ClockIcon } from '@heroicons/react/24/solid';
import { bricolage_grotesque, inter } from '@/app/utils/font';

// Features Data (Updated with dummy image placeholders)
const features = [
  {
    icon: <BoltIcon className="w-6 h-6 text-indigo-500" />,
    title: 'Lightning Fast',
    description: 'Generate high-quality images in seconds with our optimized AI engine.',
    image: 'https://via.placeholder.com/300x200?text=Lightning+Fast', // Dummy image
  },
  {
    icon: <PaintBrushIcon className="w-6 h-6 text-purple-500" />,
    title: 'Creative Freedom',
    description: 'Turn any idea into a unique masterpiece with endless customization.',
    image: 'https://via.placeholder.com/300x200?text=Creative+Freedom', // Dummy image
  },
  {
    icon: <ClockIcon className="w-6 h-6 text-pink-500" />,
    title: 'Real-Time Results',
    description: 'See your vision come to life instantly as you type your prompt.',
    image: 'https://via.placeholder.com/300x200?text=Real-Time+Results', // Dummy image
  },
];

const Features = () => {
  return (
    <section id="features" className="py-12 px-4 sm:px-6 mb-20">
      {/* Features Content */}
      <div className="max-w-6xl flex flex-col mx-auto">
        <div className="flex flex-col items-center p-2 py-2 mb-4">
          <h3 className="text-center text-sm border-purple-300 bg-indigo-100 text-black rounded-2xl w-fit px-4 py-1">
            AI-powered Image Generation
          </h3>
          <h1
            className={`${inter} leading-tight mb-2 font-semibold text-5xl text-center bg-clip-text text-transparent bg-gradient-to-r from-red-500 dark:from-purple-500 via-indigo-500 to-pink-500 `}
          >
            Create stunning visuals with AI
          </h1>
          <p className="text-center text-gray-600 mb-6">
            Our cutting-edge AI transforms your ideas into beautiful, professional-quality images with intuitive controls and powerful editing tools.
          </p>

          {/* Button */}
          <button
            className={`${inter} text-2xl px-6 py-3   rounded-lg font-bold`}
          >
           Start creating 
          </button>
        </div>

        {/* Features Grid with Images */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 flex flex-col items-center text-center"
            >
              {/* Dummy Image */}
              <img
                src={feature.image}
                alt={feature.title}
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <div className="mb-3">{feature.icon}</div>
              <h3 className={`${inter} text-lg font-medium text-gray-900 dark:text-white`}>
                {feature.title}
              </h3>
              <p className={`${inter} mt-1 text-sm text-gray-500 dark:text-gray-400`}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;