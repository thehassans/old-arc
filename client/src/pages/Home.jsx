import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import { useTheme } from '../context/ThemeContext';
import { Zap, Shield, Truck, Award, ArrowRight, Sparkles } from 'lucide-react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || '';

const Home = () => {
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { isDark } = useTheme();

    const features = [
        { icon: Zap, title: 'Fast Shipping', desc: '2-3 day delivery', color: '#a855f7' },
        { icon: Shield, title: '2 Year Warranty', desc: 'Full coverage', color: '#22d3ee' },
        { icon: Truck, title: 'Free Returns', desc: '30-day policy', color: '#ec4899' },
        { icon: Award, title: 'Authentic Only', desc: '100% genuine', color: '#f59e0b' },
    ];

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${API_URL}/api/stripe/products`);
                // Get first 4 products for featured section
                setFeaturedProducts(response.data.slice(0, 4));
            } catch (error) {
                console.error('Failed to fetch products:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    return (
        <div style={{ backgroundColor: isDark ? '#0a0a0f' : '#fafafa' }}>
            <Hero />

            {/* Features Bar */}
            <section 
                className="py-8 relative overflow-hidden"
                style={{ 
                    backgroundColor: isDark ? '#12121a' : '#ffffff',
                    borderTop: `1px solid ${isDark ? 'rgba(168,85,247,0.1)' : 'rgba(0,0,0,0.05)'}`,
                    borderBottom: `1px solid ${isDark ? 'rgba(168,85,247,0.1)' : 'rgba(0,0,0,0.05)'}`
                }}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {features.map((feature, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="flex items-center gap-4 py-4"
                            >
                                <div 
                                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                                    style={{
                                        backgroundColor: `${feature.color}15`,
                                    }}
                                >
                                    <feature.icon size={22} style={{ color: feature.color }} />
                                </div>
                                <div>
                                    <div className="font-bold text-sm" style={{ color: isDark ? '#ffffff' : '#0a0a0f' }}>
                                        {feature.title}
                                    </div>
                                    <div className="text-xs" style={{ color: isDark ? '#8b8b9e' : '#64748b' }}>
                                        {feature.desc}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Products */}
            <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <motion.div 
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <span 
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-4"
                        style={{
                            backgroundColor: isDark ? 'rgba(168,85,247,0.1)' : 'rgba(124,58,237,0.1)',
                            color: '#a855f7'
                        }}
                    >
                        <Sparkles size={16} />
                        Handpicked For You
                    </span>
                    <h2 
                        className="text-4xl md:text-5xl font-display font-black mb-6"
                        style={{ color: isDark ? '#ffffff' : '#0a0a0f' }}
                    >
                        Featured <span style={{
                            background: 'linear-gradient(135deg, #a855f7, #22d3ee)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text'
                        }}>Collection</span>
                    </h2>
                    <p 
                        className="max-w-2xl mx-auto text-lg"
                        style={{ color: isDark ? '#8b8b9e' : '#64748b' }}
                    >
                        Premium gaming gear selected by enthusiasts, for enthusiasts.
                    </p>
                </motion.div>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-12 h-12 rounded-full border-2 border-t-transparent"
                            style={{ borderColor: '#a855f7', borderTopColor: 'transparent' }}
                        />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {featuredProducts.map((product, i) => (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <ProductCard product={product} />
                            </motion.div>
                        ))}
                    </div>
                )}

                <motion.div 
                    className="text-center mt-12"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    <Link to="/shop" className="btn-secondary inline-flex items-center gap-2">
                        View All Products
                        <ArrowRight size={18} />
                    </Link>
                </motion.div>
            </section>

            {/* Newsletter Section */}
            <section className="py-24 relative overflow-hidden">
                {/* Background Effects */}
                <div 
                    className="absolute inset-0"
                    style={{
                        background: isDark 
                            ? 'linear-gradient(135deg, rgba(168,85,247,0.1) 0%, rgba(34,211,238,0.05) 50%, rgba(236,72,153,0.1) 100%)'
                            : 'linear-gradient(135deg, rgba(124,58,237,0.08) 0%, rgba(8,145,178,0.05) 50%, rgba(219,39,119,0.08) 100%)'
                    }}
                />
                <motion.div
                    animate={{ 
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3]
                    }}
                    transition={{ duration: 8, repeat: Infinity }}
                    className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl pointer-events-none"
                    style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.3) 0%, transparent 70%)' }}
                />

                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center rounded-3xl p-12 md:p-16"
                        style={{
                            backgroundColor: isDark ? 'rgba(18,18,26,0.8)' : 'rgba(255,255,255,0.9)',
                            backdropFilter: 'blur(20px)',
                            border: `1px solid ${isDark ? 'rgba(168,85,247,0.2)' : 'rgba(0,0,0,0.05)'}`,
                            boxShadow: isDark 
                                ? '0 25px 50px -12px rgba(0,0,0,0.5)' 
                                : '0 25px 50px -12px rgba(0,0,0,0.1)'
                        }}
                    >
                        <span 
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-6"
                            style={{
                                backgroundColor: isDark ? 'rgba(34,211,238,0.1)' : 'rgba(8,145,178,0.1)',
                                color: '#22d3ee'
                            }}
                        >
                            <Zap size={16} />
                            Exclusive Access
                        </span>
                        
                        <h2 
                            className="text-3xl md:text-4xl lg:text-5xl font-display font-black mb-6"
                            style={{ color: isDark ? '#ffffff' : '#0a0a0f' }}
                        >
                            Join the <span style={{
                                background: 'linear-gradient(135deg, #22d3ee, #a855f7)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text'
                            }}>Arcade Club</span>
                        </h2>
                        
                        <p 
                            className="text-lg mb-10 max-w-xl mx-auto"
                            style={{ color: isDark ? '#8b8b9e' : '#64748b' }}
                        >
                            Get exclusive drops, member-only discounts, and early access to the rarest gaming collectibles.
                        </p>
                        
                        <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
                            <input 
                                type="email" 
                                placeholder="Enter your email" 
                                className="input-field flex-grow"
                            />
                            <motion.button 
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit" 
                                className="btn-primary whitespace-nowrap"
                            >
                                Join Now
                            </motion.button>
                        </form>
                        
                        <p 
                            className="text-xs mt-6"
                            style={{ color: isDark ? '#8b8b9e' : '#64748b' }}
                        >
                            By subscribing, you agree to our Privacy Policy. Unsubscribe anytime.
                        </p>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Home;
