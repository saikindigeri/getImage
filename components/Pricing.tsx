'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { inter } from '@/app/utils/font';
import { Check } from 'lucide-react';

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
    highlighted: true,
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
    buttonText: 'Contact Sales',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Pricing = () => {
  return (
    <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-black">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={`${inter.className} text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white`}>
            Simple, Transparent Pricing
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            Choose the plan that fits your creative needs.
          </p>
        </motion.div>

        {/* Pricing Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {pricingPlans.map((plan, index) => (
            <motion.article
              key={index}
              variants={cardVariants}
              className={`
                relative rounded-2xl p-8 flex flex-col
                bg-white dark:bg-gray-900
                border ${plan.highlighted ? 'border-orange-500 shadow-xl' : 'border-gray-200 dark:border-gray-800'}
                ${plan.highlighted ? 'ring-2 ring-orange-500 ring-opacity-20' : ''}
                transition-all duration-300 hover:shadow-xl
              `}
            >
              {/* Highlight Badge */}
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="inline-block px-3 py-1 text-xs font-semibold text-white bg-orange-600 rounded-full">
                    MOST POPULAR
                  </span>
                </div>
              )}

              {/* Plan Name */}
              <h3 className={`${inter.className} text-2xl font-bold text-gray-900 dark:text-white`}>
                {plan.title}
              </h3>

              {/* Price */}
              <div className="mt-4 flex items-baseline">
                <span className="text-5xl font-bold text-gray-900 dark:text-white">
                  {plan.price}
                </span>
                <span className="ml-1 text-lg text-gray-600 dark:text-gray-400">
                  {plan.period}
                </span>
              </div>

              {/* Description */}
              <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
                {plan.description}
              </p>

              {/* Features */}
              <ul className="mt-6 space-y-3 flex-1">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                    <Check className="w-5 h-5 text-orange-600 mr-2 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <button
                className={`
                  mt-8 w-full py-3 px-4 rounded-lg font-medium text-sm transition-all
                  ${plan.highlighted
                    ? 'bg-orange-600 text-white hover:bg-orange-700 shadow-md'
                    : 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100'
                  }
                `}
              >
                {plan.buttonText}
              </button>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;