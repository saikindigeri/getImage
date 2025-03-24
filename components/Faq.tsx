'use client';

import { bricolage_grotesque, inter } from '@/app/utils/font';
import React, { useState } from 'react';

// FAQ Data
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
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="FAQ" className="py-12 px-2 sm:px-6 relative overflow-hidden mb-23">
      <div className="max-w-4xl mx-auto">
        <h2 className={`${inter} text-3xl sm:text-4xl font-bold text-center mb-10`}>
          Frequently Asked Questions
        </h2>

        <div className="space-y-0 ">
          {faqData.map((faq, index) => (
            <div key={index} className="relative pb-3 border-b border-gray-300">
              {/* Question */}
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full  py-3  flex justify-between items-center"
              >
                <span className={`${inter} text-sm  font-medium`}>{faq.question}</span>
                <span className="text-sm font-medium">
                  {activeIndex === index ? '−' : '+'}
                </span>
              </button>

              {/* Answer */}
              {activeIndex === index && (
                <div className="px-6 py-4 text-sm">{faq.answer}</div>
              )}

              {/* Bottom Border Starting at a Fixed Point */}
              <div className="w-full  ml-6"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
