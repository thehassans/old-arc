import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ChevronDown } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const FAQ = () => {
    const { isDark } = useTheme();
    const [openIndex, setOpenIndex] = useState(null);

    const faqs = [
        {
            question: 'What payment methods do you accept?',
            answer: 'We accept all major credit and debit cards including Visa, Mastercard, and American Express. We also accept PayPal and Apple Pay for your convenience.'
        },
        {
            question: 'How long does shipping take?',
            answer: 'UK orders typically arrive within 2-3 business days with free shipping on orders over £80. Express delivery (next day) is available for an additional fee. International shipping takes 5-10 business days.'
        },
        {
            question: 'Do you ship internationally?',
            answer: 'Yes! We ship to most countries worldwide. International shipping costs are calculated at checkout based on your location. Please note that customs duties may apply for orders outside the UK.'
        },
        {
            question: 'What is your return policy?',
            answer: 'We offer a 30-day return policy for unused items in original packaging. If you\'re not completely satisfied with your purchase, you can return it for a full refund or exchange. Damaged or defective items can be returned at no cost.'
        },
        {
            question: 'Are the retro consoles pre-loaded with games?',
            answer: 'Yes! All our retro consoles come pre-loaded with thousands of classic games from the 80s and 90s. The exact number varies by model - check each product description for details.'
        },
        {
            question: 'Do your products come with a warranty?',
            answer: 'All products come with a 2-year manufacturer warranty covering defects in materials and workmanship. Extended warranty options are available at checkout.'
        },
        {
            question: 'Can I track my order?',
            answer: 'Absolutely! Once your order ships, you\'ll receive an email with tracking information. You can also track your order by logging into your account on our website.'
        },
        {
            question: 'How do I contact customer support?',
            answer: 'You can reach our customer support team via email at hello@old-arcade.com or by phone at +44 7782 260144. We\'re available Monday-Friday 9AM-6PM and Saturday 10AM-4PM.'
        },
        {
            question: 'Are the controllers wireless?',
            answer: 'Most of our controllers are wireless and use Bluetooth or 2.4GHz wireless technology. Battery life varies by model but typically ranges from 20-40 hours. Wired options are also available.'
        },
        {
            question: 'Do you offer gift cards?',
            answer: 'Yes! Digital gift cards are available in denominations of £25, £50, £100, and £150. They\'re delivered instantly via email and never expire.'
        }
    ];

    return (
        <div className="pt-24 pb-20 min-h-screen" style={{ backgroundColor: isDark ? '#0a0a0f' : '#fafafa' }}>
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6" style={{ background: 'linear-gradient(135deg, #a855f7, #22d3ee)' }}>
                        <HelpCircle size={32} color="white" />
                    </div>
                    <h1 className="text-4xl font-bold mb-4" style={{ color: isDark ? '#fff' : '#0a0a0f' }}>Frequently Asked Questions</h1>
                    <p style={{ color: isDark ? '#8b8b9e' : '#64748b' }}>Find answers to common questions about our products and services.</p>
                </motion.div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="rounded-xl overflow-hidden"
                            style={{ backgroundColor: isDark ? '#12121a' : '#fff', border: `1px solid ${isDark ? 'rgba(168,85,247,0.1)' : 'rgba(0,0,0,0.1)'}` }}
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full p-5 flex items-center justify-between text-left"
                            >
                                <span className="font-semibold pr-4" style={{ color: isDark ? '#fff' : '#0a0a0f' }}>{faq.question}</span>
                                <motion.div animate={{ rotate: openIndex === index ? 180 : 0 }} transition={{ duration: 0.2 }}>
                                    <ChevronDown size={20} style={{ color: '#a855f7' }} />
                                </motion.div>
                            </button>
                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <div className="px-5 pb-5" style={{ color: isDark ? '#8b8b9e' : '#64748b' }}>
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>

                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-12 text-center p-6 rounded-xl" style={{ backgroundColor: isDark ? '#12121a' : '#fff', border: `1px solid ${isDark ? 'rgba(168,85,247,0.1)' : 'rgba(0,0,0,0.1)'}` }}>
                    <h3 className="font-semibold mb-2" style={{ color: isDark ? '#fff' : '#0a0a0f' }}>Still have questions?</h3>
                    <p className="mb-4" style={{ color: isDark ? '#8b8b9e' : '#64748b' }}>Can't find what you're looking for? Contact our support team.</p>
                    <a href="/contact" className="inline-block px-6 py-3 rounded-lg font-semibold text-white" style={{ background: 'linear-gradient(135deg, #a855f7, #22d3ee)' }}>Contact Us</a>
                </motion.div>
            </div>
        </div>
    );
};

export default FAQ;
