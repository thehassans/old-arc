import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Contact = () => {
    const { isDark } = useTheme();
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 3000);
        setFormData({ name: '', email: '', message: '' });
    };

    return (
        <div className="pt-24 pb-20 min-h-screen" style={{ backgroundColor: isDark ? '#0a0a0f' : '#fafafa' }}>
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6" style={{ background: 'linear-gradient(135deg, #a855f7, #22d3ee)' }}>
                        <MessageSquare size={32} color="white" />
                    </div>
                    <h1 className="text-4xl font-bold mb-4" style={{ color: isDark ? '#fff' : '#0a0a0f' }}>Contact Us</h1>
                    <p style={{ color: isDark ? '#8b8b9e' : '#64748b' }}>We'd love to hear from you. Get in touch with our team.</p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Contact Info */}
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                        <div className="p-6 rounded-xl" style={{ backgroundColor: isDark ? '#12121a' : '#fff', border: `1px solid ${isDark ? 'rgba(168,85,247,0.1)' : 'rgba(0,0,0,0.1)'}` }}>
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'rgba(168,85,247,0.1)' }}>
                                    <Phone size={24} style={{ color: '#a855f7' }} />
                                </div>
                                <div>
                                    <h3 className="font-semibold" style={{ color: isDark ? '#fff' : '#0a0a0f' }}>Phone</h3>
                                    <p style={{ color: isDark ? '#8b8b9e' : '#64748b' }}>+44 7782 260144</p>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 rounded-xl" style={{ backgroundColor: isDark ? '#12121a' : '#fff', border: `1px solid ${isDark ? 'rgba(168,85,247,0.1)' : 'rgba(0,0,0,0.1)'}` }}>
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'rgba(34,211,238,0.1)' }}>
                                    <Mail size={24} style={{ color: '#22d3ee' }} />
                                </div>
                                <div>
                                    <h3 className="font-semibold" style={{ color: isDark ? '#fff' : '#0a0a0f' }}>Email</h3>
                                    <p style={{ color: isDark ? '#8b8b9e' : '#64748b' }}>support@old-arcade.com</p>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 rounded-xl" style={{ backgroundColor: isDark ? '#12121a' : '#fff', border: `1px solid ${isDark ? 'rgba(168,85,247,0.1)' : 'rgba(0,0,0,0.1)'}` }}>
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'rgba(236,72,153,0.1)' }}>
                                    <MapPin size={24} style={{ color: '#ec4899' }} />
                                </div>
                                <div>
                                    <h3 className="font-semibold" style={{ color: isDark ? '#fff' : '#0a0a0f' }}>Address</h3>
                                    <p style={{ color: isDark ? '#8b8b9e' : '#64748b' }}>7 Llewellyn Close, Stourport-On-Severn, England, DY13 9RH</p>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 rounded-xl" style={{ backgroundColor: isDark ? '#12121a' : '#fff', border: `1px solid ${isDark ? 'rgba(168,85,247,0.1)' : 'rgba(0,0,0,0.1)'}` }}>
                            <h3 className="font-semibold mb-2" style={{ color: isDark ? '#fff' : '#0a0a0f' }}>Business Hours</h3>
                            <p style={{ color: isDark ? '#8b8b9e' : '#64748b' }}>Monday - Friday: 9:00 AM - 6:00 PM</p>
                            <p style={{ color: isDark ? '#8b8b9e' : '#64748b' }}>Saturday: 10:00 AM - 4:00 PM</p>
                            <p style={{ color: isDark ? '#8b8b9e' : '#64748b' }}>Sunday: Closed</p>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                        <form onSubmit={handleSubmit} className="p-6 rounded-xl space-y-4" style={{ backgroundColor: isDark ? '#12121a' : '#fff', border: `1px solid ${isDark ? 'rgba(168,85,247,0.1)' : 'rgba(0,0,0,0.1)'}` }}>
                            <h2 className="text-xl font-bold mb-4" style={{ color: isDark ? '#fff' : '#0a0a0f' }}>Send us a message</h2>
                            
                            {submitted && (
                                <div className="p-4 rounded-lg text-center" style={{ backgroundColor: 'rgba(34,197,94,0.1)', color: '#22c55e' }}>
                                    Message sent successfully! We'll get back to you soon.
                                </div>
                            )}

                            <div>
                                <label className="block text-sm font-medium mb-2" style={{ color: isDark ? '#8b8b9e' : '#64748b' }}>Name</label>
                                <input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-3 rounded-lg outline-none" style={{ backgroundColor: isDark ? '#0a0a0f' : '#f8fafc', border: `1px solid ${isDark ? 'rgba(168,85,247,0.2)' : 'rgba(0,0,0,0.1)'}`, color: isDark ? '#fff' : '#0a0a0f' }} placeholder="Your name" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2" style={{ color: isDark ? '#8b8b9e' : '#64748b' }}>Email</label>
                                <input type="email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-3 rounded-lg outline-none" style={{ backgroundColor: isDark ? '#0a0a0f' : '#f8fafc', border: `1px solid ${isDark ? 'rgba(168,85,247,0.2)' : 'rgba(0,0,0,0.1)'}`, color: isDark ? '#fff' : '#0a0a0f' }} placeholder="your@email.com" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2" style={{ color: isDark ? '#8b8b9e' : '#64748b' }}>Message</label>
                                <textarea required rows={5} value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} className="w-full px-4 py-3 rounded-lg outline-none resize-none" style={{ backgroundColor: isDark ? '#0a0a0f' : '#f8fafc', border: `1px solid ${isDark ? 'rgba(168,85,247,0.2)' : 'rgba(0,0,0,0.1)'}`, color: isDark ? '#fff' : '#0a0a0f' }} placeholder="How can we help you?" />
                            </div>

                            <button type="submit" className="w-full py-3 rounded-lg font-semibold text-white flex items-center justify-center gap-2" style={{ background: 'linear-gradient(135deg, #a855f7, #22d3ee)' }}>
                                <Send size={18} /> Send Message
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
