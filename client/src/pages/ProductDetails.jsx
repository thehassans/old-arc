import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ShoppingCart, Star, Truck, Shield, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [added, setAdded] = useState(false);
    const [reviewPage, setReviewPage] = useState(1);
    const reviewsPerPage = 3;
    const { addToCart } = useCart();
    const { isDark } = useTheme();

    const mockProducts = [
        { id: 1, title: 'Retro Console X', description: 'The ultimate retro gaming experience. Pre-loaded with 5000+ classic games from the 80s and 90s. Features HDMI output, wireless controllers, and save state functionality. Perfect for reliving your childhood memories or discovering classic games for the first time.', price: 159.99, category: 'Consoles', image_url: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?auto=format&fit=crop&w=800&q=80' },
        { id: 2, title: 'Wireless Pro Controller', description: 'Ergonomic design with precision analogue sticks. Compatible with PC, consoles, and mobile devices. 40-hour battery life. Features vibration feedback and motion controls.', price: 44.99, category: 'Accessories', image_url: 'https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?auto=format&fit=crop&w=800&q=80' },
        { id: 3, title: 'Gaming Headset RGB', description: '7.1 surround sound with noise cancellation. Ultra-comfortable memory foam ear cushions. Detachable boom microphone. RGB lighting with 16 million colours.', price: 79.99, category: 'Accessories', image_url: 'https://images.unsplash.com/photo-1599669454699-248893623440?auto=format&fit=crop&w=800&q=80' },
        { id: 4, title: 'Classic Game Bundle', description: 'Collection of 10 retro classic titles including platformers and RPGs. Compatible with all our retro consoles. Includes rare Japanese imports.', price: 69.99, category: 'Games', image_url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80' },
        { id: 5, title: 'Handheld Retro Console', description: 'Portable gaming with 3.5" IPS screen and 3000+ built-in games. Rechargeable battery lasts 8 hours. Save states and fast forward features.', price: 89.99, category: 'Consoles', image_url: 'https://images.unsplash.com/photo-1531525645387-7f14be1bdbbd?auto=format&fit=crop&w=800&q=80' },
        { id: 6, title: 'Arcade Neon Sign', description: 'LED neon sign to light up your gaming space. Multiple colour modes including rainbow and breathing effects. Low power consumption.', price: 64.99, category: 'Merch', image_url: 'https://images.unsplash.com/photo-1563207153-f403bf289096?auto=format&fit=crop&w=800&q=80' },
        { id: 7, title: 'Retro Handheld Plus', description: 'Premium portable gaming with 5-inch IPS display and 3000+ games. Features WiFi for multiplayer gaming.', price: 89.99, category: 'Consoles', image_url: 'https://images.unsplash.com/photo-1531525645387-7f14be1bdbbd?auto=format&fit=crop&w=800&q=80' },
        { id: 11, title: 'Retro Mini Arcade', description: 'Desktop arcade cabinet with 200 classic arcade games. Authentic joystick and buttons. Perfect desk companion.', price: 79.99, category: 'Consoles', image_url: 'https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?auto=format&fit=crop&w=800&q=80' },
        { id: 13, title: 'Classic Console Bundle', description: 'Vintage console with 2 wireless controllers and 50 premium games. HDMI and AV outputs included.', price: 199.99, category: 'Consoles', image_url: 'https://images.unsplash.com/photo-1486401899868-0e435ed85128?auto=format&fit=crop&w=800&q=80' },
        { id: 14, title: 'RPG Legends Pack', description: 'Ultimate collection of classic RPG games from the golden era. Over 100 hours of gameplay.', price: 49.99, category: 'Games', image_url: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80' },
        { id: 15, title: 'Arcade Classics Vol.1', description: '20 arcade classics including Pac-Man, Galaga, Donkey Kong, and more. Authentic arcade experience.', price: 39.99, category: 'Games', image_url: 'https://images.unsplash.com/photo-1493711662062-fa541f7f76ce?auto=format&fit=crop&w=800&q=80' },
        { id: 16, title: 'Racing Collection', description: 'High-speed racing games from the 90s and 2000s. Includes 15 classic racing titles.', price: 34.99, category: 'Games', image_url: 'https://images.unsplash.com/photo-1552820728-8b83bb6b2b0f?auto=format&fit=crop&w=800&q=80' },
    ];

    const mockReviews = [
        { id: 1, name: 'James Wilson', rating: 5, date: '2024-12-01', comment: 'Absolutely love this product! Brings back so many childhood memories. Quality is excellent and delivery was fast.' },
        { id: 2, name: 'Sarah Chen', rating: 5, date: '2024-11-28', comment: 'Perfect gift for my husband. He hasn\'t put it down since! Great value for money.' },
        { id: 3, name: 'Michael Brown', rating: 4, date: '2024-11-25', comment: 'Great product overall. Works exactly as described. Minor issue with packaging but product was fine.' },
        { id: 4, name: 'Emma Davis', rating: 5, date: '2024-11-20', comment: 'Exceeded my expectations! The build quality is amazing and it works perfectly.' },
        { id: 5, name: 'David Miller', rating: 4, date: '2024-11-15', comment: 'Very happy with my purchase. Easy to set up and use. Would recommend!' },
        { id: 6, name: 'Lisa Johnson', rating: 5, date: '2024-11-10', comment: 'Best purchase I\'ve made this year. My kids love it too!' },
        { id: 7, name: 'Robert Taylor', rating: 5, date: '2024-11-05', comment: 'Outstanding quality and fast shipping. Will definitely buy from here again.' },
        { id: 8, name: 'Jennifer White', rating: 4, date: '2024-10-30', comment: 'Great product, works as expected. Customer service was also very helpful.' },
        { id: 9, name: 'Chris Martin', rating: 5, date: '2024-10-25', comment: 'Amazing! Perfect for retro gaming enthusiasts. Highly recommend!' },
    ];

    const totalPages = Math.ceil(mockReviews.length / reviewsPerPage);
    const currentReviews = mockReviews.slice((reviewPage - 1) * reviewsPerPage, reviewPage * reviewsPerPage);

    useEffect(() => {
        setTimeout(() => {
            const found = mockProducts.find(p => p.id === parseInt(id));
            setProduct(found);
            setLoading(false);
        }, 300);
    }, [id]);

    const handleAddToCart = () => {
        addToCart(product);
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    if (loading) return (
        <div className="pt-24 min-h-screen flex items-center justify-center" style={{ backgroundColor: isDark ? '#0a0a0f' : '#fafafa' }}>
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity }} className="w-12 h-12 rounded-full border-2" style={{ borderColor: '#a855f7', borderTopColor: 'transparent' }} />
        </div>
    );
    
    if (!product) return (
        <div className="pt-24 min-h-screen flex items-center justify-center" style={{ backgroundColor: isDark ? '#0a0a0f' : '#fafafa', color: isDark ? '#fff' : '#000' }}>
            Product not found
        </div>
    );

    return (
        <div className="pt-24 pb-20 min-h-screen" style={{ backgroundColor: isDark ? '#0a0a0f' : '#fafafa' }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Product Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="rounded-2xl overflow-hidden"
                        style={{ backgroundColor: isDark ? '#12121a' : '#fff', border: `1px solid ${isDark ? 'rgba(168,85,247,0.1)' : 'rgba(0,0,0,0.1)'}` }}
                    >
                        <img src={product.image_url} alt={product.title} className="w-full h-full object-cover" />
                    </motion.div>

                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                        <div>
                            <span style={{ color: '#a855f7' }} className="font-medium">{product.category}</span>
                            <h1 className="text-3xl md:text-4xl font-bold mt-2 mb-4" style={{ color: isDark ? '#fff' : '#0a0a0f' }}>{product.title}</h1>
                            <div className="flex items-center gap-4 flex-wrap">
                                <span className="text-3xl font-bold" style={{ color: isDark ? '#fff' : '#0a0a0f' }}>£{product.price}</span>
                                <div className="flex items-center gap-1">
                                    {[1,2,3,4,5].map(i => <Star key={i} size={18} fill="#fbbf24" color="#fbbf24" />)}
                                    <span style={{ color: isDark ? '#8b8b9e' : '#64748b' }} className="ml-2">({mockReviews.length} reviews)</span>
                                </div>
                            </div>
                        </div>

                        <p style={{ color: isDark ? '#a1a1aa' : '#52525b' }} className="text-lg leading-relaxed">{product.description}</p>

                        <div className="py-6 space-y-4" style={{ borderTop: `1px solid ${isDark ? 'rgba(168,85,247,0.1)' : 'rgba(0,0,0,0.1)'}`, borderBottom: `1px solid ${isDark ? 'rgba(168,85,247,0.1)' : 'rgba(0,0,0,0.1)'}` }}>
                            <div className="flex items-center gap-3" style={{ color: isDark ? '#8b8b9e' : '#64748b' }}>
                                <Truck size={20} style={{ color: '#22d3ee' }} />
                                <span>Free shipping on orders over £80</span>
                            </div>
                            <div className="flex items-center gap-3" style={{ color: isDark ? '#8b8b9e' : '#64748b' }}>
                                <Shield size={20} style={{ color: '#22d3ee' }} />
                                <span>2-year warranty included</span>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <button
                                onClick={handleAddToCart}
                                className="flex-1 flex items-center justify-center gap-2 py-4 px-6 rounded-xl font-semibold text-white transition-all"
                                style={{ background: added ? 'linear-gradient(135deg, #22c55e, #16a34a)' : 'linear-gradient(135deg, #a855f7, #22d3ee)' }}
                            >
                                {added ? <><Check size={22} /> Added!</> : <><ShoppingCart size={22} /> Add to Cart</>}
                            </button>
                            <button className="p-4 rounded-xl" style={{ backgroundColor: isDark ? '#12121a' : '#fff', border: `1px solid ${isDark ? 'rgba(168,85,247,0.2)' : 'rgba(0,0,0,0.1)'}` }}>
                                <Star size={22} style={{ color: isDark ? '#fbbf24' : '#eab308' }} />
                            </button>
                        </div>
                    </motion.div>
                </div>

                {/* Reviews Section */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                    <h2 className="text-2xl font-bold mb-6" style={{ color: isDark ? '#fff' : '#0a0a0f' }}>Customer Reviews</h2>
                    
                    <div className="space-y-4 mb-6">
                        {currentReviews.map(review => (
                            <div key={review.id} className="p-6 rounded-xl" style={{ backgroundColor: isDark ? '#12121a' : '#fff', border: `1px solid ${isDark ? 'rgba(168,85,247,0.1)' : 'rgba(0,0,0,0.1)'}` }}>
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white" style={{ background: 'linear-gradient(135deg, #a855f7, #22d3ee)' }}>
                                            {review.name.charAt(0)}
                                        </div>
                                        <div>
                                            <div className="font-semibold" style={{ color: isDark ? '#fff' : '#0a0a0f' }}>{review.name}</div>
                                            <div className="text-sm" style={{ color: isDark ? '#8b8b9e' : '#64748b' }}>{review.date}</div>
                                        </div>
                                    </div>
                                    <div className="flex gap-0.5">
                                        {[1,2,3,4,5].map(i => <Star key={i} size={14} fill={i <= review.rating ? '#fbbf24' : 'none'} color="#fbbf24" />)}
                                    </div>
                                </div>
                                <p style={{ color: isDark ? '#a1a1aa' : '#52525b' }}>{review.comment}</p>
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    <div className="flex items-center justify-center gap-2">
                        <button onClick={() => setReviewPage(p => Math.max(1, p - 1))} disabled={reviewPage === 1} className="p-2 rounded-lg disabled:opacity-30" style={{ backgroundColor: isDark ? '#12121a' : '#fff' }}>
                            <ChevronLeft size={20} style={{ color: isDark ? '#fff' : '#0a0a0f' }} />
                        </button>
                        {[...Array(totalPages)].map((_, i) => (
                            <button key={i} onClick={() => setReviewPage(i + 1)} className="w-10 h-10 rounded-lg font-medium" style={{ backgroundColor: reviewPage === i + 1 ? '#a855f7' : (isDark ? '#12121a' : '#fff'), color: reviewPage === i + 1 ? '#fff' : (isDark ? '#8b8b9e' : '#64748b') }}>
                                {i + 1}
                            </button>
                        ))}
                        <button onClick={() => setReviewPage(p => Math.min(totalPages, p + 1))} disabled={reviewPage === totalPages} className="p-2 rounded-lg disabled:opacity-30" style={{ backgroundColor: isDark ? '#12121a' : '#fff' }}>
                            <ChevronRight size={20} style={{ color: isDark ? '#fff' : '#0a0a0f' }} />
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default ProductDetails;
