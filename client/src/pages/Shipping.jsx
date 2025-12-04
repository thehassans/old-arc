import React from 'react';
import { motion } from 'framer-motion';
import { Truck, Package, RotateCcw, Clock, Globe, Shield } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Shipping = () => {
    const { isDark } = useTheme();

    const shippingOptions = [
        { icon: Truck, title: 'Standard Delivery', time: '2-3 Business Days', price: 'Free over £80 / £4.99', description: 'Reliable tracked delivery for all UK orders.' },
        { icon: Clock, title: 'Express Delivery', time: 'Next Business Day', price: '£9.99', description: 'Order before 2PM for next day delivery.' },
        { icon: Globe, title: 'International', time: '5-10 Business Days', price: 'From £14.99', description: 'We ship to over 100 countries worldwide.' },
    ];

    return (
        <div className="pt-24 pb-20 min-h-screen" style={{ backgroundColor: isDark ? '#0a0a0f' : '#fafafa' }}>
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6" style={{ background: 'linear-gradient(135deg, #a855f7, #22d3ee)' }}>
                        <Truck size={32} color="white" />
                    </div>
                    <h1 className="text-4xl font-bold mb-4" style={{ color: isDark ? '#fff' : '#0a0a0f' }}>Shipping & Returns</h1>
                    <p style={{ color: isDark ? '#8b8b9e' : '#64748b' }}>Everything you need to know about delivery and our return policy.</p>
                </motion.div>

                {/* Shipping Options */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-12">
                    <h2 className="text-2xl font-bold mb-6" style={{ color: isDark ? '#fff' : '#0a0a0f' }}>Shipping Options</h2>
                    <div className="grid md:grid-cols-3 gap-4">
                        {shippingOptions.map((option, i) => (
                            <div key={i} className="p-6 rounded-xl" style={{ backgroundColor: isDark ? '#12121a' : '#fff', border: `1px solid ${isDark ? 'rgba(168,85,247,0.1)' : 'rgba(0,0,0,0.1)'}` }}>
                                <option.icon size={28} style={{ color: '#a855f7' }} className="mb-4" />
                                <h3 className="font-semibold mb-1" style={{ color: isDark ? '#fff' : '#0a0a0f' }}>{option.title}</h3>
                                <p className="text-sm mb-2" style={{ color: '#22d3ee' }}>{option.time}</p>
                                <p className="font-bold mb-2" style={{ color: isDark ? '#fff' : '#0a0a0f' }}>{option.price}</p>
                                <p className="text-sm" style={{ color: isDark ? '#8b8b9e' : '#64748b' }}>{option.description}</p>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Delivery Information */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-12 p-6 rounded-xl" style={{ backgroundColor: isDark ? '#12121a' : '#fff', border: `1px solid ${isDark ? 'rgba(168,85,247,0.1)' : 'rgba(0,0,0,0.1)'}` }}>
                    <h2 className="text-2xl font-bold mb-4" style={{ color: isDark ? '#fff' : '#0a0a0f' }}>Delivery Information</h2>
                    <div className="space-y-4" style={{ color: isDark ? '#8b8b9e' : '#64748b' }}>
                        <p>All orders are processed within 1 business day. Orders placed on weekends or holidays will be processed the next business day.</p>
                        <p>Once your order ships, you'll receive an email with tracking information. You can track your package directly on our website or through the carrier's website.</p>
                        <p>Please ensure your delivery address is correct and complete. We are not responsible for packages delivered to incorrect addresses provided by the customer.</p>
                        <p><strong style={{ color: isDark ? '#fff' : '#0a0a0f' }}>Free Shipping:</strong> Enjoy free standard delivery on all UK orders over £80.</p>
                    </div>
                </motion.div>

                {/* Returns Policy */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mb-12">
                    <h2 className="text-2xl font-bold mb-6" style={{ color: isDark ? '#fff' : '#0a0a0f' }}>Returns Policy</h2>
                    
                    <div className="grid md:grid-cols-2 gap-4 mb-6">
                        <div className="p-6 rounded-xl" style={{ backgroundColor: isDark ? '#12121a' : '#fff', border: `1px solid ${isDark ? 'rgba(168,85,247,0.1)' : 'rgba(0,0,0,0.1)'}` }}>
                            <RotateCcw size={28} style={{ color: '#22d3ee' }} className="mb-4" />
                            <h3 className="font-semibold mb-2" style={{ color: isDark ? '#fff' : '#0a0a0f' }}>30-Day Returns</h3>
                            <p style={{ color: isDark ? '#8b8b9e' : '#64748b' }}>Not satisfied? Return any unused item in original packaging within 30 days for a full refund.</p>
                        </div>
                        <div className="p-6 rounded-xl" style={{ backgroundColor: isDark ? '#12121a' : '#fff', border: `1px solid ${isDark ? 'rgba(168,85,247,0.1)' : 'rgba(0,0,0,0.1)'}` }}>
                            <Shield size={28} style={{ color: '#22d3ee' }} className="mb-4" />
                            <h3 className="font-semibold mb-2" style={{ color: isDark ? '#fff' : '#0a0a0f' }}>Damaged Items</h3>
                            <p style={{ color: isDark ? '#8b8b9e' : '#64748b' }}>Received a damaged or defective item? We'll replace it or refund you at no extra cost.</p>
                        </div>
                    </div>

                    <div className="p-6 rounded-xl" style={{ backgroundColor: isDark ? '#12121a' : '#fff', border: `1px solid ${isDark ? 'rgba(168,85,247,0.1)' : 'rgba(0,0,0,0.1)'}` }}>
                        <h3 className="font-semibold mb-4" style={{ color: isDark ? '#fff' : '#0a0a0f' }}>How to Return</h3>
                        <ol className="space-y-3" style={{ color: isDark ? '#8b8b9e' : '#64748b' }}>
                            <li><span style={{ color: '#a855f7' }} className="font-bold">1.</span> Contact our support team at hello@old-arcade.com with your order number.</li>
                            <li><span style={{ color: '#a855f7' }} className="font-bold">2.</span> We'll provide a prepaid return label (for eligible returns).</li>
                            <li><span style={{ color: '#a855f7' }} className="font-bold">3.</span> Pack the item securely in its original packaging.</li>
                            <li><span style={{ color: '#a855f7' }} className="font-bold">4.</span> Drop off at your nearest collection point.</li>
                            <li><span style={{ color: '#a855f7' }} className="font-bold">5.</span> Refund processed within 5-7 business days of receiving the return.</li>
                        </ol>
                    </div>
                </motion.div>

                {/* Contact */}
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="text-center p-6 rounded-xl" style={{ backgroundColor: isDark ? '#12121a' : '#fff', border: `1px solid ${isDark ? 'rgba(168,85,247,0.1)' : 'rgba(0,0,0,0.1)'}` }}>
                    <Package size={32} style={{ color: '#a855f7' }} className="mx-auto mb-4" />
                    <h3 className="font-semibold mb-2" style={{ color: isDark ? '#fff' : '#0a0a0f' }}>Need Help?</h3>
                    <p className="mb-4" style={{ color: isDark ? '#8b8b9e' : '#64748b' }}>Our customer service team is here to help with any shipping or return questions.</p>
                    <a href="/contact" className="inline-block px-6 py-3 rounded-lg font-semibold text-white" style={{ background: 'linear-gradient(135deg, #a855f7, #22d3ee)' }}>Contact Support</a>
                </motion.div>
            </div>
        </div>
    );
};

export default Shipping;
