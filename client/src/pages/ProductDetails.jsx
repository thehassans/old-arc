import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingCart, Star, Truck, Shield, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || '';

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [added, setAdded] = useState(false);
    const [reviewPage, setReviewPage] = useState(1);
    const [isFavourite, setIsFavourite] = useState(false);
    const reviewsPerPage = 3;
    const { addToCart } = useCart();
    const { isDark } = useTheme();
    const { isAuthenticated, user, updateUser } = useAuth();

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

    // Shuffle reviews based on product ID for variety
    const shuffledReviews = useMemo(() => {
        const seed = parseInt(id) || 1;
        const shuffled = [...mockReviews];
        // Fisher-Yates shuffle with seeded randomness
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor((Math.sin(seed * (i + 1)) * 10000) % (i + 1));
            const k = Math.abs(j);
            [shuffled[i], shuffled[k % shuffled.length]] = [shuffled[k % shuffled.length], shuffled[i]];
        }
        return shuffled;
    }, [id]);

    const totalPages = Math.ceil(shuffledReviews.length / reviewsPerPage);
    const currentReviews = shuffledReviews.slice((reviewPage - 1) * reviewsPerPage, reviewPage * reviewsPerPage);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`${API_URL}/api/stripe/products/${id}`);
                setProduct(response.data);
            } catch (error) {
                console.error('Failed to fetch product:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    // Check if product is in favourites
    useEffect(() => {
        if (isAuthenticated && user?.favourites) {
            setIsFavourite(user.favourites.some(fav => fav.id === parseInt(id)));
        }
    }, [id, isAuthenticated, user]);

    const handleToggleFavourite = () => {
        if (!isAuthenticated) {
            navigate('/account');
            return;
        }

        const currentFavourites = user?.favourites || [];
        let newFavourites;

        if (isFavourite) {
            newFavourites = currentFavourites.filter(fav => fav.id !== parseInt(id));
        } else {
            newFavourites = [...currentFavourites, {
                id: product.id,
                title: product.title,
                price: product.price,
                image_url: product.image_url,
                category: product.category
            }];
        }

        updateUser({ favourites: newFavourites });
        setIsFavourite(!isFavourite);
    };

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
                                    <span style={{ color: isDark ? '#8b8b9e' : '#64748b' }} className="ml-2">({shuffledReviews.length} reviews)</span>
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
                            <motion.button 
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleToggleFavourite}
                                className="p-4 rounded-xl transition-all"
                                style={{ 
                                    backgroundColor: isFavourite ? 'rgba(251,191,36,0.1)' : (isDark ? '#12121a' : '#fff'), 
                                    border: `1px solid ${isFavourite ? 'rgba(251,191,36,0.3)' : (isDark ? 'rgba(168,85,247,0.2)' : 'rgba(0,0,0,0.1)')}` 
                                }}
                                title={isAuthenticated ? (isFavourite ? 'Remove from Favourites' : 'Add to Favourites') : 'Sign in to add to Favourites'}
                            >
                                <Star size={22} fill={isFavourite ? '#fbbf24' : 'none'} style={{ color: '#fbbf24' }} />
                            </motion.button>
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
