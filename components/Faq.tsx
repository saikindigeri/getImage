

'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { inter } from '@/app/utils/font';
import { Plus, Minus } from 'lucide-react';


const faqData = [
  {
    question: 'What is Imagify?',
    answer:
      'Imagify is an advanced AI-powered platform that allows users to generate high-quality images from simple text prompts, designed for creators, businesses, and individuals.',
  },
  {
    question: 'How does the pricing work?',
    answer:
      'Imagify offers three tiers: Starter ($5/month for 10 images), Professional ($10/month for 50 images), and Business ($50/month for unlimited images). Each plan includes different features tailored to your needs.',
  },
  {
    question: 'Can I cancel my subscription?',
    answer:
      'Yes, you can cancel your subscription at any time through your account settings. Your access will continue until the end of the billing period.',
  },
  {
    question: 'What kind of support do you offer?',
    answer:
      'Support varies by plan: Starter includes email support, Professional offers priority email support, and Business provides 24/7 phone and chat support.',
  },
  {
    question: 'Is there a free trial available?',
    answer:
      'Currently, Imagify does not offer a free trial, but our Starter plan is priced affordably at $5/month to get you started with minimal commitment.',
  },
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);


  const toggleFAQ = (index: number) => {

    console.log("first")

    console.log("clicked")

    setActiveIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-black">
      <div className="max-w-4xl mx-auto">

        {/* Heading – Elegant with Instrument Serif */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}

          transition={{ duration: 0.6 }}
            className={`${inter} text-3xl text-center sm:text-4xl font-bold text-gray-900 dark:text-white mb-12`}
        >
          Frequently Asked Questions
        </motion.h2>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqData.map((faq, index) => {
            const isOpen = activeIndex === index;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
 
                transition={{ delay: index * 0.1 }}
                className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Question Button */}
                <button
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                  className="w-full px-6 py-4 flex justify-between items-center text-left focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 dark:focus:ring-offset-black transition-all hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <span className={`${inter} text-base font-medium text-gray-900 dark:text-white`}>
                    {faq.question}
                  </span>
                  <span className="ml-4 flex-shrink-0">
                    {isOpen ? (
                      <Minus className="w-5 h-5 text-orange-600" />
                    ) : (
                      <Plus className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                    )}
                  </span>
                </button>

                {/* Answer – Animated */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-answer-${index}`}
                      initial={{ height: 0, opacity: 0 }}
                       animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5">
                        <p className={`${inter} text-sm text-gray-600 dark:text-gray-400 leading-relaxed`}>
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;