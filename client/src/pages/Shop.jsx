import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { Filter } from 'lucide-react';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('All');

    const categories = ['All', 'Consoles', 'Games', 'Accessories', 'Merch'];

    // Mock data
    const mockProducts = [
        { id: 1, title: 'Retro Console X', description: 'The ultimate retro gaming experience.', price: 199.99, category: 'Consoles', image_url: 'https://images.unsplash.com/photo-1486401899868-0e435ed85128?auto=format&fit=crop&q=80' },
        { id: 2, title: 'Classic Controller', description: 'Authentic feel, modern precision.', price: 49.99, category: 'Accessories', image_url: 'https://images.unsplash.com/photo-1592840496011-a68a4859036d?auto=format&fit=crop&q=80' },
        { id: 3, title: 'Arcade Stick Pro', description: 'Dominate the leaderboards.', price: 129.99, category: 'Accessories', image_url: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80' },
        { id: 4, title: 'Game Cartridge Set', description: 'Collection of 10 classic titles.', price: 89.99, category: 'Games', image_url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80' },
        { id: 5, title: 'Handheld Retro', description: 'Gaming on the go.', price: 159.99, category: 'Consoles', image_url: 'https://images.unsplash.com/photo-1531525645387-7f14be1bdbbd?auto=format&fit=crop&q=80' },
        { id: 6, title: 'Neon Sign', description: 'Light up your game room.', price: 79.99, category: 'Merch', image_url: 'https://images.unsplash.com/photo-1563207153-f403bf289096?auto=format&fit=crop&q=80' },
    ];

    useEffect(() => {
        setTimeout(() => {
            setProducts(mockProducts);
            setLoading(false);
        }, 800);
    }, []);

    const filteredProducts = selectedCategory === 'All'
        ? products
        : products.filter(p => p.category === selectedCategory);

    return (
        <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen">
            <div className="flex flex-col md:flex-row justify-between items-center mb-12">
                <h1 className="text-4xl font-display font-bold mb-6 md:mb-0">Shop <span className="text-primary">All</span></h1>

                <div className="flex items-center gap-4 overflow-x-auto pb-4 md:pb-0 w-full md:w-auto">
                    <Filter size={20} className="text-gray-400 flex-shrink-0" />
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${selectedCategory === cat
                                    ? 'bg-primary text-white'
                                    : 'bg-dark-lighter text-gray-400 hover:text-white'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {filteredProducts.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Shop;
