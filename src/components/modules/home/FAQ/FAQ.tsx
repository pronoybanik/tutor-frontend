"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const faqData = [
  {
    category: "Tutoring",
    questions: [
      {
        question: "How do I find a tutor?",
        answer: "You can search for tutors using filters like subject, experience, and rating on our platform.",
      },
      {
        question: "Can I schedule a session in advance?",
        answer: "Yes, you can book a session in advance by selecting a time slot that works for you.",
      },
    ],
  },
  {
    category: "Payments",
    questions: [
      {
        question: "How are payments processed?",
        answer: "Payments are securely processed through Stripe or SSLCommerz. You can pay using cards or digital wallets.",
      },
      {
        question: "Can I get a refund if I cancel a session?",
        answer: "Refund policies vary. Please check the terms before booking a session.",
      },
    ],
  },
  {
    category: "Account Management",
    questions: [
      {
        question: "How do I reset my password?",
        answer: "Go to the login page and click 'Forgot Password' to receive a reset link via email.",
      },
      {
        question: "Can I change my registered email?",
        answer: "Yes, you can update your email from the account settings page.",
      },
    ],
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 mt-16">
      <h2 className="text-3xl font-bold text-center mb-8 py-4">Frequently Asked Questions</h2>

      {faqData.map((section, sectionIndex) => (
        <div key={sectionIndex} className="mb-6">
          <h3 className="text-xl font-semibold border-b pb-2">{section.category}</h3>

          {section.questions.map((faq, index) => {
            const isOpen = openIndex === sectionIndex * 10 + index;
            return (
              <div key={index} className="border rounded-lg my-3">
                <button
                  onClick={() => toggleFAQ(sectionIndex * 10 + index)}
                  className="w-full flex justify-between items-center p-4 text-left text-lg font-medium focus:outline-none"
                >
                  {faq.question}
                  <span className="text-gray-500">{isOpen ? "−" : "+"}</span>
                </button>

                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="p-4 text-gray-600"
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default FAQ;
