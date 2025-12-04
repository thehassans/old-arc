import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, Database, Mail, Cookie } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Privacy = () => {
    const { isDark } = useTheme();

    const sections = [
        {
            icon: Database,
            title: 'Information We Collect',
            content: `We collect information you provide directly to us, including:
            • Name and contact information (email, phone, address)
            • Payment information (processed securely via our payment providers)
            • Order history and preferences
            • Communications with our customer service team
            • Account information if you create an account
            
            We also automatically collect certain information when you visit our website, including your IP address, browser type, and browsing behaviour through cookies and similar technologies.`
        },
        {
            icon: Eye,
            title: 'How We Use Your Information',
            content: `We use the information we collect to:
            • Process and fulfill your orders
            • Send order confirmations and shipping updates
            • Respond to your inquiries and provide customer support
            • Send marketing communications (with your consent)
            • Improve our website and services
            • Prevent fraud and maintain security
            • Comply with legal obligations`
        },
        {
            icon: Lock,
            title: 'Data Security',
            content: `We implement appropriate technical and organisational measures to protect your personal data against unauthorised access, alteration, disclosure, or destruction. These measures include:
            • SSL encryption for all data transmission
            • Secure payment processing through PCI-compliant providers
            • Regular security audits and updates
            • Restricted access to personal data on a need-to-know basis
            • Secure data centres with physical and electronic safeguards`
        },
        {
            icon: Shield,
            title: 'Your Rights',
            content: `Under the UK GDPR, you have the following rights:
            • Right to access your personal data
            • Right to rectify inaccurate personal data
            • Right to erasure ('right to be forgotten')
            • Right to restrict processing
            • Right to data portability
            • Right to object to processing
            • Right to withdraw consent at any time
            
            To exercise any of these rights, please contact us at hello@old-arcade.com.`
        },
        {
            icon: Cookie,
            title: 'Cookies',
            content: `We use cookies and similar tracking technologies to:
            • Remember your preferences and settings
            • Analyse site traffic and usage patterns
            • Personalise content and advertisements
            • Enable social media features
            
            You can control cookies through your browser settings. However, disabling certain cookies may affect the functionality of our website.
            
            Essential cookies are necessary for the website to function and cannot be disabled.`
        },
        {
            icon: Mail,
            title: 'Marketing Communications',
            content: `With your consent, we may send you marketing emails about new products, special offers, and events. You can unsubscribe at any time by:
            • Clicking the unsubscribe link in any marketing email
            • Updating your preferences in your account settings
            • Contacting us at hello@old-arcade.com
            
            Please note that even if you unsubscribe from marketing emails, we may still send you transactional emails related to your orders.`
        }
    ];

    return (
        <div className="pt-24 pb-20 min-h-screen" style={{ backgroundColor: isDark ? '#0a0a0f' : '#fafafa' }}>
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6" style={{ background: 'linear-gradient(135deg, #a855f7, #22d3ee)' }}>
                        <Shield size={32} color="white" />
                    </div>
                    <h1 className="text-4xl font-bold mb-4" style={{ color: isDark ? '#fff' : '#0a0a0f' }}>Privacy Policy</h1>
                    <p style={{ color: isDark ? '#8b8b9e' : '#64748b' }}>Last updated: December 2024</p>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-8 p-6 rounded-xl" style={{ backgroundColor: isDark ? '#12121a' : '#fff', border: `1px solid ${isDark ? 'rgba(168,85,247,0.1)' : 'rgba(0,0,0,0.1)'}` }}>
                    <p style={{ color: isDark ? '#8b8b9e' : '#64748b' }}>
                        At Old Arcade, we are committed to protecting your privacy and personal data. This Privacy Policy explains how we collect, use, share, and protect your information when you use our website and services.
                    </p>
                </motion.div>

                <div className="space-y-6">
                    {sections.map((section, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 + index * 0.05 }}
                            className="p-6 rounded-xl"
                            style={{ backgroundColor: isDark ? '#12121a' : '#fff', border: `1px solid ${isDark ? 'rgba(168,85,247,0.1)' : 'rgba(0,0,0,0.1)'}` }}
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <section.icon size={24} style={{ color: '#a855f7' }} />
                                <h2 className="text-xl font-bold" style={{ color: isDark ? '#fff' : '#0a0a0f' }}>{section.title}</h2>
                            </div>
                            <div style={{ color: isDark ? '#8b8b9e' : '#64748b', whiteSpace: 'pre-line' }}>
                                {section.content}
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-8 p-6 rounded-xl text-center" style={{ backgroundColor: isDark ? '#12121a' : '#fff', border: `1px solid ${isDark ? 'rgba(168,85,247,0.1)' : 'rgba(0,0,0,0.1)'}` }}>
                    <h3 className="font-semibold mb-2" style={{ color: isDark ? '#fff' : '#0a0a0f' }}>Questions About Privacy?</h3>
                    <p className="mb-4" style={{ color: isDark ? '#8b8b9e' : '#64748b' }}>If you have any questions about this Privacy Policy, please contact us.</p>
                    <a href="/contact" className="inline-block px-6 py-3 rounded-lg font-semibold text-white" style={{ background: 'linear-gradient(135deg, #a855f7, #22d3ee)' }}>Contact Us</a>
                </motion.div>
            </div>
        </div>
    );
};

export default Privacy;
