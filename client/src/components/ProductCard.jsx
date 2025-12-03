import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

const ProductCard = ({ product }) => {
    return (
        <motion.div
            whileHover={{ y: -10 }}
            className="card group relative overflow-hidden"
        >
            <div className="aspect-square rounded-xl overflow-hidden mb-4 bg-dark/50 relative">
                <img
                    src={product.image_url || 'https://via.placeholder.com/300'}
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                    <button className="p-3 bg-white text-dark rounded-full hover:bg-primary hover:text-white transition-colors transform translate-y-4 group-hover:translate-y-0 duration-300">
                        <ShoppingCart size={20} />
                    </button>
                    <button className="p-3 bg-white text-dark rounded-full hover:bg-red-500 hover:text-white transition-colors transform translate-y-4 group-hover:translate-y-0 duration-300 delay-75">
                        <Heart size={20} />
                    </button>
                </div>
            </div>

            <div className="space-y-2">
                <div className="flex justify-between items-start">
                    <h3 className="font-bold text-lg truncate pr-4">{product.title}</h3>
                    <span className="font-display font-bold text-primary">${product.price}</span>
                </div>
                <p className="text-sm text-gray-400 line-clamp-2">{product.description}</p>
                <div className="pt-2">
                    <Link to={`/product/${product.id}`} className="text-sm font-medium text-secondary hover:text-primary transition-colors">
                        View Details &rarr;
                    </Link>
                </div>
            </div>
        </motion.div>
    );
};

export default ProductCard;
