import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ShoppingCart, Star, Truck, Shield, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [added, setAdded] = useState(false);
    const { addToCart } = useCart();
    const { isDark } = useTheme();

    // Mock data
    const mockProducts = [
        { id: 1, title: 'Retro Console X', description: 'The ultimate retro gaming experience. Pre-loaded with 5000+ classic games from the 80s and 90s. Features HDMI output, wireless controllers, and save state functionality.', price: 159.99, category: 'Consoles', image_url: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?auto=format&fit=crop&w=600&q=80', stock: 15 },
        { id: 2, title: 'Wireless Pro Controller', description: 'Ergonomic design with precision analogue sticks. Compatible with PC, consoles, and mobile devices. 40-hour battery life.', price: 44.99, category: 'Accessories', image_url: 'https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?auto=format&fit=crop&w=600&q=80', stock: 50 },
        { id: 3, title: 'Gaming Headset RGB', description: '7.1 surround sound with noise cancellation. Ultra-comfortable memory foam ear cushions. Detachable boom microphone.', price: 79.99, category: 'Accessories', image_url: 'https://images.unsplash.com/photo-1599669454699-248893623440?auto=format&fit=crop&w=600&q=80', stock: 30 },
        { id: 4, title: 'Controller Charging Dock', description: 'Dual charging station with LED indicators. Fast charge technology. Compact design.', price: 24.99, category: 'Accessories', image_url: 'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=600&q=80', stock: 20 },
        { id: 5, title: 'Handheld Retro Console', description: 'Portable gaming with 3.5" screen and 1000+ built-in games.', price: 124.99, category: 'Consoles', image_url: 'https://images.unsplash.com/photo-1531525645387-7f14be1bdbbd?auto=format&fit=crop&w=600&q=80', stock: 12 },
        { id: 6, title: 'Arcade Neon Sign', description: 'LED neon sign to light up your gaming space. Multiple colour modes.', price: 64.99, category: 'Merch', image_url: 'https://images.unsplash.com/photo-1563207153-f403bf289096?auto=format&fit=crop&w=600&q=80', stock: 5 },
    ];

    useEffect(() => {
        setTimeout(() => {
            const found = mockProducts.find(p => p.id === parseInt(id));
            setProduct(found);
            setLoading(false);
        }, 500);
    }, [id]);

    const handleAddToCart = () => {
        addToCart(product);
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    if (loading) return <div className="pt-24 text-center">Loading...</div>;
    if (!product) return <div className="pt-24 text-center">Product not found</div>;

    return (
        <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className={`rounded-2xl overflow-hidden ${isDark ? 'bg-dark-lighter/50 border border-white/10' : 'bg-light-darker/50 border border-dark/10'}`}>
                    <img src={product.image_url} alt={product.title} className="w-full h-full object-cover" />
                </div>

                <div className="space-y-8">
                    <div>
                        <span className="text-primary font-medium">{product.category}</span>
                        <h1 className="text-4xl font-display font-bold mt-2 mb-4">{product.title}</h1>
                        <div className="flex items-center gap-4">
                            <span className="text-3xl font-bold">£{product.price}</span>
                            <div className="flex items-center text-yellow-400 text-sm">
                                <Star fill="currentColor" size={16} />
                                <Star fill="currentColor" size={16} />
                                <Star fill="currentColor" size={16} />
                                <Star fill="currentColor" size={16} />
                                <Star fill="currentColor" size={16} />
                                <span className={`ml-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>(24 reviews)</span>
                            </div>
                        </div>
                    </div>

                    <p className={`leading-relaxed text-lg ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        {product.description}
                    </p>

                    <div className={`border-t border-b py-6 space-y-4 ${isDark ? 'border-white/10' : 'border-dark/10'}`}>
                        <div className={`flex items-center gap-3 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                            <Truck size={20} className="text-secondary" />
                            <span>Free shipping on orders over £80</span>
                        </div>
                        <div className={`flex items-center gap-3 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                            <Shield size={20} className="text-secondary" />
                            <span>2-year warranty included</span>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <button
                            onClick={handleAddToCart}
                            className={`flex-1 flex items-center justify-center gap-2 text-lg transition-all ${added
                                    ? 'bg-green-500 text-white px-6 py-3 rounded-full font-bold'
                                    : 'btn-primary'
                                }`}
                        >
                            {added ? (
                                <>
                                    <Check size={24} />
                                    Added to Cart
                                </>
                            ) : (
                                <>
                                    <ShoppingCart size={24} />
                                    Add to Cart
                                </>
                            )}
                        </button>
                        <button className={`px-6 py-3 rounded-full border transition-colors ${isDark ? 'border-white/20 hover:bg-white/10' : 'border-dark/20 hover:bg-dark/10'}`}>
                            <Star size={24} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
