import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ProductCard from '../components/ProductCard';
import { Filter, Search, SlidersHorizontal } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const { isDark } = useTheme();

    const categories = ['All', 'Consoles', 'Games', 'Accessories', 'Merch'];

    // Mock data
    const mockProducts = [
        { id: 1, title: 'Retro Console X', description: 'The ultimate retro gaming experience with 5000+ games.', price: 159.99, category: 'Consoles', image_url: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?auto=format&fit=crop&w=600&q=80' },
        { id: 2, title: 'Wireless Pro Controller', description: 'Ergonomic design with precision analogue sticks.', price: 44.99, category: 'Accessories', image_url: 'https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?auto=format&fit=crop&w=600&q=80' },
        { id: 3, title: 'Arcade Fighting Stick', description: 'Tournament-grade arcade stick with Sanwa buttons.', price: 109.99, category: 'Accessories', image_url: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=600&q=80' },
        { id: 4, title: 'Classic Game Bundle', description: 'Collection of 10 retro classic titles.', price: 69.99, category: 'Games', image_url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80' },
        { id: 5, title: 'Handheld Retro Console', description: 'Portable gaming with 3.5" screen.', price: 124.99, category: 'Consoles', image_url: 'https://images.unsplash.com/photo-1531525645387-7f14be1bdbbd?auto=format&fit=crop&w=600&q=80' },
        { id: 6, title: 'Arcade Neon Sign', description: 'LED neon sign to light up your gaming space.', price: 64.99, category: 'Merch', image_url: 'https://images.unsplash.com/photo-1563207153-f403bf289096?auto=format&fit=crop&w=600&q=80' },
        { id: 7, title: 'Gaming Headset RGB', description: '7.1 surround sound with noise cancellation.', price: 79.99, category: 'Accessories', image_url: 'https://images.unsplash.com/photo-1599669454699-248893623440?auto=format&fit=crop&w=600&q=80' },
        { id: 8, title: 'Controller Charging Dock', description: 'Dual charging station with LED indicators.', price: 24.99, category: 'Accessories', image_url: 'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=600&q=80' },
        { id: 9, title: 'Retro Gaming Mousepad', description: 'XXL gaming mousepad with pixel art design.', price: 19.99, category: 'Accessories', image_url: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=600&q=80' },
        { id: 10, title: 'RGB Backlit Keyboard', description: 'Mechanical keyboard with customizable RGB.', price: 89.99, category: 'Accessories', image_url: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?auto=format&fit=crop&w=600&q=80' },
        { id: 11, title: 'Game Collector\'s Box', description: 'Limited edition game storage box.', price: 34.99, category: 'Merch', image_url: 'https://images.unsplash.com/photo-1615680022647-99c397cbcaea?auto=format&fit=crop&w=600&q=80' },
        { id: 12, title: 'Controller Grip Set', description: 'Silicone grips for enhanced comfort.', price: 12.99, category: 'Accessories', image_url: 'https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?auto=format&fit=crop&w=600&q=80' },
    ];

    useEffect(() => {
        setTimeout(() => {
            setProducts(mockProducts);
            setLoading(false);
        }, 800);
    }, []);

    const filteredProducts = products.filter(p => {
        const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
        const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div 
            className="pt-24 pb-20 min-h-screen"
            style={{ backgroundColor: isDark ? '#0a0a0f' : '#fafafa' }}
        >
            {/* Header Section */}
            <div 
                className="py-16 mb-12"
                style={{
                    background: isDark 
                        ? 'linear-gradient(180deg, rgba(168,85,247,0.1) 0%, transparent 100%)'
                        : 'linear-gradient(180deg, rgba(124,58,237,0.05) 0%, transparent 100%)'
                }}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-10"
                    >
                        <h1 
                            className="text-5xl md:text-6xl font-display font-black mb-4"
                            style={{ color: isDark ? '#ffffff' : '#0a0a0f' }}
                        >
                            Premium <span style={{
                                background: 'linear-gradient(135deg, #a855f7, #22d3ee)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text'
                            }}>Collection</span>
                        </h1>
                        <p style={{ color: isDark ? '#8b8b9e' : '#64748b' }} className="text-lg">
                            Discover our handpicked selection of gaming excellence
                        </p>
                    </motion.div>

                    {/* Search & Filter Bar */}
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="flex flex-col md:flex-row gap-4 items-center justify-between"
                    >
                        {/* Search Input */}
                        <div 
                            className="relative w-full md:w-80"
                        >
                            <Search 
                                size={18} 
                                className="absolute left-4 top-1/2 -translate-y-1/2"
                                style={{ color: isDark ? '#8b8b9e' : '#64748b' }}
                            />
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 rounded-xl transition-all"
                                style={{
                                    backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : '#ffffff',
                                    border: `1px solid ${isDark ? 'rgba(168,85,247,0.2)' : 'rgba(0,0,0,0.08)'}`,
                                    color: isDark ? '#ffffff' : '#0a0a0f'
                                }}
                            />
                        </div>

                        {/* Category Filters */}
                        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
                            <SlidersHorizontal size={18} style={{ color: isDark ? '#8b8b9e' : '#64748b' }} className="flex-shrink-0 mr-2" />
                            {categories.map((cat, i) => (
                                <motion.button
                                    key={cat}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => setSelectedCategory(cat)}
                                    className="px-5 py-2.5 rounded-xl text-sm font-semibold transition-all whitespace-nowrap"
                                    style={{
                                        background: selectedCategory === cat 
                                            ? 'linear-gradient(135deg, #a855f7, #22d3ee)'
                                            : (isDark ? 'rgba(255,255,255,0.05)' : '#ffffff'),
                                        color: selectedCategory === cat 
                                            ? '#ffffff' 
                                            : (isDark ? '#8b8b9e' : '#64748b'),
                                        border: selectedCategory === cat 
                                            ? 'none'
                                            : `1px solid ${isDark ? 'rgba(168,85,247,0.2)' : 'rgba(0,0,0,0.08)'}`,
                                        boxShadow: selectedCategory === cat 
                                            ? '0 4px 15px rgba(168,85,247,0.3)'
                                            : 'none'
                                    }}
                                >
                                    {cat}
                                </motion.button>
                            ))}
                        </div>
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
                ) : filteredProducts.length === 0 ? (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-20"
                    >
                        <p style={{ color: isDark ? '#8b8b9e' : '#64748b' }} className="text-lg">
                            No products found. Try a different search or category.
                        </p>
                    </motion.div>
                ) : (
                    <>
                        <p 
                            className="mb-8 text-sm"
                            style={{ color: isDark ? '#8b8b9e' : '#64748b' }}
                        >
                            Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                            {filteredProducts.map((product, i) => (
                                <motion.div
                                    key={product.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                >
                                    <ProductCard product={product} />
                                </motion.div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Shop;
