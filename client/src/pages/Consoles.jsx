import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ProductCard from '../components/ProductCard';
import { Gamepad2 } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Consoles = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { isDark } = useTheme();

    const mockProducts = [
        { id: 1, title: 'Retro Console X', description: 'The ultimate retro gaming experience with 5000+ games built-in.', price: 159.99, category: 'Consoles', image_url: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?auto=format&fit=crop&w=600&q=80' },
        { id: 7, title: 'Retro Handheld Plus', description: 'Portable gaming with 3000+ games. 5-inch IPS display.', price: 89.99, category: 'Consoles', image_url: 'https://images.unsplash.com/photo-1531525645387-7f14be1bdbbd?auto=format&fit=crop&w=600&q=80' },
        { id: 11, title: 'Retro Mini Arcade', description: 'Desktop arcade cabinet with 200 classic games.', price: 79.99, category: 'Consoles', image_url: 'https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?auto=format&fit=crop&w=600&q=80' },
        { id: 13, title: 'Classic Console Bundle', description: 'Vintage console with 2 controllers and 50 games.', price: 199.99, category: 'Consoles', image_url: 'https://images.unsplash.com/photo-1486401899868-0e435ed85128?auto=format&fit=crop&w=600&q=80' },
    ];

    useEffect(() => {
        setTimeout(() => {
            setProducts(mockProducts);
            setLoading(false);
        }, 500);
    }, []);

    return (
        <div 
            className="pt-24 pb-20 min-h-screen"
            style={{ backgroundColor: isDark ? '#0a0a0f' : '#fafafa' }}
        >
            {/* Header */}
            <div 
                className="py-16 mb-12"
                style={{
                    background: isDark 
                        ? 'linear-gradient(180deg, rgba(168,85,247,0.1) 0%, transparent 100%)'
                        : 'linear-gradient(180deg, rgba(124,58,237,0.05) 0%, transparent 100%)'
                }}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <div 
                            className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6"
                            style={{
                                background: 'linear-gradient(135deg, #a855f7, #22d3ee)',
                                boxShadow: '0 8px 30px rgba(168,85,247,0.3)'
                            }}
                        >
                            <Gamepad2 size={40} color="white" />
                        </div>
                        <h1 
                            className="text-5xl md:text-6xl font-display font-black mb-4"
                            style={{ color: isDark ? '#ffffff' : '#0a0a0f' }}
                        >
                            Gaming <span style={{
                                background: 'linear-gradient(135deg, #a855f7, #22d3ee)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text'
                            }}>Consoles</span>
                        </h1>
                        <p style={{ color: isDark ? '#8b8b9e' : '#64748b' }} className="text-lg max-w-2xl mx-auto">
                            Discover our collection of premium retro and modern gaming consoles
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Products Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {products.map((product, i) => (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <ProductCard product={product} />
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Consoles;
