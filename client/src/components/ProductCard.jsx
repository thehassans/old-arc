import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, Check, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();
    const { isDark } = useTheme();
    const [added, setAdded] = useState(false);
    const [liked, setLiked] = useState(false);

    const handleAddToCart = (e) => {
        e.preventDefault();
        addToCart(product);
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -8 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="group relative rounded-2xl overflow-hidden"
            style={{
                backgroundColor: isDark ? '#12121a' : '#ffffff',
                border: `1px solid ${isDark ? 'rgba(168,85,247,0.1)' : 'rgba(0,0,0,0.06)'}`,
                boxShadow: isDark ? 'none' : '0 4px 20px rgba(0,0,0,0.06)'
            }}
        >
            {/* Glow Effect on Hover */}
            <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                    background: isDark 
                        ? 'radial-gradient(circle at 50% 0%, rgba(168,85,247,0.15), transparent 70%)'
                        : 'radial-gradient(circle at 50% 0%, rgba(124,58,237,0.08), transparent 70%)'
                }}
            />

            {/* Image Container */}
            <div className="relative aspect-square overflow-hidden">
                <img
                    src={product.image_url || 'https://via.placeholder.com/300'}
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                
                {/* Gradient Overlay */}
                <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300"
                    style={{
                        background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%)'
                    }}
                />

                {/* Quick Actions */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleAddToCart}
                        className="flex-1 py-3 px-4 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all"
                        style={{
                            background: added 
                                ? 'linear-gradient(135deg, #22c55e, #16a34a)' 
                                : 'linear-gradient(135deg, #a855f7, #22d3ee)',
                            color: 'white',
                            boxShadow: '0 4px 15px rgba(168,85,247,0.4)'
                        }}
                    >
                        {added ? <Check size={18} /> : <ShoppingCart size={18} />}
                        {added ? 'Added!' : 'Add to Cart'}
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => { e.preventDefault(); setLiked(!liked); }}
                        className="p-3 rounded-xl transition-all"
                        style={{
                            backgroundColor: liked ? '#ec4899' : 'rgba(255,255,255,0.9)',
                            color: liked ? 'white' : '#0a0a0f'
                        }}
                    >
                        <Heart size={18} fill={liked ? 'currentColor' : 'none'} />
                    </motion.button>
                </div>

                {/* Category Badge */}
                {product.category && (
                    <div 
                        className="absolute top-4 left-4 px-3 py-1.5 rounded-lg text-xs font-semibold"
                        style={{
                            background: isDark ? 'rgba(10,10,15,0.8)' : 'rgba(255,255,255,0.9)',
                            backdropFilter: 'blur(10px)',
                            color: '#a855f7',
                            border: '1px solid rgba(168,85,247,0.3)'
                        }}
                    >
                        {product.category}
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-5">
                <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 
                        className="font-bold text-lg leading-tight line-clamp-1"
                        style={{ color: isDark ? '#ffffff' : '#0a0a0f' }}
                    >
                        {product.title}
                    </h3>
                    <div 
                        className="text-lg font-black whitespace-nowrap"
                        style={{ 
                            background: 'linear-gradient(135deg, #a855f7, #22d3ee)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text'
                        }}
                    >
                        £{product.price}
                    </div>
                </div>
                
                <p 
                    className="text-sm line-clamp-2 mb-4 leading-relaxed"
                    style={{ color: isDark ? '#8b8b9e' : '#64748b' }}
                >
                    {product.description}
                </p>

                <Link 
                    to={`/product/${product.id}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold transition-all group/link"
                    style={{ color: '#a855f7' }}
                >
                    <Eye size={16} />
                    View Details
                    <motion.span
                        className="inline-block"
                        initial={{ x: 0 }}
                        whileHover={{ x: 4 }}
                    >
                        →
                    </motion.span>
                </Link>
            </div>

            {/* Bottom Gradient Line */}
            <div 
                className="absolute bottom-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                    background: 'linear-gradient(90deg, #a855f7, #22d3ee, #ec4899)'
                }}
            />
        </motion.div>
    );
};

export default ProductCard;
