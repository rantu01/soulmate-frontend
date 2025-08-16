import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown, FaQuestionCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "How do I create a profile?",
      answer:
        "Click on 'Register' and fill in your basic details. You'll need to provide information about your background, preferences, and upload at least one clear photo. Our team verifies all profiles within 24 hours.",
    },
    {
      question: "Is my personal information safe?",
      answer:
        "Absolutely. We use bank-level encryption and never share your contact details without permission. Your phone number and email remain private until you choose to share them with a match.",
    },
    {
      question: "What's the difference between free and paid plans?",
      answer:
        "Free members can browse limited profiles and send 5 interests per month. Paid plans offer unlimited browsing, priority listing, advanced filters, and direct messaging with verified members.",
    },
    {
      question: "How does the matching algorithm work?",
      answer:
        "Our system considers your preferences, lifestyle, education, and family values to suggest compatible matches. The more details you provide, the better our suggestions become.",
    },
    {
      question: "Can I hide my profile from certain users?",
      answer:
        "Yes, premium members can use our 'Selective Visibility' feature to avoid appearing in searches of specific communities or to certain users while remaining visible to others.",
    },
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="bg-gradient-to-b from-white to-pink-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-full p-3 mb-4">
            <FaQuestionCircle className="text-2xl" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-pink-600 mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600">
            Find answers to common questions about our matrimony services
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center p-6 text-left focus:outline-none"
                aria-expanded={activeIndex === index}
                aria-controls={`faq-${index}`}
              >
                <h3 className="text-lg font-semibold text-gray-800">
                  {faq.question}
                </h3>
                <motion.div
                  animate={{ rotate: activeIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <FaChevronDown className="text-pink-500" />
                </motion.div>
              </button>

              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    id={`faq-${index}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 pt-0 text-gray-600">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-6">
            Still have questions? Our support team is happy to help!
          </p>

          <Link to="/contact">
            <button className="bg-gradient-to-r from-pink-600 to-purple-600 text-white font-semibold px-8 py-3 rounded-full hover:shadow-lg transition-all">
              Contact Support
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
