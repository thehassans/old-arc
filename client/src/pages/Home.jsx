import React, { useEffect, useState } from 'react';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import axios from 'axios';

const Home = () => {
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    // Mock data for now since DB might be down
    const mockProducts = [
        { id: 1, title: 'Retro Console X', description: 'The ultimate retro gaming experience.', price: 199.99, image_url: 'https://images.unsplash.com/photo-1486401899868-0e435ed85128?auto=format&fit=crop&q=80' },
        { id: 2, title: 'Classic Controller', description: 'Authentic feel, modern precision.', price: 49.99, image_url: 'https://images.unsplash.com/photo-1592840496011-a68a4859036d?auto=format&fit=crop&q=80' },
        { id: 3, title: 'Arcade Stick Pro', description: 'Dominate the leaderboards.', price: 129.99, image_url: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80' },
        { id: 4, title: 'Game Cartridge Set', description: 'Collection of 10 classic titles.', price: 89.99, image_url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80' },
    ];

    useEffect(() => {
        // Simulate API call
        setTimeout(() => {
            setFeaturedProducts(mockProducts);
            setLoading(false);
        }, 1000);
    }, []);

    return (
        <div>
            <Hero />

            <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Featured <span className="text-primary">Collection</span></h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">Handpicked favorites from our premium inventory. Quality guaranteed.</p>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {featuredProducts.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}
            </section>

            <section className="py-20 bg-dark-lighter/30 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="bg-gradient-to-r from-primary/20 to-secondary/20 rounded-3xl p-10 md:p-16 text-center border border-white/10 backdrop-blur-md">
                        <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">Join the <span className="text-secondary">Arcade Club</span></h2>
                        <p className="text-gray-300 mb-8 max-w-2xl mx-auto">Get exclusive access to rare drops, member-only discounts, and early access to new arrivals.</p>
                        <form className="max-w-md mx-auto flex gap-4">
                            <input type="email" placeholder="Enter your email" className="input-field flex-grow" />
                            <button type="submit" className="btn-primary whitespace-nowrap">Subscribe</button>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
