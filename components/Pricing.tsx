'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {  inter } from '@/app/utils/font';

// Pricing Data
const pricingPlans = [
  {
    title: 'Starter',
    price: '$5',
    period: '/month',
    description: 'Ideal for individuals beginning with AI image generation.',
    features: [
      '10 images/month',
      'Basic AI tools',
      'Standard resolution',
      'Email support',
    ],
    buttonText: 'Get Started',
    gradient: 'from-purple-600 to-blue-800',
  },
  {
    title: 'Professional',
    price: '$10',
    period: '/month',
    description: 'Designed for creators requiring enhanced capabilities.',
    features: [
      '50 images/month',
      'Advanced AI tools',
      'High resolution',
      'Priority email support',
    ],
    buttonText: 'Upgrade to Pro',
    gradient: 'from-red-700 to-gray-900',
    highlighted: true, // Highlight this plan
  },
  {
    title: 'Business',
    price: '$50',
    period: '/month',
    description: 'Tailored for teams and enterprises with extensive needs.',
    features: [
      'Unlimited images',
      'Full AI toolkit',
      '4K resolution',
      '24/7 phone & chat support',
    ],
    buttonText: 'Business ',
    gradient: 'from-teal-600 to-teal-800',
  },
];

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

const Pricing = () => {
  return (
    <section
      id="pricing"
      className="py-16 px-4 sm:px-6 bg-gradient-to-b relative overflow-hidden mb-20"
    >
      {/* Pricing Content */}
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className={`${inter} text-xl sm:text-4xl md:text-4xl font-bold text-center text-gray-800 dark:text-gray-100 mb-12 tracking-tight`}
        >
           Pricing 
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className={`p-8 rounded-xl flex flex-col items-center text-center transition-all duration-300 border ${
                plan.highlighted
                  ? 'border-gray-700 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 scale-105 shadow-xl'
                  : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 scale-102 shadow-lg'
              }`}
            >
              {/* Plan Title */}
              <h3 className={`${inter} text-2xl font-semibold text-gray-900 dark:text-white mb-4`}>
                {plan.title}
              </h3>

              {/* Price */}
              <div className={`${inter} flex items-baseline mb-4`}>
                <span className="text-5xl font-bold text-gray-900 dark:text-white">
                  {plan.price}
                </span>
                <span className="text-lg text-gray-600 dark:text-gray-400">
                  {plan.period}
                </span>
              </div>

              {/* Description */}
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
                {plan.description}
              </p>

              {/* Features List */}
              <ul className="space-y-3 mb-8 text-left w-full">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-gray-700 dark:text-gray-200 text-sm">
                    <svg
                      className="w-5 h-5 text-teal-600 dark:text-teal-400 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Button */}
              <button
                className={`px-6 py-3 rounded-lg font-medium text-white bg-gradient-to-r ${plan.gradient} transition-all duration-300 shadow-md`}
              >
                {plan.buttonText}
              </button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;