import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ShoppingCart, Star, Truck, Shield } from 'lucide-react';

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    // Mock data
    const mockProducts = [
        { id: 1, title: 'Retro Console X', description: 'The ultimate retro gaming experience. Pre-loaded with 5000+ classic games from the 80s and 90s. Features HDMI output, wireless controllers, and save state functionality.', price: 199.99, category: 'Consoles', image_url: 'https://images.unsplash.com/photo-1486401899868-0e435ed85128?auto=format&fit=crop&q=80', stock: 15 },
        { id: 2, title: 'Classic Controller', description: 'Authentic feel, modern precision.', price: 49.99, category: 'Accessories', image_url: 'https://images.unsplash.com/photo-1592840496011-a68a4859036d?auto=format&fit=crop&q=80', stock: 50 },
        { id: 3, title: 'Arcade Stick Pro', description: 'Dominate the leaderboards.', price: 129.99, category: 'Accessories', image_url: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80', stock: 8 },
        { id: 4, title: 'Game Cartridge Set', description: 'Collection of 10 classic titles.', price: 89.99, category: 'Games', image_url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80', stock: 20 },
        { id: 5, title: 'Handheld Retro', description: 'Gaming on the go.', price: 159.99, category: 'Consoles', image_url: 'https://images.unsplash.com/photo-1531525645387-7f14be1bdbbd?auto=format&fit=crop&q=80', stock: 12 },
        { id: 6, title: 'Neon Sign', description: 'Light up your game room.', price: 79.99, category: 'Merch', image_url: 'https://images.unsplash.com/photo-1563207153-f403bf289096?auto=format&fit=crop&q=80', stock: 5 },
    ];

    useEffect(() => {
        setTimeout(() => {
            const found = mockProducts.find(p => p.id === parseInt(id));
            setProduct(found);
            setLoading(false);
        }, 500);
    }, [id]);

    if (loading) return <div className="pt-24 text-center">Loading...</div>;
    if (!product) return <div className="pt-24 text-center">Product not found</div>;

    return (
        <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="rounded-2xl overflow-hidden bg-dark-lighter/50 border border-white/10">
                    <img src={product.image_url} alt={product.title} className="w-full h-full object-cover" />
                </div>

                <div className="space-y-8">
                    <div>
                        <span className="text-primary font-medium">{product.category}</span>
                        <h1 className="text-4xl font-display font-bold mt-2 mb-4">{product.title}</h1>
                        <div className="flex items-center gap-4">
                            <span className="text-3xl font-bold text-white">${product.price}</span>
                            <div className="flex items-center text-yellow-400 text-sm">
                                <Star fill="currentColor" size={16} />
                                <Star fill="currentColor" size={16} />
                                <Star fill="currentColor" size={16} />
                                <Star fill="currentColor" size={16} />
                                <Star fill="currentColor" size={16} />
                                <span className="text-gray-400 ml-2">(24 reviews)</span>
                            </div>
                        </div>
                    </div>

                    <p className="text-gray-300 leading-relaxed text-lg">
                        {product.description}
                    </p>

                    <div className="border-t border-b border-white/10 py-6 space-y-4">
                        <div className="flex items-center gap-3 text-gray-400">
                            <Truck size={20} className="text-secondary" />
                            <span>Free shipping on orders over $100</span>
                        </div>
                        <div className="flex items-center gap-3 text-gray-400">
                            <Shield size={20} className="text-secondary" />
                            <span>2-year warranty included</span>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <button className="flex-1 btn-primary flex items-center justify-center gap-2 text-lg">
                            <ShoppingCart size={24} />
                            Add to Cart
                        </button>
                        <button className="px-6 py-3 rounded-full border border-white/20 hover:bg-white/10 transition-colors">
                            <Star size={24} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
