import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ProductCard from '../components/ProductCard';
import { Disc3 } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Games = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { isDark } = useTheme();

    const mockProducts = [
        { id: 4, title: 'Classic Game Bundle', description: 'Collection of 10 retro classic titles including platformers and RPGs.', price: 69.99, category: 'Games', image_url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80' },
        { id: 14, title: 'RPG Legends Pack', description: 'Ultimate collection of classic RPG games from the golden era.', price: 49.99, category: 'Games', image_url: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=600&q=80' },
        { id: 15, title: 'Arcade Classics Vol.1', description: '20 arcade classics including Pac-Man, Galaga, and more.', price: 39.99, category: 'Games', image_url: 'https://images.unsplash.com/photo-1493711662062-fa541f7f76ce?auto=format&fit=crop&w=600&q=80' },
        { id: 16, title: 'Racing Collection', description: 'High-speed racing games from the 90s and 2000s.', price: 34.99, category: 'Games', image_url: 'https://images.unsplash.com/photo-1552820728-8b83bb6b2b0f?auto=format&fit=crop&w=600&q=80' },
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
                        ? 'linear-gradient(180deg, rgba(34,211,238,0.1) 0%, transparent 100%)'
                        : 'linear-gradient(180deg, rgba(8,145,178,0.05) 0%, transparent 100%)'
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
                                background: 'linear-gradient(135deg, #22d3ee, #a855f7)',
                                boxShadow: '0 8px 30px rgba(34,211,238,0.3)'
                            }}
                        >
                            <Disc3 size={40} color="white" />
                        </div>
                        <h1 
                            className="text-5xl md:text-6xl font-display font-black mb-4"
                            style={{ color: isDark ? '#ffffff' : '#0a0a0f' }}
                        >
                            Classic <span style={{
                                background: 'linear-gradient(135deg, #22d3ee, #a855f7)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text'
                            }}>Games</span>
                        </h1>
                        <p style={{ color: isDark ? '#8b8b9e' : '#64748b' }} className="text-lg max-w-2xl mx-auto">
                            Explore our legendary collection of retro and classic video games
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
                            style={{ borderColor: '#22d3ee', borderTopColor: 'transparent' }}
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

export default Games;
