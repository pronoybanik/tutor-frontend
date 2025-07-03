"use client";
import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

const faqData = [
  {
    category: "Tutoring",
    icon: "👨‍🏫",
    questions: [
      {
        question: "How do I find a tutor?",
        answer: "You can search for tutors using filters like subject, experience, and rating on our platform. Our advanced matching algorithm helps you find the perfect tutor based on your specific needs and learning style.",
      },
      {
        question: "Can I schedule a session in advance?",
        answer: "Yes, you can book a session in advance by selecting a time slot that works for you. Our calendar system allows you to schedule sessions up to 30 days in advance.",
      },
    ],
  },
  {
    category: "Payments",
    icon: "💳",
    questions: [
      {
        question: "How are payments processed?",
        answer: "Payments are securely processed through Stripe or SSLCommerz. You can pay using cards or digital wallets. All transactions are encrypted and PCI compliant for your security.",
      },
      {
        question: "Can I get a refund if I cancel a session?",
        answer: "Refund policies vary based on the cancellation time. Cancellations made 24 hours before the session are eligible for a full refund. Please check the terms before booking a session.",
      },
    ],
  },
  {
    category: "Account Management",
    icon: "⚙️",
    questions: [
      {
        question: "How do I reset my password?",
        answer: "Go to the login page and click 'Forgot Password' to receive a reset link via email. The link will be valid for 24 hours for security purposes.",
      },
      {
        question: "Can I change my registered email?",
        answer: "Yes, you can update your email from the account settings page. You'll need to verify your new email address before the change takes effect.",
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
            <HelpCircle className="w-8 h-8 text-[#1dd1a1]" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about our tutoring platform. 
            Can not find what you are looking for? Contact our support team.
          </p>
        </div>

        {/* FAQ Sections */}
        <div className="space-y-8">
          {faqData.map((section, sectionIndex) => (
            <div key={sectionIndex} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
              {/* Category Header */}
              <div className="bg-gradient-to-r from-[#1dd1a1] to-[#1dd1a1] px-6 py-4">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{section.icon}</span>
                  <h2 className="text-xl font-semibold text-white">
                    {section.category}
                  </h2>
                </div>
              </div>

              {/* Questions */}
              <div className="divide-y divide-gray-100">
                {section.questions.map((faq, index) => {
                  const uniqueIndex = sectionIndex * 10 + index;
                  const isOpen = openIndex === uniqueIndex;
                  
                  return (
                    <div key={index} className="transition-all duration-200 hover:bg-gray-50">
                      <button
                        onClick={() => toggleFAQ(uniqueIndex)}
                        className="w-full flex m-1 justify-between items-center p-6 text-left focus:outline-none focus:ring-1 focus:ring-[#1dd1a1] focus:ring-inset"
                      >
                        <h3 className="text-lg font-medium text-gray-900 pr-4">
                          {faq.question}
                        </h3>
                        <div className={`flex-shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
                          <ChevronDown className="w-5 h-5 text-gray-500" />
                        </div>
                      </button>
                      
                      {isOpen && (
                        <div className="px-6 pb-6 pt-2">
                          <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-[#1dd1a1]">
                            <p className="text-gray-700 leading-relaxed">
                              {faq.answer}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

       
      </div>
    </div>
  );
};

export default FAQ;