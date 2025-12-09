import React, { useState } from 'react';
import { Trash2, Plus, Minus, ArrowRight, Loader2, CreditCard, Truck } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || '';

const Cart = () => {
    const { cartItems, updateQuantity, removeFromCart, getCartTotal, clearCart } = useCart();
    const { isDark } = useTheme();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState('card'); // 'card' or 'cod'
    const [codForm, setCodForm] = useState({
        name: '',
        email: '',
        phone: '',
        address: ''
    });

    const subtotal = getCartTotal();
    const shipping = subtotal > 80 ? 0 : 12;
    const total = subtotal + shipping;

    const handleCheckout = async () => {
        setIsLoading(true);
        setError(null);

        try {
            if (paymentMethod === 'card') {
                // Stripe checkout
                const response = await axios.post(`${API_URL}/api/stripe/create-checkout-session`, {
                    items: cartItems.map(item => ({
                        id: item.id,
                        title: item.title,
                        price: item.price,
                        quantity: item.quantity,
                        image_url: item.image_url
                    }))
                });

                if (response.data.url) {
                    window.location.href = response.data.url;
                }
            } else {
                // Cash on Delivery
                if (!codForm.name || !codForm.email || !codForm.phone || !codForm.address) {
                    setError('Please fill in all delivery details');
                    setIsLoading(false);
                    return;
                }

                const response = await axios.post(`${API_URL}/api/stripe/create-cod-order`, {
                    items: cartItems.map(item => ({
                        id: item.id,
                        title: item.title,
                        price: item.price,
                        quantity: item.quantity,
                        image_url: item.image_url
                    })),
                    customer: codForm,
                    total_amount: total
                });

                if (response.data.success) {
                    clearCart();
                    navigate(`/checkout/success?order_id=${response.data.order.id}&cod=true`);
                }
            }
        } catch (err) {
            console.error('Checkout error:', err);
            setError(err.response?.data?.error || 'Failed to place order. Please try again.');
            setIsLoading(false);
        }
    };

    if (cartItems.length === 0) {
        return (
            <div className="pt-24 min-h-screen flex flex-col items-center justify-center text-center px-4">
                <h2 className="text-3xl font-display font-bold mb-4">Your Cart is Empty</h2>
                <p className={`mb-8 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Looks like you haven't added any games yet.</p>
                <Link to="/shop" className="btn-primary">Start Shopping</Link>
            </div>
        );
    }

    return (
        <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen">
            <h1 className="text-4xl font-display font-bold mb-12">Shopping <span className="text-primary">Cart</span></h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-6">
                    {cartItems.map(item => (
                        <div key={item.id} className={`rounded-xl p-6 flex gap-6 items-center ${isDark ? 'bg-dark-lighter/50 border border-white/10' : 'bg-light-darker/50 border border-dark/10'}`}>
                            <div className={`w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 ${isDark ? 'bg-dark' : 'bg-light'}`}>
                                <img src={item.image_url} alt={item.title} className="w-full h-full object-cover" />
                            </div>

                            <div className="flex-grow">
                                <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                                <p className="text-primary font-bold">£{item.price}</p>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className={`flex items-center rounded-lg border ${isDark ? 'bg-dark border-white/10' : 'bg-light border-dark/10'}`}>
                                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-2 hover:text-primary transition-colors"><Minus size={16} /></button>
                                    <span className="w-8 text-center font-medium">{item.quantity}</span>
                                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-2 hover:text-primary transition-colors"><Plus size={16} /></button>
                                </div>
                                <button onClick={() => removeFromCart(item.id)} className={`p-2 hover:text-red-500 transition-colors ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="lg:col-span-1">
                    <div className={`rounded-xl p-8 sticky top-24 ${isDark ? 'bg-dark-lighter/50 border border-white/10' : 'bg-light-darker/50 border border-dark/10'}`}>
                        <h3 className="text-xl font-bold mb-6">Order Summary</h3>

                        <div className="space-y-4 mb-6">
                            <div className={`flex justify-between ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                <span>Subtotal</span>
                                <span>£{subtotal.toFixed(2)}</span>
                            </div>
                            <div className={`flex justify-between ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                <span>Shipping</span>
                                <span>{shipping === 0 ? 'Free' : `£${shipping.toFixed(2)}`}</span>
                            </div>
                            <div className={`border-t pt-4 flex justify-between font-bold text-lg ${isDark ? 'border-white/10' : 'border-dark/10'}`}>
                                <span>Total</span>
                                <span>£{total.toFixed(2)}</span>
                            </div>
                        </div>

                        {/* Payment Method Selection */}
                        <div className="mb-6">
                            <p className={`text-sm font-medium mb-3 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Payment Method</p>
                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    type="button"
                                    onClick={() => setPaymentMethod('card')}
                                    className={`flex items-center justify-center gap-2 p-3 rounded-lg border transition-all ${
                                        paymentMethod === 'card'
                                            ? 'border-primary bg-primary/10 text-primary'
                                            : isDark ? 'border-white/10 text-gray-400 hover:border-white/20' : 'border-dark/10 text-gray-600 hover:border-dark/20'
                                    }`}
                                >
                                    <CreditCard size={18} />
                                    <span className="text-sm font-medium">Card</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setPaymentMethod('cod')}
                                    className={`flex items-center justify-center gap-2 p-3 rounded-lg border transition-all ${
                                        paymentMethod === 'cod'
                                            ? 'border-primary bg-primary/10 text-primary'
                                            : isDark ? 'border-white/10 text-gray-400 hover:border-white/20' : 'border-dark/10 text-gray-600 hover:border-dark/20'
                                    }`}
                                >
                                    <Truck size={18} />
                                    <span className="text-sm font-medium">Cash on Delivery</span>
                                </button>
                            </div>
                        </div>

                        {/* COD Form */}
                        {paymentMethod === 'cod' && (
                            <div className="mb-6 space-y-3">
                                <input
                                    type="text"
                                    placeholder="Full Name *"
                                    value={codForm.name}
                                    onChange={(e) => setCodForm({...codForm, name: e.target.value})}
                                    className={`w-full px-4 py-3 rounded-lg border ${isDark ? 'bg-dark border-white/10 text-white placeholder-gray-500' : 'bg-white border-dark/10 text-dark placeholder-gray-400'}`}
                                />
                                <input
                                    type="email"
                                    placeholder="Email Address *"
                                    value={codForm.email}
                                    onChange={(e) => setCodForm({...codForm, email: e.target.value})}
                                    className={`w-full px-4 py-3 rounded-lg border ${isDark ? 'bg-dark border-white/10 text-white placeholder-gray-500' : 'bg-white border-dark/10 text-dark placeholder-gray-400'}`}
                                />
                                <input
                                    type="tel"
                                    placeholder="Phone Number *"
                                    value={codForm.phone}
                                    onChange={(e) => setCodForm({...codForm, phone: e.target.value})}
                                    className={`w-full px-4 py-3 rounded-lg border ${isDark ? 'bg-dark border-white/10 text-white placeholder-gray-500' : 'bg-white border-dark/10 text-dark placeholder-gray-400'}`}
                                />
                                <textarea
                                    placeholder="Delivery Address *"
                                    value={codForm.address}
                                    onChange={(e) => setCodForm({...codForm, address: e.target.value})}
                                    rows={3}
                                    className={`w-full px-4 py-3 rounded-lg border resize-none ${isDark ? 'bg-dark border-white/10 text-white placeholder-gray-500' : 'bg-white border-dark/10 text-dark placeholder-gray-400'}`}
                                />
                            </div>
                        )}

                        {error && (
                            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-sm">
                                {error}
                            </div>
                        )}

                        <button 
                            onClick={handleCheckout}
                            disabled={isLoading}
                            className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 size={20} className="animate-spin" />
                                    Processing...
                                </>
                            ) : (
                                <>
                                    {paymentMethod === 'cod' ? 'Place Order' : 'Proceed to Checkout'}
                                    <ArrowRight size={20} />
                                </>
                            )}
                        </button>
                        
                        {paymentMethod === 'card' && (
                            <p className={`mt-4 text-xs text-center ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                                Test card: 4242 4242 4242 4242
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
